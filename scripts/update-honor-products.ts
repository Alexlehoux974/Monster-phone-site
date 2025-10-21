#!/usr/bin/env tsx

/**
 * Script pour mettre à jour les produits HONOR X5B, X6B et X7C dans Supabase
 * avec les corrections de spécifications
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { allProducts } from '../src/data/products';

// Charger les variables d'environnement
config({ path: '.env.local' });

// Configuration Supabase
const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is required');
  console.error('Set it in .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// IDs des produits à mettre à jour
const PRODUCT_IDS = [
  'honor-x5b-4gb-64gb',
  'honor-x6b-6gb-128gb',
  'honor-x7c-8gb-256gb'
];

async function updateHonorProducts() {
  console.log('🔄 Mise à jour des produits HONOR dans Supabase...\n');

  for (const productId of PRODUCT_IDS) {
    const product = products.find(p => p.id === productId);

    if (!product) {
      console.error(`❌ Produit ${productId} non trouvé dans products.ts`);
      continue;
    }

    console.log(`📱 Mise à jour de ${product.name}...`);

    try {
      // Mise à jour du produit
      const { data, error } = await supabase
        .from('products')
        .update({
          name: product.name,
          description: product.description,
          short_description: product.shortDescription,
          meta_title: product.metaTitle,
          meta_description: product.metaDescription,
          specifications: product.specifications,
          highlights: product.highlights,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId);

      if (error) {
        console.error(`❌ Erreur pour ${product.name}:`, error.message);
      } else {
        console.log(`✅ ${product.name} mis à jour avec succès`);

        // Afficher les modifications clés
        console.log(`   - Nom: ${product.name}`);
        console.log(`   - RAM: ${product.specifications.find(s => s.label === 'RAM')?.value || 'N/A'}`);
        console.log(`   - Écran: ${product.specifications.find(s => s.label === 'Écran')?.value || 'N/A'}`);
        if (product.specifications.find(s => s.label === 'Protection')) {
          console.log(`   - Protection: ${product.specifications.find(s => s.label === 'Protection')?.value}`);
        }
        if (product.specifications.find(s => s.label === 'Certification')) {
          console.log(`   - Certification: ${product.specifications.find(s => s.label === 'Certification')?.value}`);
        }
      }
    } catch (err) {
      console.error(`❌ Exception pour ${product.name}:`, err);
    }

    console.log('');
  }

  console.log('✨ Mise à jour terminée !');
}

// Exécution
updateHonorProducts().catch(console.error);
