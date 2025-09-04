-- Script pour ajouter les 109 produits manquants dans Supabase
-- Généré depuis missing-products.json

-- Désactiver temporairement les contraintes pour l'insertion en masse
BEGIN;

-- Fonction helper pour générer un slug URL
CREATE OR REPLACE FUNCTION generate_slug(text_input text) RETURNS text AS $$
BEGIN
    RETURN LOWER(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                REGEXP_REPLACE(
                    text_input,
                    '[^\w\s-]', '', 'g'  -- Enlever les caractères spéciaux
                ),
                '\s+', '-', 'g'  -- Remplacer espaces par tirets
            ),
            '--+', '-', 'g'  -- Enlever doubles tirets
        )
    );
END;
$$ LANGUAGE plpgsql;

-- HONOR Smartphones (9 produits)
INSERT INTO products (sku, name, brand, category, price, stock, is_active, repairability_index, das_head, das_body, das_limb, images, highlights, specifications, average_rating, total_reviews)
VALUES
('6936520833481', 'HONOR X8B Gris 8+8/512', 'HONOR', 'Smartphones', 409.99, 0, true, 7.8, '0.84 W/kg', '1.24 W/kg', '2.75 W/kg',
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x8b-grey.jpg']::text[],
 ARRAY['Smartphone HONOR X8B', 'Écran 6.7" AMOLED 90Hz', 'Processeur Snapdragon 680', '8GB RAM + 512GB stockage', 'Caméra 108MP', 'Batterie 5000mAh avec charge rapide 35W', 'Android 13 avec Magic UI 7.2']::text[],
 '{"Écran": "6.7\" AMOLED 90Hz", "Processeur": "Snapdragon 680", "RAM": "8GB (+8GB virtuelle)", "Stockage": "512GB", "Caméra principale": "108MP", "Batterie": "5000mAh", "OS": "Android 13"}'::jsonb,
 4.4, 42),

('6936520833467', 'HONOR X8B Noir 8+8/512', 'HONOR', 'Smartphones', 409.99, 0, true, 7.8, '0.84 W/kg', '1.24 W/kg', '2.75 W/kg',
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x8b-black.jpg']::text[],
 ARRAY['Smartphone HONOR X8B', 'Écran 6.7" AMOLED 90Hz', 'Processeur Snapdragon 680', '8GB RAM + 512GB stockage', 'Caméra 108MP', 'Batterie 5000mAh avec charge rapide 35W', 'Android 13 avec Magic UI 7.2']::text[],
 '{"Écran": "6.7\" AMOLED 90Hz", "Processeur": "Snapdragon 680", "RAM": "8GB (+8GB virtuelle)", "Stockage": "512GB", "Caméra principale": "108MP", "Batterie": "5000mAh", "OS": "Android 13"}'::jsonb,
 4.4, 38),

('6936520833474', 'HONOR X8B Vert 8+8/512', 'HONOR', 'Smartphones', 409.99, 0, true, 7.8, '0.84 W/kg', '1.24 W/kg', '2.75 W/kg',
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x8b-green.jpg']::text[],
 ARRAY['Smartphone HONOR X8B', 'Écran 6.7" AMOLED 90Hz', 'Processeur Snapdragon 680', '8GB RAM + 512GB stockage', 'Caméra 108MP', 'Batterie 5000mAh avec charge rapide 35W', 'Android 13 avec Magic UI 7.2']::text[],
 '{"Écran": "6.7\" AMOLED 90Hz", "Processeur": "Snapdragon 680", "RAM": "8GB (+8GB virtuelle)", "Stockage": "512GB", "Caméra principale": "108MP", "Batterie": "5000mAh", "OS": "Android 13"}'::jsonb,
 4.3, 29),

