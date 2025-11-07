import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Contenu CMS sourcé pour Nokia 110 4G 2025
const nokia110CMS = {
  description_card: {
    title: 'Description',
    content: `<p>Le <strong>Nokia 110 4G 2025</strong> est un téléphone mobile feature phone conçu pour l'essentiel : appels, SMS et quelques fonctionnalités pratiques dans un format compact et économique. Avec son écran couleur de 2.0 pouces (240 x 320 pixels), ce mobile offre une interface claire et lisible pour la navigation dans les menus.</p>

<p>La batterie Li-Ion de 1000 mAh offre jusqu'à 31.5 jours en veille et 8.3 heures de temps de conversation, idéale pour ceux qui recherchent un téléphone fiable avec une autonomie exceptionnelle. La connectivité 4G avec HD Voice apporte une qualité d'appel cristalline, tandis que le revêtement en céramique offre une finition premium et durable.</p>

<p>Avec 64 MB de stockage (extensible via microSD jusqu'à 32GB) et 128 MB de RAM, le Nokia 110 4G intègre radio FM, lecteur MP3, appareil photo VGA pour les souvenirs basiques, et même le jeu culte Snake pour des moments de détente. Un téléphone simple, efficace et abordable à 34.99€.</p>`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '📱', label: 'TYPE', value: 'Feature Phone', details: '4G LTE' },
        { icon: '📺', label: 'ÉCRAN', value: '2.0 pouces', details: '240 x 320 px' },
        { icon: '🔋', label: 'BATTERIE', value: '1000 mAh', details: '31.5j veille' },
        { icon: '📞', label: 'APPELS', value: 'HD Voice', details: '8.3h conversation' },
        { icon: '💾', label: 'STOCKAGE', value: '64 MB', details: '+32GB microSD' },
        { icon: '🎵', label: 'AUDIO', value: 'FM + MP3', details: 'Radio intégrée' },
        { icon: '📷', label: 'PHOTO', value: 'VGA', details: 'Appareil basique' },
        { icon: '🎮', label: 'JEUX', value: 'Snake', details: 'Jeu culte Nokia' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🔋', text: 'Autonomie record - 31.5 jours en veille, 8.3h conversation' },
        { icon: '📞', text: 'HD Voice 4G - Qualité d\'appel cristalline' },
        { icon: '💪', text: 'Finition céramique - Revêtement premium et résistant' },
        { icon: '🎵', text: 'Radio FM + MP3 - Divertissement sans connexion' },
        { icon: '💳', text: 'MicroSD 32GB - Extensible pour photos et musique' },
        { icon: '🎮', text: 'Snake inclus - Nostalgie gaming Nokia' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `<p>Le Nokia 110 4G 2025 est le choix intelligent pour ceux qui recherchent un téléphone mobile simple, fiable et abordable à 34.99€. Son autonomie exceptionnelle de 31.5 jours en veille en fait le compagnon idéal pour les situations d'urgence, comme téléphone secondaire, ou pour les personnes âgées qui n'ont pas besoin de smartphone.</p>

<p><strong>Simplicité d'usage</strong> - Interface intuitive sans complications.</p>

<p><strong>Autonomie record</strong> - Plus d'un mois en veille pour tranquillité totale.</p>

<p><strong>Qualité Nokia</strong> - Finition céramique et fiabilité légendaire.</p>`,
    layout_variant: 'text-left-image-right'
  }
};

async function enrichNokiaCMS() {
  console.log('🔧 ENRICHISSEMENT CMS NOKIA 110 4G\n');
  console.log('='.repeat(80));

  // 1. Récupérer la marque NOKIA
  const { data: brand, error: brandError } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%nokia%')
    .single();

  if (brandError || !brand) {
    console.log('❌ Marque NOKIA introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // 2. Récupérer le produit Nokia 110 4G
  const { data: product } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .eq('brand_id', brand.id)
    .eq('url_slug', 'nokia-110-4g-2025')
    .single();

  if (!product) {
    console.log('❌ Produit Nokia 110 4G 2025 introuvable');
    return;
  }

  console.log(`📱 ${product.name}`);
  console.log(`   Slug: ${product.url_slug}`);

  // 3. Supprimer toutes les anciennes sections CMS (les 5 sections actuelles)
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
  console.log(`\n📝 Création des 4 nouvelles sections avec contenu sourcé...`);

  const sections = [
    {
      product_id: product.id,
      section_type: 'description_card',
      title: nokia110CMS.description_card.title,
      content: nokia110CMS.description_card.content,
      images: [],
      is_enabled: true,
      display_order: 1,
      layout_variant: nokia110CMS.description_card.layout_variant,
      metadata: {}
    },
    {
      product_id: product.id,
      section_type: 'specs_grid',
      title: nokia110CMS.specs_grid.title,
      content: '',
      images: [],
      is_enabled: true,
      display_order: 2,
      layout_variant: nokia110CMS.specs_grid.layout_variant,
      metadata: nokia110CMS.specs_grid.metadata
    },
    {
      product_id: product.id,
      section_type: 'features_list',
      title: nokia110CMS.features_list.title,
      content: '',
      images: [],
      is_enabled: true,
      display_order: 3,
      layout_variant: nokia110CMS.features_list.layout_variant,
      metadata: nokia110CMS.features_list.metadata
    },
    {
      product_id: product.id,
      section_type: 'engagement_card',
      title: nokia110CMS.engagement_card.title,
      content: nokia110CMS.engagement_card.content,
      images: [],
      is_enabled: true,
      display_order: 4,
      layout_variant: nokia110CMS.engagement_card.layout_variant,
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
  console.log('\n✅ ENRICHISSEMENT CMS NOKIA TERMINÉ\n');
}

enrichNokiaCMS();
