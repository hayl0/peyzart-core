import { NextResponse, type NextRequest } from 'next/server'

const publicRoutes = [
  '/',
  '/home',
  '/login',
  '/register',
  '/sifre-sifirla',
  '/verify',
  '/kesfet',
  '/marketplace',
  '/service',
  '/_not-found',
]

const publicPrefixes = [
  '/_next',
  '/api',
  '/favicon.ico',
]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublic = publicRoutes.some(r => pathname === r || pathname.startsWith(r + '/'))
  const isPublicPrefix = publicPrefixes.some(p => pathname.startsWith(p))

  if (isPublic || isPublicPrefix) {
    return NextResponse.next()
  }

  const sessionCookie = request.cookies.get('peyzart_session')?.value

  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
