import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { deductStockAfterOrder } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

/**
 * API Route pour créer une commande et déduire le stock
 *
 * Body attendu:
 * {
 *   customerInfo: {
 *     name: string,
 *     email: string,
 *     phone?: string,
 *     address?: string
 *   },
 *   items: Array<{
 *     productId: string,
 *     variantId?: string,
 *     quantity: number,
 *     price: number,
 *     productName: string,
 *     variantColor?: string
 *   }>,
 *   totalAmount: number
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerInfo, items, totalAmount } = body;

    // Validation des données
    if (!customerInfo || !customerInfo.name || !customerInfo.email) {
      return NextResponse.json(
        { success: false, error: 'Informations client incomplètes' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Panier vide' },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Montant total invalide' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 1. Créer la commande dans la table orders
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone || null,
        customer_address: customerInfo.address || null,
        total_amount: totalAmount,
        status: 'pending', // pending, processing, shipped, delivered, cancelled
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('❌ Erreur création commande:', orderError);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la création de la commande' },
        { status: 500 }
      );
    }

    console.log('✅ Commande créée:', order.id);

    // 2. Créer les items de commande dans order_items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      variant_id: item.variantId || null,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity, // Prix total de la ligne
      product_name: item.productName,
      product_variant: item.variantColor || null, // Colonne existante
      variant_color: item.variantColor || null, // Nouvelle colonne
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('❌ Erreur création order_items:', itemsError);
      // Rollback: supprimer la commande
      await supabase.from('orders').delete().eq('id', order.id);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la création des articles de commande' },
        { status: 500 }
      );
    }

    console.log('✅ Order items créés:', orderItems.length);

    // 3. Déduire le stock
    const stockUpdateData = items.map((item: any) => ({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    const stockResult = await deductStockAfterOrder(stockUpdateData);

    if (!stockResult.success) {
      console.warn('⚠️ Certaines mises à jour de stock ont échoué:', stockResult.results);
      // On ne fait pas de rollback car la commande est quand même valide
      // L'admin devra corriger manuellement le stock si nécessaire
    } else {
      console.log('✅ Stock mis à jour avec succès pour tous les articles');
    }

    // 4. Retourner la commande créée
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.id.substring(0, 8).toUpperCase(),
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        totalAmount: order.total_amount,
        status: order.status,
        createdAt: order.created_at,
      },
      stockUpdateResult: stockResult,
    });

  } catch (error) {
    console.error('❌ Erreur inattendue:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur inattendue' },
      { status: 500 }
    );
  }
}
