import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Contenu CMS sourcé pour ABYX Powerbank 10K mAh - Source: Boulanger, La Redoute, Auchan
const abyxCMS = {
  description_card: {
    title: 'Description',
    content: `<p>La <strong>Batterie Externe ABYX 10000mAh</strong> est la solution de secours idéale pour recharger vos appareils mobiles partout où vous allez. Compacte et légère avec ses 217g, elle se glisse facilement dans votre sac ou poche.</p>

<p>Dotée d'une <strong>batterie Lithium-ion Polymère de 37Wh</strong>, cette powerbank offre une capacité de 10000mAh permettant de recharger un smartphone jusqu'à 4 fois complètement. Elle dispose de 3 ports de sortie : <strong>2 USB-A et 1 USB-C</strong> avec une puissance de 2.4A par port, permettant de charger plusieurs appareils simultanément.</p>

<p>L'<strong>écran digital</strong> intégré affiche le niveau de charge en temps réel, vous permettant de savoir exactement combien d'énergie reste disponible. Le temps de recharge complet de la batterie externe varie entre 2 et 4 heures selon l'adaptateur utilisé.</p>

<p>Compatible avec tous les petits appareils se chargeant via USB : smartphones, lecteurs MP3, GPS, et plus encore. Livrée avec un <strong>câble USB Type-C</strong> et garantie 2 ans.</p>`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '🔋', label: 'CAPACITÉ', value: '10000 mAh', details: 'Li-Polymer 37Wh' },
        { icon: '⚡', label: 'PORTS', value: '2 USB-A + USB-C', details: '2.4A par port' },
        { icon: '📱', label: 'RECHARGES', value: '4x smartphone', details: 'Charge multiple' },
        { icon: '📊', label: 'ÉCRAN', value: 'Digital LED', details: 'Niveau en temps réel' },
        { icon: '⏱️', label: 'TEMPS CHARGE', value: '2-4 heures', details: 'Charge complète' },
        { icon: '📏', label: 'DIMENSIONS', value: '6.8 x 14.3 cm', details: 'Épaisseur 1.6cm' },
        { icon: '⚖️', label: 'POIDS', value: '217 grammes', details: 'Ultra-compact' },
        { icon: '🎨', label: 'COULEUR', value: 'Noir', details: 'Finition mate' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🔋', text: 'Capacité 10000mAh - 4 recharges complètes de smartphone' },
        { icon: '📊', text: 'Écran digital - Affichage niveau de charge en temps réel' },
        { icon: '⚡', text: 'Triple sortie - 2 USB-A + 1 USB-C pour charger 3 appareils' },
        { icon: '🔌', text: 'Charge rapide - 2.4A par port pour recharge optimale' },
        { icon: '📦', text: 'Compact et léger - 217g seulement, facile à transporter' },
        { icon: '✅', text: 'Garantie 2 ans - Qualité et fiabilité assurées' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `<p>La <strong>Batterie Externe ABYX 10000mAh</strong> est le choix idéal pour ne jamais tomber en panne de batterie, où que vous soyez. Avec sa capacité de 10000mAh, elle offre jusqu'à 4 recharges complètes d'un smartphone, parfaite pour les voyages, déplacements professionnels ou simplement au quotidien.</p>

<p><strong>Écran digital pratique</strong> - Suivez précisément le niveau de charge restant.</p>

<p><strong>Polyvalence maximale</strong> - 3 ports de sortie pour charger plusieurs appareils simultanément.</p>

<p><strong>Prix imbattable</strong> - Seulement 19.99€ pour une powerbank complète avec câble USB-C inclus et garantie 2 ans.</p>`,
    layout_variant: 'text-left-image-right'
  }
};

async function enrichAbyxCMS() {
  console.log('🔧 ENRICHISSEMENT CMS ABYX POWERBANK 10K MAH\n');
  console.log('='.repeat(80));

  // 1. Récupérer la marque ABYX
  const { data: brand, error: brandError } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%abyx%')
    .single();

  if (brandError || !brand) {
    console.log('❌ Marque ABYX introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // 2. Récupérer le produit ABYX Powerbank
  const { data: product } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .eq('brand_id', brand.id)
    .eq('url_slug', 'powerbank-abyx-10k-mah')
    .single();

  if (!product) {
    console.log('❌ Produit ABYX Powerbank 10K mAh introuvable');
    return;
  }

  console.log(`📱 ${product.name}`);
  console.log(`   Slug: ${product.url_slug}`);

  // 3. Supprimer toutes les anciennes sections CMS
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

  // 4. Créer les 4 nouvelles sections avec contenu sourcé
  console.log(`\n📝 Création des 4 sections avec contenu sourcé...`);

  const sections = [
    {
      product_id: product.id,
      section_type: 'description_card',
      title: abyxCMS.description_card.title,
      content: abyxCMS.description_card.content,
      images: [],
      is_enabled: true,
      display_order: 1,
      layout_variant: abyxCMS.description_card.layout_variant,
      metadata: {}
    },
    {
      product_id: product.id,
      section_type: 'specs_grid',
      title: abyxCMS.specs_grid.title,
      content: '',
      images: [],
      is_enabled: true,
      display_order: 2,
      layout_variant: abyxCMS.specs_grid.layout_variant,
      metadata: abyxCMS.specs_grid.metadata
    },
    {
      product_id: product.id,
      section_type: 'features_list',
      title: abyxCMS.features_list.title,
      content: '',
      images: [],
      is_enabled: true,
      display_order: 3,
      layout_variant: abyxCMS.features_list.layout_variant,
      metadata: abyxCMS.features_list.metadata
    },
    {
      product_id: product.id,
      section_type: 'engagement_card',
      title: abyxCMS.engagement_card.title,
      content: abyxCMS.engagement_card.content,
      images: [],
      is_enabled: true,
      display_order: 4,
      layout_variant: abyxCMS.engagement_card.layout_variant,
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

  // 5. Vérification finale
  const { data: finalSections } = await supabase
    .from('product_content_sections')
    .select('section_type')
    .eq('product_id', product.id);

  const sectionCount = finalSections?.length || 0;
  console.log(`\n📊 Vérification finale: ${sectionCount}/4 sections`);

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ ENRICHISSEMENT CMS ABYX TERMINÉ\n');
}

enrichAbyxCMS();
