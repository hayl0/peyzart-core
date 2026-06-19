import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const PATCH = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const body = await request.json();
    const { status } = body;

    if (!status) return errorResponse('Status is required', 400);

    const validStatuses = ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) return errorResponse('Invalid status', 400);

    const order = await prisma.order.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });

    return successResponse({ order });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') return errorResponse('Order not found', 404);
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
