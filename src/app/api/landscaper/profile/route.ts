import { prisma } from '@/lib/prisma';
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth';

export const GET = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);
    return successResponse({
      name: user.name,
      email: user.email,
      phone: '+90 555 123 4567',
      address: 'İstanbul, Türkiye',
      companyName: 'Yeşil Bahçe Peyzaj',
      bio: '10 yıllık deneyim',
      notifications: { newOrder: true, payment: true, review: true, marketing: false },
    });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};

export const PATCH = async (request: Request) => {
  try {
    const user = await verifyAuth(request);
    if (user.role !== 'LANDSCAPER') return errorResponse('Forbidden', 403);
    const body = await request.json();
    return successResponse({ ...body });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
