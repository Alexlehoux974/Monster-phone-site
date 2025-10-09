import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured in environment variables');
  }

  // Utiliser la version par défaut du package Stripe
  return new Stripe(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 Initializing Stripe with API key:', process.env.STRIPE_SECRET_KEY ? 'SET ✓' : 'MISSING ✗');
    const stripe = getStripe();
    const body = await request.json();
    const { items, customerInfo, userId } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Panier vide' },
        { status: 400 }
      );
    }

    console.log('💳 Création session checkout pour userId:', userId || 'guest');

    // Générer un ID unique pour cette session de panier
    const cartSessionId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Stocker les items dans Supabase (contournement de la limite Stripe de 500 caractères)
    // Temporairement désactivé pour debugging
    // const supabase = await createClient();
    // const { error: cartError } = await supabase
    //   .from('pending_carts')
    //   .insert({
    //     session_id: cartSessionId,
    //     items: items,
    //     user_id: userId || null,
    //     created_at: new Date().toISOString(),
    //   });

    // if (cartError) {
    //   console.error('❌ Erreur stockage panier:', cartError);
    //   // On continue quand même, les line_items Stripe contiennent l'essentiel
    // } else {
    //   console.log('✅ Panier stocké:', cartSessionId);
    // }

    // Préparer les line items pour Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.description || '',
          images: item.image_url ? [item.image_url] : [],
          metadata: {
            product_id: item.id,
            brand: item.brand_name || '',
            category: item.category_name || '',
          },
        },
        unit_amount: Math.round(item.price * 100), // Convertir en centimes
      },
      quantity: item.quantity,
    }));

    // Créer la session Stripe Checkout
    console.log('📝 Creating Stripe session with', lineItems.length, 'items');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?canceled=true`,
      customer_email: customerInfo?.email || undefined,
      shipping_address_collection: {
        allowed_countries: ['RE', 'FR'], // La Réunion + France métropolitaine
      },
      client_reference_id: cartSessionId, // Référence pour récupérer les items
      metadata: {
        user_id: userId || '',
        customer_name: customerInfo?.name || '',
        customer_phone: customerInfo?.phone || '',
        customer_address: customerInfo?.address || '',
        customer_city: customerInfo?.city || '',
        customer_postal_code: customerInfo?.postalCode || '',
        cart_session_id: cartSessionId, // ID pour retrouver le panier
      },
      allow_promotion_codes: true, // Permettre les codes promo
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      locale: 'fr', // Interface en français
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('❌ Erreur création session Stripe:', error);
    console.error('Type:', error.type);
    console.error('Code:', error.code);
    console.error('Stack:', error.stack);

    return NextResponse.json(
      {
        error: error.message || 'Erreur lors de la création de la session de paiement',
        type: error.type,
        code: error.code,
        raw: error.raw?.message
      },
      { status: 500 }
    );
  }
}
