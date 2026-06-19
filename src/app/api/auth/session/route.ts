import { NextResponse } from 'next/server'
import { getAdminAuth } from '@/lib/firebase/admin'

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json()
    if (!idToken) {
      return NextResponse.json({ error: true, message: 'idToken required' }, { status: 400 })
    }

    const adminAuth = await getAdminAuth()
    if (!adminAuth) {
      return NextResponse.json({ error: true, message: 'Auth not configured' }, { status: 500 })
    }

    const decoded = await adminAuth.verifyIdToken(idToken)
    const expiresIn = 60 * 60 * 24 * 7 * 1000

    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    const response = NextResponse.json({
      data: { uid: decoded.uid, email: decoded.email, name: decoded.name || null },
    })

    response.cookies.set('peyzart_session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: expiresIn / 1000,
    })

    return response
  } catch {
    return NextResponse.json({ error: true, message: 'Invalid token' }, { status: 401 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ data: { success: true } })
  response.cookies.set('peyzart_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}
