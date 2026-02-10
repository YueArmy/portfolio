import { z } from 'zod';

// --- Project ---

export const projectSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200),
  slug: z
    .string()
    .min(1, 'スラッグは必須です')
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, '小文字英数字とハイフンのみ'),
  description: z.string().min(1, '概要は必須です').max(500),
  content: z.string().min(1, '本文は必須です'),
  techStack: z.array(z.string()).min(1, '技術スタックは必須です'),
  imageUrl: z.string().url().nullable().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  featured: z.boolean().default(false),
  publishedAt: z.string().datetime().nullable().optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;

// --- Exploration Log ---

export const explorationLogSchema = z.object({
  projectId: z.string().cuid(),
  step: z.number().int().min(1),
  title: z.string().min(1, 'タイトルは必須です').max(200),
  body: z.string().min(1, '本文は必須です'),
});

export type ExplorationLogInput = z.infer<typeof explorationLogSchema>;

// --- Contact ---

export const contactSchema = z.object({
  name: z.string().min(1, '名前は必須です').max(100),
  email: z.string().email('有効なメールアドレスを入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上で入力してください').max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

// --- Admin Login ---

export const loginSchema = z.object({
  password: z.string().min(1, 'パスワードは必須です'),
});

export type LoginInput = z.infer<typeof loginSchema>;
