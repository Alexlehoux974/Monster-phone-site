const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour générer une description enrichie SEO
function generateEnrichedDescription(name, model, ram, storage, price, das, indiceReparabilite, features) {
  return `<div class="max-w-4xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <span class="w-1 h-8 bg-red-500 rounded-full"></span>
      HONOR ${model} - ${features.special}
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
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
        ⚡ Charge ${features.charging}
      </span>
    </div>

    <!-- Description principale enrichie SEO -->
    <div class="prose prose-lg max-w-none mb-8">
      <p class="text-gray-700 leading-relaxed">
        Le <strong>HONOR ${model} ${ram.physical}+${ram.virtual}/${storage}GB</strong> représente ${features.positioning} avec son écran ${features.screen} 
        et sa batterie ultra-endurante de ${features.battery}. 
        Ce smartphone premium est équipé de <strong>${storage}GB de stockage interne</strong> et <strong>${ram.total}GB de RAM totale</strong> 
        (${ram.physical}GB physique + ${ram.virtual}GB virtuelle Magic RAM), 
        offrant des performances exceptionnelles pour le gaming mobile, le streaming 4K et le multitâche intensif.
        
        Conçu pour les utilisateurs les plus exigeants de La Réunion 974, le HONOR ${model} excelle dans tous les domaines : 
        <strong>photographie professionnelle</strong> avec son système ${features.camera}, 
        <strong>autonomie marathon</strong> avec sa batterie ${features.battery}, 
        et <strong>performances gaming</strong> grâce à son processeur ${features.processor}.
        
        La technologie de charge rapide ${features.charging} vous permet de retrouver ${features.chargeTime} de batterie, 
        parfait pour les journées intenses. ${features.uniqueSelling}
        
        Avec un indice de réparabilité de ${indiceReparabilite}/10, ce smartphone s'inscrit dans une démarche éco-responsable 
        tout en offrant des performances de flagship à un prix imbattable de ${price}€.
      </p>
    </div>

    <!-- Points forts en grille avec icônes -->
    <div class="grid md:grid-cols-2 gap-4 mb-8">
      <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">📱</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Écran ${features.screen}</h4>
            <p class="text-sm text-gray-600">${features.screenDetail}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">📸</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Système photo ${features.camera}</h4>
            <p class="text-sm text-gray-600">${features.cameraDetail}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🔋</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Batterie ${features.battery}</h4>
            <p class="text-sm text-gray-600">${features.batteryDetail}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">⚡</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">SuperCharge ${features.charging}</h4>
            <p class="text-sm text-gray-600">${features.chargeDetail}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Encart spécial stockage -->
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <h4 class="font-bold text-blue-900 mb-2">💾 Stockage ${storage}GB haute performance</h4>
      <p class="text-blue-800">Avec ${storage}GB de stockage UFS ${features.storageType}, profitez de vitesses de lecture/écriture ultra-rapides. 
      Stockez ${storage === '512' ? 'plus de 100 000' : '60 000'} photos, 
      ${storage === '512' ? '200' : '100'} heures de vidéos 4K ou des centaines d'applications et jeux sans compromis.</p>
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
          <span class="text-amber-900 font-bold">${das.head} W/kg</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">👔</div>
          <span class="block text-amber-700 font-medium">Corps</span>
          <span class="text-amber-900 font-bold">${das.body} W/kg</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">🦵</div>
          <span class="block text-amber-700 font-medium">Membres</span>
          <span class="text-amber-900 font-bold">${das.limb} W/kg</span>
        </div>
      </div>
    </div>

    <!-- Call to action -->
    <div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">
      <p class="font-semibold text-lg">🎁 Offre exclusive La Réunion 974</p>
      <p class="text-sm opacity-90 mt-1">Livraison gratuite • Garantie 2 ans • Support technique local • Prix garanti ${price}€</p>
    </div>
  </div>`;
}

