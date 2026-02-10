import Link from 'next/link';

export default function AppNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h2 className="text-2xl font-bold text-[var(--color-text)]">
        アプリが見つかりません
      </h2>
      <p className="mt-3 text-[var(--color-text-muted)]">
        お探しのアプリは存在しないか、ページが移動した可能性があります。
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm text-[var(--color-accent)] hover:underline"
      >
        &larr; Home に戻る
      </Link>
    </div>
  );
}
