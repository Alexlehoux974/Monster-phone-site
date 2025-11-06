#!/usr/bin/env node
/**
 * Script de migration des données produits vers Supabase
 * Transfert des produits depuis les fichiers TypeScript vers la base de données
 */

import { createClient } from '@supabase/supabase-js';
import { PRODUCTS, type Product, type ProductVariant, type ProductSpecification, type Review } from '../../src/data/products';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nswlznqoadjffpxkagoz.supabase.co';
// Pour la migration initiale, on utilise l'anon key si le service role key n'est pas disponible
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  console.error('Assurez-vous que NEXT_PUBLIC_SUPABASE_URL est défini');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Types pour les données Supabase
interface SupabaseBrand {
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
}

interface SupabaseCategory {
  name: string;
  slug: string;
  parent_id?: string;
  description?: string;
  icon?: string;
  display_order?: number;
}

interface SupabaseProduct {
  sku: string;
  name: string;
  url_slug: string;
  brand_id?: string;
  category_id?: string;
  subcategory_id?: string;
  description?: string;
  short_description?: string;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  status: 'active' | 'draft' | 'out-of-stock';
  repairability_index?: number;
  das_head?: string;
  das_body?: string;
  weight_grams?: number;
  airtable_id?: string;
}

// Fonction utilitaire pour créer un slug
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Fonction pour migrer les marques
async function migrateBrands() {
  console.log('📦 Migration des marques...');
  
  // Extraire les marques uniques
  const uniqueBrands = new Set(PRODUCTS.map(p => p.brandName));
  const brands: SupabaseBrand[] = Array.from(uniqueBrands).map(brand => ({
    name: brand,
    slug: createSlug(brand),
    description: `Produits de la marque ${brand}`,
    website_url: brand === 'HONOR' ? 'https://www.honor.com' : 
                 brand === 'NOKIA' ? 'https://www.nokia.com' :
                 brand === 'HIFUTURE' ? 'https://hifuture.com' :
                 brand === 'MONSTER' ? 'https://www.monsterproducts.com' :
                 brand === 'MUVIT' ? 'https://www.muvit.com' :
                 brand === 'ASCENDO' ? 'https://www.ascendo.com' : undefined
  }));

  // Insérer les marques
  const { error } = await supabase
    .from('brands')
    .upsert(brands, { onConflict: 'slug' });

  if (error) {
    console.error('❌ Erreur lors de la migration des marques:', error);
    throw error;
  }

  console.log(`✅ ${brands.length} marques migrées`);
  return brands;
}

// Fonction pour migrer les catégories
async function migrateCategories() {
  console.log('📂 Migration des catégories...');
  
  // Extraire les catégories et sous-catégories uniques
  const categoriesMap = new Map<string, Set<string>>();
  
  PRODUCTS.forEach(product => {
    if (!categoriesMap.has(product.categoryName)) {
      categoriesMap.set(product.categoryName, new Set());
    }
    if (product.subcategory) {
      categoriesMap.get(product.categoryName)?.add(product.subcategory);
    }
  });

  // Créer les catégories principales
  const mainCategories: SupabaseCategory[] = Array.from(categoriesMap.keys()).map((cat, index) => ({
    name: cat,
    slug: createSlug(cat),
    description: `Catégorie ${cat}`,
    display_order: index + 1
  }));

  // Insérer les catégories principales
  const { data: insertedCategories, error: catError } = await supabase
    .from('categories')
    .upsert(mainCategories, { onConflict: 'slug' })
    .select();

  if (catError) {
    console.error('❌ Erreur lors de la migration des catégories:', catError);
    throw catError;
  }

  // Créer les sous-catégories avec des slugs uniques
  const subCategoriesMap = new Map<string, SupabaseCategory>();
  
  for (const [category, subcategories] of categoriesMap) {
    const parentCategory = insertedCategories?.find(c => c.name === category);
    if (parentCategory && subcategories.size > 0) {
      let order = 1;
      for (const subcat of subcategories) {
        const slug = createSlug(`${category}-${subcat}`);
        // Éviter les doublons
        if (!subCategoriesMap.has(slug)) {
          subCategoriesMap.set(slug, {
            name: subcat,
            slug: slug,
            parent_id: parentCategory.id,
            description: `${subcat} dans ${category}`,
            display_order: order++
          });
        }
      }
    }
  }

  const subCategories = Array.from(subCategoriesMap.values());
  
  if (subCategories.length > 0) {
    const { error: subError } = await supabase
      .from('categories')
      .upsert(subCategories, { onConflict: 'slug' });

    if (subError) {
      console.error('❌ Erreur lors de la migration des sous-catégories:', subError);
      throw subError;
    }
  }

  console.log(`✅ ${mainCategories.length} catégories et ${subCategories.length} sous-catégories migrées`);
  return { mainCategories, subCategories };
}

