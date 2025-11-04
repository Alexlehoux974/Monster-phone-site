import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone, address } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, mot de passe et nom requis' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ [SIGNUP API] Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Créer un client Supabase avec la service role key pour bypasser l'email confirmation
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    console.log('🔐 [SIGNUP API] Creating user:', email);

    // Créer l'utilisateur avec email auto-confirmé
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ✅ AUTO-CONFIRMER L'EMAIL
      user_metadata: {
        name,
      },
    });

    if (createError) {
      console.error('❌ [SIGNUP API] User creation failed:', createError);

      // Traduire les erreurs Supabase en français
      let errorMessage = createError.message;

      if (createError.message.includes('already been registered')) {
        errorMessage = 'Cet email est déjà utilisé. Vous avez déjà un compte ? Connectez-vous.';
      } else if (createError.message.includes('User already registered')) {
        errorMessage = 'Cet email est déjà utilisé. Vous avez déjà un compte ? Connectez-vous.';
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    if (!userData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    console.log('✅ [SIGNUP API] User created:', userData.user.id);

    // Créer le profil dans la table profiles
    const profileData: any = {
      id: userData.user.id,
      email: userData.user.email,
      full_name: name,
    };

    if (phone) profileData.phone = phone;
    if (address) {
      profileData.address = address.street;
      profileData.city = address.city;
      profileData.postal_code = address.postalCode;
    }

    // Utiliser upsert au lieu de insert pour gérer les profils créés automatiquement par les triggers
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert(profileData, {
        onConflict: 'id'
      });

    if (profileError) {
      console.error('⚠️  [SIGNUP API] Profile upsert warning:', profileError);
      // Non-bloquant - continuer même si le profil n'a pas pu être créé/mis à jour
    } else {
      console.log('✅ [SIGNUP API] Profile created/updated');
    }

    // Réconcilier les commandes guest
    const { data: guestOrders } = await supabaseAdmin
      .from('orders')
      .select('id')
      .eq('customer_email', email)
      .is('user_id', null);

    if (guestOrders && guestOrders.length > 0) {
      console.log(`🔗 [SIGNUP API] Linking ${guestOrders.length} guest orders`);
      await supabaseAdmin
        .from('orders')
        .update({ user_id: userData.user.id })
        .eq('customer_email', email)
        .is('user_id', null);
    }

    // Créer une session pour l'utilisateur (signIn)
    const supabaseClient = createClient(
      supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: sessionData, error: signInError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('❌ [SIGNUP API] Auto sign-in failed:', signInError);
      return NextResponse.json(
        { error: 'Compte créé mais connexion automatique échouée. Veuillez vous connecter manuellement.' },
        { status: 500 }
      );
    }

    console.log('✅ [SIGNUP API] User signed in automatically');

    return NextResponse.json({
      success: true,
      user: sessionData.user,
      session: sessionData.session,
    });
  } catch (error) {
    console.error('❌ [SIGNUP API] Error during signup:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du compte' },
      { status: 500 }
    );
  }
}
