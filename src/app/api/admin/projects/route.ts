import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { _count: { select: { explorationLogs: true } } },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('GET /api/admin/projects error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
