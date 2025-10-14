import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Function to create admin client on-demand
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}

export async function POST(request: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Use service role to check if user is an admin (bypasses RLS)
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (adminError || !adminData) {
      return NextResponse.json(
        { isAdmin: false, error: 'User is not an admin or is inactive' },
        { status: 403 }
      );
    }

    // Update last login
    await supabaseAdmin
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', adminData.id);

    return NextResponse.json({
      isAdmin: true,
      admin: {
        id: adminData.id,
        email: adminData.email,
        role: adminData.role
      }
    });
  } catch (error) {
    console.error('Error verifying admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
