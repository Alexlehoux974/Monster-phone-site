import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function GET(request: NextRequest) {
  try {
    // Récupérer les produits Nokia
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select('id, name, brand_id, category_id, price, url_slug')
      .ilike('name', '%Nokia%')
      .limit(5);

    // Récupérer quelques catégories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .limit(5);

    // Récupérer quelques marques
    const { data: brands, error: brandError } = await supabase
      .from('brands')
      .select('id, name, slug')
      .limit(5);

    return NextResponse.json({
      success: true,
      data: {
        products: products || [],
        categories: categories || [],
        brands: brands || [],
        errors: {
          products: prodError?.message,
          categories: catError?.message,
          brands: brandError?.message
        }
      }
    });

  } catch (error: any) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
