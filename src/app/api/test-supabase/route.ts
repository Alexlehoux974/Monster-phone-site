import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export async function GET() {
  const supabase = createClient();

  try {
    // Test getProducts function
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(name, slug),
        category:categories!products_category_id_fkey(name, slug)
      `)
      .neq('status', 'discontinued')
      .limit(5);

    // Test product_full_view
    const { data: fullView, error: viewError } = await supabase
      .from('product_full_view')
      .select('*')
      .limit(5);

    return NextResponse.json({
      products: {
        success: !productsError,
        count: products?.length || 0,
        error: productsError,
        sample: products?.[0]
      },
      product_full_view: {
        success: !viewError,
        count: fullView?.length || 0,
        error: viewError,
        sample: fullView?.[0]
      }
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}