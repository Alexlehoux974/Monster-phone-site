import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function middleware(request: NextRequest) {
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

  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname === '/admin/login') {
      return response;
    }

    // Try to get auth token from cookies
    const authCookie = request.cookies.get('sb-nswlznqoadjffpxkagoz-auth-token');

    if (!authCookie?.value) {
      // No auth cookie, redirect to admin login
      const loginUrl = new URL('/admin', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Parse the cookie to get the access token
      const sessionData = JSON.parse(authCookie.value);
      const accessToken = sessionData?.access_token;

      if (!accessToken) {
        const loginUrl = new URL('/admin', request.url);
        return NextResponse.redirect(loginUrl);
      }

      // Verify token with Supabase
      const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });

      const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken);

      if (userError || !user) {
        const loginUrl = new URL('/admin', request.url);
        return NextResponse.redirect(loginUrl);
      }

      // Check if user is an active admin
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('id, role, is_active')
        .eq('email', user.email)
        .eq('is_active', true)
        .single();

      if (adminError || !adminUser) {
        // User is authenticated but not an admin
        const loginUrl = new URL('/admin', request.url);
        loginUrl.searchParams.set('error', 'not_admin');
        return NextResponse.redirect(loginUrl);
      }

      // Admin is authenticated, allow access
      return response;
    } catch (error) {
      console.error('Middleware auth error:', error);
      const loginUrl = new URL('/admin', request.url);
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
