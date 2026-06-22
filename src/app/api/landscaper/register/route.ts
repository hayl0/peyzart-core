import { prisma } from '@/lib/prisma'
import { getAdminAuth } from '@/lib/firebase/admin'
import { errorResponse, successResponse } from '@/lib/api/auth'

export const POST = async (request: Request) => {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return errorResponse('UNAUTHORIZED', 401)
    }

    const token = authHeader.slice(7)
    const adminAuth = await getAdminAuth()
    if (!adminAuth) {
      return errorResponse('Firebase not configured', 500)
    }

    const decoded = await adminAuth.verifyIdToken(token)
    const body = await request.json()
    const { name, email, phone, bio, selectedCategories } = body

    if (!email) return errorResponse('Email is required', 400)

    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { landscaperProfile: true },
    })
    if (existingUser) {
      return successResponse({ user: existingUser })
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        phone: phone || null,
        role: 'LANDSCAPER',
        password: '',
        landscaperProfile: {
          create: {
            bio: bio || null,
            companyName: name || null,
            isVerified: false,
          },
        },
      },
      include: { landscaperProfile: true },
    })

    if (selectedCategories?.length > 0) {
      const categories = await prisma.category.findMany({
        where: { name: { in: selectedCategories } },
      })

      await prisma.landscaperService.createMany({
        data: categories.map((cat) => ({
          name: cat.name,
          description: cat.description,
          price: 0,
          unit: 'adet',
          categoryId: cat.id,
          landscaperProfileId: user.landscaperProfile!.id,
        })),
      })
    }

    return successResponse({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      servicesCreated: selectedCategories?.length || 0,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error'
    return errorResponse(message, 500)
  }
}