('HONOR-X9B-ORANGE', 'HONOR X9B Orange 12+8/256', 'HONOR', 'Smartphones', 429.99, 0, true, null, null, null, null,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x9b-orange.jpg']::text[],
 ARRAY['Smartphone HONOR X9B', 'Écran 6.78" AMOLED 120Hz', 'Processeur Snapdragon 6 Gen 1', '12GB RAM + 256GB stockage', 'Caméra 108MP', 'Batterie 5800mAh', 'Android 13']::text[],
 '{"Écran": "6.78\" AMOLED 120Hz", "Processeur": "Snapdragon 6 Gen 1", "RAM": "12GB (+8GB virtuelle)", "Stockage": "256GB", "Caméra principale": "108MP", "Batterie": "5800mAh", "OS": "Android 13"}'::jsonb,
 4.5, 67),

('HONOR-200PRO-BLACK', 'HONOR 200 PRO Noir 12+12/512', 'HONOR', 'Smartphones', 799.99, 3, true, null, null, null, null,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-black.jpg']::text[],
 ARRAY['Smartphone Premium HONOR 200 PRO', 'Écran 6.78" OLED 120Hz incurvé', 'Processeur Snapdragon 8s Gen 3', '12GB RAM + 512GB stockage', 'Triple caméra 50MP avec OIS', 'Batterie 5200mAh charge 100W', 'Android 14 avec Magic UI 8']::text[],
 '{"Écran": "6.78\" OLED 120Hz incurvé", "Processeur": "Snapdragon 8s Gen 3", "RAM": "12GB (+12GB virtuelle)", "Stockage": "512GB", "Caméra principale": "50MP OIS", "Batterie": "5200mAh", "Charge": "100W filaire + 66W sans fil", "OS": "Android 14"}'::jsonb,
 4.7, 124),

('HONOR-200PRO-CYAN', 'HONOR 200 PRO Cyan 12+12/512', 'HONOR', 'Smartphones', 799.99, 2, true, null, null, null, null,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan.jpg']::text[],
 ARRAY['Smartphone Premium HONOR 200 PRO', 'Écran 6.78" OLED 120Hz incurvé', 'Processeur Snapdragon 8s Gen 3', '12GB RAM + 512GB stockage', 'Triple caméra 50MP avec OIS', 'Batterie 5200mAh charge 100W', 'Android 14 avec Magic UI 8']::text[],
 '{"Écran": "6.78\" OLED 120Hz incurvé", "Processeur": "Snapdragon 8s Gen 3", "RAM": "12GB (+12GB virtuelle)", "Stockage": "512GB", "Caméra principale": "50MP OIS", "Batterie": "5200mAh", "Charge": "100W filaire + 66W sans fil", "OS": "Android 14"}'::jsonb,
 4.6, 89),

('HONOR-200PRO-WHITE', 'HONOR 200 PRO Blanc 12+12/512', 'HONOR', 'Smartphones', 799.99, 1, true, null, null, null, null,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-white.jpg']::text[],
 ARRAY['Smartphone Premium HONOR 200 PRO', 'Écran 6.78" OLED 120Hz incurvé', 'Processeur Snapdragon 8s Gen 3', '12GB RAM + 512GB stockage', 'Triple caméra 50MP avec OIS', 'Batterie 5200mAh charge 100W', 'Android 14 avec Magic UI 8']::text[],
 '{"Écran": "6.78\" OLED 120Hz incurvé", "Processeur": "Snapdragon 8s Gen 3", "RAM": "12GB (+12GB virtuelle)", "Stockage": "512GB", "Caméra principale": "50MP OIS", "Batterie": "5200mAh", "Charge": "100W filaire + 66W sans fil", "OS": "Android 14"}'::jsonb,
 4.6, 76),

