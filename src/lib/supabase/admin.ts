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
    console.log('🔐 [signInAdmin] Starting login for:', email);

    // First, verify admin status via API
    console.log('📡 [signInAdmin] Verifying admin status...');
    const verifyResponse = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const verifyData = await verifyResponse.json();
    console.log('📦 [signInAdmin] Verify response:', verifyData);

    if (!verifyResponse.ok || !verifyData.isAdmin) {
      console.log('❌ [signInAdmin] Not an admin');
      return {
        data: null,
        error: new Error('Accès non autorisé. Seuls les administrateurs peuvent se connecter.')
      };
    }

    // Then sign in with Supabase Auth directly on the client
    console.log('🔑 [signInAdmin] Calling signInWithPassword...');

    // Add timeout to prevent infinite blocking
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Login timeout après 10 secondes')), 10000);
    });

    const signInPromise = supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('⏳ [signInAdmin] Waiting for auth response (max 10s)...');
    let authData: any = null;
    let authError: any = null;

    try {
      const result: any = await Promise.race([signInPromise, timeoutPromise]);
      authData = result.data;
      authError = result.error;
    } catch (error) {
      console.error('❌ [signInAdmin] Timeout or error:', error);
      authError = error;
    }

    if (authError) {
      console.error('❌ [signInAdmin] Auth error:', authError);
      return {
        data: null,
        error: authError
      };
    }

    console.log('✅ [signInAdmin] Auth successful, session created');

    // CRITICAL: Wait for session to be fully persisted in localStorage
    // DO NOT call getSession() here - it causes the session to be destroyed!
    console.log('⏳ [signInAdmin] Waiting for localStorage persistence...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('✅ [signInAdmin] Session should be persisted in localStorage');

    // Update last_login_at on successful login
    try {
      await fetch('/api/admin/update-last-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.warn('⚠️ [signInAdmin] Failed to update last_login_at:', err);
      // Non-blocking - don't fail login if this fails
    }

    console.log('✅ [signInAdmin] Login complete, returning data');
    return {
      data: {
        auth: authData,
        admin: verifyData.admin
      },
      error: null
    };
  } catch (error) {
    console.error('❌ [signInAdmin] Unexpected error:', error);
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
  console.log('🔐 [getAdminSession] Starting session check...');

  // NOUVELLE APPROCHE: Lire directement depuis localStorage au lieu d'utiliser getSession()
  // qui semble bloquer après une navigation
  const storageKey = 'sb-nswlznqoadjffpxkagoz-auth-token';

  let session = null;
  let error = null;

  try {
    console.log('📦 [getAdminSession] Reading session directly from localStorage...');
    const storedSession = localStorage.getItem(storageKey);

    if (storedSession) {
      const parsedData = JSON.parse(storedSession);
      console.log('✅ [getAdminSession] Found session in localStorage');

      // Vérifier que la session n'est pas expirée
      const expiresAt = parsedData.expires_at;
      const now = Math.floor(Date.now() / 1000);

      if (expiresAt && expiresAt > now) {
        session = {
          access_token: parsedData.access_token,
          refresh_token: parsedData.refresh_token,
          expires_at: parsedData.expires_at,
          expires_in: parsedData.expires_in,
          token_type: parsedData.token_type,
          user: parsedData.user
        };
        console.log('✅ [getAdminSession] Session valid, expires at:', new Date(expiresAt * 1000).toLocaleString());
      } else {
        console.log('❌ [getAdminSession] Session expired');
        error = new Error('Session expirée');
      }
    } else {
      console.log('❌ [getAdminSession] No session in localStorage');
      error = new Error('No session found');
    }
  } catch (parseError) {
    console.error('❌ [getAdminSession] Error reading localStorage:', parseError);
    error = parseError as Error;
  }

  if (error || !session) {
    console.log('❌ [getAdminSession] No session found:', error?.message);
    return { session: null, admin: null, error };
  }

  console.log('✅ [getAdminSession] Session found for:', session.user?.email);

  try {
    // Verify admin status via API (uses service role key)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout (increased from 5)

    console.log('📡 [getAdminSession] Calling /api/admin/verify...');
    const startTime = Date.now();

    const verifyResponse = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: session.user.email }),
      signal: controller.signal,
    });

    const responseTime = Date.now() - startTime;
    console.log(`⏱️ [getAdminSession] Verify response received in ${responseTime}ms, status:`, verifyResponse.status);
    clearTimeout(timeoutId);

    if (!verifyResponse.ok) {
      const errorData = await verifyResponse.json().catch(() => ({ error: 'Unknown error' }));
      console.error('❌ [getAdminSession] Verify failed:', errorData.error);
      return { session, admin: null, error: new Error(errorData.error || 'Admin verification failed') };
    }

    const verifyData = await verifyResponse.json();
    console.log('✅ [getAdminSession] Admin verified:', verifyData.admin?.email, 'Role:', verifyData.admin?.role);
    console.log('📦 [getAdminSession] Full verifyData:', JSON.stringify(verifyData, null, 2));
    console.log('📦 [getAdminSession] Returning admin object:', JSON.stringify(verifyData.admin, null, 2));
    return { session, admin: verifyData.admin, error: null };
  } catch (fetchError: any) {
    // En cas de timeout ou erreur réseau, retourner une erreur claire
    if (fetchError.name === 'AbortError') {
      console.error('⏱️ [getAdminSession] Timeout after 8 seconds');
      return { session, admin: null, error: new Error('Timeout: impossible de vérifier le statut admin') };
    }
    console.error('❌ [getAdminSession] Unexpected error:', fetchError);
    return { session, admin: null, error: fetchError };
  }
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

