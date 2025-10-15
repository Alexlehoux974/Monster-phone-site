/**
 * API Supabase pour Monster Phone Boutique
 * Fonctions pour interagir avec la base de données
 */

import { createClient } from './client';
import type {
  DatabaseProduct,
  DatabaseBrand,
  DatabaseCategory,
  DatabaseCollection,
  ProductFullView
} from './client';

// ========================================
// PRODUITS
// ========================================

/**
 * Récupérer tous les produits actifs avec leurs relations
 */
export async function getActiveProducts(options?: {
  limit?: number;
  offset?: number;
  sortBy?: 'price' | 'name' | 'created_at' | 'rating';
  sortOrder?: 'asc' | 'desc';
}) {
  const supabase = createClient();

  let query = supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug, logo_url),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug),
      product_variants(*),
      product_images(*)
    `)
    .eq('status', 'active');

  // Tri
  const sortColumn = options?.sortBy === 'rating' ? 'average_rating' : (options?.sortBy || 'created_at');
  query = query.order(sortColumn, { ascending: options?.sortOrder === 'asc' });

  // Pagination
  if (options?.limit) {
    query = query.range(
      options.offset || 0,
      (options.offset || 0) + options.limit - 1
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching active products:', error);
    return [];
  }

  // Transform to ProductFullView format
  return (data || []).map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    brand_slug: product.brand?.slug || '',
    category_name: product.category?.name || '',
    category_slug: product.category?.slug || '',
    subcategory_name: product.subcategory?.name || '',
    variants: product.product_variants || [],
    images: product.product_images || []
  })) as ProductFullView[];
}

/**
 * Récupérer un produit par son slug
 */
export async function getProductBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug, logo_url),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug),
      product_variants(*),
      product_images(*)
    `)
    .eq('url_slug', slug)
    .single();

  if (error) {
    console.error('Erreur récupération produit:', error);
    return null;
  }

  return {
    ...data,
    brand_name: data.brand?.name || '',
    brand_slug: data.brand?.slug || '',
    category_name: data.category?.name || '',
    category_slug: data.category?.slug || '',
    subcategory_name: data.subcategory?.name || '',
    variants: data.product_variants || [],
    images: data.product_images || []
  } as ProductFullView;
}

/**
 * Récupérer un produit par son ID
 */
export async function getProductById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug, logo_url),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug),
      product_variants(*),
      product_images(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erreur récupération produit:', error);
    return null;
  }

  return {
    ...data,
    brand_name: data.brand?.name || '',
    brand_slug: data.brand?.slug || '',
    category_name: data.category?.name || '',
    category_slug: data.category?.slug || '',
    subcategory_name: data.subcategory?.name || '',
    variants: data.product_variants || [],
    images: data.product_images || []
  } as ProductFullView;
}

/**
 * Rechercher des produits
 */
