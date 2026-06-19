import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api/auth';
import { verifyCustomerAuth } from '@/lib/api/customer-auth';

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Bekliyor',
  ACCEPTED: 'Devam Ediyor',
  IN_PROGRESS: 'Devam Ediyor',
  COMPLETED: 'Tamamlandı',
};

const DATE_FORMAT = { day: 'numeric' as const, month: 'long' as const, year: 'numeric' as const };

export const POST = async (request: Request) => {
  try {
    const user = await verifyCustomerAuth(request);
    if (user.role !== 'CUSTOMER') return errorResponse('Forbidden', 403);

    const body = await request.json();
    const { serviceId, date, address, notes } = body;

    if (!serviceId || !date || !address) {
      return errorResponse('serviceId, date, and address are required', 400);
    }

    const service = await prisma.landscaperService.findUnique({
      where: { id: serviceId },
    });

    if (!service) return errorResponse('Service not found', 404);

    const order = await prisma.order.create({
      data: {
        customerId: user.id,
        landscaperId: service.landscaperProfileId,
        serviceName: service.name,
        totalPrice: service.price,
        serviceDate: new Date(date),
        address,
        notes: notes || null,
        status: 'PENDING',
      },
    });

    return successResponse({ order }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};

export const GET = async (request: Request) => {
  try {
    const user = await verifyCustomerAuth(request);
    if (user.role !== 'CUSTOMER') return errorResponse('Forbidden', 403);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: Record<string, unknown> = { customerId: user.id };
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: { landscaper: { select: { companyName: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    const orderList = orders.map(o => ({
      id: o.id,
      status: o.status,
      statusLabel: STATUS_LABELS[o.status] || o.status,
      serviceName: o.serviceName,
      totalPrice: o.totalPrice,
      serviceDate: o.serviceDate.toLocaleDateString('tr-TR', DATE_FORMAT),
      address: o.address,
      notes: o.notes,
      providerName: o.landscaper?.companyName || null,
      createdAt: o.createdAt.toISOString(),
    }));

    return successResponse({
      orders: orderList,
      pagination: { page, totalPages: Math.ceil(total / limit), total },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return errorResponse(message === 'UNAUTHORIZED' ? 'Unauthorized' : 'Internal error', 401);
  }
};