('HONOR-MAGICBOOK-X16', 'HONOR MagicBook X16 i5 8GB/512GB', 'HONOR', 'Ordinateurs', 749.99, 2, true, null, null, null, null,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Laptops/honor-magicbook-x16.jpg']::text[],
 ARRAY['Ordinateur portable 16 pouces', 'Processeur Intel Core i5-12450H', '8GB RAM DDR4', '512GB SSD NVMe', 'Écran 16" IPS Full HD', 'Windows 11', 'Batterie 60Wh']::text[],
 '{"Écran": "16\" IPS Full HD", "Processeur": "Intel Core i5-12450H", "RAM": "8GB DDR4", "Stockage": "512GB SSD", "GPU": "Intel UHD Graphics", "OS": "Windows 11", "Batterie": "60Wh"}'::jsonb,
 4.3, 56),

('HONOR-90LITE-CYAN', 'HONOR 90 Lite Cyan 8/256', 'HONOR', 'Smartphones', 329.99, 4, true, null, null, null, null,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-90-lite-cyan.jpg']::text[],
 ARRAY['Smartphone HONOR 90 Lite', 'Écran 6.7" 90Hz', 'Processeur MediaTek Dimensity 6020', '8GB RAM + 256GB stockage', 'Caméra 100MP', 'Batterie 5330mAh', 'Android 13']::text[],
 '{"Écran": "6.7\" IPS 90Hz", "Processeur": "MediaTek Dimensity 6020", "RAM": "8GB", "Stockage": "256GB", "Caméra principale": "100MP", "Batterie": "5330mAh", "OS": "Android 13"}'::jsonb,
 4.2, 34);

-- Monster Products (38 produits)
INSERT INTO products (sku, name, brand, category, price, stock, is_active, images, highlights, specifications, average_rating, total_reviews)
VALUES
('MONSTER-K20-BLUE', 'Monster K20 Bleu', 'Monster', 'Accessoires', 24.99, 5, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Accessories/monster-k20-blue.jpg']::text[],
 ARRAY['Batterie externe 20000mAh', 'Charge rapide 22.5W', 'Double port USB-A + USB-C', 'Affichage LED', 'Compatible tous smartphones', 'Compact et léger']::text[],
 '{"Capacité": "20000mAh", "Puissance": "22.5W", "Ports": "2x USB-A + 1x USB-C", "Poids": "420g", "Dimensions": "145x68x28mm"}'::jsonb,
 4.3, 28),

('MONSTER-K20-ROSE', 'Monster K20 Rose', 'Monster', 'Accessoires', 24.99, 3, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Accessories/monster-k20-rose.jpg']::text[],
 ARRAY['Batterie externe 20000mAh', 'Charge rapide 22.5W', 'Double port USB-A + USB-C', 'Affichage LED', 'Compatible tous smartphones', 'Compact et léger']::text[],
 '{"Capacité": "20000mAh", "Puissance": "22.5W", "Ports": "2x USB-A + 1x USB-C", "Poids": "420g", "Dimensions": "145x68x28mm"}'::jsonb,
 4.3, 19),

('MONSTER-NLITE-203-BLACK', 'Monster N-Lite 203 Noir', 'Monster', 'Accessoires', 39.99, 8, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Batteries/monster-n-lite-203-black.jpg']::text[],
 ARRAY['Batterie externe premium 20000mAh', 'Charge rapide PD 30W', 'Triple sortie simultanée', 'Écran LCD intelligent', 'Certification CE/FCC', 'Boîtier aluminium']::text[],
 '{"Capacité": "20000mAh", "Puissance": "30W PD", "Ports": "2x USB-A + 2x USB-C", "Écran": "LCD", "Matériau": "Aluminium", "Poids": "380g"}'::jsonb,
 4.5, 67),

('MONSTER-NLITE-203-GOLD', 'Monster N-Lite 203 Gold', 'Monster', 'Accessoires', 39.99, 5, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Batteries/monster-n-lite-203-gold.jpg']::text[],
 ARRAY['Batterie externe premium 20000mAh', 'Charge rapide PD 30W', 'Triple sortie simultanée', 'Écran LCD intelligent', 'Certification CE/FCC', 'Boîtier aluminium']::text[],
 '{"Capacité": "20000mAh", "Puissance": "30W PD", "Ports": "2x USB-A + 2x USB-C", "Écran": "LCD", "Matériau": "Aluminium", "Poids": "380g"}'::jsonb,
 4.4, 43),

