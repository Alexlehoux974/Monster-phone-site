import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Use direct REST API instead of Supabase JS client to avoid blocking
    console.log('📡 [VERIFY API] Fetching admin user for:', email);

    const response = await fetch(
      `${supabaseUrl}/rest/v1/admin_users?email=eq.${encodeURIComponent(email)}&is_active=eq.true&select=*`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      }
    );

    if (!response.ok) {
      console.error('❌ [VERIFY API] Supabase API error:', response.status, response.statusText);
      return NextResponse.json(
        { isAdmin: false, error: 'Failed to verify admin status' },
        { status: 403 }
      );
    }

    const adminData = await response.json();
    console.log('✅ [VERIFY API] API response:', adminData);

    if (!adminData || adminData.length === 0) {
      console.log('❌ [VERIFY API] No admin found for email:', email);
      return NextResponse.json(
        { isAdmin: false, error: 'User is not an admin or is inactive' },
        { status: 403 }
      );
    }

    const admin = adminData[0];
    console.log('✅ [VERIFY API] Admin verified:', admin.email, 'Role:', admin.role);

    // Return admin data
    return NextResponse.json({
      isAdmin: true,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('❌ [VERIFY API] Error verifying admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
