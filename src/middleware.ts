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

  // Check if accessing admin routes (except login page)
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    // Lightweight cookie check - no network calls
    // Real auth verification happens in:
    // - Admin layout (getAdminSession on mount)
    // - Each API route (verifyAdminAuth)
    const authCookie = request.cookies.get('sb-nswlznqoadjffpxkagoz-auth-token');

    if (!authCookie?.value) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Quick local check: verify cookie has an access_token (no Supabase API call)
    try {
      let sessionData;
      try {
        const decoded = Buffer.from(authCookie.value, 'base64').toString('utf-8');
        sessionData = JSON.parse(decoded);
      } catch {
        sessionData = JSON.parse(authCookie.value);
      }

      if (!sessionData?.access_token) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }

      // Cookie exists and has a token - allow access
      // Full token verification happens in layout and API routes
      return response;
    } catch {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes (they have their own auth)
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
