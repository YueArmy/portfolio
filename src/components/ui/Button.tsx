import { cn } from '@/lib/cn';
import { type ButtonHTMLAttributes } from 'react';

const variants = {
  primary:
    'bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-accent-muted)]',
  secondary:
    'border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-elevated)]',
  ghost:
    'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]',
  danger:
    'bg-[var(--color-danger)] text-white hover:opacity-90',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
}

export function Button({
  variant = 'primary',
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}
