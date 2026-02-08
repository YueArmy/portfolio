'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminDashboard() {
  const { data: projects } = useSWR('/api/admin/projects', fetcher);
  const { data: contacts } = useSWR('/api/admin/contacts', fetcher);

  const projectCount = Array.isArray(projects) ? projects.length : 0;
  const publishedCount = Array.isArray(projects)
    ? projects.filter((p: { status: string }) => p.status === 'published').length
    : 0;
  const contactCount = Array.isArray(contacts) ? contacts.length : 0;
  const unreadCount = Array.isArray(contacts)
    ? contacts.filter((c: { read: boolean }) => !c.read).length
    : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text)]">
        Dashboard
      </h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Projects" value={projectCount} />
        <StatCard label="Published" value={publishedCount} />
        <StatCard label="Total Contacts" value={contactCount} />
        <StatCard label="Unread" value={unreadCount} accent />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
      <p
        className={`mt-1 text-3xl font-bold ${
          accent ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]'
        }`}
      >
        {value}
      </p>
    </div>
  );
}
