import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_COOKIE = 'admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be at least 32 characters');
  }
  return secret;
}

function sign(payload: string): string {
  const hmac = crypto.createHmac('sha256', getSecret());
  hmac.update(payload);
  return hmac.digest('hex');
}

export async function createSession(): Promise<void> {
  const timestamp = Date.now().toString();
  const signature = sign(timestamp);
  const token = `${timestamp}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const [timestamp, signature] = token.split('.');
  if (!timestamp || !signature) return false;

  const expected = sign(timestamp);
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return false;
  }

  const age = Date.now() - parseInt(timestamp, 10);
  if (age > SESSION_MAX_AGE * 1000) return false;

  return true;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function verifyPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return crypto.timingSafeEqual(
    Buffer.from(input),
    Buffer.from(password)
  );
}
