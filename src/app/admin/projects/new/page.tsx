'use client';

import { useRouter } from 'next/navigation';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text)]">
        新規プロジェクト
      </h1>
      <div className="mt-6">
        <ProjectForm onSuccess={() => router.push('/admin/projects')} />
      </div>
    </div>
  );
}
