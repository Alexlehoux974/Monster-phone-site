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
// Helper Functions - REST API Auth
// ========================================

/**
 * Get authenticated fetch headers for Supabase REST API
 * This bypasses the blocking getSession() and setSession() issues
 */
export function getAuthHeaders(): { headers: HeadersInit; url: string } | null {
  try {
    const storageKey = 'sb-nswlznqoadjffpxkagoz-auth-token';
    const storedSession = localStorage.getItem(storageKey);

    if (!storedSession) {
      console.error('❌ [getAuthHeaders] No session found in localStorage');
      return null;
    }

    const parsedData = JSON.parse(storedSession);
    const accessToken = parsedData.access_token;

    if (!accessToken) {
      console.error('❌ [getAuthHeaders] No access token in session');
      return null;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const headers = {
      'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Prefer': 'count=exact'
    };

    return { headers, url: supabaseUrl };
  } catch (error) {
    console.error('❌ [getAuthHeaders] Error getting auth headers:', error);
    return null;
  }
}

// ========================================
// Admin Authentication
// ========================================

export async function signInAdmin(email: string, password: string) {
  try {
    console.log('🔐 [signInAdmin] Starting login for:', email);

    // Use the /api/admin/login endpoint which handles everything server-side with REST API
    console.log('📡 [signInAdmin] Calling /api/admin/login...');
    const loginResponse = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      signal: AbortSignal.timeout(15000), // 15 second timeout
    });

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      console.error('❌ [signInAdmin] Login API failed:', errorData.error);
      return {
        data: null,
        error: new Error(errorData.error || 'Erreur lors de la connexion')
      };
    }

    const loginData = await loginResponse.json();
    console.log('✅ [signInAdmin] Login API successful');

    // Store session in localStorage (Supabase client format)
    console.log('💾 [signInAdmin] Storing session in localStorage...');
    const storageKey = 'sb-nswlznqoadjffpxkagoz-auth-token';
    const sessionData = {
      access_token: loginData.session.access_token,
      refresh_token: loginData.session.refresh_token,
      expires_at: loginData.session.expires_at,
      expires_in: loginData.session.expires_in,
      token_type: loginData.session.token_type,
      user: loginData.session.user
    };

    localStorage.setItem(storageKey, JSON.stringify(sessionData));
    console.log('✅ [signInAdmin] Session stored in localStorage');

    // Wait a bit to ensure localStorage persistence
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('✅ [signInAdmin] Login complete');
    return {
      data: {
        session: loginData.session,
        user: loginData.user,
        admin: loginData.admin
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
  try {
    console.log('🚪 [signOutAdmin] Signing out...');

    // Call logout API to clear the HTTP cookie
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('✅ [signOutAdmin] Logout API called, cookie cleared');
    } catch (apiError) {
      console.warn('⚠️ [signOutAdmin] Logout API failed:', apiError);
      // Continue with localStorage cleanup even if API fails
    }

    // Also clear localStorage
    const storageKey = 'sb-nswlznqoadjffpxkagoz-auth-token';
    localStorage.removeItem(storageKey);
    console.log('✅ [signOutAdmin] Session removed from localStorage');
    return { error: null };
  } catch (error) {
    console.error('❌ [signOutAdmin] Error:', error);
    return { error: error as Error };
  }
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
      console.log('🔍 [getAdminSession] Session data:', {
        has_access_token: !!parsedData.access_token,
        has_refresh_token: !!parsedData.refresh_token,
        expires_at: parsedData.expires_at,
        expires_in: parsedData.expires_in,
        user_email: parsedData.user?.email
      });

      // Vérifier que la session n'est pas expirée
      const expiresAt = parsedData.expires_at;
      const now = Math.floor(Date.now() / 1000);

      if (!expiresAt) {
        console.warn('⚠️ [getAdminSession] No expires_at found in session, allowing session with warning');
        // Fallback: si pas d'expires_at, on accepte la session et on laisse Supabase gérer
        session = {
          access_token: parsedData.access_token,
          refresh_token: parsedData.refresh_token,
          expires_at: parsedData.expires_at,
          expires_in: parsedData.expires_in,
          token_type: parsedData.token_type,
          user: parsedData.user
        };
      } else if (expiresAt > now) {
        session = {
          access_token: parsedData.access_token,
          refresh_token: parsedData.refresh_token,
          expires_at: parsedData.expires_at,
          expires_in: parsedData.expires_in,
          token_type: parsedData.token_type,
          user: parsedData.user
        };
        const expiresDate = new Date(expiresAt * 1000);
        const timeLeft = Math.floor((expiresAt - now) / 60);
        console.log('✅ [getAdminSession] Session valid, expires at:', expiresDate.toLocaleString(), `(${timeLeft} minutes left)`);

        // Proactive refresh if less than 5 minutes remaining
        if (timeLeft < 5 && parsedData.refresh_token) {
          console.log('⏰ [getAdminSession] Token expiring soon, refreshing proactively...');
          try {
            const refreshResponse = await fetch('/api/admin/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh_token: parsedData.refresh_token }),
              signal: AbortSignal.timeout(10000),
            });

            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();
              localStorage.setItem(storageKey, JSON.stringify(refreshData.session));
              session = refreshData.session;
              console.log('✅ [getAdminSession] Proactive refresh successful');
            }
          } catch {
            // Non-blocking: if proactive refresh fails, continue with current valid token
            console.warn('⚠️ [getAdminSession] Proactive refresh failed, using current token');
          }
        }
      } else {
        // Token expired - try to refresh it
        const expiresDate = new Date(expiresAt * 1000);
        console.log('⏰ [getAdminSession] Session expired at:', expiresDate.toLocaleString(), '- attempting refresh...');

        if (parsedData.refresh_token) {
          try {
            const refreshResponse = await fetch('/api/admin/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh_token: parsedData.refresh_token }),
              signal: AbortSignal.timeout(10000),
            });

            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();
              // Update localStorage with new session
              localStorage.setItem(storageKey, JSON.stringify(refreshData.session));
              session = refreshData.session;
              console.log('✅ [getAdminSession] Token refreshed successfully, new expiry:', new Date((refreshData.session.expires_at) * 1000).toLocaleString());
            } else {
              console.error('❌ [getAdminSession] Token refresh failed:', refreshResponse.status);
              error = new Error('Session expirée');
            }
          } catch (refreshError) {
            console.error('❌ [getAdminSession] Token refresh error:', refreshError);
            error = new Error('Session expirée');
          }
        } else {
          error = new Error('Session expirée');
        }
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
        'Authorization': `Bearer ${session.access_token}`,
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
  console.log('🔧 [getDashboardStats] Starting stats fetch...');

  try {
    // Utiliser l'API REST directement au lieu de passer par Supabase client
    // car getSession() et setSession() bloquent indéfiniment
    console.log('🔐 [getDashboardStats] Reading session from localStorage...');
    const storageKey = 'sb-nswlznqoadjffpxkagoz-auth-token';
    const storedSession = localStorage.getItem(storageKey);

    if (!storedSession) {
      console.error('❌ [getDashboardStats] No session found in localStorage');
      throw new Error('Session non trouvée');
    }

    const parsedData = JSON.parse(storedSession);
    const accessToken = parsedData.access_token;
    console.log('✅ [getDashboardStats] Access token extracted');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const headers = {
      'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Prefer': 'count=exact'
    };

    console.log('📊 [getDashboardStats] Fetching stats with direct API calls...');

    // IMPORTANT: Compter les VARIANTS individuellement pour synchroniser avec la page Gestion du Stock
    // Récupérer tous les produits avec leurs variants
    console.log('📊 [getDashboardStats] Fetching products with variants...');
    const productsResponse = await fetch(
      `${supabaseUrl}/rest/v1/products?select=id,status,stock_quantity,product_variants(id,stock)&order=name.asc`,
      { headers, signal: AbortSignal.timeout(10000) }
    );

    if (!productsResponse.ok) {
      throw new Error('Failed to fetch products');
    }

    const productsData = await productsResponse.json();
    console.log('✅ [getDashboardStats] Products fetched:', productsData.length);

    // Compter les variants comme dans la page stock
    let totalVariants = 0;
    let inStockVariants = 0;
    let outOfStockVariants = 0;

    productsData.forEach((product: any) => {
      if (product.product_variants && product.product_variants.length > 0) {
        // Produit avec variants - compter chaque variant
        product.product_variants.forEach((variant: any) => {
          totalVariants++;
          if (variant.stock > 0) {
            inStockVariants++;
          } else {
            outOfStockVariants++;
          }
        });
      } else {
        // Produit sans variant - compter comme 1 item
        totalVariants++;
        if (product.stock_quantity > 0) {
          inStockVariants++;
        } else {
          outOfStockVariants++;
        }
      }
    });

    console.log('✅ [getDashboardStats] Variants counted - Total:', totalVariants, 'In stock:', inStockVariants, 'Out of stock:', outOfStockVariants);

    // Total collections
    console.log('📊 [getDashboardStats] Fetching total collections...');
    const collectionsResponse = await fetch(
      `${supabaseUrl}/rest/v1/collections?is_active=eq.true&select=*`,
      { headers: { ...headers, 'Prefer': 'count=exact' }, method: 'HEAD', signal: AbortSignal.timeout(10000) }
    );
    const totalCollections = parseInt(collectionsResponse.headers.get('content-range')?.split('/')[1] || '0');
    console.log('✅ [getDashboardStats] Total collections:', totalCollections);

    // Active banners
    console.log('📊 [getDashboardStats] Fetching active banners...');
    const bannersResponse = await fetch(
      `${supabaseUrl}/rest/v1/promo_banners?is_active=eq.true&select=*`,
      { headers: { ...headers, 'Prefer': 'count=exact' }, method: 'HEAD', signal: AbortSignal.timeout(10000) }
    );
    const activeBanners = parseInt(bannersResponse.headers.get('content-range')?.split('/')[1] || '0');
    console.log('✅ [getDashboardStats] Active banners:', activeBanners);

    const stats = {
      totalProducts: totalVariants || 0,
      activeProducts: inStockVariants || 0,
      outOfStock: outOfStockVariants || 0,
      totalCollections: totalCollections || 0,
      activeBanners: activeBanners || 0,
    };

    console.log('🎉 [getDashboardStats] All stats fetched successfully!', stats);
    return stats;
  } catch (error) {
    console.error('❌ [getDashboardStats] Error fetching stats:', error);
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
