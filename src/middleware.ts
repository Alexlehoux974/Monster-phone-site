import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers to all responses
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  // CSP - restrictive but allows necessary resources
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https: http:; connect-src 'self' https://*.supabase.co https://api.stripe.com https://*.stripe.com https://www.google-analytics.com https://region1.google-analytics.com https://www.facebook.com wss://*.supabase.co; frame-src https://js.stripe.com https://hooks.stripe.com https://www.facebook.com; object-src 'none'; base-uri 'self'"
  );

  // Admin routes: only check that the auth cookie EXISTS.
  // Do NOT parse, decode, or validate the cookie content here.
  // Full auth verification is handled by:
  //   - Admin layout (getAdminSession on first mount)
  //   - Each API route (verifyAdminAuth with Bearer token)
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    const authCookie = request.cookies.get('sb-nswlznqoadjffpxkagoz-auth-token');

    if (!authCookie?.value) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Cookie exists - allow access
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes (they have their own auth)
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
