import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Contenu CMS pour les casques MUVIT enfants
const casquesMuvitCMS = {
  description_card: {
    title: 'Description',
    content: `Le casque Bluetooth sans fil MUVIT pour enfants combine sécurité auditive et confort d'utilisation. Conçu spécialement pour les jeunes utilisateurs, il intègre une limitation du volume sonore à 85dB, respectant ainsi les recommandations des professionnels de santé pour la protection de l'ouïe des enfants.

Son design pliable facilite le transport et le rangement, tandis que ses coussinets ergonomiques assurent un confort optimal même lors d'une utilisation prolongée. La connexion Bluetooth permet une liberté de mouvement totale, et la batterie rechargeable via USB-C offre une autonomie adaptée aux besoins quotidiens.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '🎧', label: 'TYPE', value: 'Casque Bluetooth', details: 'Sans fil pour enfants' },
        { icon: '🔊', label: 'VOLUME MAX', value: '85dB', details: 'Limitation sécurité auditive' },
        { icon: '📡', label: 'CONNECTIVITÉ', value: 'Bluetooth', details: 'Sans fil' },
        { icon: '🔋', label: 'BATTERIE', value: 'Rechargeable', details: 'Via port USB-C' },
        { icon: '📦', label: 'DESIGN', value: 'Pliable', details: 'Compact et transportable' },
        { icon: '🛋️', label: 'CONFORT', value: 'Coussinets', details: 'Ergonomiques et doux' },
        { icon: '👶', label: 'ÂGE', value: 'Enfants', details: 'Adapté aux jeunes' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🔒', text: 'Protection auditive - Limitation à 85dB pour préserver l\'ouïe des enfants' },
        { icon: '📡', text: 'Connexion Bluetooth - Liberté de mouvement sans fil' },
        { icon: '🔋', text: 'Autonomie optimale - Batterie rechargeable longue durée' },
        { icon: '💼', text: 'Design pliable - Facile à transporter et ranger' },
        { icon: '🛋️', text: 'Confort maximum - Coussinets ergonomiques pour utilisation prolongée' },
        { icon: '⚡', text: 'Charge rapide - Port USB-C pour recharge simple et rapide' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Choisir un casque MUVIT pour votre enfant, c'est privilégier sa sécurité auditive sans compromis sur la qualité sonore. La limitation à 85dB garantit une écoute sûre, conforme aux recommandations des pédiatres et audiologistes.

**Conçu pour les enfants** - Design adapté, confortable et robuste pour résister à l'usage quotidien.

**Technologie moderne** - Connexion Bluetooth stable et batterie rechargeable pour une utilisation autonome.

**Tranquillité d'esprit** - Garantie constructeur 2 ans et service client réactif à La Réunion.`,
    layout_variant: 'text-left-image-right'
  }
};

// Contenu CMS pour l'appareil photo KIDPIC
const kidpicCMS = {
  description_card: {
    title: 'Description',
    content: `L'appareil photo numérique MUVIT KIDPIC révolutionne la créativité des enfants avec son système d'impression thermique instantanée. Équipé d'un capteur 12 mégapixels et d'un écran 2 pouces, il permet aux jeunes photographes de capturer, visualiser et imprimer leurs souvenirs immédiatement.

Les filtres amusants intégrés stimulent la créativité, tandis que la fonction vidéo offre encore plus de possibilités d'expression. La technologie d'impression thermique ne nécessite aucune encre, rendant l'utilisation simple et économique. Rechargeable via USB, le KIDPIC accompagne les enfants dans toutes leurs aventures créatives.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '📷', label: 'CAPTEUR', value: '12 MP', details: 'Haute résolution' },
        { icon: '📺', label: 'ÉCRAN', value: '2 pouces', details: 'Affichage couleur' },
        { icon: '🖨️', label: 'IMPRESSION', value: 'Thermique', details: 'Instantanée sans encre' },
        { icon: '🎨', label: 'FILTRES', value: 'Multiples', details: 'Effets amusants' },
        { icon: '🎥', label: 'VIDÉO', value: 'Oui', details: 'Enregistrement vidéo' },
        { icon: '🔋', label: 'BATTERIE', value: 'Rechargeable', details: 'Via port USB' },
        { icon: '👶', label: 'ÂGE', value: 'Enfants', details: 'Interface simplifiée' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '📸', text: 'Impression instantanée - Photos imprimées immédiatement sans attendre' },
        { icon: '🎨', text: 'Filtres créatifs - Effets amusants pour stimuler la créativité' },
        { icon: '💡', text: 'Sans encre - Technologie thermique économique et écologique' },
        { icon: '📹', text: 'Photo et vidéo - Double fonctionnalité pour plus de possibilités' },
        { icon: '👀', text: 'Écran intégré - Visualisation immédiate avant impression' },
        { icon: '🔌', text: 'Rechargeable USB - Autonomie optimale pour longues sessions' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Le KIDPIC MUVIT transforme chaque moment en souvenir tangible. Les enfants développent leur sens artistique tout en créant des photos qu'ils peuvent partager instantanément avec leur famille et amis.

**Créativité stimulée** - Filtres amusants et impression instantanée encouragent l'expression artistique.

**Technologie simple** - Interface intuitive adaptée aux enfants, impression sans encre.

**Souvenirs durables** - Photos imprimées de qualité pour créer des albums physiques.`,
    layout_variant: 'text-left-image-right'
  }
};

