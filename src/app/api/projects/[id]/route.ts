import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { projectSchema } from '@/lib/validation';
import { verifySession } from '@/lib/auth';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: { id },
      include: { explorationLogs: { orderBy: { step: 'asc' } } },
    });
    if (!project) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('GET /api/projects/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = projectSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Check slug uniqueness if changed
    if (result.data.slug !== existing.slug) {
      const slugTaken = await prisma.project.findUnique({
        where: { slug: result.data.slug },
      });
      if (slugTaken) {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...result.data,
        publishedAt:
          result.data.status === 'published' && !existing.publishedAt
            ? new Date().toISOString()
            : result.data.status === 'draft'
              ? null
              : existing.publishedAt,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('PUT /api/projects/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/projects/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
