import { AdminNav } from '@/components/admin/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)]">
      <AdminNav />
      <div className="flex-1 overflow-auto p-8">{children}</div>
    </div>
  );
}
