'use client';

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-[var(--color-text)]">
          エラーが発生しました
        </h2>
        <button
          onClick={reset}
          className="mt-4 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-bg)]"
        >
          再試行
        </button>
      </div>
    </div>
  );
}
