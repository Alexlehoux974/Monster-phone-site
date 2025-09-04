-- Script pour mettre à jour les descriptions des câbles LED avec la structure HTML correcte

-- 1. CÂBLE LUMINEUX MY WAY USB-A vers USB-C
UPDATE products 
SET description = '<div class="max-w-4xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <span class="w-1 h-8 bg-red-500 rounded-full"></span>
      CÂBLE LUMINEUX MY WAY USB-A vers USB-C - L''éclairage gaming innovant
    </h3>
    
    <!-- Badges -->
    <div class="flex flex-wrap gap-2 mb-6">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        ✓ LED intégré RGB
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        ⚡ Charge rapide 3A
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        🔌 USB-A vers USB-C
      </span>
    </div>

    <!-- Description principale enrichie SEO -->
    <div class="prose prose-lg max-w-none mb-8">
      <p class="text-gray-700 leading-relaxed">
        Le <strong>CÂBLE LUMINEUX MY WAY USB-A vers USB-C</strong> transforme votre expérience de charge en spectacle lumineux pour votre setup gaming à La Réunion 974. 
        Ce câble révolutionnaire intègre une <strong>LED RGB dynamique</strong> qui s''illumine pendant la charge, créant une ambiance gaming immersive unique. 
        Compatible avec tous vos smartphones gaming Android, tablettes et accessoires USB-C, il assure une charge rapide jusqu''à <strong>3A</strong> pour maintenir vos appareils prêts pour l''action.
        Conçu pour les gamers et streamers exigeants de La Réunion, ce câble lumineux MY WAY combine <strong>performance de charge</strong>, 
        <strong>durabilité exceptionnelle</strong> et <strong>esthétique gaming premium</strong>. 
        Le flux lumineux suit le courant électrique, offrant un feedback visuel instantané du statut de charge. 
        Parfait pour illuminer votre desk gaming pendant vos sessions nocturnes de PUBG Mobile ou vos streams Twitch en 4K.
      </p>
    </div>

    <!-- Points forts en grille avec icônes -->
    <div class="grid md:grid-cols-2 gap-4 mb-8">
      <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">💡</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">LED RGB dynamique</h4>
            <p class="text-sm text-gray-600">Effet lumineux qui pulse avec le flux de charge</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">⚡</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Charge rapide 3A</h4>
            <p class="text-sm text-gray-600">Charge optimale pour tous appareils USB-C</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">💪</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Ultra résistant</h4>
            <p class="text-sm text-gray-600">Gaine nylon tressé, 10000+ cycles de pliage</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">📱</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Compatibilité universelle</h4>
            <p class="text-sm text-gray-600">Samsung, HONOR, Xiaomi, OnePlus et plus</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Encart spécial gaming -->
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <h4 class="font-bold text-blue-900 mb-2">🎮 Setup gaming lumineux</h4>
      <p class="text-blue-800">Créez une ambiance gaming unique avec ce câble LED. 
      Parfait pour coordonner avec votre clavier RGB, souris gaming et éclairage d''ambiance.</p>
    </div>

    <!-- Encart technique avec design moderne -->
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
      <h4 class="font-semibold text-amber-900 mb-3 flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
        </svg>
        Caractéristiques techniques premium
      </h4>
      <div class="grid grid-cols-3 gap-4 text-sm">
        <div class="text-center">
          <div class="text-2xl mb-1">📏</div>
          <span class="block text-amber-700 font-medium">Longueur</span>
          <span class="text-amber-900 font-bold">1 mètre</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">⚡</div>
          <span class="block text-amber-700 font-medium">Intensité</span>
          <span class="text-amber-900 font-bold">3A max</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">💾</div>
          <span class="block text-amber-700 font-medium">Transfert</span>
          <span class="text-amber-900 font-bold">USB 2.0</span>
        </div>
      </div>
    </div>

    <!-- Call to action -->
    <div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">
      <p class="font-semibold text-lg">🎁 Disponible chez Monster Phone La Réunion</p>
      <p class="text-sm opacity-90 mt-1">Livraison express 974 • Garantie 12 mois • Support local</p>
    </div>
  </div>'
