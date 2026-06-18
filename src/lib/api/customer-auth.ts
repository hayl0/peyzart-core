import { verifyAuth } from './auth';
import { prisma } from '@/lib/prisma';

export async function verifyCustomerAuth(request: Request) {
  const user = await verifyAuth(request);
  if (user.id === 'dev-user') {
    const customer = await prisma.user.findFirst({ where: { role: 'CUSTOMER' } });
    if (customer) {
      return { ...user, id: customer.id, email: customer.email, name: customer.name, role: 'CUSTOMER' as const };
    }
  }
  return user;
}
