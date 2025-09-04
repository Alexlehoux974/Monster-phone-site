-- Script pour compléter l'enrichissement de tous les produits
-- Focus sur les produits qui manquent d'images ou de highlights

-- Mise à jour des produits Monster
UPDATE products SET
  images = ARRAY[
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Monster/Cables/monster-cable-hdmi-4k.jpg'
  ]::text[]
WHERE sku LIKE 'MST-%' AND images IS NULL;

-- Mise à jour des produits MUVIT
UPDATE products SET
  images = ARRAY[
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/placeholder-muvit.jpg'
  ]::text[],
  highlights = ARRAY[
    'Produit de qualité MUVIT',
    'Garantie constructeur',
    'Livraison rapide à La Réunion'
  ]::text[]
WHERE brand = 'MUVIT' AND (images IS NULL OR highlights IS NULL);

-- Mise à jour des produits Ascendo
UPDATE products SET
  images = ARRAY[
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/Ascendo/placeholder-ascendo.jpg'
  ]::text[],
  highlights = ARRAY[
    'Technologie Ascendo',
    'Qualité audio premium',
    'Design élégant'
  ]::text[]
WHERE brand = 'Ascendo' AND (images IS NULL OR highlights IS NULL);

-- Mise à jour générique pour tous les produits sans highlights
UPDATE products SET
  highlights = ARRAY[
    'Produit de qualité garantie',
    'Livraison rapide à La Réunion',
    'Service client disponible',
    'Garantie constructeur incluse',
    'Prix compétitif'
  ]::text[]
WHERE highlights IS NULL OR array_length(highlights, 1) = 0;

-- Mise à jour générique pour tous les produits sans images
UPDATE products SET
  images = ARRAY[
    CASE 
      WHEN category = 'Smartphones' THEN 'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/placeholder-smartphone.jpg'
      WHEN category = 'Tablettes' THEN 'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/placeholder-tablet.jpg'
      WHEN category = 'Accessoires' THEN 'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/placeholder-accessory.jpg'
      WHEN category = 'Audio' THEN 'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/placeholder-audio.jpg'
      ELSE 'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/placeholder-default.jpg'
    END
  ]::text[]
WHERE images IS NULL OR array_length(images, 1) = 0;

-- Vérification finale
SELECT 
  COUNT(*) as total_products,
  COUNT(images) as with_images,
  COUNT(specifications) as with_specifications,
  COUNT(highlights) as with_highlights,
  COUNT(average_rating) as with_rating
FROM products;