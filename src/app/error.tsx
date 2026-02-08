'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">
          エラーが発生しました
        </h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          しばらくしてからもう一度お試しください。
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] hover:bg-[var(--color-accent-muted)]"
        >
          再試行
        </button>
      </div>
    </div>
  );
}
