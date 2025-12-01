#!/usr/bin/env node

/**
 * Script de test pour mettre à jour UN produit
 */

const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

async function fixOneProduct() {
  console.log('🔧 Test de mise à jour d\'UN produit...\n');

  // 1. Récupérer le produit TELEPHONE HONOR 200 PRO 12+ avec ses variants
  console.log('1. Récupération du produit...');
  const getUrl = `${SUPABASE_URL}/rest/v1/products?select=id,name,images,product_variants(id,images,is_default)&name=eq.TELEPHONE HONOR 200 PRO 12%2B`;
  const getResponse = await fetch(getUrl, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const products = await getResponse.json();
  if (products.length === 0) {
    console.error('❌ Produit non trouvé');
    return;
  }

  const product = products[0];
  console.log(`✅ Produit trouvé: ${product.name}`);
  console.log(`   ID: ${product.id}`);
  console.log(`   Images actuelles: ${product.images ? JSON.stringify(product.images) : 'null'}`);
  console.log(`   Variants: ${product.product_variants?.length || 0}`);

  if (product.product_variants && product.product_variants.length > 0) {
    const defaultVariant = product.product_variants.find(v => v.is_default) || product.product_variants[0];
    console.log(`   Variant par défaut: ${defaultVariant.id}`);
    console.log(`   Images du variant: ${defaultVariant.images ? JSON.stringify(defaultVariant.images) : 'null'}`);

    if (defaultVariant.images && defaultVariant.images.length > 0) {
      // 2. Mettre à jour le produit
      console.log('\n2. Mise à jour du produit...');

      // Transformer les images
      const transformedImages = defaultVariant.images.map(img => {
        if (img.startsWith('http')) {
          return img;
        }
        return `https://res.cloudinary.com/monster-phone/image/upload/v1763527513/${img}.png`;
      });

      console.log(`   Images transformées: ${JSON.stringify(transformedImages)}`);

      const patchUrl = `${SUPABASE_URL}/rest/v1/products?id=eq.${product.id}`;
      const patchResponse = await fetch(patchUrl, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'  // Demander le retour des données
        },
        body: JSON.stringify({
          images: transformedImages
        })
      });

      console.log(`   Status: ${patchResponse.status} ${patchResponse.statusText}`);

      if (!patchResponse.ok) {
        const text = await patchResponse.text();
        console.error(`❌ Erreur: ${text}`);
        return;
      }

      const updated = await patchResponse.json();
      console.log(`✅ Mise à jour réussie!`);
      console.log(`   Résultat: ${JSON.stringify(updated, null, 2)}`);

      // 3. Vérifier la mise à jour
      console.log('\n3. Vérification...');
      const verifyResponse = await fetch(getUrl, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const verified = await verifyResponse.json();
      if (verified.length > 0) {
        console.log(`✅ Images après mise à jour: ${verified[0].images ? JSON.stringify(verified[0].images) : 'null'}`);
      }
    } else {
      console.log('⚠️  Pas d\'images dans les variants');
    }
  } else {
    console.log('⚠️  Pas de variants');
  }
}

fixOneProduct().catch(console.error);
