-- Script pour mettre à jour toutes les descriptions des produits avec la structure HTML correcte

-- 1. POWERBANK MY WAY 20000 mAh
UPDATE products 
SET description = '<div class="max-w-4xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <span class="w-1 h-8 bg-red-500 rounded-full"></span>
      POWERBANK MY WAY 20000 mAh - L''autonomie ultime pour gamers
    </h3>
    
    <!-- Badges -->
    <div class="flex flex-wrap gap-2 mb-6">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        ✓ 20000 mAh ultra capacité
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        ⚡ Charge rapide PD 30W
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        🔌 4 sorties simultanées
      </span>
    </div>

    <!-- Description principale enrichie SEO -->
    <div class="prose prose-lg max-w-none mb-8">
      <p class="text-gray-700 leading-relaxed">
        La <strong>POWERBANK MY WAY 20000 mAh</strong> est la solution d''alimentation définitive pour les gamers professionnels et streamers de La Réunion 974. 
        Avec sa capacité massive de <strong>20000 mAh</strong>, cette powerbank peut recharger votre smartphone gaming jusqu''à 5 fois, 
        votre tablette 2 fois ou maintenir votre Nintendo Switch alimentée pendant des heures de gaming mobile intensif.
        Conçue pour les marathons gaming et les tournois esports à La Réunion, cette powerbank MY WAY intègre la technologie <strong>Power Delivery 30W</strong>, 
        la <strong>charge Quick Charge 3.0</strong> et <strong>4 ports de sortie</strong> pour alimenter simultanément tous vos appareils gaming. 
        Son écran LED intelligent affiche précisément le niveau de charge restant, vous permettant de gérer votre autonomie pendant vos streams 4K ou sessions PUBG Mobile.
      </p>
    </div>

    <!-- Points forts en grille avec icônes -->
    <div class="grid md:grid-cols-2 gap-4 mb-8">
      <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🔋</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Capacité 20000 mAh</h4>
            <p class="text-sm text-gray-600">5 charges complètes pour smartphone, idéal pour voyages</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">⚡</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Power Delivery 30W</h4>
            <p class="text-sm text-gray-600">Charge ultra-rapide pour iPhone 15 Pro et Android flagship</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">📟</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Écran LED intelligent</h4>
            <p class="text-sm text-gray-600">Affichage précis du pourcentage de batterie restant</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🎮</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Gaming approved</h4>
            <p class="text-sm text-gray-600">Compatible Nintendo Switch, Steam Deck, ROG Phone</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Encart spécial endurance -->
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <h4 class="font-bold text-blue-900 mb-2">⏱️ Autonomie marathon gaming</h4>
      <p class="text-blue-800">Jusqu''à 48 heures d''autonomie supplémentaire pour vos appareils. 
      Parfait pour les LAN parties, conventions gaming ou voyages longue distance depuis La Réunion.</p>
    </div>

    <!-- Encart certifications avec design moderne -->
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
      <h4 class="font-semibold text-amber-900 mb-3 flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
        </svg>
        Certifications et sécurité
      </h4>
      <div class="grid grid-cols-3 gap-4 text-sm">
        <div class="text-center">
          <div class="text-2xl mb-1">✅</div>
          <span class="block text-amber-700 font-medium">CE/FCC</span>
          <span class="text-amber-900 font-bold">Certifié</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">✈️</div>
          <span class="block text-amber-700 font-medium">Transport</span>
          <span class="text-amber-900 font-bold">Autorisé avion</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">🔐</div>
          <span class="block text-amber-700 font-medium">Protection</span>
          <span class="text-amber-900 font-bold">Multi-niveau</span>
        </div>
      </div>
    </div>

    <!-- Call to action -->
    <div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">
      <p class="font-semibold text-lg">🎁 Offre exclusive gaming La Réunion</p>
      <p class="text-sm opacity-90 mt-1">Livraison gratuite 974 • Garantie 2 ans • SAV local Monster Phone</p>
    </div>
  </div>'
