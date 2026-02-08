import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Portfolio',
    template: '%s | Portfolio',
  },
  description: 'Developer portfolio — projects, exploration logs, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex min-h-dvh flex-col">
        <Navigation />
        <main className="flex-1 pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
