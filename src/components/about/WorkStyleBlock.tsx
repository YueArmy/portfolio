interface WorkStyleBlockProps {
  number: number;
  title: string;
  description: string;
}

export function WorkStyleBlock({ number, title, description }: WorkStyleBlockProps) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <span
        className="text-3xl font-extrabold text-[var(--color-accent)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {String(number).padStart(2, '0')}
      </span>
      <h3
        className="mt-3 text-sm font-semibold text-[var(--color-text)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
        {description}
      </p>
    </div>
  );
}
