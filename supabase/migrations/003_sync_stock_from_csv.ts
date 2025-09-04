import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseKey);

interface StockRow {
  reference: string;
  modele: string;
  quantite_stock: string;
  ean: string;
  prix_unitaire: string;
  d3e: string;
  tva: string;
  pvc: string;
  classe_energetique: string;
  indice_reparabilite: string;
  das_tete: string;
  das_corps: string;
  das_membre: string;
}

interface SyncReport {
  productsUpdated: number;
  productsCreated: number;
  variantsUpdated: number;
  errors: string[];
  warnings: string[];
}

async function syncStockFromCSV(): Promise<SyncReport> {
  const report: SyncReport = {
    productsUpdated: 0,
    productsCreated: 0,
    variantsUpdated: 0,
    errors: [],
    warnings: []
  };

  try {
    // Lire le fichier CSV
    const csvPath = '/root/Monster-Phone-Images/STOCK_BOUTIQUE_ICELL4_AOUT_2025.csv';
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    
    // Parser le CSV
    const records: any[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ',',
      bom: true
    });

    console.log(`📊 Traitement de ${records.length} lignes du CSV...`);

    // Récupérer toutes les marques pour le mapping
    const { data: brands } = await supabase
      .from('brands')
      .select('id, name');
    
    const brandMap = new Map(brands?.map(b => [b.name.toUpperCase(), b.id]) || []);

    // Récupérer les catégories
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name, slug');
    
    const categoryMap = new Map(categories?.map(c => [c.slug, c.id]) || []);

    // Traiter chaque ligne du CSV
    for (const row of records) {
      // Ignorer les lignes de total
      if (!row['EAN'] || row['MODELE']?.includes('TOTAL')) {
        continue;
      }

      const ean = String(row['EAN']).replace('.0', '').trim();
      const modele = row['MODELE']?.trim() || '';
      const reference = row['Référence']?.trim() || '';
      const quantite = parseInt(row['QUANTITE STOCK TOTAL'] || '0');
      const prixHT = parseFloat(row['PRIX UNITAIRE'] || '0');
      const d3e = parseFloat(row['D3E'] || '0');
      const tva = parseFloat(row['TVA'] || '0');
      const pvc = parseFloat(row['PVC'] || '0');
      const classeEnergetique = row['Classe Energétique']?.trim() || null;
      const indiceReparabilite = parseFloat(row['INDICE REPARABILITE'] || '0') || null;
      const dasTete = row['DAS tête']?.trim() || null;
      const dasCorps = row['DAS Corps']?.trim() || null;
      const dasMembre = row['Das Membre']?.trim() || null;

      // Déterminer la marque à partir du modèle
      let brandId = null;
      let brandName = '';
      
      if (modele.includes('HONOR')) {
        brandName = 'HONOR';
      } else if (modele.includes('NOKIA')) {
        brandName = 'NOKIA';
      } else if (modele.includes('MONSTER')) {
        brandName = 'MONSTER';
      } else if (modele.includes('HIFUTURE')) {
        brandName = 'HIFUTURE';
      } else if (modele.includes('MUVIT')) {
        brandName = 'MUVIT';
      } else if (modele.includes('MY WAY') || modele.includes('MYWAY')) {
        brandName = 'MYWAY';
      } else if (modele.includes('ABYX')) {
        brandName = 'ABYX';
      } else if (modele.includes('TIGER')) {
        brandName = 'TIGER POWER';
      }

      brandId = brandMap.get(brandName);

      if (!brandId && brandName) {
        report.warnings.push(`Marque non trouvée pour: ${brandName} (${modele})`);
        continue;
      }

      try {
        // Chercher d'abord par EAN dans les variantes
        const { data: existingVariant } = await supabase
          .from('product_variants')
          .select('*, products(*)')
          .eq('ean', ean)
          .single();

        if (existingVariant) {
          // Mise à jour du stock de la variante existante
          const { error: variantError } = await supabase
            .from('product_variants')
            .update({
              stock: quantite,
              last_stock_update: new Date().toISOString(),
              supplier_reference: reference
            })
            .eq('id', existingVariant.id);

          if (variantError) {
            report.errors.push(`Erreur mise à jour variante ${ean}: ${variantError.message}`);
          } else {
            report.variantsUpdated++;
          }

          // Mise à jour du produit principal
          if (existingVariant.products) {
            const { error: productError } = await supabase
              .from('products')
              .update({
                stock_quantity: quantite,
                unit_price_ht: prixHT || existingVariant.products.unit_price_ht,
                d3e_tax: d3e,
                tva_rate: tva,
                energy_class: classeEnergetique,
                repairability_index: indiceReparabilite,
                das_head: dasTete || existingVariant.products.das_head,
                das_body: dasCorps || existingVariant.products.das_body,
                das_limb: dasMembre,
                status: quantite > 0 ? 'active' : 'out-of-stock',
                updated_at: new Date().toISOString()
              })
              .eq('id', existingVariant.product_id);

            if (productError) {
              report.errors.push(`Erreur mise à jour produit ${existingVariant.products.sku}: ${productError.message}`);
            } else {
              report.productsUpdated++;
            }
          }

          // Enregistrer dans l'historique
          await supabase
            .from('stock_history')
            .insert({
              product_id: existingVariant.product_id,
              variant_id: existingVariant.id,
              ean: ean,
              sku: existingVariant.products?.sku,
              quantity_before: existingVariant.stock || 0,
              quantity_after: quantite,
              price_ht: prixHT,
              source: 'CSV_ICELL4_AOUT_2025',
              import_date: new Date().toISOString()
            });

        } else {
          // Produit non trouvé - potentiellement un nouveau produit
          // Générer un SKU basé sur la référence ou le modèle
          const sku = reference || `NEW-${ean}`;
          const urlSlug = modele.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

          // Déterminer la catégorie
          let categoryId = null;
          if (modele.includes('MONTRE') || modele.includes('WATCH')) {
            categoryId = categoryMap.get('montres-connectees');
          } else if (modele.includes('ECOUTEUR') || modele.includes('AIRLINKS')) {
            categoryId = categoryMap.get('ecouteurs');
          } else if (modele.includes('CASQUE')) {
            categoryId = categoryMap.get('casques');
          } else if (modele.includes('ENCEINTE') || modele.includes('PARTYBOX')) {
            categoryId = categoryMap.get('enceintes');
          } else if (modele.includes('POWERBANK') || modele.includes('BATTERIE')) {
            categoryId = categoryMap.get('batteries-externes');
          } else if (modele.includes('CABLE') || modele.includes('CHARGEUR')) {
            categoryId = categoryMap.get('cables-chargeurs');
          } else if (modele.includes('APPAREIL PHOTO')) {
            categoryId = categoryMap.get('appareils-photo');
          } else if (modele.includes('ILLUMINESCENCE') || modele.includes('LED')) {
            categoryId = categoryMap.get('eclairage-led');
          } else {
            categoryId = categoryMap.get('smartphones');
          }

          // Créer le nouveau produit
          const { data: newProduct, error: createError } = await supabase
            .from('products')
            .insert({
              sku: sku,
              name: modele,
              brand_id: brandId,
              category_id: categoryId,
              price: pvc || prixHT * 1.2, // Prix TTC approximatif
              unit_price_ht: prixHT,
              stock_quantity: quantite,
              d3e_tax: d3e,
              tva_rate: tva,
              energy_class: classeEnergetique,
              repairability_index: indiceReparabilite,
              das_head: dasTete,
              das_body: dasCorps,
              das_limb: dasMembre,
              url_slug: urlSlug,
              status: quantite > 0 ? 'active' : 'out-of-stock',
              description: `${modele} - Nouveau produit importé du stock`,
              short_description: modele
            })
            .select()
            .single();

          if (createError) {
            report.warnings.push(`Produit non créé ${ean} (${modele}): ${createError.message}`);
          } else if (newProduct) {
            report.productsCreated++;

            // Créer la variante par défaut
            const { error: variantError } = await supabase
              .from('product_variants')
              .insert({
                product_id: newProduct.id,
                ean: ean,
                color: 'Standard',
                stock: quantite,
                is_default: true,
                supplier_reference: reference,
                last_stock_update: new Date().toISOString()
              });

            if (variantError) {
              report.errors.push(`Erreur création variante pour ${sku}: ${variantError.message}`);
            }

            // Enregistrer dans l'historique
            await supabase
              .from('stock_history')
              .insert({
                product_id: newProduct.id,
                ean: ean,
                sku: newProduct.sku,
                quantity_before: 0,
                quantity_after: quantite,
                price_ht: prixHT,
                source: 'CSV_ICELL4_AOUT_2025',
                import_date: new Date().toISOString()
              });
          }
        }
      } catch (error) {
        report.errors.push(`Erreur pour EAN ${ean}: ${error}`);
      }
    }

    // Marquer les produits sans stock comme out-of-stock
    const { error: updateError } = await supabase
      .from('products')
      .update({ status: 'out-of-stock' })
      .eq('stock_quantity', 0);

    if (updateError) {
      report.errors.push(`Erreur mise à jour statuts: ${updateError.message}`);
    }

  } catch (error) {
    report.errors.push(`Erreur générale: ${error}`);
  }

  return report;
}

