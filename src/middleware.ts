import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page and API routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check session cookie
  const session = request.cookies.get('admin_session')?.value;
  if (!session) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
