import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CMS pour MONSTER Multiprise 4 Prises
const multiprise4PrisesCMS = {
  description_card: {
    title: 'Description',
    content: `<p>La <strong>MONSTER Multiprise 4 Prises</strong> est bien plus qu'une simple multiprise : c'est un système de protection avancé pour vos équipements électroniques de valeur. Avec 608 joules de protection contre les surtensions, cette multiprise parasurtenseur protège efficacement vos appareils AV, ordinateurs et électroniques contre les pics de tension dangereux du réseau électrique.</p>

<p>La technologie Clean Power de MONSTER élimine les interférences EMI/RFI du secteur qui dégradent la qualité image et son. Le câble d'alimentation de 1.40 mètre offre une flexibilité d'installation, tandis que l'interrupteur marche/arrêt permet de couper l'alimentation de tous les appareils connectés d'un seul geste. Résistance certifiée aux températures jusqu'à 750°C pour une sécurité maximale.</p>`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Multiprise protégée', details: 'Parasurtenseur' },
        { icon: '⚡', label: 'PROTECTION', value: '608 Joules', details: 'Anti-surtension' },
        { icon: '🔌', label: 'PRISES', value: '4 prises FR', details: 'Format standard' },
        { icon: '🛡️', label: 'FILTRAGE', value: 'EMI/RFI', details: 'Clean Power' },
        { icon: '📏', label: 'CÂBLE', value: '1.40 mètre', details: 'Câble secteur' },
        { icon: '🔥', label: 'SÉCURITÉ', value: '750°C', details: 'Résistant chaleur' },
        { icon: '💰', label: 'GARANTIE', value: '100,000€', details: 'Équipements connectés' },
        { icon: '🏠', label: 'USAGE', value: 'AV/PC', details: 'Multi-équipements' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '⚡', text: 'Protection 608J - Absorbe les surtensions dangereuses pour vos appareils' },
        { icon: '🎬', text: 'Clean Power - Filtre EMI/RFI pour meilleure qualité image/son' },
        { icon: '🛡️', text: 'Sécurité renforcée - Résistance 750°C, protection maximale' },
        { icon: '💰', text: 'Garantie 100K€ - Assurance équipements connectés' },
        { icon: '🔌', text: '4 prises protégées - Format français standard' },
        { icon: '💡', text: 'Interrupteur ON/OFF - Coupure facile de tous les appareils' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `<p>La multiprise MONSTER 4 Prises est l'investissement intelligent pour protéger votre installation home cinéma, bureau, ou gaming. La technologie Clean Power améliore réellement la qualité audiovisuelle en éliminant les parasites du secteur.</p>

<p><strong>Protection réelle</strong> - 608 joules pour absorber les surtensions.</p>

<p><strong>Qualité améliorée</strong> - Filtrage EMI/RFI pour image et son optimaux.</p>

<p><strong>Sérénité</strong> - Garantie 100,000€ sur équipements connectés.</p>`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour MONSTER Cable Fibre Optique 3M
const fibreOptique3MCMS = {
  description_card: {
    title: 'Description',
    content: `<p>Le <strong>MONSTER Cable Essential Fibre Optique 3M</strong> utilise la technologie de transmission par fibre optique pour délivrer un signal audio numérique parfait, totalement immunisé contre les interférences électromagnétiques. Ce câble Toslink de 3 mètres est la solution professionnelle pour connecter vos sources audio numériques (TV, console, lecteur Blu-ray) à votre système home cinéma, soundbar ou amplificateur.</p>

<p>Les connecteurs plaqués or garantissent une connexion fiable et résistante à la corrosion, tandis que la gaine protectrice Duraflex et le boîtier métallique assurent une durabilité exceptionnelle. Compatible S/PDIF, ce câble transmet les signaux audio stéréo et multicanaux avec une résolution parfaite, idéal pour profiter pleinement des formats Dolby Digital et DTS de vos contenus HD.</p>`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Fibre optique', details: 'Toslink digital' },
        { icon: '🔊', label: 'AUDIO', value: 'S/PDIF', details: 'Stéréo/Multicanal' },
        { icon: '📏', label: 'LONGUEUR', value: '3 mètres', details: 'Format long' },
        { icon: '⚡', label: 'CONNECTEURS', value: 'Or plaqué', details: 'Anti-corrosion' },
        { icon: '🛡️', label: 'PROTECTION', value: 'Duraflex', details: 'Gaine renforcée' },
        { icon: '🎬', label: 'FORMATS', value: 'Dolby/DTS', details: 'HD multicanal' },
        { icon: '🏗️', label: 'BUILD', value: 'Métal housing', details: 'Protection premium' },
        { icon: '✅', label: 'GARANTIE', value: 'Lifetime', details: 'Monster Forever' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🔊', text: 'Audio parfait - Fibre optique, zéro dégradation du signal' },
        { icon: '🛡️', text: 'Anti-interférences - Immunisé EMI/RFI, transmission pure' },
        { icon: '🎬', text: 'HD multicanal - Dolby Digital, DTS haute résolution' },
        { icon: '⚡', text: 'Connecteurs or - Fiabilité et longévité maximales' },
        { icon: '📏', text: 'Longueur 3m - Flexibilité installation home cinéma' },
        { icon: '🏗️', text: 'Build premium - Duraflex + boîtier métallique' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `<p>Le câble fibre optique MONSTER 3M est le choix des audiophiles exigeants. La transmission par fibre garantit une qualité audio numérique parfaite, sans aucune dégradation ni interférence possible.</p>

<p><strong>Qualité absolue</strong> - Signal numérique parfait via fibre optique.</p>

<p><strong>Installation pro</strong> - 3 mètres pour flexibilité maximale.</p>

<p><strong>Durabilité</strong> - Build Monster avec garantie lifetime.</p>`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour MONSTER Cable Fibre Optique 1M5
const fibreOptique1M5CMS = {
  description_card: {
    title: 'Description',
    content: `<p>Le <strong>MONSTER Cable Essential Fibre Optique 1.5M</strong> de la série M1000 offre la transmission audio numérique par fibre optique dans un format compact de 1.5 mètre. Ce câble Toslink délivre un signal audio parfait, totalement protégé contre les interférences électromagnétiques grâce à sa technologie de transmission optique.</p>

<p>Les connecteurs plaqués or résistent à la corrosion et garantissent une connexion fiable dans le temps. La gaine protectrice Duraflex et le boîtier métallique assurent une protection optimale du câble. Compatible avec tous les systèmes audio numériques (home cinéma, soundbar, amplificateur, console de jeu), ce câble supporte les formats surround sound pour une expérience audio immersive. Garantie lifetime avec remplacement 100% pour une tranquillité totale.</p>`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Fibre optique', details: 'Toslink M1000' },
        { icon: '🔊', label: 'AUDIO', value: 'Digital S/PDIF', details: 'Surround sound' },
        { icon: '📏', label: 'LONGUEUR', value: '1.5 mètres', details: 'Format compact' },
        { icon: '⚡', label: 'CONNECTEURS', value: 'Or plaqué', details: 'Longévité max' },
        { icon: '🛡️', label: 'GAINE', value: 'Duraflex', details: 'Protection renforcée' },
        { icon: '🎮', label: 'USAGE', value: 'Multi-devices', details: 'Universel' },
        { icon: '🏗️', label: 'BUILD', value: 'Métal housing', details: 'Robustesse' },
        { icon: '✅', label: 'GARANTIE', value: 'Lifetime 100%', details: 'Remplacement' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🔊', text: 'Transmission optique - Signal audio numérique parfait' },
        { icon: '🛡️', text: 'Zéro interférence - Protection totale EMI/RFI' },
        { icon: '🎮', text: 'Gaming ready - PS5, Xbox, latence minimale' },
        { icon: '📏', text: 'Format optimal - 1.5m pour setups compacts' },
        { icon: '⚡', text: 'Connecteurs premium - Or plaqué, durabilité' },
        { icon: '✅', text: 'Garantie totale - Lifetime warranty avec remplacement' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `<p>Le câble fibre optique MONSTER 1.5M est le choix intelligent pour les installations compactes nécessitant une qualité audio irréprochable. La longueur de 1.5m convient parfaitement aux setups TV/soundbar rapprochés.</p>

<p><strong>Format pratique</strong> - 1.5m idéal pour configurations compactes.</p>

<p><strong>Audio parfait</strong> - Fibre optique, transmission sans perte.</p>

<p><strong>Tranquillité</strong> - Garantie lifetime avec remplacement 100%.</p>`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour MONSTER Nettoyant écran 200ml
const nettoyantEcran200mlCMS = {
  description_card: {
    title: 'Description',
    content: `<p>Le <strong>MONSTER Nettoyant Écran Screen Clean 200ML</strong> est la solution professionnelle pour entretenir tous vos écrans électroniques. Ce spray de 200ml est fourni avec une lingette microfibre premium de 30x30cm, formant un kit complet pour un nettoyage efficace et sans risque de vos écrans plats TV, ordinateurs, laptops, smartphones et tablettes.</p>

<p>La formule sans alcool nettoie en douceur sans risque pour les revêtements anti-reflets et les surfaces délicates. Le spray laisse un film anti-poussière qui garde vos écrans propres plus longtemps. L'emballage 100% recyclable en carton témoigne de l'engagement environnemental de MONSTER. Élimine efficacement poussière, saleté, traces de doigts et particules, laissant vos écrans brillants comme neufs.</p>`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Nettoyant spray', details: 'Screen Clean' },
        { icon: '📏', label: 'VOLUME', value: '200 ml', details: 'Format généreux' },
        { icon: '🧼', label: 'FORMULE', value: 'Sans alcool', details: 'Safe écrans' },
        { icon: '🧽', label: 'LINGETTE', value: 'Microfibre 30x30', details: 'Lavable' },
        { icon: '✨', label: 'EFFET', value: 'Anti-poussière', details: 'Longue durée' },
        { icon: '♻️', label: 'EMBALLAGE', value: '100% recyclable', details: 'Éco-responsable' },
        { icon: '📱', label: 'USAGE', value: 'Multi-devices', details: 'Tous écrans' },
        { icon: '🏆', label: 'RÉSULTAT', value: 'Comme neuf', details: 'Brillance parfaite' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🧼', text: 'Formule sans alcool - Sûr pour tous revêtements anti-reflets' },
        { icon: '✨', text: 'Anti-poussière - Film protecteur, écrans propres plus longtemps' },
        { icon: '🧽', text: 'Kit complet - Spray 200ml + lingette microfibre premium' },
        { icon: '♻️', text: 'Éco-responsable - Emballage 100% recyclable en carton' },
        { icon: '📱', text: 'Universel - TV, PC, laptop, smartphone, tablette' },
        { icon: '🏆', text: 'Résultat pro - Brillance et propreté comme neuf' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `<p>Le nettoyant MONSTER Screen Clean 200ML est l'outil indispensable pour maintenir tous vos écrans dans un état impeccable. La formule professionnelle sans alcool garantit un nettoyage efficace sans aucun risque pour vos équipements.</p>

<p><strong>Nettoyage sûr</strong> - Sans alcool, préserve les revêtements délicats.</p>

<p><strong>Kit complet</strong> - Spray + lingette microfibre premium incluse.</p>

<p><strong>Éco-friendly</strong> - Emballage 100% recyclable, démarche responsable.</p>`,
    layout_variant: 'text-left-image-right'
  }
};

async function enrichMonsterAccessoriesCMSPart2() {
  console.log('🎨 ENRICHISSEMENT CMS - MONSTER ACCESSOIRES PARTIE 2/2\n');
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

  // Les 4 produits restants
  const targetSlugs = [
    'monster-multiprise-4-prises',
    'monster-cable-essential-fibre-optique-3m',
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

  console.log(`📦 ${products.length}/4 produits trouvés\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    console.log(`🔄 ${product.name}`);
    console.log(`   Slug: ${product.url_slug}`);

    // Déterminer quel contenu CMS utiliser
    let cmsContent;
    const slug = product.url_slug;

    if (slug === 'monster-multiprise-4-prises') {
      cmsContent = multiprise4PrisesCMS;
    } else if (slug === 'monster-cable-essential-fibre-optique-3m') {
      cmsContent = fibreOptique3MCMS;
    } else if (slug === 'monster-cable-essential-fibre-optique-1m5') {
      cmsContent = fibreOptique1M5CMS;
    } else if (slug === 'monster-nettoyant-et-lingette-200ml') {
      cmsContent = nettoyantEcran200mlCMS;
    } else {
      console.log(`   ⚠️  Slug inconnu\n`);
      errorCount++;
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
  console.log(`\n📊 RÉSULTATS PARTIE 2/2:`);
  console.log(`   ✅ Succès: ${successCount}`);
  console.log(`   ❌ Erreurs: ${errorCount}`);
  console.log(`   📦 Total: ${products.length}\n`);
}

enrichMonsterAccessoriesCMSPart2();
