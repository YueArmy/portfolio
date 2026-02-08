import { cn } from '@/lib/cn';
import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1.5">
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-[var(--color-text-muted)]"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full rounded-md border bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)]',
            'placeholder:text-[var(--color-text-dim)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]',
            'min-h-[120px] resize-y',
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

Textarea.displayName = 'Textarea';
