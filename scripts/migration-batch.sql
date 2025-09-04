
-- Produit 1/153: HONOR X9B 12+8/256
UPDATE products 
SET 
  description = 'Découvrez le smartphone HONOR X9B, véritable flagship technologique conçu pour les utilisateurs les plus exigeants. Doté d',
  short_description = 'Smartphone flagship avec 12+8GB RAM, écran AMOLED 165Hz et batterie 6000mAh',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x9b-noir-main.jpg']::text[],
  specifications = '{"RAM":"12GB + 8GB extensible","Stockage":"256GB","Écran":"6.8","Batterie":"6000mAh","Charge rapide":"66W","Connectivité":"5G","Certification":"IP68"}'::jsonb,
  highlights = ARRAY['Écran AMOLED 165Hz ultra-fluide',',',',',',']::text[],
  warranty = '2 ans constructeur + 1 an offert',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8,
  das_head = '0.82 W/kg',
  das_body = '1.27 W/kg',
  average_rating = 4.8,
  total_reviews = 156
  updated_at = NOW()
WHERE 
  sku = 'HONOR-X9B-12GB-256GB';


-- Produit 2/153: HONOR PAD 9 WiFi
UPDATE products 
SET 
  description = 'La tablette HONOR PAD 9 WiFi révolutionne votre expérience numérique avec des performances exceptionnelles et un design premium. Dotée d',
  short_description = 'Tablette premium 12.1',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Tablettes/honor-pad9-wifi-main.jpg']::text[],
  specifications = '{"RAM":"8GB + 8GB extensible","Stockage":"256GB","Écran":"12.1","Résolution":"2560x1600 pixels","Batterie":"8300mAh","Audio":"Quad-speakers Harman Kardon","Connectivité":"WiFi 6, Bluetooth 5.2","Épaisseur":"6.9mm","Poids":"555g"}'::jsonb,
  highlights = ARRAY['Écran 2.5K 120Hz certifié TÜV Rheinland','Quad-speakers Harman Kardon','Design ultra-fin 6.9mm',',']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.3,
  
  das_body = '1.09 W/kg',
  average_rating = 4.9,
  total_reviews = 89
  updated_at = NOW()
WHERE 
  sku = 'HONOR-PAD9-WIFI';


-- Produit 3/153: HONOR 200 PRO 12+12/512
UPDATE products 
SET 
  
  short_description = 'Flagship photographique avec triple 50MP Harcourt Edition et 24GB RAM total',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-3.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-4.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-6.png']::text[],
  specifications = '{"RAM":"12GB + 12GB (24GB total)","Stockage":"512GB","Écran":"6.78","Caméra":"Triple 50MP Harcourt","Batterie":"5200mAh Silicon-Carbon","Charge":"100W filaire, 66W sans fil","Processeur":"Snapdragon 8s Gen 3","Certification":"IP65"}'::jsonb,
  highlights = ARRAY['Triple caméra 50MP Harcourt Edition','24GB RAM total (12+12GB)','Charge SuperCharge 100W','Écran OLED 4000 nits','Processeur Snapdragon 8s Gen 3']::text[],
  warranty = '2 ans constructeur + extension 1 an offerte',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.1,
  das_head = '0.87 W/kg',
  das_body = '1.11 W/kg',
  average_rating = 4.9,
  total_reviews = 67
  updated_at = NOW()
WHERE 
  sku = 'HONOR-200-PRO-12GB-512GB';


-- Produit 4/153: HONOR X6B 6+6/128
UPDATE products 
SET 
  
  short_description = 'Smartphone équilibré avec 6+6GB RAM, 128GB et écran Full HD+ certifié TÜV',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x6b-noir-main.jpg']::text[],
  specifications = '{"RAM":"6GB + 6GB extensible","Stockage":"128GB (extensible 1TB)","Écran":"6.67","Caméra":"50MP avec IA","Batterie":"5200mAh","Charge":"22.5W","Protection":"TÜV Rheinland"}'::jsonb,
  highlights = ARRAY['Écran certifié TÜV Rheinland','Caméra 50MP avec IA',',','autonomie','Stockage extensible 1TB']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.1,
  das_head = '0.76 W/kg',
  das_body = '1.19 W/kg',
  average_rating = 4.5,
  total_reviews = 423
  updated_at = NOW()
WHERE 
  sku = 'HONOR-X6B-6GB-128GB';


-- Produit 5/153: HONOR X7C 8+6/256
UPDATE products 
SET 
  
  short_description = 'Smartphone haut de gamme avec écran AMOLED 120Hz et triple caméra 64MP OIS',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-1.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-2.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-3.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-4.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-5.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-6.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-8.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-9.jpg']::text[],
  specifications = '{"RAM":"8GB + 6GB extensible","Stockage":"256GB","Écran":"6.7","Caméra":"Triple 64MP avec OIS","Batterie":"5400mAh","Charge":"40W Turbo","Sécurité":"Empreinte latérale"}'::jsonb,
  highlights = ARRAY['Écran AMOLED 120Hz DCI-P3','Triple caméra 64MP avec OIS',',',',']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.1,
  das_head = '0.77 W/kg',
  das_body = '1.05 W/kg',
  average_rating = 4.6,
  total_reviews = 189
  updated_at = NOW()
WHERE 
  sku = 'HONOR-X7C-8GB-256GB';


-- Produit 6/153: HONOR X5B 4+4/64
UPDATE products 
SET 
  description = 'Le HONOR X5B est le smartphone idéal pour débuter dans l',
  short_description = 'Smartphone accessible avec grande autonomie et écran HD+ 6.56',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-1.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-2.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-3.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-4.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-5.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-6.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-7.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-8.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-9.jpg']::text[],
  specifications = '{"RAM":"4GB + 4GB extensible","Stockage":"64GB (extensible 256GB)","Écran":"6.56","Caméra":"13MP avec HDR","Batterie":"5000mAh","Slots":"Double SIM + SD"}'::jsonb,
  highlights = ARRAY['Batterie 5000mAh longue durée','RAM extensible à 8GB','Stockage extensible 256GB','Protection oculaire intégrée','Double SIM + carte SD']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.1,
  das_head = '1.04 W/kg',
  das_body = '1.00 W/kg',
  average_rating = 4.3,
  total_reviews = 567
  updated_at = NOW()
WHERE 
  sku = 'HONOR-X5B-4GB-64GB';


-- Produit 7/153: NOKIA 110 2023
UPDATE products 
SET 
  
  short_description = 'Téléphone simple avec autonomie exceptionnelle de plusieurs semaines',
  
  specifications = '{"Type":"Téléphone simple","Écran":"1.77","Batterie":"1000mAh","Autonomie":"Plusieurs semaines","Dual SIM":"Oui","Radio FM":"Oui","Lampe torche":"Oui"}'::jsonb,
  highlights = ARRAY['Autonomie exceptionnelle de plusieurs semaines','Design Nokia classique et robuste','Double SIM pour deux numéros','Radio FM intégrée','Lampe torche pratique']::text[],
  warranty = '1 an constructeur',
  delivery_time = '24-48h à La Réunion',
  
  das_head = '1.226 W/kg',
  das_body = '1.226 W/kg',
  average_rating = 4.5,
  total_reviews = 234
  updated_at = NOW()
WHERE 
  sku = 'NOKIA-110-2023';


-- Produit 8/153: NOKIA 110 4G 2025
UPDATE products 
SET 
  description = 'Le NOKIA 110 4G édition 2025 révolutionne le concept du téléphone simple en intégrant la connectivité 4G LTE ultra-rapide dans un format classique éprouvé. Cette évolution majeure transforme l',
  short_description = 'Téléphone simple avec connexion 4G rapide',
  
  specifications = '{"Type":"Téléphone simple 4G","Écran":"1.8","Connectivité":"4G LTE","Batterie":"1450mAh","Autonomie":"Longue durée","Dual SIM":"Oui","Appareil photo":"0.3MP"}'::jsonb,
  highlights = ARRAY['Connexion 4G rapide','Design Nokia robuste','Autonomie longue durée','Double SIM pratique','Appareil photo intégré']::text[],
  warranty = '1 an constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 4.1,
  das_head = '1.321 W/kg',
  das_body = '1.524 W/kg',
  average_rating = 4.3,
  total_reviews = 178
  updated_at = NOW()
WHERE 
  sku = 'NOKIA-110-4G-2025';


-- Produit 9/153: NOKIA G22
UPDATE products 
SET 
  description = 'Le NOKIA G22 incarne la vision moderne de Nokia en combinant durabilité exceptionnelle, réparabilité révolutionnaire et performances Android optimales. Premier smartphone conçu en partenariat avec iFixit pour réparabilité maximale : écran remplaçable en 5 minutes avec outils basiques, batterie interchangeable sans soudure, modules caméra et port USB-C facilement remplaçables, guides de réparation officiels gratuits et pièces détachées garanties 5 ans. Cette approche écologique pionnière réduit l',
  short_description = 'Smartphone Android durable et facilement réparable',
  
  specifications = '{"OS":"Android 12 (pur)","Écran":"6.5","RAM":"4GB","Stockage":"64GB extensible","Batterie":"5050mAh","Charge":"20W","Caméra principale":"50MP","Caméra selfie":"8MP"}'::jsonb,
  highlights = ARRAY['Android pur avec mises à jour garanties','Design durable et réparable','Écran 90Hz fluide','Batterie 5050mAh longue durée','Indice de réparabilité élevé 8.1']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.1,
  das_head = '1.10 W/kg',
  das_body = '1.27 W/kg',
  average_rating = 4.6,
  total_reviews = 345
  updated_at = NOW()
WHERE 
  sku = 'NOKIA-G22';


-- Produit 10/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 11/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 12/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 13/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 14/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 15/153: CASQUE ANC HIFUTURE TOUR X
UPDATE products 
SET 
  description = 'Le casque HIFUTURE TOUR X offre une expérience audio premium avec réduction active du bruit (ANC) de pointe. Conçu pour les audiophiles et professionnels, il délivre un son haute fidélité avec des basses profondes et des aigus cristallins. La technologie ANC élimine jusqu',
  short_description = 'Casque ANC avec Bluetooth 5.0 et 30h autonomie',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-3.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-4.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-1.jpg']::text[],
  specifications = '{"Technologie":"ANC (Active Noise Cancelling)","Bluetooth":"5.0","Autonomie":"30 heures","Temps de charge":"2 heures","Drivers":"40mm","Réponse fréquence":"20Hz-20kHz","Impédance":"32Ω","Sensibilité":"105dB","Microphone":"Intégré avec réduction de bruit","Poids":"280g"}'::jsonb,
  highlights = ARRAY['Réduction active du bruit ANC','Bluetooth 5.0 stable',',',',',',',',',',']::text[],
  warranty = '12 mois',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.5,
  total_reviews = 42
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-TOUR-X';


