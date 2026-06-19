import { cookies } from 'next/headers'
import { getAdminAuth } from '@/lib/firebase/admin'

const SESSION_COOKIE = 'peyzart_session'

export async function createSession(idToken: string) {
  const adminAuth = await getAdminAuth()
  if (!adminAuth) return null

  const decoded = await adminAuth.verifyIdToken(idToken)
  return {
    uid: decoded.uid,
    email: decoded.email || '',
    name: decoded.name || null,
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value
  if (!sessionCookie) return null

  try {
    const adminAuth = await getAdminAuth()
    if (!adminAuth) return null
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true)
    return {
      uid: decoded.uid,
      email: decoded.email || '',
      name: decoded.name || null,
    }
  } catch {
    return null
  }
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
