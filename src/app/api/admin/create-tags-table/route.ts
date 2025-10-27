import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function POST(request: NextRequest) {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS product_tags (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        tag TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(product_id, tag)
      );

      CREATE INDEX IF NOT EXISTS idx_product_tags_product_id ON product_tags(product_id);
      CREATE INDEX IF NOT EXISTS idx_product_tags_tag ON product_tags(tag);
    `;

    // Utiliser l'API REST de Supabase pour exécuter le SQL DDL
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: createTableQuery })
    });

    // Si la fonction exec_sql n'existe pas, essayer directement avec pg_stat_statements
    if (!response.ok) {
      // Vérifier si la table existe en essayant de la sélectionner
      const { data: existingTags, error: checkError } = await supabase
        .from('product_tags')
        .select('id')
        .limit(1);

      if (checkError && (checkError.code === '42P01' || checkError.code === 'PGRST205')) {
        // Table n'existe pas - renvoyer les instructions SQL
        return NextResponse.json({
          success: false,
          requiresManualSetup: true,
          message: 'La table product_tags doit être créée manuellement',
          sql: createTableQuery,
          instructions: [
            '1. Ouvrir Supabase Dashboard → SQL Editor',
            '2. Créer une nouvelle query',
            '3. Copier-coller le SQL ci-dessus',
            '4. Exécuter (Run)',
            '5. Relancer cette API route'
          ],
          dashboardUrl: supabaseUrl.replace('supabase.co', 'supabase.com')
        });
      }

      if (checkError) {
        throw checkError;
      }
    }

    // Si la table existe, ajouter les tags initiaux pour les produits Nokia
    const nokiaProducts = [
      {
        id: '42821a9c-9402-4047-9279-c33b0ce40b17',
        name: 'Nokia 110 4G 2025',
        tags: ['feature-phone', '4g', 'budget', 'basic', 'durable', 'long-battery']
      },
      {
        id: '9041de43-cb5d-4c43-b8e7-3b6e5f23972d',
        name: 'Nokia G22',
        tags: ['smartphone', 'android', 'mid-range', 'repairable', '5g', 'eco-friendly']
      }
    ];

    const tagsToInsert = nokiaProducts.flatMap(product =>
      product.tags.map(tag => ({
        product_id: product.id,
        tag: tag
      }))
    );

    // Vérifier si les tags existent déjà
    const { data: existingProductTags } = await supabase
      .from('product_tags')
      .select('product_id, tag')
      .in('product_id', nokiaProducts.map(p => p.id));

    const existingTagSet = new Set(
      existingProductTags?.map(t => `${t.product_id}:${t.tag}`) || []
    );

    const newTags = tagsToInsert.filter(
      t => !existingTagSet.has(`${t.product_id}:${t.tag}`)
    );

    if (newTags.length > 0) {
      const { data: insertedTags, error: insertError } = await supabase
        .from('product_tags')
        .insert(newTags)
        .select();

      if (insertError) {
        throw insertError;
      }

      return NextResponse.json({
        success: true,
        message: `${newTags.length} tags ajoutés avec succès`,
        insertedTags
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Tous les tags existent déjà',
      existingCount: existingProductTags?.length || 0
    });

  } catch (error: any) {
    console.error('❌ Erreur création tags:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
}
