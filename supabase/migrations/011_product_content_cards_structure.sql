-- Migration 011: Nouvelle structure d'encarts/cartes pour fiches produit
-- Cette migration modifie la table product_content_sections pour supporter une structure moderne avec encarts

-- Ajouter de nouveaux types de sections pour la structure d'encarts
ALTER TABLE product_content_sections
DROP CONSTRAINT IF EXISTS product_content_sections_section_type_check;

ALTER TABLE product_content_sections
ADD CONSTRAINT product_content_sections_section_type_check
CHECK (section_type IN (
    'image_gallery',      -- Galerie d'images horizontale (4 images)
    'description_card',   -- Encart description avec image
    'specs_grid',         -- Grid de caractéristiques techniques (cartes 4 colonnes)
    'features_list',      -- Liste de points forts avec image
    'engagement_card',    -- Encart "Pourquoi choisir" avec CTA
    'custom'              -- Type custom pour flexibilité future
));

-- Ajouter de nouveaux layout variants pour les encarts
ALTER TABLE product_content_sections
DROP CONSTRAINT IF EXISTS product_content_sections_layout_variant_check;

ALTER TABLE product_content_sections
ADD CONSTRAINT product_content_sections_layout_variant_check
CHECK (layout_variant IN (
    'image-left-text-right',   -- Image à gauche, texte à droite
    'text-left-image-right',   -- Texte à gauche, image à droite
    'full-width',              -- Pleine largeur (specs grid)
    'horizontal-gallery',      -- Galerie horizontale défilante
    'grid-2-cols',             -- Grid 2 colonnes
    'grid-3-cols',             -- Grid 3 colonnes
    'grid-4-cols'              -- Grid 4 colonnes (specs)
));

-- Ajouter un champ pour les métadonnées JSON (specs, features, etc.)
ALTER TABLE product_content_sections
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Index pour les recherches par metadata
CREATE INDEX IF NOT EXISTS idx_product_content_sections_metadata
ON product_content_sections USING GIN (metadata);

-- Commentaires pour documentation
COMMENT ON COLUMN product_content_sections.section_type IS 'Type de section: image_gallery, description_card, specs_grid, features_list, engagement_card, custom';
COMMENT ON COLUMN product_content_sections.layout_variant IS 'Variante de mise en page pour la section';
COMMENT ON COLUMN product_content_sections.metadata IS 'Métadonnées JSON pour stocker specs techniques, features structurées, etc.';

-- Exemple de structure metadata pour specs_grid:
-- {
--   "specs": [
--     {"icon": "📱", "label": "ÉCRAN", "value": "QQVGA 1,8 pouces", "details": "Couleur"},
--     {"icon": "📡", "label": "RÉSEAU", "value": "4G LTE", "details": "Double SIM"},
--     {"icon": "🔋", "label": "BATTERIE", "value": "1020 mAh", "details": "18 jours autonomie"}
--   ]
-- }

-- Exemple de structure metadata pour features_list:
-- {
--   "features": [
--     {"icon": "✓", "text": "Batterie exceptionnelle - plusieurs jours d'utilisation"},
--     {"icon": "✓", "text": "Design robuste et durable - résistant aux chocs"},
--     {"icon": "✓", "text": "Interface simple et intuitive - facile à prendre en main"}
--   ]
-- }
