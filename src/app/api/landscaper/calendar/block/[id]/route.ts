import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const DELETE = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    await prisma.blockedDate.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') return errorResponse('Blocked date not found', 404);
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
