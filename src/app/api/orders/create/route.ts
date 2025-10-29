import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
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

    const supabase = getSupabaseAdmin();

    // Vérifier si la commande existe déjà (créée par webhook)
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single();

    if (existingOrder) {
      return NextResponse.json({
        order: existingOrder,
        alreadyExists: true,
      });
    }

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
    let variantColors: string[] = [];
    try {
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
      variant: variantColors[index] || '', // ✅ Variant (peut être couleur, capacité, taille, etc.)
    }));

    // Créer la commande
    const orderNumber = `ORDER-${Date.now()}`;
    const total = (session.amount_total || 0) / 100;

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
          return NextResponse.json({
            order: retryOrder,
            alreadyExists: true,
          });
        }
      }

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
