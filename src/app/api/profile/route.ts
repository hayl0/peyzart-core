import { prisma } from '@/lib/prisma'
import { verifyAuth, errorResponse, successResponse } from '@/lib/api/auth'

export const GET = async (request: Request) => {
  try {
    const authUser = await verifyAuth(request)
    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: { id: true, name: true, email: true, phone: true, address: true, lat: true, lng: true, role: true },
    })
    if (!user) return errorResponse('User not found', 404)
    return successResponse({ user })
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : 'Internal error', 401)
  }
}

export const PATCH = async (request: Request) => {
  try {
    const authUser = await verifyAuth(request)
    const body = await request.json()
    const { name, phone, address } = body

    const user = await prisma.user.update({
      where: { id: authUser.id },
      data: { name, phone, address },
      select: { id: true, name: true, email: true, phone: true, address: true },
    })

    return successResponse({ user })
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : 'Internal error', 400)
  }
}
