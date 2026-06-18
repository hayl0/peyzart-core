import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        name: true, email: true, phone: true, address: true,
      },
    });

    if (!dbUser) return errorResponse('User not found', 404);

    return successResponse({
      profile: dbUser,
      notifications: { newOrder: true, payment: true, review: true, marketing: false },
      preferences: { language: 'tr', theme: 'dark' },
    });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};

export const PATCH = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const body = await request.json();
    const { name, phone, address } = body;

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(address !== undefined && { address }),
      },
      select: { name: true, email: true, phone: true, address: true },
    });

    return successResponse({ profile: updated });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
