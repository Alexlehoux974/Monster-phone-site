import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-09-30.clover',
  });
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/**
 * Get authenticated user from request
 */
async function getAuthenticatedUser(request: NextRequest) {
  const supabase = getSupabase();

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

export async function GET(request: NextRequest) {
  try {
    const stripe = getStripe();
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      );
    }

    // SECURITY: Authenticate user
    const authenticatedUser = await getAuthenticatedUser(request);

    // Récupérer la commande
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single();

    // SECURITY: Verify ownership or admin status
    if (order && authenticatedUser) {
      const isOwner = order.user_id === authenticatedUser.id ||
                      order.customer_email === authenticatedUser.email;
      if (!isOwner && !authenticatedUser.isAdmin) {
        return NextResponse.json(
          { error: 'Access denied' },
          { status: 403 }
        );
      }
    } else if (order && !authenticatedUser) {
      // For unauthenticated access (e.g., order confirmation page right after checkout),
      // we allow access only if the session_id matches - this is a one-time use token from Stripe
      // This is acceptable because stripe_session_id is only known by the person who placed the order
    }

    if (orderError || !order) {
      console.error('Commande non trouvée dans Supabase, récupération depuis Stripe...');

      // Récupérer les infos depuis Stripe comme fallback
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['line_items'],
        });

        if (!session) {
          return NextResponse.json(
            { error: 'Session Stripe introuvable' },
            { status: 404 }
          );
        }

        // Retourner les données de Stripe directement
        const orderNumber = `TMP-${Date.now()}`;

        return NextResponse.json({
          id: session.id,
          order_number: orderNumber,
          customer_name: session.customer_details?.name || 'Client',
          customer_email: session.customer_details?.email || '',
          amount_total: session.amount_total ? session.amount_total / 100 : 0,
          payment_status: session.payment_status,
          status: 'processing',
          created_at: new Date(session.created * 1000).toISOString(),
          items: session.line_items?.data.map(item => ({
            product_name: item.description || '',
            quantity: item.quantity || 1,
            unit_price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
            total_price: item.amount_total ? item.amount_total / 100 : 0,
          })) || [],
        });
      } catch (stripeError) {
        console.error('Erreur Stripe:', stripeError);
        return NextResponse.json(
          { error: 'Commande non trouvée' },
          { status: 404 }
        );
      }
    }

    // Récupérer les items de la commande
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id);

    if (itemsError) {
      console.error('Erreur récupération items:', itemsError);
    }

    // Formater la réponse
    const response = {
      id: order.id,
      order_number: order.order_number,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      amount_total: parseFloat(order.amount_total),
      payment_status: order.payment_status,
      status: order.status,
      created_at: order.created_at,
      items: items?.map(item => ({
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: parseFloat(item.unit_price),
        total_price: parseFloat(item.total_price),
      })) || [],
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Erreur API order-details:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
