import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const availability = {
      workingHours: [
        { day: 'Pazartesi', open: '09:00', close: '18:00', active: true },
        { day: 'Salı', open: '09:00', close: '18:00', active: true },
        { day: 'Çarşamba', open: '09:00', close: '18:00', active: true },
        { day: 'Perşembe', open: '09:00', close: '18:00', active: true },
        { day: 'Cuma', open: '09:00', close: '18:00', active: true },
        { day: 'Cumartesi', open: '10:00', close: '16:00', active: true },
        { day: 'Pazar', open: '', close: '', active: false },
      ],
      blockedDates: [],
    };
    return successResponse({ availability });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};

export const PATCH = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);
    const body = await request.json();
    return successResponse({ availability: body });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
