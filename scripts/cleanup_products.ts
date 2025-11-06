#!/usr/bin/env tsx
/**
 * NETTOYAGE DE LA BASE DE DONNÉES
 * Supprime tous les produits SAUF Nokia 110 4G 2025
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ID du Nokia 110 4G 2025 à conserver
const NOKIA_ID = '42821a9c-9402-4047-9279-c33b0ce40b17';

async function cleanupDatabase() {
  console.log('=' + '='.repeat(79));
  console.log('🧹 NETTOYAGE DE LA BASE DE DONNÉES');
  console.log('=' + '='.repeat(79));

  try {
    // 1. Lister tous les produits
    console.log('\n📋 1. Récupération des produits existants...');
    const { data: allProducts, error: listError } = await supabase
      .from('products')
      .select('id, name, sku');

    if (listError) {
      throw new Error(`Erreur listage: ${listError.message}`);
    }

    console.log(`✅ ${allProducts?.length || 0} produits trouvés`);

    // 2. Filtrer pour garder uniquement Nokia
    const productsToDelete = allProducts?.filter(p => p.id !== NOKIA_ID) || [];

    console.log(`\n📊 Produits à supprimer: ${productsToDelete.length}`);
    console.log(`✅ Produits à conserver: 1 (Nokia 110 4G 2025)`);

    if (productsToDelete.length === 0) {
      console.log('\n✅ Aucun produit à supprimer!');
      return;
    }

    // 3. Supprimer les variants d'abord (contrainte FK)
    console.log('\n🗑️  2. Suppression des variants...');
    const productIds = productsToDelete.map(p => p.id);

    const { error: variantsError } = await supabase
      .from('product_variants')
      .delete()
      .in('product_id', productIds);

    if (variantsError) {
      throw new Error(`Erreur suppression variants: ${variantsError.message}`);
    }

    console.log('✅ Variants supprimés');

    // 4. Supprimer les produits
    console.log('\n🗑️  3. Suppression des produits...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .in('id', productIds);

    if (deleteError) {
      throw new Error(`Erreur suppression produits: ${deleteError.message}`);
    }

    console.log(`✅ ${productsToDelete.length} produits supprimés`);

    // 5. Vérification finale
    console.log('\n✅ 4. Vérification finale...');
    const { data: remainingProducts, error: verifyError } = await supabase
      .from('products')
      .select('id, name, sku');

    if (verifyError) {
      throw new Error(`Erreur vérification: ${verifyError.message}`);
    }

    console.log(`\n✅ Produits restants: ${remainingProducts?.length || 0}`);
    if (remainingProducts && remainingProducts.length > 0) {
      remainingProducts.forEach(p => {
        console.log(`  - ${p.name} (${p.sku})`);
      });
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ NETTOYAGE TERMINÉ!');
    console.log('='.repeat(80));

  } catch (error) {
    console.error('\n❌ ERREUR:', error);
    throw error;
  }
}

cleanupDatabase().catch(console.error);
