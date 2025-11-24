import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const ECOUTEURS_CATEGORY_ID = '3fa6e04b-2cab-46db-8a85-f6865909d51c';

const products = [
  {
    id: '6011dfb8-086c-4bab-b9f1-724cb6d033f6',
    name: 'MONSTER TH300 TACTILE',
    sections: [
      {
        section_type: 'description_card',
        title: 'Description',
        content: `<p>Les <strong>MONSTER TH300 TACTILE</strong> sont des écouteurs Bluetooth premium dotés d'un écran tactile innovant et de fonctionnalités audio avancées. Équipés de la technologie de réduction de bruit active, ils offrent une expérience d'écoute immersive.</p>
<p>L'écran tactile intégré permet de contrôler facilement la lecture, le volume et les modes audio sans sortir votre smartphone. Trois modes sont disponibles : Normal pour une écoute classique, Réduction de bruit pour s'isoler complètement, et Transparent pour rester conscient de votre environnement.</p>
<p>La charge USB-C rapide et l'étui intelligent affichant le niveau de batterie assurent une autonomie optimale. La fonction de localisation des écouteurs gauche/droit vous aide à ne jamais les perdre.</p>`,
        display_order: 2,
        layout_variant: 'text-left-image-right',
        images: [],
        metadata: {}
      },
      {
        section_type: 'specs_grid',
        title: 'Caractéristiques Techniques',
        content: null,
        display_order: 3,
        layout_variant: 'grid-4-cols',
        images: [],
        metadata: {
          specs: [
            { icon: '📱', label: 'BLUETOOTH', value: 'Sans fil', details: 'Connexion stable' },
            { icon: '🎮', label: 'ÉCRAN', value: 'Tactile', details: 'Contrôle multifonction' },
            { icon: '🔇', label: 'MODES AUDIO', value: '3 modes', details: 'Normal/NC/Transparent' },
            { icon: '🔋', label: 'CHARGE', value: 'USB-C', details: 'Charge rapide' },
            { icon: '⚡', label: 'ÉTUI', value: 'Intelligent', details: 'Affichage niveau batterie' },
            { icon: '📍', label: 'LOCALISATION', value: 'Intégrée', details: 'Gauche/Droite' },
            { icon: '🎵', label: 'CONTRÔLES', value: 'Tactiles', details: 'Lecture/Volume/EQ' },
            { icon: '🔄', label: 'RECONNEXION', value: 'Automatique', details: 'Dernier appareil' }
          ]
        }
      },
      {
        section_type: 'features_list',
        title: 'Points Forts',
        content: null,
        display_order: 4,
        layout_variant: 'image-left-text-right',
        images: [],
        metadata: {
          features: [
            { icon: '✓', text: 'Écran Tactile Innovant - Contrôle intuitif et complet depuis les écouteurs' },
            { icon: '✓', text: 'Triple Mode Audio - Normal, Réduction de bruit active, et Transparent' },
            { icon: '✓', text: 'Étui Intelligent - Affichage du niveau de batterie en temps réel' },
            { icon: '✓', text: 'Localisation Intégrée - Ne perdez jamais vos écouteurs gauche ou droit' },
            { icon: '✓', text: 'Charge USB-C Rapide - Recharge complète rapide et universelle' }
          ]
        }
      },
      {
        section_type: 'engagement_card',
        title: 'Pourquoi Choisir ce Produit ?',
        content: `<p>Les <strong>MONSTER TH300 TACTILE</strong> représentent l'innovation dans le monde des écouteurs sans fil. Leur écran tactile unique offre un contrôle inédit et une expérience utilisateur exceptionnelle.</p>
<p>Avec trois modes audio adaptables à chaque situation et une technologie de réduction de bruit active, ces écouteurs s'adaptent parfaitement à votre quotidien, que ce soit pour vous concentrer au travail ou rester attentif à votre environnement.</p>
<p>L'étui de charge intelligent et la fonction de localisation démontrent l'attention portée aux détails pratiques du quotidien.</p>`,
        display_order: 5,
        layout_variant: 'image-left-text-right',
        images: [],
        metadata: {}
      }
    ]
  },
  {
    id: '50cdf6b8-3d48-402a-85e6-8d08315a0ba6',
    name: 'MONSTER N LITE 203',
    sections: [
      {
        section_type: 'description_card',
        title: 'Description',
        content: `<p>Les <strong>MONSTER N LITE 203</strong> sont des écouteurs Bluetooth 5.3 qui allient performance audio Hi-Fi et confort exceptionnel. Équipés de la technologie aptX Low Latency, ils éliminent totalement les délais de transmission pour une synchronisation parfaite.</p>
<p>Leurs puissants drivers de 13mm avec décodage Qualcomm aptX offrent une qualité audio haute définition avec des basses profondes et des aigus cristallins. La réponse en fréquence étendue de 20Hz à 20KHz couvre tout le spectre audible.</p>
<p>Ultralégers avec seulement 3,85g par écouteur (15% plus légers que la moyenne), ils se font oublier même après des heures d'écoute. L'autonomie exceptionnelle de 30 heures (8h + 22h dans l'étui) vous accompagne toute la journée.</p>`,
        display_order: 2,
        layout_variant: 'text-left-image-right',
        images: [],
        metadata: {}
      },
      {
        section_type: 'specs_grid',
        title: 'Caractéristiques Techniques',
        content: null,
        display_order: 3,
        layout_variant: 'grid-4-cols',
        images: [],
        metadata: {
          specs: [
            { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'aptX Low Latency, 15m' },
            { icon: '🔊', label: 'DRIVERS', value: 'φ13mm', details: 'Qualcomm aptX HD' },
            { icon: '🎵', label: 'SENSIBILITÉ', value: '98±3dB', details: '20Hz-20KHz' },
            { icon: '🔋', label: 'AUTONOMIE', value: '30h totale', details: '8h + 22h étui' },
            { icon: '💧', label: 'ÉTANCHÉITÉ', value: 'IPX6', details: 'Résistant eau/sueur' },
            { icon: '⚖️', label: 'POIDS', value: '3,85g', details: '15% plus léger' },
            { icon: '🔌', label: 'CHARGE', value: 'USB-C', details: '100mAh, 2h charge' },
            { icon: '🎤', label: 'MICROPHONES', value: '2 micros', details: 'Appels clairs' }
          ]
        }
      },
      {
        section_type: 'features_list',
        title: 'Points Forts',
        content: null,
        display_order: 4,
        layout_variant: 'image-left-text-right',
        images: [],
        metadata: {
          features: [
            { icon: '✓', text: 'aptX Low Latency - Synchronisation parfaite audio/vidéo sans aucun délai' },
            { icon: '✓', text: 'Ultralégers 3,85g - 15% plus légers pour un confort total toute la journée' },
            { icon: '✓', text: '30h d\'Autonomie - 8h d\'écoute + 22h supplémentaires avec l\'étui' },
            { icon: '✓', text: 'Son Hi-Fi Premium - Drivers 13mm + décodage Qualcomm aptX HD' },
            { icon: '✓', text: 'Étanche IPX6 - Résiste à l\'eau et à la sueur pour le sport' }
          ]
        }
      },
      {
        section_type: 'engagement_card',
        title: 'Pourquoi Choisir ce Produit ?',
        content: `<p>Les <strong>MONSTER N LITE 203</strong> sont le choix parfait pour les audiophiles exigeants qui recherchent qualité sonore et confort. La technologie aptX Low Latency garantit une expérience sans compromis pour les vidéos et le gaming.</p>
<p>Leur poids plume de 3,85g les rend parfaits pour une utilisation prolongée, que ce soit pour le travail, le sport ou les loisirs. L'autonomie de 30 heures élimine le stress de la recharge quotidienne.</p>
<p>Avec leur certification IPX6, ils vous accompagnent en toute confiance lors de vos séances de sport et résistent à la transpiration et aux intempéries.</p>`,
        display_order: 5,
        layout_variant: 'image-left-text-right',
        images: [],
        metadata: {}
      }
    ]
  },
  {
    id: '8cb5c4ae-7e80-433d-bb5a-c2a0e7e683fc',
    name: 'MONSTER N LITE 206',
    sections: [
      {
        section_type: 'description_card',
        title: 'Description',
        content: `<p>Les <strong>MONSTER N LITE 206</strong> intègrent la toute dernière technologie Bluetooth 5.4 pour une connexion ultra-stable et économe en énergie. Leurs drivers de 10mm avec amplification DSP délivrent des basses riches et profondes.</p>
<p>Le design ergonomique s'ajuste naturellement dans l'oreille et minimise les bruits extérieurs pour une immersion totale. Avec seulement 4 grammes par écouteur, ils sont parmi les plus légers du marché tout en offrant un maintien parfait.</p>
<p>L'autonomie de 25 heures (5h + 20h dans l'étui) et la charge rapide USB-C garantissent que vos écouteurs sont toujours prêts. Les contrôles tactiles sensibles permettent une gestion intuitive de la musique et des appels.</p>`,
        display_order: 2,
        layout_variant: 'text-left-image-right',
        images: [],
        metadata: {}
      },
      {
        section_type: 'specs_grid',
        title: 'Caractéristiques Techniques',
        content: null,
        display_order: 3,
        layout_variant: 'grid-4-cols',
        images: [],
        metadata: {
          specs: [
            { icon: '📡', label: 'BLUETOOTH', value: '5.4', details: 'Dernière génération' },
            { icon: '🔊', label: 'DRIVERS', value: 'φ10mm', details: 'Amplification DSP' },
            { icon: '🎵', label: 'DÉCODAGE', value: 'AAC, SBC', details: 'Audio haute qualité' },
            { icon: '🔋', label: 'AUTONOMIE', value: '25h totale', details: '5h + 20h étui' },
            { icon: '💧', label: 'ÉTANCHÉITÉ', value: 'IPX5/IPX6', details: 'Résistant eau' },
            { icon: '⚖️', label: 'POIDS', value: '4g', details: 'Ultra-léger' },
            { icon: '🔌', label: 'CHARGE', value: 'Type-C', details: '1h écouteurs, 2h étui' },
            { icon: '🎤', label: 'MICROPHONE', value: 'Intégré', details: '4h conversation' }
          ]
        }
      },
      {
        section_type: 'features_list',
        title: 'Points Forts',
        content: null,
        display_order: 4,
        layout_variant: 'image-left-text-right',
        images: [],
        metadata: {
          features: [
            { icon: '✓', text: 'Bluetooth 5.4 - Dernière technologie pour connexion stable et économie d\'énergie' },
            { icon: '✓', text: 'Ultra-légers 4g - Design ergonomique qui s\'oublie après quelques minutes' },
            { icon: '✓', text: 'Basses DSP Puissantes - Amplification numérique pour des basses riches' },
            { icon: '✓', text: '25h d\'Autonomie - 5h d\'écoute + 20h supplémentaires avec l\'étui' },
            { icon: '✓', text: '3 Tailles d\'Embouts - Ajustement parfait pour tous types d\'oreilles' }
          ]
        }
      },
      {
        section_type: 'engagement_card',
        title: 'Pourquoi Choisir ce Produit ?',
        content: `<p>Les <strong>MONSTER N LITE 206</strong> représentent le meilleur de la technologie Bluetooth 5.4 avec une stabilité de connexion inégalée et une consommation d'énergie optimisée.</p>
<p>Leur design ergonomique minutieusement étudié garantit un confort exceptionnel même lors d'utilisations prolongées. Les 3 tailles d'embouts incluses assurent un ajustement parfait pour chaque morphologie d'oreille.</p>
<p>Avec leur amplification DSP et leurs basses profondes, ils offrent une qualité audio premium habituellement réservée à des modèles plus onéreux. Le rapport qualité/prix est exceptionnel.</p>`,
        display_order: 5,
        layout_variant: 'image-left-text-right',
        images: [],
        metadata: {}
      }
    ]
  }
];

