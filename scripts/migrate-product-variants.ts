import { supabase } from '../lib/supabase/client';

interface MigrationGroup {
  baseName: string;
  baseSlug: string;
  baseSku: string;
  products: Array<{
    id: string;
    name: string;
    slug: string;
    sku: string;
    color: string;
    colorCode?: string;
    stock: number;
    images?: string[];
  }>;
}

/**
 * Script de migration pour regrouper les produits similaires avec des variantes de couleur
 *
 * Groupes à traiter:
 * 1. Monster N-Lite 206 (2 produits: Blanc, Noir)
 * 2. Monster N-Lite 203 (2 produits: Gold, Noir)
 * 3. NOKIA G22 (2 produits: Bleu, Gris)
 * 4. Nokia 110 (2 produits: Noir, Bleu)
 * 5. Monster TH300 (2 produits: Blanc, Noir)
 */

const migrationGroups: MigrationGroup[] = [
  {
    baseName: 'Monster N-Lite 206 - Casque Premium Sans Fil',
    baseSlug: 'casque-monster-n-lite-206',
    baseSku: 'MONSTER-NLITE-206',
    products: [
      {
        id: '', // À remplir après récupération
        name: 'Monster N-Lite 206 - Casque Premium Sans Fil - Blanc',
        slug: 'casque-monster-n-lite-206-blanc',
        sku: '137240-03',
        color: 'Blanc',
        colorCode: '#FFFFFF',
        stock: 0
      },
      {
        id: '',
        name: 'Monster N-Lite 206 - Casque Premium Sans Fil - Noir',
        slug: 'casque-monster-n-lite-206-noir',
        sku: '137240-00',
        color: 'Noir',
        colorCode: '#000000',
        stock: 0
      }
    ]
  },
  {
    baseName: 'Monster N-Lite 203 - Casque Sans Fil',
    baseSlug: 'casque-monster-n-lite-203',
    baseSku: 'MONSTER-NLITE-203',
    products: [
      {
        id: '',
        name: 'Monster N-Lite 203 - Casque Sans Fil - Gold',
        slug: 'casque-monster-n-lite-203-gold',
        sku: '137193-02',
        color: 'Gold',
        colorCode: '#FFD700',
        stock: 0
      },
      {
        id: '',
        name: 'Monster N-Lite 203 - Casque Sans Fil - Noir',
        slug: 'casque-monster-n-lite-203-noir',
        sku: '137194-02',
        color: 'Noir',
        colorCode: '#000000',
        stock: 0
      }
    ]
  },
  {
    baseName: 'NOKIA G22',
    baseSlug: 'nokia-g22',
    baseSku: 'NOKIA-G22',
    products: [
      {
        id: '',
        name: 'NOKIA G22 - Bleu',
        slug: 'nokia-g22-bleu',
        sku: 'NOKIA-G22-BLEU',
        color: 'Bleu',
        colorCode: '#0066CC',
        stock: 0
      },
      {
        id: '',
        name: 'NOKIA G22 - Gris',
        slug: 'nokia-g22-gris',
        sku: 'NOKIA-G22-GRIS',
        color: 'Gris',
        colorCode: '#808080',
        stock: 0
      }
    ]
  },
  {
    baseName: 'Nokia 110 4G 2025',
    baseSlug: 'nokia-110-4g-2025',
    baseSku: 'NOKIA-110-2025',
    products: [
      {
        id: '',
        name: 'Nokia 110 2023 Noir',
        slug: 'nokia-110-2023-noir',
        sku: 'HP03317',
        color: 'Noir',
        colorCode: '#000000',
        stock: 0
      },
      {
        id: '',
        name: 'NOKIA 110 4G 2025 - Bleu',
        slug: 'nokia-110-4g-2025-bleu',
        sku: 'NOKIA-110-4G-2025-BLEU',
        color: 'Bleu',
        colorCode: '#0066CC',
        stock: 0
      }
    ]
  },
  {
    baseName: 'MONSTER TH300 TACTILE',
    baseSlug: 'casque-monster-th300-tactile',
    baseSku: 'MONSTER-TH300',
    products: [
      {
        id: '',
        name: 'MONSTER TH300 TACTILE BLANC',
        slug: 'casque-monster-th300-tactile-blanc',
        sku: '137250-03',
        color: 'Blanc',
        colorCode: '#FFFFFF',
        stock: 0
      },
      {
        id: '',
        name: 'MONSTER TH300 TACTILE NOIR',
        slug: 'casque-monster-th300-tactile-noir',
        sku: '137250-00',
        color: 'Noir',
        colorCode: '#000000',
        stock: 0
      }
    ]
  }
];

