import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface CSVRow {
  reference: string;
  modele: string;
  quantite: number;
  ean: string;
  prix: number;
  pvc: number;
}

async function parseCsvFile(filePath: string): Promise<CSVRow[]> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

  const rows: CSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.includes('TOTAL')) continue;

    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));

    const modele = values[1];
    const quantite = parseInt(values[2]) || 0;
    const ean = values[3];
    const prix = parseFloat(values[4]) || 0;
    const pvc = parseFloat(values[7]) || 0;

    if (modele && ean) {
      rows.push({
        reference: values[0],
        modele,
        quantite,
        ean,
        prix,
        pvc
      });
    }
  }

  return rows;
}

async function syncStockToSupabase(csvPath: string) {
  console.log('🔄 Synchronisation CSV → Supabase...\n');

  const csvRows = await parseCsvFile(csvPath);
  console.log(`📊 ${csvRows.length} lignes CSV à traiter\n`);

  let updated = 0;
  let notFound = 0;
  let errors = 0;

  for (const row of csvRows) {
    try {
      // D'abord, chercher une variante par EAN
      const { data: variant, error: variantError } = await supabase
        .from('product_variants')
        .select('id, product_id, color')
        .eq('ean', row.ean)
        .single();

      if (variant) {
        // Mettre à jour le stock de la variante
        const { error: updateError } = await supabase
          .from('product_variants')
          .update({
            stock: row.quantite,
            updated_at: new Date().toISOString()
          })
          .eq('id', variant.id);

        if (updateError) {
          console.error(`❌ Erreur MAJ variante ${row.modele}:`, updateError.message);
          errors++;
        } else {
          console.log(`✅ ${row.modele}: ${row.quantite} unités (variante ${variant.color})`);
          updated++;
        }
        continue;
      }

      // Si pas de variante trouvée, chercher le produit par nom
      const firstWord = row.modele.split(' ')[0];
      const { data: products, error: searchError } = await supabase
        .from('products')
        .select('id, name, has_variants')
        .ilike('name', `%${firstWord}%`)
        .limit(5);

      if (searchError) {
        console.error(`❌ Erreur recherche ${row.modele}:`, searchError.message);
        errors++;
        continue;
      }

      if (!products || products.length === 0) {
        console.log(`⚠️  Produit non trouvé: ${row.modele}`);
        notFound++;
        continue;
      }

      // Chercher le meilleur match par nom
      const product = products.find(p =>
        p.name.toLowerCase().includes(row.modele.toLowerCase().split(' ')[1] || '')
      ) || products[0];

      // Mettre à jour le stock du produit (même s'il a des variantes, on met à jour le stock global)
      const { error: updateError } = await supabase
        .from('products')
        .update({
          stock_quantity: row.quantite,
          price: row.prix,
          updated_at: new Date().toISOString()
        })
        .eq('id', product.id);

      if (updateError) {
        console.error(`❌ Erreur MAJ ${row.modele}:`, updateError.message);
        errors++;
      } else {
        console.log(`✅ ${row.modele}: ${row.quantite} unités (produit direct)`);
        updated++;
      }
    } catch (err) {
      console.error(`❌ Erreur traitement ${row.modele}:`, err);
      errors++;
    }
  }

  console.log('\n📊 RÉSUMÉ:');
  console.log(`   ✅ Mis à jour: ${updated}`);
  console.log(`   ⚠️  Non trouvés: ${notFound}`);
  console.log(`   ❌ Erreurs: ${errors}`);
}

// Exécution
const csvPath = path.resolve('/root/Monster-Phone-Images/STOCK_BOUTIQUE_ICELL4_AOUT_2025.csv');

if (!fs.existsSync(csvPath)) {
  console.error('❌ Fichier CSV introuvable:', csvPath);
  process.exit(1);
}

syncStockToSupabase(csvPath)
  .then(() => console.log('\n✅ Synchronisation terminée!'))
  .catch(err => {
    console.error('❌ Erreur fatale:', err);
    process.exit(1);
  });
