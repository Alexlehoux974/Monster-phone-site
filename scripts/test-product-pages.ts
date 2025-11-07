import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Sélection de 5 produits pour test (différentes marques)
const TEST_PRODUCTS = [
  'powerbank-abyx-10k-mah',              // ABYX
  'cable-lumineux-my-way-usb-a-lightning', // MY WAY
  'cable-tiger-power-lite-6-en-1-avec-apple-watch', // TIGER POWER
  'monster-illuminescence-smart-beam-2x-bars-rgb-ic-sound-reactive', // MONSTER
  'hifuture-futurego-comfort-ecout-sans-fil-bt-5-3-oreillette-mic-blanc' // HIFUTURE
];

async function testProductPages() {
  console.log('📱 TEST PAGES PRODUIT INDIVIDUELLES\n');
  console.log('='.repeat(80));

  let totalProducts = 0;
  let validProducts = 0;
  let issuesFound: string[] = [];

  for (const slug of TEST_PRODUCTS) {
    totalProducts++;

    console.log(`\n🔍 Test produit: ${slug}\n`);

    // Récupérer le produit (comme dans la vraie page produit)
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('url_slug', slug)
      .eq('status', 'active')
      .single();

    if (error || !product) {
      console.log(`   ❌ Produit introuvable: ${slug}`);
      issuesFound.push(`${slug}: Produit introuvable`);
      continue;
    }

    console.log(`   ✅ Produit trouvé: ${product.name}`);

    // Récupérer la marque
    const { data: brand } = await supabase
      .from('brands')
      .select('*')
      .eq('id', product.brand_id)
      .single();

    console.log(`   🏷️  Marque: ${brand?.name || 'N/A'}`);

    // Vérifier short_description
    const hasShortDesc = !!product.short_description;
    console.log(`   📝 Short description: ${hasShortDesc ? '✅' : '❌'}`);
    if (!hasShortDesc) {
      issuesFound.push(`${slug}: Manque short_description`);
    }

    // Récupérer les sections CMS
    const { data: sections, error: sectionsError } = await supabase
      .from('product_content_sections')
      .select('*')
      .eq('product_id', product.id)
      .eq('is_enabled', true)
      .order('display_order', { ascending: true });

    if (sectionsError) {
      console.log(`   ❌ Erreur récupération sections CMS:`, sectionsError.message);
      issuesFound.push(`${slug}: Erreur récupération CMS`);
      continue;
    }

    const sectionCount = sections?.length || 0;
    console.log(`\n   📊 Sections CMS: ${sectionCount}/4`);

    if (sectionCount < 4) {
      console.log(`   ⚠️  Manque ${4 - sectionCount} sections`);
      issuesFound.push(`${slug}: Seulement ${sectionCount}/4 sections`);
    }

    // Vérifier chaque type de section
    const sectionTypes = sections?.map(s => s.section_type) || [];
    const requiredTypes = ['description_card', 'specs_grid', 'features_list', 'engagement_card'];

    for (const type of requiredTypes) {
      const hasType = sectionTypes.includes(type);
      const status = hasType ? '✅' : '❌';
      console.log(`      ${status} ${type}`);

      if (!hasType) {
        issuesFound.push(`${slug}: Manque section ${type}`);
      }
    }

    // Vérifier le contenu de chaque section
    let allSectionsValid = true;
    for (const section of sections || []) {
      const hasTitle = !!section.title;
      const hasContent = section.section_type === 'specs_grid' || section.section_type === 'features_list'
        ? !!section.metadata && Object.keys(section.metadata).length > 0
        : !!section.content;

      if (!hasTitle || !hasContent) {
        allSectionsValid = false;
        console.log(`   ⚠️  Section ${section.section_type} incomplète (title: ${hasTitle}, content: ${hasContent})`);
        issuesFound.push(`${slug}: Section ${section.section_type} incomplète`);
      }
    }

    // Verdict final pour ce produit
    const isValid = hasShortDesc && sectionCount === 4 && allSectionsValid;
    if (isValid) {
      validProducts++;
      console.log(`\n   ✅ PRODUIT VALIDE - Structure complète`);
    } else {
      console.log(`\n   ⚠️  PRODUIT INCOMPLET - Des problèmes détectés`);
    }
  }

  // Résumé global
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 RÉSUMÉ TEST PAGES PRODUIT\n');
  console.log(`   Total produits testés: ${totalProducts}`);
  console.log(`   ✅ Produits valides: ${validProducts}/${totalProducts}`);
  console.log(`   ⚠️  Produits avec problèmes: ${issuesFound.length}`);

  if (issuesFound.length > 0) {
    console.log('\n🚨 PROBLÈMES DÉTECTÉS:\n');
    issuesFound.forEach(issue => console.log(`   - ${issue}`));
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ TEST PAGES PRODUIT TERMINÉ\n');
}

testProductPages();
