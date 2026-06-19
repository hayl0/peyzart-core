import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

const DEFAULT_PREFS = { newOrder: true, payment: true, review: true, marketing: false };

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const profile = await prisma.landscaperProfile.findUnique({
      where: { userId: user.id },
      select: { notificationPrefs: true },
    });

    const prefs = (profile?.notificationPrefs as typeof DEFAULT_PREFS) ?? DEFAULT_PREFS;
    return successResponse(prefs);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};

export const PATCH = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const body = await request.json();

    await prisma.landscaperProfile.updateMany({
      where: { userId: user.id },
      data: { notificationPrefs: JSON.stringify(body) },
    });

    return successResponse(body);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
