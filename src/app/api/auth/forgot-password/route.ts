import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ [FORGOT PASSWORD API] Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log('🔐 [FORGOT PASSWORD API] Sending password reset email to:', email);

    // Envoyer l'email de réinitialisation avec Supabase
    // L'URL de redirection sera vers notre page de réinitialisation
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/auth/reset-password`,
    });

    if (error) {
      console.error('❌ [FORGOT PASSWORD API] Error sending reset email:', error);

      // Ne pas révéler si l'email existe ou non pour des raisons de sécurité
      // On retourne toujours un succès
      return NextResponse.json({
        success: true,
        message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.',
      });
    }

    console.log('✅ [FORGOT PASSWORD API] Password reset email sent');

    return NextResponse.json({
      success: true,
      message: 'Email de réinitialisation envoyé',
    });
  } catch (error) {
    console.error('❌ [FORGOT PASSWORD API] Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}