-- Produit 16/153: HIFUTURE Casque ANC Tour
UPDATE products 
SET 
  description = 'Le casque HIFUTURE Tour avec ANC offre une qualité audio exceptionnelle à prix accessible. La réduction active du bruit permet de s',
  short_description = 'Casque ANC abordable avec Bluetooth 5.0',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-1.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-2.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-3.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-4.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-5.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-6.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-7.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-8.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-9.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-10.jpg']::text[],
  specifications = '{"Technologie":"ANC (Active Noise Cancelling)","Bluetooth":"5.0","Autonomie":"25 heures","Temps de charge":"2.5 heures","Drivers":"40mm","Réponse fréquence":"20Hz-20kHz","Impédance":"32Ω","Sensibilité":"102dB","Microphone":"Intégré","Poids":"250g"}'::jsonb,
  highlights = ARRAY['Réduction active du bruit','Bluetooth 5.0',',',',',',',',',',']::text[],
  warranty = '12 mois',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.3,
  total_reviews = 67
  updated_at = NOW()
WHERE 
  sku = 'HIF-TOUR-ANC';


-- Produit 17/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 18/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 19/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 20/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 21/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 22/153: MONSTER Element Air
UPDATE products 
SET 
  description = 'Casque MONSTER Element Air haut de gamme avec technologie sans fil avancée. Audio haute résolution pour qualité sonore exceptionnelle. Design ultra-léger pour confort maximal durant longues sessions. Autonomie exceptionnelle permettant usage intensif sans contrainte. Le casque sans fil premium pour mélomanes exigeants à La Réunion.',
  short_description = 'Casque sans fil haut de gamme avec audio haute résolution',
  
  specifications = '{"Connectivité":"Bluetooth","Audio":"Haute résolution","Design":"Ultra-léger","Type":"Gaming Premium"}'::jsonb,
  highlights = ARRAY['Audio haute résolution','Ultra-léger','Sans fil avancé','Gaming premium']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.9,
  total_reviews = 45
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-ELEMENT-AIR';


-- Produit 23/153: MUVIT Casque Sans Fil Enfant
UPDATE products 
SET 
  
  short_description = 'Casque enfant avec protection auditive',
  images = ARRAY['/placeholder-monster-mini.svg']::text[],
  specifications = '{"Âge":"3-12 ans","Protection":"Volume limité 85dB","Connectivité":"Bluetooth","Garantie":"2 ans"}'::jsonb,
  highlights = ARRAY['Volume limité sécurité','Designs animaux','Confort enfant','Bluetooth sans fil']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.7,
  total_reviews = 89
  updated_at = NOW()
WHERE 
  sku = 'MUHPH01';


-- Produit 24/153: HIFUTURE GRAVITY Enceinte Bluetooth
UPDATE products 
SET 
  
  short_description = 'Enceinte 360° 40W avec 24h autonomie, IPX7 et éclairage RGB synchronisé',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-1.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-2.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-3.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-4.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-5.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-6.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-eclater.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-et-bleu.png']::text[],
  specifications = '{"Puissance":"40W RMS","Son":"360° immersif","Autonomie":"24 heures","Batterie":"6600mAh + Powerbank","Étanchéité":"IPX7 (flottante)","Bluetooth":"5.2 Multipoint","Portée":"30 mètres","Extras":"LED RGB, FM, MicroSD"}'::jsonb,
  highlights = ARRAY['Son 360° immersif 40W',',',',',',']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.9,
  total_reviews = 85
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-GRAVITY-360';


-- Produit 25/153: MONSTER N-Lite 203 Batterie Portable Premium 20000mAh
UPDATE products 
SET 
  
  short_description = 'Batterie 20000mAh ultra-compacte avec charge rapide 22.5W et triple sortie simultanée',
  
  specifications = '{"Capacité":"20000mAh","Charge rapide":"22.5W PD/QC3.0","Sorties":"2x USB-A + 1x USB-C","Entrée":"USB-C 18W","Temps charge":"4 heures","Affichage":"LED intelligent","Dimensions":"145x68x28mm","Poids":"380g"}'::jsonb,
  highlights = ARRAY['Capacité massive 20000mAh','Charge rapide 22.5W','Triple sortie simultanée','Design ultra-compact','Certifié transport aérien']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.9,
  total_reviews = 892
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-N-LITE-203';


-- Produit 26/153: MONSTER Illuminescence Basic Lightstrip Multicouleur
UPDATE products 
SET 
  description = 'Le bandeau LED MONSTER Illuminescence Basic transforme instantanément votre espace avec éclairage RGB personnalisable infini. Cette solution versatile crée ambiances uniques adaptées chaque moment vie. Technologie RGB déploie millions couleurs pour atmosphères sur-mesure. Des teintes chaudes relaxantes aux couleurs vives festives, palette illimitée. Disponible 3 longueurs : 2m espaces compacts, 4m installations moyennes, 5m grandes surfaces. Installation révolutionnaire avec adhésif 3M industriel fixation durable toutes surfaces. Aucun perçage, câblage complexe ou compétence technique requise. Alimentation USB universelle compatible tous ports standards. Parfait éclairage bureau gaming, rétro-éclairage TV, décoration chambre. Crée ambiances cinéma immersives ou atmosphères festives soirées. LED haute efficacité consomment minimum énergie durée vie exceptionnelle. Luminosité constante sans dégradation après années utilisation. Résistance variations température garantit performance stable. Flexible épouse contours, contourne obstacles, suit formes complexes. Coupable tous 5cm pour ajustement parfait dimensions. Contrôleur inclus permet sélection couleurs et modes dynamiques. Solution idéale moderniser intérieur avec créativité accessible La Réunion.',
  short_description = 'Bandeau LED RGB multicouleur avec installation adhésive facile et alimentation USB',
  
  specifications = '{"Type":"LED RGB","Longueurs":"2m/4m/5m","Alimentation":"USB 5V","LED/mètre":"30 LED","Adhésif":"3M industriel","Coupable":"Tous les 5cm","Angle":"120°","Durée vie":"50000 heures"}'::jsonb,
  highlights = ARRAY['RGB millions de couleurs','Installation adhésive facile','Alimentation USB universelle','3 longueurs disponibles','Coupable et flexible']::text[],
  warranty = '1 an constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.6,
  total_reviews = 456
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-BASIC-MULTI';


-- Produit 27/153: MONSTER Illuminescence Light Strip Color/Blanc
UPDATE products 
SET 
  description = 'Le bandeau LED MONSTER Illuminescence Color/Blanc révolutionne éclairage avec double technologie RGB multicouleur et blanc chaud. Cette polyvalence unique permet créer ambiances festives colorées ou éclairage fonctionnel optimal selon besoins. Mode RGB transforme espace avec palette infinie teintes vibrantes. Créez atmosphères personnalisées pour gaming, soirées, relaxation. Mode blanc chaud apporte lumière douce naturelle idéale travail lecture. Température couleur 3000K réduit fatigue oculaire sessions prolongées. Basculez instantanément entre modes selon activité moment. Installation 2 mètres parfaite bureau, étagères, contour écran. Adhésif 3M haute qualité garantit fixation permanente propre. Alimentation USB compatible chargeurs, PC, batteries portables. Flexibilité permet suivre contours, angles, formes complexes. LED haute efficacité 5050 offrent luminosité exceptionnelle. Consommation optimisée pour impact minimal facture électrique. Durée vie 50000 heures garantit investissement durable. Contrôleur intelligent mémorise derniers réglages utilisés. Idéal espaces polyvalents nécessitant éclairage adaptatif. Solution parfaite habitants La Réunion cherchant versatilité maximale.',
  short_description = 'Bandeau LED double mode RGB multicouleur + blanc chaud pour polyvalence totale',
  
  specifications = '{"Modes":"RGB + Blanc chaud","Longueur":"2 mètres","Température":"3000K blanc","LED type":"5050 SMD","Alimentation":"USB 5V 2A","Luminosité":"800 lumens","Angle":"120°","Durée vie":"50000h"}'::jsonb,
  highlights = ARRAY['Double mode RGB + Blanc','Polyvalence gaming/travail','Blanc chaud 3000K','Installation USB simple','Mémoire derniers réglages']::text[],
  warranty = '1 an constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.7,
  total_reviews = 234
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-COLOR-BLANC';


-- Produit 28/153: MONSTER Illuminescence Neon Light Strip
UPDATE products 
SET 
  description = 'Le bandeau MONSTER Illuminescence Neon reproduit effet néon emblématique avec technologie LED moderne révolutionnaire. Cette innovation fusionne charme rétro-futuriste néon traditionnel avec efficacité LED contemporaine. Effet néon continu élimine points lumineux individuels créant ligne lumière homogène. Technologie diffusion avancée produit halo doux enveloppant signature néon authentique. Design cyberpunk transforme intérieur en espace branché métropole nocturne. Esthétique futuriste évoque univers science-fiction et gaming moderne. Polyvalence intérieur/extérieur avec construction étanche résistante. Illuminez terrasses, jardins, façades ou espaces intérieurs même efficacité. Version Basic 2m réactivité sonore transforme musique spectacle pulsant. Version Smart 5m contrôle WiFi complet personnalisation smartphone. Version Smart Flow 5m effets flux programmables animations hypnotiques. Réactivité sonore analyse fréquences temps réel synchronisation parfaite. Basses déclenchent pulsations intenses, aigus génèrent scintillements. Contrôle WiFi permet programmation horaires, scènes personnalisées. Compatible assistants vocaux pour contrôle mains libres. Installation flexible suit contours architecturaux complexes. Solution créative habitants La Réunion passionnés design futuriste.',
  short_description = 'Bandeau LED effet néon continu avec versions sonore et WiFi pour ambiance futuriste',
  
  specifications = '{"Effet":"Néon continu","Versions":"2m/5m/5m Flow","Usage":"Int/Ext IP65","Contrôle":"Son/WiFi/Flow","Diffusion":"360° uniforme","Matière":"Silicone flexible","Température":"-20°C à 50°C","Durée vie":"50000h"}'::jsonb,
  highlights = ARRAY['Effet néon authentique','Design cyberpunk futuriste','Intérieur/Extérieur IP65','Versions sonore et WiFi','Diffusion lumière uniforme']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.8,
  total_reviews = 167
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-NEON';