async function migrateProductVariants(dryRun: boolean = true) {
  console.log(`\n${'='.repeat(80)}`);
  console.log('🔄 MIGRATION DES PRODUITS VERS SYSTÈME DE VARIANTES');
  console.log('='.repeat(80));
  console.log(`Mode: ${dryRun ? '🔍 DRY RUN (simulation)' : '⚡ EXÉCUTION RÉELLE'}\n`);

  for (const group of migrationGroups) {
    console.log(`\n${'─'.repeat(80)}`);
    console.log(`📦 Groupe: ${group.baseName}`);
    console.log('─'.repeat(80));

    // 1. Récupérer les IDs et données actuelles des produits
    for (const product of group.products) {
      console.log(`   🔍 Recherche de: ${product.slug}`);

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('url_slug', product.slug)
        .single();

      if (error || !data) {
        console.log(`   ⚠️  Produit non trouvé: ${product.slug}`);
        if (error) {
          console.log(`      ❌ Error code: ${error.code}`);
          console.log(`      ❌ Error message: ${error.message}`);
          console.log(`      ❌ Error details: ${JSON.stringify(error.details)}`);
          console.log(`      ❌ Error hint: ${error.hint}`);
        }
        console.log(`      📊 Data received: ${data ? JSON.stringify(data) : 'null'}`);
        continue;
      }

      product.id = data.id;
      product.images = data.images || [];
      console.log(`   ✓ Trouvé: ${product.name} (ID: ${product.id})`);
    }

    // Vérifier que nous avons tous les produits
    const validProducts = group.products.filter(p => p.id);
    if (validProducts.length < 2) {
      console.log(`   ⚠️  Pas assez de produits valides dans ce groupe (${validProducts.length}/2)`);
      continue;
    }

    // 2. Choisir le produit principal (premier de la liste)
    const mainProduct = validProducts[0];
    const otherProducts = validProducts.slice(1);

    console.log(`\n   🎯 Produit principal: ${mainProduct.name}`);
    console.log(`   📝 Nouveaux slug et SKU: ${group.baseSlug}, ${group.baseSku}`);

    if (!dryRun) {
      // 3. Mettre à jour le produit principal
      const { error: updateError } = await supabase
        .from('products')
        .update({
          name: group.baseName,
          url_slug: group.baseSlug,
          sku: group.baseSku
        })
        .eq('id', mainProduct.id);

      if (updateError) {
        console.log(`   ❌ Erreur lors de la mise à jour du produit principal: ${updateError.message}`);
        continue;
      }

      console.log(`   ✅ Produit principal mis à jour`);

      // 4. Créer les variantes (incluant la variante du produit principal)
      for (const product of validProducts) {
        const { error: variantError } = await supabase
          .from('product_variants')
          .insert({
            product_id: mainProduct.id,
            color: product.color,
            color_code: product.colorCode,
            stock: product.stock,
            is_default: product.id === mainProduct.id
          });

        if (variantError) {
          console.log(`   ❌ Erreur création variante ${product.color}: ${variantError.message}`);
        } else {
          console.log(`   ✅ Variante ${product.color} créée`);
        }
      }

      // 5. Désactiver les autres produits (ne pas les supprimer pour garder l'historique)
      for (const product of otherProducts) {
        const { error: deactivateError } = await supabase
          .from('products')
          .update({ status: 'inactive' })
          .eq('id', product.id);

        if (deactivateError) {
          console.log(`   ❌ Erreur désactivation ${product.name}: ${deactivateError.message}`);
        } else {
          console.log(`   ✅ Produit ${product.color} désactivé`);
        }
      }
    } else {
      // Mode dry run - afficher ce qui serait fait
      console.log(`\n   📋 ACTIONS À EFFECTUER:`);
      console.log(`   1. Mettre à jour "${mainProduct.name}"`);
      console.log(`      → Nom: "${group.baseName}"`);
      console.log(`      → Slug: "${group.baseSlug}"`);
      console.log(`      → SKU: "${group.baseSku}"`);
      console.log(`\n   2. Créer ${validProducts.length} variantes:`);

      for (const product of validProducts) {
        console.log(`      • ${product.color} ${product.id === mainProduct.id ? '(défaut)' : ''}`);
        console.log(`        - Color code: ${product.colorCode}`);
        console.log(`        - Stock: ${product.stock}`);
        console.log(`        - Images: ${product.images?.length || 0} image(s)`);
      }

      console.log(`\n   3. Désactiver ${otherProducts.length} produit(s) dupliqué(s):`);
      for (const product of otherProducts) {
        console.log(`      • ${product.name} (ID: ${product.id})`);
      }
    }

    console.log(`\n   ${dryRun ? '✓ Simulation' : '✅ Migration'} terminée pour ce groupe`);
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log(dryRun
    ? '✓ SIMULATION TERMINÉE - Aucune modification effectuée'
    : '✅ MIGRATION TERMINÉE - Produits regroupés avec succès');
  console.log(`${'='.repeat(80)}\n`);
}

// Exécution
const args = process.argv.slice(2);
const dryRun = !args.includes('--execute');

if (!dryRun) {
  console.log('\n⚠️  ATTENTION: Mode exécution réelle activé!');
  console.log('Les données vont être modifiées dans Supabase.\n');
}

migrateProductVariants(dryRun).then(() => {
  console.log(dryRun
    ? '\n💡 Pour exécuter la migration réelle, ajoutez --execute'
    : '\n✅ Migration terminée');
  process.exit(0);
}).catch(err => {
  console.error('\n❌ Erreur fatale:', err);
  process.exit(1);
});
