import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      );
    }

    // Récupérer la commande
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single();

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
