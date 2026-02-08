import { prisma } from '@/lib/prisma';

export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      techStack: true,
      imageUrl: true,
      featured: true,
      publishedAt: true,
    },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug, status: 'published' },
    include: { explorationLogs: { orderBy: { step: 'asc' } } },
  });
}
