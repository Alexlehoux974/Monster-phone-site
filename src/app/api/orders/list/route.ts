import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Créer client Supabase avec SERVICE_ROLE_KEY pour bypasser RLS
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * API Route pour récupérer les commandes d'un utilisateur
 *
 * Query params:
 * - userId: ID de l'utilisateur (optionnel)
 * - email: Email du client (optionnel, prioritaire si fourni)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');

    const supabase = getSupabaseAdmin();

    // Construire la requête en fonction des paramètres
    // Inclure les order_items via une relation
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_name,
          quantity,
          unit_price,
          total_price,
          product_metadata
        )
      `)
      .order('created_at', { ascending: false });

    // Si userId est fourni et est un UUID valide, filtrer par user_id
    if (userId) {
      // Vérifier si c'est un UUID valide (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      if (uuidRegex.test(userId)) {
        query = query.eq('user_id', userId);
      } else if (email) {
        // Si userId n'est pas un UUID mais qu'on a un email, filtrer par email
        query = query.eq('customer_email', email);
      } else {
        // Si userId n'est pas un UUID et pas d'email, retourner toutes les commandes
        // (temporaire pour le développement - à sécuriser en production)
        }
    } else if (email) {
      // Si pas de userId mais un email, filtrer par email
      query = query.eq('customer_email', email);
    }
    // Sinon, retourner toutes les commandes (temporaire pour le développement)

    const { data: orders, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ orders: orders || [], success: true });
  } catch (error) {
    console.error('Error in list orders:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