export async function searchProducts(query: string, options?: {
  limit?: number;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const supabase = createClient();
  let dbQuery = supabase
    .from('products')
    .select(`
      *,
      brands!brand_id(name, slug),
      categories!category_id(name, slug)
    `)
    .eq('status', 'active')
    .textSearch('search_vector', query, {
      type: 'websearch',
      config: 'french'
    });

  // Filtres optionnels
  if (options?.category) {
    dbQuery = dbQuery.eq('categories.slug', options.category);
  }
  if (options?.brand) {
    dbQuery = dbQuery.eq('brands.slug', options.brand);
  }
  if (options?.minPrice) {
    dbQuery = dbQuery.gte('price', options.minPrice);
  }
  if (options?.maxPrice) {
    dbQuery = dbQuery.lte('price', options.maxPrice);
  }
  if (options?.limit) {
    dbQuery = dbQuery.limit(options.limit);
  }

  const { data, error } = await dbQuery;

  if (error) {
    console.error('Erreur recherche produits:', error);
    return [];
  }

  return data;
}

/**
 * Récupérer les produits par catégorie
 */
export async function getProductsByCategory(categorySlug: string, options?: {
  limit?: number;
  offset?: number;
  includeSubcategories?: boolean;
}) {
  const supabase = createClient();
  // D'abord récupérer la catégorie
  const { data: category } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', categorySlug)
    .single();

  if (!category) return [];

  let query = supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug, logo_url),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug),
      product_variants(*),
      product_images(*)
    `)
    .eq('status', 'active');

  if (options?.includeSubcategories) {
    // Récupérer aussi les sous-catégories
    const { data: subcategories } = await supabase
      .from('categories')
      .select('id')
      .eq('parent_id', category.id);

    const categoryIds = [category.id, ...(subcategories?.map(s => s.id) || [])];
    query = query.in('category_id', categoryIds);
  } else {
    query = query.eq('category_id', category.id);
  }

  // Pagination
  if (options?.limit) {
    query = query.range(
      options.offset || 0,
      (options.offset || 0) + options.limit - 1
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erreur récupération produits par catégorie:', error);
    return [];
  }

  // Transform to ProductFullView format
  return (data || []).map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    brand_slug: product.brand?.slug || '',
    category_name: product.category?.name || '',
    category_slug: product.category?.slug || '',
    subcategory_name: product.subcategory?.name || '',
    variants: product.product_variants || [],
    images: product.product_images || []
  })) as ProductFullView[];
}

/**
 * Récupérer les produits par marque
 */
export async function getProductsByBrand(brandSlug: string, options?: {
  limit?: number;
  offset?: number;
}) {
  const supabase = createClient();

  // D'abord récupérer la marque
  const { data: brand } = await supabase
    .from('brands')
    .select('id')
    .eq('slug', brandSlug)
    .single();

  if (!brand) return [];

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug, logo_url),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug),
      product_variants(*),
      product_images(*)
    `)
    .eq('status', 'active')
    .eq('brand_id', brand.id)
    .range(
      options?.offset || 0,
      (options?.offset || 0) + (options?.limit || 50) - 1
    );

  if (error) {
    console.error('Erreur récupération produits par marque:', error);
    return [];
  }

  // Transform to ProductFullView format
  return (data || []).map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    brand_slug: product.brand?.slug || '',
    category_name: product.category?.name || '',
    category_slug: product.category?.slug || '',
    subcategory_name: product.subcategory?.name || '',
    variants: product.product_variants || [],
    images: product.product_images || []
  })) as ProductFullView[];
}

/**
 * Récupérer les produits d'une collection
 */
export async function getProductsByCollection(collectionSlug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      product_collections(
        display_order,
        product:products(
          *,
          brand:brands(id, name, slug, logo_url),
          category:categories!products_category_id_fkey(id, name, slug),
          subcategory:categories!products_subcategory_id_fkey(id, name, slug),
          product_variants(*),
          product_images(*)
        )
      )
    `)
    .eq('slug', collectionSlug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Erreur récupération collection:', error);
    return [];
  }

  // Extraire et trier les produits
  const products = data?.product_collections
    ?.sort((a: any, b: any) => a.display_order - b.display_order)
    ?.map((pc: any) => pc.product ? {
      ...pc.product,
      brand_name: pc.product.brand?.name || '',
      brand_slug: pc.product.brand?.slug || '',
      category_name: pc.product.category?.name || '',
      category_slug: pc.product.category?.slug || '',
      subcategory_name: pc.product.subcategory?.name || '',
      variants: pc.product.product_variants || [],
      images: pc.product.product_images || []
    } : null)
    ?.filter(Boolean) || [];

  return products as ProductFullView[];
}

/**
 * Récupérer les produits en promotion
 */
export async function getDiscountedProducts(minDiscount: number = 10) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug, logo_url),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug),
      product_variants(*),
      product_images(*)
    `)
    .eq('status', 'active')
    .not('discount', 'is', null)
    .gte('discount', minDiscount)
    .order('discount', { ascending: false });

  if (error) {
    console.error('Erreur récupération promotions:', error);
    return [];
  }

  // Transform to ProductFullView format
  return (data || []).map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    brand_slug: product.brand?.slug || '',
    category_name: product.category?.name || '',
    category_slug: product.category?.slug || '',
    subcategory_name: product.subcategory?.name || '',
    discount_percentage: product.discount,
    variants: product.product_variants || [],
    images: product.product_images || []
  })) as ProductFullView[];
}