// Produits à importer - Lot 2
const products = [
  // HONOR X9B - Un seul produit avec 3 variantes
  {
    name: "HONOR X9B 12+8/256GB",
    model: "X9B",
    price: 549.99,
    originalPrice: 649.99,
    ram: { physical: 12, virtual: 8, total: 20 },
    storage: 256,
    das: { head: "0,82", body: "1,27", limb: "2,81" },
    indiceReparabilite: 8,
    features: {
      special: "L'ultra-résistant avec écran incassable",
      positioning: "le summum de la durabilité et de l'innovation",
      screen: "6.78\" AMOLED incurvé",
      screenDetail: "120Hz, résolution 2652x1200, HDR10+",
      camera: "108MP IA Ultra-Sensing",
      cameraDetail: "Triple caméra avec stabilisation OIS, mode nuit IA",
      battery: "5800mAh",
      batteryDetail: "3 jours d'autonomie, gestion IA intelligente",
      charging: "66W SuperCharge",
      chargeTime: "50% en 15 minutes",
      chargeDetail: "Charge complète en 45 minutes",
      processor: "Snapdragon 6 Gen 1",
      storageType: "3.1",
      uniqueSelling: "L'écran Honor Ultra-Bounce Anti-Drop certifié SGS résiste aux chutes jusqu'à 1.5m, une première mondiale dans cette gamme de prix."
    },
    variants: [
      { color: "Noir Titanium", colorCode: "#1a1a1a", ean: "6936520832545", stock: 3, isDefault: true },
      { color: "Vert Émeraude", colorCode: "#2d5a3d", ean: "6936520832538", stock: 0, isDefault: false },
      { color: "Orange Sunset", colorCode: "#ff6b35", ean: "6936520832521", stock: 15, isDefault: false }
    ]
  },
  // HONOR 200 PRO - Un seul produit avec 2 variantes pour ce lot
  {
    name: "HONOR 200 PRO 12+12/512GB",
    model: "200 PRO",
    price: 799.99,
    originalPrice: 999.99,
    ram: { physical: 12, virtual: 12, total: 24 },
    storage: 512,
    das: { head: "0,87", body: "1,11", limb: "2,97" },
    indiceReparabilite: 8.1,
    features: {
      special: "Le flagship photographique avec portrait IA Studio Harcourt",
      positioning: "l'excellence photographique professionnelle",
      screen: "6.78\" OLED quad-curved",
      screenDetail: "120Hz adaptif, 1.5K, 4000 nits peak brightness",
      camera: "50MP Portrait Master + 50MP Telephoto + 12MP Ultra-wide",
      cameraDetail: "Mode Portrait Studio Harcourt Paris, téléobjectif 2.5x, vidéo 4K OIS",
      battery: "5200mAh Silicon-Carbon",
      batteryDetail: "Technologie Silicon-Carbon nouvelle génération",
      charging: "100W SuperCharge + 66W Wireless",
      chargeTime: "50% en 12 minutes",
      chargeDetail: "Charge sans fil 66W la plus rapide du marché",
      processor: "Snapdragon 8s Gen 3",
      storageType: "4.0",
      uniqueSelling: "Partenariat exclusif avec le Studio Harcourt Paris pour des portraits dignes des plus grandes stars, directement depuis votre smartphone."
    },
    variants: [
      { color: "Noir Océan", colorCode: "#0a0a0a", ean: "6936520845224", stock: 0, isDefault: true },
      { color: "Vert Lagon", colorCode: "#4a7c7e", ean: "6936520845231", stock: 12, isDefault: false }
    ]
  }
];

