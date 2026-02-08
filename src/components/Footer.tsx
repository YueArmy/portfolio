'use client';

import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        <span className="text-[11px] tracking-widest text-[var(--color-text-dim)]">
          &copy; {new Date().getFullYear()}
        </span>
        <span
          className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-dim)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Built with intention
        </span>
      </div>
    </footer>
  );
}
