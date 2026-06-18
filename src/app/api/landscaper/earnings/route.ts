import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'monthly';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    return successResponse({
      summary: { total: 45230, currentPeriod: 12450, previousPeriod: 10200, growth: 18 },
      chart: [
        { month: 'Oca', value: 5200 }, { month: 'Şub', value: 6800 },
        { month: 'Mar', value: 4100 }, { month: 'Nis', value: 8900 },
        { month: 'May', value: 11200 }, { month: 'Haz', value: 12450 },
      ],
      transactions: [
        { id: 1, date: '15 Haz 2026', customer: 'Ahmet Yılmaz', service: 'Çim Biçme', amount: 350, status: 'completed' },
        { id: 2, date: '14 Haz 2026', customer: 'Zeynep Kaya', service: 'Bitki Dikimi', amount: 450, status: 'completed' },
        { id: 3, date: '12 Haz 2026', customer: 'Can Demir', service: 'Sulama Sistemi', amount: 1200, status: 'completed' },
        { id: 4, date: '10 Haz 2026', customer: 'Mehmet Şahin', service: 'Çim Biçme', amount: 350, status: 'pending' },
        { id: 5, date: '8 Haz 2026', customer: 'Elif Demirtaş', service: 'Peyzaj Tasarım', amount: 750, status: 'completed' },
      ],
      pagination: { page, totalPages: 1, total: 5 },
    });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
