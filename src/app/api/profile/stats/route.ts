import { prisma } from '@/lib/prisma'
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth'

export const GET = async (request: Request) => {
  try {
    const authUser = await verifyAuth(request)

    const dbUser = await prisma.user.findUnique({
      where: { email: authUser.email },
      select: { id: true, createdAt: true },
    })

    if (!dbUser) return errorResponse('User not found', 404)

    const [orderCount, reviewCount, ratingAgg] = await Promise.all([
      prisma.order.count({ where: { customerId: dbUser.id } }),
      prisma.review.count({ where: { customerId: dbUser.id } }),
      prisma.review.aggregate({
        where: { customerId: dbUser.id },
        _avg: { rating: true },
      }),
    ])

    return successResponse({
      orders: orderCount,
      reviews: reviewCount,
      rating: ratingAgg._avg.rating || 0,
      memberSince: dbUser.createdAt,
    })
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : 'Internal error', 401)
  }
}
