import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/client';
import resend from '@/lib/email/resend';
import { OrderConfirmationEmail } from '@/lib/email/templates/order-confirmation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Gérer les événements Stripe
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // Récupérer les détails de la session avec line items et customer
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ['line_items', 'customer'] }
      );

      // Récupérer l'adresse de livraison depuis le customer si disponible
      let shippingAddress = {};
      if (sessionWithLineItems.customer && typeof sessionWithLineItems.customer !== 'string') {
        const customer = sessionWithLineItems.customer as Stripe.Customer;
        if (customer.shipping?.address) {
          shippingAddress = customer.shipping.address;
        }
      }

      // Enregistrer la commande dans Supabase
      try {
        const supabase = createClient();

        const orderData = {
          user_id: session.metadata?.user_id || null, // Lien avec le compte utilisateur
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          customer_email: session.customer_details?.email || session.metadata?.customer_email || '',
          customer_name: session.customer_details?.name || session.metadata?.customer_name || '',
          customer_phone: session.customer_details?.phone || session.metadata?.customer_phone || '',
          shipping_address: shippingAddress,
          billing_address: session.customer_details?.address || {},
          amount_total: session.amount_total ? session.amount_total / 100 : 0,
          amount_subtotal: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
          currency: session.currency || 'eur',
          payment_status: session.payment_status,
          status: 'pending',
        };

        console.log('📝 Création commande pour user_id:', orderData.user_id || 'guest');

        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([orderData])
          .select()
          .single();

        if (orderError) {
          console.error('Erreur création commande:', orderError);
          return NextResponse.json({ error: 'Erreur création commande' }, { status: 500 });
        }

        // Enregistrer les items de la commande
        if (sessionWithLineItems.line_items?.data) {
          const orderItems = sessionWithLineItems.line_items.data.map(item => ({
            order_id: order.id,
            product_name: item.description,
            quantity: item.quantity || 1,
            unit_price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
            total_price: item.amount_total ? item.amount_total / 100 : 0,
            product_metadata: item.price?.product ? { product_id: item.price.product } : {},
          }));

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

          if (itemsError) {
            console.error('Erreur création order items:', itemsError);
          }
        }

        console.log('✅ Commande créée:', order.id);

        // Récupérer les items de la commande pour l'email
        const { data: orderItems } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);

        // TODO: Réactiver l'envoi d'email plus tard
        // Envoyer l'email de confirmation
        // try {
        //   await resend.emails.send({
        //     from: 'Monster Phone Boutique <no-reply@digiqo.fr>',
        //     to: order.customer_email,
        //     subject: `Commande confirmée #${order.order_number} - Monster Phone 🎉`,
        //     react: OrderConfirmationEmail({
        //       orderNumber: order.order_number,
        //       customerName: order.customer_name,
        //       customerEmail: order.customer_email,
        //       items: orderItems?.map(item => ({
        //         product_name: item.product_name,
        //         quantity: item.quantity,
        //         unit_price: parseFloat(item.unit_price),
        //         total_price: parseFloat(item.total_price),
        //       })) || [],
        //       subtotal: parseFloat(order.amount_subtotal),
        //       total: parseFloat(order.amount_total),
        //       orderDate: order.created_at,
        //     }),
        //   });
        //   console.log('✅ Email de confirmation envoyé à:', order.customer_email);
        // } catch (emailError) {
        //   console.error('❌ Erreur envoi email:', emailError);
        //   // Ne pas bloquer le webhook si l'email échoue
        // }

        console.log('📧 Email de confirmation désactivé temporairement pour:', order.customer_email);
      } catch (dbError) {
        console.error('Erreur base de données:', dbError);
      }
      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('✅ Paiement réussi:', paymentIntent.id);

      // Mettre à jour le statut de la commande si nécessaire
      try {
        const supabase = createClient();
        await supabase
          .from('orders')
          .update({ payment_status: 'paid', status: 'confirmed' })
          .eq('stripe_payment_intent_id', paymentIntent.id);
      } catch (dbError) {
        console.error('Erreur mise à jour paiement:', dbError);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('❌ Paiement échoué:', paymentIntent.id);

      // Mettre à jour le statut de la commande
      try {
        const supabase = createClient();
        await supabase
          .from('orders')
          .update({ payment_status: 'failed', status: 'cancelled' })
          .eq('stripe_payment_intent_id', paymentIntent.id);
      } catch (dbError) {
        console.error('Erreur mise à jour échec paiement:', dbError);
      }
      break;
    }

    default:
      console.log(`Événement non géré: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
