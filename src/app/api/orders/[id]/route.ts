import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api/auth';
import { verifyCustomerAuth } from '@/lib/api/customer-auth';

function getTimeline(status: string, createdAt: string) {
  const time = new Date(createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  const steps = [
    { label: 'Talep Alındı', time, done: true },
    { label: 'Kabul Edildi', time: '-', done: false },
    { label: 'İş Başladı', time: '-', done: false },
    { label: 'Tamamlandı', time: '-', done: false },
  ];

  if (status === 'ACCEPTED' || status === 'IN_PROGRESS' || status === 'COMPLETED') {
    steps[1].done = true;
  }
  if (status === 'IN_PROGRESS' || status === 'COMPLETED') {
    steps[2].done = true;
  }
  if (status === 'COMPLETED') {
    steps[3].done = true;
  }

  return steps;
}

const DATE_FORMAT = { day: 'numeric' as const, month: 'long' as const, year: 'numeric' as const };

export const GET = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const user = await verifyCustomerAuth(request);
    if (user.role !== 'CUSTOMER') return errorResponse('Forbidden', 403);

    const order = await prisma.order.findUnique({
      where: { id },
      include: { landscaper: { select: { companyName: true } } },
    });

    if (!order) return errorResponse('Order not found', 404);
    if (order.customerId !== user.id) return errorResponse('Forbidden', 403);

    return successResponse({
      order: {
        id: order.id,
        status: order.status,
        serviceName: order.serviceName,
        totalPrice: order.totalPrice,
        serviceDate: order.serviceDate.toLocaleDateString('tr-TR', DATE_FORMAT),
        address: order.address,
        notes: order.notes,
        providerName: order.landscaper?.companyName || null,
        createdAt: order.createdAt.toISOString(),
        timeline: getTimeline(order.status, order.createdAt.toISOString()),
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
