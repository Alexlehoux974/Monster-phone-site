import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import resend from '@/lib/email/resend';
import { OrderConfirmationEmail } from '@/lib/email/templates/order-confirmation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId requis' },
        { status: 400 }
      );
    }

    // Récupérer les détails de la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Session Stripe introuvable' },
        { status: 404 }
      );
    }

    const orderNumber = `TEST-${Date.now()}`;
    const customerEmail = session.customer_details?.email || '';
    const customerName = session.customer_details?.name || 'Client';

    // TODO: Réactiver l'envoi d'email plus tard
    // Envoyer l'email de confirmation
    // const emailResponse = await resend.emails.send({
    //   from: 'Monster Phone Boutique <no-reply@digiqo.fr>',
    //   to: customerEmail,
    //   subject: `✅ Test - Commande confirmée #${orderNumber} - Monster Phone 🎉`,
    //   react: OrderConfirmationEmail({
    //     orderNumber,
    //     customerName,
    //     customerEmail,
    //     items: session.line_items?.data.map(item => ({
    //       product_name: item.description || '',
    //       quantity: item.quantity || 1,
    //       unit_price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
    //       total_price: item.amount_total ? item.amount_total / 100 : 0,
    //     })) || [],
    //     subtotal: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
    //     total: session.amount_total ? session.amount_total / 100 : 0,
    //     orderDate: new Date(session.created * 1000).toISOString(),
    //   }),
    // });

    console.log('📧 Email de test désactivé temporairement');

    return NextResponse.json({
      success: true,
      message: 'Email de confirmation désactivé temporairement',
      to: customerEmail,
    });
  } catch (error: any) {
    console.error('❌ Erreur envoi email test:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}
