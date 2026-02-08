'use client';

import useSWR from 'swr';
import { ContactList } from '@/components/admin/ContactList';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminContactsPage() {
  const { data: contacts, isLoading, mutate } = useSWR(
    '/api/admin/contacts',
    fetcher
  );

  const handleToggleRead = async (id: string, read: boolean) => {
    await fetch(`/api/admin/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    });
    mutate();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text)]">
        Contacts
      </h1>
      <div className="mt-6">
        {isLoading && (
          <p className="text-[var(--color-text-muted)]">読み込み中...</p>
        )}
        {contacts && (
          <ContactList
            contacts={contacts}
            onToggleRead={handleToggleRead}
          />
        )}
      </div>
    </div>
  );
}
