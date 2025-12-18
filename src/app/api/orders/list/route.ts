import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// Créer client Supabase avec SERVICE_ROLE_KEY pour bypasser RLS
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Get authenticated user from request
 */
async function getAuthenticatedUser(request: NextRequest) {
  const supabase = getSupabaseAdmin();

  // Try Authorization header first
  const authHeader = request.headers.get('authorization');
  let token = authHeader?.replace('Bearer ', '');

  // Try cookies if no header
  if (!token) {
    const cookieStore = await cookies();
    const supabaseCookie = cookieStore.get('sb-nswlznqoadjffpxkagoz-auth-token');
    if (supabaseCookie) {
      try {
        const sessionData = JSON.parse(supabaseCookie.value);
        token = sessionData?.access_token;
      } catch {
        // Cookie parsing failed
      }
    }
  }

  if (!token) {
    return null;
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return null;
  }

  // Check if user is admin
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('email', user.email)
    .eq('is_active', true)
    .single();

  return {
    id: user.id,
    email: user.email,
    isAdmin: !!adminUser,
  };
}

/**
 * API Route pour récupérer les commandes d'un utilisateur
 * SECURITY: User can only access their own orders unless admin
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const requestedUserId = searchParams.get('userId');
    const requestedEmail = searchParams.get('email');

    // SECURITY: Authenticate the user
    const authenticatedUser = await getAuthenticatedUser(request);

    if (!authenticatedUser) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Construire la requête en fonction des paramètres
    // Inclure les order_items via une relation
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_name,
          quantity,
          unit_price,
          total_price,
          product_metadata
        )
      `)
      .order('created_at', { ascending: false });

    // SECURITY: Non-admin users can only see their own orders
    if (!authenticatedUser.isAdmin) {
      // User can only access orders matching their own userId or email
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      // Build filter for user's own orders only
      query = query.or(`user_id.eq.${authenticatedUser.id},customer_email.eq.${authenticatedUser.email}`);
    } else {
      // Admin can filter by any userId or email
      if (requestedUserId && requestedEmail) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (uuidRegex.test(requestedUserId)) {
          query = query.or(`user_id.eq.${requestedUserId},customer_email.eq.${requestedEmail}`);
        } else {
          query = query.eq('customer_email', requestedEmail);
        }
      } else if (requestedUserId) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (uuidRegex.test(requestedUserId)) {
          query = query.eq('user_id', requestedUserId);
        }
      } else if (requestedEmail) {
        query = query.eq('customer_email', requestedEmail);
      }
      // Admin without filters gets all orders
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders', details: error.message },
        { status: 500 }
      );
    }

    // Calculer amount_total si manquant (somme des items + shipping_cost)
    const ordersWithTotal = (orders || []).map(order => {
      if (!order.amount_total || order.amount_total === 0) {
        // Calculer la somme des items
        const itemsTotal = (order.order_items || []).reduce((sum: number, item: any) => {
          return sum + (item.total_price || 0);
        }, 0);

        // Ajouter les frais de livraison
        const shippingCost = order.shipping_cost || 0;

        // Mettre à jour amount_total
        order.amount_total = itemsTotal + shippingCost;
      }
      return order;
    });

    return NextResponse.json({ orders: ordersWithTotal, success: true });
  } catch (error) {
    console.error('Error in list orders:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
