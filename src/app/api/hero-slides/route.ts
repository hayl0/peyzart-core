import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const slides = await prisma.category.findMany({
      where: { isHeroSlide: true, parentId: null },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        order: true,
      },
    })

    return NextResponse.json({ slides })
  } catch {
    return NextResponse.json(
      { error: true, message: 'Failed to fetch slides' },
      { status: 500 }
    )
  }
}
