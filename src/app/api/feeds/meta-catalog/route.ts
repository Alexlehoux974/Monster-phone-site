import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  getAvailability,
  getProductUrl,
  getImageUrl,
  cleanDescription,
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

interface MetaCatalogItem {
  id: string;
  title: string;
  description: string;
  availability: string;
  condition: string;
  price: string;
  link: string;
  image_link: string;
  additional_image_link?: string[];
  brand: string;
  google_product_category: string;
  sale_price?: string;
  item_group_id?: string;
  color?: string;
  gtin?: string;
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

    // Générer le CSV pour Meta
    const csv = generateMetaCatalogCsv(formattedProducts);

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="meta-catalog.csv"',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache 1 heure
      },
    });
  } catch (error) {
    console.error('Error generating Meta Catalog feed:', error);
    return NextResponse.json({ error: 'Failed to generate feed' }, { status: 500 });
  }
}

/**
 * Mappe l'état de disponibilité vers le format Meta
 */
function getMetaAvailability(stock: number): string {
  if (stock > 0) return 'in stock';
  return 'out of stock';
}

/**
 * Mappe une catégorie vers Google Product Category pour Meta
 */
function getMetaProductCategory(categoryName: string): string {
  const categoryMap: Record<string, string> = {
    'Smartphones': '267',
    'Téléphones': '267',
    'Accessoires': '222',
    'Audio': '233',
    'Casques': '233',
    'Écouteurs': '233',
    'Montres': '178',
    'Protection': '276',
    'Chargeurs': '280',
    'Câbles': '280',
    'Enceintes': '224',
  };

  return categoryMap[categoryName] || '267'; // Default: Mobile Phones
}

/**
 * Échappe les valeurs pour CSV
 */
function escapeCsvValue(value: string | null | undefined): string {
  if (!value) return '';

  // Si la valeur contient des virgules, guillemets ou retours à la ligne, l'entourer de guillemets
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    // Échapper les guillemets en les doublant
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

/**
 * Formate le prix pour Meta (format: "299.99 EUR")
 */
function formatMetaPrice(price: number): string {
  return `${price.toFixed(2)} EUR`;
}

function generateMetaCatalogCsv(products: ProductRow[]): string {
  const headers = [
    'id',
    'title',
    'description',
    'availability',
    'condition',
    'price',
    'link',
    'image_link',
    'additional_image_link',
    'brand',
    'google_product_category',
    'sale_price',
    'item_group_id',
    'color',
    'gtin',
  ];

  const rows: string[][] = [headers];

  for (const product of products) {
    const brandName = product.brand?.name || 'Monster Phone';
    const categoryId = getMetaProductCategory(product.category?.name || 'Smartphones');
    const description = cleanDescription(product.short_description || product.description, 5000);

    // Si le produit a des variants, créer une ligne par variant
    if (product.variants && product.variants.length > 0) {
      for (const variant of product.variants) {
        // Calculer le prix avec réduction (priorité au discount variant, sinon produit)
        const discountPercent = variant.admin_discount_percent || product.admin_discount_percent || 0;
        const finalPrice = calculateFinalPrice(product.price, discountPercent);
        const hasDiscount = discountPercent > 0;

        // Images
        const primaryImage = variant.images?.[0] ? getImageUrl(variant.images[0]) : '';
        const additionalImages = (variant.images || []).slice(1, 10).map(img => getImageUrl(img));

        const row = [
          variant.id, // id
          `${product.name} - ${variant.color}`, // title
          description, // description
          getMetaAvailability(variant.stock), // availability
          'new', // condition
          hasDiscount ? formatMetaPrice(product.price) : formatMetaPrice(finalPrice), // price
          `${getProductUrl(product.url_slug)}?variant=${encodeURIComponent(variant.color)}`, // link
          primaryImage, // image_link
          additionalImages.join(','), // additional_image_link
          brandName, // brand
          categoryId, // google_product_category
          hasDiscount ? formatMetaPrice(finalPrice) : '', // sale_price
          product.id, // item_group_id
          variant.color, // color
          variant.ean || '', // gtin
        ];

        rows.push(row.map(v => escapeCsvValue(String(v))));
      }
    } else {
      // Produit sans variants
      const discountPercent = product.admin_discount_percent || 0;
      const finalPrice = calculateFinalPrice(product.price, discountPercent);
      const hasDiscount = discountPercent > 0;

      const row = [
        product.id, // id
        product.name, // title
        description, // description
        'in stock', // availability
        'new', // condition
        hasDiscount ? formatMetaPrice(product.price) : formatMetaPrice(finalPrice), // price
        getProductUrl(product.url_slug), // link
        '', // image_link
        '', // additional_image_link
        brandName, // brand
        categoryId, // google_product_category
        hasDiscount ? formatMetaPrice(finalPrice) : '', // sale_price
        '', // item_group_id
        '', // color
        '', // gtin
      ];

      rows.push(row.map(v => escapeCsvValue(String(v))));
    }
  }

  return rows.map(row => row.join(',')).join('\n');
}