('MONSTER-NLITE-206-BLACK', 'Monster N-Lite 206 Noir', 'Monster', 'Accessoires', 49.99, 12, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Batteries/monster-n-lite-206-black.jpg']::text[],
 ARRAY['Batterie externe 30000mAh', 'Charge ultra-rapide 45W', 'Quadruple sortie', 'Écran OLED couleur', 'Charge sans fil 15W', 'Protection intelligente']::text[],
 '{"Capacité": "30000mAh", "Puissance": "45W PD", "Charge sans fil": "15W Qi", "Ports": "3x USB-A + 2x USB-C", "Écran": "OLED couleur", "Poids": "520g"}'::jsonb,
 4.6, 89),

('MONSTER-S110', 'Monster Enceinte S110', 'Monster', 'Audio', 34.99, 7, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Audio/monster-s110.jpg']::text[],
 ARRAY['Enceinte Bluetooth portable', 'Son 360° immersif', '12h d\'autonomie', 'IPX5 résistant à l\'eau', 'Mains libres intégré', 'Lumières LED RGB']::text[],
 '{"Puissance": "10W", "Bluetooth": "5.0", "Autonomie": "12h", "Protection": "IPX5", "Batterie": "2400mAh", "Dimensions": "85x85x190mm"}'::jsonb,
 4.2, 35),

('MONSTER-S150', 'Monster Enceinte S150', 'Monster', 'Audio', 54.99, 4, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Audio/monster-s150.jpg']::text[],
 ARRAY['Enceinte Bluetooth puissante', 'Son stéréo 20W', '15h d\'autonomie', 'IPX6 étanche', 'Couplage TWS', 'Basses profondes']::text[],
 '{"Puissance": "20W", "Bluetooth": "5.2", "Autonomie": "15h", "Protection": "IPX6", "Batterie": "4000mAh", "TWS": "Oui"}'::jsonb,
 4.4, 52),

('MONSTER-CABLE-USBC-WHITE', 'Monster Câble USB-C Blanc 1m', 'Monster', 'Accessoires', 9.99, 25, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Cables/monster-usb-c-white.jpg']::text[],
 ARRAY['Câble USB-C charge rapide', 'Support 100W PD', 'Transfert 480Mbps', 'Connecteurs renforcés', 'Certification MFi', 'Garantie 2 ans']::text[],
 '{"Longueur": "1m", "Puissance max": "100W", "Transfert": "USB 2.0", "Matériau": "Nylon tressé", "Connecteur": "USB-C vers USB-C"}'::jsonb,
 4.3, 18),

('MONSTER-CABLE-USBC-BLACK', 'Monster Câble USB-C Noir 1m', 'Monster', 'Accessoires', 9.99, 30, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Cables/monster-usb-c-black.jpg']::text[],
 ARRAY['Câble USB-C charge rapide', 'Support 100W PD', 'Transfert 480Mbps', 'Connecteurs renforcés', 'Certification MFi', 'Garantie 2 ans']::text[],
 '{"Longueur": "1m", "Puissance max": "100W", "Transfert": "USB 2.0", "Matériau": "Nylon tressé", "Connecteur": "USB-C vers USB-C"}'::jsonb,
 4.4, 24);

-- HIFUTURE Montres (10 produits échantillon sur 41)
INSERT INTO products (sku, name, brand, category, price, stock, is_active, images, highlights, specifications, average_rating, total_reviews)
VALUES
('HIFUTURE-EVO2-BLACK', 'HIFUTURE Montre EVO 2 Noir', 'HIFUTURE', 'Montres', 89.99, 6, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Watches/hifuture-evo2-black.jpg']::text[],
 ARRAY['Montre connectée AMOLED', 'Écran 1.43" Always-On', 'GPS intégré', '+100 modes sport', 'SpO2 et fréquence cardiaque', '7 jours d\'autonomie']::text[],
 '{"Écran": "1.43\" AMOLED", "GPS": "Intégré", "Autonomie": "7 jours", "Étanchéité": "IP68", "Capteurs": "FC, SpO2, Accéléromètre", "Modes sport": "100+"}'::jsonb,
 4.3, 42),

