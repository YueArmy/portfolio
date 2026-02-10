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
    title: `プライバシーポリシー — ${app.appName}`,
    description: `${app.appName}のプライバシーポリシー`,
  };
}

export function generateStaticParams() {
  return getAllApps().map((app) => ({ slug: app.slug }));
}

export default async function PrivacyPage({ params }: Props) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) notFound();

  return (
    <PageTransition>
      <h1 className="text-3xl font-bold text-[var(--color-text)]">
        プライバシーポリシー
      </h1>
      <p className="mt-2 text-sm text-[var(--color-text-dim)]">
        施行日: {app.effectiveDate}
      </p>

      <div className="mt-10">
        <MarkdownRenderer content={app.privacyPolicy} />
      </div>
    </PageTransition>
  );
}
