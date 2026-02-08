import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface ExplorationStepProps {
  step: number;
  title: string;
  body: string;
}

export function ExplorationStep({ step, title, body }: ExplorationStepProps) {
  return (
    <div className="relative pl-10 pb-10 last:pb-0">
      {/* Node */}
      <div className="absolute -left-[7px] top-0 flex h-[14px] w-[14px] items-center justify-center">
        <div className="h-[7px] w-[7px] rounded-full bg-[var(--color-accent)]" />
      </div>

      {/* Step number */}
      <span
        className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-dim)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Step {String(step).padStart(2, '0')}
      </span>

      <h3
        className="text-base font-semibold text-[var(--color-text)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h3>

      <div className="mt-3">
        <MarkdownRenderer content={body} />
      </div>
    </div>
  );
}
