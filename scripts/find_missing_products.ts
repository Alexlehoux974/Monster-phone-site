#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import * as csv from 'csv-parse/sync';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  // 1. Lire les EAN du CSV
  const csvContent = readFileSync('/root/Monster-Phone-Images/Captures d\'écran/STOCK BOUTIQUE ICELL4 DIGIQO Novembre 2025.csv', 'utf-8');
  const records: any[] = csv.parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';'
  });

  const csvProducts = new Map<string, string>();
  records.forEach(row => {
    const ean = row['EAN']?.trim();
    if (ean) {
      csvProducts.set(ean, row['MODELE']?.trim() || '');
    }
  });

  // 2. Récupérer les EAN depuis Supabase
  const { data: variants, error } = await supabase
    .from('product_variants')
    .select('ean');

  if (error) {
    console.error('Erreur:', error);
    return;
  }

  const dbEans = new Set(variants?.map(v => v.ean) || []);

  console.log(`📊 EAN dans CSV: ${csvProducts.size}`);
  console.log(`📊 EAN dans Supabase: ${dbEans.size}`);

  // 3. Trouver les manquants
  const missingEans: string[] = [];
  csvProducts.forEach((name, ean) => {
    if (!dbEans.has(ean)) {
      missingEans.push(ean);
    }
  });

  if (missingEans.length > 0) {
    console.log(`\n❌ MANQUANTS dans Supabase: ${missingEans.length} produits`);
    console.log('=' + '='.repeat(79));
    missingEans.sort().forEach(ean => {
      console.log(`${ean} - ${csvProducts.get(ean)}`);
    });
  } else {
    console.log('\n✅ TOUS les produits du CSV sont dans Supabase!');
  }
}

main().catch(console.error);