-- Produit 29/153: MONSTER Illuminescence Smart Chroma Light 2X Bars
UPDATE products 
SET 
  description = 'Le pack MONSTER Chroma Light 2X Bars révolutionne éclairage intelligent avec système double barres LED technologie RGB IC avancée. Cette solution connectée transforme environnement en spectacle lumineux époustouflant possibilités créatives illimitées. Technologie RGB IC permet contrôle individuel chaque LED créant effets complexes. Motifs fluides, dégradés parfaits, animations synchronisées transforment murs œuvres vivantes. Contrôle WiFi smartphone via application intuitive personnalisation totale. Ajustez couleurs, intensité, vitesse, programmation, scènes personnalisées instantanément. Synchronisation musicale transforme espace salle spectacle privée. Barres réagissent temps réel rythmes fréquences show chorégraphié. Installation modulaire flexible s',
  short_description = 'Pack 2 barres LED RGB IC WiFi avec synchronisation musicale et contrôle vocal',
  
  specifications = '{"Technologie":"RGB IC intelligent","Contenu":"2 barres LED","Contrôle":"WiFi + App","Sync":"Musicale temps réel","Assistants":"Alexa/Google","Effets":"50+ prédéfinis","Dimensions":"30cm/barre","Installation":"Modulaire"}'::jsonb,
  highlights = ARRAY['RGB IC contrôle pixel','WiFi + App smartphone','Synchronisation musicale','Compatible Alexa/Google','Installation modulaire']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.9,
  total_reviews = 89
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-CHROMA-2X';


-- Produit 30/153: MONSTER Illuminescence Basic Light Strip 30M RGB
UPDATE products 
SET 
  description = 'Le méga bandeau MONSTER Illuminescence 30M RGB représente solution ultime installations envergure nécessitant couverture lumineuse complète spectaculaire. Cette longueur monumentale 30 mètres offre possibilités véritablement illimitées projets ambitieux. Illuminez intégralité grande pièce, créez chemins lumineux continus plusieurs espaces. Encadrez structures architecturales complètes, réalisez installations artistiques envergure. Technologie RGB déploie spectre infini couleurs vibrantes transformant atmosphère. Ambiances chaleureuses accueillantes aux effets dynamiques énergisants parfaits. Éclairage grands espaces calibré pour surfaces importantes uniformité totale. Salons spacieux, lofts, espaces commerciaux, salles réception parfaitement illuminés. Couleurs RGB immersives enveloppent environnement atmosphère lumineuse totale. Immersion chromatique transforme perception espace effets profondeur spectaculaires. Installation professionnelle avec planification minutieuse reste accessible adhésif continu. Flexibilité permet suivre contours architecturaux, contourner obstacles créer motifs. LED haute efficacité maintiennent luminosité fidélité chromatique années. Consommation optimisée reste raisonnable malgré longueur technologie dernière génération. Solution idéale projets envergure La Réunion nécessitant transformation radicale espaces.',
  short_description = 'Méga bandeau LED 30 mètres RGB pour installations complètes grands espaces',
  
  specifications = '{"Longueur":"30 mètres","LED totales":"900 LED","Puissance":"150W max","Sections":"6x5m reliées","Alimentation":"220V adaptateur","Luminosité":"12000 lumens","Coupable":"Tous les 10cm","Durée vie":"50000h"}'::jsonb,
  highlights = ARRAY['Longueur monumentale 30m','RGB millions couleurs','Grands espaces complets','Installation professionnelle','Luminosité 12000 lumens']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.7,
  total_reviews = 78
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-BASIC-30M';


-- Produit 31/153: MONSTER Câble HDMI Ultra HD 4K 2M
UPDATE products 
SET 
  
  short_description = 'Câble HDMI 2.1 premium 4K@120Hz HDR avec connecteurs plaqués or',
  
  specifications = '{"Version HDMI":"2.1","Résolution Max":"8K@60Hz / 4K@120Hz","Bande passante":"48 Gbps","Longueur":"2 mètres","HDR":"HDR10, Dolby Vision, HLG","Audio":"Dolby Atmos, DTS:X","Connecteurs":"Plaqués or 24K","Blindage":"Triple blindage EMI"}'::jsonb,
  highlights = ARRAY['HDMI 2.1 dernière génération','4K@120Hz pour gaming','HDR complet (HDR10, Dolby Vision)','Audio Dolby Atmos','Connecteurs plaqués or 24K']::text[],
  warranty = '5 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.8,
  total_reviews = 89
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-HDMI-ULTRA';


-- Produit 32/153: MONSTER Câble HDMI Standard
UPDATE products 
SET 
  description = 'Câble HDMI Monster Standard pour une transmission vidéo et audio de qualité. Supporte la résolution Full HD 1080p et 4K à 30Hz. Connecteurs plaqués or pour une meilleure conductivité. Compatible avec tous les appareils HDMI.',
  short_description = 'Câble HDMI standard Full HD et 4K@30Hz',
  
  specifications = '{"Version HDMI":"1.4","Résolution Max":"4K@30Hz","Connecteurs":"Plaqués or","Longueurs disponibles":"1.5m, 2m, 3m, 5m"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MCB-HDMI-STD';


-- Produit 33/153: MONSTER CABLE HDMI ESSENTIAL 4K
UPDATE products 
SET 
  description = 'Câble HDMI Monster Essential 4K pour une expérience 4K complète. Support 4K à 60Hz avec HDR pour des couleurs éclatantes. Construction renforcée pour une durabilité maximale. Parfait pour home cinéma et gaming.',
  short_description = 'Câble HDMI Essential 4K@60Hz avec HDR',
  
  specifications = '{"Version HDMI":"2.0","Résolution Max":"4K@60Hz","HDR":"HDR10","Longueurs disponibles":"1m80, 3m60","Bande passante":"18 Gbps"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MCB-HDMI-PHS';


-- Produit 34/153: MONSTER Câble USB-C Charge Rapide 100W
UPDATE products 
SET 
  description = 'Le câble USB-C Monster 100W révolutionne la charge rapide avec sa capacité Power Delivery exceptionnelle. Conçu pour alimenter les appareils les plus exigeants, ce câble supporte une puissance de charge allant jusqu',
  short_description = 'Câble USB-C PD 100W avec transfert 10Gbps et gaine militaire',
  
  specifications = '{"Puissance":"100W (20V/5A)","Transfert":"USB 3.2 Gen 2 - 10Gbps","Longueur":"1.5 mètres","Protocoles":"PD 3.0, QC 4.0, PPS","Vidéo":"4K@60Hz Alt Mode","Durabilité":"30000 flexions","Certification":"USB-IF","Matériau":"Nylon tressé militaire"}'::jsonb,
  highlights = ARRAY['Charge 100W ultra-puissante','Transfert 10Gbps haute vitesse','Gaine militaire 30000 flexions','Compatible tous appareils USB-C','Puce E-Marker sécurité']::text[],
  warranty = '3 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.7,
  total_reviews = 156
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-USBC-100W';


-- Produit 35/153: MONSTER Câble Lightning Pro MFi Certifié
UPDATE products 
SET 
  description = 'Le câble Lightning Monster Pro bénéficie de la certification MFi (Made for iPhone/iPad) d',
  short_description = 'Câble Lightning certifié MFi Apple avec charge rapide 2.4A',
  
  specifications = '{"Certification":"MFi Apple","Charge":"2.4A max","Transfert":"USB 2.0 - 480Mbps","Longueur":"1 mètre","Durabilité":"25000 insertions","Flexions":"20000 cycles","Matériau":"Aluminium + TPE","Compatibilité":"Tous appareils Lightning"}'::jsonb,
  highlights = ARRAY['Certification MFi officielle Apple','Charge rapide 2.4A sécurisée','Aluminium usiné CNC premium','Garantie à vie constructeur','Compatible tous iPhone/iPad']::text[],
  warranty = 'Garantie à vie',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.6,
  total_reviews = 203
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-LIGHTNING-PRO';


-- Produit 36/153: MONSTER Câble AUX 3.5mm Gold Plated Pro
UPDATE products 
SET 
  description = 'Le câble AUX Monster Gold Plated Pro offre une transmission audio analogique de qualité audiophile. Les connecteurs plaqués or 24K garantissent une conductivité optimale et une résistance totale à la corrosion, préservant la qualité du signal sur le long terme. Conducteurs en cuivre OFC (Oxygen-Free Copper) de haute pureté minimisent la résistance et les interférences. Double blindage avec feuille d',
  short_description = 'Câble audio AUX 3.5mm avec connecteurs plaqués or 24K',
  
  specifications = '{"Connecteurs":"Jack 3.5mm mâle/mâle","Plaquage":"Or 24K","Conducteur":"Cuivre OFC","Blindage":"Double (alu + cuivre)","Longueur":"1.2 mètres","Diamètre":"3.5mm slim","Signal":"Stéréo analogique","Impédance":"32-600 Ohms"}'::jsonb,
  highlights = ARRAY['Connecteurs plaqués or 24K','Cuivre OFC haute pureté','Double blindage anti-interférences','Compatible coques épaisses','Qualité audio audiophile']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.5,
  total_reviews = 312
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-AUX-GOLD';


-- Produit 37/153: MONSTER Câble Micro USB Renforcé Military Grade
UPDATE products 
SET 
  description = 'Le câble Micro USB Monster Military Grade établit nouvelle référence en matière de durabilité. Construction renforcée avec gaine en nylon balistique tressé résiste aux conditions les plus extrêmes. Testés pour supporter plus de 50000 flexions sans dégradation des performances. Connecteurs moulés avec relief de tension en TPU flexible empêchent rupture aux points faibles. Conducteurs en cuivre étamé garantissent charge rapide jusqu',
  short_description = 'Câble Micro USB military grade résistant 50000 flexions',
  
  specifications = '{"Type":"USB-A vers Micro-B","Charge":"2.4A max","Transfert":"USB 2.0 - 480Mbps","Longueur":"1 mètre","Durabilité":"50000 flexions","Matériau":"Nylon balistique","Protection":"Anti-surchauffe","Diamètre":"4mm renforcé"}'::jsonb,
  highlights = ARRAY['Résistance 50000 flexions','Nylon balistique military','Charge rapide 2.4A','Anti-enchevêtrement','Garantie 2 ans']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.4,
  total_reviews = 428
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-MICRO-USB';


