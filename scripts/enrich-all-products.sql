-- Script d'enrichissement pour tous les produits HONOR et NOKIA
-- Basé sur les données extraites de static-products.json

-- HONOR X9B 12+8/256
UPDATE products SET
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x9b-noir-main.jpg']::text[],
  specifications = '{"RAM":"12GB + 8GB extensible","Stockage":"256GB","Écran":"6.8 pouces AMOLED 165Hz","Batterie":"6000mAh","Charge rapide":"66W","Connectivité":"5G","Certification":"IP68"}'::jsonb,
  highlights = ARRAY['Écran AMOLED 165Hz ultra-fluide','RAM extensible jusqu''à 20GB','Batterie 6000mAh longue durée','Charge rapide 66W SuperCharge','Certification IP68 étanche']::text[],
  average_rating = 4.8,
  total_reviews = 156,
  warranty = '2 ans constructeur + 1 an offert',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.0,
  das_head = '0.82 W/kg',
  das_body = '1.27 W/kg'
WHERE sku = 'HONOR-X9B-12GB-256GB';

-- HONOR PAD 9 WiFi
UPDATE products SET
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Tablettes/honor-pad9-wifi-main.jpg']::text[],
  specifications = '{"RAM":"8GB + 8GB extensible","Stockage":"256GB","Écran":"12.1 pouces 2.5K","Résolution":"2560x1600 pixels","Batterie":"8300mAh","Audio":"Quad-speakers Harman Kardon","Connectivité":"WiFi 6, Bluetooth 5.2","Épaisseur":"6.9mm","Poids":"555g"}'::jsonb,
  highlights = ARRAY['Écran 2.5K 120Hz certifié TÜV Rheinland','Quad-speakers Harman Kardon','Design ultra-fin 6.9mm','RAM extensible jusqu''à 16GB','Batterie 8300mAh longue durée']::text[],
  average_rating = 4.9,
  total_reviews = 89,
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.3,
  das_body = '1.09 W/kg'
WHERE sku = 'HONOR-PAD9-WIFI';

-- HONOR 200 PRO 12+12/512
UPDATE products SET
  images = ARRAY[
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-3.png',
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-4.png',
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-6.png'
  ]::text[],
  specifications = '{"RAM":"12GB + 12GB (24GB total)","Stockage":"512GB","Écran":"6.78 pouces OLED","Caméra":"Triple 50MP Harcourt","Batterie":"5200mAh Silicon-Carbon","Charge":"100W filaire, 66W sans fil","Processeur":"Snapdragon 8s Gen 3","Certification":"IP65"}'::jsonb,
  highlights = ARRAY[
    'Triple caméra 50MP Harcourt Edition',
    '24GB RAM total (12+12GB)',
    'Charge SuperCharge 100W',
    'Écran OLED 4000 nits',
    'Processeur Snapdragon 8s Gen 3'
  ]::text[],
  average_rating = 4.9,
  total_reviews = 67,
  warranty = '2 ans constructeur + extension 1 an offerte',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 7.8,
  das_head = '0.79 W/kg',
  das_body = '1.21 W/kg'
WHERE sku = 'HONOR-200-PRO-12GB-512GB';

-- HONOR X6B 6+6/128
UPDATE products SET
  images = ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x6b-noir-main.jpg']::text[],
  specifications = '{"RAM":"6GB + 6GB extensible","Stockage":"128GB (extensible 1TB)","Écran":"6.67 pouces TFT LCD","Caméra":"50MP avec IA","Batterie":"5200mAh","Charge":"22.5W","Protection":"TÜV Rheinland"}'::jsonb,
  highlights = ARRAY[
    'Écran certifié TÜV Rheinland',
    'Caméra 50MP avec IA',
    'RAM extensible jusqu''à 12GB',
    'Grande autonomie 5200mAh',
    'Stockage extensible 1TB'
  ]::text[],
  average_rating = 4.5,
  total_reviews = 423,
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.5,
  das_head = '0.91 W/kg',
  das_body = '1.35 W/kg'
WHERE sku = 'HONOR-X6B-6GB-128GB';

