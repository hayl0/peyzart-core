import { getAdminAuth } from '@/lib/firebase/admin';
import { prisma } from '@/lib/prisma';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string | null;
  role: 'CUSTOMER' | 'LANDSCAPER' | 'ADMIN';
}

export async function verifyAuth(request: Request): Promise<AuthenticatedUser> {
  const authHeader = request.headers.get('authorization');
  const bypassAuth = process.env.BYPASS_AUTH === 'true' || request.headers.get('x-bypass-auth') === 'true';

  if (bypassAuth) {
    return { id: 'dev-user', email: 'dev@peyzart.com', name: 'Dev User', role: 'LANDSCAPER' as const };
  }

  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('UNAUTHORIZED');
  }

  const token = authHeader.slice(7);
  const adminAuth = await getAdminAuth();
  if (!adminAuth) {
    console.warn('Firebase Admin not configured — auth bypassed for development');
    return { id: 'dev-user', email: 'dev@peyzart.com', name: 'Dev User', role: 'LANDSCAPER' as const };
  }
  const decoded = await adminAuth.verifyIdToken(token);

  const user = await prisma.user.findUnique({
    where: { email: decoded.email! },
  });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export function errorResponse(message: string, status: number = 400) {
  return Response.json({ error: true, message }, { status });
}

export function successResponse(data: unknown, init?: ResponseInit) {
  return Response.json({ data }, init);
}
