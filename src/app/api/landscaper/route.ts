import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    return successResponse({ role: user.role, email: user.email, name: user.name });
  } catch {
    return errorResponse('Unauthorized', 401);
  }
};
