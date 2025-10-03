-- Migration SQL pour créer les variantes de produits
-- Ce script doit être exécuté directement dans l'éditeur SQL de Supabase

-- Monster N-Lite 206 - Variantes Blanc et Noir
INSERT INTO product_variants (product_id, color, color_code, stock, is_default)
VALUES
  ('1d49edaa-3eee-49e9-85f9-4e9b49eca4f8', 'Blanc', '#FFFFFF', 0, TRUE),
  ('1d49edaa-3eee-49e9-85f9-4e9b49eca4f8', 'Noir', '#000000', 0, FALSE);

-- Monster N-Lite 203 - Variantes Gold et Noir
INSERT INTO product_variants (product_id, color, color_code, stock, is_default)
VALUES
  ('9ddfd620-95ff-4087-8003-9b44bfcfb456', 'Gold', '#FFD700', 0, TRUE),
  ('9ddfd620-95ff-4087-8003-9b44bfcfb456', 'Noir', '#000000', 0, FALSE);

-- NOKIA G22 - Variantes Bleu et Gris
INSERT INTO product_variants (product_id, color, color_code, stock, is_default)
VALUES
  ('9041de43-cb5d-4c43-b8e7-3b6e5f23972d', 'Bleu', '#0066CC', 0, TRUE),
  ('9041de43-cb5d-4c43-b8e7-3b6e5f23972d', 'Gris', '#808080', 0, FALSE);

-- Nokia 110 4G 2025 - Variantes Noir et Bleu
INSERT INTO product_variants (product_id, color, color_code, stock, is_default)
VALUES
  ('42821a9c-9402-4047-9279-c33b0ce40b17', 'Noir', '#000000', 0, TRUE),
  ('42821a9c-9402-4047-9279-c33b0ce40b17', 'Bleu', '#0066CC', 0, FALSE);

-- Monster TH300 - Variantes Blanc et Noir
INSERT INTO product_variants (product_id, color, color_code, stock, is_default)
VALUES
  ('b1ad13bb-75b7-4770-b7b9-a6be33aa4eda', 'Blanc', '#FFFFFF', 0, TRUE),
  ('b1ad13bb-75b7-4770-b7b9-a6be33aa4eda', 'Noir', '#000000', 0, FALSE);
