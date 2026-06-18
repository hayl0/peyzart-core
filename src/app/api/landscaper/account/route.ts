import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const DELETE = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    await prisma.user.delete({ where: { id: user.id } });
    return successResponse({ deleted: true });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
