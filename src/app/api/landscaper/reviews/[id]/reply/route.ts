import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const POST = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const body = await request.json();
    if (!body.message) return errorResponse('Reply message is required', 400);

    const review = await prisma.review.update({
      where: { id },
      data: { reply: body.message, repliedAt: new Date() },
    });

    return successResponse({ replied: true, reviewId: id, message: review.reply });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') return errorResponse('Review not found', 404);
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
