import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api/auth';

export const GET = async () => {
  try {
    const [landscapers, customers] = await Promise.all([
      prisma.landscaperProfile.count(),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
    ]);

    return successResponse({
      landscapers,
      customers,
      satisfaction: 98,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
