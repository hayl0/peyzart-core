import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const profile = await prisma.landscaperProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) return errorResponse('Landscaper profile not found', 404);

    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const orderBy: Record<string, string> = sort === 'oldest' ? { createdAt: 'asc' } : { createdAt: 'desc' };

    const [reviews, totalReviews, ratingAgg] = await Promise.all([
      prisma.review.findMany({
        where: { landscaperId: profile.id },
        include: { customer: { select: { name: true } } },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.review.count({ where: { landscaperId: profile.id } }),
      prisma.review.aggregate({
        where: { landscaperId: profile.id },
        _avg: { rating: true },
      }),
    ]);

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const allRatings = await prisma.review.findMany({
      where: { landscaperId: profile.id },
      select: { rating: true },
    });
    allRatings.forEach(r => { distribution[r.rating as keyof typeof distribution]++; });

    const reviewList = reviews.map(r => ({
      id: r.id,
      customer: r.customer?.name || 'Bilinmeyen',
      rating: r.rating,
      comment: r.comment,
      date: r.createdAt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }),
      avatar: (r.customer?.name || '??').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase(),
      reply: r.reply,
      repliedAt: r.repliedAt,
    }));

    const totalPages = Math.ceil(totalReviews / limit);
    const averageRating = ratingAgg._avg?.rating || 0;

    return successResponse({
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      distribution,
      reviews: reviewList,
      pagination: { page, totalPages, total: totalReviews },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