-- Produit 38/153: MONSTER Câble Multi 3-en-1 Universal
UPDATE products 
SET 
  description = 'Le câble Monster Multi 3-en-1 révolutionne la connectivité mobile avec sa polyvalence exceptionnelle. Un seul câble remplace trois câbles différents grâce aux connecteurs USB-C, Lightning et Micro USB intégrés. Design innovant avec connecteurs magnétiques détachables facilitent utilisation et évitent usure prématurée. Charge simultanée possible de 3 appareils avec répartition intelligente de puissance jusqu',
  short_description = 'Câble universel 3-en-1 USB-C, Lightning et Micro USB',
  
  specifications = '{"Connecteurs":"USB-C + Lightning + Micro","Charge totale":"3.5A max","Longueur":"0.3m - 1.2m rétractable","Multi-charge":"3 appareils simultanés","Matériau":"Zinc + Nylon","Système":"Magnétique détachable","LED":"Indicateur charge","Protection":"Anti-surcharge"}'::jsonb,
  highlights = ARRAY['3 connecteurs en 1 câble','Charge 3 appareils simultanément','Système rétractable 0.3-1.2m','Connecteurs magnétiques','Compatible 99% appareils']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.6,
  total_reviews = 167
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-3IN1';


-- Produit 39/153: MONSTER LED Strip RGB Gaming 5M Sync Music
UPDATE products 
SET 
  description = 'La bande LED RGB Monster Gaming transforme votre espace en véritable station de jeu immersive. 5 mètres de LEDs RGB haute luminosité avec 150 LEDs SMD 5050 offrent éclairage puissant et couleurs éclatantes. Synchronisation musicale avancée avec micro intégré fait danser lumières au rythme de votre musique ou sons du jeu. Application smartphone dédiée permet contrôle total : 16 millions de couleurs, luminosité, modes prédéfinis, programmation horaire. 20 modes d',
  short_description = 'Bande LED RGB 5M avec sync musique et contrôle app',
  
  specifications = '{"Longueur":"5 mètres","LEDs":"150 SMD 5050","Couleurs":"16 millions RGB","Modes":"20 effets dynamiques","Contrôle":"App + Télécommande","Sync":"Musique via micro","Découpe":"Tous les 10cm","Alimentation":"12V 5A inclus"}'::jsonb,
  highlights = ARRAY['Sync musique temps réel','16 millions de couleurs','Contrôle app smartphone','20 modes dynamiques','Installation facile 3M']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.7,
  total_reviews = 234
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-LED-STRIP-5M';


-- Produit 40/153: MONSTER Ring Light Pro 18
UPDATE products 
SET 
  
  short_description = 'Ring Light pro 18',
  
  specifications = '{"Diamètre":"18","LEDs":"480 unités","Température":"3200K-5600K","Luminosité":"10%-100% variable","Trépied":"50cm-210cm","Contrôle":"Télécommande Bluetooth","Support":"Smartphone + DSLR","Alimentation":"USB + Adaptateur"}'::jsonb,
  highlights = ARRAY['Diamètre pro 18 pouces','3 températures couleur',',',',']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.8,
  total_reviews = 189
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-RING-LIGHT';


-- Produit 41/153: MONSTER Lampe Bureau LED Tactile
UPDATE products 
SET 
  description = 'La lampe de bureau LED Monster allie design moderne et fonctionnalité intelligente pour créer l',
  short_description = 'Lampe bureau LED avec contrôle tactile et port USB charge',
  
  specifications = '{"Puissance":"10W LED","Luminosité":"5 niveaux","Température":"3000K-6500K","Port USB":"5V/2A charge","Contrôle":"Tactile + Mémoire","Flexibilité":"360° ajustable","Minuterie":"30/60 minutes","Durée vie":"50000 heures"}'::jsonb,
  highlights = ARRAY['Contrôle tactile intelligent','5 niveaux luminosité','Port USB charge intégré','Sans scintillement','Col de cygne 360°']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.6,
  total_reviews = 156
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-DESK-LAMP';


-- Produit 42/153: MONSTER Panneaux LED Hexagonaux x6
UPDATE products 
SET 
  description = 'Les panneaux LED hexagonaux Monster transforment instantanément n',
  short_description = 'Kit 6 panneaux LED hexagonaux modulaires RGB tactiles',
  
  specifications = '{"Quantité":"6 panneaux","Couleurs":"16 millions RGB","Contrôle":"Touch + App + WiFi","Effets":"19 modes","Sync":"Musique temps réel","Installation":"Adhésif 3M","Connexion":"Magnétique","Consommation":"24W total"}'::jsonb,
  highlights = ARRAY['Touch control interactif','Modulaire reconfigurable','WiFi et contrôle vocal','Sync musique','Installation sans perçage']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.8,
  total_reviews = 145
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-HEXAGON-6';


-- Produit 43/153: MONSTER Néon LED Gaming 
UPDATE products 
SET 
  
  short_description = 'Enseigne néon LED gaming avec 8 modes éclairage',
  
  specifications = '{"Dimensions":"40x20cm","Message":"GAME ON + Manette","Modes":"8 effets dynamiques","Contrôle":"Télécommande RF","Alimentation":"USB 5V","Consommation":"5W","Matériau":"Acrylique 5mm","Durée vie":"30000 heures"}'::jsonb,
  highlights = ARRAY['Design GAME ON gaming','8 modes dynamiques','Télécommande incluse','Alimentation USB','Installation facile']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.5,
  total_reviews = 198
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-NEON-GAMER';


-- Produit 44/153: MONSTER Projecteur LED Galaxie Bluetooth
UPDATE products 
SET 
  description = 'Le projecteur LED Monster Galaxie transforme votre pièce en cosmos spectaculaire avec projection ultra-réaliste. Double projection laser crée milliers d',
  short_description = 'Projecteur galaxie LED avec Bluetooth et sync musique',
  
  specifications = '{"Projection":"Étoiles + Nébuleuse","Couleurs":"10 nébuleuses","Bluetooth":"5.0 + Haut-parleur","Couverture":"Jusqu\\","Angle":"45° ajustable","Minuterie":"1/2/4 heures","Bruit":"<35dB silencieux","Contrôle":"Télécommande + App"}'::jsonb,
  highlights = ARRAY['Double projection galaxie','Bluetooth audio intégré','Sync musique réactive','Silencieux <35dB','Couverture 200m²']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.7,
  total_reviews = 267
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-STAR-PROJ';


-- Produit 45/153: MONSTER Barre LED Écran Eye-Care
UPDATE products 
SET 
  
  short_description = 'Barre LED écran avec capteur auto et protection yeux',
  
  specifications = '{"Compatibilité":"17-34 pouces","Modes":"3 températures","Capteur":"Auto-ajustement","CRI":"Ra>95","Angle":"25° ajustable","Puissance":"10W","USB":"Passthrough","Matériau":"Aluminium"}'::jsonb,
  highlights = ARRAY['Capteur luminosité auto','Anti-reflet écran','Protection anti-fatigue','3 modes température','Installation sans vis']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.6,
  total_reviews = 234
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-MONITOR-BAR';


-- Produit 46/153: MONSTER Cube LED RGB Intelligent WiFi
UPDATE products 
SET 
  description = 'Le cube LED Monster intelligent combine design moderne et technologie avancée pour éclairage d',
  short_description = 'Cube LED RGB WiFi avec contrôle app et sync musique',
  
  specifications = '{"Dimensions":"10x10x10cm","Couleurs":"16 millions RGB","Connexion":"WiFi 2.4GHz","Contrôle":"App + Voix","Batterie":"2000mAh / 8h","Effets":"20 modes","Sync":"Musique micro","Matériau":"ABS premium"}'::jsonb,
  highlights = ARRAY['WiFi et contrôle vocal','16 millions couleurs','Batterie 8h autonomie','Sync musique','Mode réveil soleil']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.4,
  total_reviews = 312
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-CUBE-RGB';


-- Produit 47/153: MONSTER Chargeur Mural GaN 65W 3 Ports
UPDATE products 
SET 
  description = 'Le chargeur Monster GaN 65W représente la pointe de la technologie de charge avec ses semi-conducteurs au nitrure de gallium. Cette technologie GaN III permet une taille 50% plus compacte qu',
  short_description = 'Chargeur GaN 65W ultra-compact 3 ports avec charge rapide universelle',
  
  specifications = '{"Puissance":"65W max","Technologie":"GaN III","Ports":"2 USB-C + 1 USB-A","Protocoles":"PD 3.0, PPS, QC 4+","Taille":"50% plus compact","Protection":"8 couches sécurité","Prise":"EU/UK/US incluses","Certification":"CE, FCC, RoHS"}'::jsonb,
  highlights = ARRAY['Technologie GaN III avancée','65W pour laptops et mobiles','3 ports charge simultanée','50% plus compact','Multi-protocoles universels']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.8,
  total_reviews = 142
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-GAN-65W';


-- Produit 48/153: MONSTER Batterie Externe 20000mAh PD 22.5W
UPDATE products 
SET 
  description = 'La batterie externe Monster 20000mAh assure une autonomie exceptionnelle pour tous vos appareils mobiles. Capacité massive permettant 5 charges complètes iPhone 15 ou 3 charges iPad Air. Charge rapide bidirectionnelle 22.5W via USB-C Power Delivery pour recharge ultra-rapide des appareils et de la batterie elle-même (3h pour charge complète). Triple sortie simultanée : USB-C PD, USB-A QC 3.0 et USB-A standard pour charger 3 appareils. Écran LED digital affiche précisément pourcentage batterie restante. Cellules lithium-polymère haute densité garantissent 1000+ cycles charge. Mode charge faible puissance pour écouteurs et montres connectées. Protection intelligente contre surcharge, décharge excessive, court-circuit et surchauffe. Design slim 15mm d',
  short_description = 'Batterie 20000mAh avec charge rapide PD 22.5W et écran LED',
  
  specifications = '{"Capacité":"20000mAh / 74Wh","Charge rapide":"22.5W PD","Ports":"1 USB-C + 2 USB-A","Recharge":"3h avec 18W","Écran":"LED digital %","Épaisseur":"15mm ultra-slim","Cycles":"1000+ charges","Sécurité":"Multi-protection"}'::jsonb,
  highlights = ARRAY['5 charges iPhone complètes','Charge rapide 22.5W','Écran LED pourcentage','Ultra-slim 15mm','3 appareils simultanés']::text[],
  warranty = '18 mois constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.7,
  total_reviews = 298
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-POWER-20K';


