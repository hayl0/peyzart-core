import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const { searchParams } = new URL(request.url);
    const tab = searchParams.get('tab') || 'Tümü';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const allOrders = [
      { id: 1, customer: 'Ahmet Yılmaz', service: 'Çim Biçme', phone: '+90 555 123 4567', address: 'Gümüşsuyu Mah. Çevre Yolu No:45', date: '18 Nis 2026', time: '14:00', price: 350, status: 'pending', notes: 'Arka bahçeye dikkat et' },
      { id: 2, customer: 'Zeynep Kaya', service: 'Bitki Dikimi', phone: '+90 555 456 7890', address: 'Ataköy Mah. Londra Asfaltı No:12', date: '18 Nis 2026', time: '16:30', price: 450, status: 'accepted', notes: '' },
      { id: 3, customer: 'Can Demir', service: 'Sulama Sistemi', phone: '+90 555 789 0123', address: 'Tarabya Mah. Sahil Yolu No:8', date: '19 Nis 2026', time: '10:00', price: 1200, status: 'in-progress', notes: 'Sistem planı eklendi' },
      { id: 4, customer: 'Mehmet Şahin', service: 'Çim Biçme', phone: '+90 555 234 5678', address: 'Taksim Mah. İstiklal Cad. No:22', date: '20 Nis 2026', time: '09:00', price: 350, status: 'pending', notes: '' },
      { id: 5, customer: 'Elif Demirtaş', service: 'Peyzaj Tasarım', phone: '+90 555 876 5432', address: 'Bebek Mah. Cevdet Paşa Cad. No:5', date: '17 Nis 2026', time: '11:00', price: 750, status: 'completed', notes: '' },
    ];

    const filtered = tab === 'Tümü' ? allOrders
      : allOrders.filter(o => {
          const statusMap: Record<string, string> = { 'Bekleyen': 'pending', 'Kabul Edilen': 'accepted', 'Devam Eden': 'in-progress', 'Tamamlanan': 'completed' };
          return o.status === statusMap[tab];
        });

    const totalPages = Math.ceil(filtered.length / limit);
    const paged = filtered.slice((page - 1) * limit, page * limit);

    return successResponse({ orders: paged, pagination: { page, totalPages, total: filtered.length } });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
