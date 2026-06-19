import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { landscaperProfile: true },
    });

    if (!dbUser) return errorResponse('User not found', 404);
    if (!dbUser.landscaperProfile) return errorResponse('Landscaper profile not found', 404);

    return successResponse({
      name: dbUser.name,
      email: dbUser.email,
      phone: dbUser.phone,
      address: dbUser.address,
      companyName: dbUser.landscaperProfile.companyName,
      bio: dbUser.landscaperProfile.bio,
      experience: dbUser.landscaperProfile.experience,
      isVerified: dbUser.landscaperProfile.isVerified,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};

export const PATCH = async (request: Request) => {
  try {
    const authUser = await verifyAuth(request);
    if (authUser.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const body = await request.json();
    const { name, phone, address, companyName, bio, experience } = body;

    const [updatedUser] = await Promise.all([
      prisma.user.update({
        where: { id: authUser.id },
        data: {
          ...(name !== undefined && { name }),
          ...(phone !== undefined && { phone }),
          ...(address !== undefined && { address }),
        },
      }),
      prisma.landscaperProfile.updateMany({
        where: { userId: authUser.id },
        data: {
          ...(companyName !== undefined && { companyName }),
          ...(bio !== undefined && { bio }),
          ...(experience !== undefined && { experience: parseInt(experience) }),
        },
      }),
    ]);

    return successResponse({
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      companyName,
      bio,
      experience,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
