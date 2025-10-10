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

  // Configuration explicite pour Vercel
  return new Stripe(apiKey, {
    apiVersion: '2025-09-30.clover',
    httpClient: Stripe.createFetchHttpClient(),
    timeout: 30000,
    maxNetworkRetries: 3,
  });
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
    const supabase = await createClient();
    const { error: cartError } = await supabase
      .from('pending_carts')
      .insert({
        session_id: cartSessionId,
        items: items,
        user_id: userId || null,
        created_at: new Date().toISOString(),
      });

    if (cartError) {
      console.error('❌ Erreur stockage panier:', cartError);
      // On continue quand même, les line_items Stripe contiennent l'essentiel
    } else {
      console.log('✅ Panier stocké:', cartSessionId);
    }

    // Fonction pour nettoyer la description pour Stripe
    const cleanDescription = (desc: string | undefined): string => {
      if (!desc) return '';

      // Supprimer les balises HTML
      let cleaned = desc.replace(/<[^>]*>/g, '');

      // Limiter à 500 caractères (limite Stripe)
      if (cleaned.length > 500) {
        cleaned = cleaned.slice(0, 497) + '...';
      }

      return cleaned;
    };

    // Debug: Vérifier les items reçus
    console.log('🔍 DEBUG API - Items reçus:', items.map((item: any) => ({
      name: item.name,
      id: item.id,
      typeofId: typeof item.id,
      isObject: typeof item.id === 'object',
      stringified: JSON.stringify(item.id)
    })));

    // Préparer les line items pour Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: any) => {
      // Debug: Log chaque item avec variant
      console.log('🔍 DEBUG API - Processing item:', {
        name: item.name,
        id: item.id,
        variant: item.variant,
        typeofId: typeof item.id,
        isObject: typeof item.id === 'object',
        stringified: JSON.stringify(item.id)
      });

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: cleanDescription(item.description),
            images: item.image_url ? [item.image_url] : [],
            metadata: {
              product_id: item.id,
              brand: item.brand_name || '',
              category: item.category_name || '',
              variant_color: item.variant || '', // ✅ Ajout de la couleur du variant
            },
          },
          unit_amount: Math.round(item.price * 100), // Convertir en centimes
        },
        quantity: item.quantity,
      };
    });

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
        email: customerInfo?.email || '',
        name: customerInfo?.name || '',
        phone: customerInfo?.phone || '',
        address: customerInfo?.address || '',
        city: customerInfo?.city || '',
        postalCode: customerInfo?.postalCode || '',
        cart_session_id: cartSessionId, // ID pour retrouver le panier
        // Stocker les product_id dans les métadonnées (JSON stringifié)
        product_ids: JSON.stringify(items.map((item: any) => {
          console.log('🔍 Product ID:', item.id, 'Type:', typeof item.id);
          // Forcer la conversion en string pour éviter [object Object]
          return String(item.id);
        })),
        // ✅ Stocker les couleurs des variants
        variant_colors: JSON.stringify(items.map((item: any) => {
          console.log('🔍 Variant color:', item.variant || 'none');
          return item.variant || '';
        })),
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
