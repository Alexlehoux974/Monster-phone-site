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
    const stripe = getStripe();
    const body = await request.json();
    const { items, customerInfo, userId } = body;

    // 🔍 DEBUG: Log userId reçu par l'API
    console.log('🔍 [API create-checkout-session]', {
      receivedUserId: userId,
      userIdType: typeof userId,
      hasCustomerInfo: !!customerInfo,
      customerEmail: customerInfo?.email,
      timestamp: new Date().toISOString()
    });

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Panier vide' },
        { status: 400 }
      );
    }

    // ✅ VALIDATION DU STOCK CÔTÉ SERVEUR (Sécurité)
    const supabase = await createClient();

    for (const item of items) {
      // Récupérer le produit depuis Supabase pour vérifier le stock en temps réel
      // Note: Utiliser 'products' au lieu de 'products_full' car products_full n'a pas stock_quantity
      const { data: product, error: productError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          stock_quantity,
          product_variants (
            id,
            color,
            stock,
            ean
          )
        `)
        .eq('id', item.id)
        .single();

      if (productError || !product) {
        return NextResponse.json(
          {
            error: `Produit introuvable: ${item.name}`,
            productId: item.id
          },
          { status: 404 }
        );
      }

      let availableStock = 0;

      // Vérifier le stock selon le type de produit (avec ou sans variant)
      if (item.variant && product.product_variants && product.product_variants.length > 0) {
        // Produit avec variant - trouver le variant correspondant
        const selectedVariant = product.product_variants.find(
          (v: any) => v.color === item.variant
        );

        if (!selectedVariant) {
          return NextResponse.json(
            {
              error: `Variant "${item.variant}" introuvable pour ${product.name}`,
              productId: item.id,
              variant: item.variant,
              availableVariants: product.product_variants.map((v: any) => v.color).join(', ')
            },
            { status: 400 }
          );
        }

        availableStock = selectedVariant.stock || 0;
      } else {
        // Produit sans variant - utiliser stock_quantity
        availableStock = product.stock_quantity || 0;
      }

      // Vérifier si le stock est suffisant
      if (availableStock === 0) {
        return NextResponse.json(
          {
            error: `Produit en rupture de stock: ${product.name}${item.variant ? ` (${item.variant})` : ''}`,
            productId: item.id,
            variant: item.variant || null,
            availableStock: 0
          },
          { status: 400 }
        );
      }

      if (item.quantity > availableStock) {
        return NextResponse.json(
          {
            error: `Stock insuffisant pour ${product.name}${item.variant ? ` (${item.variant})` : ''}`,
            productId: item.id,
            variant: item.variant || null,
            requestedQuantity: item.quantity,
            availableStock: availableStock
          },
          { status: 400 }
        );
      }
    }

    // Générer un ID unique pour cette session de panier
    const cartSessionId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Stocker les items dans Supabase (contournement de la limite Stripe de 500 caractères)
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
      }

    // Fonction pour nettoyer la description pour Stripe
    const cleanDescription = (desc: string | undefined): string | undefined => {
      if (!desc || desc.trim() === '') return undefined;

      // Supprimer les balises HTML
      let cleaned = desc.replace(/<[^>]*>/g, '').trim();

      // Si vide après nettoyage, retourner undefined
      if (cleaned === '') return undefined;

      // Limiter à 500 caractères (limite Stripe)
      if (cleaned.length > 500) {
        cleaned = cleaned.slice(0, 497) + '...';
      }

      return cleaned;
    };


    // Préparer les line items pour Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: any) => {
      const description = cleanDescription(item.description);

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            ...(description && { description }), // N'inclure que si description existe
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

    // 🔍 DEBUG: Log avant création session Stripe
    const metadataToSend = {
      user_id: userId || '',
      email: customerInfo?.email || '',
      name: customerInfo?.name || '',
      phone: customerInfo?.phone || '',
      address: customerInfo?.address || '',
      city: customerInfo?.city || '',
      postalCode: customerInfo?.postalCode || '',
      cart_session_id: cartSessionId,
      product_ids: JSON.stringify(items.map((item: any) => String(item.id))),
      variant_colors: JSON.stringify(items.map((item: any) => item.variant || '')),
    };

    console.log('🔍 [API avant envoi Stripe]', {
      userId: userId,
      userIdInMetadata: metadataToSend.user_id,
      metadataKeys: Object.keys(metadataToSend),
      timestamp: new Date().toISOString()
    });

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
      client_reference_id: cartSessionId, // Référence pour récupérer les items
      metadata: metadataToSend,
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
