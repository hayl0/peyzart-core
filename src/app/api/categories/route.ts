import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const services = await prisma.landscaperService.findMany({
      select: { name: true },
      distinct: ['name'],
      orderBy: { name: 'asc' },
    });

    return successResponse({ categories: services.map(s => s.name) });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
