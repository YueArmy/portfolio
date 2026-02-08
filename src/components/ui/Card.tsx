import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';
import Image from 'next/image';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}

Card.Image = function CardImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

Card.Title = function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3
      className="text-base font-semibold text-[var(--color-text)]"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
    </h3>
  );
};

Card.Tags = function CardTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-sm border border-[var(--color-border)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
