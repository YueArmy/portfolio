import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
      where: { slug, status: 'published' },
      include: { explorationLogs: { orderBy: { step: 'asc' } } },
    });

    if (!project) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('GET /api/projects/by-slug/[slug] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
