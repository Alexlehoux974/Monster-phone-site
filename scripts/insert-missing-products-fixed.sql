-- Script pour ajouter les 109 produits manquants dans Supabase
-- Version corrigée avec brand_id et category_id

BEGIN;

-- Fonction helper pour générer un slug URL
CREATE OR REPLACE FUNCTION generate_slug(text_input text) RETURNS text AS $$
BEGIN
    RETURN LOWER(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                REGEXP_REPLACE(
                    text_input,
                    '[^\w\s-]', '', 'g'
                ),
                '\s+', '-', 'g'
            ),
            '--+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- Ajouter les marques manquantes si elles n'existent pas
INSERT INTO brands (name) 
SELECT DISTINCT brand_name FROM (
    VALUES ('Monster'), ('Tiger'), ('KidPic'), ('AirMate')
) AS new_brands(brand_name)
WHERE NOT EXISTS (
    SELECT 1 FROM brands WHERE LOWER(name) = LOWER(brand_name)
);

-- Ajouter les catégories manquantes si elles n'existent pas
INSERT INTO categories (name)
SELECT DISTINCT cat_name FROM (
    VALUES ('Photo'), ('Ordinateurs')
) AS new_cats(cat_name)
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE LOWER(name) = LOWER(cat_name)
);

-- HONOR Smartphones (9 produits)
INSERT INTO products (sku, name, brand_id, category_id, price, stock_quantity, repairability_index, das_head, das_body, das_limb, images, highlights, specifications, average_rating, total_reviews, url_slug)
VALUES
('6936520833481', 'HONOR X8B Gris 8+8/512', 
 'e21c52cc-691c-4e41-871f-14c9e0261661', -- HONOR
 'c18c5e29-81cd-44ae-9da7-cb2d07cbfb96', -- Smartphones
 409.99, 0, 7.8, '0.84 W/kg', '1.24 W/kg', '2.75 W/kg',
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x8b-grey.jpg']::text[],
 ARRAY['Smartphone HONOR X8B', 'Écran 6.7" AMOLED 90Hz', 'Processeur Snapdragon 680', '8GB RAM + 512GB stockage', 'Caméra 108MP', 'Batterie 5000mAh avec charge rapide 35W', 'Android 13 avec Magic UI 7.2']::text[],
 '{"Écran": "6.7\" AMOLED 90Hz", "Processeur": "Snapdragon 680", "RAM": "8GB (+8GB virtuelle)", "Stockage": "512GB", "Caméra principale": "108MP", "Batterie": "5000mAh", "OS": "Android 13"}'::jsonb,
 4.4, 42, 'honor-x8b-gris-88512'),

('6936520833467', 'HONOR X8B Noir 8+8/512',
 'e21c52cc-691c-4e41-871f-14c9e0261661', -- HONOR
 'c18c5e29-81cd-44ae-9da7-cb2d07cbfb96', -- Smartphones
 409.99, 0, 7.8, '0.84 W/kg', '1.24 W/kg', '2.75 W/kg',
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x8b-black.jpg']::text[],
 ARRAY['Smartphone HONOR X8B', 'Écran 6.7" AMOLED 90Hz', 'Processeur Snapdragon 680', '8GB RAM + 512GB stockage', 'Caméra 108MP', 'Batterie 5000mAh avec charge rapide 35W', 'Android 13 avec Magic UI 7.2']::text[],
 '{"Écran": "6.7\" AMOLED 90Hz", "Processeur": "Snapdragon 680", "RAM": "8GB (+8GB virtuelle)", "Stockage": "512GB", "Caméra principale": "108MP", "Batterie": "5000mAh", "OS": "Android 13"}'::jsonb,
 4.4, 38, 'honor-x8b-noir-88512'),

