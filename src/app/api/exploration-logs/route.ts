import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { explorationLogSchema } from '@/lib/validation';
import { verifySession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = explorationLogSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: result.data.projectId },
    });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const log = await prisma.explorationLog.create({ data: result.data });
    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    console.error('POST /api/exploration-logs error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
