# Gestion des Produits Vedettes - Guide Admin

## 📋 Vue d'ensemble

Le système de produits vedettes permet de contrôler facilement quels produits apparaissent sur la page d'accueil, organisés en sections (carrousels).

## 🗂️ Structure des tables Supabase

### Table `featured_sections`
Définit les sections de produits sur la page d'accueil.

**Colonnes importantes :**
- `section_key` : Identifiant unique (ex: `home_smartphones`)
- `title` : Titre affiché (ex: "Nos Smartphones Gaming")
- `category_id` : Catégorie par défaut (utilisée si aucun produit manuel)
- `max_products` : Nombre maximum de produits à afficher
- `display_order` : Ordre d'affichage (1 = premier carrousel)
- `is_active` : Activer/désactiver la section

### Table `featured_products`
Sélection manuelle des produits pour chaque section.

**Colonnes importantes :**
- `section_id` : ID de la section (lien vers `featured_sections`)
- `product_id` : ID du produit à afficher
- `display_order` : Ordre du produit dans sa section

## 🎯 Comment gérer les produits vedettes

### Option 1 : Utiliser la catégorie par défaut (Automatique)

Si aucun produit n'est manuellement sélectionné, la section affiche automatiquement les produits de sa `category_id`.

**Exemple actuel :**
- Section "Nos Smartphones Gaming" → affiche les smartphones (category_id: `80194285-ea90-40ff-8e2a-8edbe3609330`)
- Section "Nos Écouteurs Gaming" → affiche les écouteurs (category_id: `3fa6e04b-2cab-46db-8a85-f6865909d51c`)

### Option 2 : Sélection manuelle (Recommandé)

Pour contrôler précisément quels produits apparaissent :

1. **Identifier les IDs :**
   - ID de la section (table `featured_sections`)
   - ID des produits à afficher (table `products`)

2. **Insérer dans `featured_products` :**

```sql
-- Exemple : Ajouter 3 smartphones spécifiques dans la section smartphones
INSERT INTO featured_products (section_id, product_id, display_order)
VALUES
  ('ID_SECTION_SMARTPHONES', 'ID_PRODUIT_1', 1),
  ('ID_SECTION_SMARTPHONES', 'ID_PRODUIT_2', 2),
  ('ID_SECTION_SMARTPHONES', 'ID_PRODUIT_3', 3);
```

3. **Modifier l'ordre d'affichage :**

```sql
-- Mettre un produit en premier
UPDATE featured_products
SET display_order = 1
WHERE product_id = 'ID_PRODUIT_X' AND section_id = 'ID_SECTION';
```

4. **Retirer un produit :**

```sql
DELETE FROM featured_products
WHERE product_id = 'ID_PRODUIT_X' AND section_id = 'ID_SECTION';
```

## 🔧 Gérer les sections

### Créer une nouvelle section

```sql
INSERT INTO featured_sections (section_key, title, category_id, display_order, max_products)
VALUES ('home_tablettes', 'Nos Tablettes Gaming', 'ID_CATEGORY_TABLETTES', 3, 6);
```

### Modifier une section existante

```sql
-- Changer le titre
UPDATE featured_sections
SET title = 'Nouveau Titre'
WHERE section_key = 'home_smartphones';

-- Changer le nombre max de produits
UPDATE featured_sections
SET max_products = 8
WHERE section_key = 'home_smartphones';

-- Changer l'ordre d'affichage
UPDATE featured_sections
SET display_order = 1
WHERE section_key = 'home_ecouteurs';
```

### Désactiver une section

```sql
UPDATE featured_sections
SET is_active = false
WHERE section_key = 'home_tablettes';
```

## 📊 Requêtes utiles

### Voir toutes les sections actives

```sql
SELECT section_key, title, display_order, max_products, is_active
FROM featured_sections
WHERE is_active = true
ORDER BY display_order;
```

### Voir les produits d'une section

```sql
SELECT
  fs.title AS section_title,
  p.name AS product_name,
  fp.display_order,
  p.status
FROM featured_sections fs
LEFT JOIN featured_products fp ON fs.id = fp.section_id
LEFT JOIN products p ON fp.product_id = p.id
WHERE fs.section_key = 'home_smartphones'
ORDER BY fp.display_order;
```

