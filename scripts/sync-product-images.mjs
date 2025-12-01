#!/usr/bin/env node

/**
 * Script pour synchroniser les images des variants vers le champ images du produit
 * Prend la première image du variant par défaut (ou du premier variant si pas de défaut)
 */

const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

async function supabaseRequest(endpoint, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${text}`);
  }

  return response.json();
}

async function syncProductImages() {
  console.log('🔄 Récupération de tous les produits avec leurs variants...\n');

  // Récupérer tous les produits actifs avec leurs variants
  const products = await supabaseRequest(
    'products?select=id,name,url_slug,images,product_variants(id,images,is_default)&status=eq.active'
  );

  console.log(`📦 ${products.length} produits trouvés\n`);

  let updatedCount = 0;
  let skippedCount = 0;
  let noVariantsCount = 0;

  for (const product of products) {
    const { id, name, url_slug, images: currentImages, product_variants } = product;

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
      console.log(`⚠️  ${name} - Aucune image dans les variants`);
      skippedCount++;
      continue;
    }

    // Transformer les images Cloudinary en URLs complètes si nécessaire
    const transformedImages = defaultVariant.images.map(img => {
      if (img.startsWith('http')) {
        return img;
      }
      return `https://res.cloudinary.com/monster-phone/image/upload/v1763527513/${img}.png`;
    });

    // Vérifier si le produit a déjà des images
    if (currentImages && currentImages.length > 0) {
      console.log(`ℹ️  ${name} - A déjà des images, skip`);
      skippedCount++;
      continue;
    }

    // Mettre à jour le produit avec les images du variant
    try {
      const url = `${SUPABASE_URL}/rest/v1/products?id=eq.${id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          images: transformedImages
        })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Update failed: ${response.status} ${text}`);
      }

      console.log(`✅ ${name} - Mis à jour avec ${transformedImages.length} image(s)`);
      console.log(`   → ${transformedImages[0]}\n`);
      updatedCount++;
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
