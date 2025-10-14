import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';
import LowStockNotification from '@/lib/email/templates/low-stock';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Function to create Resend client on-demand
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification (Vercel Cron secret)
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();

    // Récupérer tous les produits avec leurs variants
    const { data: products, error } = await supabase
      .from('products_full')
      .select('id, name, slug, stock_quantity, variants, image_url');

    if (error) {
      console.error('❌ Erreur récupération produits:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!products || products.length === 0) {
      return NextResponse.json({ message: 'No products found' }, { status: 200 });
    }

    // Filtrer les produits avec stock faible
    interface LowStockProduct {
      id: string;
      name: string;
      slug: string;
      variant?: string;
      stock: number;
      imageUrl: string;
    }

    const lowStockProducts: LowStockProduct[] = [];
    const STOCK_THRESHOLD = 5;

    for (const product of products) {
      // Vérifier les produits avec variants
      if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
          if ((variant.stock || 0) < STOCK_THRESHOLD && (variant.stock || 0) > 0) {
            lowStockProducts.push({
              id: product.id,
              name: product.name,
              slug: product.slug,
              variant: variant.color,
              stock: variant.stock || 0,
              imageUrl: product.image_url || '',
            });
          }
        }
      } else {
        // Produits sans variants
        const stock = product.stock_quantity || 0;
        if (stock < STOCK_THRESHOLD && stock > 0) {
          lowStockProducts.push({
            id: product.id,
            name: product.name,
            slug: product.slug,
            stock: stock,
            imageUrl: product.image_url || '',
          });
        }
      }
    }

    // Si pas de produits en stock faible, ne pas envoyer d'email
    if (lowStockProducts.length === 0) {
      return NextResponse.json({
        message: 'No low stock products',
        checked: products.length,
      });
    }

    // Envoyer l'email de notification aux adresses admin
    const adminEmails = process.env.ADMIN_EMAIL
      ? process.env.ADMIN_EMAIL.split(',').map(email => email.trim())
      : ['Swann.icell4@gmail.com', 'commande@monster-phone.re'];

    const resend = getResend();
    await resend.emails.send({
      from: 'Monster Phone <notifications@monster-phone.re>',
      to: adminEmails,
      subject: `⚠️ Alerte stock faible - ${lowStockProducts.length} produit${lowStockProducts.length > 1 ? 's' : ''}`,
      react: LowStockNotification({ products: lowStockProducts }),
    });

    return NextResponse.json({
      message: 'Low stock notification sent',
      lowStockCount: lowStockProducts.length,
      products: lowStockProducts,
    });
  } catch (error: any) {
    console.error('❌ Erreur check-low-stock:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
