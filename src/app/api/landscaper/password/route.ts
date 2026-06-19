import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const PATCH = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);
    const body = await request.json();

    if (!body.currentPassword || !body.newPassword) {
      return errorResponse('Current password and new password are required');
    }
    if (body.newPassword.length < 6) {
      return errorResponse('New password must be at least 6 characters');
    }
    if (body.newPassword !== body.confirmPassword) {
      return errorResponse('Passwords do not match');
    }

    return successResponse({ updated: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
