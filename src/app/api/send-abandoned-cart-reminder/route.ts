import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import resend from '@/lib/email/resend';
import { AbandonedCartEmail } from '@/lib/email/templates/abandoned-cart';
import { verifyAdminAuth, verifyCronSecret, unauthorizedResponse } from '@/lib/auth/admin-guard';
import * as React from 'react';

export async function POST(request: NextRequest) {
  // SECURITY: Verify admin authentication OR cron secret
  const isCronJob = verifyCronSecret(request);
  if (!isCronJob) {
    const authResult = await verifyAdminAuth(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult);
    }
  }

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

    // Vérifier que le panier n'a pas atteint la limite de 3 relances
    if (cart.reminder_count >= 3) {
      return NextResponse.json(
        { error: 'Limite de 3 relances atteinte pour ce panier' },
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

    // Incrémenter le compteur et mettre à jour le timestamp approprié
    const newCount = cart.reminder_count + 1;
    const updateData: any = {
      reminder_count: newCount,
      reminder_sent: true,
      reminder_sent_at: new Date().toISOString(),
    };

    if (newCount === 1) {
      updateData.first_reminder_sent_at = new Date().toISOString();
    } else if (newCount === 2) {
      updateData.second_reminder_sent_at = new Date().toISOString();
    } else if (newCount === 3) {
      updateData.third_reminder_sent_at = new Date().toISOString();
    }

    await supabase
      .from('abandoned_carts')
      .update(updateData)
      .eq('id', cartId);

    return NextResponse.json({
      success: true,
      message: `Email de relance #${newCount} envoyé avec succès`,
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
  // SECURITY: Verify cron secret for automated tasks
  if (!verifyCronSecret(request)) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid cron secret' },
      { status: 401 }
    );
  }

  try {
    const supabase = createClient();
    const now = new Date();

    // 1ère relance : 3h ±30min après création (fenêtre 2h30-3h30)
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    const threeHoursThirtyAgo = new Date(now.getTime() - 3.5 * 60 * 60 * 1000);

    const { data: firstReminders } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('reminder_count', 0)
      .eq('converted', false)
      .lte('created_at', threeHoursAgo.toISOString())
      .gte('created_at', threeHoursThirtyAgo.toISOString())
      .gt('expires_at', now.toISOString());

    // 2ème relance : 24h ±2h après création (fenêtre 22h-26h)
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twentySixHoursAgo = new Date(now.getTime() - 26 * 60 * 60 * 1000);

    const { data: secondReminders } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('reminder_count', 1)
      .eq('converted', false)
      .lte('created_at', twentyFourHoursAgo.toISOString())
      .gte('created_at', twentySixHoursAgo.toISOString())
      .gt('expires_at', now.toISOString());

    // 3ème relance : 48h ±2h après création (fenêtre 46h-50h)
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const fiftyHoursAgo = new Date(now.getTime() - 50 * 60 * 60 * 1000);

    const { data: thirdReminders } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('reminder_count', 2)
      .eq('converted', false)
      .lte('created_at', fortyEightHoursAgo.toISOString())
      .gte('created_at', fiftyHoursAgo.toISOString())
      .gt('expires_at', now.toISOString());

    const allCarts = [
      ...(firstReminders || []),
      ...(secondReminders || []),
      ...(thirdReminders || []),
    ];

    if (allCarts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Aucun panier à relancer',
        count: 0,
      });
    }

    // Envoyer les emails de relance
    const results = await Promise.allSettled(
      allCarts.map(async (cart) => {
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

        // Incrémenter le compteur et mettre à jour le timestamp approprié
        const newCount = cart.reminder_count + 1;
        const updateData: any = {
          reminder_count: newCount,
          reminder_sent: true,
          reminder_sent_at: new Date().toISOString(),
        };

        if (newCount === 1) {
          updateData.first_reminder_sent_at = new Date().toISOString();
        } else if (newCount === 2) {
          updateData.second_reminder_sent_at = new Date().toISOString();
        } else if (newCount === 3) {
          updateData.third_reminder_sent_at = new Date().toISOString();
        }

        await supabase
          .from('abandoned_carts')
          .update(updateData)
          .eq('id', cart.id);

        return { email: cart.customer_email, reminderNumber: newCount, success: true };
      })
    );

    const successCount = results.filter((r) => r.status === 'fulfilled').length;
    const failureCount = results.filter((r) => r.status === 'rejected').length;

    return NextResponse.json({
      success: true,
      message: `Relances envoyées avec succès`,
      total: allCarts.length,
      sent: successCount,
      failed: failureCount,
      breakdown: {
        first: firstReminders?.length || 0,
        second: secondReminders?.length || 0,
        third: thirdReminders?.length || 0,
      },
    });
  } catch (error: any) {
    console.error('Erreur envoi relances automatiques:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'envoi des relances' },
      { status: 500 }
    );
  }
}
