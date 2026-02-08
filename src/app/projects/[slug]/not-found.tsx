import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h2 className="text-2xl font-bold text-[var(--color-text)]">
        プロジェクトが見つかりません
      </h2>
      <p className="mt-3 text-[var(--color-text-muted)]">
        お探しのプロジェクトは存在しないか、非公開です。
      </p>
      <Link
        href="/projects"
        className="mt-6 inline-block text-sm text-[var(--color-accent)] hover:underline"
      >
        &larr; Projects に戻る
      </Link>
    </div>
  );
}