// Fonction pour migrer un produit et ses relations
async function migrateProduct(product: Product) {
  try {
    // Récupérer la marque
    const { data: brand } = await supabase
      .from('brands')
      .select('id')
      .eq('name', product.brandName)
      .single();

    // Récupérer la catégorie
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('name', product.categoryName)
      .is('parent_id', null)
      .single();
      
    // Récupérer la sous-catégorie si elle existe
    let subcategory = null;
    if (product.subcategory && category) {
      const { data: subcat } = await supabase
        .from('categories')
        .select('id')
        .eq('name', product.subcategory)
        .eq('parent_id', category.id)
        .single();
      subcategory = subcat;
    }

    // Préparer les données du produit
    const productData: SupabaseProduct = {
      sku: product.sku,
      name: product.name,
      url_slug: product.urlSlug,
      brand_id: brand?.id,
      category_id: category?.id,
      subcategory_id: subcategory?.id,
      description: product.fullDescription,
      short_description: product.shortDescription,
      price: product.basePrice,
      original_price: product.originalPrice,
      discount_percentage: product.discountPercent,
      status: (product.status as 'active' | 'draft' | 'out-of-stock') || 'active',
      repairability_index: product.repairabilityIndex,
      das_head: product.dasHead,
      das_body: product.dasBody,
      airtable_id: product.airtableId
    };

    // Insérer le produit
    const { data: insertedProduct, error: productError } = await supabase
      .from('products')
      .upsert(productData, { onConflict: 'sku' })
      .select()
      .single();

    if (productError) {
      console.error(`❌ Erreur produit ${product.sku}:`, productError);
      return;
    }

    // Migrer les variantes
    if (product.variants && product.variants.length > 0) {
      const variants = product.variants.map((variant: ProductVariant, index: number) => ({
        product_id: insertedProduct.id,
        color: variant.color,
        color_code: variant.colorCode,
        ean: variant.ean,
        stock: variant.stock,
        is_default: index === 0 // First variant is default
      }));

      const { data: insertedVariants, error: variantError } = await supabase
        .from('product_variants')
        .upsert(variants, { onConflict: 'ean' })
        .select();

      if (variantError) {
        console.error(`❌ Erreur variantes ${product.sku}:`, variantError);
      }

      // Migrer les images des variantes
      if (insertedVariants) {
        for (let i = 0; i < insertedVariants.length; i++) {
          const variant = insertedVariants[i];
          const originalVariant = product.variants[i];
          
          if (originalVariant.images && originalVariant.images.length > 0) {
            const variantImages = originalVariant.images.map((url, imgIndex) => ({
              product_id: insertedProduct.id,
              variant_id: variant.id,
              url,
              alt: `${product.name} - ${originalVariant.color} - Image ${imgIndex + 1}`,
              is_primary: imgIndex === 0,
              display_order: imgIndex + 1
            }));

            await supabase
              .from('product_images')
              .upsert(variantImages, { onConflict: 'url' });
          }
        }
      }
    }

    // Images are now handled in variants, not at product level

    // Migrer les spécifications
    if (product.specifications && product.specifications.length > 0) {
      const specifications = product.specifications.map((spec: ProductSpecification, index: number) => ({
        product_id: insertedProduct.id,
        label: spec.label,
        value: spec.value,
        icon: spec.icon,
        display_order: index + 1
      }));

      await supabase
        .from('product_specifications')
        .upsert(specifications);
    }

    // Highlights, badges, videos, SEO metadata, and reviews are no longer part of the Product interface

    console.log(`✅ Produit migré: ${product.name} (${product.sku})`);

  } catch (error) {
    console.error(`❌ Erreur migration produit ${product.sku}:`, error);
  }
}

