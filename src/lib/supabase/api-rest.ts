/**
 * API REST Supabase pour Monster Phone Boutique
 * Utilise uniquement fetch() pour éviter le blocage du client Supabase sur Vercel
 */

import type { ProductFullView } from './client';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Helper pour faire des requêtes REST vers Supabase
 */
async function supabaseRest<T>(
  table: string,
  params: Record<string, string> = {},
  options: RequestInit = {}
): Promise<T[]> {
  const queryParams = new URLSearchParams(params);
  const url = `${SUPABASE_URL}/rest/v1/${table}?${queryParams}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    signal: AbortSignal.timeout(10000), // 10s timeout
  });

  if (!response.ok) {
    console.error(`Supabase REST error for ${table}:`, response.status);
    return [];
  }

  return response.json();
}

/**
 * Récupérer tous les produits actifs
 */
export async function getActiveProducts(options?: {
  limit?: number;
  offset?: number;
  sortBy?: 'price' | 'name' | 'created_at' | 'rating';
  sortOrder?: 'asc' | 'desc';
}): Promise<ProductFullView[]> {
  const params: Record<string, string> = {
    select: `
      *,
      brand:brands(id,name,slug,logo_url),
      category:categories!products_category_id_fkey(id,name,slug),
      product_variants(*),
      product_images(*)
    `.replace(/\s+/g, ''),
    status: 'eq.active',
  };

  // Tri
  const sortColumn = options?.sortBy === 'rating' ? 'average_rating' : (options?.sortBy || 'created_at');
  params.order = `${sortColumn}.${options?.sortOrder || 'desc'}`;

  // Pagination
  if (options?.limit) {
    const offset = options.offset || 0;
    params.offset = offset.toString();
    params.limit = options.limit.toString();
  }

  const data = await supabaseRest<any>('products', params);

  // Transform to ProductFullView format
  return data.map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    brand_slug: product.brand?.slug || '',
    category_id: product.category?.id || product.category_id || '',
    category_name: product.category?.name || '',
    category_slug: product.category?.slug || '',
    subcategory_name: product.subcategory || '',
    variants: product.product_variants || [],
    images: product.product_images?.map((img: any) => img.url) || product.images || []
  })) as ProductFullView[];
}

/**
 * Récupérer les produits d'une catégorie par ID
 */
export async function getProductsByCategoryId(
  categoryId: string,
  options?: {
    limit?: number;
    sortBy?: 'price' | 'name' | 'created_at';
    sortOrder?: 'asc' | 'desc';
  }
): Promise<ProductFullView[]> {
  const params: Record<string, string> = {
    select: `
      *,
      brand:brands(id,name,slug,logo_url),
      category:categories!products_category_id_fkey(id,name,slug),
      product_variants(*),
      product_images(*)
    `.replace(/\s+/g, ''),
    status: 'eq.active',
    category_id: `eq.${categoryId}`,
  };

  // Tri
  const sortColumn = options?.sortBy || 'created_at';
  params.order = `${sortColumn}.${options?.sortOrder || 'desc'}`;

  // Pagination
  if (options?.limit) {
    params.limit = options.limit.toString();
  }

  const data = await supabaseRest<any>('products', params);

  return data.map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    brand_slug: product.brand?.slug || '',
    category_id: product.category?.id || product.category_id || '',
    category_name: product.category?.name || '',
    category_slug: product.category?.slug || '',
    subcategory_name: product.subcategory || '',
    variants: product.product_variants || [],
    images: product.product_images?.map((img: any) => img.url) || product.images || []
  })) as ProductFullView[];
}

/**
 * Récupérer les produits d'une catégorie par slug
 */
export async function getProductsByCategory(
  categorySlug: string,
  options?: {
    limit?: number;
    includeSubcategories?: boolean;
  }
): Promise<ProductFullView[]> {
  const params: Record<string, string> = {
    select: `
      *,
      brand:brands(id,name,slug),
      category:categories!products_category_id_fkey(id,name,slug),
      product_variants(*),
      product_images(*)
    `.replace(/\s+/g, ''),
    status: 'eq.active',
  };

  if (options?.limit) {
    params.limit = options.limit.toString();
  }

  // On récupère tous les produits et on filtre côté client car le slug est dans la relation
  const data = await supabaseRest<any>('products', params);

  const filtered = data.filter(p =>
    p.category?.slug === categorySlug ||
    (options?.includeSubcategories && p.subcategory === categorySlug)
  );

  return filtered.map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    category_name: product.category?.name || '',
    subcategory_name: product.subcategory || '',
    variants: product.product_variants || [],
    images: product.product_images?.map((img: any) => img.url) || product.images || []
  })) as ProductFullView[];
}

/**
 * Récupérer les produits d'une marque
 */
export async function getProductsByBrand(
  brandName: string,
  options?: {
    limit?: number;
  }
): Promise<ProductFullView[]> {
  const params: Record<string, string> = {
    select: `
      *,
      brand:brands(id,name,slug),
      category:categories!products_category_id_fkey(id,name,slug),
      product_variants(*),
      product_images(*)
    `.replace(/\s+/g, ''),
    status: 'eq.active',
  };

  if (options?.limit) {
    params.limit = options.limit.toString();
  }

  const data = await supabaseRest<any>('products', params);

  const filtered = data.filter(p => p.brand?.name === brandName);

  return filtered.map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    category_name: product.category?.name || '',
    subcategory_name: product.subcategory || '',
    variants: product.product_variants || [],
    images: product.product_images?.map((img: any) => img.url) || product.images || []
  })) as ProductFullView[];
}

/**
 * Récupérer toutes les marques
 */
export async function getAllBrands(): Promise<{ id: string; name: string; slug: string }[]> {
  const params: Record<string, string> = {
    select: 'id,name,slug',
    order: 'name.asc',
  };

  return supabaseRest<any>('brands', params);
}

/**
 * Récupérer toutes les catégories
 */
export async function getAllCategories(): Promise<any[]> {
  const params: Record<string, string> = {
    select: '*',
    order: 'name.asc',
  };

  return supabaseRest<any>('categories', params);
}

/**
 * Récupérer les meilleures ventes
 */
export async function getBestSellers(limit: number = 10): Promise<ProductFullView[]> {
  const params: Record<string, string> = {
    select: `
      *,
      brand:brands(id,name,slug),
      category:categories!products_category_id_fkey(id,name,slug),
      product_variants(*),
      product_images(*)
    `.replace(/\s+/g, ''),
    status: 'eq.active',
    order: 'total_sales.desc',
    limit: limit.toString(),
  };

  const data = await supabaseRest<any>('products', params);

  return data.map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    category_name: product.category?.name || '',
    subcategory_name: product.subcategory || '',
    variants: product.product_variants || [],
    images: product.product_images?.map((img: any) => img.url) || product.images || []
  })) as ProductFullView[];
}

/**
 * Récupérer les produits en promotion
 */
export async function getDiscountedProducts(minDiscount: number = 10): Promise<ProductFullView[]> {
  const params: Record<string, string> = {
    select: `
      *,
      brand:brands(id,name,slug),
      category:categories!products_category_id_fkey(id,name,slug),
      product_variants(*),
      product_images(*)
    `.replace(/\s+/g, ''),
    status: 'eq.active',
    admin_discount_percent: `gte.${minDiscount}`,
    order: 'admin_discount_percent.desc',
  };

  const data = await supabaseRest<any>('products', params);

  return data.map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    category_name: product.category?.name || '',
    subcategory_name: product.subcategory || '',
    variants: product.product_variants || [],
    images: product.product_images?.map((img: any) => img.url) || product.images || []
  })) as ProductFullView[];
}

/**
 * Récupérer les nouveautés
 */
export async function getNewProducts(days: number = 30, limit: number = 10): Promise<ProductFullView[]> {
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - days);

  const params: Record<string, string> = {
    select: `
      *,
      brand:brands(id,name,slug),
      category:categories!products_category_id_fkey(id,name,slug),
      product_variants(*),
      product_images(*)
    `.replace(/\s+/g, ''),
    status: 'eq.active',
    created_at: `gte.${daysAgo.toISOString()}`,
    order: 'created_at.desc',
    limit: limit.toString(),
  };

  const data = await supabaseRest<any>('products', params);

  return data.map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    category_name: product.category?.name || '',
    subcategory_name: product.subcategory || '',
    variants: product.product_variants || [],
    images: product.product_images?.map((img: any) => img.url) || product.images || []
  })) as ProductFullView[];
}

/**
 * Récupérer les produits vedettes d'une section
 * Si la section n'a pas de produits manuellement sélectionnés,
 * retourne les produits de la catégorie par défaut
 */
export async function getFeaturedProductsBySection(
  sectionKey: string
): Promise<ProductFullView[]> {
  // Récupérer la section
  const sectionParams: Record<string, string> = {
    select: 'id,title,category_id,max_products',
    section_key: `eq.${sectionKey}`,
    is_active: 'eq.true',
  };

  const sections = await supabaseRest<any>('featured_sections', sectionParams);
  if (sections.length === 0) return [];

  const section = sections[0];

  // Récupérer les produits manuellement sélectionnés
  const featuredParams: Record<string, string> = {
    select: 'product_id,display_order',
    section_id: `eq.${section.id}`,
    order: 'display_order.asc',
  };

  const featuredProducts = await supabaseRest<any>('featured_products', featuredParams);

  // Si des produits sont manuellement sélectionnés
  if (featuredProducts.length > 0) {
    const productIds = featuredProducts.map((fp: any) => fp.product_id);

    const productsParams: Record<string, string> = {
      select: `
        *,
        brand:brands(id,name,slug,logo_url),
        category:categories!products_category_id_fkey(id,name,slug),
        product_variants(*),
        product_images(*)
      `.replace(/\s+/g, ''),
      status: 'eq.active',
      id: `in.(${productIds.join(',')})`,
    };

    const products = await supabaseRest<any>('products', productsParams);

    // Ordonner selon display_order
    const productsMap = new Map(products.map((p: any) => [p.id, p]));
    const orderedProducts = featuredProducts
      .map((fp: any) => productsMap.get(fp.product_id))
      .filter((p: any) => p !== undefined);

    return orderedProducts.map(product => ({
      ...product,
      brand_name: product.brand?.name || '',
      brand_slug: product.brand?.slug || '',
      category_id: product.category?.id || product.category_id || '',
      category_name: product.category?.name || '',
      category_slug: product.category?.slug || '',
      subcategory_name: product.subcategory || '',
      variants: product.product_variants || [],
      images: product.product_images?.map((img: any) => img.url) || product.images || []
    })) as ProductFullView[];
  }

  // Sinon, utiliser la catégorie par défaut
  if (section.category_id) {
    return getProductsByCategoryId(section.category_id, {
      limit: section.max_products,
      sortBy: 'created_at',
      sortOrder: 'desc'
    });
  }

  return [];
}

/**
 * Récupérer toutes les sections de produits vedettes actives
 * avec leurs produits respectifs
 */
export async function getAllFeaturedSections(): Promise<{
  id: string;
  section_key: string;
  title: string;
  display_order: number;
  products: ProductFullView[];
}[]> {
  const params: Record<string, string> = {
    select: 'id,section_key,title,display_order',
    is_active: 'eq.true',
    order: 'display_order.asc',
  };

  const sections = await supabaseRest<any>('featured_sections', params);

  const results = await Promise.all(
    sections.map(async (section) => ({
      id: section.id,
      section_key: section.section_key,
      title: section.title,
      display_order: section.display_order,
      products: await getFeaturedProductsBySection(section.section_key)
    }))
  );

  return results;
}
