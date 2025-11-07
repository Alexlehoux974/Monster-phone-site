import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CMS pour MONSTER Cable USB-C vers HDMI 4K 2M
const usbcToHdmi4K2MCMS = {
  description_card: {
    title: 'Description',
    content: `<p>Le <strong>MONSTER Cable USB-C vers HDMI 4K 2M</strong> est la solution professionnelle pour connecter vos appareils USB-C à n'importe quel écran, moniteur ou projecteur HDMI. Compatible avec les laptops, tablettes et smartphones modernes équipés de ports USB-C supportant le mode Alt DisplayPort, ce câble de 2 mètres offre une longueur idéale pour les installations de bureau et les présentations.</p>

<p>Ce câble de la gamme Essentials de MONSTER assure une transmission vidéo Ultra HD 4K à 60Hz avec support HDR (High Dynamic Range), garantissant une qualité d'image exceptionnelle pour vos contenus multimédia, présentations professionnelles ou sessions de gaming. La rétrocompatibilité avec les résolutions 1080p, 1080i et 720p assure une flexibilité maximale avec tous vos équipements.</p>`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'USB-C vers HDMI', details: 'Connexion directe' },
        { icon: '🎬', label: 'RÉSOLUTION', value: '4K UHD 60Hz', details: 'HDR support' },
        { icon: '📏', label: 'LONGUEUR', value: '2 mètres', details: 'Câble souple' },
        { icon: '🔌', label: 'CONNECTEURS', value: 'USB-C + HDMI', details: 'Or 24 carats' },
        { icon: '📱', label: 'COMPATIBILITÉ', value: 'Alt DP Mode', details: 'Universel' },
        { icon: '🖥️', label: 'RÉTRO', value: '1080p/720p', details: 'Multi-résolutions' },
        { icon: '⚡', label: 'PLUG & PLAY', value: 'Sans driver', details: 'Immédiat' },
        { icon: '✅', label: 'GARANTIE', value: 'MONSTER', details: 'Lifetime warranty' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🎬', text: '4K 60Hz HDR - Qualité vidéo exceptionnelle pour films et présentations' },
        { icon: '🔌', text: 'Plug & Play - Aucun driver nécessaire, connexion instantanée' },
        { icon: '💼', text: 'Pro-ready - Idéal présentations, réunions, formations' },
        { icon: '📱', text: 'Multi-devices - Laptops, tablettes, smartphones USB-C' },
        { icon: '🎮', text: 'Gaming - Latence minimale pour expérience fluide' },
        { icon: '🏗️', text: 'Build quality - Connecteurs plaqués or, câble renforcé' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `<p>Le câble MONSTER USB-C vers HDMI 4K 2M est l'accessoire essentiel pour étendre vos possibilités de connexion. La qualité MONSTER garantit une transmission fiable et une durabilité exceptionnelle.</p>

<p><strong>Polyvalence professionnelle</strong> - Parfait pour présentations, télétravail, formations.</p>

<p><strong>Qualité 4K HDR</strong> - Image parfaite pour contenus haute définition.</p>

<p><strong>Fiabilité MONSTER</strong> - Connecteurs premium et garantie lifetime.</p>`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour MONSTER Cable HDMI Essential 8K 1M8 (HDMI 2.1)
const hdmi8K1M8CMS = {
  description_card: {
    title: 'Description',
    content: `<p>Le <strong>MONSTER Cable HDMI Essential 8K 1.8M</strong> représente la nouvelle génération de câbles HDMI avec la norme HDMI 2.1. Conçu pour les gamers exigeants et les passionnés de home cinéma, ce câble de 1.8 mètre offre une bande passante colossale de 48 Gbit/s, permettant des résolutions jusqu'à 8K à 60Hz et 4K à 144Hz.</p>

<p>Le support du HDR avec technologie Dolby Vision garantit des images époustouflantes avec une profondeur de couleur 4:4:4 pour un rendu visuel parfait. La certification UL et CL3 autorise l'installation en encastrement mural pour une intégration professionnelle. L'eARC (Enhanced Audio Return Channel) simplifie la connectivité et supporte les formats audio avancés comme Dolby Atmos et DTS:X.</p>`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'HDMI 2.1', details: '48 Gbit/s' },
        { icon: '🎬', label: 'RÉSOLUTION', value: '8K 60Hz', details: '4K 144Hz' },
        { icon: '🎨', label: 'COULEURS', value: '4:4:4', details: 'Dolby Vision HDR' },
        { icon: '🔊', label: 'AUDIO', value: 'eARC', details: 'Formats avancés' },
        { icon: '📏', label: 'LONGUEUR', value: '1.8 mètres', details: 'Gaming optimal' },
        { icon: '🛡️', label: 'BLINDAGE', value: 'Triple', details: 'Anti-interférences' },
        { icon: '⚡', label: 'CONNECTEURS', value: 'Or 24K', details: 'V-Grip Monster' },
        { icon: '🏠', label: 'CERTIF', value: 'UL/CL3', details: 'Install murale OK' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🎮', text: 'Gaming next-gen - PS5, Xbox Series X/S, 4K 144Hz sans compromis' },
        { icon: '🎬', text: '8K ready - Préparez votre installation pour le futur' },
        { icon: '🎨', text: 'Dolby Vision HDR - Images spectaculaires avec profondeur maximale' },
        { icon: '🔊', text: 'eARC - Audio immersif Dolby Atmos et DTS:X' },
        { icon: '🛡️', text: 'Triple blindage - Protection maximale contre interférences' },
        { icon: '🏗️', text: 'Build Monster - Connecteurs V-Grip 4x plus fiables' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `<p>Le câble MONSTER HDMI 8K 1.8M est l'investissement intelligent pour une installation gaming ou home cinéma future-proof. La bande passante de 48 Gbit/s et le support HDMI 2.1 garantissent la compatibilité avec les technologies actuelles et futures.</p>

<p><strong>Gaming ultime</strong> - 4K 144Hz pour avantage compétitif maximal.</p>

<p><strong>8K ready</strong> - Investissement durable pour contenus de demain.</p>

<p><strong>Audio premium</strong> - eARC pour expérience sonore immersive.</p>`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour MONSTER Cable HDMI Essential 4K 3M6 (HDMI 2.0)
const hdmi4K3M6CMS = {
  description_card: {
    title: 'Description',
    content: `<p>Le <strong>MONSTER Cable HDMI Essential 4K 3.6M</strong> offre une longueur généreuse de 3.6 mètres pour les installations nécessitant plus de flexibilité. Avec sa certification HDMI 2.0 et sa bande passante de 18 Gbit/s, ce câble supporte les résolutions 4K UHD avec profondeur de couleur 8-10 bits et audio multicanal DTS HD 5.1/7.1.</p>

<p>Le triple blindage haute densité protège le signal HDMI contre les interférences radio et électromagnétiques jusqu'à 1 GHz, garantissant une transmission parfaite même dans les environnements perturbés. Les connecteurs V-Grip™ brevetés de MONSTER sont 4 fois plus fiables que les connecteurs ordinaires et sont plaqués or 24 carats pour prévenir l'oxydation et la corrosion.</p>`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'HDMI 2.0', details: '18 Gbit/s' },
        { icon: '🎬', label: 'RÉSOLUTION', value: '4K UHD', details: 'Full HD 1080p' },
        { icon: '🎨', label: 'COULEURS', value: '8-10 bits', details: 'Profondeur max' },
        { icon: '🔊', label: 'AUDIO', value: 'DTS HD 7.1', details: 'Multicanal' },
        { icon: '📏', label: 'LONGUEUR', value: '3.6 mètres', details: 'Installation large' },
        { icon: '🛡️', label: 'BLINDAGE', value: 'Triple HD', details: 'Jusqu\'à 1 GHz' },
        { icon: '⚡', label: 'CONNECTEURS', value: 'V-Grip Or 24K', details: 'Fiabilité 4x' },
        { icon: '✅', label: 'GARANTIE', value: 'Lifetime', details: 'Monster Forever' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '📏', text: 'Longueur 3.6m - Flexibilité installation, distance confortable' },
        { icon: '🎬', text: '4K UHD certified - Qualité image parfaite pour écrans Ultra HD' },
        { icon: '🛡️', text: 'Triple blindage HD - Protection 1 GHz, zéro interférence' },
        { icon: '🔌', text: 'V-Grip Monster - Connecteurs 4x plus fiables, or pur 24K' },
        { icon: '🔊', text: 'Audio HD - DTS HD 7.1 multicanal immersif' },
        { icon: '🏠', text: 'Polyvalent - TV 4K, Blu-ray, consoles, soundbar' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `<p>Le câble MONSTER HDMI 4K 3.6M est la solution idéale quand vous avez besoin de longueur sans compromis sur la qualité. Le triple blindage et les connecteurs V-Grip garantissent une transmission parfaite sur toute la longueur.</p>

<p><strong>Installation flexible</strong> - 3.6m pour configurations spacieuses.</p>

<p><strong>Qualité Monster</strong> - Triple blindage et connecteurs premium.</p>

<p><strong>Polyvalence totale</strong> - Compatible tous équipements 4K/HD.</p>`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour MONSTER Cable HDMI Essential 4K 1M8 (HDMI 2.0)
const hdmi4K1M8CMS = {
  description_card: {
    title: 'Description',
    content: `<p>Le <strong>MONSTER Cable HDMI Essential 4K 1.8M</strong> combine longueur optimale et qualité MONSTER dans un format compact de 1.8 mètre. Certifié HDMI 2.0 avec bande passante de 18 Gbit/s, ce câble supporte les résolutions 4K Ultra HD avec support HDR (High Dynamic Range) et ARC (Audio Return Channel) pour une connectivité simplifiée.</p>

<p>Les connecteurs plaqués or 24 carats résistent à la corrosion et garantissent une conductivité optimale sur la durée. Le câble intègre un support Ethernet via HDMI, permettant le partage de connexion internet entre appareils compatibles. Idéal pour connecter TV 4K, lecteurs Blu-ray, consoles de jeux, soundbars et décodeurs HD en toute confiance.</p>`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'HDMI 2.0', details: '18 Gbit/s' },
        { icon: '🎬', label: 'RÉSOLUTION', value: '4K UHD', details: 'HDR support' },
        { icon: '📏', label: 'LONGUEUR', value: '1.8 mètres', details: 'Format standard' },
        { icon: '🔊', label: 'AUDIO', value: 'ARC', details: 'Return Channel' },
        { icon: '🌐', label: 'ETHERNET', value: 'HDMI Ethernet', details: 'Partage réseau' },
        { icon: '⚡', label: 'CONNECTEURS', value: 'Or 24K', details: 'Anti-corrosion' },
        { icon: '🛡️', label: 'PROTECTION', value: 'Blindage', details: 'Anti-EMI/RFI' },
        { icon: '✅', label: 'GARANTIE', value: 'Lifetime', details: 'Monster Forever' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🎬', text: '4K UHD HDR - Image exceptionnelle avec High Dynamic Range' },
        { icon: '🔊', text: 'ARC intégré - Simplifiez connexions audio avec soundbar' },
        { icon: '🌐', text: 'HDMI Ethernet - Partagez internet via câble HDMI' },
        { icon: '📏', text: 'Longueur optimale - 1.8m, ni trop court ni trop long' },
        { icon: '⚡', text: 'Connecteurs premium - Or 24K, conductivité maximale' },
        { icon: '🏠', text: 'Universel - TV, consoles, Blu-ray, streaming devices' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `<p>Le câble MONSTER HDMI 4K 1.8M est le choix équilibré pour la plupart des installations home cinéma et gaming. La longueur de 1.8m convient parfaitement aux setups TV/console standard tout en offrant la qualité MONSTER légendaire.</p>

<p><strong>Format pratique</strong> - 1.8m, longueur idéale pour majorité des setups.</p>

<p><strong>4K HDR ready</strong> - Qualité image optimale pour contenus modernes.</p>

<p><strong>ARC + Ethernet</strong> - Fonctionnalités avancées intégrées.</p>`,
    layout_variant: 'text-left-image-right'
  }
};

async function enrichMonsterAccessoriesCMS() {
  console.log('🎨 ENRICHISSEMENT CMS - MONSTER ACCESSOIRES (8 PRODUITS)\n');
  console.log('='.repeat(80));

  const { data: brand } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%monster%')
    .single();

  if (!brand) {
    console.log('❌ Marque MONSTER introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // Les 8 produits spécifiques
  const targetSlugs = [
    'monster-cable-type-c-vers-hdmi-4k-2m',
    'monster-cable-hdmi-essential-8k-1m8',
    'monster-cable-hdmi-essential-4k-3m6',
    'monster-multiprise-4-prises',
    'monster-cable-essential-fibre-optique-3m',
    'monster-cable-hdmi-essential-4k-1m8',
    'monster-cable-essential-fibre-optique-1m5',
    'monster-nettoyant-et-lingette-200ml'
  ];

  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .eq('brand_id', brand.id)
    .in('url_slug', targetSlugs)
    .eq('status', 'active');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit trouvé');
    return;
  }

  console.log(`📦 ${products.length}/8 produits trouvés\n`);

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const product of products) {
    console.log(`🔄 ${product.name}`);
    console.log(`   Slug: ${product.url_slug}`);

    // Déterminer quel contenu CMS utiliser
    let cmsContent;
    const slug = product.url_slug;

    if (slug === 'monster-cable-type-c-vers-hdmi-4k-2m') {
      cmsContent = usbcToHdmi4K2MCMS;
    } else if (slug === 'monster-cable-hdmi-essential-8k-1m8') {
      cmsContent = hdmi8K1M8CMS;
    } else if (slug === 'monster-cable-hdmi-essential-4k-3m6') {
      cmsContent = hdmi4K3M6CMS;
    } else if (slug === 'monster-cable-hdmi-essential-4k-1m8') {
      cmsContent = hdmi4K1M8CMS;
    } else {
      console.log(`   ⏭️  Contenu CMS pour les 4 autres produits dans la partie 2 du script\n`);
      skippedCount++;
      continue;
    }

    // Supprimer les anciennes sections
    const { error: deleteError } = await supabase
      .from('product_content_sections')
      .delete()
      .eq('product_id', product.id);

    if (deleteError) {
      console.log(`   ❌ Erreur suppression: ${deleteError.message}\n`);
      errorCount++;
      continue;
    }

    // Créer les 4 nouvelles sections CMS
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

    const { error: insertError } = await supabase
      .from('product_content_sections')
      .insert(sections);

    if (insertError) {
      console.log(`   ❌ Erreur insertion: ${insertError.message}\n`);
      errorCount++;
    } else {
      console.log(`   ✅ CMS enrichi (4/4 sections créées)\n`);
      successCount++;
    }
  }

  console.log('='.repeat(80));
  console.log(`\n📊 RÉSULTATS PARTIE 1/2:`);
  console.log(`   ✅ Succès: ${successCount}`);
  console.log(`   ⏭️  À traiter partie 2: ${skippedCount}`);
  console.log(`   ❌ Erreurs: ${errorCount}`);
  console.log(`   📦 Total: ${products.length}\n`);
}

enrichMonsterAccessoriesCMS();
