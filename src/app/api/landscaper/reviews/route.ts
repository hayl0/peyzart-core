import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const reviews = [
      { id: 1, customer: 'Ahmet Yılmaz', rating: 5, comment: 'Harika iş çıkardı, çok memnun kaldım.', date: '15 Haz 2026', avatar: 'AY' },
      { id: 2, customer: 'Zeynep Kaya', rating: 5, comment: 'Profesyonel ve titiz çalışma.', date: '12 Haz 2026', avatar: 'ZK' },
      { id: 3, customer: 'Can Demir', rating: 4, comment: 'İşini iyi yapıyor, zamanında geldi.', date: '10 Haz 2026', avatar: 'CD' },
      { id: 4, customer: 'Mehmet Şahin', rating: 5, comment: 'Bahçemiz hayal ettiğimizden güzel oldu.', date: '8 Haz 2026', avatar: 'MŞ' },
    ];

    return successResponse({
      averageRating: 4.8,
      totalReviews: 24,
      distribution: { 5: 18, 4: 4, 3: 1, 2: 1, 1: 0 },
      reviews,
      pagination: { page, totalPages: 1, total: reviews.length },
    });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
