import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin-client';
import { verifyAdminRole, unauthorizedResponse } from '@/lib/auth/admin-guard';

export async function POST(request: NextRequest) {
  // Verify admin authentication - only super_admin and admin can update prices
  const authResult = await verifyAdminRole(request, ['super_admin', 'admin']);
  if (!authResult.authorized) {
    return unauthorizedResponse(authResult);
  }

  try {
    const body = await request.json();
    const { productId, price } = body;

    if (!productId || price === undefined) {
      return NextResponse.json(
        { error: 'Missing productId or price' },
        { status: 400 }
      );
    }

    // Update product price with admin client (bypasses RLS)
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
      .from('products')
      .update({
        price: price,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId)
      .select()
      .single();

    if (error) {
      console.error('Error updating product price:', error);
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
