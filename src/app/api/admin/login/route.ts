import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';
import { createSession, verifyPassword } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    if (!verifyPassword(result.data.password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    await createSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/admin/login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
