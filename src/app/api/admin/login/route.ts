import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      console.error('❌ [LOGIN API] Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('🔐 [LOGIN API] Attempting login for:', email);

    // Step 1: Verify admin status via REST API (bypasses RLS with service role key)
    console.log('📡 [LOGIN API] Verifying admin status...');
    const verifyResponse = await fetch(
      `${supabaseUrl}/rest/v1/admin_users?email=eq.${encodeURIComponent(email)}&is_active=eq.true&select=*`,
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
      console.error('❌ [LOGIN API] Admin verification failed:', verifyResponse.status);
      return NextResponse.json(
        { error: 'Accès non autorisé. Seuls les administrateurs peuvent se connecter.' },
        { status: 403 }
      );
    }

    const adminData = await verifyResponse.json();
    if (!adminData || adminData.length === 0) {
      console.error('❌ [LOGIN API] User is not an admin');
      return NextResponse.json(
        { error: 'Accès non autorisé. Seuls les administrateurs peuvent se connecter.' },
        { status: 403 }
      );
    }

    const admin = adminData[0];
    console.log('✅ [LOGIN API] Admin verified:', admin.email);

    // Step 2: Sign in with Supabase Auth API using REST
    console.log('🔑 [LOGIN API] Calling Supabase Auth API...');
    const authResponse = await fetch(
      `${supabaseUrl}/auth/v1/token?grant_type=password`,
      {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      }
    );

    if (!authResponse.ok) {
      const authError = await authResponse.json();
      console.error('❌ [LOGIN API] Auth failed:', authError);
      return NextResponse.json(
        { error: authError.error_description || 'Authentification échouée' },
        { status: 401 }
      );
    }

    const authData = await authResponse.json();
    console.log('✅ [LOGIN API] Authentication successful');
    console.log('🔍 [LOGIN API] Auth data expires_in:', authData.expires_in, 'expires_at:', authData.expires_at);

    // Calculate expires_at if not provided by Supabase Auth API
    const expiresAt = authData.expires_at || (Math.floor(Date.now() / 1000) + (authData.expires_in || 3600));
    console.log('📅 [LOGIN API] Calculated expires_at:', expiresAt, 'Date:', new Date(expiresAt * 1000).toLocaleString());

    // Step 3: Update last_login_at using REST API
    try {
      console.log('📅 [LOGIN API] Updating last_login_at...');
      await fetch(
        `${supabaseUrl}/rest/v1/admin_users?id=eq.${admin.id}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            last_login_at: new Date().toISOString()
          }),
        }
      );
      console.log('✅ [LOGIN API] last_login_at updated');
    } catch (err) {
      console.warn('⚠️ [LOGIN API] Failed to update last_login_at:', err);
      // Non-blocking - don't fail login if this fails
    }

    console.log('✅ [LOGIN API] Login complete');

    // Return session data that client can store
    return NextResponse.json({
      success: true,
      session: {
        access_token: authData.access_token,
        refresh_token: authData.refresh_token,
        expires_at: expiresAt, // Use calculated expires_at
        expires_in: authData.expires_in,
        token_type: authData.token_type,
        user: authData.user
      },
      user: authData.user,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('❌ [LOGIN API] Error during login:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
