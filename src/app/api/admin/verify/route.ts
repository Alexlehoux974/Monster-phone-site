import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Verify admin status endpoint
 * SECURITY: This endpoint now requires a valid Supabase auth token
 * The user can only verify their OWN admin status (email from token must match)
 */
export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // SECURITY: Require authentication token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify the token with Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user || !user.email) {
      console.error('❌ [VERIFY API] Invalid token');
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // SECURITY: User can only verify their own admin status
    const email = user.email;
    console.log('📡 [VERIFY API] Verifying admin status for authenticated user:', email);

    // Check if user is admin
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('id, email, role')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (adminError || !adminData) {
      console.log('❌ [VERIFY API] No admin found for email:', email);
      return NextResponse.json(
        { isAdmin: false, error: 'User is not an admin or is inactive' },
        { status: 403 }
      );
    }

    console.log('✅ [VERIFY API] Admin verified:', adminData.email, 'Role:', adminData.role);

    // Return admin data
    return NextResponse.json({
      isAdmin: true,
      admin: {
        id: adminData.id,
        email: adminData.email,
        role: adminData.role
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
