import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

const DEFAULT_WORKING_HOURS = [
  { day: 'Pazartesi', open: '09:00', close: '18:00', active: true },
  { day: 'Salı', open: '09:00', close: '18:00', active: true },
  { day: 'Çarşamba', open: '09:00', close: '18:00', active: true },
  { day: 'Perşembe', open: '09:00', close: '18:00', active: true },
  { day: 'Cuma', open: '09:00', close: '18:00', active: true },
  { day: 'Cumartesi', open: '10:00', close: '16:00', active: true },
  { day: 'Pazar', open: '', close: '', active: false },
];

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const profile = await prisma.landscaperProfile.findUnique({
      where: { userId: user.id },
      include: { blockedDates: { select: { id: true, date: true, reason: true } } },
    });

    if (!profile) return errorResponse('Landscaper profile not found', 404);

    const workingHours = profile.workingHours as typeof DEFAULT_WORKING_HOURS | null ?? DEFAULT_WORKING_HOURS;

    return successResponse({
      availability: {
        workingHours,
        blockedDates: profile.blockedDates.map(bd => ({
          id: bd.id,
          date: bd.date.toISOString().split('T')[0],
          reason: bd.reason,
        })),
      },
    });
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
    const { workingHours } = body;

    if (workingHours) {
      await prisma.landscaperProfile.updateMany({
        where: { userId: user.id },
        data: { workingHours: JSON.stringify(workingHours) },
      });
    }

    return successResponse({ availability: body });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