async function main() {
  console.log('🎧 Correction des écouteurs Monster...\n');

  for (const product of products) {
    console.log(`\n📦 Traitement: ${product.name}`);

    // 1. Mettre à jour la catégorie
    const { error: categoryError } = await supabase
      .from('products')
      .update({ category_id: ECOUTEURS_CATEGORY_ID })
      .eq('id', product.id);

    if (categoryError) {
      console.error(`❌ Erreur catégorie: ${categoryError.message}`);
      continue;
    }
    console.log('✅ Catégorie mise à jour: Écouteurs');

    // 2. Supprimer les anciennes sections CMS
    const { error: deleteError } = await supabase
      .from('product_content_sections')
      .delete()
      .eq('product_id', product.id);

    if (deleteError) {
      console.error(`❌ Erreur suppression: ${deleteError.message}`);
      continue;
    }

    // 3. Créer les nouvelles sections avec les vraies infos
    for (const section of product.sections) {
      const { error: insertError } = await supabase
        .from('product_content_sections')
        .insert({
          product_id: product.id,
          ...section
        });

      if (insertError) {
        console.error(`❌ Erreur section ${section.title}: ${insertError.message}`);
      }
    }

    console.log(`✅ ${product.sections.length} sections CMS créées avec vraies infos`);
  }

  console.log('\n\n🎉 Correction terminée !');
  console.log('\n📋 Résumé:');
  console.log('- 3 produits déplacés vers catégorie "Écouteurs"');
  console.log('- 12 sections CMS mises à jour avec vraies spécifications');
  console.log('- Structure des fiches produits inchangée');
}

main().catch(console.error);
