import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const profile = await prisma.landscaperProfile.findUnique({
      where: { userId: user.id },
      include: { portfolio: true },
    });

    if (!profile) return errorResponse('Landscaper profile not found', 404);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const images = category
      ? profile.portfolio.filter(i => i.category === category)
      : profile.portfolio;

    return successResponse({ images });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
