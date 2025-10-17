import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

// Module-level singleton - shared across all imports in the same JavaScript context
// This is the CORRECT way to share Supabase client in Next.js App Router
let browserClient: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  // Server-side: always create new instance (no persistence)
  if (typeof window === 'undefined') {
    return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });
  }

  // Browser-side: create singleton ONLY once
  if (!browserClient) {
    browserClient = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storage: window.localStorage,
        // Use default Supabase storage key format: sb-{project-ref}-auth-token
        // storageKey: 'supabase.auth.token', // REMOVED - using default
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    });
  }

  return browserClient;
}

// Types basés sur la structure de la base de données
export interface DatabaseProduct {
  id: string;
  sku: string;
  name: string;
  url_slug: string;
  brand_id: string;
  category_id: string;
  subcategory_id?: string;
  description?: string;
  short_description?: string;
  price: number;
  original_price?: number;
  discount?: number;
  promo?: string;
  stock_quantity?: number;
  unit_price_ht?: number;
  d3e_tax?: number;
  tva_rate?: number;
  energy_class?: string;
  das_limb?: string;
  status?: string;
  warranty?: string;
  delivery_time?: string;
  repairability_index?: number;
  das_head?: string;
  das_body?: string;
  weight_grams?: number;
  dimensions_cm?: any;
  airtable_id?: string;
  average_rating?: number;
  total_reviews?: number;
  images?: string[];
  specifications?: any;
  highlights?: string[];
  created_at: string;
  updated_at: string;
  published_at?: string;
  search_vector?: any;
}

export interface DatabaseBrand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  website?: string;
  country?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseCategory {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
  description?: string;
  icon?: string;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseVariant {
  id: string;
  product_id: string;
  color: string;
  color_code?: string;
  size?: string;
  ean?: string;
  stock: number;
  price_adjustment?: number;
  is_default: boolean;
  display_order?: number;
}

export interface DatabaseImage {
  id: string;
  product_id: string;
  variant_id?: string;
  url: string;
  alt?: string;
  is_primary: boolean;
  display_order?: number;
}

export interface DatabaseSpecification {
  id: string;
  product_id: string;
  label: string;
  value: string;
  icon?: string;
  display_order?: number;
}

export interface DatabaseReview {
  id: string;
  product_id: string;
  author_name: string;
  author_email?: string;
  rating: number;
  title?: string;
  comment?: string;
  is_verified: boolean;
  helpful_count: number;
  created_at: string;
}

export interface DatabaseCollection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

// Type pour la vue complète des produits
export interface ProductFullView {
  id: string;
  sku: string;
  name: string;
  url_slug: string;
  brand_name: string;
  category_name: string;
  subcategory_name?: string;
  description?: string;
  short_description?: string;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  admin_discount_percent?: number;
  is_visible?: boolean;
  status: string;
  warranty?: string;
  delivery_time?: string;
  repairability_index?: number;
  das_head?: string;
  das_body?: string;
  average_rating?: number;
  total_reviews?: number;
  variants?: any[];
  images?: any[];
  specifications?: any[];
  highlights?: string[];
  badges?: string[];
  videos?: any[];
  reviews?: any[];
}

// Helper functions for fetching data
export async function getProducts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(name, slug),
      category:categories!products_category_id_fkey(name, slug),
      product_variants (
        id,
        color,
        color_code,
        size,
        ean,
        stock,
        price_adjustment,
        is_default
      )
    `)
    .neq('status', 'discontinued')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export async function getProductBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(name, slug),
      category:categories!products_category_id_fkey(name, slug)
    `)
    .eq('url_slug', slug)
    .neq('status', 'discontinued')
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

export async function getProductsByCategorySlug(categorySlug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands!inner(name, slug),
      category:categories!inner!products_category_id_fkey(name, slug)
    `)
    .eq('category.slug', categorySlug)
    .neq('status', 'discontinued')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data || [];
}

export async function getProductsByBrandSlug(brandSlug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands!inner(name, slug),
      category:categories!products_category_id_fkey(name, slug)
    `)
    .eq('brand.slug', brandSlug)
    .neq('status', 'discontinued')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by brand:', error);
    return [];
  }

  return data || [];
}

export async function searchProducts(query: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(name, slug),
      category:categories!products_category_id_fkey(name, slug)
    `)
    .neq('status', 'discontinued')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,sku.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching products:', error);
    return [];
  }

  return data || [];
}

export async function getCategories() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select(`
      *,
      parent:parent_id(id, name, slug),
      subcategories:categories!parent_id(id, name, slug)
    `)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

export async function getBrands() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching brands:', error);
    return [];
  }

  return data || [];
}
