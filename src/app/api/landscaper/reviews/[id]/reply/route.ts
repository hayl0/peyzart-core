import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const POST = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);
    const body = await request.json();
    return successResponse({ replied: true, reviewId: id, message: body.message });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
