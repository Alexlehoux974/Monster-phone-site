import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET - Récupérer la wishlist de l'utilisateur
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { data: wishlistItems, error } = await supabase
      .from('wishlist_items')
      .select(`
        id,
        product_id,
        variant_id,
        added_at,
        products (
          id,
          name,
          url_slug,
          price,
          original_price,
          discount,
          status
        ),
        product_variants (
          id,
          color,
          color_code,
          stock
        )
      `)
      .eq('user_id', user.id)
      .order('added_at', { ascending: false });

    if (error) {
      console.error('Error fetching wishlist:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération de la wishlist' },
        { status: 500 }
      );
    }

    // Récupérer les images des produits
    const productIds = wishlistItems?.map(item => item.product_id) || [];

    let productImages: Record<string, string> = {};
    if (productIds.length > 0) {
      const { data: images } = await supabase
        .from('product_variants')
        .select('product_id, images')
        .in('product_id', productIds)
        .eq('is_default', true);

      if (images) {
        images.forEach((img: any) => {
          if (img.images && img.images.length > 0) {
            productImages[img.product_id] = img.images[0];
          }
        });
      }
    }

    // Enrichir les items avec les images
    const enrichedItems = wishlistItems?.map(item => ({
      ...item,
      image: productImages[item.product_id] || null
    })) || [];

    return NextResponse.json({ wishlist: enrichedItems });
  } catch (error) {
    console.error('Error in GET /api/user/wishlist:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Ajouter un produit à la wishlist
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { product_id, variant_id } = body;

    if (!product_id) {
      return NextResponse.json(
        { error: 'ID du produit manquant' },
        { status: 400 }
      );
    }

    // Vérifier si le produit existe
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id')
      .eq('id', product_id)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }

    // Ajouter à la wishlist (upsert pour éviter les doublons)
    const { data: item, error } = await supabase
      .from('wishlist_items')
      .upsert({
        user_id: user.id,
        product_id,
        variant_id: variant_id || null,
      }, {
        onConflict: 'user_id,product_id,variant_id'
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding to wishlist:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'ajout à la wishlist' },
        { status: 500 }
      );
    }

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/user/wishlist:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// DELETE - Retirer un produit de la wishlist
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const product_id = searchParams.get('product_id');
    const variant_id = searchParams.get('variant_id');

    if (!product_id) {
      return NextResponse.json(
        { error: 'ID du produit manquant' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', product_id);

    // Si variant_id est spécifié, filtrer aussi par variant
    if (variant_id) {
      query = query.eq('variant_id', variant_id);
    }

    const { error } = await query;

    if (error) {
      console.error('Error removing from wishlist:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de la wishlist' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/user/wishlist:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
