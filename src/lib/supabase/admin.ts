import { createClient } from './client';

// ========================================
// Types
// ========================================

export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface StockHistory {
  id: string;
  product_id: string;
  previous_stock: number;
  new_stock: number;
  change_amount: number;
  change_reason: string;
  admin_email: string;
  created_at: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  message: string;
  icon?: string;
  bg_color: string;
  text_color: string;
  is_active: boolean;
  display_order: number;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

// ========================================
// Admin Authentication
// ========================================

export async function signInAdmin(email: string, password: string) {
  const supabase = createClient();

  try {
    console.log('🔵 Step 1: Verifying admin status...');

    // First, verify admin status via API
    const verifyResponse = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const verifyData = await verifyResponse.json();
    console.log('🔵 Step 2: Admin verification result:', verifyData);

    if (!verifyResponse.ok || !verifyData.isAdmin) {
      console.log('❌ Not an admin');
      return {
        data: null,
        error: new Error('Accès non autorisé. Seuls les administrateurs peuvent se connecter.')
      };
    }

    console.log('🔵 Step 3: Signing in with Supabase...');

    // Then sign in with Supabase Auth directly on the client
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.log('❌ Auth error:', authError);
      return {
        data: null,
        error: authError
      };
    }

    console.log('✅ Login successful! Session:', authData.session);

    return {
      data: {
        auth: authData,
        admin: verifyData.admin
      },
      error: null
    };
  } catch (error) {
    console.log('❌ Exception:', error);
    return {
      data: null,
      error: new Error('Erreur lors de la connexion au serveur')
    };
  }
}

export async function signOutAdmin() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getAdminSession() {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    return { session: null, admin: null, error };
  }

  // Verify admin status via API (uses service role key)
  const verifyResponse = await fetch('/api/admin/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: session.user.email }),
  });

  if (!verifyResponse.ok) {
    return { session, admin: null, error: null };
  }

  const verifyData = await verifyResponse.json();
  return { session, admin: verifyData.admin, error: null };
}

export async function isAdmin(email: string): Promise<boolean> {
  // Verify admin status via API (uses service role key)
  const verifyResponse = await fetch('/api/admin/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!verifyResponse.ok) {
    return false;
  }

  const verifyData = await verifyResponse.json();
  return verifyData.isAdmin;
}

// ========================================
// Stock Management
// ========================================

export async function updateProductStock(
  productId: string,
  newStock: number,
  reason: string = 'Mise à jour manuelle'
) {
  const supabase = createClient();

  const { error } = await supabase.rpc('update_product_stock', {
    p_product_id: productId,
    p_new_stock: newStock,
    p_reason: reason,
  });

  if (error) {
    console.error('Error updating stock:', error);
    return { success: false, error };
  }

  return { success: true, error: null };
}

export async function getStockHistory(productId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('product_stock_history')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
    .limit(50);

  return { data, error };
}

// ========================================
// Promo Banners Management
// ========================================

export async function getActiveBanners() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('promo_banners')
    .select('*')
    .eq('is_active', true)
    .or('start_date.is.null,start_date.lte.now()')
    .or('end_date.is.null,end_date.gte.now()')
    .order('display_order', { ascending: true });

  return { data, error };
}

export async function getAllBanners() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('promo_banners')
    .select('*')
    .order('display_order', { ascending: true });

  return { data, error };
}

export async function createBanner(banner: Omit<PromoBanner, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('promo_banners')
    .insert(banner)
    .select()
    .single();

  return { data, error };
}

export async function updateBanner(id: string, updates: Partial<PromoBanner>) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('promo_banners')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function deleteBanner(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('promo_banners')
    .delete()
    .eq('id', id);

  return { error };
}

// ========================================
// Collection Management
// ========================================

export async function addProductToCollection(collectionId: string, productId: string, displayOrder: number = 0) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('collection_products')
    .insert({
      collection_id: collectionId,
      product_id: productId,
      display_order: displayOrder,
    })
    .select()
    .single();

  return { data, error };
}

export async function removeProductFromCollection(collectionId: string, productId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('collection_products')
    .delete()
    .eq('collection_id', collectionId)
    .eq('product_id', productId);

  return { error };
}

export async function getCollectionProducts(collectionId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('collection_products')
    .select(`
      *,
      product:products(*)
    `)
    .eq('collection_id', collectionId)
    .order('display_order', { ascending: true });

  return { data, error };
}

export async function updateCollectionProductOrder(id: string, newOrder: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from('collection_products')
    .update({ display_order: newOrder })
    .eq('id', id);

  return { error };
}

// ========================================
// Product Management (Admin)
// ========================================

export async function updateProductPrice(
  productId: string,
  price: number,
  originalPrice?: number,
  discount?: number
) {
  const supabase = createClient();

  const updates: any = {
    price,
    updated_at: new Date().toISOString(),
  };

  if (originalPrice !== undefined) updates.original_price = originalPrice;
  if (discount !== undefined) updates.discount = discount;

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', productId)
    .select()
    .single();

  return { data, error };
}

export async function updateProductStatus(productId: string, status: 'active' | 'draft' | 'out-of-stock') {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('products')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', productId)
    .select()
    .single();

  return { data, error };
}

// ========================================
// Dashboard Stats
// ========================================

export async function getDashboardStats() {
  const supabase = createClient();

  // Total products
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .neq('status', 'discontinued');

  // Active products
  const { count: activeProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  // Out of stock products
  const { count: outOfStock } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .or('status.eq.out-of-stock,stock_quantity.lte.0');

  // Total collections
  const { count: totalCollections } = await supabase
    .from('collections')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // Active banners
  const { count: activeBanners } = await supabase
    .from('promo_banners')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  return {
    totalProducts: totalProducts || 0,
    activeProducts: activeProducts || 0,
    outOfStock: outOfStock || 0,
    totalCollections: totalCollections || 0,
    activeBanners: activeBanners || 0,
  };
}
