'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/validation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setServerError('送信に失敗しました。もう一度お試しください。');
        return;
      }

      setSubmitted(true);
      reset();
    } catch {
      setServerError('送信に失敗しました。もう一度お試しください。');
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 p-6 text-center">
        <p className="text-[var(--color-success)]">
          メッセージを送信しました。ありがとうございます！
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="名前"
        placeholder="Your name"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        label="メールアドレス"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Textarea
        label="メッセージ"
        placeholder="What would you like to say?"
        error={errors.message?.message}
        {...register('message')}
      />
      {serverError && (
        <p className="text-sm text-[var(--color-danger)]">{serverError}</p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '送信中...' : '送信する'}
      </Button>
    </form>
  );
}
