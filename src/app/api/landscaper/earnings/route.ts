import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const profile = await prisma.landscaperProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) return errorResponse('Landscaper profile not found', 404);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [totalEarnings, currentPeriod, previousPeriod, monthlyData, transactions, totalTransactions] = await Promise.all([
      prisma.order.aggregate({
        where: { landscaperId: profile.id, status: 'COMPLETED' },
        _sum: { totalPrice: true },
      }),
      prisma.order.aggregate({
        where: { landscaperId: profile.id, status: 'COMPLETED', createdAt: { gte: startOfMonth } },
        _sum: { totalPrice: true },
      }),
      prisma.order.aggregate({
        where: { landscaperId: profile.id, status: 'COMPLETED', createdAt: { gte: startOfLastMonth, lt: startOfMonth } },
        _sum: { totalPrice: true },
      }),
      prisma.order.groupBy({
        by: ['createdAt'],
        where: { landscaperId: profile.id, status: 'COMPLETED' },
        _sum: { totalPrice: true },
      }),
      prisma.order.findMany({
        where: { landscaperId: profile.id },
        include: { customer: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where: { landscaperId: profile.id } }),
    ]);

    const currentVal = currentPeriod._sum?.totalPrice || 0;
    const previousVal = previousPeriod._sum?.totalPrice || 0;
    const growth = previousVal > 0 ? Math.round(((currentVal - previousVal) / previousVal) * 100) : 0;

    const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const chart = monthNames.map((month, i) => {
      const monthTotal = monthlyData
        .filter(o => o.createdAt.getMonth() === i)
        .reduce((sum, o) => sum + (o._sum?.totalPrice || 0), 0);
      return { month, value: monthTotal };
    });

    const txList = transactions.map(tx => ({
      id: tx.id,
      date: tx.createdAt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }),
      customer: tx.customer?.name || 'Bilinmeyen',
      service: tx.serviceName,
      amount: tx.totalPrice,
      status: tx.status.toLowerCase(),
    }));

    const totalPages = Math.ceil(totalTransactions / limit);

    return successResponse({
      summary: { total: totalEarnings._sum?.totalPrice || 0, currentPeriod: currentVal, previousPeriod: previousVal, growth },
      chart,
      transactions: txList,
      pagination: { page, totalPages, total: totalTransactions },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
