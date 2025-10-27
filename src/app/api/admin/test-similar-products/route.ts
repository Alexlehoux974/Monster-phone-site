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
    const currentProductId = '42821a9c-9402-4047-9279-c33b0ce40b17'; // Nokia 110 4G

    // Récupérer le produit actuel
    const { data: currentProduct, error: currentError } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        brand_id,
        category_id,
        product_tags(tag)
      `)
      .eq('id', currentProductId)
      .single();

    if (currentError) {
      return NextResponse.json({
        success: false,
        step: 'fetch_current_product',
        error: currentError
      });
    }

    const currentPrice = currentProduct.price;
    const currentBrandId = currentProduct.brand_id;
    const currentTags = currentProduct.product_tags?.map((t: any) => t.tag) || [];

    // Récupérer tous les produits de la même catégorie
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
        status,
        brands(name),
        product_tags(tag)
      `)
      .eq('category_id', currentProduct.category_id)
      .neq('id', currentProductId);

    if (prodError) {
      return NextResponse.json({
        success: false,
        step: 'fetch_similar_products',
        error: prodError
      });
    }

    // Filtrer les produits en stock
    const inStockProducts = productsData.filter(p => p.stock_quantity > 0 && p.status === 'active');

    // Calculer les scores
    const scoredProducts = inStockProducts.map((product: any) => {
      let score = 0;
      let details: any = {};

      // Score de marque
      if (product.brand_id === currentBrandId) {
        score += 50;
        details.brandMatch = true;
      } else {
        details.brandMatch = false;
      }

      // Score de prix
      const priceDiff = Math.abs(product.price - currentPrice);
      const priceRange = currentPrice * 0.3;

      if (priceDiff <= priceRange) {
        const priceScore = 30 * (1 - (priceDiff / priceRange));
        score += priceScore;
        details.priceScore = Math.round(priceScore * 100) / 100;
      } else {
        details.priceScore = 0;
      }

      // Score de tags
      const productTags = product.product_tags?.map((t: any) => t.tag) || [];

      if (currentTags.length > 0 || productTags.length > 0) {
        const commonTags = currentTags.filter((tag: string) => productTags.includes(tag));
        const totalUniqueTags = new Set([...currentTags, ...productTags]).size;

        if (totalUniqueTags > 0) {
          const jaccardSimilarity = commonTags.length / totalUniqueTags;
          const tagScore = 20 * jaccardSimilarity;
          score += tagScore;
          details.tagScore = Math.round(tagScore * 100) / 100;
          details.commonTags = commonTags;
          details.productTags = productTags;
        }
      }

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock_quantity,
        brand: product.brands?.name,
        sameBrand: product.brand_id === currentBrandId,
        similarity_score: Math.round(score * 100) / 100,
        details
      };
    });

    // Trier
    const sortedProducts = scoredProducts.sort((a, b) => {
      const aSameBrand = a.sameBrand ? 1 : 0;
      const bSameBrand = b.sameBrand ? 1 : 0;

      if (aSameBrand !== bSameBrand) {
        return bSameBrand - aSameBrand;
      }

      return b.similarity_score - a.similarity_score;
    });

    return NextResponse.json({
      success: true,
      currentProduct: {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        brand_id: currentProduct.brand_id,
        category_id: currentProduct.category_id,
        tags: currentTags
      },
      allProducts: productsData.length,
      inStockProducts: inStockProducts.length,
      scoredProducts: sortedProducts,
      finalProducts: sortedProducts.slice(0, 12)
    });

  } catch (error: any) {
    console.error('❌ Test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