WHERE sku = 'MWPOW0004';

-- 2. POWERBANK ABYX 10000 mAh
UPDATE products 
SET description = '<div class="max-w-4xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <span class="w-1 h-8 bg-red-500 rounded-full"></span>
      POWERBANK ABYX 10000 mAh - Performance et style au rendez-vous
    </h3>
    
    <!-- Badges -->
    <div class="flex flex-wrap gap-2 mb-6">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        ✓ 10000 mAh compact
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        🎨 2 coloris disponibles
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        ⚡ Charge rapide 20W
      </span>
    </div>

    <!-- Description principale enrichie SEO -->
    <div class="prose prose-lg max-w-none mb-8">
      <p class="text-gray-700 leading-relaxed">
        La <strong>POWERBANK ABYX 10000 mAh</strong> allie design élégant et performances exceptionnelles pour les gamers mobiles de La Réunion 974. 
        Disponible en <strong>coloris Noir ou Blanc</strong>, cette powerbank s''adapte parfaitement à votre style et votre setup gaming. 
        Sa capacité de <strong>10000 mAh</strong> offre jusqu''à 3 charges complètes pour votre smartphone gaming, garantissant une autonomie optimale lors de vos sessions de jeu intensives.
        Équipée de la technologie <strong>charge rapide 20W</strong>, cette powerbank ABYX recharge vos appareils à vitesse maximale. 
        Compatible avec tous les smartphones gaming du marché - iPhone, Samsung Galaxy, HONOR, Xiaomi - elle devient votre alliée indispensable pour le gaming mobile, 
        le streaming 4K et les tournois esports à La Réunion. Son design ultra-compact se glisse facilement dans votre sac gaming pour vous accompagner partout.
      </p>
    </div>

    <!-- Points forts en grille avec icônes -->
    <div class="grid md:grid-cols-2 gap-4 mb-8">
      <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🔋</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">10000 mAh optimisés</h4>
            <p class="text-sm text-gray-600">Batterie lithium-polymère haute densité</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🎨</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Design premium</h4>
            <p class="text-sm text-gray-600">Finition soft-touch, disponible en noir ou blanc</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">📱</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Double charge</h4>
            <p class="text-sm text-gray-600">Chargez 2 appareils simultanément</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">✨</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">LED indicateur</h4>
            <p class="text-sm text-gray-600">4 LEDs pour visualiser le niveau de charge</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Encart spécial mobilité -->
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <h4 class="font-bold text-blue-900 mb-2">🎒 Mobilité gaming optimale</h4>
      <p class="text-blue-800">Format pocket ultra-compact de seulement 138g. 
      Parfait pour les déplacements quotidiens, tournois gaming ou voyages depuis La Réunion 974.</p>
    </div>

    <!-- Encart protection avec design moderne -->
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
      <h4 class="font-semibold text-amber-900 mb-3 flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
        </svg>
        Technologies de protection ABYX
      </h4>
      <div class="grid grid-cols-3 gap-4 text-sm">
        <div class="text-center">
          <div class="text-2xl mb-1">🛡️</div>
          <span class="block text-amber-700 font-medium">MultiProtect</span>
          <span class="text-amber-900 font-bold">Système actif</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">🌡️</div>
          <span class="block text-amber-700 font-medium">Température</span>
          <span class="text-amber-900 font-bold">Régulée</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">⚡</div>
          <span class="block text-amber-700 font-medium">Voltage</span>
          <span class="text-amber-900 font-bold">Stabilisé</span>
        </div>
      </div>
    </div>

    <!-- Call to action -->
    <div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">
      <p class="font-semibold text-lg">🎁 Disponible chez Monster Phone La Réunion</p>
      <p class="text-sm opacity-90 mt-1">Livraison express 974 • Garantie 18 mois • Service client local</p>
    </div>
  </div>'
WHERE sku = 'PB10A-BLK';