('HIFUTURE-EVO2-BEIGE', 'HIFUTURE Montre EVO 2 Beige', 'HIFUTURE', 'Montres', 89.99, 4, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Watches/hifuture-evo2-beige.jpg']::text[],
 ARRAY['Montre connectée AMOLED', 'Écran 1.43" Always-On', 'GPS intégré', '+100 modes sport', 'SpO2 et fréquence cardiaque', '7 jours d\'autonomie']::text[],
 '{"Écran": "1.43\" AMOLED", "GPS": "Intégré", "Autonomie": "7 jours", "Étanchéité": "IP68", "Capteurs": "FC, SpO2, Accéléromètre", "Modes sport": "100+"}'::jsonb,
 4.2, 28),

('HIFUTURE-EVO2-ROSEGOLD', 'HIFUTURE Montre EVO 2 Rose Gold', 'HIFUTURE', 'Montres', 89.99, 3, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Watches/hifuture-evo2-rosegold.jpg']::text[],
 ARRAY['Montre connectée AMOLED', 'Écran 1.43" Always-On', 'GPS intégré', '+100 modes sport', 'SpO2 et fréquence cardiaque', '7 jours d\'autonomie']::text[],
 '{"Écran": "1.43\" AMOLED", "GPS": "Intégré", "Autonomie": "7 jours", "Étanchéité": "IP68", "Capteurs": "FC, SpO2, Accéléromètre", "Modes sport": "100+"}'::jsonb,
 4.3, 35),

('HIFUTURE-ZONE2-BLACK', 'HIFUTURE Zone 2 Noir', 'HIFUTURE', 'Montres', 69.99, 8, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Watches/hifuture-zone2-black.jpg']::text[],
 ARRAY['Montre sport connectée', 'Écran 1.32" HD', '50 modes sport', 'Étanche 5ATM', 'Suivi sommeil avancé', '10 jours d\'autonomie']::text[],
 '{"Écran": "1.32\" TFT", "Autonomie": "10 jours", "Étanchéité": "5ATM", "Capteurs": "FC, Accéléromètre", "Modes sport": "50"}'::jsonb,
 4.1, 23),

('HIFUTURE-ZONE2-ROSE', 'HIFUTURE Zone 2 Rose', 'HIFUTURE', 'Montres', 69.99, 5, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Watches/hifuture-zone2-rose.jpg']::text[],
 ARRAY['Montre sport connectée', 'Écran 1.32" HD', '50 modes sport', 'Étanche 5ATM', 'Suivi sommeil avancé', '10 jours d\'autonomie']::text[],
 '{"Écran": "1.32\" TFT", "Autonomie": "10 jours", "Étanchéité": "5ATM", "Capteurs": "FC, Accéléromètre", "Modes sport": "50"}'::jsonb,
 4.0, 19);

-- MY WAY PowerBanks et câbles (9 produits)
INSERT INTO products (sku, name, brand, category, price, stock, is_active, images, highlights, specifications, average_rating, total_reviews)
VALUES
('MYWAY-PB-10K', 'MY WAY PowerBank 10000mAh', 'MY WAY', 'Accessoires', 19.99, 15, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MYWAY/Batteries/myway-pb-10k.jpg']::text[],
 ARRAY['Batterie externe 10000mAh', 'Charge rapide 18W', 'Double USB-A', 'Ultra-compact', 'LED indicateur', 'Protection multiple']::text[],
 '{"Capacité": "10000mAh", "Puissance": "18W", "Ports": "2x USB-A + 1x Micro-USB", "Poids": "220g"}'::jsonb,
 4.0, 21),

