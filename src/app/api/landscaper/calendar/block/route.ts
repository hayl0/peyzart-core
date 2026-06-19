import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const POST = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const profile = await prisma.landscaperProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) return errorResponse('Landscaper profile not found', 404);

    const body = await request.json();
    const { date, reason } = body;

    if (!date) return errorResponse('Date is required', 400);

    const blocked = await prisma.blockedDate.create({
      data: {
        date: new Date(date),
        reason: reason || null,
        landscaperProfileId: profile.id,
      },
    });

    return successResponse({ blocked: true, id: blocked.id, date: blocked.date, reason: blocked.reason });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
