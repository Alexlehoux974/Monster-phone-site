#!/usr/bin/env node

/**
 * Script admin pour synchroniser les images des variants vers products.images
 * Utilise la service_role key pour bypasser RLS
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Variables d\'environnement manquantes');
  process.exit(1);
}

async function syncProductImages() {
  console.log('🔄 Synchronisation des images (mode admin)...\n');

  // 1. Récupérer tous les produits actifs avec leurs variants
  const productsUrl = `${SUPABASE_URL}/rest/v1/products?select=id,name,url_slug,images,product_variants(id,images,is_default)&status=eq.active`;
  const productsResponse = await fetch(productsUrl, {
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!productsResponse.ok) {
    console.error('❌ Erreur lors de la récupération des produits');
    process.exit(1);
  }

  const products = await productsResponse.json();
  console.log(`📦 ${products.length} produits trouvés\n`);

  let updatedCount = 0;
  let skippedCount = 0;
  let noVariantsCount = 0;

  for (const product of products) {
    const { id, name, images: currentImages, product_variants } = product;

    // Vérifier si le produit a des variants
    if (!product_variants || product_variants.length === 0) {
      console.log(`⚠️  ${name} - Pas de variants`);
      noVariantsCount++;
      continue;
    }

    // Trouver le variant par défaut ou prendre le premier
    const defaultVariant = product_variants.find(v => v.is_default) || product_variants[0];

    // Vérifier si le variant a des images
    if (!defaultVariant.images || defaultVariant.images.length === 0) {
      console.log(`⚠️  ${name} - Aucune image dans le variant`);
      skippedCount++;
      continue;
    }

    // Vérifier si le produit a déjà des images
    if (currentImages && currentImages.length > 0) {
      console.log(`ℹ️  ${name} - A déjà des images, skip`);
      skippedCount++;
      continue;
    }

    // Les images des variants sont déjà des URLs complètes, on les prend telles quelles
    const variantImages = defaultVariant.images;

    // Mettre à jour avec la service_role key
    try {
      const updateUrl = `${SUPABASE_URL}/rest/v1/products?id=eq.${id}`;
      const updateResponse = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          images: variantImages
        })
      });

      if (!updateResponse.ok) {
        const text = await updateResponse.text();
        throw new Error(`Update failed: ${updateResponse.status} ${text}`);
      }

      const result = await updateResponse.json();
      if (result && result.length > 0 && result[0].images) {
        console.log(`✅ ${name} - ${result[0].images.length} image(s)`);
        console.log(`   → ${result[0].images[0]}\n`);
        updatedCount++;
      } else {
        console.log(`⚠️  ${name} - Mise à jour retournée vide\n`);
      }
    } catch (error) {
      console.error(`❌ ${name} - Erreur:`, error.message);
    }
  }

  console.log('\n📊 Résumé:');
  console.log(`   ✅ ${updatedCount} produits mis à jour`);
  console.log(`   ⏭️  ${skippedCount} produits ignorés (déjà des images)`);
  console.log(`   ⚠️  ${noVariantsCount} produits sans variants`);
}

// Exécuter le script
syncProductImages().catch(console.error);