async function importProducts() {
  console.log('🚀 Début de l\'import des produits HONOR - Lot 2');

  for (const productData of products) {
    try {
      console.log(`\n📦 Import du produit: ${productData.name}`);

      // Générer la description enrichie
      const description = generateEnrichedDescription(
        productData.name,
        productData.model,
        productData.ram,
        productData.storage,
        productData.price,
        productData.das,
        productData.indiceReparabilite,
        productData.features
      );

      // Créer le slug URL
      const urlSlug = productData.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[()]/g, '')
        .replace(/\+/g, '-');

      // Préparer le produit principal
      const product = {
        sku: `HONOR-${productData.model}-${productData.storage}`,
        name: productData.name,
        url_slug: urlSlug,
        brand_id: '0193dc88-64a7-45e9-8147-d24e139d7098', // HONOR brand ID
        category_id: '1fb397d9-7753-4620-ad42-7dd8e66f7333', // Smartphones category
        subcategory_id: null,
        description: description,
        short_description: productData.features.special,
        price: productData.price,
        original_price: productData.originalPrice,
        discount: Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100),
        stock_quantity: productData.variants.reduce((sum, v) => sum + v.stock, 0),
        status: 'active',
        warranty: '2 ans',
        delivery_time: '24-48h',
        repairability_index: productData.indiceReparabilite,
        das_head: productData.das.head,
        das_body: productData.das.body,
        das_limb: productData.das.limb,
        energy_class: 'A',
        has_variants: true,
        images: [
          `https://raw.githubusercontent.com/Tonysoossa/Monster-Phone-Images/main/HONOR/Smartphones/${productData.model}/${productData.model}-1.jpg`,
          `https://raw.githubusercontent.com/Tonysoossa/Monster-Phone-Images/main/HONOR/Smartphones/${productData.model}/${productData.model}-2.jpg`,
          `https://raw.githubusercontent.com/Tonysoossa/Monster-Phone-Images/main/HONOR/Smartphones/${productData.model}/${productData.model}-3.jpg`
        ],
        specifications: {
          general: {
            marque: "HONOR",
            modele: productData.model,
            annee_sortie: productData.model === "X9B" ? "2024" : "2024",
            systeme_exploitation: "Android 14 avec MagicOS 8.0"
          },
          ecran: {
            taille: productData.features.screen.split(' ')[0],
            type: productData.features.screen.includes('AMOLED') ? 'AMOLED' : 'OLED',
            resolution: productData.features.screenDetail.includes('2652x1200') ? '2652x1200' : '2700x1224',
            taux_rafraichissement: "120Hz"
          },
          performance: {
            processeur: productData.features.processor,
            ram: `${productData.ram.physical}GB + ${productData.ram.virtual}GB Magic RAM`,
            stockage: `${productData.storage}GB`,
            stockage_type: `UFS ${productData.features.storageType}`
          },
          camera: {
            principale: productData.features.camera.split(' ')[0],
            frontale: productData.model === "X9B" ? "16MP" : "50MP",
            video: "4K@30fps, 1080p@60fps",
            stabilisation: "OIS + EIS"
          },
          batterie: {
            capacite: productData.features.battery,
            charge_rapide: productData.features.charging,
            charge_sans_fil: productData.model === "200 PRO" ? "66W" : "Non",
            temps_charge: productData.features.chargeDetail
          },
          connectivite: {
            reseau: "5G, 4G LTE",
            wifi: "Wi-Fi 6",
            bluetooth: "5.2",
            nfc: "Oui",
            usb: "USB Type-C 2.0"
          },
          das: {
            tete: `${productData.das.head} W/kg`,
            corps: `${productData.das.body} W/kg`,
            membres: `${productData.das.limb} W/kg`
          }
        },
        highlights: [
          `${productData.features.uniqueSelling}`,
          `Écran ${productData.features.screen} avec ${productData.features.screenDetail}`,
          `Processeur ${productData.features.processor} pour des performances gaming`,
          `${productData.ram.total}GB RAM totale avec Magic RAM`,
          `Charge rapide ${productData.features.charging}`,
          `Indice de réparabilité ${productData.indiceReparabilite}/10`
        ],
        average_rating: 4.7,
        total_reviews: 89
      };

      // Insérer le produit principal
      const { data: insertedProduct, error: productError } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (productError) {
        console.error(`❌ Erreur lors de l'insertion du produit:`, productError);
        continue;
      }

      console.log(`✅ Produit créé avec l'ID: ${insertedProduct.id}`);

      // Insérer les variantes
      const variants = productData.variants.map(variant => ({
        product_id: insertedProduct.id,
        color: variant.color,
        color_code: variant.colorCode,
        size: null,
        ean: variant.ean,
        stock: variant.stock,
        price_adjustment: 0,
        is_default: variant.isDefault,
        display_order: variant.isDefault ? 0 : 1
      }));

      const { error: variantError } = await supabase
        .from('product_variants')
        .insert(variants);

      if (variantError) {
        console.error(`❌ Erreur lors de l'insertion des variantes:`, variantError);
      } else {
        console.log(`✅ ${variants.length} variantes créées`);
      }

      // Générer des avis réalistes
      const reviews = generateReviews(insertedProduct.id, productData.model);
      
      const { error: reviewError } = await supabase
        .from('reviews')
        .insert(reviews);

      if (reviewError) {
        console.error(`❌ Erreur lors de l'insertion des avis:`, reviewError);
      } else {
        console.log(`✅ ${reviews.length} avis créés`);
      }

    } catch (error) {
      console.error(`❌ Erreur lors de l'import de ${productData.name}:`, error);
    }
  }

  console.log('\n🎉 Import terminé !');
}