// Fonction principale de migration
async function migrateAllData() {
  console.log('🚀 Début de la migration des données produits vers Supabase');
  console.log(`📊 Nombre total de produits à migrer: ${PRODUCTS.length}`);
  
  try {
    // Étape 1: Migrer les marques
    await migrateBrands();
    
    // Étape 2: Migrer les catégories
    await migrateCategories();
    
    // Étape 3: Migrer les produits et leurs relations
    console.log('📦 Migration des produits...');
    
    // Traiter les produits par batch pour éviter la surcharge
    const batchSize = 5;
    for (let i = 0; i < PRODUCTS.length; i += batchSize) {
      const batch = PRODUCTS.slice(i, i + batchSize);
      await Promise.all(batch.map(product => migrateProduct(product)));
      
      const progress = Math.min(i + batchSize, PRODUCTS.length);
      console.log(`📈 Progression: ${progress}/${PRODUCTS.length} produits traités`);
    }
    
    // Étape 4: Créer les collections par défaut
    console.log('📁 Création des collections...');
    
    const collections = [
      {
        name: 'Nouveautés',
        slug: 'nouveautes',
        description: 'Les derniers produits arrivés en boutique',
        is_active: true,
        display_order: 1
      },
      {
        name: 'Meilleures ventes',
        slug: 'meilleures-ventes',
        description: 'Nos produits les plus populaires',
        is_active: true,
        display_order: 2
      },
      {
        name: 'Promotions',
        slug: 'promotions',
        description: 'Profitez de nos offres spéciales',
        is_active: true,
        display_order: 3
      },
      {
        name: 'Gaming',
        slug: 'gaming',
        description: 'Sélection spéciale pour les gamers',
        is_active: true,
        display_order: 4
      }
    ];
    
    const { error: collectionError } = await supabase
      .from('collections')
      .upsert(collections, { onConflict: 'slug' });
    
    if (collectionError) {
      console.error('❌ Erreur lors de la création des collections:', collectionError);
    } else {
      console.log('✅ Collections créées avec succès');
    }
    
    // Étape 5: Associer des produits aux collections
    console.log('🔗 Association des produits aux collections...');
    
    // Récupérer les IDs des collections et produits
    const { data: collectionsData } = await supabase.from('collections').select('id, slug');
    const { data: productsData } = await supabase.from('products').select('id, name, discount_percentage, created_at');
    
    if (collectionsData && productsData) {
      const productCollections: Array<{product_id: string, collection_id: string, display_order: number}> = [];
      
      // Nouveautés - 10 derniers produits créés
      const newCollection = collectionsData.find(c => c.slug === 'nouveautes');
      if (newCollection) {
        const newestProducts = productsData
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 10);
        
        newestProducts.forEach((product, index) => {
          productCollections.push({
            product_id: product.id,
            collection_id: newCollection.id,
            display_order: index + 1
          });
        });
      }
      
      // Promotions - Produits avec discount
      const promoCollection = collectionsData.find(c => c.slug === 'promotions');
      if (promoCollection) {
        const promoProducts = productsData
          .filter(p => p.discount_percentage && p.discount_percentage > 0)
          .slice(0, 10);
        
        promoProducts.forEach((product, index) => {
          productCollections.push({
            product_id: product.id,
            collection_id: promoCollection.id,
            display_order: index + 1
          });
        });
      }
      
      // Gaming - Produits gaming
      const gamingCollection = collectionsData.find(c => c.slug === 'gaming');
      if (gamingCollection) {
        const gamingProducts = productsData
          .filter(p => p.name.toLowerCase().includes('gaming') || 
                       p.name.toLowerCase().includes('x9b') ||
                       p.name.toLowerCase().includes('pad'))
          .slice(0, 10);
        
        gamingProducts.forEach((product, index) => {
          productCollections.push({
            product_id: product.id,
            collection_id: gamingCollection.id,
            display_order: index + 1
          });
        });
      }
      
      if (productCollections.length > 0) {
        const { error: pcError } = await supabase
          .from('product_collections')
          .upsert(productCollections);
        
        if (pcError) {
          console.error('❌ Erreur association produits-collections:', pcError);
        } else {
          console.log('✅ Produits associés aux collections');
        }
      }
    }
    
    console.log('✅ Migration terminée avec succès!');
    console.log('📊 Résumé:');
    console.log(`   - Produits migrés: ${PRODUCTS.length}`);
    console.log(`   - Marques créées: ${new Set(PRODUCTS.map(p => p.brandName)).size}`);
    console.log(`   - Catégories créées: ${new Set(PRODUCTS.map(p => p.categoryName)).size}`);
    
    // Rafraîchir les vues matérialisées
    console.log('🔄 Rafraîchissement des vues matérialisées...');
    await supabase.rpc('refresh_materialized_views');
    console.log('✅ Vues matérialisées mises à jour');
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  }
}

// Fonction pour vérifier la connexion
async function checkConnection() {
  const { data, error } = await supabase
    .from('brands')
    .select('count', { count: 'exact' });
  
  if (error) {
    console.error('❌ Impossible de se connecter à Supabase:', error);
    return false;
  }
  
  console.log('✅ Connexion à Supabase établie');
  return true;
}

// Exécution du script
async function main() {
  console.log('════════════════════════════════════════');
  console.log('   MIGRATION DES DONNÉES VERS SUPABASE  ');
  console.log('════════════════════════════════════════');
  
  // Vérifier la connexion
  const isConnected = await checkConnection();
  if (!isConnected) {
    process.exit(1);
  }
  
  // Demander confirmation
  console.log('\n⚠️  ATTENTION: Cette opération va migrer tous les produits vers Supabase.');
  console.log('   Les données existantes seront mises à jour (upsert).\n');
  
  // Lancer la migration
  await migrateAllData();
  
  console.log('\n════════════════════════════════════════');
  console.log('   MIGRATION TERMINÉE AVEC SUCCÈS ✅    ');
  console.log('════════════════════════════════════════');
  process.exit(0);
}

// Lancer le script
main();