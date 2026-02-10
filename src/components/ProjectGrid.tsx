'use client';

import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer';
import { ProjectCard } from '@/components/ProjectCard';

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: unknown;
  imageUrl: string | null;
}

interface ProjectGridProps {
  projects: ProjectItem[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-center text-[var(--color-text-muted)]">
        プロジェクトはまだありません。
      </p>
    );
  }

  return (
    <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <StaggerItem key={project.id}>
          <ProjectCard
            title={project.title}
            slug={project.slug}
            description={project.description}
            techStack={project.techStack}
            imageUrl={project.imageUrl}
          />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