-- HONOR X7C 8+6/256
UPDATE products SET
  images = ARRAY[
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-1.jpg',
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-2.jpg',
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-3.jpg'
  ]::text[],
  specifications = '{"RAM":"8GB + 6GB extensible","Stockage":"256GB","Écran":"6.7 pouces AMOLED 120Hz","Caméra":"Triple 64MP avec OIS","Batterie":"5400mAh","Charge":"40W Turbo","Sécurité":"Empreinte latérale"}'::jsonb,
  highlights = ARRAY[
    'Écran AMOLED 120Hz DCI-P3',
    'Triple caméra 64MP avec OIS',
    'RAM extensible jusqu''à 14GB',
    'Batterie 5400mAh longue durée',
    'Charge rapide 40W Turbo'
  ]::text[],
  average_rating = 4.6,
  total_reviews = 189,
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.2,
  das_head = '0.88 W/kg',
  das_body = '1.29 W/kg'
WHERE sku = 'HONOR-X7C-8GB-256GB';

-- HONOR X5B 4+4/64
UPDATE products SET
  images = ARRAY[
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-1.jpg',
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-2.jpg',
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-3.jpg'
  ]::text[],
  specifications = '{"RAM":"4GB + 4GB extensible","Stockage":"64GB (extensible 256GB)","Écran":"6.56 pouces TFT LCD","Caméra":"13MP avec HDR","Batterie":"5000mAh","Slots":"Double SIM + SD"}'::jsonb,
  highlights = ARRAY[
    'Batterie 5000mAh longue durée',
    'RAM extensible à 8GB',
    'Stockage extensible 256GB',
    'Protection oculaire intégrée',
    'Double SIM + carte SD'
  ]::text[],
  average_rating = 4.3,
  total_reviews = 567,
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.7,
  das_head = '0.95 W/kg',
  das_body = '1.42 W/kg'
WHERE sku = 'HONOR-X5B-4GB-64GB';

-- NOKIA 110 2023
UPDATE products SET
  specifications = '{"Type":"Téléphone simple","Écran":"1.77 pouces","Batterie":"1000mAh","Autonomie":"Plusieurs semaines","Dual SIM":"Oui","Radio FM":"Oui","Lampe torche":"Oui"}'::jsonb,
  highlights = ARRAY[
    'Autonomie exceptionnelle de plusieurs semaines',
    'Design Nokia classique et robuste',
    'Double SIM pour deux numéros',
    'Radio FM intégrée',
    'Lampe torche pratique'
  ]::text[],
  average_rating = 4.5,
  total_reviews = 234,
  warranty = '1 an constructeur',
  delivery_time = '24-48h à La Réunion',
  das_head = '1.28 W/kg',
  das_body = '0.96 W/kg'
WHERE sku = 'NOK110-2023';

-- NOKIA 110 4G 2025
UPDATE products SET
  specifications = '{"Type":"Téléphone simple 4G","Écran":"1.8 pouces","Connectivité":"4G LTE","Batterie":"1450mAh","Autonomie":"Longue durée","Dual SIM":"Oui","Appareil photo":"0.3MP"}'::jsonb,
  highlights = ARRAY[
    'Connexion 4G rapide',
    'Design Nokia robuste',
    'Autonomie longue durée',
    'Double SIM pratique',
    'Appareil photo intégré'
  ]::text[],
  average_rating = 4.3,
  total_reviews = 178,
  warranty = '1 an constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 9.0,
  das_head = '1.15 W/kg',
  das_body = '0.89 W/kg'
WHERE sku = 'NOK110-4G-2025';

-- NOKIA G22
UPDATE products SET
  specifications = '{"OS":"Android 12 (pur)","Écran":"6.5 pouces 90Hz","RAM":"4GB","Stockage":"64GB extensible","Batterie":"5050mAh","Charge":"20W","Caméra principale":"50MP","Caméra selfie":"8MP"}'::jsonb,
  highlights = ARRAY[
    'Android pur avec mises à jour garanties',
    'Design durable et réparable',
    'Écran 90Hz fluide',
    'Batterie 5050mAh longue durée',
    'Indice de réparabilité élevé 8.1'
  ]::text[],
  average_rating = 4.6,
  total_reviews = 345,
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion',
  repairability_index = 8.1,
  das_head = '0.75 W/kg',
  das_body = '1.18 W/kg'
WHERE sku = 'NOKIA-G22-4GB-64GB';

