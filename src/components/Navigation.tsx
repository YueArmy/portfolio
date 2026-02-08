'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname.startsWith('/admin')) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-base font-bold tracking-[-0.03em] text-[var(--color-text)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Portfolio<span className="text-[var(--color-accent)]">.</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden gap-1 md:flex">
          {links.map(({ href, label }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'relative px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] transition-colors',
                    isActive
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]'
                  )}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-px bg-[var(--color-accent)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative h-4 w-4">
            <span
              className={cn(
                'absolute left-0 h-px w-4 bg-[var(--color-text)] transition-all duration-300',
                isOpen ? 'top-2 rotate-45' : 'top-0.5'
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-2 h-px w-4 bg-[var(--color-text)] transition-opacity duration-200',
                isOpen ? 'opacity-0' : 'opacity-100'
              )}
            />
            <span
              className={cn(
                'absolute left-0 h-px w-4 bg-[var(--color-text)] transition-all duration-300',
                isOpen ? 'top-2 -rotate-45' : 'top-3.5'
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {links.map(({ href, label }) => {
                const isActive =
                  href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'block rounded-md px-3 py-2 text-xs uppercase tracking-[0.15em] transition-colors',
                        isActive
                          ? 'bg-[var(--color-surface)] text-[var(--color-accent)]'
                          : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
