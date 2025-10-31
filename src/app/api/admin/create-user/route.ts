import { createClient } from '@supabase/supabase-js';
import { NextResponse, NextRequest } from 'next/server';

// Route temporaire pour créer l'admin - À SUPPRIMER après utilisation
export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Variables manquantes' }, { status: 500 });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et password requis' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // 1. Vérifier si l'utilisateur existe déjà dans auth.users
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    let authUser = existingUsers?.users?.find((u: any) => u.email === email);

    if (!authUser) {
      // Créer l'utilisateur dans auth.users
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true
      });

      if (createError) {
        return NextResponse.json({
          error: 'Erreur création auth user',
          details: createError.message
        }, { status: 500 });
      }

      authUser = newUser.user;
    }

    // 2. Vérifier si l'utilisateur existe dans admin_users
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      return NextResponse.json({
        error: 'Erreur vérification admin',
        details: checkError.message
      }, { status: 500 });
    }

    if (!existingAdmin) {
      // Créer l'admin
      const { data: newAdmin, error: insertError } = await supabase
        .from('admin_users')
        .insert({
          id: authUser?.id,
          email: email,
          role: 'super_admin',
          is_active: true
        })
        .select()
        .single();

      if (insertError) {
        return NextResponse.json({
          error: 'Erreur insertion admin',
          details: insertError.message
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Admin créé avec succès',
        admin: newAdmin
      });
    } else {
      // Vérifier si is_active est true
      if (!existingAdmin.is_active) {
        const { error: updateError } = await supabase
          .from('admin_users')
          .update({ is_active: true })
          .eq('email', email);

        if (updateError) {
          return NextResponse.json({
            error: 'Erreur activation',
            details: updateError.message
          }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          message: 'Admin activé',
          admin: { ...existingAdmin, is_active: true }
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Admin existe déjà',
        admin: existingAdmin
      });
    }

  } catch (error: any) {
    return NextResponse.json({
      error: 'Exception',
      message: error.message
    }, { status: 500 });
  }
}