-- Produit 49/153: MONSTER Chargeur Voiture 45W Dual USB-C
UPDATE products 
SET 
  description = 'Le chargeur voiture Monster 45W transforme votre allume-cigare en station de charge haute performance. Double port USB-C Power Delivery permet charge simultanée de 2 appareils avec répartition intelligente 25W+20W ou 45W single. Compatible 12V/24V fonctionne dans voitures, camions, camping-cars. Puce intelligente reconnaît automatiquement appareils et ajuste puissance optimale. Design aluminium avec dissipation thermique avancée prévient surchauffe même en usage intensif. LED ambiante bleue facilite localisation ports dans obscurité. Système anti-vibration maintient connexion stable sur routes cahoteuses. Protection contre surtension véhicule et pics électriques démarrage moteur. Charge iPhone 15 à 50% en 30min ou MacBook Air en conduite. Compact 5cm ne gêne pas levier vitesse ou autres commandes. Contacts plaqués or résistent corrosion environnement automobile. Ressorts renforcés garantissent maintien ferme dans prise. Certification CE automobile et test -20°C à +80°C. Parfait pour trajets quotidiens et road trips à La Réunion.',
  short_description = 'Chargeur voiture 45W double USB-C avec charge rapide PD',
  
  specifications = '{"Puissance":"45W total","Ports":"2x USB-C PD","Répartition":"25W+20W ou 45W","Compatibilité":"12V/24V","Matériau":"Aluminium","LED":"Éclairage bleu","Température":"-20°C à +80°C","Taille":"5cm compact"}'::jsonb,
  highlights = ARRAY['Double USB-C 45W','Charge 2 appareils','Aluminium premium','LED localisation nuit','Anti-vibration stable']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.6,
  total_reviews = 187
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-CAR-45W';


-- Produit 50/153: MONSTER Station Charge Sans Fil 15W Qi
UPDATE products 
SET 
  description = 'La station de charge sans fil Monster 15W offre la liberté de charge par induction magnétique Qi. Compatible avec tous smartphones Qi incluant iPhone 12+ MagSafe et Samsung Galaxy. Puissance adaptative : 15W Android, 7.5W iPhone, 5W écouteurs. Bobines doubles élargies permettent charge dans toute position portrait ou paysage. Surface antidérapante silicone protège téléphone des rayures et maintient position stable. Détection corps étrangers stoppe charge si objet métallique détecté pour sécurité. Ventilateur silencieux intégré dissipe chaleur pour charge optimale continue. LED indicateur multicolore : bleu charge, vert complet, rouge erreur. Design ultra-fin 8mm s',
  short_description = 'Chargeur sans fil Qi 15W avec charge rapide adaptative',
  
  specifications = '{"Puissance":"15W max adaptive","Standard":"Qi certified","Compatibilité":"iPhone/Android","Bobines":"Double coil","Épaisseur":"8mm ultra-fin","Coque":"Jusqu\\","Protection":"FOD + température","Ventilateur":"Silencieux intégré"}'::jsonb,
  highlights = ARRAY['Charge 15W ultra-rapide','Compatible tous Qi','Ultra-fin 8mm','Ventilateur silencieux','Détection objets étrangers']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.5,
  total_reviews = 224
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-WIRELESS-15W';


-- Produit 51/153: MONSTER Station Charge 6 Ports 120W Desktop
UPDATE products 
SET 
  description = 'La station de charge Monster 6 ports 120W est la solution ultime pour familles et bureaux multi-appareils. Puissance totale 120W répartie intelligemment sur 6 ports : 3 USB-C PD (65W/30W/20W) et 3 USB-A QC (18W chacun). Technologie GaN II permet design compact malgré puissance élevée. Charge simultanée laptop, tablette, 2 smartphones, écouteurs et montre sans perte performance. Système allocation dynamique ajuste automatiquement puissance selon besoins chaque appareil. Écran LCD affiche tension, courant et puissance temps réel chaque port. Protection individuelle par port avec fusibles réarmables automatiques. Ventilation active silencieuse maintient température optimale charge intensive. Base antidérapante lestée stabilité parfaite sur bureau. Séparateurs amovibles organisent câbles proprement. Compatible tous protocoles : PD 3.0, QC 4+, AFC, FCP, PPS. Cordon alimentation 1.5m avec prise terre sécurité renforcée. Mode éco coupe ports inutilisés pour économie énergie. Boîtier aluminium anodisé dissipe efficacement chaleur. Solution professionnelle pour espaces travail connectés La Réunion.',
  short_description = 'Station 6 ports 120W avec écran LCD et charge intelligente',
  
  specifications = '{"Puissance":"120W total","Ports":"3 USB-C + 3 USB-A","Technologie":"GaN II","Écran":"LCD monitoring","USB-C Max":"65W PD","Protection":"Individuelle/port","Ventilation":"Active silencieuse","Matériau":"Aluminium anodisé"}'::jsonb,
  highlights = ARRAY['6 ports charge simultanée','Écran LCD monitoring','Technologie GaN II','120W puissance totale','Protection par port']::text[],
  warranty = '3 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.9,
  total_reviews = 98
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-6PORT-120W';


-- Produit 52/153: MONSTER Support Manette Gaming RGB Premium
UPDATE products 
SET 
  description = 'Le support manette Monster RGB transforme vos contrôleurs en véritables œuvres d',
  short_description = 'Support 2 manettes avec RGB personnalisable et charge USB',
  
  specifications = '{"Compatibilité":"PS5/PS4/Xbox/Switch","Capacité":"2 manettes","RGB":"16M couleurs","Modes":"12 effets","Charge":"USB-C intégrée","Hub":"2 ports USB","Matériau":"Aluminium + ABS","Dimensions":"15x20x10cm"}'::jsonb,
  highlights = ARRAY['RGB 16 millions couleurs','Charge 2 manettes','Compatible toutes consoles','Hub USB intégré','Aluminium premium']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.7,
  total_reviews = 156
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-CONTROLLER-STAND';


-- Produit 53/153: MONSTER Tapis Souris Gaming XXL RGB 900x400mm
UPDATE products 
SET 
  
  short_description = 'Tapis XXL 900x400mm avec RGB 14 zones et surface optimisée',
  
  specifications = '{"Dimensions":"900x400x4mm","Surface":"Micro-texturée","RGB":"14 zones","Compatibilité":"Tous capteurs","Base":"Caoutchouc 4mm","Bords":"Cousus renforcés","Sync RGB":"Multi-écosystème","Câble":"USB 1.8m tressé"}'::jsonb,
  highlights = ARRAY['XXL 900x400mm','RGB 14 zones','Surface gaming optimisée','Sync écosystèmes RGB','Bords cousus durables']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.8,
  total_reviews = 145
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-MOUSEPAD-XXL';


-- Produit 54/153: MONSTER Bungee Souris Gaming Anti-Friction
UPDATE products 
SET 
  description = 'Le bungee souris Monster élimine définitivement friction et accrochage câble pendant sessions gaming intenses. Bras flexible silicone medical-grade maintient câble hauteur optimale sans résistance. Compatible tous diamètres câbles souris 1.5mm à 4mm marché. Base lestée 280g avec 6 patins antidérapants garantit stabilité absolue même mouvements rapides. Hub USB 2.0 intégré 4 ports augmente connectivité setup gaming. LED RGB personnalisable base ajoute touche esthétique setup coordonné. Système ressort tension ajustable adapte différentes longueurs préférences câble. Revêtement soft-touch empêche rayures câble maintient souplesse long terme. Hauteur réglable 13-20cm accommode différentes configurations bureau. Système clip rapide permet installation/retrait câble une main. Port charge USB-C additionnel pour souris sans fil gaming. Construction ABS renforcé fibre verre résiste années utilisation intensive. Design compact n',
  short_description = 'Bungee anti-friction avec hub USB et base lestée 280g',
  
  specifications = '{"Base":"280g lestée","Hub USB":"4 ports 2.0","Hauteur":"13-20cm réglable","Câbles":"1.5-4mm diamètre","LED":"RGB personnalisable","Patins":"6 antidérapants","Matériau":"ABS + silicone","USB-C":"Port charge bonus"}'::jsonb,
  highlights = ARRAY['Élimine friction câble','Hub USB 4 ports','Base 280g ultra-stable','LED RGB gaming','Hauteur ajustable']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.5,
  total_reviews = 267
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-BUNGEE';


-- Produit 55/153: MONSTER Support Écran Gaming RGB avec Tiroirs
UPDATE products 
SET 
  description = 'Le support écran Monster RGB améliore ergonomie et esthétique setup gaming complet. Élévation écran 10cm réduit fatigue cervicale aligne vision angle optimal. Plateau supérieur supporte jusqu',
  short_description = 'Support écran avec tiroirs, hub USB et RGB ambiance gaming',
  
  specifications = '{"Dimensions":"60x25x10cm","Capacité":"30kg max","Tiroirs":"2 coulissants","Hub USB":"4 ports 3.0","RGB":"LED périmètre","Charge Qi":"10W intégrée","Matériau":"MDF 18mm premium","Écran max":"32 pouces"}'::jsonb,
  highlights = ARRAY['Élévation ergonomique 10cm','2 tiroirs rangement','Hub USB 3.0 frontal','RGB gaming ambiance','Charge wireless Qi']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.7,
  total_reviews = 112
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-MONITOR-STAND';


-- Produit 56/153: HIFUTURE EVO 2
UPDATE products 
SET 
  
  short_description = 'Montre connectée abordable avec suivi santé complet',
  images = ARRAY['/placeholder-monster-mini.svg']::text[],
  specifications = '{"Type Écran":"LCD couleur","Résistance":"IP68","Autonomie":"5-7 jours","Cycle féminin":"Oui (Beige/Rose Gold)"}'::jsonb,
  highlights = ARRAY['Écran LCD couleur','Suivi santé complet','Certification IP68','Rapport qualité-prix excellent','Design élégant']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.4,
  total_reviews = 567
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-EVO-2';


-- Produit 57/153: HIFUTURE Active
UPDATE products 
SET 
  
  short_description = 'Montre connectée premium avec boîtier métallique et écran AMOLED 1000 nits',
  images = ARRAY['/placeholder-monster-mini.svg']::text[],
  specifications = '{"Type Écran":"AMOLED HD 1000 nits","GPS":"Intégré","Résistance":"ATM5","Autonomie":"12-16 jours"}'::jsonb,
  highlights = ARRAY['Boîtier métallique premium','Écran AMOLED 1000 nits','100+ modes sport','Certification ATM5','Autonomie exceptionnelle']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.9,
  total_reviews = 89
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-ACTIVE';


