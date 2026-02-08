import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getPublishedProjects } from '@/lib/projects';
import { parseTechStack, formatDate } from '@/lib/formatters';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { ExplorationTimeline } from '@/components/ExplorationTimeline';
import { Badge } from '@/components/ui/Badge';
import { PageTransition } from '@/components/PageTransition';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Not Found' };

  return {
    title: project.title,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const tags = parseTechStack(project.techStack);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageTransition>
        <Link
          href="/projects"
          className="mb-8 inline-block text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        >
          &larr; Projects に戻る
        </Link>

        <h1 className="text-3xl font-bold text-[var(--color-text)]">
          {project.title}
        </h1>

        {project.publishedAt && (
          <p className="mt-2 text-sm text-[var(--color-text-dim)]">
            {formatDate(project.publishedAt)}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}

        <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
          {project.description}
        </p>

        <div className="mt-10">
          <MarkdownRenderer content={project.content} />
        </div>

        <ExplorationTimeline logs={project.explorationLogs} />
      </PageTransition>
    </div>
  );
}