/**
 * Récupérer les nouveautés
 */
export async function getNewProducts(days: number = 30, limit: number = 10) {
  const supabase = createClient();
  const date = new Date();
  date.setDate(date.getDate() - days);

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug, logo_url),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug),
      product_variants(*),
      product_images(*)
    `)
    .eq('status', 'active')
    .gte('created_at', date.toISOString())
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erreur récupération nouveautés:', error);
    return [];
  }

  // Transform to ProductFullView format
  return (data || []).map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    brand_slug: product.brand?.slug || '',
    category_name: product.category?.name || '',
    category_slug: product.category?.slug || '',
    subcategory_name: product.subcategory?.name || '',
    variants: product.product_variants || [],
    images: product.product_images || []
  })) as ProductFullView[];
}

/**
 * Récupérer les meilleures ventes
 */
export async function getBestSellers(limit: number = 10) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug, logo_url),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug),
      product_variants(*),
      product_images(*)
    `)
    .eq('status', 'active')
    .order('total_reviews', { ascending: false })
    .order('average_rating', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erreur récupération bestsellers:', error);
    return [];
  }

  // Transform to ProductFullView format
  return (data || []).map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    brand_slug: product.brand?.slug || '',
    category_name: product.category?.name || '',
    category_slug: product.category?.slug || '',
    subcategory_name: product.subcategory?.name || '',
    variants: product.product_variants || [],
    images: product.product_images || []
  })) as ProductFullView[];
}

/**
 * Récupérer les produits similaires
 */
export async function getSimilarProducts(productId: string, limit: number = 4) {
  const supabase = createClient();
  // D'abord récupérer le produit actuel
  const { data: currentProduct } = await supabase
    .from('products')
    .select('category_id, brand_id, price')
    .eq('id', productId)
    .single();

  if (!currentProduct) return [];

  // Récupérer des produits similaires
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug, logo_url),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug),
      product_variants(*),
      product_images(*)
    `)
    .eq('status', 'active')
    .neq('id', productId)
    .or(`category_id.eq.${currentProduct.category_id},brand_id.eq.${currentProduct.brand_id}`)
    .gte('price', currentProduct.price * 0.7)
    .lte('price', currentProduct.price * 1.3)
    .limit(limit);

  if (error) {
    console.error('Erreur récupération produits similaires:', error);
    return [];
  }

  // Transform to ProductFullView format
  return (data || []).map(product => ({
    ...product,
    brand_name: product.brand?.name || '',
    brand_slug: product.brand?.slug || '',
    category_name: product.category?.name || '',
    category_slug: product.category?.slug || '',
    subcategory_name: product.subcategory?.name || '',
    variants: product.product_variants || [],
    images: product.product_images || []
  })) as ProductFullView[];
}

// ========================================
// MARQUES
// ========================================

/**
 * Récupérer toutes les marques
 */
export async function getAllBrands() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name');

  if (error) {
    console.error('Erreur récupération marques:', error);
    return [];
  }

  return data as DatabaseBrand[];
}

/**
 * Récupérer une marque par son slug
 */
export async function getBrandBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Erreur récupération marque:', error);
    return null;
  }

  return data as DatabaseBrand;
}

// ========================================
// CATÉGORIES
// ========================================

/**
 * Récupérer toutes les catégories avec leurs sous-catégories
 */
export async function getAllCategories() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('categories')
    .select(`
      *,
      subcategories:categories!parent_id(*)
    `)
    .is('parent_id', null)
    .order('display_order');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
}

/**
 * Récupérer une catégorie par son slug
 */
export async function getCategoryBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select(`
      *,
      parent:categories!parent_id(*),
      subcategories:categories!parent_id(*)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Erreur récupération catégorie:', error);
    return null;
  }

  return data;
}

