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

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string) || 'Diğer';

    if (file) {
      const image = await prisma.portfolioImage.create({
        data: {
          url: file.name,
          category,
          landscaperProfileId: profile.id,
        },
      });
      return successResponse({ image }, { status: 201 });
    }

    return errorResponse('No file provided', 400);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
