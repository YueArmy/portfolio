interface StrengthItemProps {
  ability: string;
  meaning: string;
}

export function StrengthItem({ ability, meaning }: StrengthItemProps) {
  return (
    <div className="flex items-baseline gap-3 border-b border-[var(--color-border)] py-4 last:border-b-0">
      <span className="shrink-0 text-sm font-medium text-[var(--color-text)]">
        {ability}
      </span>
      <span className="text-[var(--color-accent)]">&rarr;</span>
      <span className="text-[13px] text-[var(--color-text-muted)]">
        {meaning}
      </span>
    </div>
  );
}
