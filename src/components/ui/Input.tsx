import { cn } from '@/lib/cn';
import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[var(--color-text-muted)]"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-md border bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)]',
            'placeholder:text-[var(--color-text-dim)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]',
            error
              ? 'border-[var(--color-danger)]'
              : 'border-[var(--color-border)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-[var(--color-danger)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