-- Produit 58/153: HIFUTURE Aurora
UPDATE products 
SET 
  description = 'La montre connectée HIFUTURE Aurora harmonise parfaitement élégance professionnelle et performance technologique. Son boîtier métallique premium témoigne d',
  short_description = 'Montre connectée business avec boîtier métallique premium et écran AMOLED',
  images = ARRAY['/placeholder-monster-mini.svg']::text[],
  specifications = '{"Type Écran":"AMOLED","GPS":"Intégré","Résistance":"ATM5","Autonomie":"10-12 jours"}'::jsonb,
  highlights = ARRAY['Boîtier métallique premium','Design business élégant','Fonctions wellness complètes','GPS intégré','Charge sans fil Qi']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.6,
  total_reviews = 145
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-AURORA';


-- Produit 59/153: HIFUTURE Vela
UPDATE products 
SET 
  
  short_description = 'Montre connectée haut de gamme avec écran Always-On AMOLED et 120+ modes sport',
  images = ARRAY['/placeholder-monster-mini.svg']::text[],
  specifications = '{"Type Écran":"Always-On AMOLED","GPS":"Double fréquence","Résistance":"ATM5","Autonomie":"10-14 jours"}'::jsonb,
  highlights = ARRAY['Écran Always-On AMOLED','120+ modes sport','GPS double fréquence','Boîtier céramique','Autonomie remarquable']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.8,
  total_reviews = 112
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-VELA';


-- Produit 60/153: HIFUTURE Aura 2
UPDATE products 
SET 
  description = 'La montre connectée HIFUTURE Aura 2 perfectionne la formule gagnante de sa prédécesseure avec améliorations significatives et nouvelles fonctionnalités. Cette évolution réussie combine technologies de santé avancées, design premium et accessibilité tarifaire pour démocratiser l',
  short_description = 'Montre connectée haut de gamme avec ECG certifié et écran Always-On amélioré',
  images = ARRAY['/placeholder-monster-mini.svg']::text[],
  specifications = '{"Type Écran":"Always-On amélioré","ECG":"Certifié","GPS":"Triple constellation","Autonomie":"12-15 jours"}'::jsonb,
  highlights = ARRAY['ECG certifié','Always-On nouvelle génération','GPS triple constellation','Certification MIL-STD-810H','Charge rapide 50% en 30min']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.8,
  total_reviews = 198
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-AURA-2';


-- Produit 61/153: HIFUTURE Lume
UPDATE products 
SET 
  description = 'Montre connectée HIFUTURE Lume avec éclairage LED unique pour style futuriste. Écran AMOLED lumineux parfait pour lifestyle urbain branché. Éclairage LED intégré idéal pour activités nocturnes et sport soir. Quatre coloris tendance : noir discret, gris moderne, vert dynamique ou champagne élégant. Suivi santé complet avec capteur de température corporelle exclusif. GPS intégré et résistance IP67 pour toutes vos aventures. Autonomie 6-8 jours optimisée malgré l',
  short_description = 'Montre connectée LED urbaine avec design futuriste',
  images = ARRAY['/placeholder-monster-mini.svg']::text[],
  specifications = '{"Type Écran":"AMOLED","Éclairage":"LED intégré","Résistance":"IP67","Autonomie":"6-8 jours"}'::jsonb,
  highlights = ARRAY['Éclairage LED unique','Design futuriste','GPS intégré','Capteur de température','Style urbain branché']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.5,
  total_reviews = 345
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-LUME';


-- Produit 62/153: HIFUTURE Lume Pro
UPDATE products 
SET 
  description = 'Montre HIFUTURE Lume Pro avec éclairage LED avancé et fonctions sport professionnelles. Design sophistiqué disponible en noir, vert, pink ou titanium premium. Éclairage LED amélioré pour visibilité et style uniques. Écran AMOLED haute définition pour affichage cristallin. Fonctions sport pro incluant VO2 Max et temps de récupération. Version titanium avec boîtier ultra-résistant et léger. Résistance ATM5 pour natation et sports aquatiques. Autonomie 8-10 jours malgré fonctionnalités avancées. La montre LED premium pour sportifs exigeants de La Réunion.',
  short_description = 'Montre connectée LED premium avec fonctions sport pro',
  images = ARRAY['/placeholder-monster-mini.svg']::text[],
  specifications = '{"Type Écran":"AMOLED","Éclairage":"LED avancé","Résistance":"ATM5","Autonomie":"8-10 jours"}'::jsonb,
  highlights = ARRAY['LED gaming avancée','VO2 Max & Recovery','Version titanium premium','ATM5 pour natation','Design sophistiqué']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.6,
  total_reviews = 189
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-LUME-PRO';


-- Produit 63/153: HIFUTURE MIXX 3
UPDATE products 
SET 
  description = 'Innovation technologique avec la montre HIFUTURE MIXX 3 à triple affichage. Multi-interface révolutionnaire pour personnalisation maximale. Design avancé disponible en noir professionnel ou jaune fluo haute visibilité. Triple affichage permettant gestion simultanée de multiples informations. Interface optimisée pour usage intensif et multitâche. Visibilité nocturne améliorée avec version jaune fluo. GPS intégré et suivi sport complet pour performances optimales. Autonomie 7-10 jours malgré triple écran AMOLED. La montre multi-affichage idéale pour technophiles de La Réunion.',
  short_description = 'Montre connectée triple affichage avec design gaming avancé',
  images = ARRAY['/placeholder-monster-mini.svg']::text[],
  specifications = '{"Type Écran":"AMOLED triple","Interface":"Triple affichage","GPS":"Intégré","Autonomie":"7-10 jours"}'::jsonb,
  highlights = ARRAY['Triple affichage AMOLED','Interface gaming avancée','Visibilité nocturne','GPS tracking sport','Design futuriste']::text[],
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  
  
  
  average_rating = 4.7,
  total_reviews = 156
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-MIXX-3';


-- Produit 64/153: MONSTER Illuminescence Light Strip Color/Blanc
UPDATE products 
SET 
  description = 'Transformez radicalement votre espace de vie avec le bandeau LED MONSTER Illuminescence Light Strip Color/Blanc, une solution d\',
  short_description = 'Bandeau LED double mode RGB multicouleur et blanc chaud, 2m',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Type":"LED Strip","Connectivité":"Basic (USB)","Longueur":"2m","Usage":"Intérieur","Modes":"RGB + Blanc chaud","Utilisation":"Gaming et travail"}'::jsonb,
  highlights = ARRAY['Double technologie RGB + Blanc chaud','Installation adhésive simple 3M','Alimentation USB universelle','Contrôle intuitif des modes']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.7
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-COLOR-BLANC';


-- Produit 65/153: MONSTER Illuminescence Basic Lightstrip Multicouleur
UPDATE products 
SET 
  description = 'Illuminez et personnalisez votre espace de vie avec le bandeau LED MONSTER Illuminescence Basic Lightstrip Multicouleur, une solution d\',
  short_description = 'Bandeau LED RGB multicouleur, disponible en 2m, 4m et 5m',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Type":"LED Strip","Connectivité":"Basic (USB)","Usage":"Intérieur","Couleurs":"RGB multicouleur","Longueurs":"2m, 4m, 5m","Installation":"Adhésif 3M"}'::jsonb,
  highlights = ARRAY['Technologie RGB - millions de couleurs','Trois longueurs disponibles','Installation adhésive facile','Alimentation USB pratique','Consommation énergétique minimale']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.6
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-BASIC-MULTI';


-- Produit 66/153: MONSTER Illuminescence Smart Chroma Light 2X Bars
UPDATE products 
SET 
  description = 'Transformez votre environnement en spectacle lumineux époustouflant avec le pack MONSTER Illuminescence Smart Chroma Light 2X Bars, une solution d\',
  short_description = 'Pack 2 barres LED RGB IC avec contrôle WiFi et synchronisation musicale',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Type":"Light Bar","Connectivité":"Smart (WiFi)","Technologie":"RGB IC","Contenu":"2 barres","Effet":"Chroma immersif","Installation":"Modulaire"}'::jsonb,
  highlights = ARRAY['Technologie RGB IC - contrôle pixel par pixel','Contrôle WiFi via smartphone','Synchronisation musicale en temps réel','Compatible Alexa et Google Assistant','Installation modulaire flexible']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.8
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-CHROMA-2X';


-- Produit 67/153: MONSTER Illuminescence Neon Light Strip
UPDATE products 
SET 
  
  short_description = 'Bandeau LED effet néon continu, design cyberpunk',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Type":"Neon Strip","Effet":"Néon continu","Usage":"Intérieur/Extérieur","Versions":"2m Basic, 5m Smart","Design":"Cyberpunk/Rétro-wave"}'::jsonb,
  highlights = ARRAY['Effet néon continu sans points visibles','Design futuriste cyberpunk','Usage intérieur et extérieur','Version Basic avec réactivité sonore','Version Smart avec contrôle WiFi']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.7
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-NEON';


-- Produit 68/153: MONSTER RGB Gaming Light Bars Pro
UPDATE products 
SET 
  description = 'Barres LED gaming professionnelles avec synchronisation écran et effets dynamiques pour une immersion totale.',
  short_description = 'Barres LED gaming avec sync écran',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Type":"Gaming Light Bar","Technologie":"RGB","Synchronisation":"Écran + Audio","Nombre":"2 barres","Modes":"15 effets prédéfinis"}'::jsonb,
  highlights = ARRAY[',',',',',']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.6
  
  updated_at = NOW()
WHERE 
  sku = 'GT-RGB-BARS-PRO';


-- Produit 69/153: MONSTER Smart LED Panel Hexagonal Kit
UPDATE products 
SET 
  description = 'Kit de panneaux LED hexagonaux modulaires avec contrôle intelligent pour créer des designs muraux uniques.',
  short_description = 'Kit 9 panneaux LED hexagonaux connectés',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Type":"LED Panels","Forme":"Hexagonale","Quantité":"9 panneaux","Connectivité":"WiFi + Bluetooth","Contrôle":"App + Tactile"}'::jsonb,
  highlights = ARRAY['Design modulaire extensible','Contrôle tactile sur panneaux','Application smartphone dédiée','Compatible assistants vocaux','Installation murale facile']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.9
  
  updated_at = NOW()
WHERE 
  sku = 'TL-HEX-KIT-9';


