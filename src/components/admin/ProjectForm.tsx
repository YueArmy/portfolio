'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { parseTechStack } from '@/lib/formatters';

const formSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200),
  slug: z
    .string()
    .min(1, 'スラッグは必須です')
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, '小文字英数字とハイフンのみ'),
  description: z.string().min(1, '概要は必須です').max(500),
  content: z.string().min(1, '本文は必須です'),
  techStack: z.string().min(1, '技術スタックは必須です'),
  imageUrl: z.string().url().nullable().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
  defaultValues?: Omit<Partial<FormValues>, 'techStack'> & { id?: string; techStack?: unknown };
  onSuccess: () => void;
}

export function ProjectForm({ defaultValues, onSuccess }: ProjectFormProps) {
  const isEdit = !!defaultValues?.id;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      slug: defaultValues?.slug ?? '',
      description: defaultValues?.description ?? '',
      content: defaultValues?.content ?? '',
      techStack: defaultValues?.techStack
        ? parseTechStack(defaultValues.techStack).join(', ')
        : '',
      imageUrl: defaultValues?.imageUrl ?? '',
      status: defaultValues?.status ?? 'draft',
      featured: defaultValues?.featured ?? false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const tags = data.techStack
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = {
      ...data,
      techStack: tags,
      imageUrl: data.imageUrl || null,
      publishedAt: data.status === 'published' ? new Date().toISOString() : null,
    };

    const url = isEdit
      ? `/api/projects/${defaultValues!.id}`
      : '/api/projects';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      if (body.error === 'Slug already exists') {
        setError('slug', { message: 'このスラッグは既に使われています' });
        return;
      }
      setError('root', { message: '保存に失敗しました' });
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      <Input
        label="タイトル"
        error={errors.title?.message}
        {...register('title')}
      />
      <Input
        label="スラッグ"
        placeholder="my-project-name"
        error={errors.slug?.message}
        {...register('slug')}
      />
      <Textarea
        label="概要"
        error={errors.description?.message}
        {...register('description')}
      />
      <Textarea
        label="本文（Markdown）"
        className="min-h-[240px]"
        error={errors.content?.message}
        {...register('content')}
      />
      <Input
        label="技術スタック（カンマ区切り）"
        placeholder="React, TypeScript, Prisma"
        error={errors.techStack?.message}
        {...register('techStack')}
      />
      <Input
        label="画像URL（任意）"
        placeholder="https://..."
        error={errors.imageUrl?.message}
        {...register('imageUrl')}
      />
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <select
            {...register('status')}
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)]"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          ステータス
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <input
            type="checkbox"
            {...register('featured')}
            className="rounded"
          />
          Featured
        </label>
      </div>
      {errors.root && (
        <p className="text-sm text-[var(--color-danger)]">
          {errors.root.message}
        </p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '保存中...' : isEdit ? '更新する' : '作成する'}
      </Button>
    </form>
  );
}
