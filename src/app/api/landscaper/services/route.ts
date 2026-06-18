import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const profile = await prisma.landscaperProfile.findUnique({
      where: { userId: user.id },
      include: { services: true },
    });

    if (!profile) return errorResponse('Landscaper profile not found', 404);

    return successResponse({ services: profile.services });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};

export const POST = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const profile = await prisma.landscaperProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) return errorResponse('Landscaper profile not found', 404);

    const body = await request.json();
    const { name, description, price, unit } = body;

    if (!name || price === undefined) return errorResponse('name and price are required', 400);

    const service = await prisma.landscaperService.create({
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        unit: unit || 'fixed',
        landscaperProfileId: profile.id,
      },
    });

    return successResponse({ service }, { status: 201 });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
