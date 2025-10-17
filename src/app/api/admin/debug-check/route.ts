import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Route temporaire de diagnostic - À SUPPRIMER après résolution
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
      return NextResponse.json({ error: 'NEXT_PUBLIC_SUPABASE_URL manquant' }, { status: 500 });
    }

    if (!serviceRoleKey) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY manquant' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // 1. Compter les admins
    const { data: allAdmins, error: countError } = await supabase
      .from('admin_users')
      .select('email, is_active, role');

    if (countError) {
      return NextResponse.json({
        error: 'Erreur table admin_users',
        details: countError.message,
        code: countError.code
      }, { status: 500 });
    }

    // 2. Chercher alexlehoux@gmail.com
    const { data: alexAdmin, error: alexError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'alexlehoux@gmail.com')
      .single();

    // 3. Vérifier auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();

    const alexAuthUser = authData?.users?.find(u => u.email === 'alexlehoux@gmail.com');

    return NextResponse.json({
      status: 'OK',
      env_vars: {
        supabase_url: supabaseUrl ? 'OK' : 'MANQUANT',
        service_role_key: serviceRoleKey ? 'OK' : 'MANQUANT'
      },
      admin_users_table: {
        total_count: allAdmins?.length || 0,
        admins: allAdmins || [],
        alex_exists: !alexError && !!alexAdmin,
        alex_active: alexAdmin?.is_active || false,
        alex_role: alexAdmin?.role || null,
        alex_error: alexError ? {
          message: alexError.message,
          code: alexError.code
        } : null
      },
      auth_users: {
        total_count: authData?.users?.length || 0,
        alex_exists: !!alexAuthUser,
        alex_id: alexAuthUser?.id || null,
        alex_email_confirmed: alexAuthUser?.email_confirmed_at ? 'OUI' : 'NON',
        auth_error: authError ? authError.message : null
      }
    });

  } catch (error: any) {
    return NextResponse.json({
      error: 'Exception',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
