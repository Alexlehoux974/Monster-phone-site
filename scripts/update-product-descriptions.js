const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour générer une description enrichie SEO
function generateEnrichedDescription(product) {
  const { name, price, short_description } = product;
  
  // Extraire les infos du nom
  const ramMatch = name.match(/(\d+)\+(\d+)/);
  const storageMatch = name.match(/(\d+)GB/);
  const modelMatch = name.match(/HONOR ([A-Z0-9]+)/);
  
  const ramPhysical = ramMatch ? ramMatch[1] : '4';
  const ramVirtual = ramMatch ? ramMatch[2] : '4';
  const ramTotal = parseInt(ramPhysical) + parseInt(ramVirtual);
  const storage = storageMatch ? storageMatch[1] : '128';
  const model = modelMatch ? modelMatch[1] : 'X6B';
  
  // Définir les caractéristiques selon le modèle
  let features = {};
  
  if (model.includes('X5B')) {
    features = {
      screen: '6.56"',
      battery: '5000mAh',
      camera: '13MP',
      charging: '22.5W',
      processor: 'MediaTek Helio G85',
      special: 'entrée de gamme performant'
    };
  } else if (model.includes('X7C')) {
    features = {
      screen: '6.77"',
      battery: '6000mAh',
      camera: '108MP',
      charging: '35W',
      processor: 'Snapdragon 680',
      special: 'milieu de gamme premium'
    };
  } else if (model.includes('X8B')) {
    features = {
      screen: '6.7" AMOLED',
      battery: '5000mAh',
      camera: '108MP',
      charging: '35W',
      processor: 'Snapdragon 685',
      special: 'flagship abordable'
    };
  } else {
    features = {
      screen: '6.56"',
      battery: '5000mAh',
      camera: '50MP',
      charging: '35W',
      processor: 'MediaTek Dimensity',
      special: 'équilibre parfait'
    };
  }

  return `<div class="max-w-4xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <span class="w-1 h-8 bg-red-500 rounded-full"></span>
      HONOR ${model} - L'${features.special} entre performance et prix
    </h3>
    
    <!-- Badges -->
    <div class="flex flex-wrap gap-2 mb-6">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        ✓ ${storage}GB stockage
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        📷 Caméra ${features.camera}
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        🔋 ${features.battery}
      </span>
    </div>

    <!-- Description principale enrichie SEO -->
    <div class="prose prose-lg max-w-none mb-8">
      <p class="text-gray-700 leading-relaxed">
        Le <strong>HONOR ${model} ${ramPhysical}+${ramVirtual}/${storage}GB</strong> redéfinit les standards du smartphone Android moderne avec son écran immersif ${features.screen} et sa batterie longue durée de ${features.battery}. 
        Ce smartphone nouvelle génération est équipé de <strong>${storage}GB de stockage interne</strong> extensible et <strong>${ramTotal}GB de RAM totale</strong> (${ramPhysical}GB physique + ${ramVirtual}GB virtuelle Magic RAM), 
        garantissant une expérience utilisateur fluide et ultra-réactive pour tous vos besoins quotidiens, professionnels et de divertissement.
        Conçu spécialement pour les utilisateurs exigeants de La Réunion 974, le HONOR ${model} combine <strong>performances exceptionnelles</strong>, 
        <strong>autonomie record</strong> et <strong>photographie avancée</strong> avec son capteur ${features.camera}. 
        Son processeur ${features.processor} optimisé, couplé à la technologie HONOR RAM Turbo, assure un multitâche sans ralentissement, 
        idéal pour le gaming mobile, le streaming vidéo 4K, les applications professionnelles et la création de contenu.
        Avec sa charge rapide ${features.charging}, retrouvez 50% de batterie en seulement 30 minutes.
      </p>
    </div>

    <!-- Points forts en grille avec icônes -->
    <div class="grid md:grid-cols-2 gap-4 mb-8">
      <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">📱</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Écran ${features.screen}</h4>
            <p class="text-sm text-gray-600">Immersion totale avec un ratio écran/corps optimisé</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">📸</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Caméra ${features.camera} IA</h4>
            <p class="text-sm text-gray-600">Photos professionnelles avec IA et mode nuit</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🔋</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Batterie ${features.battery}</h4>
            <p class="text-sm text-gray-600">Jusqu'à 2 jours d'autonomie en usage normal</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">⚡</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Charge rapide ${features.charging}</h4>
            <p class="text-sm text-gray-600">50% de batterie en seulement 30 minutes</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Encart spécial stockage -->
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <h4 class="font-bold text-blue-900 mb-2">💾 Stockage optimisé ${storage}GB</h4>
      <p class="text-blue-800">Avec ${storage}GB de stockage interne extensible, stockez ${storage === '512' ? 'plus de 100 000' : storage === '256' ? 'plus de 60 000' : storage === '128' ? 'plus de 30 000' : 'plus de 15 000'} photos, 
      ${storage === '512' ? '200' : storage === '256' ? '100' : storage === '128' ? '50' : '25'} heures de vidéos HD ou des ${storage === '64' ? 'centaines' : 'milliers'} d'applications sans compromis.</p>
    </div>

    <!-- Encart DAS avec design moderne -->
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
      <h4 class="font-semibold text-amber-900 mb-3 flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
        </svg>
        Valeurs DAS certifiées
      </h4>
      <div class="grid grid-cols-3 gap-4 text-sm">
        <div class="text-center">
          <div class="text-2xl mb-1">👤</div>
          <span class="block text-amber-700 font-medium">Tête</span>
          <span class="text-amber-900 font-bold">0,82 W/kg</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">👔</div>
          <span class="block text-amber-700 font-medium">Corps</span>
          <span class="text-amber-900 font-bold">1,21 W/kg</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">🦵</div>
          <span class="block text-amber-700 font-medium">Membres</span>
          <span class="text-amber-900 font-bold">2,58 W/kg</span>
        </div>
      </div>
    </div>

    <!-- Call to action -->
    <div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">
      <p class="font-semibold text-lg">🎁 Offre spéciale La Réunion</p>
      <p class="text-sm opacity-90 mt-1">Livraison gratuite • Garantie 2 ans • Support technique local 974 • Prix imbattable ${price}€</p>
    </div>
  </div>`;
}

async function updateAllProducts() {
  // Récupérer tous les produits
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, url_slug, price, short_description')
    .order('name');

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${products.length} products to update`);

  for (const product of products) {
    const enrichedDescription = generateEnrichedDescription(product);
    
    const { error: updateError } = await supabase
      .from('products')
      .update({ description: enrichedDescription })
      .eq('id', product.id);

    if (updateError) {
      console.error(`Error updating ${product.name}:`, updateError);
    } else {
      console.log(`✅ Updated: ${product.name}`);
    }
  }

  console.log('All products updated!');
}

updateAllProducts();