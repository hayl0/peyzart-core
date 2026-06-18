import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const POST = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);
    const formData = await request.formData();
    const file = formData.get('file');
    const category = formData.get('category') || 'Diğer';
    return successResponse({ uploaded: true, file: file ? (file as File).name : null, category }, { status: 201 });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
