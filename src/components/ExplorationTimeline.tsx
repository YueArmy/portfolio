import { ExplorationStep } from '@/components/ExplorationStep';

interface Log {
  id: string;
  step: number;
  title: string;
  body: string;
}

interface ExplorationTimelineProps {
  logs: Log[];
}

export function ExplorationTimeline({ logs }: ExplorationTimelineProps) {
  if (logs.length === 0) return null;

  return (
    <section className="mt-16 border-t border-[var(--color-border)] pt-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent" />
        <h2
          className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Exploration Log
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-[var(--color-accent)]/30 to-transparent" />
      </div>

      <div className="relative ml-3 border-l border-[var(--color-border)]">
        {logs.map((log) => (
          <ExplorationStep
            key={log.id}
            step={log.step}
            title={log.title}
            body={log.body}
          />
        ))}
      </div>
    </section>
  );
}
