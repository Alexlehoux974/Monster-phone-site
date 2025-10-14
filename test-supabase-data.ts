#!/usr/bin/env tsx
/**
 * Script de test pour vérifier les données Supabase
 */

import { getActiveProducts, getAllCategories } from './src/lib/supabase/api';

async function testSupabaseData() {
  console.log('🔍 Test de récupération des données Supabase...\n');

  // Test 1: Produits actifs
  console.log('📦 Test 1: Récupération des produits actifs...');
  try {
    const products = await getActiveProducts({ limit: 1000 });
    console.log(`✅ ${products.length} produits récupérés`);
    if (products.length > 0) {
      console.log('Premier produit:', {
        id: products[0].id,
        name: products[0].name,
        category: products[0].category_name,
        slug: products[0].url_slug
      });
    }
  } catch (error: any) {
    console.error('❌ Erreur produits:', error.message);
  }

  console.log('\n📂 Test 2: Récupération des catégories...');
  try {
    const categories = await getAllCategories();
    console.log(`✅ ${categories.length} catégories récupérées`);
    if (categories.length > 0) {
      console.log('Première catégorie:', {
        id: categories[0].id,
        name: categories[0].name,
        slug: categories[0].slug,
        subcategories: categories[0].subcategories?.length || 0
      });
    }
  } catch (error: any) {
    console.error('❌ Erreur catégories:', error.message);
  }
}

testSupabaseData();
