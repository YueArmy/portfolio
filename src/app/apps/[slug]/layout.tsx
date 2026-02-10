import { notFound } from 'next/navigation';
import { getAppBySlug } from '@/lib/apps';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export default async function AppLayout({ params, children }: Props) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <nav className="mb-8 text-sm text-[var(--color-text-muted)]">
        <Link href="/" className="hover:text-[var(--color-text)]">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-text)]">{app.appName}</span>
      </nav>
      {children}
    </div>
  );
}