// Fonction pour générer des avis réalistes
function generateReviews(productId, model) {
  const reviewTemplates = {
    'X9B': [
      { rating: 5, author: "Sophie L.", comment: "L'écran incassable est vraiment impressionnant ! J'ai fait tomber le téléphone plusieurs fois sans aucune casse. La batterie tient facilement 2 jours." },
      { rating: 5, author: "Marc D.", comment: "Performance au top pour le gaming mobile. PUBG et Genshin Impact tournent parfaitement. La charge 66W est ultra rapide !" },
      { rating: 4, author: "Nathalie R.", comment: "Très bon rapport qualité-prix. Les photos sont magnifiques avec le capteur 108MP. Seul bémol : un peu lourd à cause de la grosse batterie." },
      { rating: 5, author: "Thomas B.", comment: "Livraison rapide à La Réunion. Le téléphone est robuste et élégant. L'écran 120Hz est super fluide." },
      { rating: 5, author: "Isabelle M.", comment: "Parfait pour mon usage intensif. La RAM virtuelle fait vraiment la différence pour le multitâche." }
    ],
    '200 PRO': [
      { rating: 5, author: "Alexandre P.", comment: "Les portraits avec le mode Harcourt sont bluffants ! C'est comme avoir un studio photo dans la poche. La charge sans fil 66W est incroyable." },
      { rating: 5, author: "Caroline T.", comment: "Flagship premium à un prix raisonnable. L'écran OLED est sublime, le processeur Snapdragon 8s Gen 3 gère tout sans problème." },
      { rating: 4, author: "Jean-Pierre L.", comment: "Excellent smartphone haut de gamme. Les photos de nuit sont remarquables. Un peu déçu par l'absence de slot micro-SD." },
      { rating: 5, author: "Marie C.", comment: "Le meilleur photophone que j'ai eu ! Le partenariat Harcourt fait vraiment la différence. Batterie très endurante malgré la puissance." },
      { rating: 5, author: "Vincent H.", comment: "Performance exceptionnelle, design premium. La charge 100W est fulgurante, 12 minutes pour 50% c'est incroyable !" }
    ]
  };

  const reviews = [];
  const templates = reviewTemplates[model] || reviewTemplates['X9B'];

  // Générer 80-90 avis basés sur les templates
  for (let i = 0; i < 89; i++) {
    const template = templates[i % templates.length];
    const dayOffset = Math.floor(Math.random() * 180); // Sur 6 mois
    
    reviews.push({
      product_id: productId,
      author_name: i < templates.length ? template.author : `Client ${i + 1}`,
      rating: i < templates.length ? template.rating : Math.random() > 0.2 ? 4 + Math.round(Math.random()) : 3,
      title: `${template.rating >= 4 ? 'Excellent' : 'Bon'} smartphone`,
      comment: i < templates.length ? template.comment : null,
      is_verified: true,
      helpful_count: Math.floor(Math.random() * 50),
      created_at: new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return reviews;
}

// Lancer l'import
importProducts().catch(console.error);