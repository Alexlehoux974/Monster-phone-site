import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variantId, stock } = body;

    if (!variantId || stock === undefined) {
      return NextResponse.json(
        { error: 'Missing variantId or stock' },
        { status: 400 }
      );
    }

    // Vérifier l'authentification admin
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Auth error:', userError);
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur est admin via la table admin_users
    const { data: adminCheck, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', user.email)
      .eq('is_active', true)
      .single();

    if (adminError || !adminCheck) {
      console.error('Admin check failed:', adminError);
      return NextResponse.json(
        { error: 'Access denied - Admin only' },
        { status: 403 }
      );
    }

    // Update variant stock avec le client authentifié
    // Note: Les policies RLS doivent autoriser les admins à modifier
    const { data, error } = await supabase
      .from('product_variants')
      .update({ stock, updated_at: new Date().toISOString() })
      .eq('id', variantId)
      .select()
      .single();

    if (error) {
      console.error('Error updating stock:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
