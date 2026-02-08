interface ScenarioCardProps {
  challenge: string;
  solution: string;
}

export function ScenarioCard({ challenge, solution }: ScenarioCardProps) {
  return (
    <div className="rounded-lg border-l-2 border-l-[var(--color-accent)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:bg-[var(--color-surface-elevated)]">
      <p className="font-medium text-[var(--color-text)]">{challenge}</p>
      <p className="mt-2 text-[13px] text-[var(--color-text-muted)]">{solution}</p>
    </div>
  );
}
