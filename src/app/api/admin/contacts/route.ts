import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('GET /api/admin/contacts error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