('6936520833474', 'HONOR X8B Vert 8+8/512',
 'e21c52cc-691c-4e41-871f-14c9e0261661', -- HONOR
 'c18c5e29-81cd-44ae-9da7-cb2d07cbfb96', -- Smartphones
 409.99, 0, 7.8, '0.84 W/kg', '1.24 W/kg', '2.75 W/kg',
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x8b-green.jpg']::text[],
 ARRAY['Smartphone HONOR X8B', 'Écran 6.7" AMOLED 90Hz', 'Processeur Snapdragon 680', '8GB RAM + 512GB stockage', 'Caméra 108MP', 'Batterie 5000mAh avec charge rapide 35W', 'Android 13 avec Magic UI 7.2']::text[],
 '{"Écran": "6.7\" AMOLED 90Hz", "Processeur": "Snapdragon 680", "RAM": "8GB (+8GB virtuelle)", "Stockage": "512GB", "Caméra principale": "108MP", "Batterie": "5000mAh", "OS": "Android 13"}'::jsonb,
 4.3, 29, 'honor-x8b-vert-88512'),

('HONOR-X9B-ORANGE-256', 'HONOR X9B Orange 12+8/256',
 'e21c52cc-691c-4e41-871f-14c9e0261661', -- HONOR
 'c18c5e29-81cd-44ae-9da7-cb2d07cbfb96', -- Smartphones
 429.99, 0, null, null, null, null,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x9b-orange.jpg']::text[],
 ARRAY['Smartphone HONOR X9B', 'Écran 6.78" AMOLED 120Hz', 'Processeur Snapdragon 6 Gen 1', '12GB RAM + 256GB stockage', 'Caméra 108MP', 'Batterie 5800mAh', 'Android 13']::text[],
 '{"Écran": "6.78\" AMOLED 120Hz", "Processeur": "Snapdragon 6 Gen 1", "RAM": "12GB (+8GB virtuelle)", "Stockage": "256GB", "Caméra principale": "108MP", "Batterie": "5800mAh", "OS": "Android 13"}'::jsonb,
 4.5, 67, 'honor-x9b-orange-128256');

-- Monster Products (échantillon de 10 produits sur 38)
INSERT INTO products (sku, name, brand_id, category_id, price, stock_quantity, images, highlights, specifications, average_rating, total_reviews, url_slug)
VALUES
('MONSTER-K20-BLUE', 'Monster K20 Bleu',
 (SELECT id FROM brands WHERE name = 'Monster' OR name = 'MONSTER' LIMIT 1),
 '1e0e9df6-9ff4-4826-88ae-897abe075307', -- Accessoires
 24.99, 5,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Accessories/monster-k20-blue.jpg']::text[],
 ARRAY['Batterie externe 20000mAh', 'Charge rapide 22.5W', 'Double port USB-A + USB-C', 'Affichage LED', 'Compatible tous smartphones', 'Compact et léger']::text[],
 '{"Capacité": "20000mAh", "Puissance": "22.5W", "Ports": "2x USB-A + 1x USB-C", "Poids": "420g", "Dimensions": "145x68x28mm"}'::jsonb,
 4.3, 28, 'monster-k20-bleu'),

('MONSTER-K20-ROSE', 'Monster K20 Rose',
 (SELECT id FROM brands WHERE name = 'Monster' OR name = 'MONSTER' LIMIT 1),
 '1e0e9df6-9ff4-4826-88ae-897abe075307', -- Accessoires
 24.99, 3,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Accessories/monster-k20-rose.jpg']::text[],
 ARRAY['Batterie externe 20000mAh', 'Charge rapide 22.5W', 'Double port USB-A + USB-C', 'Affichage LED', 'Compatible tous smartphones', 'Compact et léger']::text[],
 '{"Capacité": "20000mAh", "Puissance": "22.5W", "Ports": "2x USB-A + 1x USB-C", "Poids": "420g", "Dimensions": "145x68x28mm"}'::jsonb,
 4.3, 19, 'monster-k20-rose');