-- Produits Monster (accessoires)
-- Monster N-Lite 203 Batterie Portable
UPDATE products SET
  specifications = '{"Capacité":"20000mAh","Charge rapide":"22.5W PD/QC3.0","Sorties":"2x USB-A + 1x USB-C","Entrée":"USB-C 18W","Temps charge":"4 heures","Affichage":"LED intelligent","Dimensions":"145x68x28mm","Poids":"380g"}'::jsonb,
  highlights = ARRAY[
    'Capacité massive 20000mAh',
    'Charge rapide 22.5W',
    'Triple sortie simultanée',
    'Design ultra-compact',
    'Certifié transport aérien'
  ]::text[],
  average_rating = 4.9,
  total_reviews = 892,
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion'
WHERE sku = 'MST-NL203-20K';

-- Monster Illuminescence LED Strip
UPDATE products SET
  specifications = '{"Type":"LED RGB","Longueurs":"2m/4m/5m","Alimentation":"USB 5V","LED/mètre":"30 LED","Adhésif":"3M industriel","Coupable":"Tous les 5cm","Angle":"120°","Durée vie":"50000 heures"}'::jsonb,
  highlights = ARRAY[
    'RGB millions de couleurs',
    'Installation adhésive facile',
    'Alimentation USB universelle',
    '3 longueurs disponibles',
    'Coupable et flexible'
  ]::text[],
  average_rating = 4.6,
  total_reviews = 456,
  warranty = '1 an constructeur',
  delivery_time = '24-48h à La Réunion'
WHERE name LIKE '%Illuminescence Basic Lightstrip%';

-- Monster Câble HDMI Ultra HD 4K
UPDATE products SET
  specifications = '{"Version HDMI":"2.1","Résolution Max":"8K@60Hz / 4K@120Hz","Bande passante":"48 Gbps","HDR":"HDR10, Dolby Vision, HLG","Audio":"Dolby Atmos, DTS:X","Connecteurs":"Plaqués or 24K","Blindage":"Triple blindage EMI"}'::jsonb,
  highlights = ARRAY[
    'HDMI 2.1 dernière génération',
    '4K@120Hz pour gaming',
    'HDR complet (HDR10, Dolby Vision)',
    'Audio Dolby Atmos',
    'Connecteurs plaqués or 24K'
  ]::text[],
  average_rating = 4.8,
  total_reviews = 89,
  warranty = 'Garantie à vie',
  delivery_time = '24-48h à La Réunion'
WHERE name LIKE '%Câble HDMI Ultra HD 4K%';

-- HIFUTURE Casque ANC Tour
UPDATE products SET
  images = ARRAY[
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-1.jpg',
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-2.jpg',
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-3.jpg'
  ]::text[],
  specifications = '{"Technologie":"ANC (Active Noise Cancelling)","Bluetooth":"5.0","Autonomie":"25 heures","Temps de charge":"2.5 heures","Drivers":"40mm","Réponse fréquence":"20Hz-20kHz","Impédance":"32Ω","Sensibilité":"102dB","Microphone":"Intégré","Poids":"250g"}'::jsonb,
  highlights = ARRAY[
    'Réduction active du bruit',
    'Bluetooth 5.0 stable',
    'Autonomie 25 heures',
    'Confort optimal',
    'Son haute fidélité'
  ]::text[],
  average_rating = 4.3,
  total_reviews = 67,
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion'
WHERE name LIKE '%HIFUTURE Casque ANC Tour%';

-- HIFUTURE GRAVITY Enceinte Bluetooth
UPDATE products SET
  images = ARRAY[
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir.png',
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-1.png',
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-2.png'
  ]::text[],
  specifications = '{"Puissance":"40W RMS","Son":"360° immersif","Autonomie":"24 heures","Batterie":"6600mAh + Powerbank","Étanchéité":"IPX7 (flottante)","Bluetooth":"5.2 Multipoint","Portée":"30 mètres","Extras":"LED RGB, FM, MicroSD"}'::jsonb,
  highlights = ARRAY[
    'Son 360° immersif 40W',
    'IPX7 totalement étanche',
    'Powerbank intégré',
    'Bluetooth 5.2 multipoint',
    'Autonomie 24 heures'
  ]::text[],
  average_rating = 4.9,
  total_reviews = 85,
  warranty = '2 ans constructeur',
  delivery_time = '24-48h à La Réunion'
WHERE name LIKE '%HIFUTURE GRAVITY%';

-- Vérification finale
SELECT COUNT(*) as total_enriched
FROM products 
WHERE images IS NOT NULL 
  AND specifications IS NOT NULL
  AND highlights IS NOT NULL;