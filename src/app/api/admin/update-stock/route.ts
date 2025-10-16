import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin-client';
import { createClient } from '@/lib/supabase/server';

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

    // Récupérer le token depuis le header Authorization
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      console.error('❌ [Update Stock] No authorization token');
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    // Vérifier l'authentification avec le token explicite
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    console.log('🔍 [Update Stock] Auth check:', {
      hasUser: !!user,
      userEmail: user?.email,
      error: userError?.message
    });

    if (userError || !user) {
      console.error('❌ [Update Stock] Auth failed:', userError);
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur est admin
    const { data: adminCheck, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', user.email)
      .eq('is_active', true)
      .single();

    if (adminError || !adminCheck) {
      console.error('❌ [Update Stock] Admin check failed:', adminError);
      return NextResponse.json(
        { error: 'Access denied - Admin only' },
        { status: 403 }
      );
    }

    console.log('✅ [Update Stock] User is admin:', user.email);

    // Utiliser le client admin pour faire l'update (bypass RLS)
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('product_variants')
      .update({ stock, updated_at: new Date().toISOString() })
      .eq('id', variantId)
      .select()
      .single();

    if (error) {
      console.error('❌ [Update Stock] Update failed:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log('✅ [Update Stock] Success:', { variantId, stock });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('❌ [Update Stock] API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
