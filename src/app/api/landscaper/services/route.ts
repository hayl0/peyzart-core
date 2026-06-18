import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const services = [
      { id: 1, name: 'Çim Biçme', desc: 'Profesyonel çim biçme ve bakım', price: 350, unit: 'seans', active: true, duration: '2-3 saat', rating: 4.8 },
      { id: 2, name: 'Bitki Dikimi', desc: 'Ağaç, çiçek ve peyzaj düzenlemesi', price: 450, unit: 'm²', active: true, duration: '3-4 saat', rating: 4.9 },
      { id: 3, name: 'Ağaç Budama', desc: 'Büyük ağaçlar için özel budama', price: 800, unit: 'adet', active: true, duration: '4-5 saat', rating: 4.7 },
      { id: 4, name: 'Sulama Sistemi', desc: 'Otomatik sulama sistemi kurulumu', price: 1200, unit: 'proje', active: false, duration: '6-8 saat', rating: 4.6 },
    ];
    return successResponse({ services });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};

export const POST = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);

    const body = await request.json();
    const service = { id: Date.now(), ...body, active: true, rating: 0 };
    return successResponse({ service }, { status: 201 });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
