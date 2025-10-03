import { supabase } from '../lib/supabase/client';

/**
 * Script de rollback pour annuler la migration partielle
 *
 * Ce script va:
 * 1. Réactiver les produits désactivés (Noir, Gris, Bleu)
 * 2. Restaurer les noms/slugs originaux des produits principaux
 * 3. Supprimer les variantes créées (si présentes)
 */

interface RollbackData {
  mainProductId: string;
  originalName: string;
  originalSlug: string;
  originalSku: string;
  deactivatedProductId: string;
}

const rollbackData: RollbackData[] = [
  {
    mainProductId: '1d49edaa-3eee-49e9-85f9-4e9b49eca4f8',
    originalName: 'Monster N-Lite 206 - Casque Premium Sans Fil - Blanc',
    originalSlug: 'casque-monster-n-lite-206-blanc',
    originalSku: '137240-03',
    deactivatedProductId: '7c0bdfb0-bc48-428b-b6f5-fdc237d937ab'
  },
  {
    mainProductId: '9ddfd620-95ff-4087-8003-9b44bfcfb456',
    originalName: 'Monster N-Lite 203 - Casque Sans Fil - Gold',
    originalSlug: 'casque-monster-n-lite-203-gold',
    originalSku: '137193-02',
    deactivatedProductId: 'dea13277-b33a-49be-9d79-cb3594ceb40b'
  },
  {
    mainProductId: '9041de43-cb5d-4c43-b8e7-3b6e5f23972d',
    originalName: 'NOKIA G22 - Bleu',
    originalSlug: 'nokia-g22-bleu',
    originalSku: 'NOKIA-G22-BLEU',
    deactivatedProductId: '94be5b2f-1f9e-4038-879e-018a9970024e'
  },
  {
    mainProductId: '42821a9c-9402-4047-9279-c33b0ce40b17',
    originalName: 'Nokia 110 2023 Noir',
    originalSlug: 'nokia-110-2023-noir',
    originalSku: 'HP03317',
    deactivatedProductId: '8a0a7271-405d-4acb-8064-45ef4281fe70'
  },
  {
    mainProductId: 'b1ad13bb-75b7-4770-b7b9-a6be33aa4eda',
    originalName: 'MONSTER TH300 TACTILE BLANC',
    originalSlug: 'casque-monster-th300-tactile-blanc',
    originalSku: '137250-03',
    deactivatedProductId: '8bee7c3f-c3c4-43da-a246-54c15ccc3431'
  }
];

async function rollbackMigration(dryRun: boolean = true) {
  console.log(`\n${'='.repeat(80)}`);
  console.log('🔄 ROLLBACK DE LA MIGRATION');
  console.log('='.repeat(80));
  console.log(`Mode: ${dryRun ? '🔍 DRY RUN (simulation)' : '⚡ EXÉCUTION RÉELLE'}\n`);

  for (const data of rollbackData) {
    console.log(`\n${'─'.repeat(80)}`);
    console.log(`📦 Rollback pour: ${data.originalName}`);
    console.log('─'.repeat(80));

    if (!dryRun) {
      // 1. Supprimer les variantes créées (si présentes)
      const { error: deleteVariantsError } = await supabase
        .from('product_variants')
        .delete()
        .eq('product_id', data.mainProductId);

      if (deleteVariantsError) {
        console.log(`   ⚠️  Erreur suppression variantes: ${deleteVariantsError.message}`);
      } else {
        console.log(`   ✅ Variantes supprimées`);
      }

      // 2. Restaurer le produit principal
      const { error: restoreMainError } = await supabase
        .from('products')
        .update({
          name: data.originalName,
          url_slug: data.originalSlug,
          sku: data.originalSku
        })
        .eq('id', data.mainProductId);

      if (restoreMainError) {
        console.log(`   ❌ Erreur restauration produit principal: ${restoreMainError.message}`);
      } else {
        console.log(`   ✅ Produit principal restauré`);
      }

      // 3. Réactiver le produit désactivé
      const { error: reactivateError } = await supabase
        .from('products')
        .update({ status: 'active' })
        .eq('id', data.deactivatedProductId);

      if (reactivateError) {
        console.log(`   ❌ Erreur réactivation produit: ${reactivateError.message}`);
      } else {
        console.log(`   ✅ Produit réactivé`);
      }
    } else {
      console.log(`   📋 ACTIONS À EFFECTUER:`);
      console.log(`   1. Supprimer les variantes du produit ${data.mainProductId}`);
      console.log(`   2. Restaurer le nom/slug/SKU original:`);
      console.log(`      → Nom: "${data.originalName}"`);
      console.log(`      → Slug: "${data.originalSlug}"`);
      console.log(`      → SKU: "${data.originalSku}"`);
      console.log(`   3. Réactiver le produit ${data.deactivatedProductId}`);
    }

    console.log(`\n   ${dryRun ? '✓ Simulation' : '✅ Rollback'} terminé`);
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log(dryRun
    ? '✓ SIMULATION TERMINÉE - Aucune modification effectuée'
    : '✅ ROLLBACK TERMINÉ - État original restauré');
  console.log(`${'='.repeat(80)}\n`);
}

// Exécution
const args = process.argv.slice(2);
const dryRun = !args.includes('--execute');

if (!dryRun) {
  console.log('\n⚠️  ATTENTION: Mode exécution réelle activé!');
  console.log('Les données vont être modifiées dans Supabase.\n');
}

rollbackMigration(dryRun).then(() => {
  console.log(dryRun
    ? '\n💡 Pour exécuter le rollback réel, ajoutez --execute'
    : '\n✅ Rollback terminé');
  process.exit(0);
}).catch(err => {
  console.error('\n❌ Erreur fatale:', err);
  process.exit(1);
});
