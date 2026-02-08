import { prisma } from '@/lib/prisma';
import type { ContactInput } from '@/lib/validation';

export async function createContact(data: ContactInput) {
  return prisma.contact.create({ data });
}
