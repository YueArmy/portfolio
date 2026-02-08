import type { Metadata } from 'next';
import { ProjectGrid } from '@/components/ProjectGrid';
import { PageTransition } from '@/components/PageTransition';
import { getPublishedProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: '公開プロジェクト一覧',
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageTransition>
        <h1 className="mb-10 text-3xl font-bold text-[var(--color-text)]">
          Projects
        </h1>
        <ProjectGrid projects={projects} />
      </PageTransition>
    </div>
  );
}