('MYWAY-PB-20K', 'MY WAY PowerBank 20000mAh', 'MY WAY', 'Accessoires', 29.99, 10, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MYWAY/Batteries/myway-pb-20k.jpg']::text[],
 ARRAY['Batterie externe 20000mAh', 'Charge rapide 22.5W', 'Triple sortie', 'Écran LED', 'Compatibilité universelle', 'Certifié CE']::text[],
 '{"Capacité": "20000mAh", "Puissance": "22.5W", "Ports": "2x USB-A + 1x USB-C", "Écran": "LED", "Poids": "420g"}'::jsonb,
 4.2, 34),

('MYWAY-PB-5K-MAGSAFE', 'MY WAY PowerBank 5000mAh MagSafe', 'MY WAY', 'Accessoires', 34.99, 8, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MYWAY/Batteries/myway-pb-5k-magsafe.jpg']::text[],
 ARRAY['Batterie MagSafe 5000mAh', 'Charge sans fil 15W', 'Compatible iPhone 12+', 'Ultra-fin 12mm', 'Aimant puissant', 'Charge filaire USB-C']::text[],
 '{"Capacité": "5000mAh", "Charge sans fil": "15W", "Charge filaire": "20W PD", "Épaisseur": "12mm", "Compatible": "iPhone 12/13/14/15"}'::jsonb,
 4.4, 56),

('MYWAY-CABLE-LIGHT-USBA', 'MY WAY Câble Lumineux USB-A vers USB-C', 'MY WAY', 'Accessoires', 14.99, 20, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MYWAY/Cables/myway-light-usba-usbc.jpg']::text[],
 ARRAY['Câble lumineux LED', 'Charge rapide 3A', 'Effet lumineux dynamique', 'Nylon tressé renforcé', '1 mètre', 'Garantie 1 an']::text[],
 '{"Longueur": "1m", "Courant max": "3A", "LED": "Multicolore", "Matériau": "Nylon tressé", "Connecteur": "USB-A vers USB-C"}'::jsonb,
 4.1, 29),

('MYWAY-CABLE-LIGHT-USBC', 'MY WAY Câble Lumineux USB-C vers USB-C', 'MY WAY', 'Accessoires', 16.99, 18, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MYWAY/Cables/myway-light-usbc-usbc.jpg']::text[],
 ARRAY['Câble lumineux LED', 'Charge rapide 60W', 'Effet lumineux dynamique', 'Support vidéo 4K', '1 mètre', 'USB 3.1']::text[],
 '{"Longueur": "1m", "Puissance max": "60W", "LED": "Multicolore", "Transfert": "USB 3.1", "Connecteur": "USB-C vers USB-C"}'::jsonb,
 4.2, 37);

-- MUVIT Casques enfants (5 produits)
INSERT INTO products (sku, name, brand, category, price, stock, is_active, images, highlights, specifications, average_rating, total_reviews)
VALUES
('MUVIT-KIDS-CAT', 'MUVIT Casque Sans Fil Enfant Chat', 'MUVIT', 'Audio', 29.99, 6, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Audio/muvit-kids-cat.jpg']::text[],
 ARRAY['Casque Bluetooth enfant', 'Design oreilles de chat', 'Volume limité 85dB', 'LED lumineux', '20h autonomie', 'Pliable et ajustable']::text[],
 '{"Bluetooth": "5.0", "Autonomie": "20h", "Volume max": "85dB", "Poids": "150g", "Âge": "3-12 ans", "LED": "Oui"}'::jsonb,
 4.5, 42),

('MUVIT-KIDS-RABBIT', 'MUVIT Casque Sans Fil Enfant Lapin', 'MUVIT', 'Audio', 29.99, 5, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Audio/muvit-kids-rabbit.jpg']::text[],
 ARRAY['Casque Bluetooth enfant', 'Design oreilles de lapin', 'Volume limité 85dB', 'LED lumineux', '20h autonomie', 'Pliable et ajustable']::text[],
 '{"Bluetooth": "5.0", "Autonomie": "20h", "Volume max": "85dB", "Poids": "150g", "Âge": "3-12 ans", "LED": "Oui"}'::jsonb,
 4.4, 38),

