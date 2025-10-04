import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, stock } = body;

    if (!productId || stock === undefined) {
      return NextResponse.json(
        { error: 'Missing productId or stock' },
        { status: 400 }
      );
    }

    // Update product stock_quantity with admin client (bypasses RLS)
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
      .from('products')
      .update({
        stock_quantity: stock,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId)
      .select()
      .single();

    if (error) {
      console.error('Error updating product stock:', error);
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
