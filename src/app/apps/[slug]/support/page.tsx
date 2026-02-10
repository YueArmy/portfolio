import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllApps, getAppBySlug } from '@/lib/apps';
import { PageTransition } from '@/components/PageTransition';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) return { title: 'Not Found' };

  return {
    title: `サポート — ${app.appName}`,
    description: `${app.appName}のサポート・お問い合わせ`,
  };
}

export function generateStaticParams() {
  return getAllApps().map((app) => ({ slug: app.slug }));
}

export default async function SupportPage({ params }: Props) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) notFound();

  const mailtoSubject = encodeURIComponent(`[${app.appName}] サポートリクエスト`);

  return (
    <PageTransition>
      <h1 className="text-3xl font-bold text-[var(--color-text)]">
        サポート
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
        {app.description}
      </p>

      {app.faq && app.faq.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-[var(--color-text)]">
            よくある質問
          </h2>
          <div className="mt-6 space-y-6">
            {app.faq.map((item, i) => (
              <div key={i} className="border-l-2 border-[var(--color-accent)] pl-4">
                <h3 className="font-semibold text-[var(--color-text)]">
                  {item.question}
                </h3>
                <p className="mt-1 text-[var(--color-text-muted)]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-bold text-[var(--color-text)]">
          お問い合わせ
        </h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          上記で解決しない場合は、メールにてお問い合わせください。
        </p>
        <a
          href={`mailto:${app.contactEmail}?subject=${mailtoSubject}`}
          className="mt-4 inline-block rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          {app.contactEmail} にメールする
        </a>
      </section>

      <footer className="mt-16 flex gap-6 text-sm text-[var(--color-text-muted)]">
        <Link
          href={`/apps/${app.slug}/privacy`}
          className="hover:text-[var(--color-text)]"
        >
          プライバシーポリシー
        </Link>
        <Link
          href={`/apps/${app.slug}/terms`}
          className="hover:text-[var(--color-text)]"
        >
          利用規約
        </Link>
      </footer>
    </PageTransition>
  );
}
