import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1) Rewrite legacy route-group URLs like '/(protected)/dashboard' → '/dashboard'
  if (path.startsWith('/(protected)/')) {
    const url = req.nextUrl.clone();
    url.pathname = path.replace('/(protected)', '');
    return NextResponse.redirect(url);
  }

  // 2) Simple auth guard for dashboard
  const token =
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token') ||
    req.cookies.get('__Host-next-auth.csrf-token');

  if (path.startsWith('/dashboard') && !token) {
    const loginUrl = new URL('/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/(protected)/:path*',
    '/dashboard/:path*',
    '/'
  ]
};
