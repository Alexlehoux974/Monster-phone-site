import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import resend from '@/lib/email/resend';
import { InvoiceEmail } from '@/lib/email/templates/invoice';
import * as React from 'react';

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'orderId est requis' },
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

    // Récupérer les items de la commande
    const { data: orderItems } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    // Calculer la TVA (20% en France)
    const subtotalHT = parseFloat(order.amount_subtotal) / 1.2;
    const tax = parseFloat(order.amount_subtotal) - subtotalHT;

    // TODO: Réactiver l'envoi d'email plus tard
    // Envoyer l'email de facture
    // await resend.emails.send({
    //   from: 'Monster Phone Boutique <no-reply@digiqo.fr>',
    //   to: order.customer_email,
    //   subject: `Facture N°${order.order_number} - Monster Phone Boutique`,
    //   react: InvoiceEmail({
    //     invoiceNumber: order.order_number,
    //     orderNumber: order.order_number,
    //     customerName: order.customer_name,
    //     customerEmail: order.customer_email,
    //     billingAddress: {
    //       street: order.billing_address?.line1 || order.shipping_address?.line1 || '',
    //       city: order.billing_address?.city || order.shipping_address?.city || '',
    //       postalCode: order.billing_address?.postal_code || order.shipping_address?.postal_code || '',
    //       country: order.billing_address?.country || order.shipping_address?.country || 'France',
    //     },
    //     shippingAddress: {
    //       street: order.shipping_address?.line1 || '',
    //       city: order.shipping_address?.city || '',
    //       postalCode: order.shipping_address?.postal_code || '',
    //       country: order.shipping_address?.country || 'France',
    //     },
    //     items: orderItems?.map(item => ({
    //       product_name: item.product_name,
    //       quantity: item.quantity,
    //       unit_price: parseFloat(item.unit_price),
    //       total_price: parseFloat(item.total_price),
    //     })) || [],
    //     subtotal: subtotalHT,
    //     shipping: 0, // À adapter selon votre logique de frais de port
    //     tax: tax,
    //     total: parseFloat(order.amount_total),
    //     orderDate: order.created_at,
    //     paymentMethod: 'Carte bancaire',
    //   }) as React.ReactElement,
    // });

    console.log('📧 Email de facture désactivé temporairement');

    return NextResponse.json({
      success: true,
      message: 'Facture générée (envoi email désactivé temporairement)',
    });
  } catch (error: any) {
    console.error('Erreur envoi facture:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'envoi de la facture' },
      { status: 500 }
    );
  }
}