-- 3. POWERBANK MY WAY 5000 mAh MagSafe
UPDATE products 
SET description = '<div class="max-w-4xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <span class="w-1 h-8 bg-red-500 rounded-full"></span>
      POWERBANK MY WAY 5000 mAh MagSafe - L''ultra portable magnétique
    </h3>
    
    <!-- Badges -->
    <div class="flex flex-wrap gap-2 mb-6">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        ✓ MagSafe officiel
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        🧲 Fixation magnétique
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        ⚡ Charge sans fil 15W
      </span>
    </div>

    <!-- Description principale enrichie SEO -->
    <div class="prose prose-lg max-w-none mb-8">
      <p class="text-gray-700 leading-relaxed">
        La <strong>POWERBANK MY WAY 5000 mAh MagSafe</strong> révolutionne la charge mobile avec sa technologie magnétique officielle MagSafe. 
        Spécialement conçue pour les iPhone 12, 13, 14 et 15 Pro Max, cette powerbank se fixe magnétiquement à l''arrière de votre téléphone, 
        offrant une charge sans fil instantanée jusqu''à <strong>15W</strong> pour les sessions gaming mobiles à La Réunion 974.
        Ultra-compacte et légère, cette powerbank MagSafe de <strong>5000 mAh</strong> double l''autonomie de votre iPhone tout en restant discrète. 
        Parfaite pour le streaming 4K, les tournois PUBG Mobile ou Call of Duty Mobile, elle maintient votre iPhone alimenté sans câbles encombrants. 
        La technologie de charge intelligente protège votre batterie tout en optimisant les performances pour une expérience gaming mobile sans compromis.
      </p>
    </div>

    <!-- Points forts en grille avec icônes -->
    <div class="grid md:grid-cols-2 gap-4 mb-8">
      <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🧲</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">MagSafe authentique</h4>
            <p class="text-sm text-gray-600">Alignement parfait et charge optimale garantis</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">📐</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Ultra-fin 12mm</h4>
            <p class="text-sm text-gray-600">Plus fin qu''une coque, poids plume 113g</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">⚡</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Charge rapide 15W</h4>
            <p class="text-sm text-gray-600">Sans fil MagSafe + USB-C 20W filaire</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🎮</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Gaming-ready</h4>
            <p class="text-sm text-gray-600">Charge pendant le jeu sans gêner la prise en main</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Encart spécial iPhone -->
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <h4 class="font-bold text-blue-900 mb-2">📱 Compatibilité iPhone optimale</h4>
      <p class="text-blue-800">Compatible iPhone 12/13/14/15 toutes versions. 
      Fonctionne avec les coques MagSafe. Animation de charge iOS native pour un suivi précis de la batterie.</p>
    </div>

    <!-- Encart technique avec design moderne -->
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
      <h4 class="font-semibold text-amber-900 mb-3 flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
        </svg>
        Spécifications techniques premium
      </h4>
      <div class="grid grid-cols-3 gap-4 text-sm">
        <div class="text-center">
          <div class="text-2xl mb-1">🔋</div>
          <span class="block text-amber-700 font-medium">Batterie</span>
          <span class="text-amber-900 font-bold">5000 mAh Li-Po</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">📏</div>
          <span class="block text-amber-700 font-medium">Dimensions</span>
          <span class="text-amber-900 font-bold">96x64x12mm</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">⚖️</div>
          <span class="block text-amber-700 font-medium">Poids</span>
          <span class="text-amber-900 font-bold">113g seulement</span>
        </div>
      </div>
    </div>

    <!-- Call to action -->
    <div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">
      <p class="font-semibold text-lg">🎁 Innovation MagSafe à La Réunion</p>
      <p class="text-sm opacity-90 mt-1">Livraison rapide 974 • Garantie 2 ans • Expert Apple Monster Phone</p>
    </div>
  </div>'
WHERE sku = 'MWPOW0001';

-- Message de confirmation
SELECT 'Mise à jour des descriptions des powerbanks terminée' as status;