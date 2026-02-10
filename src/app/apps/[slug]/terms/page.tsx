import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllApps, getAppBySlug } from '@/lib/apps';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { PageTransition } from '@/components/PageTransition';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) return { title: 'Not Found' };

  return {
    title: `利用規約 — ${app.appName}`,
    description: `${app.appName}の利用規約`,
  };
}

export function generateStaticParams() {
  return getAllApps().map((app) => ({ slug: app.slug }));
}

export default async function TermsPage({ params }: Props) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) notFound();

  return (
    <PageTransition>
      <h1 className="text-3xl font-bold text-[var(--color-text)]">
        利用規約
      </h1>
      <p className="mt-2 text-sm text-[var(--color-text-dim)]">
        施行日: {app.effectiveDate}
      </p>

      <div className="mt-10">
        <MarkdownRenderer content={app.termsOfUse} />
      </div>
    </PageTransition>
  );
}