// Exécution principale
async function main() {
  console.log('🚀 Démarrage de la synchronisation des stocks...\n');
  
  const report = await syncStockFromCSV();
  
  console.log('\n📊 === RAPPORT DE SYNCHRONISATION ===\n');
  console.log(`✅ Produits mis à jour: ${report.productsUpdated}`);
  console.log(`✨ Nouveaux produits créés: ${report.productsCreated}`);
  console.log(`📦 Variantes mises à jour: ${report.variantsUpdated}`);
  
  if (report.warnings.length > 0) {
    console.log(`\n⚠️ Avertissements (${report.warnings.length}):`);
    report.warnings.slice(0, 10).forEach(w => console.log(`  - ${w}`));
    if (report.warnings.length > 10) {
      console.log(`  ... et ${report.warnings.length - 10} autres`);
    }
  }
  
  if (report.errors.length > 0) {
    console.log(`\n❌ Erreurs (${report.errors.length}):`);
    report.errors.slice(0, 10).forEach(e => console.log(`  - ${e}`));
    if (report.errors.length > 10) {
      console.log(`  ... et ${report.errors.length - 10} autres`);
    }
  }
  
  console.log('\n✅ Synchronisation terminée!');
}

// Lancer si exécuté directement
if (require.main === module) {
  main().catch(console.error);
}

export { syncStockFromCSV };