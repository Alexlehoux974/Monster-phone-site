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

  // Traiter uniquement les paiements réussis
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Vérifier si la commande existe déjà
      const supabase = await createClient();
      const { data: existingOrder } = await supabase
        .from('orders')
        .select('id')
        .eq('stripe_session_id', session.id)
        .single();

      if (existingOrder) {
        return NextResponse.json({ received: true, orderId: existingOrder.id });
      }

      // Récupérer les métadonnées de la session
      const metadata = session.metadata || {};
      // Récupérer le user_id depuis les metadata Stripe (peut être null si non authentifié)
      const userId = metadata.user_id && metadata.user_id !== '' ? metadata.user_id : null;
      const customerEmail = session.customer_details?.email || metadata.email || '';
      const customerName = session.customer_details?.name || metadata.name || '';
      const customerPhone = session.customer_details?.phone || metadata.phone || '';

      // Récupérer l'adresse de livraison depuis les métadonnées
      const shippingAddress = metadata.address || '';
      const shippingCity = metadata.city || '';
      const shippingPostalCode = metadata.postalCode || '';

      // Récupérer les line items Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      // Récupérer les product_id depuis les métadonnées de session
      const cartSessionId = metadata.cart_session_id;
      let productIds: string[] = [];
      let variantColors: string[] = [];

      try {
        // Essayer de récupérer depuis les métadonnées de session
        if (metadata.product_ids) {
          productIds = JSON.parse(metadata.product_ids);
          }
        // ✅ Récupérer les couleurs des variants
        if (metadata.variant_colors) {
          variantColors = JSON.parse(metadata.variant_colors);
          }
      } catch (e) {
        console.warn('⚠️ Failed to parse metadata from session');
      }

      // Mapper les line items avec les product_id et variant strings
      const items = lineItems.data.map((item, index) => ({
        product_name: (item.description || 'Produit'),
        quantity: item.quantity || 1,
        unit_price: (item.price?.unit_amount || 0) / 100,
        total_price: (item.amount_total || 0) / 100,
        product_id: productIds[index] || '', // UUID Supabase du produit depuis métadonnées
        variant: variantColors[index] || '', // ✅ Variant (peut être couleur, capacité, taille, etc.)
      }));

      // Créer la commande dans Supabase
      const orderNumber = `ORDER-${Date.now()}`;
      const subtotal = (session.amount_subtotal || session.amount_total || 0) / 100;
      const shippingCost = 0;
      const total = (session.amount_total || 0) / 100;

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

      // Créer les order_items dans la table dédiée
      if (items && items.length > 0) {
        // ✅ Pour chaque item avec un variant, trouver son UUID dans product_variants
        const orderItems = await Promise.all(items.map(async (item: any) => {
          let variantId: string | null = null;

          // Si l'item a un variant (couleur, capacité, taille, etc.), trouver son UUID
          if (item.variant && item.product_id) {
            try {
              const { data: variant } = await supabase
                .from('product_variants')
                .select('id')
                .eq('product_id', item.product_id)
                .eq('color', item.variant) // Le champ "color" stocke TOUS les types de variants
                .single();

              if (variant) {
                variantId = variant.id;
                } else {
                console.warn(`⚠️ No variant found for product ${item.product_id} with variant "${item.variant}"`);
              }
            } catch (err: any) {
              console.error(`❌ Error finding variant for "${item.variant}":`, err.message);
            }
          }

          return {
            order_id: order.id,
            product_id: item.product_id || null,
            product_name: item.product_name || 'Produit',
            quantity: item.quantity || 1,
            unit_price: item.unit_price || 0,
            total_price: item.total_price || 0,
            product_metadata: {
              product_id: item.product_id || null,
              variant_id: variantId, // ✅ UUID du variant (universel pour tous types)
            },
          };
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) {
          console.error('⚠️ Error creating order_items:', itemsError);
        } else {
          // Décrémenter le stock après création de la commande
          try {
            const { data: stockResult, error: stockError } = await supabase
              .rpc('process_order_stock_decrement', { p_order_id: order.id });

            if (stockError) {
              console.error('⚠️ Error decrementing stock:', stockError);
            } else {
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