-- Produit 70/153: MONSTER Ambient TV LED Backlight 4K
UPDATE products 
SET 
  description = 'Système de rétroéclairage LED pour TV avec synchronisation des couleurs pour une expérience visuelle immersive.',
  short_description = 'Rétroéclairage TV avec sync couleurs, compatible 55-75',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Type":"TV Backlight","Compatibilité":"55","Technologie":"Ambilight","Modes":"Sync + Manuel","Installation":"Adhésive"}'::jsonb,
  highlights = ARRAY['Synchronisation couleurs écran','Réduit fatigue oculaire','Installation universelle','Contrôle via télécommande','Mode cinéma optimisé']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.5
  
  updated_at = NOW()
WHERE 
  sku = 'VL-TV-BL-4K';


-- Produit 71/153: MONSTER Projecteur LED Galaxy Starlight
UPDATE products 
SET 
  description = 'Projecteur LED créant un ciel étoilé avec nébuleuses colorées pour transformer votre chambre en galaxie.',
  short_description = 'Projecteur galaxie avec télécommande et timer',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Type":"Projecteur LED","Effets":"Étoiles + Nébuleuses","Contrôle":"Télécommande + App","Timer":"Auto-off 1/2/4h","Couverture":"15-30m²"}'::jsonb,
  highlights = ARRAY['Effets galaxie réalistes','Nébuleuses multicolores','Mode musique réactif','Timer programmable','Télécommande incluse']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.8
  
  updated_at = NOW()
WHERE 
  sku = 'CL-GALAXY-PRO';


-- Produit 72/153: MONSTER LED Ring Light Studio Pro 18
UPDATE products 
SET 
  description = 'Ring light professionnel 18 pouces pour streaming, photographie et maquillage avec température de couleur réglable.',
  short_description = 'Ring light 18',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Type":"Ring Light","Diamètre":"18 pouces","Température":"3200K-5600K","Intensité":"Variable 1-100%","Hauteur":"Jusqu\\"}'::jsonb,
  highlights = ARRAY['Éclairage uniforme sans ombre','Température couleur réglable','Trépied ajustable 2m','Support smartphone/caméra','Télécommande Bluetooth']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.7
  
  updated_at = NOW()
WHERE 
  sku = 'PL-RING-18-PRO';


-- Produit 73/153: MONSTER Smart Bulb RGB WiFi Pack x4
UPDATE products 
SET 
  description = 'Pack de 4 ampoules LED intelligentes RGB avec contrôle WiFi pour automatiser l\',
  short_description = 'Pack 4 ampoules smart RGB E27, compatible Alexa/Google',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Type":"Ampoule Smart","Culot":"E27","Puissance":"9W = 60W","Couleurs":"16 millions","Connectivité":"WiFi 2.4GHz"}'::jsonb,
  highlights = ARRAY['Contrôle vocal Alexa/Google','16 millions de couleurs','Programmation horaire','Scénarios personnalisés','Économie énergie 85%']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.6
  
  updated_at = NOW()
WHERE 
  sku = 'HL-BULB-RGB-4';


-- Produit 74/153: MONSTER LED Strip Gaming Setup 5M
UPDATE products 
SET 
  description = 'Bandeau LED spécialement conçu pour les setups gaming avec synchronisation musique et effets dynamiques.',
  short_description = 'Bandeau LED 5M gaming avec sync musique',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Longueur":"5 mètres","LEDs":"150 LEDs","Couleurs":"RGB + Blanc","Modes":"20 modes","Contrôle":"App + Télécommande"}'::jsonb,
  highlights = ARRAY['Synchronisation musique','Effets gaming dynamiques','Application mobile dédiée','Installation facile']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.6
  
  updated_at = NOW()
WHERE 
  sku = 'MON-LED-GAME5M';


-- Produit 75/153: MONSTER Cube LED Modulaire Smart
UPDATE products 
SET 
  description = 'Cubes LED modulaires connectables pour créer des designs lumineux personnalisés.',
  short_description = '6 cubes LED modulaires WiFi',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Dimensions":"10x10x10 cm par cube","Quantité":"6 cubes","Couleurs":"16 millions","Contrôle":"WiFi + Bluetooth","Compatibilité":"Alexa, Google Home"}'::jsonb,
  highlights = ARRAY['Design modulaire','Connexion magnétique','Contrôle vocal','Effets personnalisables']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.7
  
  updated_at = NOW()
WHERE 
  sku = 'MON-CUBE-LED';


-- Produit 76/153: MONSTER Lightning Pro Corner RGB
UPDATE products 
SET 
  
  short_description = '2 barres LED d\',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Longueur":"1 mètre par barre","Quantité":"2 barres","Angle":"90 degrés","Couleurs":"RGB + Blanc","Installation":"Adhésif 3M"}'::jsonb,
  highlights = ARRAY['Design pour angles','Éclairage immersif','Télécommande RF','Installation simple']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.5
  
  updated_at = NOW()
WHERE 
  sku = 'MON-CORNER-RGB';


-- Produit 77/153: MONSTER Flood Light Extérieur 50W
UPDATE products 
SET 
  description = 'Projecteur LED extérieur puissant avec détection de mouvement et résistance IP65.',
  short_description = 'Projecteur LED 50W IP65 avec détecteur',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Puissance":"50W","Luminosité":"5000 lumens","Température":"6500K","Détection":"Capteur PIR 10m","Résistance":"IP65"}'::jsonb,
  highlights = ARRAY['Détection de mouvement','Résistant aux intempéries','Économe en énergie','Longue durée de vie']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.8
  
  updated_at = NOW()
WHERE 
  sku = 'MON-FLOOD-50W';


-- Produit 78/153: MONSTER Infinity Mirror LED 3D
UPDATE products 
SET 
  description = 'Miroir infini LED 3D pour une décoration futuriste avec effets de profondeur illimités.',
  short_description = 'Miroir infini LED 40x40cm avec effets 3D',
  images = ARRAY['/placeholder-product.png']::text[],
  specifications = '{"Dimensions":"40x40 cm","Profondeur":"Effet infini","Couleurs":"RGB programmable","Modes":"25 animations","Contrôle":"App + Commande vocale"}'::jsonb,
  highlights = ARRAY['Effet 3D infini','Contrôle vocal','25 animations','Cadre aluminium premium']::text[],
  warranty = '1 an',
  delivery_time = '24-48h',
  
  
  
  average_rating = 4.9
  
  updated_at = NOW()
WHERE 
  sku = 'MON-INFINITY-3D';


-- Produit 79/153: HIFUTURE Enceinte Altus
UPDATE products 
SET 
  
  short_description = 'Enceinte Bluetooth portable avec son HD',
  
  specifications = '{"Connectivité":"Bluetooth 5.0","Autonomie":"12 heures","Puissance":"10W","Étanchéité":"IPX5"}'::jsonb,
  
  
  
  
  
  
  average_rating = 4.9,
  total_reviews = 91
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-ALTUS';


-- Produit 80/153: HIFUTURE PartyBox Event Horizon
UPDATE products 
SET 
  description = 'La HIFUTURE PartyBox Event Horizon transcende les limites de l',
  short_description = 'Enceinte party avec LED et son puissant',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-1.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-2.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-3.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-s8.jpg','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-specs.jpg']::text[],
  specifications = '{"Puissance":"100W RMS","Autonomie":"8 heures","Éclairage":"LED RGB","Connectivité":"Bluetooth, USB, AUX"}'::jsonb,
  
  
  
  
  
  
  average_rating = 4.9,
  total_reviews = 77
  updated_at = NOW()
WHERE 
  sku = 'HIF-EVENT-HORIZON';


-- Produit 81/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 82/153: HIFUTURE Enceinte Ripple
UPDATE products 
SET 
  
  short_description = 'Enceinte 360° avec son immersif',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-1.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-2.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-3.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-4.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-5.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-6.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-7.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-8.png','https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-9.png']::text[],
  specifications = '{"Son":"360°","Puissance":"20W","Autonomie":"15 heures","Bluetooth":"5.0"}'::jsonb,
  
  
  
  
  
  
  average_rating = 4.9,
  total_reviews = 94
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-RIPPLE';


-- Produit 83/153: MY WAY Câble Lumineux USB-C
UPDATE products 
SET 
  description = 'Câble lumineux MY WAY USB-C avec indicateur LED de charge pour une expérience visuelle unique. Suivez la charge en temps réel grâce à l',
  short_description = 'Câble USB-C lumineux avec LED',
  
  specifications = '{"Longueur":"1 mètre","Charge":"3A Max","LED":"Indicateur lumineux","Matériau":"Nylon tressé"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MYWCBL-LUM-USBC';


-- Produit 84/153: MY WAY Câble Lumineux USB-A
UPDATE products 
SET 
  description = 'Câble lumineux MY WAY USB-A avec indicateur LED pour visualiser la charge en temps réel. Compatible avec tous vos appareils.',
  short_description = 'Câble USB-A lumineux avec LED',
  
  specifications = '{"Longueur":"1 mètre","Charge":"2.4A Max","LED":"Indicateur lumineux","Compatibilité":"Universal"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MYWCBL-LUM-USBA';


-- Produit 85/153: MONSTER Illuminescence Light Strip Pack 2X 5M RGB+W
UPDATE products 
SET 
  description = 'Pack de 2 bandes LED MONSTER Illuminescence 5M RGB+W avec contrôle sonore pour une ambiance personnalisée. Synchronisez vos lumières avec votre musique.',
  short_description = 'Pack 2x5M bandes LED RGB+W avec contrôle sonore',
  
  specifications = '{"Longueur":"2 x 5 mètres","LED":"RGB + Blanc","Contrôle":"Sound Reactive","Alimentation":"12V inclus"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-PACK-2X5M';


-- Produit 86/153: HIFUTURE Écouteur Sonify
UPDATE products 
SET 
  
  short_description = 'Écouteurs TWS premium',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonify-noir.jpg']::text[],
  specifications = '{"Driver":"10mm dynamique","Autonomie":"7h + 21h boîtier","Charge sans fil":"Oui","Bluetooth":"5.3"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'HIFUTURE-SONIFY';


-- Produit 87/153: MONSTER Persona SE ANC
UPDATE products 
SET 
  description = 'Immergez-vous dans un cocon de silence avec le casque MONSTER Persona SE ANC, une solution audio premium qui combine réduction de bruit active professionnelle et confort exceptionnel pour créer l',
  short_description = 'Casque ANC professionnel avec confort premium et audio cristallin',
  
  specifications = '{"ANC":"Hybride -35dB","Driver":"40mm","Autonomie":"40 heures","Codec":"aptX HD, LDAC"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-PERSONA-SE-ANC';


