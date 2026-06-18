import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const { searchParams } = new URL(request.url);
    const month = parseInt(searchParams.get('month') || '6');
    const year = parseInt(searchParams.get('year') || '2026');

    const appointments: Record<string, { time: string; customer: string; service: string }[]> = {
      '2026-5-5': [{ time: '10:00', customer: 'Ahmet Yılmaz', service: 'Çim Biçme' }],
      '2026-5-12': [{ time: '09:30', customer: 'Can Demir', service: 'Sulama Sistemi' }],
      '2026-5-15': [{ time: '11:00', customer: 'Mehmet Şahin', service: 'Çim Biçme' }],
      '2026-5-22': [{ time: '13:00', customer: 'Ali Yıldız', service: 'Ağaç Budama' }],
      '2026-5-28': [{ time: '08:00', customer: 'Ayşe Kara', service: 'Çim Biçme' }],
    };

    return successResponse({ month, year, appointments });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
