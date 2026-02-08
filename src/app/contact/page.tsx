import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { PageTransition } from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'お問い合わせ',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <PageTransition>
        <h1 className="text-3xl font-bold text-[var(--color-text)]">
          Contact
        </h1>
        <p className="mt-3 text-[var(--color-text-muted)]">
          お気軽にメッセージをお送りください。
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </PageTransition>
    </div>
  );
}
