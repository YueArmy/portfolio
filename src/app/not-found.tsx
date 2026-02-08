import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--color-text-dim)]">404</h1>
        <p className="mt-4 text-lg text-[var(--color-text-muted)]">
          ページが見つかりません
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-[var(--color-accent)] hover:underline"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
