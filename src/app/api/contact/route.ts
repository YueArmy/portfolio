import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { name, email, message } = result.data;

    await prisma.contact.create({ data: result.data });

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      subject: `ポートフォリオからお問い合わせ: ${name}`,
      text: `名前: ${name}\nメール: ${email}\n\nメッセージ:\n${message}`,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('POST /api/contact error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