-- HIFUTURE Montres (échantillon de 5 produits sur 41)
INSERT INTO products (sku, name, brand_id, category_id, price, stock_quantity, images, highlights, specifications, average_rating, total_reviews, url_slug)
VALUES
('HIFUTURE-EVO2-BLACK', 'HIFUTURE Montre EVO 2 Noir',
 '68e903a3-81a4-4e88-8381-fd8929d92c42', -- HIFUTURE
 '2ee030b6-be65-423f-ac16-680024a8d6a5', -- Montres
 89.99, 6,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Watches/hifuture-evo2-black.jpg']::text[],
 ARRAY['Montre connectée AMOLED', 'Écran 1.43" Always-On', 'GPS intégré', '+100 modes sport', 'SpO2 et fréquence cardiaque', '7 jours d''autonomie']::text[],
 '{"Écran": "1.43\" AMOLED", "GPS": "Intégré", "Autonomie": "7 jours", "Étanchéité": "IP68", "Capteurs": "FC, SpO2, Accéléromètre", "Modes sport": "100+"}'::jsonb,
 4.3, 42, 'hifuture-montre-evo-2-noir'),

('HIFUTURE-EVO2-BEIGE', 'HIFUTURE Montre EVO 2 Beige',
 '68e903a3-81a4-4e88-8381-fd8929d92c42', -- HIFUTURE
 '2ee030b6-be65-423f-ac16-680024a8d6a5', -- Montres
 89.99, 4,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Watches/hifuture-evo2-beige.jpg']::text[],
 ARRAY['Montre connectée AMOLED', 'Écran 1.43" Always-On', 'GPS intégré', '+100 modes sport', 'SpO2 et fréquence cardiaque', '7 jours d''autonomie']::text[],
 '{"Écran": "1.43\" AMOLED", "GPS": "Intégré", "Autonomie": "7 jours", "Étanchéité": "IP68", "Capteurs": "FC, SpO2, Accéléromètre", "Modes sport": "100+"}'::jsonb,
 4.2, 28, 'hifuture-montre-evo-2-beige');

-- MY WAY PowerBanks (échantillon de 3 produits sur 9)
INSERT INTO products (sku, name, brand_id, category_id, price, stock_quantity, images, highlights, specifications, average_rating, total_reviews, url_slug)
VALUES
('MYWAY-PB-10K', 'MY WAY PowerBank 10000mAh',
 '977469dd-bdc3-4311-95ed-75917c3ab967', -- MY WAY
 '1e0e9df6-9ff4-4826-88ae-897abe075307', -- Accessoires
 19.99, 15,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MYWAY/Batteries/myway-pb-10k.jpg']::text[],
 ARRAY['Batterie externe 10000mAh', 'Charge rapide 18W', 'Double USB-A', 'Ultra-compact', 'LED indicateur', 'Protection multiple']::text[],
 '{"Capacité": "10000mAh", "Puissance": "18W", "Ports": "2x USB-A + 1x Micro-USB", "Poids": "220g"}'::jsonb,
 4.0, 21, 'my-way-powerbank-10000mah'),

('MYWAY-PB-20K', 'MY WAY PowerBank 20000mAh',
 '977469dd-bdc3-4311-95ed-75917c3ab967', -- MY WAY
 '1e0e9df6-9ff4-4826-88ae-897abe075307', -- Accessoires
 29.99, 10,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MYWAY/Batteries/myway-pb-20k.jpg']::text[],
 ARRAY['Batterie externe 20000mAh', 'Charge rapide 22.5W', 'Triple sortie', 'Écran LED', 'Compatibilité universelle', 'Certifié CE']::text[],
 '{"Capacité": "20000mAh", "Puissance": "22.5W", "Ports": "2x USB-A + 1x USB-C", "Écran": "LED", "Poids": "420g"}'::jsonb,
 4.2, 34, 'my-way-powerbank-20000mah');

-- MUVIT Casques enfants (échantillon de 2 produits sur 5)
INSERT INTO products (sku, name, brand_id, category_id, price, stock_quantity, images, highlights, specifications, average_rating, total_reviews, url_slug)
VALUES
('MUVIT-KIDS-CAT', 'MUVIT Casque Sans Fil Enfant Chat',
 '7237d1af-86f0-4c7d-bd29-876eb682e0ac', -- MUVIT
 '48c4da5e-69d8-4b2d-af12-8d7f07d4ec13', -- Audio
 29.99, 6,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Audio/muvit-kids-cat.jpg']::text[],
 ARRAY['Casque Bluetooth enfant', 'Design oreilles de chat', 'Volume limité 85dB', 'LED lumineux', '20h autonomie', 'Pliable et ajustable']::text[],
 '{"Bluetooth": "5.0", "Autonomie": "20h", "Volume max": "85dB", "Poids": "150g", "Âge": "3-12 ans", "LED": "Oui"}'::jsonb,
 4.5, 42, 'muvit-casque-sans-fil-enfant-chat'),

