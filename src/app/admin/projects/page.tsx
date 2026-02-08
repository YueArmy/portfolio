'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface AdminProject {
  id: string;
  title: string;
  slug: string;
  status: string;
  featured: boolean;
  updatedAt: string;
  _count: { explorationLogs: number };
}

export default function AdminProjectsPage() {
  const { data: projects, isLoading } = useSWR<AdminProject[]>(
    '/api/admin/projects',
    fetcher
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Projects
        </h1>
        <Link href="/admin/projects/new">
          <Button>新規作成</Button>
        </Link>
      </div>

      {isLoading && (
        <p className="mt-8 text-[var(--color-text-muted)]">読み込み中...</p>
      )}

      {projects && (
        <div className="mt-6 space-y-2">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/admin/projects/${p.id}`}
              className="flex items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-accent)]/30"
            >
              <div>
                <span className="font-medium text-[var(--color-text)]">
                  {p.title}
                </span>
                <span className="ml-3 text-xs text-[var(--color-text-dim)]">
                  /{p.slug}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--color-text-dim)]">
                  Logs: {p._count.explorationLogs}
                </span>
                {p.featured && (
                  <Badge className="bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    Featured
                  </Badge>
                )}
                <Badge
                  className={
                    p.status === 'published'
                      ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                      : ''
                  }
                >
                  {p.status}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