-- Produit 88/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 89/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 90/153: MONSTER Illuminescence LED Touch Light X3 RGB
UPDATE products 
SET 
  description = 'Pack de 3 lampes LED tactiles MONSTER Illuminescence RGB pour créer une ambiance personnalisée. Installation adhésive sans fil pour une flexibilité maximale.',
  short_description = 'Pack 3 lampes LED tactiles RGB',
  
  specifications = '{"Quantité":"3 lampes","Contrôle":"Tactile + télécommande","Couleurs":"16 RGB","Alimentation":"Piles AAA"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-TOUCH-X3';


-- Produit 91/153: MONSTER Illuminescence Light Strip 5M Multicolor IPX6
UPDATE products 
SET 
  description = 'Bande LED MONSTER Illuminescence 5M étanche IPX6 pour intérieur et extérieur. Résiste aux intempéries pour illuminer terrasse, jardin ou piscine.',
  short_description = 'Bande LED 5M étanche IPX6',
  
  specifications = '{"Longueur":"5 mètres","Étanchéité":"IPX6","LED":"Multicolore RGB","Usage":"Intérieur/Extérieur"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-5M-IPX6';


-- Produit 92/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 93/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 94/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 95/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 96/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 97/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 98/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 99/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 100/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 101/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 102/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 103/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 104/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 105/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 106/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 107/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 108/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 109/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 110/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 111/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 112/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 113/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 114/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 115/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 116/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 117/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 118/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 119/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 120/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 121/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 122/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 123/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 124/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 125/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 126/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 127/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 128/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 129/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 130/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 131/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 132/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 133/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 134/153: MONSTER Illuminescence Smart Light Strip RGB+W
UPDATE products 
SET 
  description = 'Bande LED intelligente MONSTER RGB+W avec contrôle app et compatibilité assistants vocaux. Contrôlez vos lumières à la voix avec Alexa ou Google Assistant.',
  short_description = 'Bande LED smart RGB+W contrôle app',
  
  specifications = '{"Contrôle":"App + Voice","Couleurs":"16 millions","Compatible":"Alexa, Google","WiFi":"2.4GHz"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-SMART-RGBW';


-- Produit 135/153: MONSTER N-Lite 206
UPDATE products 
SET 
  description = 'Écouteurs MONSTER N-Lite 206 avec son puissant et design élégant. Driver 10mm pour des basses profondes et des aigus cristallins.',
  short_description = 'Écouteurs avec son puissant',
  images = ARRAY['/placeholder-monster-mini.svg']::text[],
  specifications = '{"Driver":"10mm","Impédance":"32Ω","Câble":"1.2m","Jack":"3.5mm"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MNLT206';


-- Produit 136/153: HIFUTURE Enceinte Ascendo
UPDATE products 
SET 
  description = 'Enceinte HIFUTURE Ascendo Rose alliant élégance féminine et performance audio. Design rose sophistiqué qui embellit votre intérieur moderne. Son premium avec technologie acoustique optimisée pour clarté exceptionnelle. Autonomie longue durée pour profiter de votre musique sans interruption. Connectivité Bluetooth stable pour streaming sans fil depuis tous vos appareils. Construction robuste avec finition soignée dans les moindres détails. Idéale pour créer une ambiance musicale raffinée. L',
  short_description = 'Enceinte Bluetooth design élégant',
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ascendo-placeholder.jpg']::text[],
  specifications = '{"Puissance":"15W","Autonomie":"12 heures","Étanchéité":"IPX5","Bluetooth":"5.0"}'::jsonb,
  
  
  
  
  
  
  average_rating = 4.9,
  total_reviews = 68
  updated_at = NOW()
WHERE 
  sku = 'HIF-ASCENDO';


-- Produit 137/153: MONSTER Mission 100
UPDATE products 
SET 
  description = 'Le casque MONSTER Mission 100 incarne la nouvelle génération d',
  short_description = 'Casque gaming abordable avec drivers 40mm et confort optimisé',
  
  specifications = '{"Son":"Surround 7.1","Driver":"50mm","Micro":"Détachable","RGB":"Oui"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MONSTER-MISSION-100';


-- Produit 138/153: MY WAY Powerbank
UPDATE products 
SET 
  description = 'Batterie externe MY WAY haute capacité avec charge rapide et multiple ports. Jusqu',
  short_description = 'Powerbank haute capacité charge rapide',
  
  specifications = '{"Ports":"2 USB-A + 1 USB-C","Charge rapide":"18W PD","LED":"Indicateur 4 niveaux","Protection":"Multi-protection"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MYWPB';


-- Produit 139/153: MONSTER Illuminescence DUO Monitor Light
UPDATE products 
SET 
  
  short_description = 'Lampe double écran RGB',
  
  specifications = '{"Compatibilité":"Double écran","Éclairage":"RGB personnalisable","Alimentation":"USB","Réglable":"Angle et intensité"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-DUO-MONITOR';


-- Produit 140/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 141/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 142/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 143/153: MONSTER Illuminescence Smart Prism II RGB+IC
UPDATE products 
SET 
  description = 'Pack 6 panneaux LED MONSTER Smart Prism II RGB+IC avec effets flow et contrôle app. Créez des motifs lumineux uniques et personnalisés.',
  short_description = 'Pack 6 panneaux LED RGB+IC flow',
  
  specifications = '{"Quantité":"6 panneaux","Type":"RGB+IC","Effets":"Flow dynamique","Contrôle":"App + Voice"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-PRISM';


-- Produit 144/153: MONSTER Illuminescence Basic Ampoule A19
UPDATE products 
SET 
  description = 'Ampoule LED MONSTER A19 avec température de couleur réglable pour éclairage optimal. 25000 heures de durée de vie pour des économies durables.',
  short_description = 'Ampoule LED A19 température réglable',
  
  specifications = '{"Puissance":"9W (60W équiv)","Lumens":"800lm","Culot":"E27","Durée vie":"25000h"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-AMPOULE-A19';


-- Produit 145/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 146/153: Unknown
UPDATE products 
SET 
  
  
  
  
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  name = '';


-- Produit 147/153: MUVIT KidPic Rouleaux Papier Photo
UPDATE products 
SET 
  description = 'Les rouleaux de papier photo MUVIT KidPic constituent l',
  short_description = 'Pack 5 rouleaux papier photo pour 150 impressions',
  images = ARRAY['/placeholder-monster-mini.svg']::text[],
  specifications = '{"Quantité":"5 rouleaux","Photos/rouleau":"30 photos","Total":"150 impressions","Compatible":"MUVIT KidPic"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MUAPN001';


-- Produit 148/153: MONSTER Illuminescence Smart Beam + 2X Bars Kit
UPDATE products 
SET 
  description = 'Kit complet MONSTER Smart Beam avec 2 barres LED pour éclairage gaming immersif. Synchronisation avec musique et jeux pour une expérience totale.',
  short_description = 'Kit éclairage gaming beam + 2 barres',
  
  specifications = '{"Contenu":"1 beam + 2 barres","RGB":"16M couleurs","Sync":"Musique et jeux","Contrôle":"App + PC software"}'::jsonb
  
  
  
  
  
  
  
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-BEAM-BARS';


-- Produit 149/153: MONSTER Illuminescence Basic Lightstrip Sound Flow
UPDATE products 
SET 
  description = 'Bande LED RGB réactive au son pour une ambiance immersive. Synchronisation audio parfaite.',
  short_description = 'Bande LED RGB réactive au son pour une ambiance immersive. Synchronisation audio parfaite....',
  images = ARRAY['https://raw.githubusercontent.com/Tinquen59/monster-phone-images/main/products/mon-ill-basic-sound.webp']::text[],
  specifications = '{"Type":"LED","Connectivité":"WiFi/App","Usage":"Intérieur"}'::jsonb,
  
  warranty = '2 ans',
  
  
  
  
  average_rating = 4.5
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-BASIC-SOUND';


-- Produit 150/153: MONSTER Illuminescence Smart Light Strip 5M RGB+IC
UPDATE products 
SET 
  description = 'Bande LED intelligente avec technologie RGB+IC pour un contrôle précis des couleurs.',
  short_description = 'Bande LED intelligente avec technologie RGB+IC pour un contrôle précis des couleurs....',
  images = ARRAY['https://raw.githubusercontent.com/Tinquen59/monster-phone-images/main/products/mon-ill-smart-5m-ic.webp']::text[],
  specifications = '{"Type":"LED","Connectivité":"WiFi/App","Usage":"Intérieur"}'::jsonb,
  
  warranty = '2 ans',
  
  
  
  
  average_rating = 4.5
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-SMART-5M-IC';


-- Produit 151/153: MONSTER Illuminescence Smart Light Strip Multicolor Flow
UPDATE products 
SET 
  description = 'Bande LED intelligente avec effet Multicolor Flow pour une ambiance dynamique.',
  short_description = 'Bande LED intelligente avec effet Multicolor Flow pour une ambiance dynamique....',
  images = ARRAY['https://raw.githubusercontent.com/Tinquen59/monster-phone-images/main/products/mon-ill-smart-flow.webp']::text[],
  specifications = '{"Type":"LED","Connectivité":"WiFi/App","Usage":"Intérieur"}'::jsonb,
  
  warranty = '2 ans',
  
  
  
  
  average_rating = 4.5
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-SMART-FLOW';


-- Produit 152/153: MONSTER Illuminescence Smart Beam + 2X Bars Kit
UPDATE products 
SET 
  
  short_description = 'Kit complet d',
  images = ARRAY['https://raw.githubusercontent.com/Tinquen59/monster-phone-images/main/products/mon-ill-beam-kit.webp']::text[],
  specifications = '{"Type":"LED","Connectivité":"WiFi/App","Usage":"Intérieur"}'::jsonb,
  
  warranty = '2 ans',
  
  
  
  
  average_rating = 4.5
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-BEAM-KIT';


-- Produit 153/153: MONSTER Illuminescence Basic Ampoule A19
UPDATE products 
SET 
  description = 'Ampoule LED économique avec température de couleur blanc chaud.',
  short_description = 'Ampoule LED économique avec température de couleur blanc chaud....',
  images = ARRAY['https://raw.githubusercontent.com/Tinquen59/monster-phone-images/main/products/mon-ill-a19.webp']::text[],
  specifications = '{"Type":"LED","Connectivité":"WiFi/App","Usage":"Intérieur"}'::jsonb,
  
  warranty = '2 ans',
  
  
  
  
  average_rating = 4.5
  
  updated_at = NOW()
WHERE 
  sku = 'MON-ILL-A19';