WHERE sku = 'MWUSC0086';

-- 2. CÂBLE LUMINEUX MY WAY USB-C vers USB-C
UPDATE products 
SET description = '<div class="max-w-4xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <span class="w-1 h-8 bg-red-500 rounded-full"></span>
      CÂBLE LUMINEUX MY WAY USB-C vers USB-C - Performance et style gaming
    </h3>
    
    <!-- Badges -->
    <div class="flex flex-wrap gap-2 mb-6">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        ✓ Charge 100W PD
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        💡 LED RGB multicolore
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        📊 USB 3.0 - 5Gbps
      </span>
    </div>

    <!-- Description principale enrichie SEO -->
    <div class="prose prose-lg max-w-none mb-8">
      <p class="text-gray-700 leading-relaxed">
        Le <strong>CÂBLE LUMINEUX MY WAY USB-C vers USB-C</strong> représente l''excellence en matière de câbles gaming pour votre setup à La Réunion 974. 
        Avec sa capacité de charge ultra-rapide <strong>100W Power Delivery</strong>, ce câble alimente instantanément vos smartphones gaming, laptops et Nintendo Switch. 
        La <strong>LED RGB multicolore</strong> intégrée transforme chaque charge en spectacle lumineux, créant une ambiance gaming immersive incomparable.
        Conçu pour les professionnels du gaming et les streamers de La Réunion, ce câble MY WAY offre des performances exceptionnelles avec 
        <strong>transferts USB 3.0 jusqu''à 5 Gbps</strong>, idéal pour transférer vos replays gaming, streams 4K et contenus volumineux. 
        Sa construction en nylon tressé renforcé garantit une durabilité extrême, résistant à plus de 10 000 cycles de pliage pour accompagner 
        vos marathons gaming et déplacements quotidiens.
      </p>
    </div>

    <!-- Points forts en grille avec icônes -->
    <div class="grid md:grid-cols-2 gap-4 mb-8">
      <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">⚡</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Power Delivery 100W</h4>
            <p class="text-sm text-gray-600">Charge laptop gaming et smartphone simultanément</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🌈</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">LED RGB dynamique</h4>
            <p class="text-sm text-gray-600">Effet arc-en-ciel synchronisé avec la charge</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">💾</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">USB 3.0 SuperSpeed</h4>
            <p class="text-sm text-gray-600">Transfert 5 Gbps pour vos fichiers gaming</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🎮</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Gaming certified</h4>
            <p class="text-sm text-gray-600">Compatible ROG Phone, Steam Deck, MacBook</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Encart spécial performance -->
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <h4 class="font-bold text-blue-900 mb-2">🚀 Performance maximale garantie</h4>
      <p class="text-blue-800">Technologie E-Marker intégrée pour une reconnaissance automatique de la puissance optimale. 
      Charge votre MacBook Pro, smartphone gaming ou console portable à vitesse maximale.</p>
    </div>

    <!-- Encart durabilité avec design moderne -->
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
      <h4 class="font-semibold text-amber-900 mb-3 flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
        </svg>
        Construction gaming-grade premium
      </h4>
      <div class="grid grid-cols-3 gap-4 text-sm">
        <div class="text-center">
          <div class="text-2xl mb-1">🛡️</div>
          <span class="block text-amber-700 font-medium">Nylon tressé</span>
          <span class="text-amber-900 font-bold">Anti-enchevêtrement</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">🔧</div>
          <span class="block text-amber-700 font-medium">Connecteurs</span>
          <span class="text-amber-900 font-bold">Aluminium renforcé</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">📐</div>
          <span class="block text-amber-700 font-medium">Longueur</span>
          <span class="text-amber-900 font-bold">1.2 mètres</span>
        </div>
      </div>
    </div>

    <!-- Call to action -->
    <div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">
      <p class="font-semibold text-lg">🎁 Innovation LED à La Réunion 974</p>
      <p class="text-sm opacity-90 mt-1">Livraison rapide • Garantie 12 mois • Monster Phone votre expert gaming</p>
    </div>
  </div>'
WHERE sku = 'MWUSC0087';

