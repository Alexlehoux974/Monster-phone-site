#!/usr/bin/env tsx

/**
 * Script de migration pour nettoyer Supabase et importer uniquement les produits réels
 * depuis le fichier STOCK_BOUTIQUE_ICELL4_AOUT_2025.csv
 * 
 * ATTENTION: Ce script va SUPPRIMER tous les produits existants dans Supabase
 * et les remplacer par les produits du CSV
 */

import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

// Configuration Supabase
const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is required');
  console.error('Please set it in your environment or .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Chemin du fichier CSV
const CSV_FILE_PATH = '/root/Monster-Phone-Images/STOCK_BOUTIQUE_ICELL4_AOUT_2025.csv';

interface CSVProduct {
  'Référence': string;
  'MODELE': string;
  'QUANTITE STOCK TOTAL': string;
  'EAN': string;
  'PRIX UNITAIRE': string;
  'D3E': string;
  'TVA': string;
  'PVC': string;
  'Classe Energétique': string;
  'INDICE REPARABILITE': string;
  'DAS tête': string;
  'DAS Corps': string;
  'Das Membre': string;
}

interface ProcessedProduct {
  sku: string;
  ean: string | null;
  name: string;
  brand_name: string;
  category_name: string;
  subcategory_name: string | null;
  stock_quantity: number;
  unit_price_ht: number;
  d3e_tax: number;
  tva_rate: number;
  price: number; // PVC
  energy_class: string | null;
  repairability_index: number | null;
  das_head: string | null;
  das_body: string | null;
  das_limb: string | null;
  color: string | null;
  memory: string | null;
}

// Mapping des catégories basé sur les produits du CSV
const CATEGORY_MAPPING: Record<string, { category: string; subcategory: string | null }> = {
  'TELEPHONE': { category: 'Smartphones', subcategory: null },
  'HONOR PAD': { category: 'Tablettes', subcategory: null },
  'HONOR CHOICE WATCH': { category: 'Montres connectées', subcategory: null },
  'HONOR X5': { category: 'Accessoires', subcategory: 'Coques & Protection' },
  'NOKIA': { category: 'Smartphones', subcategory: null },
  'POWERBANK': { category: 'Chargement & Énergie', subcategory: 'Batteries externes' },
  'CABLE': { category: 'Chargement & Énergie', subcategory: 'Câbles' },
  'CHARGEUR': { category: 'Chargement & Énergie', subcategory: 'Chargeurs' },
  'APPAREIL PHOTO ENFANT': { category: 'Créativité & Enfants', subcategory: 'Appareils photo' },
  'ROULEAUX PAPIER': { category: 'Créativité & Enfants', subcategory: 'Accessoires' },
  'CASQUE SANS FILS ENFANTS': { category: 'Créativité & Enfants', subcategory: 'Audio enfants' },
  'MONSTER N LITE': { category: 'Audio & Son', subcategory: 'Écouteurs' },
  'MONSTER TH300': { category: 'Audio & Son', subcategory: 'Écouteurs' },
  'MONSTER CLARITY': { category: 'Audio & Son', subcategory: 'Écouteurs' },
  'MONSTER CHAMPION': { category: 'Audio & Son', subcategory: 'Écouteurs' },
  'MONSTER DNA FIT': { category: 'Audio & Son', subcategory: 'Écouteurs' },
  'MONSTER CASQUE': { category: 'Audio & Son', subcategory: 'Casques' },
  'MONSTER MISSION': { category: 'Audio & Son', subcategory: 'Casques' },
  'MONSTER PERSONA': { category: 'Audio & Son', subcategory: 'Casques' },
  'MONSTER ELEMENT AIR': { category: 'Audio & Son', subcategory: 'Écouteurs' },
  'MONSTER BLASTER': { category: 'Audio & Son', subcategory: 'Enceintes' },
  'MONSTER ENCEINTE': { category: 'Audio & Son', subcategory: 'Enceintes' },
  'MONSTER PARTY': { category: 'Audio & Son', subcategory: 'Enceintes' },
  'MONSTER NETTOYANT': { category: 'Accessoires', subcategory: 'Entretien' },
  'MONSTER CABLE HDMI': { category: 'Accessoires', subcategory: 'Câbles vidéo' },
  'MONSTER CABLE TYPE C': { category: 'Accessoires', subcategory: 'Câbles' },
  'MONSTER MULTIPRISE': { category: 'Chargement & Énergie', subcategory: 'Multiprises' },
  'MONSTER ILLUMINESCENCE': { category: 'LED', subcategory: null },
};

function extractBrandFromModel(model: string): string {
  if (!model) return 'UNKNOWN';
  
  const cleanModel = model.toUpperCase().trim();
  
  // Extraction de la marque depuis le modèle
  if (cleanModel.includes('HONOR')) return 'HONOR';
  if (cleanModel.includes('NOKIA')) return 'NOKIA';
  if (cleanModel.includes('MYWAY') || cleanModel.includes('MY WAY')) return 'MY WAY';
  if (cleanModel.includes('ABYX')) return 'ABYX';
  if (cleanModel.includes('MUVIT')) return 'MUVIT';
  if (cleanModel.includes('TIGER POWER')) return 'TIGER POWER';
  if (cleanModel.includes('MONSTER')) return 'MONSTER';
  
  return 'UNKNOWN';
}

function determineCategory(model: string): { category: string; subcategory: string | null } {
  const upperModel = model.toUpperCase();
  
  for (const [key, value] of Object.entries(CATEGORY_MAPPING)) {
    if (upperModel.includes(key)) {
      return value;
    }
  }
  
  // Par défaut
  return { category: 'Accessoires', subcategory: null };
}

function extractColorFromModel(model: string): string | null {
  const upperModel = model.toUpperCase();
  const colors: Record<string, string> = {
    'NOIR': 'Noir',
    'BLEU': 'Bleu', 
    'VERT': 'Vert',
    'GRIS': 'Gris',
    'ORANGE': 'Orange',
    'BLANC': 'Blanc',
    'GOLD': 'Or',
    'ROSE': 'Rose',
  };
  
  for (const [key, value] of Object.entries(colors)) {
    if (upperModel.includes(key)) {
      return value;
    }
  }
  
  return null;
}

function extractMemoryFromModel(model: string): string | null {
  // Recherche de patterns comme "4+4/64", "8+8/512", "12+8/256"
  const memoryMatch = model.match(/(\d+)\+(\d+)\/(\d+)/);
  if (memoryMatch) {
    const ram = parseInt(memoryMatch[1]) + parseInt(memoryMatch[2]);
    const storage = parseInt(memoryMatch[3]);
    return `${ram}GB / ${storage}GB`;
  }
  
  return null;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function clearDatabase() {
  console.log('\n🧹 Nettoyage de la base de données...');
  
  try {
    // Supprimer dans l'ordre des dépendances
    await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('product_ratings').delete().neq('product_id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('product_badges').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('product_highlights').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('product_specifications').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('product_images').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('stock_history').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('product_variants').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('product_collections').delete().neq('product_id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('product_keywords').delete().neq('product_id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    console.log('✅ Tables produits nettoyées');
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
    throw error;
  }
}

async function setupBrands() {
  console.log('\n🏷️ Configuration des marques...');
  
  const brands = [
    { name: 'HONOR', slug: 'honor', description: 'Smartphones et tablettes Honor' },
    { name: 'NOKIA', slug: 'nokia', description: 'Téléphones Nokia' },
    { name: 'MONSTER', slug: 'monster', description: 'Audio et accessoires Monster' },
    { name: 'MY WAY', slug: 'my-way', description: 'Accessoires de charge My Way' },
    { name: 'ABYX', slug: 'abyx', description: 'Batteries externes Abyx' },
    { name: 'MUVIT', slug: 'muvit', description: 'Produits pour enfants Muvit' },
    { name: 'TIGER POWER', slug: 'tiger-power', description: 'Câbles Tiger Power' },
  ];
  
  // Supprimer les marques fictives
  const { error: deleteError } = await supabase
    .from('brands')
    .delete()
    .not('name', 'in', `(${brands.map(b => b.name).join(',')})`);
    
  if (deleteError) {
    console.error('⚠️ Erreur lors de la suppression des marques fictives:', deleteError);
  }
  
  // Créer ou mettre à jour les marques réelles
  for (const brand of brands) {
    const { error } = await supabase
      .from('brands')
      .upsert(brand, { onConflict: 'name' });
      
    if (error) {
      console.error(`⚠️ Erreur pour la marque ${brand.name}:`, error);
    } else {
      console.log(`✅ Marque ${brand.name} configurée`);
    }
  }
}

async function setupCategories() {
  console.log('\n📁 Configuration des catégories...');
  
  const categories = [
    { name: 'Smartphones', slug: 'smartphones' },
    { name: 'Tablettes', slug: 'tablettes' },
    { name: 'Montres connectées', slug: 'montres-connectees' },
    { name: 'Audio & Son', slug: 'audio-son' },
    { name: 'Chargement & Énergie', slug: 'chargement-energie' },
    { name: 'Créativité & Enfants', slug: 'creativite-enfants' },
    { name: 'Accessoires', slug: 'accessoires' },
    { name: 'LED', slug: 'led' },
  ];
  
  const subcategories = [
    { name: 'Écouteurs', slug: 'ecouteurs', parent: 'Audio & Son' },
    { name: 'Casques', slug: 'casques', parent: 'Audio & Son' },
    { name: 'Enceintes', slug: 'enceintes', parent: 'Audio & Son' },
    { name: 'Batteries externes', slug: 'batteries-externes', parent: 'Chargement & Énergie' },
    { name: 'Câbles', slug: 'cables', parent: 'Chargement & Énergie' },
    { name: 'Chargeurs', slug: 'chargeurs', parent: 'Chargement & Énergie' },
    { name: 'Multiprises', slug: 'multiprises', parent: 'Chargement & Énergie' },
    { name: 'Appareils photo', slug: 'appareils-photo', parent: 'Créativité & Enfants' },
    { name: 'Audio enfants', slug: 'audio-enfants', parent: 'Créativité & Enfants' },
    { name: 'Coques & Protection', slug: 'coques-protection', parent: 'Accessoires' },
    { name: 'Entretien', slug: 'entretien', parent: 'Accessoires' },
    { name: 'Câbles vidéo', slug: 'cables-video', parent: 'Accessoires' },
  ];
  
  // Créer les catégories principales
  for (const cat of categories) {
    const { error } = await supabase
      .from('categories')
      .upsert(cat, { onConflict: 'slug' });
      
    if (error) {
      console.error(`⚠️ Erreur pour la catégorie ${cat.name}:`, error);
    }
  }
  
  // Récupérer les IDs des catégories pour les sous-catégories
  const { data: cats } = await supabase.from('categories').select('id, name');
  const catMap = new Map(cats?.map(c => [c.name, c.id]) || []);
  
  // Créer les sous-catégories
  for (const subcat of subcategories) {
    const parentId = catMap.get(subcat.parent);
    if (parentId) {
      const { error } = await supabase
        .from('categories')
        .upsert({ ...subcat, parent_id: parentId }, { onConflict: 'slug' });
        
      if (error) {
        console.error(`⚠️ Erreur pour la sous-catégorie ${subcat.name}:`, error);
      }
    }
  }
  
  console.log('✅ Catégories configurées');
}

async function importProducts(products: ProcessedProduct[]) {
  console.log(`\n📦 Import de ${products.length} produits...`);
  
  // Récupérer les IDs des marques et catégories
  const { data: brands } = await supabase.from('brands').select('id, name');
  const { data: categories } = await supabase.from('categories').select('id, name, parent_id');
  
  const brandMap = new Map(brands?.map(b => [b.name, b.id]) || []);
  const catMap = new Map(categories?.map(c => [c.name, c.id]) || []);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const product of products) {
    try {
      const brandId = brandMap.get(product.brand_name);
      const categoryId = catMap.get(product.category_name);
      const subcategoryId = product.subcategory_name ? catMap.get(product.subcategory_name) : null;
      
      if (!brandId) {
        console.error(`⚠️ Marque non trouvée: ${product.brand_name} pour ${product.name}`);
        errorCount++;
        continue;
      }
      
      if (!categoryId) {
        console.error(`⚠️ Catégorie non trouvée: ${product.category_name} pour ${product.name}`);
        errorCount++;
        continue;
      }
      
      // Créer le produit
      const { data: newProduct, error: productError } = await supabase
        .from('products')
        .insert({
          sku: product.sku || generateSlug(product.name),
          name: product.name,
          brand_id: brandId,
          category_id: categoryId,
          subcategory_id: subcategoryId,
          price: product.price || 0,
          unit_price_ht: product.unit_price_ht || 0,
          d3e_tax: product.d3e_tax || 0,
          tva_rate: product.tva_rate || 0,
          stock_quantity: product.stock_quantity || 0,
          energy_class: product.energy_class,
          repairability_index: product.repairability_index,
          das_head: product.das_head,
          das_body: product.das_body,
          das_limb: product.das_limb,
          url_slug: generateSlug(product.name),
          description: `${product.name} - ${product.memory || ''} ${product.color || ''}`.trim(),
          status: product.stock_quantity > 0 ? 'active' : 'out-of-stock',
        })
        .select()
        .single();
        
      if (productError) {
        console.error(`❌ Erreur pour ${product.name}:`, productError);
        errorCount++;
        continue;
      }
      
      // Créer le variant avec l'EAN
      if (newProduct && product.ean) {
        await supabase.from('product_variants').insert({
          product_id: newProduct.id,
          color: product.color || 'Standard',
          ean: product.ean.replace('.0', ''), // Nettoyer l'EAN
          stock: product.stock_quantity,
          is_default: true,
        });
      }
      
      // Créer les spécifications
      const specs = [];
      if (product.memory) specs.push({ label: 'Mémoire', value: product.memory });
      if (product.das_head) specs.push({ label: 'DAS Tête', value: product.das_head });
      if (product.das_body) specs.push({ label: 'DAS Corps', value: product.das_body });
      if (product.das_limb) specs.push({ label: 'DAS Membre', value: product.das_limb });
      if (product.energy_class) specs.push({ label: 'Classe énergétique', value: product.energy_class });
      if (product.repairability_index) specs.push({ label: 'Indice de réparabilité', value: product.repairability_index.toString() });
      
      if (specs.length > 0 && newProduct) {
        await supabase.from('product_specifications').insert(
          specs.map((spec, index) => ({
            product_id: newProduct.id,
            label: spec.label,
            value: spec.value,
            display_order: index,
          }))
        );
      }
      
      successCount++;
      console.log(`✅ ${product.name} importé`);
    } catch (error) {
      console.error(`❌ Erreur pour ${product.name}:`, error);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Résultat: ${successCount} succès, ${errorCount} erreurs`);
}

async function main() {
  console.log('🚀 Démarrage de la migration des produits réels...\n');
  
  try {
    // Lire et parser le CSV
    console.log('📖 Lecture du fichier CSV...');
    const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    const records: CSVProduct[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ',',
      bom: true,
    });
    
    console.log(`✅ ${records.length} lignes trouvées dans le CSV`);
    
    // Filtrer et traiter les produits
    const products: ProcessedProduct[] = [];
    
    for (const record of records) {
      // Ignorer les lignes de total et les lignes vides
      if (!record['MODELE'] || record['MODELE'].includes('TOTAL') || record['Référence'] === '0') {
        continue;
      }
      
      const brand = extractBrandFromModel(record['MODELE']);
      if (brand === 'UNKNOWN') {
        console.warn(`⚠️ Marque inconnue pour: ${record['MODELE']}`);
        continue;
      }
      
      const { category, subcategory } = determineCategory(record['MODELE']);
      
      products.push({
        sku: record['Référence'] || generateSlug(record['MODELE']),
        ean: record['EAN'] && record['EAN'] !== '' ? record['EAN'] : null,
        name: record['MODELE'].replace(' HT', '').trim(),
        brand_name: brand,
        category_name: category,
        subcategory_name: subcategory,
        stock_quantity: parseInt(record['QUANTITE STOCK TOTAL']) || 0,
        unit_price_ht: parseFloat(record['PRIX UNITAIRE']) || 0,
        d3e_tax: parseFloat(record['D3E']) || 0,
        tva_rate: parseFloat(record['TVA']) || 0,
        price: parseFloat(record['PVC']) || 0,
        energy_class: record['Classe Energétique'] || null,
        repairability_index: record['INDICE REPARABILITE'] ? parseFloat(record['INDICE REPARABILITE']) : null,
        das_head: record['DAS tête'] || null,
        das_body: record['DAS Corps'] || null,
        das_limb: record['Das Membre'] || null,
        color: extractColorFromModel(record['MODELE']),
        memory: extractMemoryFromModel(record['MODELE']),
      });
    }
    
    console.log(`\n✅ ${products.length} produits valides extraits du CSV`);
    
    // Nettoyer la base
    await clearDatabase();
    
    // Configurer les marques et catégories
    await setupBrands();
    await setupCategories();
    
    // Importer les produits
    await importProducts(products);
    
    console.log('\n🎉 Migration terminée avec succès!');
    
  } catch (error) {
    console.error('\n❌ Erreur fatale:', error);
    process.exit(1);
  }
}

// Exécution
main();