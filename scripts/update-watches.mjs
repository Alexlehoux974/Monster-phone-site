import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const MONTRES_CATEGORY_ID = 'c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c';

const products = [
  {
    id: '6011dfb8-086c-4bab-b9f1-724cb6d033f6',
    name: 'MONSTER TH300 TACTILE',
    description: `<div class="max-w-4xl mx-auto">
  <h3 class="text-2xl font-bold text-gray-900 mb-6">MONSTER TH300 TACTILE - Montre Connectée Premium</h3>

  <div class="space-y-6">
    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Écran AMOLED Haute Définition</h4>
      <p class="text-gray-700 leading-relaxed">
        Profitez d'un magnifique écran tactile AMOLED offrant des couleurs éclatantes et un contraste exceptionnel.
        L'interface intuitive permet une navigation fluide et réactive, même en plein soleil.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Connectivité Avancée</h4>
      <p class="text-gray-700 leading-relaxed">
        Passez et recevez des appels directement depuis votre poignet grâce à la connexion Bluetooth intégrée.
        L'assistant vocal intelligent vous permet de contrôler votre montre par commande vocale et d'accéder
        rapidement à vos fonctionnalités préférées.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">GPS Intégré et Suivi Sportif</h4>
      <p class="text-gray-700 leading-relaxed">
        Le GPS haute précision enregistre vos parcours en temps réel, idéal pour la course, le vélo et la randonnée.
        Suivez vos performances avec des métriques détaillées : distance, allure, calories brûlées et plus encore.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Suivi Santé Complet 24/7</h4>
      <p class="text-gray-700 leading-relaxed">
        Surveillez votre fréquence cardiaque en continu, analysez la qualité de votre sommeil et suivez vos niveaux
        d'activité quotidienne. La MONSTER TH300 vous accompagne pour une vie plus saine avec des rappels personnalisés
        et des conseils adaptés à vos objectifs.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Étanchéité 5ATM</h4>
      <p class="text-gray-700 leading-relaxed">
        Certifiée étanche jusqu'à 50 mètres de profondeur (5ATM), cette montre vous accompagne dans toutes vos activités :
        natation, douche, sports nautiques. Robuste et fiable, elle résiste aux conditions les plus exigeantes.
      </p>
    </section>
  </div>
</div>`,
    highlights: [
      "Écran tactile AMOLED haute résolution avec affichage éclatant",
      "Appels Bluetooth et assistant vocal intelligent intégrés",
      "GPS haute précision pour tracking sportif avancé",
      "Suivi santé 24/7 : fréquence cardiaque, sommeil, activité",
      "Étanche 5ATM (50m) - Natation et sports nautiques",
      "Autonomie longue durée avec charge rapide"
    ],
    specifications: {
      "Écran": {
        "Type": "AMOLED tactile",
        "Résolution": "Haute définition",
        "Luminosité": "Automatique"
      },
      "Connectivité": {
        "Bluetooth": "5.0",
        "Appels": "Oui, via Bluetooth",
        "Assistant vocal": "Intégré",
        "GPS": "Oui, haute précision"
      },
      "Santé et Sport": {
        "Cardio-fréquencemètre": "24/7",
        "Suivi du sommeil": "Oui, avec analyse détaillée",
        "Modes sportifs": "Multi-sports",
        "Compteur de pas": "Oui",
        "Calories brûlées": "Oui"
      },
      "Autonomie": {
        "Durée": "Plusieurs jours en usage normal",
        "Charge": "Rapide, câble magnétique"
      },
      "Résistance": {
        "Étanchéité": "5ATM (50 mètres)",
        "Certification": "IP68"
      },
      "Compatibilité": {
        "Systèmes": "iOS et Android",
        "Application": "Monster Fit"
      }
    }
  },
  {
    id: '50cdf6b8-3d48-402a-85e6-8d08315a0ba6',
    name: 'MONSTER N LITE 203',
    description: `<div class="max-w-4xl mx-auto">
  <h3 class="text-2xl font-bold text-gray-900 mb-6">MONSTER N LITE 203 - Montre Connectée Sport & Santé</h3>

  <div class="space-y-6">
    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Écran Tactile Couleur 1.4"</h4>
      <p class="text-gray-700 leading-relaxed">
        Profitez d'un écran tactile couleur de 1.4 pouces offrant une excellente lisibilité en toutes conditions.
        L'interface claire et intuitive permet un accès rapide à toutes vos données de santé et notifications.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Suivi Santé 24/7</h4>
      <p class="text-gray-700 leading-relaxed">
        Surveillez votre santé en continu avec le monitoring de fréquence cardiaque 24h/24, le suivi automatique
        du sommeil et l'analyse de vos niveaux de stress. La MONSTER N LITE 203 vous aide à maintenir un mode
        de vie équilibré avec des rappels personnalisés pour bouger, respirer et vous hydrater.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Multi-Sports et Activités</h4>
      <p class="text-gray-700 leading-relaxed">
        Choisissez parmi de nombreux modes sportifs pré-configurés : course, vélo, natation, yoga et bien plus.
        Chaque activité est suivie avec des métriques précises pour vous aider à atteindre vos objectifs fitness.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Notifications Intelligentes</h4>
      <p class="text-gray-700 leading-relaxed">
        Restez connecté sans sortir votre téléphone. Recevez vos appels, messages, emails et notifications
        d'applications directement sur votre poignet. Contrôlez votre musique et prenez des photos à distance.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Autonomie Longue Durée</h4>
      <p class="text-gray-700 leading-relaxed">
        Avec 7 à 10 jours d'autonomie en usage normal, la MONSTER N LITE 203 vous accompagne toute la semaine
        sans recharge fréquente. Certifiée IP67, elle résiste à la poussière et aux éclaboussures, idéale pour
        un usage quotidien intensif.
      </p>
    </section>
  </div>
</div>`,
    highlights: [
      "Écran tactile couleur 1.4\" haute lisibilité",
      "Suivi santé 24/7 : cardio, sommeil, stress",
      "Multiples modes sportifs avec métriques précises",
      "Notifications intelligentes : appels, messages, apps",
      "Étanche IP67 - Résiste à la poussière et l'eau",
      "Autonomie 7-10 jours en usage normal"
    ],
    specifications: {
      "Écran": {
        "Taille": "1.4 pouces",
        "Type": "Tactile couleur",
        "Résolution": "Haute définition"
      },
      "Santé": {
        "Cardio-fréquencemètre": "24/7 continu",
        "Suivi du sommeil": "Automatique avec analyse",
        "Monitoring du stress": "Oui",
        "Compteur de pas": "Oui",
        "Suivi calories": "Oui"
      },
      "Sport": {
        "Modes sportifs": "Multiple (course, vélo, natation, yoga...)",
        "Métriques": "Distance, temps, calories, fréquence cardiaque"
      },
      "Connectivité": {
        "Bluetooth": "5.0",
        "Notifications": "Appels, SMS, emails, apps",
        "Contrôle musique": "Oui",
        "Photo à distance": "Oui"
      },
      "Autonomie": {
        "Durée": "7-10 jours en usage normal",
        "Charge": "Câble magnétique USB"
      },
      "Résistance": {
        "Étanchéité": "IP67",
        "Protection": "Poussière et éclaboussures"
      },
      "Compatibilité": {
        "Systèmes": "iOS 9.0+ et Android 5.0+",
        "Application": "Monster Fit"
      }
    }
  },
  {
    id: '8cb5c4ae-7e80-433d-bb5a-c2a0e7e683fc',
    name: 'MONSTER N LITE 206',
    description: `<div class="max-w-4xl mx-auto">
  <h3 class="text-2xl font-bold text-gray-900 mb-6">MONSTER N LITE 206 - Montre Connectée Premium Sport & Santé</h3>

  <div class="space-y-6">
    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Grand Écran HD 1.69" Immersif</h4>
      <p class="text-gray-700 leading-relaxed">
        Découvrez un écran tactile HD de 1.69 pouces offrant une surface d'affichage maximale et des couleurs
        éclatantes. La haute résolution garantit une excellente lisibilité des données, même en plein soleil,
        avec une interface moderne et fluide.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Suivi Santé Avancé avec SpO2</h4>
      <p class="text-gray-700 leading-relaxed">
        Bénéficiez d'un monitoring santé de pointe avec oxymètre de pouls SpO2 pour mesurer votre saturation
        en oxygène sanguin. Le suivi 24/7 inclut la fréquence cardiaque continue, l'analyse détaillée du sommeil
        avec phases REM, le monitoring du stress et des rappels pour maintenir une hydratation optimale et des
        pauses régulières.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Plus de 100 Modes Sportifs</h4>
      <p class="text-gray-700 leading-relaxed">
        Accédez à une bibliothèque impressionnante de plus de 100 modes sportifs : course, vélo, natation, yoga,
        musculation, HIIT, sports d'équipe et bien plus. Chaque activité dispose de métriques spécifiques pour
        un suivi ultra-précis de vos performances. Définissez vos objectifs et visualisez votre progression en
        temps réel.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Connectivité Complète</h4>
      <p class="text-gray-700 leading-relaxed">
        Restez connecté avec les notifications intelligentes pour appels, messages, emails et réseaux sociaux.
        Contrôlez votre musique, prenez des photos à distance, consultez la météo et gérez vos alarmes et
        minuteurs directement depuis votre poignet. Compatible avec les assistants vocaux pour un contrôle
        mains-libres.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Autonomie Exceptionnelle et Robustesse</h4>
      <p class="text-gray-700 leading-relaxed">
        Profitez de 7 à 12 jours d'autonomie selon votre utilisation, avec charge rapide pour une journée
        complète en moins d'une heure. Certifiée IP68, la MONSTER N LITE 206 résiste à l'immersion jusqu'à
        1.5 mètre pendant 30 minutes, parfaite pour la natation et les sports aquatiques. Son boîtier renforcé
        et son écran résistant aux rayures en font une compagne fiable pour toutes vos aventures.
      </p>
    </section>

    <section>
      <h4 class="text-xl font-semibold text-gray-900 mb-3">Personnalisation Illimitée</h4>
      <p class="text-gray-700 leading-relaxed">
        Exprimez votre style avec des centaines de cadrans personnalisables disponibles dans l'application
        Monster Fit. Changez de look selon vos humeurs et occasions, des designs sportifs aux élégants classiques.
      </p>
    </section>
  </div>
</div>`,
    highlights: [
      "Grand écran tactile HD 1.69\" avec affichage immersif",
      "Oxymètre SpO2 et suivi santé avancé 24/7",
      "Plus de 100 modes sportifs avec métriques détaillées",
      "Autonomie exceptionnelle : 7-12 jours",
      "Étanche IP68 - Natation et immersion",
      "Centaines de cadrans personnalisables"
    ],
    specifications: {
      "Écran": {
        "Taille": "1.69 pouces",
        "Type": "Tactile HD couleur",
        "Résolution": "Haute définition",
        "Luminosité": "Ajustable automatiquement"
      },
      "Santé Avancée": {
        "Oxymètre SpO2": "Mesure saturation oxygène",
        "Cardio-fréquencemètre": "24/7 continu haute précision",
        "Suivi du sommeil": "Analyse phases REM, léger, profond",
        "Monitoring du stress": "Continu avec conseils relaxation",
        "Compteur de pas": "Oui",
        "Calories brûlées": "Calcul précis",
        "Rappels santé": "Hydratation, mouvement, respiration"
      },
      "Sport": {
        "Modes sportifs": "100+ modes pré-configurés",
        "Sports principaux": "Course, vélo, natation, yoga, musculation, HIIT",
        "Métriques": "Distance, temps, allure, calories, VO2 max",
        "Objectifs": "Personnalisables par activité",
        "Historique": "Suivi progression long terme"
      },
      "Connectivité": {
        "Bluetooth": "5.1",
        "Notifications": "Appels, SMS, emails, réseaux sociaux",
        "Contrôle musique": "Lecture, pause, volume",
        "Photo à distance": "Déclencheur appareil photo",
        "Météo": "Prévisions temps réel",
        "Assistant vocal": "Compatible"
      },
      "Autonomie": {
        "Durée": "7-12 jours selon usage",
        "Mode économie": "Jusqu'à 20 jours",
        "Charge rapide": "1 journée en <1h",
        "Type charge": "Câble magnétique USB"
      },
      "Résistance": {
        "Étanchéité": "IP68",
        "Profondeur": "1.5m pendant 30min",
        "Activités": "Natation, douche, pluie",
        "Boîtier": "Renforcé anti-chocs",
        "Écran": "Verre trempé anti-rayures"
      },
      "Personnalisation": {
        "Cadrans": "Centaines disponibles",
        "Widgets": "Personnalisables",
        "Bracelets": "Interchangeables standard 22mm"
      },
      "Compatibilité": {
        "Systèmes": "iOS 10.0+ et Android 5.0+",
        "Application": "Monster Fit (gratuite)",
        "Synchronisation": "Automatique via Bluetooth"
      }
    }
  }
];

async function updateProduct(product) {
  console.log(`\n🔄 Mise à jour de ${product.name}...`);

  const { data, error } = await supabase
    .from('products')
    .update({
      category_id: MONTRES_CATEGORY_ID,
      description: product.description,
      highlights: product.highlights,
      specifications: product.specifications
    })
    .eq('id', product.id)
    .select();

  if (error) {
    console.error(`❌ Erreur pour ${product.name}:`, error);
    return false;
  }

  console.log(`✅ ${product.name} mis à jour avec succès`);
  return true;
}

async function main() {
  console.log('🚀 Début de la mise à jour des montres Monster...');
  console.log(`📂 Transfert de la catégorie Écouteurs vers Montres (${MONTRES_CATEGORY_ID})\n`);

  let successCount = 0;
  let failCount = 0;

  for (const product of products) {
    const success = await updateProduct(product);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    // Petit délai entre les requêtes
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✨ Mise à jour terminée`);
  console.log(`✅ Succès: ${successCount}`);
  console.log(`❌ Échecs: ${failCount}`);
}

main().catch(console.error);
