import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyAdminRole, unauthorizedResponse } from '@/lib/auth/admin-guard';

export async function POST(request: NextRequest) {
  // Verify admin authentication - only super_admin and admin can delete products
  const authResult = await verifyAdminRole(request, ['super_admin', 'admin']);
  if (!authResult.authorized) {
    return unauthorizedResponse(authResult);
  }

  // Lazy-instantiate Supabase client (évite l'évaluation à module-load time
  // pendant `next build`/Collecting page data, qui crashe si les env vars
  // ne sont pas exposées au build).
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    const { productId, productName } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    console.log(`🗑️  Deleting product: ${productName} (${productId})`);

    // Supprimer le produit (cascade supprimera les variants associés)
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (deleteError) {
      console.error('❌ Delete error:', deleteError);
      return NextResponse.json(
        { success: false, error: deleteError.message },
        { status: 500 }
      );
    }

    console.log(`✅ Product deleted: ${productName}`);

    return NextResponse.json({
      success: true,
      message: `Product ${productName} deleted successfully`
    });

  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