-- 3. CÂBLE LUMINEUX MY WAY USB-A vers Lightning
UPDATE products 
SET description = '<div class="max-w-4xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <span class="w-1 h-8 bg-red-500 rounded-full"></span>
      CÂBLE LUMINEUX MY WAY USB-A vers Lightning - L''éclat Apple gaming
    </h3>
    
    <!-- Badges -->
    <div class="flex flex-wrap gap-2 mb-6">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        ✓ Certifié MFi Apple
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        💡 LED flux lumineux
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        ⚡ Charge 2.4A rapide
      </span>
    </div>

    <!-- Description principale enrichie SEO -->
    <div class="prose prose-lg max-w-none mb-8">
      <p class="text-gray-700 leading-relaxed">
        Le <strong>CÂBLE LUMINEUX MY WAY USB-A vers Lightning</strong> sublime la charge de vos appareils Apple avec une touche gaming unique à La Réunion 974. 
        <strong>Certifié MFi par Apple</strong>, ce câble garantit une compatibilité parfaite avec tous vos iPhone, iPad et iPod, 
        offrant une charge sûre et optimale pour vos sessions de gaming mobile intensives.
        L''innovation LED intégrée crée un <strong>flux lumineux dynamique</strong> qui suit le courant électrique, transformant chaque charge en spectacle visuel. 
        Idéal pour les streamers et gamers de La Réunion qui veulent impressionner leur audience Twitch avec un setup gaming lumineux. 
        La charge rapide <strong>2.4A (12W)</strong> maintient votre iPhone prêt pour l''action, que ce soit pour PUBG Mobile, Call of Duty Mobile ou vos streams en 4K.
      </p>
    </div>

    <!-- Points forts en grille avec icônes -->
    <div class="grid md:grid-cols-2 gap-4 mb-8">
      <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">🍎</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">MFi Apple officiel</h4>
            <p class="text-sm text-gray-600">Certification garantissant qualité et sécurité</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">✨</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">LED effet flux</h4>
            <p class="text-sm text-gray-600">Visualisation du flux de charge en temps réel</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">📱</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">Compatible universel</h4>
            <p class="text-sm text-gray-600">iPhone 15/14/13/12, iPad, AirPods</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
        <div class="flex items-start gap-3">
          <span class="text-2xl">💪</span>
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">15000+ insertions</h4>
            <p class="text-sm text-gray-600">Connecteur renforcé pour durabilité extrême</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Encart spécial iPhone -->
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <h4 class="font-bold text-blue-900 mb-2">📱 Optimisé pour l''écosystème Apple</h4>
      <p class="text-blue-800">Compatible avec tous les iPhone depuis l''iPhone 5. 
      Support CarPlay, synchronisation iTunes et charge rapide adaptative selon votre modèle d''iPhone.</p>
    </div>

    <!-- Encart qualité avec design moderne -->
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
      <h4 class="font-semibold text-amber-900 mb-3 flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
        </svg>
        Qualité certifiée Apple MFi
      </h4>
      <div class="grid grid-cols-3 gap-4 text-sm">
        <div class="text-center">
          <div class="text-2xl mb-1">🔒</div>
          <span class="block text-amber-700 font-medium">Puce Apple</span>
          <span class="text-amber-900 font-bold">Authentique</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">⚡</div>
          <span class="block text-amber-700 font-medium">Charge</span>
          <span class="text-amber-900 font-bold">2.4A / 12W</span>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">📏</div>
          <span class="block text-amber-700 font-medium">Longueur</span>
          <span class="text-amber-900 font-bold">1 mètre</span>
        </div>
      </div>
    </div>

    <!-- Call to action -->
    <div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">
      <p class="font-semibold text-lg">🎁 L''excellence Apple à La Réunion</p>
      <p class="text-sm opacity-90 mt-1">Livraison express 974 • Garantie 12 mois • Expert Apple Monster Phone</p>
    </div>
  </div>'
WHERE sku = 'MWUSC0088';

-- Message de confirmation
SELECT 'Mise à jour des descriptions des câbles LED terminée (partie 1)' as status;