/**
 * Déduire le stock après une commande validée
 * Gère les produits avec variants ET sans variants
 */
export async function deductStockAfterOrder(orderItems: {
  productId: string;
  variantId?: string;
  quantity: number;
}[]) {
  const supabase = createClient();
  const results = [];

  for (const item of orderItems) {
    try {
      if (item.variantId) {
        // Produit avec variant: mettre à jour product_variants.stock
        const { data: variant, error: fetchError } = await supabase
          .from('product_variants')
          .select('stock')
          .eq('id', item.variantId)
          .single();

        if (fetchError) {
          console.error(`❌ Erreur récupération variant ${item.variantId}:`, fetchError);
          results.push({ productId: item.productId, variantId: item.variantId, success: false, error: fetchError });
          continue;
        }

        const newStock = Math.max(0, (variant.stock || 0) - item.quantity);

        const { error: updateError } = await supabase
          .from('product_variants')
          .update({ stock: newStock })
          .eq('id', item.variantId);

        if (updateError) {
          console.error(`❌ Erreur mise à jour stock variant ${item.variantId}:`, updateError);
          results.push({ productId: item.productId, variantId: item.variantId, success: false, error: updateError });
        } else {
          results.push({ productId: item.productId, variantId: item.variantId, success: true, oldStock: variant.stock, newStock });
        }
      } else {
        // Produit sans variant: mettre à jour products.stock_quantity
        const { data: product, error: fetchError } = await supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', item.productId)
          .single();

        if (fetchError) {
          console.error(`❌ Erreur récupération produit ${item.productId}:`, fetchError);
          results.push({ productId: item.productId, success: false, error: fetchError });
          continue;
        }

        const newStock = Math.max(0, (product.stock_quantity || 0) - item.quantity);

        const { error: updateError } = await supabase
          .from('products')
          .update({ stock_quantity: newStock })
          .eq('id', item.productId);

        if (updateError) {
          console.error(`❌ Erreur mise à jour stock produit ${item.productId}:`, updateError);
          results.push({ productId: item.productId, success: false, error: updateError });
        } else {
          results.push({ productId: item.productId, success: true, oldStock: product.stock_quantity, newStock });
        }
      }
    } catch (error) {
      console.error(`❌ Erreur inattendue pour l'article:`, item, error);
      results.push({ productId: item.productId, variantId: item.variantId, success: false, error });
    }
  }

  const allSuccess = results.every(r => r.success);
  return { success: allSuccess, results };
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

  try {
    // Total products
    const { count: totalProducts, error: totalError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'discontinued');

    if (totalError) throw totalError;

    // Active products
    const { count: activeProducts, error: activeError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    if (activeError) throw activeError;

    // Out of stock products
    const { count: outOfStock, error: stockError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .or('status.eq.out-of-stock,stock_quantity.lte.0');

    if (stockError) throw stockError;

    // Total collections
    const { count: totalCollections, error: collectionsError } = await supabase
      .from('collections')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    if (collectionsError) throw collectionsError;

    // Active banners
    const { count: activeBanners, error: bannersError } = await supabase
      .from('promo_banners')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    if (bannersError) throw bannersError;

    return {
      totalProducts: totalProducts || 0,
      activeProducts: activeProducts || 0,
      outOfStock: outOfStock || 0,
      totalCollections: totalCollections || 0,
      activeBanners: activeBanners || 0,
    };
  } catch (error) {
    console.error('Erreur getDashboardStats:', error);
    // Retourner des valeurs par défaut en cas d'erreur
    return {
      totalProducts: 0,
      activeProducts: 0,
      outOfStock: 0,
      totalCollections: 0,
      activeBanners: 0,
    };
  }
}
