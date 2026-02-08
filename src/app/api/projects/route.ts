import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { projectSchema } from '@/lib/validation';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        techStack: true,
        imageUrl: true,
        status: true,
        featured: true,
        publishedAt: true,
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = projectSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const existing = await prisma.project.findUnique({
      where: { slug: result.data.slug },
    });
    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }

    const project = await prisma.project.create({
      data: {
        ...result.data,
        publishedAt: result.data.status === 'published' ? new Date().toISOString() : null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('POST /api/projects error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
