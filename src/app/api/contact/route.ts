import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await prisma.contact.create({ data: result.data });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('POST /api/contact error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
