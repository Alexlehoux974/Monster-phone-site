import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  formatFeedPrice,
  getAvailability,
  getProductUrl,
  getImageUrl,
  escapeXml,
  cleanDescription,
  getGoogleProductCategory,
  calculateFinalPrice,
} from '@/lib/feeds/product-feed-utils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://monsterphone.re';

// Créer le client Supabase avec la clé service
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials');
  }

  return createClient(supabaseUrl, supabaseKey);
}

interface ProductRow {
  id: string;
  sku: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  original_price: number;
  admin_discount_percent: number;
  url_slug: string;
  status: string;
  is_visible: boolean;
  weight_grams: number;
  brand: {
    name: string;
  } | null;
  category: {
    name: string;
  } | null;
  variants: Array<{
    id: string;
    color: string;
    color_code: string;
    ean: string;
    stock: number;
    admin_discount_percent: number;
    images: string[];
  }> | null;
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();

    // Récupérer tous les produits actifs avec leurs relations
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        id,
        sku,
        name,
        description,
        short_description,
        price,
        original_price,
        admin_discount_percent,
        url_slug,
        status,
        is_visible,
        weight_grams,
        brand:brands!brand_id (
          name
        ),
        category:categories!category_id (
          name
        ),
        variants:product_variants (
          id,
          color,
          color_code,
          ean,
          stock,
          admin_discount_percent,
          images
        )
      `)
      .eq('status', 'active')
      .eq('is_visible', true);

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

    // Transformer les données pour correspondre à notre interface
    const formattedProducts: ProductRow[] = (products || []).map((p: any) => ({
      ...p,
      brand: Array.isArray(p.brand) ? p.brand[0] : p.brand,
      category: Array.isArray(p.category) ? p.category[0] : p.category,
      variants: p.variants || [],
    }));

    // Générer le XML
    const xml = generateGoogleMerchantXml(formattedProducts);

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache 1 heure
      },
    });
  } catch (error) {
    console.error('Error generating Google Merchant feed:', error);
    return NextResponse.json({ error: 'Failed to generate feed' }, { status: 500 });
  }
}

function generateGoogleMerchantXml(products: ProductRow[]): string {
  const items: string[] = [];

  for (const product of products) {
    const brandName = product.brand?.name || 'Monster Phone';
    const categoryName = product.category?.name || 'Smartphones';
    const googleCategory = getGoogleProductCategory(categoryName);

    // Si le produit a des variants, créer un item par variant
    if (product.variants && product.variants.length > 0) {
      for (const variant of product.variants) {
        // Calculer le prix avec réduction (priorité au discount variant, sinon produit)
        const discountPercent = variant.admin_discount_percent || product.admin_discount_percent || 0;
        const finalPrice = calculateFinalPrice(product.price, discountPercent);
        const hasDiscount = discountPercent > 0;

        // Première image du variant ou fallback
        const primaryImage = variant.images?.[0] ? getImageUrl(variant.images[0]) : '';
        const additionalImages = (variant.images || []).slice(1).map(img => getImageUrl(img));

        items.push(`
    <item>
      <g:id>${escapeXml(variant.id)}</g:id>
      <g:item_group_id>${escapeXml(product.id)}</g:item_group_id>
      <title>${escapeXml(`${product.name} - ${variant.color}`)}</title>
      <description>${escapeXml(cleanDescription(product.short_description || product.description))}</description>
      <link>${escapeXml(getProductUrl(product.url_slug))}?variant=${escapeXml(encodeURIComponent(variant.color))}</link>
      <g:image_link>${escapeXml(primaryImage)}</g:image_link>
      ${additionalImages.map(img => `<g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`).join('\n      ')}
      <g:availability>${getAvailability(variant.stock)}</g:availability>
      <g:price>${formatFeedPrice(hasDiscount ? product.price : finalPrice)}</g:price>
      ${hasDiscount ? `<g:sale_price>${formatFeedPrice(finalPrice)}</g:sale_price>` : ''}
      <g:brand>${escapeXml(brandName)}</g:brand>
      ${variant.ean ? `<g:gtin>${escapeXml(variant.ean)}</g:gtin>` : ''}
      <g:mpn>${escapeXml(product.sku)}</g:mpn>
      <g:condition>new</g:condition>
      <g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>
      <g:color>${escapeXml(variant.color)}</g:color>
      ${product.weight_grams ? `<g:shipping_weight>${product.weight_grams} g</g:shipping_weight>` : ''}
    </item>`);
      }
    } else {
      // Produit sans variants
      const discountPercent = product.admin_discount_percent || 0;
      const finalPrice = calculateFinalPrice(product.price, discountPercent);
      const hasDiscount = discountPercent > 0;

      items.push(`
    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <title>${escapeXml(product.name)}</title>
      <description>${escapeXml(cleanDescription(product.short_description || product.description))}</description>
      <link>${escapeXml(getProductUrl(product.url_slug))}</link>
      <g:availability>in_stock</g:availability>
      <g:price>${formatFeedPrice(hasDiscount ? product.price : finalPrice)}</g:price>
      ${hasDiscount ? `<g:sale_price>${formatFeedPrice(finalPrice)}</g:sale_price>` : ''}
      <g:brand>${escapeXml(brandName)}</g:brand>
      <g:mpn>${escapeXml(product.sku)}</g:mpn>
      <g:condition>new</g:condition>
      <g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>
      ${product.weight_grams ? `<g:shipping_weight>${product.weight_grams} g</g:shipping_weight>` : ''}
    </item>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Monster Phone Boutique - Catalogue Produits</title>
    <link>${SITE_URL}</link>
    <description>Smartphones gaming, accessoires et audio à La Réunion</description>
    ${items.join('\n')}
  </channel>
</rss>`;
}
