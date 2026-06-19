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

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const [activeCustomers, activeProjects, monthlyEarnings, weeklyOrders, recentOrders] = await Promise.all([
      prisma.order.groupBy({
        by: ['customerId'],
        where: { landscaperId: profile.id },
        _count: { customerId: true },
      }),
      prisma.order.count({
        where: {
          landscaperId: profile.id,
          status: { in: ['IN_PROGRESS', 'ACCEPTED'] },
        },
      }),
      prisma.order.aggregate({
        where: {
          landscaperId: profile.id,
          status: 'COMPLETED',
          createdAt: { gte: startOfMonth },
        },
        _sum: { totalPrice: true },
      }),
      prisma.order.findMany({
        where: {
          landscaperId: profile.id,
          createdAt: { gte: startOfWeek },
        },
        select: { createdAt: true, totalPrice: true },
      }),
      prisma.order.findMany({
        where: { landscaperId: profile.id },
        include: { customer: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    const dayNames = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const weeklyActivity = dayNames.map((day, i) => {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      const ordersOnDay = weeklyOrders.filter(o =>
        o.createdAt.toDateString() === dayDate.toDateString()
      );
      return { day, value: ordersOnDay.reduce((sum, o) => sum + o.totalPrice, 0) };
    });

    const notifications = recentOrders.map(o => ({
      title: o.status === 'PENDING' ? 'Yeni müşteri talebi' : `Sipariş ${o.status === 'COMPLETED' ? 'tamamlandı' : 'güncellendi'}`,
      desc: `${o.customer?.name || 'Bilinmeyen'} — ${o.serviceName}`,
      time: `${Math.floor((Date.now() - o.createdAt.getTime()) / 60000)} dk önce`,
      type: o.status === 'COMPLETED' ? 'success' : o.status === 'PENDING' ? 'warning' : 'info',
    }));

    return successResponse({
      kpis: {
        activeCustomers: activeCustomers.length,
        activeProjects,
        monthlyEarnings: monthlyEarnings._sum?.totalPrice || 0,
        responseTime: 2.3,
      },
      weeklyActivity,
      notifications,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
