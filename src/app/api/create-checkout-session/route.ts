import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerInfo } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Panier vide' },
        { status: 400 }
      );
    }

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
      metadata: {
        customer_name: customerInfo?.name || '',
        customer_phone: customerInfo?.phone || '',
        customer_address: customerInfo?.address || '',
        customer_city: customerInfo?.city || '',
        customer_postal_code: customerInfo?.postalCode || '',
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
    console.error('Erreur création session Stripe:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
}
