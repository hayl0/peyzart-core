import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    return successResponse({
      kpis: {
        activeCustomers: 24,
        activeProjects: 8,
        monthlyEarnings: 12450,
        responseTime: 2.3,
      },
      weeklyActivity: [
        { day: 'Pzt', value: 65 },
        { day: 'Sal', value: 72 },
        { day: 'Çar', value: 58 },
        { day: 'Per', value: 84 },
        { day: 'Cum', value: 91 },
        { day: 'Cmt', value: 45 },
        { day: 'Paz', value: 38 },
      ],
      notifications: [
        { title: 'Yeni müşteri talebi', desc: 'Çim Bakımı için talep', time: '2 dk önce', type: 'warning' },
        { title: 'Proje tamamlandı', desc: 'Zeynep K. — Bahçe Düzenleme', time: '1 saat önce', type: 'success' },
        { title: 'Ödeme alındı', desc: '₺1.200 — Sulama Sistemi', time: '3 saat önce', type: 'info' },
      ],
    });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
