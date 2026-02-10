import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { parseTechStack } from '@/lib/formatters';

interface ProjectCardProps {
  title: string;
  slug: string;
  description: string;
  techStack: unknown;
  imageUrl: string | null;
}

export function ProjectCard({
  title,
  slug,
  description,
  techStack,
  imageUrl,
}: ProjectCardProps) {
  const tags = parseTechStack(techStack);

  return (
    <Link href={`/projects/${slug}`} className="group block">
      <Card className="relative transition-all duration-300 hover:border-[var(--color-border-accent)] hover:shadow-[0_0_30px_var(--color-accent-glow)]">
        {/* Top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/0 to-transparent transition-all duration-500 group-hover:via-[var(--color-accent)]/60" />

        {imageUrl && (
          <div className="overflow-hidden">
            <Card.Image src={imageUrl} alt={title} />
          </div>
        )}
        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <Card.Title>{title}</Card.Title>
            {/* Arrow indicator */}
            <span className="mt-1 text-xs text-[var(--color-text-dim)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]">
              &rarr;
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">
            {description}
          </p>
          {tags.length > 0 && <Card.Tags tags={tags} />}
        </div>
      </Card>
    </Link>
  );
}
