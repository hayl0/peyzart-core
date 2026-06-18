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
    const month = parseInt(searchParams.get('month') || String(new Date().getMonth() + 1));
    const year = parseInt(searchParams.get('year') || String(new Date().getFullYear()));

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const [orders, blockedDates] = await Promise.all([
      prisma.order.findMany({
        where: {
          landscaperId: profile.id,
          serviceDate: { gte: startDate, lte: endDate },
        },
        include: { customer: { select: { name: true } } },
      }),
      prisma.blockedDate.findMany({
        where: {
          landscaperProfileId: profile.id,
          date: { gte: startDate, lte: endDate },
        },
      }),
    ]);

    const appointments: Record<string, { time: string; customer: string; service: string; status: string }[]> = {};

    orders.forEach(order => {
      const dateKey = `${order.serviceDate.getFullYear()}-${order.serviceDate.getMonth() + 1}-${order.serviceDate.getDate()}`;
      if (!appointments[dateKey]) appointments[dateKey] = [];
      appointments[dateKey].push({
        time: order.serviceDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        customer: order.customer?.name || 'Bilinmeyen',
        service: order.serviceName,
        status: order.status,
      });
    });

    const blocked = blockedDates.map(bd => ({
      date: `${bd.date.getFullYear()}-${bd.date.getMonth() + 1}-${bd.date.getDate()}`,
      reason: bd.reason,
      id: bd.id,
    }));

    return successResponse({ month, year, appointments, blocked });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
