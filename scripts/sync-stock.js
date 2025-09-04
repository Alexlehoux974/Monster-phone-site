const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const { parse } = require('csv-parse/sync');

// Configuration Supabase
const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncStockFromCSV() {
  const report = {
    productsUpdated: 0,
    variantsUpdated: 0,
    errors: [],
    warnings: [],
    newProducts: []
  };

  try {
    // Lire le fichier CSV
    const csvPath = '/root/Monster-Phone-Images/STOCK_BOUTIQUE_ICELL4_AOUT_2025.csv';
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    
    // Parser le CSV
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ',',
      bom: true
    });

    console.log(`📊 Traitement de ${records.length} lignes du CSV...`);

    // Traiter chaque ligne du CSV
    for (const row of records) {
      // Ignorer les lignes de total et les lignes sans EAN
      if (!row['EAN'] || row['MODELE']?.includes('TOTAL') || row['EAN'] === '0') {
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
      const indiceReparabilite = row['INDICE REPARABILITE'] ? parseFloat(row['INDICE REPARABILITE']) : null;
      const dasTete = row['DAS tête']?.trim() || null;
      const dasCorps = row['DAS Corps']?.trim() || null;
      const dasMembre = row['Das Membre']?.trim() || null;

      try {
        // Chercher d'abord par EAN dans les variantes
        const { data: existingVariant, error: searchError } = await supabase
          .from('product_variants')
          .select('id, product_id, stock, products(id, sku, name, stock_quantity)')
          .eq('ean', ean)
          .single();

        if (searchError && searchError.code !== 'PGRST116') {
          report.errors.push(`Erreur recherche EAN ${ean}: ${searchError.message}`);
          continue;
        }

        if (existingVariant && existingVariant.product_id) {
          // Enregistrer l'ancien stock dans l'historique
          const oldStock = existingVariant.stock || 0;
          
          // Mise à jour du stock de la variante existante
          const { error: variantError } = await supabase
            .from('product_variants')
            .update({
              stock: quantite,
              last_stock_update: new Date().toISOString(),
              supplier_reference: reference || null
            })
            .eq('id', existingVariant.id);

          if (variantError) {
            report.errors.push(`Erreur mise à jour variante ${ean}: ${variantError.message}`);
          } else {
            report.variantsUpdated++;
            console.log(`✅ Variante mise à jour: ${ean} (${oldStock} → ${quantite})`);
          }

          // Mise à jour du produit principal
          const updateData = {
            stock_quantity: quantite,
            status: quantite > 0 ? 'active' : 'out-of-stock',
            updated_at: new Date().toISOString()
          };

          // Ajouter les nouvelles données si elles existent
          if (prixHT > 0) updateData.unit_price_ht = prixHT;
          if (d3e > 0) updateData.d3e_tax = d3e;
          if (tva >= 0) updateData.tva_rate = tva;
          if (classeEnergetique && classeEnergetique !== '') updateData.energy_class = classeEnergetique;
          if (indiceReparabilite && indiceReparabilite > 0) updateData.repairability_index = indiceReparabilite;
          if (dasTete && dasTete !== '') updateData.das_head = dasTete;
          if (dasCorps && dasCorps !== '') updateData.das_body = dasCorps;
          if (dasMembre && dasMembre !== '' && dasMembre !== 'NC') updateData.das_limb = dasMembre;

          const { error: productError } = await supabase
            .from('products')
            .update(updateData)
            .eq('id', existingVariant.product_id);

          if (productError) {
            report.errors.push(`Erreur mise à jour produit: ${productError.message}`);
          } else {
            report.productsUpdated++;
          }

          // Enregistrer dans l'historique
          await supabase
            .from('stock_history')
            .insert({
              product_id: existingVariant.product_id,
              variant_id: existingVariant.id,
              ean: ean,
              sku: existingVariant.products?.sku,
              quantity_before: oldStock,
              quantity_after: quantite,
              price_ht: prixHT || null,
              source: 'CSV_ICELL4_AOUT_2025',
              import_date: new Date().toISOString()
            });

        } else {
          // Produit non trouvé - l'ajouter à la liste des nouveaux produits
          report.newProducts.push({
            ean: ean,
            modele: modele,
            reference: reference,
            quantite: quantite,
            prix_ht: prixHT,
            pvc: pvc
          });
          report.warnings.push(`Nouveau produit détecté: ${ean} - ${modele}`);
        }
      } catch (error) {
        report.errors.push(`Erreur pour EAN ${ean}: ${error.message}`);
      }
    }

  } catch (error) {
    report.errors.push(`Erreur générale: ${error.message}`);
  }

  return report;
}

// Exécution principale
async function main() {
  console.log('🚀 Démarrage de la synchronisation des stocks...\n');
  
  const startTime = Date.now();
  const report = await syncStockFromCSV();
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log('\n📊 === RAPPORT DE SYNCHRONISATION ===\n');
  console.log(`⏱️ Durée: ${duration} secondes`);
  console.log(`✅ Produits mis à jour: ${report.productsUpdated}`);
  console.log(`📦 Variantes mises à jour: ${report.variantsUpdated}`);
  console.log(`🆕 Nouveaux produits détectés: ${report.newProducts.length}`);
  
  if (report.newProducts.length > 0) {
    console.log(`\n🆕 Nouveaux produits (non créés - nécessitent une action manuelle):`);
    report.newProducts.slice(0, 10).forEach(p => {
      console.log(`  - EAN: ${p.ean} | ${p.modele} | Stock: ${p.quantite} | Prix: ${p.pvc}€`);
    });
    if (report.newProducts.length > 10) {
      console.log(`  ... et ${report.newProducts.length - 10} autres`);
    }
  }
  
  if (report.warnings.length > 0) {
    console.log(`\n⚠️ Avertissements (${report.warnings.length}):`);
    report.warnings.slice(0, 5).forEach(w => console.log(`  - ${w}`));
    if (report.warnings.length > 5) {
      console.log(`  ... et ${report.warnings.length - 5} autres`);
    }
  }
  
  if (report.errors.length > 0) {
    console.log(`\n❌ Erreurs (${report.errors.length}):`);
    report.errors.slice(0, 5).forEach(e => console.log(`  - ${e}`));
    if (report.errors.length > 5) {
      console.log(`  ... et ${report.errors.length - 5} autres`);
    }
  }
  
  console.log('\n✅ Synchronisation terminée!');
  
  // Sauvegarder le rapport dans un fichier
  const reportPath = `/root/monster-phone-dev/monster-phone-boutique/sync-report-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Rapport sauvegardé dans: ${reportPath}`);
}

// Lancer si exécuté directement
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { syncStockFromCSV };