// ========================================
// COLLECTIONS
// ========================================

/**
 * Récupérer toutes les collections actives
 */
export async function getActiveCollections() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('is_active', true)
    .order('display_order');

  if (error) {
    console.error('Erreur récupération collections:', error);
    return [];
  }

  return data as DatabaseCollection[];
}

/**
 * Récupérer une collection par son slug
 */
export async function getCollectionBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Erreur récupération collection:', error);
    return null;
  }

  return data as DatabaseCollection;
}

// ========================================
// AVIS
// ========================================

/**
 * Récupérer les avis d'un produit
 */
export async function getProductReviews(productId: string, options?: {
  limit?: number;
  offset?: number;
  sortBy?: 'recent' | 'helpful' | 'rating_high' | 'rating_low';
}) {
  const supabase = createClient();
  let query = supabase
    .from('product_reviews')
    .select('*')
    .eq('product_id', productId);

  // Tri
  switch (options?.sortBy) {
    case 'helpful':
      query = query.order('helpful_count', { ascending: false });
      break;
    case 'rating_high':
      query = query.order('rating', { ascending: false });
      break;
    case 'rating_low':
      query = query.order('rating', { ascending: true });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  // Pagination
  if (options?.limit) {
    query = query.range(
      options.offset || 0,
      (options.offset || 0) + options.limit - 1
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erreur récupération avis:', error);
    return [];
  }

  return data;
}

/**
 * Ajouter un avis produit
 */
export async function addProductReview(review: {
  product_id: string;
  author_name: string;
  author_email?: string;
  rating: number;
  title?: string;
  comment?: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('product_reviews')
    .insert(review)
    .select()
    .single();

  if (error) {
    console.error('Erreur ajout avis:', error);
    return null;
  }

  return data;
}

/**
 * Marquer un avis comme utile
 */
export async function markReviewHelpful(reviewId: string) {
  const supabase = createClient();
  const { error } = await supabase.rpc('increment_review_helpful_count', {
    review_id: reviewId
  });

  if (error) {
    console.error('Erreur marquage avis utile:', error);
    return false;
  }

  return true;
}

// ========================================
// STATISTIQUES
// ========================================

/**
 * Récupérer les statistiques des produits
 */
export async function getProductStats() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('status, count:id')
    .select();

  if (error) {
    console.error('Erreur récupération stats:', error);
    return null;
  }

  return {
    total: data?.length || 0,
    active: data?.filter(p => p.status === 'active').length || 0,
    draft: data?.filter(p => p.status === 'draft').length || 0,
    out_of_stock: data?.filter(p => p.status === 'out_of_stock').length || 0,
  };
}

/**
 * Récupérer les tendances de recherche
 */
export async function getSearchTrends(limit: number = 10) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('search_queries')
    .select('query, count')
    .order('count', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erreur récupération tendances:', error);
    return [];
  }

  return data;
}

// ========================================
// UTILITAIRES
// ========================================

/**
 * Enregistrer une recherche
 */
export async function recordSearch(query: string, resultsCount: number) {
  const supabase = createClient();
  await supabase.rpc('record_search_query', {
    search_query: query,
    results_count: resultsCount
  });
}

/**
 * Enregistrer une vue produit
 */
export async function recordProductView(productId: string) {
  const supabase = createClient();
  await supabase.rpc('increment_product_view_count', {
    product_id: productId
  });
}

/**
 * Rafraîchir les vues matérialisées
 */
export async function refreshMaterializedViews() {
  const supabase = createClient();
  const { error } = await supabase.rpc('refresh_materialized_views');
  
  if (error) {
    console.error('Erreur rafraîchissement vues:', error);
    return false;
  }

  return true;
}