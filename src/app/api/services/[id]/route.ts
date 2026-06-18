import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api/auth';

const DAY_MAP: Record<string, string> = {
  monday: 'Pazartesi',
  tuesday: 'Salı',
  wednesday: 'Çarşamba',
  thursday: 'Perşembe',
  friday: 'Cuma',
  saturday: 'Cumartesi',
  sunday: 'Pazar',
};

export const GET = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;

    const service = await prisma.landscaperService.findUnique({
      where: { id },
      include: {
        landscaperProfile: {
          include: {
            user: { select: { name: true, email: true, phone: true } },
            portfolio: { orderBy: { createdAt: 'desc' } },
          },
        },
      },
    });

    if (!service) return errorResponse('Service not found', 404);

    const workingHours = service.landscaperProfile.workingHours as Record<string, { isOpen: boolean }> | null;
    const availableDays = workingHours
      ? Object.entries(workingHours)
          .filter(([, v]) => v.isOpen)
          .map(([k]) => DAY_MAP[k.toLowerCase()] || k)
      : [];

    const images = service.landscaperProfile.portfolio.map(p => p.url);

    return successResponse({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      unit: service.unit,
      provider: {
        name: service.landscaperProfile.user?.name,
        email: service.landscaperProfile.user?.email,
        phone: service.landscaperProfile.user?.phone,
        companyName: service.landscaperProfile.companyName,
        bio: service.landscaperProfile.bio,
        experience: service.landscaperProfile.experience,
        rating: service.landscaperProfile.rating,
        reviewCount: service.landscaperProfile.reviewCount,
        isVerified: service.landscaperProfile.isVerified,
      },
      images,
      availableDays,
    });
  } catch (e: any) {
    return errorResponse(e.message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
