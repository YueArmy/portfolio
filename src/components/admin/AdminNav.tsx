'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/cn';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/contacts', label: 'Contacts' },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex h-full flex-col px-4 py-6">
        <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-[var(--color-text-dim)]">
          Admin CMS
        </h2>
        <nav className="flex-1 space-y-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'block rounded-md px-3 py-2 text-sm transition-colors',
                pathname === href
                  ? 'bg-[var(--color-surface-elevated)] text-[var(--color-accent)]'
                  : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-[var(--color-border)] pt-4">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            &larr; サイトを見る
          </Link>
          <button
            onClick={handleLogout}
            className="mt-1 block w-full rounded-md px-3 py-2 text-left text-sm text-[var(--color-danger)] hover:bg-[var(--color-surface-elevated)]"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
