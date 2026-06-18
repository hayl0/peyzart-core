import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const PATCH = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);
    const body = await request.json();
    return successResponse({ id, ...body });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};

export const DELETE = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);
    return successResponse({ deleted: true, id });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
