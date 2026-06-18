import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'Tümü';

    const images = [
      { id: 1, url: '', category: 'Bahçe Düzenleme', description: 'Villa bahçesi tam düzenleme' },
      { id: 2, url: '', category: 'Çim Bakımı', description: 'Haziran 2026 çim bakımı' },
      { id: 3, url: '', category: 'Sulama Sistemi', description: 'Otomatik sulama kurulumu' },
      { id: 4, url: '', category: 'Ağaç Budama', description: 'Büyük ağaç budama' },
      { id: 5, url: '', category: 'Bahçe Düzenleme', description: 'Modern peyzaj tasarımı' },
      { id: 6, url: '', category: 'Çim Bakımı', description: 'Periyodik bakım' },
    ];

    const filtered = category === 'Tümü' ? images : images.filter(i => i.category === category);
    return successResponse({ images: filtered });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
