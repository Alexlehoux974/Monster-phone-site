import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Validation de mot de passe sécurisée
function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password) {
    return { valid: false, error: 'Mot de passe requis' };
  }
  if (password.length < 8) {
    return { valid: false, error: 'Le mot de passe doit contenir au moins 8 caractères' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Le mot de passe doit contenir au moins une majuscule' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Le mot de passe doit contenir au moins une minuscule' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Le mot de passe doit contenir au moins un chiffre' };
  }
  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Validation renforcée du mot de passe
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
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
