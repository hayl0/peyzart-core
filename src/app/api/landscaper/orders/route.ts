import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

const STATUS_MAP: Record<string, string> = {
  'Bekleyen': 'PENDING',
  'Kabul Edilen': 'ACCEPTED',
  'Devam Eden': 'IN_PROGRESS',
  'Tamamlanan': 'COMPLETED',
};

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const profile = await prisma.landscaperProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) return errorResponse('Landscaper profile not found', 404);

    const { searchParams } = new URL(request.url);
    const tab = searchParams.get('tab') || 'Tümü';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = { landscaperId: profile.id };
    if (tab !== 'Tümü' && STATUS_MAP[tab]) {
      where.status = STATUS_MAP[tab];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          customer: { select: { id: true, name: true, email: true, phone: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return successResponse({ orders, pagination: { page, totalPages, total } });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