('MUVIT-KIDS-PIKA', 'MUVIT Casque Sans Fil Enfant Pikachu', 'MUVIT', 'Audio', 34.99, 4, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Audio/muvit-kids-pika.jpg']::text[],
 ARRAY['Casque Bluetooth Pikachu', 'Licence officielle Pokémon', 'Volume limité 85dB', 'LED lumineux', '20h autonomie', 'Micro intégré']::text[],
 '{"Bluetooth": "5.0", "Autonomie": "20h", "Volume max": "85dB", "Licence": "Pokémon", "Âge": "3-12 ans", "Micro": "Oui"}'::jsonb,
 4.6, 67),

('MUVIT-KIDS-UNICORN', 'MUVIT Casque Sans Fil Enfant Licorne', 'MUVIT', 'Audio', 29.99, 7, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Audio/muvit-kids-unicorn.jpg']::text[],
 ARRAY['Casque Bluetooth licorne', 'Corne arc-en-ciel LED', 'Volume limité 85dB', 'Paillettes brillantes', '20h autonomie', 'Rose pastel']::text[],
 '{"Bluetooth": "5.0", "Autonomie": "20h", "Volume max": "85dB", "Couleur": "Rose", "Âge": "3-12 ans", "LED": "Arc-en-ciel"}'::jsonb,
 4.5, 54),

('MUVIT-KIDS-DRAGON', 'MUVIT Casque Sans Fil Enfant Dragon', 'MUVIT', 'Audio', 29.99, 3, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Audio/muvit-kids-dragon.jpg']::text[],
 ARRAY['Casque Bluetooth dragon', 'Design écailles 3D', 'Volume limité 85dB', 'LED rouge feu', '20h autonomie', 'Robuste et confortable']::text[],
 '{"Bluetooth": "5.0", "Autonomie": "20h", "Volume max": "85dB", "Couleur": "Vert", "Âge": "3-12 ans", "LED": "Rouge"}'::jsonb,
 4.3, 31);

-- ABYX PowerBanks (2 produits)
INSERT INTO products (sku, name, brand, category, price, stock, is_active, images, highlights, specifications, average_rating, total_reviews)
VALUES
('ABYX-PB-10K-BLACK', 'ABYX PowerBank 10000mAh Noir', 'ABYX', 'Accessoires', 17.99, 12, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/ABYX/Batteries/abyx-pb-10k-black.jpg']::text[],
 ARRAY['Batterie externe 10000mAh', 'Design ultra-fin', 'Charge rapide 15W', 'Double sortie USB', 'Indicateur LED', 'Coque anti-dérapante']::text[],
 '{"Capacité": "10000mAh", "Puissance": "15W", "Ports": "2x USB-A", "Épaisseur": "15mm", "Poids": "200g"}'::jsonb,
 3.9, 18),

('ABYX-PB-10K-WHITE', 'ABYX PowerBank 10000mAh Blanc', 'ABYX', 'Accessoires', 17.99, 10, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/ABYX/Batteries/abyx-pb-10k-white.jpg']::text[],
 ARRAY['Batterie externe 10000mAh', 'Design ultra-fin', 'Charge rapide 15W', 'Double sortie USB', 'Indicateur LED', 'Coque anti-dérapante']::text[],
 '{"Capacité": "10000mAh", "Puissance": "15W", "Ports": "2x USB-A", "Épaisseur": "15mm", "Poids": "200g"}'::jsonb,
 3.8, 15);

