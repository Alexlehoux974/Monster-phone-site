import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function auditAllProducts() {
  console.log('🔍 AUDIT COMPLET - TOUS LES PRODUITS\n');
  console.log('='.repeat(80));

  // Query 1: Statistics globales
  console.log('\n📊 STATISTIQUES GLOBALES\n');

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, short_description, status')
    .eq('status', 'active');

  if (productsError) {
    console.log('❌ Erreur récupération produits:', productsError.message);
    return;
  }

  const totalProducts = products.length;
  const withShortDesc = products.filter(p => p.short_description).length;
  const withoutShortDesc = products.filter(p => !p.short_description).length;

  console.log(`   Total produits actifs: ${totalProducts}`);
  console.log(`   ✅ Avec short_description: ${withShortDesc}`);
  console.log(`   ❌ Sans short_description: ${withoutShortDesc}`);

  // Query 2: Détail par produit avec sections CMS
  console.log('\n📋 DÉTAIL PAR PRODUIT (avec sections CMS)\n');

  const { data: detailedProducts, error: detailError } = await supabase
    .from('products')
    .select(`
      id,
      name,
      url_slug,
      short_description,
      brand_id,
      brands!products_brand_id_fkey(name),
      product_content_sections(id, section_type, is_enabled, display_order)
    `)
    .eq('status', 'active');

  if (detailError) {
    console.log('❌ Erreur récupération détails:', detailError.message);
    return;
  }

  const results: Record<string, any[]> = {};
  let completeProducts = 0;
  let incompleteProducts = 0;

  for (const product of detailedProducts) {
    const brandData = (product as any).brands;
    const brand = brandData?.name || 'Aucune marque';
    if (!results[brand]) results[brand] = [];

    const sections = (product as any).product_content_sections || [];
    const enabledSections = sections.filter((s: any) => s.is_enabled);
    const sectionCount = enabledSections.length;
    const hasShortDesc = !!product.short_description;
    const isComplete = hasShortDesc && sectionCount === 4;

    if (isComplete) {
      completeProducts++;
    } else {
      incompleteProducts++;
    }

    results[brand].push({
      name: product.name,
      slug: product.url_slug,
      shortDesc: hasShortDesc,
      sectionCount,
      sections: enabledSections.map((s: any) => s.section_type).sort(),
      isComplete
    });
  }

  // Affichage par marque
  for (const [brand, productList] of Object.entries(results)) {
    console.log(`\n🏷️  ${brand} (${productList.length} produits)`);

    for (const prod of productList) {
      const status = prod.isComplete ? '✅' : '⚠️';
      const shortDescStatus = prod.shortDesc ? '✅' : '❌';
      const sectionsStatus = prod.sectionCount === 4 ? '✅' : `⚠️ ${prod.sectionCount}/4`;

      console.log(`   ${status} ${prod.name}`);
      console.log(`      Short desc: ${shortDescStatus} | CMS: ${sectionsStatus}`);

      if (!prod.isComplete) {
        console.log(`      Sections: ${prod.sections.join(', ')}`);
      }
    }
  }

  // Query 3: Produits incomplets
  console.log('\n\n🚨 PRODUITS INCOMPLETS\n');

  const incompleteList = detailedProducts.filter((p: any) => {
    const sections = p.product_content_sections || [];
    const enabledSections = sections.filter((s: any) => s.is_enabled);
    const hasShortDesc = !!p.short_description;
    return !hasShortDesc || enabledSections.length < 4;
  });

  if (incompleteList.length === 0) {
    console.log('   ✅ Aucun produit incomplet détecté !');
  } else {
    for (const product of incompleteList) {
      const brandData = (product as any).brands;
      const brand = brandData?.name || 'Aucune marque';
      const sections = (product as any).product_content_sections || [];
      const enabledSections = sections.filter((s: any) => s.is_enabled);
      const sectionCount = enabledSections.length;
      const hasShortDesc = !!product.short_description;

      console.log(`   ❌ ${brand} - ${product.name}`);
      if (!hasShortDesc) console.log(`      Manque: short_description`);
      if (sectionCount < 4) console.log(`      Manque: ${4 - sectionCount} sections CMS`);
      console.log(`      Sections actuelles: ${enabledSections.map((s: any) => s.section_type).join(', ')}`);
    }
  }

  // Query 4: Vérification types de sections
  console.log('\n\n📝 VÉRIFICATION TYPES DE SECTIONS\n');

  const { data: sectionGroups, error: sectionsError } = await supabase
    .from('product_content_sections')
    .select('section_type')
    .eq('is_enabled', true);

  if (sectionsError) {
    console.log('❌ Erreur récupération sections:', sectionsError.message);
  } else if (sectionGroups) {
    const typeCounts: Record<string, number> = {};

    for (const section of sectionGroups) {
      typeCounts[section.section_type] = (typeCounts[section.section_type] || 0) + 1;
    }

    console.log('   Types de sections utilisés:');
    for (const [type, count] of Object.entries(typeCounts).sort()) {
      console.log(`      ${type}: ${count}`);
    }

    // Vérification ancien vs nouveau nommage
    const oldTypes = ['description', 'features', 'specifications', 'engagement'];
    const newTypes = ['description_card', 'specs_grid', 'features_list', 'engagement_card', 'image_gallery'];

    const hasOldTypes = oldTypes.some(t => typeCounts[t] > 0);
    const hasNewTypes = newTypes.some(t => typeCounts[t] > 0);

    if (hasOldTypes) {
      console.log('\n   ⚠️  ATTENTION: Anciens types de sections détectés!');
      oldTypes.forEach(type => {
        if (typeCounts[type]) {
          console.log(`      - "${type}" utilisé ${typeCounts[type]} fois`);
        }
      });
    }

    if (hasNewTypes) {
      console.log('\n   ✅ Nouveaux types de sections détectés');
    }
  }

  // Résumé final
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 RÉSUMÉ FINAL\n');
  console.log(`   Total produits actifs: ${totalProducts}`);
  console.log(`   ✅ Produits complets (short_desc + 4 sections): ${completeProducts}`);
  console.log(`   ⚠️  Produits incomplets: ${incompleteProducts}`);
  console.log(`\n   Complétude globale: ${Math.round((completeProducts / totalProducts) * 100)}%`);
  console.log('\n');
}

auditAllProducts();
