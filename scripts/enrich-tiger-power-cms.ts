import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Contenu CMS sourcé pour TIGER POWER - Source: Ascendeo
const tigerPowerCMS = {
  description_card: {
    title: 'Description',
    content: `<p>Le <strong>Câble TIGER POWER Lite 6-en-1 avec Apple Watch</strong> est la solution ultime tout-en-un pour charger tous vos appareils Apple et USB-C. Ce câble unique remplace 6 câbles différents grâce à ses multiples connecteurs intégrés.</p>

<p>Construction en <strong>nylon tressé</strong> ultra-résistante supportant jusqu'à <strong>10kg de traction</strong>. Le câble offre une <strong>sortie USB-C de 60W</strong> pour charger rapidement MacBook, iPad Pro et autres laptops, une <strong>sortie Lightning de 12W</strong> pour iPhone et iPad, et une <strong>sortie Apple Watch de 5W</strong> pour charge magnétique de votre montre.</p>

<p>Compatible <strong>USB 2.0 à 480Mb/s</strong> pour synchronisation de données rapide pendant la charge. La longueur de <strong>1 mètre</strong> offre un confort d'utilisation optimal. Dimensions compactes de <strong>30x80x165mm</strong> pour seulement <strong>90 grammes</strong>.</p>

<p>Idéal pour les utilisateurs de l'écosystème Apple possédant iPhone, iPad, MacBook et Apple Watch. Un seul câble élimine l'encombrement et simplifie vos déplacements et voyages.</p>`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '🔌', label: 'CONNECTEURS', value: '6-en-1', details: 'USB-C + Lightning + Watch' },
        { icon: '⚡', label: 'USB-C', value: '60W max', details: 'Charge laptops' },
        { icon: '📱', label: 'LIGHTNING', value: '12W max', details: 'iPhone/iPad' },
        { icon: '⌚', label: 'APPLE WATCH', value: '5W', details: 'Charge magnétique' },
        { icon: '🔄', label: 'TRANSFERT', value: 'USB 2.0', details: '480Mb/s' },
        { icon: '📏', label: 'LONGUEUR', value: '1 mètre', details: 'Pratique' },
        { icon: '💪', label: 'RÉSISTANCE', value: '10kg', details: 'Nylon tressé' },
        { icon: '📦', label: 'FORMAT', value: '30x80x165mm', details: '90g compact' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🔌', text: 'Câble 6-en-1 - USB-C 60W + Lightning 12W + Apple Watch 5W' },
        { icon: '💪', text: 'Nylon tressé ultra-résistant - Supporte 10kg de traction' },
        { icon: '⚡', text: 'Charge puissante - 60W USB-C pour MacBook, 12W Lightning iPhone' },
        { icon: '⌚', text: 'Apple Watch intégré - Charge magnétique 5W sans câble séparé' },
        { icon: '🔄', text: 'Sync + charge - USB 2.0 à 480Mb/s pour transfert données' },
        { icon: '✈️', text: 'Parfait voyage - Un seul câble remplace 6 câbles différents' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Câble ?',
    content: `<p>Le <strong>Câble TIGER POWER Lite 6-en-1</strong> est l'accessoire essentiel pour tout utilisateur Apple. Un seul câble remplace tous vos câbles de charge pour iPhone, iPad, MacBook et Apple Watch, simplifiant radicalement votre setup quotidien et vos voyages.</p>

<p><strong>Solution tout-en-un Apple</strong> - Chargez tous vos appareils Apple avec un seul câble.</p>

<p><strong>Construction premium</strong> - Nylon tressé résistant 10kg, durabilité exceptionnelle.</p>

<p><strong>Puissance complète</strong> - 60W USB-C pour laptop, 12W Lightning, 5W Apple Watch.</p>`,
    layout_variant: 'text-left-image-right'
  }
};

async function enrichTigerPowerCMS() {
  console.log('🔧 ENRICHISSEMENT CMS TIGER POWER\n');
  console.log('='.repeat(80));

  const { data: brand, error: brandError } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%tiger%power%')
    .single();

  if (brandError || !brand) {
    console.log('❌ Marque TIGER POWER introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  const { data: product } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .eq('brand_id', brand.id)
    .eq('url_slug', 'cable-tiger-power-lite-6-en-1-avec-apple-watch')
    .single();

  if (!product) {
    console.log('❌ Produit TIGER POWER 6-en-1 introuvable');
    return;
  }

  console.log(`📱 ${product.name}`);
  console.log(`   Slug: ${product.url_slug}`);

  console.log(`\n🗑️  Suppression des anciennes sections...`);
  const { error: deleteError } = await supabase
    .from('product_content_sections')
    .delete()
    .eq('product_id', product.id);

  if (deleteError) {
    console.log(`   ❌ Erreur suppression: ${deleteError.message}`);
    return;
  }
  console.log(`   ✅ Anciennes sections supprimées`);

  console.log(`\n📝 Création des 4 sections avec contenu sourcé...`);

  const sections = [
    {
      product_id: product.id,
      section_type: 'description_card',
      title: tigerPowerCMS.description_card.title,
      content: tigerPowerCMS.description_card.content,
      images: [],
      is_enabled: true,
      display_order: 1,
      layout_variant: tigerPowerCMS.description_card.layout_variant,
      metadata: {}
    },
    {
      product_id: product.id,
      section_type: 'specs_grid',
      title: tigerPowerCMS.specs_grid.title,
      content: '',
      images: [],
      is_enabled: true,
      display_order: 2,
      layout_variant: tigerPowerCMS.specs_grid.layout_variant,
      metadata: tigerPowerCMS.specs_grid.metadata
    },
    {
      product_id: product.id,
      section_type: 'features_list',
      title: tigerPowerCMS.features_list.title,
      content: '',
      images: [],
      is_enabled: true,
      display_order: 3,
      layout_variant: tigerPowerCMS.features_list.layout_variant,
      metadata: tigerPowerCMS.features_list.metadata
    },
    {
      product_id: product.id,
      section_type: 'engagement_card',
      title: tigerPowerCMS.engagement_card.title,
      content: tigerPowerCMS.engagement_card.content,
      images: [],
      is_enabled: true,
      display_order: 4,
      layout_variant: tigerPowerCMS.engagement_card.layout_variant,
      metadata: {}
    }
  ];

  const { error: insertError } = await supabase
    .from('product_content_sections')
    .insert(sections);

  if (insertError) {
    console.log(`   ❌ Erreur création sections: ${insertError.message}`);
    return;
  }

  console.log(`   ✅ 4 sections créées avec succès`);

  const { data: finalSections } = await supabase
    .from('product_content_sections')
    .select('section_type')
    .eq('product_id', product.id);

  const sectionCount = finalSections?.length || 0;
  console.log(`\n📊 Vérification finale: ${sectionCount}/4 sections`);

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ ENRICHISSEMENT CMS TIGER POWER TERMINÉ\n');
}

enrichTigerPowerCMS();
