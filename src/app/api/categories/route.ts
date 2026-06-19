import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api/auth'

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
    })
    return successResponse({ categories })
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : 'Internal error', 500)
  }
}
