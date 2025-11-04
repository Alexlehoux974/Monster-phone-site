import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Mot de passe requis' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ [RESET PASSWORD API] Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log('🔐 [RESET PASSWORD API] Updating password...');

    // Mettre à jour le mot de passe de l'utilisateur actuellement authentifié
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error('❌ [RESET PASSWORD API] Error updating password:', error);

      let errorMessage = 'Erreur lors de la réinitialisation du mot de passe';

      if (error.message.includes('not authenticated')) {
        errorMessage = 'Session expirée. Veuillez demander un nouveau lien de réinitialisation.';
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    console.log('✅ [RESET PASSWORD API] Password updated successfully');

    return NextResponse.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès',
    });
  } catch (error) {
    console.error('❌ [RESET PASSWORD API] Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la réinitialisation du mot de passe' },
      { status: 500 }
    );
  }
}
