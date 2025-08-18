import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
  const path = req.nextUrl.pathname;
  const needsAuth = path.startsWith('/(protected)');
  if (needsAuth && !token) {
    const url = req.nextUrl.clone(); url.pathname = '/auth/login'; return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ['/((protected)/:path*)'] };
