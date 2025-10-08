import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import resend from '@/lib/email/resend';
import { AbandonedCartEmail } from '@/lib/email/templates/abandoned-cart';
import * as React from 'react';

export async function POST(request: NextRequest) {
  try {
    const { cartId } = await request.json();

    if (!cartId) {
      return NextResponse.json(
        { error: 'cartId est requis' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Récupérer le panier abandonné
    const { data: cart, error: cartError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('id', cartId)
      .single();

    if (cartError || !cart) {
      return NextResponse.json(
        { error: 'Panier introuvable' },
        { status: 404 }
      );
    }

    // Vérifier que le panier n'a pas déjà été relancé
    if (cart.reminder_sent) {
      return NextResponse.json(
        { error: 'Email de relance déjà envoyé pour ce panier' },
        { status: 400 }
      );
    }

    // Vérifier que le panier n'a pas été converti
    if (cart.converted) {
      return NextResponse.json(
        { error: 'Ce panier a déjà été converti en commande' },
        { status: 400 }
      );
    }

    // Vérifier que le panier n'a pas expiré
    if (new Date(cart.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Ce panier a expiré' },
        { status: 400 }
      );
    }

    // Envoyer l'email de relance
    await resend.emails.send({
      from: 'Monster Phone Boutique <contact@monster-phone.re>',
      to: cart.customer_email,
      subject: `🛒 ${cart.customer_name}, votre panier vous attend ! Ne ratez pas ces produits gaming`,
      react: AbandonedCartEmail({
        customerName: cart.customer_name || 'Cher client',
        customerEmail: cart.customer_email,
        items: cart.items,
        subtotal: parseFloat(cart.subtotal),
        total: parseFloat(cart.total),
        checkoutUrl: cart.checkout_url,
        expiresAt: cart.expires_at,
      }) as React.ReactElement,
    });

    // Marquer comme relancé
    await supabase
      .from('abandoned_carts')
      .update({
        reminder_sent: true,
        reminder_sent_at: new Date().toISOString(),
      })
      .eq('id', cartId);

    console.log('✅ Email de relance panier envoyé à:', cart.customer_email);

    return NextResponse.json({
      success: true,
      message: 'Email de relance envoyé avec succès',
    });
  } catch (error: any) {
    console.error('Erreur envoi relance panier:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'envoi de la relance' },
      { status: 500 }
    );
  }
}

// Route pour envoyer les relances automatiquement (CRON)
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Récupérer les paniers abandonnés non relancés
    // qui ont été créés il y a 1-24h et qui n'ont pas expiré
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const { data: carts, error } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('reminder_sent', false)
      .eq('converted', false)
      .gte('created_at', oneDayAgo.toISOString())
      .lte('created_at', oneHourAgo.toISOString())
      .gt('expires_at', new Date().toISOString());

    if (error) {
      throw error;
    }

    if (!carts || carts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Aucun panier à relancer',
        count: 0,
      });
    }

    // Envoyer les emails de relance
    const results = await Promise.allSettled(
      carts.map(async (cart) => {
        await resend.emails.send({
          from: 'Monster Phone Boutique <contact@monster-phone.re>',
          to: cart.customer_email,
          subject: `🛒 ${cart.customer_name}, votre panier vous attend ! Ne ratez pas ces produits gaming`,
          react: AbandonedCartEmail({
            customerName: cart.customer_name || 'Cher client',
            customerEmail: cart.customer_email,
            items: cart.items,
            subtotal: parseFloat(cart.subtotal),
            total: parseFloat(cart.total),
            checkoutUrl: cart.checkout_url,
            expiresAt: cart.expires_at,
          }) as React.ReactElement,
        });

        // Marquer comme relancé
        await supabase
          .from('abandoned_carts')
          .update({
            reminder_sent: true,
            reminder_sent_at: new Date().toISOString(),
          })
          .eq('id', cart.id);

        return { email: cart.customer_email, success: true };
      })
    );

    const successCount = results.filter((r) => r.status === 'fulfilled').length;
    const failureCount = results.filter((r) => r.status === 'rejected').length;

    console.log(`📧 Relances envoyées: ${successCount} succès, ${failureCount} échecs`);

    return NextResponse.json({
      success: true,
      message: `Relances envoyées avec succès`,
      total: carts.length,
      sent: successCount,
      failed: failureCount,
    });
  } catch (error: any) {
    console.error('Erreur envoi relances automatiques:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'envoi des relances' },
      { status: 500 }
    );
  }
}