### Trouver les IDs nécessaires

```sql
-- ID d'une section
SELECT id, section_key, title FROM featured_sections WHERE section_key = 'home_smartphones';

-- ID d'un produit par nom
SELECT id, name, url_slug FROM products WHERE name ILIKE '%HONOR%';

-- ID d'une catégorie
SELECT id, name, slug FROM categories WHERE name ILIKE '%smartphone%';
```

## 🚀 Interface Admin (À venir)

### Fonctionnalités prévues

1. **Dashboard des sections :**
   - Liste de toutes les sections
   - Boutons pour activer/désactiver
   - Drag & drop pour réorganiser l'ordre

2. **Gestion des produits :**
   - Recherche de produits
   - Ajout par glisser-déposer
   - Réorganisation visuelle
   - Prévisualisation en direct

3. **Interface sur `monsterphone.re/admin` :**
   - Authentification sécurisée
   - Interface graphique intuitive
   - Changements instantanés

## 💡 Cas d'usage courants

### Mettre en avant un nouveau produit

```sql
-- 1. Trouver l'ID du produit
SELECT id, name FROM products WHERE name = 'HONOR X9c';

-- 2. L'ajouter en première position
INSERT INTO featured_products (section_id, product_id, display_order)
VALUES ('ID_SECTION', 'ID_PRODUIT', 1)
ON CONFLICT (section_id, product_id) DO UPDATE SET display_order = 1;

-- 3. Décaler les autres produits
UPDATE featured_products
SET display_order = display_order + 1
WHERE section_id = 'ID_SECTION' AND product_id != 'ID_PRODUIT';
```

### Promouvoir des produits en solde

```sql
-- Créer une section spéciale "Promotions"
INSERT INTO featured_sections (section_key, title, display_order, max_products)
VALUES ('home_promotions', '🔥 Promotions du moment', 1, 6);

-- Ajouter les produits en promotion
INSERT INTO featured_products (section_id, product_id, display_order)
SELECT
  (SELECT id FROM featured_sections WHERE section_key = 'home_promotions'),
  id,
  ROW_NUMBER() OVER (ORDER BY admin_discount_percent DESC)
FROM products
WHERE status = 'active' AND admin_discount_percent > 10
LIMIT 6;
```

### Créer une section par marque

```sql
-- Section HONOR
INSERT INTO featured_sections (section_key, title, display_order, max_products)
VALUES ('home_honor', 'Nos Produits HONOR', 3, 6);

-- Ajouter les meilleurs produits HONOR
INSERT INTO featured_products (section_id, product_id, display_order)
SELECT
  (SELECT id FROM featured_sections WHERE section_key = 'home_honor'),
  p.id,
  ROW_NUMBER() OVER (ORDER BY p.total_sales DESC)
FROM products p
JOIN brands b ON p.brand_id = b.id
WHERE p.status = 'active' AND b.name = 'HONOR'
LIMIT 6;
```

## 🔒 Sécurité

- Les tables utilisent des UUIDs pour éviter les attaques par énumération
- Les relations en cascade assurent l'intégrité référentielle
- Les index optimisent les performances
- L'interface admin nécessitera une authentification

## 📝 Notes techniques

### Migration

Le fichier SQL se trouve dans `/migrations/create_featured_sections.sql`.

Pour l'appliquer :
```bash
# Via psql
PGPASSWORD="$PASSWORD" psql -h db.nswlznqoadjffpxkagoz.supabase.co -p 5432 -U postgres -d postgres -f migrations/create_featured_sections.sql

# Ou via l'interface Supabase SQL Editor
```

### API

Les fonctions suivantes sont disponibles dans `src/lib/supabase/api-rest.ts` :

- `getFeaturedProductsBySection(sectionKey)` : Récupère les produits d'une section
- `getAllFeaturedSections()` : Récupère toutes les sections actives avec leurs produits

### Intégration dans page.tsx

```typescript
import { getFeaturedProductsBySection } from '@/lib/supabase/api-rest';

// Récupérer une section spécifique
const smartphonesSection = await getFeaturedProductsBySection('home_smartphones');

// Ou récupérer toutes les sections
const allSections = await getAllFeaturedSections();
```

## 📞 Support

Pour toute question ou assistance, contacte ton développeur ou référe-toi à ce guide.