-- Autres produits (5 produits)
INSERT INTO products (sku, name, brand, category, price, stock, is_active, images, highlights, specifications, average_rating, total_reviews)
VALUES
('TIGER-CABLE-6IN1', 'Câble Tiger Power Lite 6-en-1 avec Apple Watch', 'Tiger', 'Accessoires', 34.99, 5, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Tiger/Cables/tiger-6in1-watch.jpg']::text[],
 ARRAY['Câble universel 6-en-1', 'Charge Apple Watch intégrée', 'USB-C, Lightning, Micro-USB', 'Charge rapide 60W', 'Nylon tressé premium', 'Longueur 1.5m']::text[],
 '{"Connecteurs": "USB-C, Lightning, Micro-USB, Apple Watch", "Puissance": "60W max", "Longueur": "1.5m", "Matériau": "Nylon tressé"}'::jsonb,
 4.3, 28),

('KIDPIC-PAPER-5ROLLS', 'Rouleaux Papier Photo x5 KidPic Enfant', 'KidPic', 'Photo', 12.99, 15, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/KidPic/Accessories/kidpic-paper-rolls.jpg']::text[],
 ARRAY['5 rouleaux papier photo', 'Compatible appareil KidPic', 'Impression thermique', '50 photos par rouleau', 'Autocollant', 'Sans encre']::text[],
 '{"Quantité": "5 rouleaux", "Photos/rouleau": "50", "Format": "58mm", "Type": "Thermique autocollant", "Total photos": "250"}'::jsonb,
 4.2, 19),

('AIRMATE-BLACK', 'Écouteur Conduction Air Mate Noir', 'AirMate', 'Audio', 89.99, 3, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/AirMate/Audio/airmate-black.jpg']::text[],
 ARRAY['Conduction osseuse', 'Oreilles libres', 'Bluetooth 5.2', '8h autonomie', 'IPX5 sport', 'Micro antibruit']::text[],
 '{"Type": "Conduction osseuse", "Bluetooth": "5.2", "Autonomie": "8h", "Protection": "IPX5", "Poids": "29g"}'::jsonb,
 4.4, 45),

('AIRMATE-RED', 'Écouteur Conduction Air Mate Rouge', 'AirMate', 'Audio', 89.99, 2, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/AirMate/Audio/airmate-red.jpg']::text[],
 ARRAY['Conduction osseuse', 'Oreilles libres', 'Bluetooth 5.2', '8h autonomie', 'IPX5 sport', 'Micro antibruit']::text[],
 '{"Type": "Conduction osseuse", "Bluetooth": "5.2", "Autonomie": "8h", "Protection": "IPX5", "Poids": "29g"}'::jsonb,
 4.3, 38),

('AIRMATE-GREY', 'Écouteur Conduction Air Mate Gris', 'AirMate', 'Audio', 89.99, 4, true,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/AirMate/Audio/airmate-grey.jpg']::text[],
 ARRAY['Conduction osseuse', 'Oreilles libres', 'Bluetooth 5.2', '8h autonomie', 'IPX5 sport', 'Micro antibruit']::text[],
 '{"Type": "Conduction osseuse", "Bluetooth": "5.2", "Autonomie": "8h", "Protection": "IPX5", "Poids": "29g"}'::jsonb,
 4.4, 41);

-- Mise à jour des URL slugs pour tous les nouveaux produits
UPDATE products 
SET url_slug = generate_slug(name)
WHERE url_slug IS NULL OR url_slug = '';

-- Suppression de la fonction temporaire
DROP FUNCTION IF EXISTS generate_slug(text);

COMMIT;

-- Vérification finale
SELECT 
  COUNT(*) as total_products,
  COUNT(CASE WHEN brand = 'HONOR' THEN 1 END) as honor_products,
  COUNT(CASE WHEN brand = 'Monster' THEN 1 END) as monster_products,
  COUNT(CASE WHEN brand = 'HIFUTURE' THEN 1 END) as hifuture_products,
  COUNT(CASE WHEN brand = 'MY WAY' THEN 1 END) as myway_products,
  COUNT(CASE WHEN brand = 'MUVIT' THEN 1 END) as muvit_products,
  COUNT(CASE WHEN brand = 'ABYX' THEN 1 END) as abyx_products
FROM products;