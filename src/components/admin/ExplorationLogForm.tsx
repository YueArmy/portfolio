'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface Log {
  id: string;
  step: number;
  title: string;
  body: string;
}

interface ExplorationLogFormProps {
  projectId: string;
  logs: Log[];
  onMutate: () => void;
}

export function ExplorationLogForm({
  projectId,
  logs,
  onMutate,
}: ExplorationLogFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [step, setStep] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setStep('');
    setTitle('');
    setBody('');
  };

  const startEdit = (log: Log) => {
    setEditingId(log.id);
    setStep(log.step.toString());
    setTitle(log.title);
    setBody(log.body);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const payload = {
      projectId,
      step: parseInt(step, 10),
      title,
      body,
    };

    const url = editingId
      ? `/api/exploration-logs/${editingId}`
      : '/api/exploration-logs';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    resetForm();
    setIsSaving(false);
    onMutate();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/exploration-logs/${id}`, { method: 'DELETE' });
    onMutate();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--color-text)]">
        探索ログ
      </h3>

      {/* Existing logs */}
      {logs.length > 0 && (
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div>
                <span className="text-sm font-bold text-[var(--color-accent)]">
                  Step {log.step}:
                </span>{' '}
                <span className="text-sm text-[var(--color-text)]">
                  {log.title}
                </span>
                <p className="mt-1 text-xs text-[var(--color-text-muted)] line-clamp-2">
                  {log.body}
                </p>
              </div>
              <div className="flex shrink-0 gap-2 ml-4">
                <Button
                  variant="ghost"
                  onClick={() => startEdit(log)}
                  className="text-xs"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(log.id)}
                  className="text-xs"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit form */}
      <div className="space-y-3 rounded-md border border-[var(--color-border)] p-4">
        <p className="text-sm font-medium text-[var(--color-text-muted)]">
          {editingId ? 'ログを編集' : '新しいログを追加'}
        </p>
        <div className="flex gap-3">
          <div className="w-24">
            <Input
              label="Step"
              type="number"
              value={step}
              onChange={(e) => setStep(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              label="タイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <Textarea
          label="本文（Markdown）"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={isSaving || !step || !title || !body}
          >
            {isSaving ? '保存中...' : editingId ? '更新' : '追加'}
          </Button>
          {editingId && (
            <Button variant="ghost" onClick={resetForm}>
              キャンセル
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
