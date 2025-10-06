import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

/**
 * API Route pour créer une commande après paiement Stripe
 *
 * Body attendu:
 * {
 *   sessionId: string // Stripe checkout session ID
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Récupérer la session Stripe avec les line items
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product', 'customer', 'payment_intent'],
    });

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Récupérer les métadonnées de la session
    const metadata = session.metadata || {};
    const userId = metadata.userId;
    const customerEmail = session.customer_details?.email || metadata.email || '';
    const customerName = session.customer_details?.name || metadata.name || '';
    const customerPhone = session.customer_details?.phone || metadata.phone || '';

    // Récupérer l'adresse de livraison depuis les métadonnées
    const shippingAddress = metadata.address || '';
    const shippingCity = metadata.city || '';
    const shippingPostalCode = metadata.postalCode || '';

    // Initialiser Supabase client
    const supabase = await createClient();

    // Récupérer les items directement depuis Stripe
    const lineItems = session.line_items?.data || [];

    const items = lineItems.map((item: any) => {
      const product = item.price?.product;
      const productName = typeof product === 'string' ? item.description : product?.name || item.description || 'Produit';

      return {
        id: item.price?.product?.id || item.id,
        name: productName,
        price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
        quantity: item.quantity || 1,
        image_url: typeof product === 'object' ? product?.images?.[0] : null,
        brand_name: typeof product === 'object' ? product?.metadata?.brand : null,
        category_name: typeof product === 'object' ? product?.metadata?.category : null,
      };
    });


    // Calculer les montants
    const subtotal = session.amount_subtotal ? session.amount_subtotal / 100 : 0;
    const shippingCost = session.total_details?.amount_shipping ? session.total_details.amount_shipping / 100 : 0;
    const total = session.amount_total ? session.amount_total / 100 : 0;

    // Générer un numéro de commande unique
    const orderNumber = `CMD${Date.now().toString().slice(-8)}`;

    // Créer la commande dans Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId || null,
        order_number: orderNumber,
        stripe_session_id: sessionId,
        stripe_payment_intent_id: typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id,
        customer_email: customerEmail,
        customer_name: customerName,
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
        status: 'processing',
        payment_status: 'paid',
        shipping_method: metadata.shippingMethod || 'standard',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);

      // Si l'erreur est due à une commande déjà existante (duplicate), on la retourne
      if (error.code === '23505') { // Postgres unique violation
        const { data: existingOrder } = await supabase
          .from('orders')
          .select('*')
          .eq('stripe_session_id', sessionId)
          .single();

        if (existingOrder) {
          // Récupérer les order_items pour la commande existante
          const { data: existingOrderItems } = await supabase
            .from('order_items')
            .select('product_name, quantity, unit_price, total_price, product_metadata')
            .eq('order_id', existingOrder.id);

          const orderWithItems = {
            ...existingOrder,
            items: existingOrderItems || []
          };

          return NextResponse.json({ order: orderWithItems, alreadyExists: true });
        }
      }

      return NextResponse.json(
        { error: 'Failed to create order', details: error.message },
        { status: 500 }
      );
    }

    // Créer les order_items dans la table dédiée
    if (items && items.length > 0) {
      const orderItems = items.map((item: any) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name || 'Produit',
        quantity: item.quantity || 1,
        unit_price: item.price || 0,
        total_price: (item.price || 0) * (item.quantity || 1),
        product_metadata: {
          product_id: item.id,
          brand: item.brand_name || null,
          category: item.category_name || null,
          image_url: item.image_url || null,
        },
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order_items:', itemsError);
      } else {
        // Mettre à jour le stock pour chaque produit commandé
        for (const item of items) {
          // Trouver le produit par nom (normaliser les espaces et la casse)
          const productName = item.name?.trim();

          if (productName) {
            // Chercher le produit par nom exact
            const { data: product, error: productError } = await supabase
              .from('products')
              .select('id, stock_quantity')
              .ilike('name', productName)
              .single();

            if (!productError && product) {
              const newStock = Math.max(0, product.stock_quantity - (item.quantity || 1));

              const { error: stockError } = await supabase
                .from('products')
                .update({
                  stock_quantity: newStock,
                  updated_at: new Date().toISOString()
                })
                .eq('id', product.id);

              if (stockError) {
                console.error('Error updating stock for product:', product.id, stockError);
              } else {
                console.log(`✅ Stock updated: ${productName} - ${product.stock_quantity} → ${newStock}`);
              }
            } else {
              console.warn(`⚠️ Product not found in database: ${productName}`);
            }
          }
        }
      }
    }

    // Récupérer les order_items depuis la table pour les retourner avec le bon format
    const { data: orderItemsData, error: fetchItemsError } = await supabase
      .from('order_items')
      .select('product_name, quantity, unit_price, total_price, product_metadata')
      .eq('order_id', order.id);

    if (fetchItemsError) {
      console.error('Error fetching order_items:', fetchItemsError);
    }

    // Retourner la commande avec les items au bon format
    const orderWithItems = {
      ...order,
      items: orderItemsData || []
    };

    return NextResponse.json({ order: orderWithItems, success: true });
  } catch (error) {
    console.error('Error in create order:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