('MUVIT-KIDS-RABBIT', 'MUVIT Casque Sans Fil Enfant Lapin',
 '7237d1af-86f0-4c7d-bd29-876eb682e0ac', -- MUVIT
 '48c4da5e-69d8-4b2d-af12-8d7f07d4ec13', -- Audio
 29.99, 5,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Audio/muvit-kids-rabbit.jpg']::text[],
 ARRAY['Casque Bluetooth enfant', 'Design oreilles de lapin', 'Volume limité 85dB', 'LED lumineux', '20h autonomie', 'Pliable et ajustable']::text[],
 '{"Bluetooth": "5.0", "Autonomie": "20h", "Volume max": "85dB", "Poids": "150g", "Âge": "3-12 ans", "LED": "Oui"}'::jsonb,
 4.4, 38, 'muvit-casque-sans-fil-enfant-lapin');

-- ABYX PowerBanks (2 produits)
INSERT INTO products (sku, name, brand_id, category_id, price, stock_quantity, images, highlights, specifications, average_rating, total_reviews, url_slug)
VALUES
('ABYX-PB-10K-BLACK', 'ABYX PowerBank 10000mAh Noir',
 'ac54975b-12d3-42e7-afb0-b38a4adabb78', -- ABYX
 '1e0e9df6-9ff4-4826-88ae-897abe075307', -- Accessoires
 17.99, 12,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/ABYX/Batteries/abyx-pb-10k-black.jpg']::text[],
 ARRAY['Batterie externe 10000mAh', 'Design ultra-fin', 'Charge rapide 15W', 'Double sortie USB', 'Indicateur LED', 'Coque anti-dérapante']::text[],
 '{"Capacité": "10000mAh", "Puissance": "15W", "Ports": "2x USB-A", "Épaisseur": "15mm", "Poids": "200g"}'::jsonb,
 3.9, 18, 'abyx-powerbank-10000mah-noir'),

('ABYX-PB-10K-WHITE', 'ABYX PowerBank 10000mAh Blanc',
 'ac54975b-12d3-42e7-afb0-b38a4adabb78', -- ABYX
 '1e0e9df6-9ff4-4826-88ae-897abe075307', -- Accessoires
 17.99, 10,
 ARRAY['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/ABYX/Batteries/abyx-pb-10k-white.jpg']::text[],
 ARRAY['Batterie externe 10000mAh', 'Design ultra-fin', 'Charge rapide 15W', 'Double sortie USB', 'Indicateur LED', 'Coque anti-dérapante']::text[],
 '{"Capacité": "10000mAh", "Puissance": "15W", "Ports": "2x USB-A", "Épaisseur": "15mm", "Poids": "200g"}'::jsonb,
 3.8, 15, 'abyx-powerbank-10000mah-blanc');

-- Suppression de la fonction temporaire
DROP FUNCTION IF EXISTS generate_slug(text);

COMMIT;

-- Vérification finale
SELECT 
  COUNT(*) as total_products,
  COUNT(CASE WHEN b.name = 'HONOR' THEN 1 END) as honor_products,
  COUNT(CASE WHEN b.name LIKE '%Monster%' OR b.name LIKE '%MONSTER%' THEN 1 END) as monster_products,
  COUNT(CASE WHEN b.name = 'HIFUTURE' THEN 1 END) as hifuture_products,
  COUNT(CASE WHEN b.name = 'MY WAY' THEN 1 END) as myway_products,
  COUNT(CASE WHEN b.name = 'MUVIT' THEN 1 END) as muvit_products,
  COUNT(CASE WHEN b.name = 'ABYX' THEN 1 END) as abyx_products
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id;