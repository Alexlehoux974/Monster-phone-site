import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { sendOrderConfirmation } from '@/lib/email/send-order-confirmation';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
// Force redeploy: v2.0.0

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured in environment variables');
  }

  return new Stripe(apiKey, {
    apiVersion: '2025-09-30.clover',
    httpClient: Stripe.createFetchHttpClient(),
    timeout: 30000,
    maxNetworkRetries: 3,
  });
}

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('❌ STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('❌ Missing stripe-signature header');
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  console.log('✅ Webhook event received:', event.type);

  // Traiter uniquement les paiements réussis
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log('💳 Processing checkout.session.completed:', session.id);

    try {
      // Vérifier si la commande existe déjà
      const supabase = await createClient();
      const { data: existingOrder } = await supabase
        .from('orders')
        .select('id')
        .eq('stripe_session_id', session.id)
        .single();

      if (existingOrder) {
        console.log('✅ Order already exists:', existingOrder.id);
        return NextResponse.json({ received: true, orderId: existingOrder.id });
      }

      // Récupérer les métadonnées de la session
      const metadata = session.metadata || {};
      // user_id peut être null si non authentifié (UUID requis par Supabase)
      const userId = null; // On ne stocke pas le user_id temporaire
      const customerEmail = session.customer_details?.email || metadata.email || '';
      const customerName = session.customer_details?.name || metadata.name || '';
      const customerPhone = session.customer_details?.phone || metadata.phone || '';

      // Récupérer l'adresse de livraison depuis les métadonnées
      const shippingAddress = metadata.address || '';
      const shippingCity = metadata.city || '';
      const shippingPostalCode = metadata.postalCode || '';

      // Récupérer le panier depuis pending_carts pour avoir les product_id Supabase
      const cartSessionId = metadata.cart_session_id;
      let items: any[] = [];

      if (cartSessionId) {
        // Récupérer les items du panier Supabase (contient les vrais product_id)
        const { data: cartData } = await supabase
          .from('pending_carts')
          .select('items')
          .eq('session_id', cartSessionId)
          .single();

        if (cartData && cartData.items) {
          items = cartData.items.map((item: any) => ({
            product_name: item.name || 'Produit',
            quantity: item.quantity || 1,
            unit_price: typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0),
            total_price: (typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0)) * (item.quantity || 1),
            product_id: item.id || '', // UUID Supabase du produit
          }));
        }
      }

      // Fallback: si pas de panier Supabase, utiliser les line items Stripe (sans product_id)
      if (items.length === 0) {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price.product'],
        });

        items = lineItems.data.map((item) => ({
          product_name: (item.description || 'Produit'),
          quantity: item.quantity || 1,
          unit_price: (item.price?.unit_amount || 0) / 100,
          total_price: (item.amount_total || 0) / 100,
          product_id: '', // Pas de product_id disponible
        }));
      }

      // Créer la commande dans Supabase
      const orderNumber = `ORDER-${Date.now()}`;
      const subtotal = (session.amount_subtotal || session.amount_total || 0) / 100;
      const shippingCost = 0;
      const total = (session.amount_total || 0) / 100;

      console.log('💾 Creating order:', {
        orderNumber,
        sessionId: session.id,
        customerEmail,
        total,
        itemsCount: items.length,
      });

      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: userId,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          shipping_address: shippingAddress,
          shipping_city: shippingCity,
          shipping_postal_code: shippingPostalCode,
          items: items,
          subtotal: subtotal,
          shipping_cost: shippingCost,
          total: total,
          total_amount: total,
          amount_subtotal: subtotal,
          payment_status: 'paid',
          status: 'processing',
          stripe_session_id: session.id,
          stripe_payment_intent_id: typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating order:', error);
        throw error;
      }

      console.log('✅ Order created successfully:', order.id);

      // Créer les order_items dans la table dédiée
      if (items && items.length > 0) {
        const orderItems = items.map((item: any) => ({
          order_id: order.id,
          product_id: item.product_id || null,
          product_name: item.product_name || 'Produit',
          quantity: item.quantity || 1,
          unit_price: item.unit_price || 0,
          total_price: item.total_price || 0,
          product_metadata: {
            product_id: item.product_id || null,
          },
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) {
          console.error('⚠️ Error creating order_items:', itemsError);
        } else {
          console.log('✅ Order items created:', orderItems.length);

          // Décrémenter le stock après création de la commande
          try {
            const { data: stockResult, error: stockError } = await supabase
              .rpc('process_order_stock_decrement', { p_order_id: order.id });

            if (stockError) {
              console.error('⚠️ Error decrementing stock:', stockError);
            } else {
              console.log('📦 Stock updated:', stockResult);
            }
          } catch (stockErr: any) {
            console.error('⚠️ Stock decrement failed:', stockErr.message);
            // Continue anyway - order is created, stock can be adjusted manually if needed
          }
        }
      }

      // Nettoyer le panier temporaire si présent
      if (cartSessionId) {
        await supabase
          .from('pending_carts')
          .delete()
          .eq('session_id', cartSessionId);
        console.log('🗑️ Temporary cart cleaned:', cartSessionId);
      }

      // Envoyer l'email de confirmation
      try {
        await sendOrderConfirmation({
          orderNumber: orderNumber,
          customerName: customerName,
          customerEmail: customerEmail,
          items: items,
          subtotal: subtotal,
          total: total,
          orderDate: new Date().toISOString(),
        });
        console.log('📧 Order confirmation email sent to:', customerEmail);
      } catch (emailErr: any) {
        console.error('⚠️ Email sending failed:', emailErr.message);
        // Continue anyway - order is created, email can be resent manually if needed
      }

      return NextResponse.json({ received: true, orderId: order.id });
    } catch (error: any) {
      console.error('❌ Error processing webhook:', error);
      return NextResponse.json(
        { error: 'Failed to process payment' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
