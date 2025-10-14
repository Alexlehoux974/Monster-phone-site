import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import resend from '@/lib/email/resend';
import { ShippingNotificationEmail } from '@/lib/email/templates/shipping-notification';
import * as React from 'react';

export async function POST(request: NextRequest) {
  try {
    const { orderId, trackingNumber, trackingUrl, carrier, estimatedDelivery } = await request.json();

    if (!orderId || !trackingNumber || !trackingUrl || !carrier) {
      return NextResponse.json(
        { error: 'Données manquantes: orderId, trackingNumber, trackingUrl, carrier sont requis' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Récupérer les détails de la commande
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Commande introuvable' },
        { status: 404 }
      );
    }

    // Mettre à jour la commande avec les infos de suivi
    await supabase
      .from('orders')
      .update({
        tracking_number: trackingNumber,
        tracking_url: trackingUrl,
        carrier: carrier,
        status: 'shipped',
      })
      .eq('id', orderId);

    // Envoyer l'email de notification d'expédition
    await resend.emails.send({
      from: 'Monster Phone Boutique <contact@monster-phone.re>',
      to: order.customer_email,
      subject: `📦 Votre commande #${order.order_number} est en route !`,
      react: ShippingNotificationEmail({
        orderNumber: order.order_number,
        customerName: order.customer_name,
        trackingNumber,
        trackingUrl,
        carrier,
        estimatedDelivery: estimatedDelivery || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        shippingAddress: {
          street: order.shipping_address?.line1 || '',
          city: order.shipping_address?.city || '',
          postalCode: order.shipping_address?.postal_code || '',
          country: order.shipping_address?.country || 'France',
        },
      }) as React.ReactElement,
    });

    return NextResponse.json({
      success: true,
      message: 'Notification d\'expédition envoyée avec succès',
    });
  } catch (error: any) {
    console.error('Erreur envoi notification expédition:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'envoi de la notification' },
      { status: 500 }
    );
  }
}
