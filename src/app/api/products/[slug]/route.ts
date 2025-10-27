import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client Supabase avec service role key pour contourner RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log('🔍 [API] Fetching product with slug:', slug);

    // Récupérer le produit de base
    const { data: productData, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('url_slug', slug)
      .single();

    if (productError) {
      console.error('❌ [API] Product error:', productError);
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }

    console.log('✅ [API] Product found:', productData.name);

    // Récupérer les données associées
    const [
      { data: brandData },
      { data: categoryData },
      { data: variantsData },
      { data: imagesData },
      { data: reviewsData }
    ] = await Promise.all([
      supabase.from('brands').select('*').eq('id', productData.brand_id).single(),
      supabase.from('categories').select('*').eq('id', productData.category_id).single(),
      supabase.from('product_variants').select('*').eq('product_id', productData.id),
      supabase.from('product_images').select('*').eq('product_id', productData.id),
      supabase.from('product_reviews').select('*').eq('product_id', productData.id)
    ]);

    // Combiner les données
    const fullProductData = {
      ...productData,
      brands: brandData || { id: '', name: 'Unknown', slug: '' },
      categories: categoryData || { id: '', name: 'Unknown', slug: '' },
      product_variants: variantsData || [],
      product_images: imagesData || [],
      product_reviews: reviewsData || []
    };

    console.log('✅ [API] Full product data assembled');

    return NextResponse.json(fullProductData);
  } catch (error) {
    console.error('❌ [API] Error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
