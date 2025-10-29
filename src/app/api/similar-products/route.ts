import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ⚡ Next.js 15 - DÉSACTIVER COMPLÈTEMENT LE CACHE
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

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
    const { searchParams } = new URL(request.url);
    const currentProductId = searchParams.get('productId');

    if (!currentProductId) {
      return NextResponse.json(
        { success: false, error: 'productId is required' },
        { status: 400 }
      );
    }

    // Récupérer le produit actuel avec ses tags
    const { data: currentProduct, error: currentError } = await supabase
      .from('products')
      .select(`
        id,
        price,
        brand_id,
        category_id,
        product_tags(tag)
      `)
      .eq('id', currentProductId)
      .single();

    if (currentError || !currentProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const currentPrice = currentProduct.price;
    const currentBrandId = currentProduct.brand_id;
    const currentTags = currentProduct.product_tags?.map((t: any) => t.tag) || [];

    // Récupérer tous les produits de la même catégorie en stock
    const { data: productsData, error: prodError } = await supabase
      .from('products')
      .select(`
        id,
        name,
        url_slug,
        price,
        original_price,
        stock_quantity,
        brand_id,
        brands!inner(name),
        product_images(url, is_primary),
        product_tags(tag)
      `)
      .eq('category_id', currentProduct.category_id)
      .neq('id', currentProductId)
      .eq('status', 'active')
      .gt('stock_quantity', 0);

    if (prodError) {
      return NextResponse.json(
        { success: false, error: prodError.message },
        { status: 500 }
      );
    }

    if (!productsData || productsData.length === 0) {
      return NextResponse.json({
        success: true,
        products: []
      });
    }

    // Calculer le score de similarité pour chaque produit
    const scoredProducts = productsData.map((product: any) => {
      let score = 0;

      // 1. Score de marque (+50 points si même marque)
      if (product.brand_id === currentBrandId) {
        score += 50;
      }

      // 2. Score de prix (+30 points proportionnel si dans ±30%)
      const priceDiff = Math.abs(product.price - currentPrice);
      const priceRange = currentPrice * 0.3;

      if (priceDiff <= priceRange) {
        const priceScore = 30 * (1 - (priceDiff / priceRange));
        score += priceScore;
      }

      // 3. Score de tags (+20 points proportionnel basé sur similarité Jaccard)
      const productTags = product.product_tags?.map((t: any) => t.tag) || [];

      if (currentTags.length > 0 || productTags.length > 0) {
        const commonTags = currentTags.filter((tag: string) => productTags.includes(tag));
        const totalUniqueTags = new Set([...currentTags, ...productTags]).size;

        if (totalUniqueTags > 0) {
          const jaccardSimilarity = commonTags.length / totalUniqueTags;
          score += 20 * jaccardSimilarity;
        }
      }

      return {
        id: product.id,
        name: product.name,
        url_slug: product.url_slug,
        price: product.price,
        original_price: product.original_price,
        stock_quantity: product.stock_quantity,
        brand_id: product.brand_id,
        brands: product.brands,
        product_images: product.product_images,
        similarity_score: Math.round(score * 100) / 100
      };
    });

    // Trier : même marque d'abord, puis par score décroissant
    const sortedProducts = scoredProducts.sort((a, b) => {
      const aSameBrand = a.brand_id === currentBrandId ? 1 : 0;
      const bSameBrand = b.brand_id === currentBrandId ? 1 : 0;

      if (aSameBrand !== bSameBrand) {
        return bSameBrand - aSameBrand;
      }

      return b.similarity_score - a.similarity_score;
    });

    // Limiter à 12 produits
    const finalProducts = sortedProducts.slice(0, 12);

    // ⚡ HEADERS DE CACHE CRITIQUES - forcer le no-cache complet
    return NextResponse.json({
      success: true,
      products: finalProducts
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store'
      }
    });

  } catch (error: any) {
    console.error('❌ Similar products error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
