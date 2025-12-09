import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET - Récupérer les adresses de l'utilisateur
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

    const { data: addresses, error } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching addresses:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des adresses' },
        { status: 500 }
      );
    }

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error('Error in GET /api/user/addresses:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Ajouter une nouvelle adresse
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
    const { label, full_name, phone, street, street_complement, postal_code, city, country, is_default, is_billing } = body;

    // Validation
    if (!full_name || !street || !postal_code || !city) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    const { data: address, error } = await supabase
      .from('user_addresses')
      .insert({
        user_id: user.id,
        label: label || 'Domicile',
        full_name,
        phone,
        street,
        street_complement,
        postal_code,
        city,
        country: country || 'France',
        is_default: is_default || false,
        is_billing: is_billing || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating address:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la création de l\'adresse' },
        { status: 500 }
      );
    }

    return NextResponse.json({ address }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/user/addresses:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une adresse
export async function PUT(request: NextRequest) {
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID de l\'adresse manquant' },
        { status: 400 }
      );
    }

    const { data: address, error } = await supabase
      .from('user_addresses')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating address:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de l\'adresse' },
        { status: 500 }
      );
    }

    return NextResponse.json({ address });
  } catch (error) {
    console.error('Error in PUT /api/user/addresses:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une adresse
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
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID de l\'adresse manquant' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('user_addresses')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting address:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de l\'adresse' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/user/addresses:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
