'use client';

import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { ExplorationLogForm } from '@/components/admin/ExplorationLogForm';
import { Button } from '@/components/ui/Button';
import type { ProjectInput } from '@/lib/validation';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface ProjectData extends ProjectInput {
  id: string;
  explorationLogs: { id: string; step: number; title: string; body: string }[];
}

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: project, mutate } = useSWR<ProjectData>(
    `/api/projects/${id}`,
    fetcher
  );

  if (!project) {
    return (
      <p className="text-[var(--color-text-muted)]">読み込み中...</p>
    );
  }

  const handleDelete = async () => {
    if (!confirm('このプロジェクトを削除しますか？')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    router.push('/admin/projects');
  };

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            プロジェクト編集
          </h1>
          <Button variant="danger" onClick={handleDelete}>
            削除
          </Button>
        </div>
        <div className="mt-6">
          <ProjectForm
            defaultValues={{ ...project, id }}
            onSuccess={() => mutate()}
          />
        </div>
      </div>

      <ExplorationLogForm
        projectId={id}
        logs={project.explorationLogs ?? []}
        onMutate={() => mutate()}
      />
    </div>
  );
}
