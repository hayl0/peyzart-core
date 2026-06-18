import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api/auth';

const rtf = new Intl.RelativeTimeFormat('tr', { numeric: 'auto' });

function relativeDate(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, 'minute');
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, 'hour');
  if (Math.abs(diffDays) < 30) return rtf.format(diffDays, 'day');
  if (Math.abs(diffDays) < 365) return rtf.format(Math.round(diffDays / 30), 'month');
  return rtf.format(Math.round(diffDays / 365), 'year');
}

export const GET = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;

    const service = await prisma.landscaperService.findUnique({
      where: { id },
      select: { landscaperProfileId: true },
    });

    if (!service) return errorResponse('Service not found', 404);

    const reviews = await prisma.review.findMany({
      where: { landscaperId: service.landscaperProfileId },
      include: { customer: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });

    const reviewList = reviews.map(r => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      date: relativeDate(r.createdAt),
      customer: r.customer?.name || 'Bilinmeyen',
      avatar: (r.customer?.name || '??').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase(),
    }));

    return successResponse({ reviews: reviewList });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
