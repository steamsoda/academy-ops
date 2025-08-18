import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('next-auth.session-token') || 
                req.cookies.get('__Secure-next-auth.session-token') ||
                req.cookies.get('__Host-next-auth.csrf-token');
  
  const path = req.nextUrl.pathname;
  
  // Check if trying to access protected routes
  if (path.startsWith('/dashboard')) {
    if (!token) {
      // Redirect to login
      const loginUrl = new URL('/auth/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = { 
  matcher: [
    '/dashboard/:path*'
  ] 
};