// Contenu CMS pour les rouleaux papier KIDPIC
const rouleauxCMS = {
  description_card: {
    title: 'Description',
    content: `Les rouleaux de papier photo thermique MUVIT sont spécialement conçus pour l'appareil photo KIDPIC. Ce pack de 5 rouleaux garantit des impressions de qualité grâce à la technologie thermique qui ne nécessite aucune encre.

Le format autocollant des photos permet aux enfants de créer facilement des albums, de décorer leurs cahiers ou de partager leurs créations. Chaque rouleau offre de nombreuses impressions, assurant une utilisation prolongée sans interruption des sessions créatives.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '📦', label: 'QUANTITÉ', value: '5 rouleaux', details: 'Pack économique' },
        { icon: '🖨️', label: 'TYPE', value: 'Thermique', details: 'Impression sans encre' },
        { icon: '📱', label: 'COMPATIBILITÉ', value: 'KIDPIC', details: 'Appareil photo MUVIT' },
        { icon: '✨', label: 'QUALITÉ', value: 'Premium', details: 'Rendu optimal' },
        { icon: '📏', label: 'FORMAT', value: 'Standard', details: 'Taille adaptée' },
        { icon: '🎨', label: 'TYPE', value: 'Autocollant', details: 'Adhésif au dos' },
        { icon: '♻️', label: 'TECHNOLOGIE', value: 'Sans encre', details: 'Écologique' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '📦', text: 'Pack de 5 rouleaux - Stock suffisant pour de nombreuses impressions' },
        { icon: '🖨️', text: 'Impression thermique - Technologie sans encre, simple et propre' },
        { icon: '✨', text: 'Qualité optimale - Rendu fidèle des couleurs et détails' },
        { icon: '🎨', text: 'Format autocollant - Créez facilement albums et décorations' },
        { icon: '♻️', text: 'Écologique - Pas d\'encre, moins de déchets' },
        { icon: '🔄', text: 'Compatible KIDPIC - Parfaitement adapté à votre appareil' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Les rouleaux papier MUVIT assurent la continuité des sessions créatives de vos enfants avec leur appareil KIDPIC. La technologie thermique garantit une qualité constante sans les contraintes de l'encre.

**Stock généreux** - 5 rouleaux pour de longues périodes d'utilisation sans réapprovisionnement.

**Qualité constante** - Impression fiable et rendu optimal à chaque photo.

**Format pratique** - Autocollants pour créer albums, décorations et partager facilement.`,
    layout_variant: 'text-left-image-right'
  }
};

async function enrichMuvitCMS() {
  console.log('🎨 ENRICHISSEMENT CMS PRODUITS MUVIT\n');
  console.log('='.repeat(80));

  // Récupérer la marque MUVIT
  const { data: brand } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%muvit%')
    .single();

  if (!brand) {
    console.log('❌ Marque MUVIT introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // Récupérer tous les produits MUVIT
  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .eq('brand_id', brand.id)
    .eq('status', 'active');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit MUVIT trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits MUVIT à enrichir:\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    console.log(`\n🔄 ${product.name}`);
    console.log(`   Slug: ${product.url_slug}`);

    // Déterminer quel contenu CMS utiliser
    let cmsContent;
    if (product.url_slug.includes('casque-sans-fils-enfants-muvit')) {
      cmsContent = casquesMuvitCMS;
    } else if (product.url_slug === 'appareil-photo-enfant-muvit-kidpic') {
      cmsContent = kidpicCMS;
    } else if (product.url_slug === 'rouleaux-papier-photo-x5-kidpic-enfant') {
      cmsContent = rouleauxCMS;
    } else {
      console.log(`   ⏭️  Produit non reconnu - ignoré`);
      continue;
    }

    // Supprimer les anciennes sections CMS si elles existent
    await supabase
      .from('product_content_sections')
      .delete()
      .eq('product_id', product.id);

    // Créer les 4 sections CMS
    const sections = [
      {
        product_id: product.id,
        section_type: 'description_card',
        title: cmsContent.description_card.title,
        content: cmsContent.description_card.content,
        images: [],
        is_enabled: true,
        display_order: 1,
        layout_variant: cmsContent.description_card.layout_variant,
        metadata: {}
      },
      {
        product_id: product.id,
        section_type: 'specs_grid',
        title: cmsContent.specs_grid.title,
        content: null,
        images: [],
        is_enabled: true,
        display_order: 2,
        layout_variant: cmsContent.specs_grid.layout_variant,
        metadata: cmsContent.specs_grid.metadata
      },
      {
        product_id: product.id,
        section_type: 'features_list',
        title: cmsContent.features_list.title,
        content: null,
        images: [],
        is_enabled: true,
        display_order: 3,
        layout_variant: cmsContent.features_list.layout_variant,
        metadata: cmsContent.features_list.metadata
      },
      {
        product_id: product.id,
        section_type: 'engagement_card',
        title: cmsContent.engagement_card.title,
        content: cmsContent.engagement_card.content,
        images: [],
        is_enabled: true,
        display_order: 4,
        layout_variant: cmsContent.engagement_card.layout_variant,
        metadata: {}
      }
    ];

    const { error } = await supabase
      .from('product_content_sections')
      .insert(sections);

    if (error) {
      console.log(`   ❌ Erreur: ${error.message}`);
      errorCount++;
    } else {
      console.log(`   ✅ 4 sections CMS créées avec succès`);
      successCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 RÉSULTATS:`);
  console.log(`   ✅ Succès: ${successCount} produits`);
  console.log(`   ❌ Erreurs: ${errorCount} produits`);
  console.log(`   📦 Total: ${products.length} produits\n`);
}

enrichMuvitCMS();
