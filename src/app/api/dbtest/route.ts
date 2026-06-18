import { prisma } from '@/lib/prisma';

export const GET = async () => {
  try {
    const count = await prisma.user.count();
    return Response.json({ ok: true, count });
  } catch (e: any) {
    return Response.json({ ok: false, error: e.message, stack: e.stack?.split('\n').slice(0, 3).join('\\n') }, { status: 500 });
  }
};
