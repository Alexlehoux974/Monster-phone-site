-- Table pour gérer les sections de produits vedettes sur la page d'accueil
CREATE TABLE IF NOT EXISTS featured_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL, -- Ex: 'home_smartphones', 'home_ecouteurs'
  title TEXT NOT NULL, -- Ex: 'Nos Smartphones Gaming'
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE, -- Catégorie liée (optionnel)
  display_order INT DEFAULT 0, -- Ordre d'affichage sur la page
  max_products INT DEFAULT 6, -- Nombre maximum de produits à afficher
  is_active BOOLEAN DEFAULT true, -- Activer/désactiver la section
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table de liaison pour sélectionner manuellement les produits vedettes
CREATE TABLE IF NOT EXISTS featured_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES featured_sections(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  display_order INT DEFAULT 0, -- Ordre d'affichage dans la section
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section_id, product_id) -- Un produit ne peut être qu'une fois par section
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_featured_sections_active ON featured_sections(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_featured_products_section ON featured_products(section_id, display_order);
CREATE INDEX IF NOT EXISTS idx_featured_products_product ON featured_products(product_id);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_featured_sections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_featured_sections_updated_at
BEFORE UPDATE ON featured_sections
FOR EACH ROW
EXECUTE FUNCTION update_featured_sections_updated_at();

-- Insérer les sections par défaut
INSERT INTO featured_sections (section_key, title, category_id, display_order, max_products)
VALUES
  ('home_smartphones', 'Nos Smartphones Gaming', '80194285-ea90-40ff-8e2a-8edbe3609330', 1, 6),
  ('home_ecouteurs', 'Nos Écouteurs Gaming', '3fa6e04b-2cab-46db-8a85-f6865909d51c', 2, 6)
ON CONFLICT (section_key) DO NOTHING;

-- Vue pour récupérer facilement les produits vedettes par section
CREATE OR REPLACE VIEW featured_products_view AS
SELECT
  fs.id AS section_id,
  fs.section_key,
  fs.title AS section_title,
  fs.display_order AS section_order,
  fs.max_products,
  fs.is_active AS section_active,
  fp.display_order AS product_order,
  p.*
FROM featured_sections fs
LEFT JOIN featured_products fp ON fs.id = fp.section_id
LEFT JOIN products p ON fp.product_id = p.id
WHERE fs.is_active = true
ORDER BY fs.display_order, fp.display_order;

-- Commentaires pour documentation
COMMENT ON TABLE featured_sections IS 'Sections de produits vedettes configurables pour la page d''accueil';
COMMENT ON TABLE featured_products IS 'Sélection manuelle des produits vedettes par section';
COMMENT ON COLUMN featured_sections.section_key IS 'Clé unique identifiant la section (ex: home_smartphones)';
COMMENT ON COLUMN featured_sections.category_id IS 'Catégorie par défaut si aucun produit manuel sélectionné';
COMMENT ON COLUMN featured_sections.max_products IS 'Nombre maximum de produits à afficher dans cette section';
COMMENT ON COLUMN featured_products.display_order IS 'Ordre d''affichage du produit dans sa section';
