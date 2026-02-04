import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { refresh_token } = await request.json();

    if (!refresh_token) {
      return NextResponse.json(
        { error: 'refresh_token required' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    // Step 1: Refresh the token via Supabase Auth API
    const authResponse = await fetch(
      `${supabaseUrl}/auth/v1/token?grant_type=refresh_token`,
      {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token }),
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!authResponse.ok) {
      console.error('❌ [REFRESH API] Token refresh failed:', authResponse.status);
      return NextResponse.json(
        { error: 'Token refresh failed' },
        { status: 401 }
      );
    }

    const authData = await authResponse.json();

    // Step 2: Verify user is still an active admin
    const verifyResponse = await fetch(
      `${supabaseUrl}/rest/v1/admin_users?email=eq.${encodeURIComponent(authData.user.email)}&is_active=eq.true&select=id,email,role`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { error: 'Admin verification failed' },
        { status: 403 }
      );
    }

    const adminData = await verifyResponse.json();
    if (!adminData || adminData.length === 0) {
      return NextResponse.json(
        { error: 'Not an active admin' },
        { status: 403 }
      );
    }

    const admin = adminData[0];
    const expiresAt = authData.expires_at || (Math.floor(Date.now() / 1000) + (authData.expires_in || 3600));

    const sessionData = {
      access_token: authData.access_token,
      refresh_token: authData.refresh_token,
      expires_at: expiresAt,
      expires_in: authData.expires_in,
      token_type: authData.token_type,
      user: authData.user,
    };

    // Create response with new session
    const response = NextResponse.json({
      success: true,
      session: sessionData,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });

    // Update the httpOnly cookie with the new token
    // Cookie maxAge is 7 days (refresh_token needs to survive past access_token expiry)
    const cookieMaxAge = 7 * 24 * 60 * 60; // 7 days
    const cookieValue = Buffer.from(JSON.stringify(sessionData)).toString('base64');

    response.cookies.set('mp-admin-auth', cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: cookieMaxAge,
    });

    console.log('✅ [REFRESH API] Token refreshed for:', admin.email);

    return response;
  } catch (error) {
    console.error('❌ [REFRESH API] Error:', error);
    return NextResponse.json(
      { error: 'Refresh failed' },
      { status: 500 }
    );
  }
}
