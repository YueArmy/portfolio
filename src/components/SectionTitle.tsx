export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <h2
        className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {children}
      </h2>
      <div className="h-px flex-1 bg-[var(--color-border)]" />
    </div>
  );
}
