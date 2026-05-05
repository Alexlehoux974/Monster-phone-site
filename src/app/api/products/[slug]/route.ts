import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// ⚡ Next.js 15 - DÉSACTIVER COMPLÈTEMENT LE CACHE
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Lazy-instantiate Supabase client (évite l'éval à module-load time
    // pendant `next build`/Collecting page data).
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    // Client Supabase avec service role key pour contourner RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

    // Version simplifiée - retourner juste le produit de base pour tester
    const fullProductData = {
      ...productData,
      brands: { id: '', name: 'Unknown', slug: '' },
      categories: { id: '', name: 'Unknown', slug: '' },
      product_variants: [],
      product_images: [],
      product_reviews: []
    };

    console.log('✅ [API] Full product data assembled (simplified)');

    // ⚡ HEADERS DE CACHE CRITIQUES - forcer le no-cache complet
    return NextResponse.json(fullProductData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('❌ [API] Error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
