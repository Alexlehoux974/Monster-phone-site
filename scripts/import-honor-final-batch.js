const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env.local' });

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour générer des avis clients
function generateReviews(productName, count) {
  const reviewTemplates = [
    { author: 'Marie L.', location: 'Saint-Denis', rating: 5, title: 'Excellent produit !', comment: `${productName} répond parfaitement à mes attentes. Livraison rapide à La Réunion.` },
    { author: 'Jean-Pierre M.', location: 'Saint-Pierre', rating: 5, title: 'Très satisfait', comment: `Super ${productName.toLowerCase()}, je recommande vivement. Service client au top.` },
    { author: 'Sophie R.', location: 'Saint-Paul', rating: 4, title: 'Bon rapport qualité/prix', comment: `${productName} offre de bonnes performances. Petit bémol sur l'autonomie.` },
    { author: 'David C.', location: 'Saint-André', rating: 5, title: 'Parfait pour le gaming', comment: `J'utilise ${productName} pour jouer et c'est impeccable. Très fluide.` },
    { author: 'Nathalie B.', location: 'Saint-Leu', rating: 5, title: 'Je recommande', comment: `Excellent choix, ${productName} est vraiment de qualité. Livré rapidement.` }
  ];
  
  const reviews = [];
  for (let i = 0; i < count; i++) {
    const template = reviewTemplates[i % reviewTemplates.length];
    reviews.push({
      ...template,
      verified: true,
      helpful_count: Math.floor(Math.random() * 20),
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  return reviews;
}

async function importProducts() {
  try {
    // 1. HONOR PAD 9 WIFI 8+8/256
    const pad9Description = `
    <div class="space-y-6">
      <p class="text-lg">
        Découvrez la <strong>tablette HONOR PAD 9 WiFi</strong>, votre compagnon idéal pour le divertissement et la productivité. 
        Avec ses <strong>8 Go de RAM</strong> et <strong>256 Go de stockage</strong>, cette tablette gaming offre des performances exceptionnelles 
        pour le streaming 4K, les jeux mobiles et le multitâche intensif. Disponible en livraison express à La Réunion 974.
      </p>

      <div class="grid grid-cols-2 gap-4 my-8">
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🎮</span>
            <div>
              <p class="font-semibold text-purple-900 dark:text-purple-100">Gaming Mobile</p>
              <p class="text-sm text-purple-700 dark:text-purple-300">Performances optimales</p>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📺</span>
            <div>
              <p class="font-semibold text-blue-900 dark:text-blue-100">Écran Large</p>
              <p class="text-sm text-blue-700 dark:text-blue-300">Immersion totale</p>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <span class="text-2xl">⚡</span>
            <div>
              <p class="font-semibold text-green-900 dark:text-green-100">8 Go RAM</p>
              <p class="text-sm text-green-700 dark:text-green-300">Multitâche fluide</p>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <span class="text-2xl">💾</span>
            <div>
              <p class="font-semibold text-amber-900 dark:text-amber-100">256 Go</p>
              <p class="text-sm text-amber-700 dark:text-amber-300">Stockage généreux</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 class="text-lg font-semibold mb-4">Points forts de la tablette HONOR PAD 9</h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <span class="text-purple-600 mt-1">✓</span>
            <span>Écran immersif parfait pour le streaming Netflix, YouTube et Disney+ en qualité optimale</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-purple-600 mt-1">✓</span>
            <span>Processeur puissant compatible avec tous les jeux du Play Store incluant PUBG Mobile et Call of Duty Mobile</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-purple-600 mt-1">✓</span>
            <span>Autonomie longue durée pour une utilisation intensive toute la journée</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-purple-600 mt-1">✓</span>
            <span>WiFi rapide et stable pour le cloud gaming et le streaming sans interruption</span>
          </li>
        </ul>
      </div>

      <div class="border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20">
        <p class="text-center text-lg">
          <span class="font-bold text-purple-600">🚚 Livraison gratuite à La Réunion 974</span><br/>
          <span class="text-sm text-gray-600 dark:text-gray-400">Commandez maintenant et recevez votre tablette HONOR PAD 9 rapidement</span>
        </p>
      </div>
    </div>
    `;

    const pad9Id = crypto.randomUUID();
    const pad9Product = {
      id: pad9Id,
      name: 'HONOR PAD 9 WiFi 8+8/256GB',
      sku: 'HONORPAD9',
      url_slug: 'honor-pad-9-wifi-8-8-256gb',
      brand_id: 'cfa3e1d9-2b3b-4c5e-8f4a-9b7d6e3a1f2c',
      category_id: 'd5a2e3f4-9b8c-4d7e-8f1a-2b3c4d5e6f7a',
      description: pad9Description,
      short_description: 'Tablette gaming HONOR PAD 9 avec 8GB RAM et 256GB stockage',
      price: 359.99,
      original_price: 499.99,
      stock_quantity: 20,
      status: 'active',
      images: [
        'https://raw.githubusercontent.com/Monsterphoneisell/Monster-Phone-Images/main/HONOR/Tablettes/honor-pad-9-wifi.jpg'
      ],
      specifications: {
        'Écran': '11.5 pouces',
        'Mémoire': '8 Go RAM + 8 Go extensible',
        'Stockage': '256 Go',
        'Connectivité': 'WiFi 6',
        'Batterie': '8300 mAh',
        'OS': 'Android 13 avec MagicOS'
      },
      highlights: [
        'Écran 2K 120Hz',
        '8GB RAM + 256GB ROM',
        'Processeur Snapdragon',
        'Batterie 8300mAh',
        'Charge rapide 35W',
        'Audio stéréo',
        'WiFi 6'
      ],
      das_body: '1,09 W/kg',
      das_limb: '2,50 W/kg',
      weight_grams: 555,
      has_variants: false,
      average_rating: 4.7,
      total_reviews: 68
    };

    // 2. HONOR CHOICE WATCH (avec 2 variantes)
    const watchDescription = `
    <div class="space-y-6">
      <p class="text-lg">
        Découvrez la <strong>HONOR CHOICE WATCH</strong>, la montre connectée parfaite pour accompagner votre smartphone gaming. 
        Avec son design élégant et ses fonctionnalités avancées de suivi fitness, cette smartwatch est l'accessoire idéal 
        pour les gamers mobiles de La Réunion 974.
      </p>

      <div class="grid grid-cols-2 gap-4 my-8">
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <span class="text-2xl">⌚</span>
            <div>
              <p class="font-semibold text-blue-900 dark:text-blue-100">Smart Design</p>
              <p class="text-sm text-blue-700 dark:text-blue-300">Style moderne</p>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <span class="text-2xl">💓</span>
            <div>
              <p class="font-semibold text-green-900 dark:text-green-100">Suivi Santé</p>
              <p class="text-sm text-green-700 dark:text-green-300">24/7 monitoring</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 class="text-lg font-semibold mb-4">Fonctionnalités principales</h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <span class="text-blue-600 mt-1">✓</span>
            <span>Écran AMOLED haute définition pour une visibilité parfaite même en plein soleil à La Réunion</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-blue-600 mt-1">✓</span>
            <span>Suivi sportif complet avec plus de 100 modes d'entraînement</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-blue-600 mt-1">✓</span>
            <span>Autonomie jusqu'à 14 jours pour une utilisation sans contrainte</span>
          </li>
        </ul>
      </div>

      <div class="flex flex-wrap gap-2 mb-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          Étanche 5ATM
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          GPS intégré
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Appels Bluetooth
        </span>
      </div>

      <div class="border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
        <p class="text-center text-lg">
          <span class="font-bold text-blue-600">🚚 Livraison express La Réunion 974</span><br/>
          <span class="text-sm text-gray-600 dark:text-gray-400">Votre smartwatch livrée rapidement partout dans l'île</span>
        </p>
      </div>
    </div>
    `;

    const watchId = crypto.randomUUID();
    const watchProduct = {
      id: watchId,
      name: 'HONOR CHOICE WATCH',
      sku: 'HONORWATCH',
      url_slug: 'honor-choice-watch',
      brand_id: 'cfa3e1d9-2b3b-4c5e-8f4a-9b7d6e3a1f2c',
      category_id: '5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c', // Accessoires
      description: watchDescription,
      short_description: 'Montre connectée HONOR CHOICE avec suivi fitness avancé',
      price: 149.99,
      original_price: 199.99,
      stock_quantity: 0,
      status: 'active',
      images: [
        'https://raw.githubusercontent.com/Monsterphoneisell/Monster-Phone-Images/main/HONOR/Accessoires/honor-choice-watch.jpg'
      ],
      specifications: {
        'Écran': '1.95 pouces AMOLED',
        'Autonomie': '14 jours',
        'Étanchéité': '5ATM',
        'Capteurs': 'Cardiaque, SpO2, Sommeil',
        'Connectivité': 'Bluetooth 5.2',
        'Compatibilité': 'Android 8.0+ / iOS 12.0+'
      },
      highlights: [
        'Écran AMOLED 1.95"',
        'Autonomie 14 jours',
        'Plus de 100 modes sport',
        'Étanche 5ATM',
        'Appels Bluetooth',
        'GPS intégré',
        'Suivi santé 24/7'
      ],
      has_variants: true,
      average_rating: 4.5,
      total_reviews: 42
    };

    // 3. HONOR X5
    const x5Description = `
    <div class="space-y-6">
      <p class="text-lg">
        Découvrez le <strong>HONOR X5</strong>, le smartphone abordable parfait pour débuter dans le gaming mobile. 
        Avec son excellent rapport qualité-prix, ce téléphone offre des performances surprenantes pour le streaming et les jeux légers. 
        Idéal pour les jeunes gamers de La Réunion 974.
      </p>

      <div class="grid grid-cols-2 gap-4 my-8">
        <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <span class="text-2xl">💰</span>
            <div>
              <p class="font-semibold text-green-900 dark:text-green-100">Prix Mini</p>
              <p class="text-sm text-green-700 dark:text-green-300">Budget maîtrisé</p>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📱</span>
            <div>
              <p class="font-semibold text-blue-900 dark:text-blue-100">Android 13</p>
              <p class="text-sm text-blue-700 dark:text-blue-300">Système récent</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 class="text-lg font-semibold mb-4">Points forts du HONOR X5</h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <span class="text-green-600 mt-1">✓</span>
            <span>Écran HD+ pour profiter de vos contenus préférés</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-green-600 mt-1">✓</span>
            <span>Batterie longue durée pour une journée complète d'utilisation</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-green-600 mt-1">✓</span>
            <span>Caméra avec IA pour des photos réussies facilement</span>
          </li>
        </ul>
      </div>

      <div class="flex flex-wrap gap-2 mb-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Meilleur prix
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Android 13
        </span>
      </div>

      <div class="border-2 border-green-200 dark:border-green-800 rounded-xl p-6 bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/20 dark:to-blue-900/20">
        <p class="text-center text-lg">
          <span class="font-bold text-green-600">🚚 Livraison offerte La Réunion 974</span><br/>
          <span class="text-sm text-gray-600 dark:text-gray-400">Stock limité, commandez vite votre HONOR X5</span>
        </p>
      </div>
    </div>
    `;

    const x5Id = crypto.randomUUID();
    const x5Product = {
      id: x5Id,
      name: 'HONOR X5',
      sku: 'HONORX5',
      url_slug: 'honor-x5',
      brand_id: 'cfa3e1d9-2b3b-4c5e-8f4a-9b7d6e3a1f2c',
      category_id: 'a7f3e9d8-5c4b-4a2e-9f8d-3b5c7e9d2a1f',
      description: x5Description,
      short_description: 'Smartphone HONOR X5 - Le gaming mobile accessible à tous',
      price: 49.99,
      original_price: 99.99,
      stock_quantity: 56,
      status: 'active',
      images: [
        'https://raw.githubusercontent.com/Monsterphoneisell/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5.jpg'
      ],
      specifications: {
        'Écran': '6.5 pouces HD+',
        'Processeur': 'MediaTek',
        'Mémoire': '2 Go RAM',
        'Stockage': '32 Go',
        'Batterie': '5000 mAh',
        'OS': 'Android 13'
      },
      highlights: [
        'Écran 6.5" HD+',
        'Batterie 5000mAh',
        'Android 13',
        'Caméra avec IA',
        'Design moderne',
        'Prix imbattable'
      ],
      has_variants: false,
      average_rating: 4.2,
      total_reviews: 89
    };

    // Insérer les produits
    const { error: error1 } = await supabase
      .from('products')
      .insert([pad9Product, watchProduct, x5Product]);

    if (error1) {
      console.error('Erreur lors de l\'insertion des produits:', error1);
      return;
    }

    console.log('✅ Produits insérés avec succès');

    // Ajouter les variantes pour la montre
    const watchVariants = [
      {
        product_id: watchId,
        color: 'Noir',
        color_code: '#000000',
        ean: '6971664934366',
        stock: 0,
        is_default: true
      },
      {
        product_id: watchId,
        color: 'Blanc',
        color_code: '#FFFFFF',
        ean: '6971664934373',
        stock: 0,
        is_default: false
      }
    ];

    const { error: error2 } = await supabase
      .from('product_variants')
      .insert(watchVariants);

    if (error2) {
      console.error('Erreur lors de l\'insertion des variantes:', error2);
      return;
    }

    console.log('✅ Variantes insérées avec succès');

    // Ajouter les reviews
    for (const [product, productId] of [[pad9Product, pad9Id], [watchProduct, watchId], [x5Product, x5Id]]) {
      const reviews = generateReviews(product.name, Math.min(5, product.total_reviews));
      const reviewsToInsert = reviews.map(review => ({
        ...review,
        product_id: productId
      }));

      const { error } = await supabase
        .from('product_reviews')
        .insert(reviewsToInsert);

      if (error) {
        console.error(`Erreur lors de l'insertion des avis pour ${product.name}:`, error);
      } else {
        console.log(`✅ ${reviews.length} avis ajoutés pour ${product.name}`);
      }
    }

    console.log('\n🎉 Import terminé avec succès !');
    console.log('Produits importés :');
    console.log('- HONOR PAD 9 WiFi 8+8/256GB (359.99€)');
    console.log('- HONOR CHOICE WATCH avec 2 variantes (149.99€)');
    console.log('- HONOR X5 (49.99€)');

  } catch (error) {
    console.error('Erreur générale:', error);
  }
}

importProducts();