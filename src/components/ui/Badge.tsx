import { cn } from '@/lib/cn';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-[var(--color-surface-elevated)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-muted)]',
        className
      )}
    >
      {children}
    </span>
  );
}
