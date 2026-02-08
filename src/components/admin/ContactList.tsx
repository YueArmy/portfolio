'use client';

import { formatDate } from '@/lib/formatters';
import { cn } from '@/lib/cn';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface ContactListProps {
  contacts: Contact[];
  onToggleRead: (id: string, read: boolean) => void;
}

export function ContactList({ contacts, onToggleRead }: ContactListProps) {
  if (contacts.length === 0) {
    return (
      <p className="text-[var(--color-text-muted)]">
        問い合わせはありません。
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={cn(
            'rounded-md border p-4',
            contact.read
              ? 'border-[var(--color-border)] bg-[var(--color-surface)]'
              : 'border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5'
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-medium text-[var(--color-text)]">
                  {contact.name}
                </span>
                <span className="text-xs text-[var(--color-text-dim)]">
                  {contact.email}
                </span>
                {!contact.read && (
                  <span className="rounded-full bg-[var(--color-accent)] px-2 py-0.5 text-[10px] font-bold text-[var(--color-bg)]">
                    NEW
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm whitespace-pre-wrap text-[var(--color-text-muted)]">
                {contact.message}
              </p>
              <p className="mt-2 text-xs text-[var(--color-text-dim)]">
                {formatDate(contact.createdAt)}
              </p>
            </div>
            <button
              onClick={() => onToggleRead(contact.id, !contact.read)}
              className="shrink-0 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              {contact.read ? '未読にする' : '既読にする'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
