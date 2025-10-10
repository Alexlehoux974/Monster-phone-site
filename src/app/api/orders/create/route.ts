import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { sendOrderConfirmation } from '@/lib/email/send-order-confirmation';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  return new Stripe(apiKey, {
    apiVersion: '2025-09-30.clover',
    httpClient: Stripe.createFetchHttpClient(),
    timeout: 30000,
    maxNetworkRetries: 3,
  });
}

/**
 * API Route pour récupérer ou créer une commande
 * Priorité : webhook Stripe > création manuelle en fallback
 */
export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      );
    }

    console.log('🔍 Checking order for session:', sessionId);

    const supabase = await createClient();

    // Vérifier si la commande existe déjà (créée par webhook)
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single();

    if (existingOrder) {
      console.log('✅ Order found (created by webhook):', existingOrder.id);
      return NextResponse.json({
        order: existingOrder,
        alreadyExists: true,
      });
    }

    console.log('⚠️ Order not found, creating as fallback...');

    // FALLBACK : Créer la commande manuellement si le webhook n'a pas fonctionné
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Paiement non complété' },
        { status: 400 }
      );
    }

    // Récupérer les métadonnées
    const metadata = session.metadata || {};
    // user_id peut être null si non authentifié (UUID requis par Supabase)
    const userId = null; // On ne stocke pas le user_id temporaire
    const customerEmail = session.customer_details?.email || metadata.email || '';
    const customerName = session.customer_details?.name || metadata.name || '';
    const customerPhone = session.customer_details?.phone || metadata.phone || '';
    const shippingAddress = metadata.address || '';
    const shippingCity = metadata.city || '';
    const shippingPostalCode = metadata.postalCode || '';

    // Récupérer les product_id depuis les métadonnées de session (comme le webhook)
    let productIds: string[] = [];
    try {
      if (metadata.product_ids) {
        productIds = JSON.parse(metadata.product_ids);
        console.log('✅ Product IDs from session metadata:', productIds);
      }
    } catch (e) {
      console.warn('⚠️ Failed to parse product_ids from session metadata');
    }

    // Récupérer les line items
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      expand: ['data.price.product'],
    });

    const items = lineItems.data.map((item, index) => ({
      product_name: (item.description || 'Produit'),
      quantity: item.quantity || 1,
      unit_price: (item.price?.unit_amount || 0) / 100,
      total_price: (item.amount_total || 0) / 100,
      product_id: productIds[index] || '', // UUID Supabase depuis metadata, pas l'ID Stripe
    }));

    // Créer la commande
    const orderNumber = `ORDER-${Date.now()}`;
    const total = (session.amount_total || 0) / 100;

    console.log('💾 Creating order (fallback):', {
      orderNumber,
      sessionId,
      customerEmail,
      total,
      itemsCount: items.length,
    });

    // Calculer les montants
    const subtotal = (session.amount_subtotal || session.amount_total || 0) / 100;
    const shippingCost = 0; // Pas de frais de port dans la session

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
        stripe_session_id: sessionId,
        stripe_payment_intent_id: typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating order:', error);

      // Vérifier si c'est une erreur de duplication
      if (error.code === '23505') {
        const { data: retryOrder } = await supabase
          .from('orders')
          .select('*')
          .eq('stripe_session_id', sessionId)
          .single();

        if (retryOrder) {
          console.log('✅ Order found after race condition:', retryOrder.id);
          return NextResponse.json({
            order: retryOrder,
            alreadyExists: true,
          });
        }
      }

      throw error;
    }

    console.log('✅ Order created successfully (fallback):', order.id);

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

    // Nettoyer le panier temporaire
    const cartSessionId = metadata.cart_session_id;
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

    return NextResponse.json({
      order,
      alreadyExists: false,
    });
  } catch (error: any) {
    console.error('❌ Error in orders/create:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
