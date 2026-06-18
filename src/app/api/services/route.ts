import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (category) where.name = category;

    const [services, total, categoryRows] = await Promise.all([
      prisma.landscaperService.findMany({
        where,
        include: {
          landscaperProfile: {
            include: {
              user: { select: { name: true } },
              portfolio: { take: 1, orderBy: { createdAt: 'desc' } },
            },
          },
        },
        skip: offset,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      prisma.landscaperService.count({ where }),
      prisma.landscaperService.findMany({
        select: { name: true },
        distinct: ['name'],
        orderBy: { name: 'asc' },
      }),
    ]);

    const serviceList = services.map(s => ({
      id: s.id,
      name: s.name,
      description: s.description,
      price: s.price,
      unit: s.unit,
      providerName: s.landscaperProfile?.user?.name || null,
      companyName: s.landscaperProfile?.companyName || null,
      rating: s.landscaperProfile?.rating || 0,
      reviewCount: s.landscaperProfile?.reviewCount || 0,
      image: s.landscaperProfile?.portfolio?.[0]?.url || null,
    }));

    return successResponse({
      services: serviceList,
      total,
      categories: categoryRows.map(c => c.name),
    });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
