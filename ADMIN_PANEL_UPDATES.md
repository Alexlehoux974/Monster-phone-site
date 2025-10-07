# Mises à jour du Panel Admin - Gestion de Stock

## Nouvelles fonctionnalités

Deux nouvelles colonnes ont été ajoutées au panel admin dans la page de gestion de stock:

### 1. Colonne "Visible" (is_visible)
- **Fonction**: Permet de masquer/afficher un produit dans le catalogue
- **Interface**:
  - Mode lecture: Icône œil (Eye) en vert si visible, œil barré (EyeOff) en gris si masqué
  - Mode édition: Toggle switch rouge pour activer/désactiver la visibilité
- **Comportement**:
  - Par défaut: `true` (visible)
  - Lorsqu'un produit est masqué (`false`), il n'apparaît pas dans le catalogue mais reste dans la base de données
  - La RLS policy a été mise à jour pour filtrer automatiquement les produits non visibles

### 2. Colonne "Promo %" (admin_discount_percent)
- **Fonction**: Ajouter un pourcentage de promotion sur le prix
- **Interface**:
  - Mode lecture: Affiche "-XX%" en rouge et le prix après réduction entre parenthèses
  - Mode édition: Champ numérique (0-100) avec icône pourcentage
- **Comportement**:
  - Plage: 0 à 100%
  - Par défaut: 0% (pas de promotion)
  - Le prix affiché dans l'interface admin montre le calcul automatique du prix après réduction
  - ⚠️ **Important**: Le calcul du prix réduit doit être implémenté côté frontend pour l'affichage public

## Modifications apportées

### 1. Base de données (Migration SQL)
Fichier: `supabase/migrations/004_add_admin_fields.sql`

**Colonnes ajoutées**:
```sql
-- is_visible: Contrôle la visibilité dans le catalogue
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;

-- admin_discount_percent: Pourcentage de réduction admin (0-100)
ALTER TABLE products ADD COLUMN IF NOT EXISTS admin_discount_percent INTEGER DEFAULT 0
  CHECK (admin_discount_percent >= 0 AND admin_discount_percent <= 100);
```

**Index créé**:
```sql
CREATE INDEX IF NOT EXISTS idx_products_is_visible ON products(is_visible) WHERE is_visible = true;
```

**RLS Policy mise à jour**:
```sql
CREATE POLICY "Public read access for active and visible products" ON products
    FOR SELECT USING (status = 'active' AND is_visible = true);
```

### 2. Interface TypeScript

**Interfaces mises à jour**:
- `Product`: Ajout de `is_visible` et `admin_discount_percent`
- `VariantRow`: Ajout de `isVisible` et `adminDiscountPercent`

**États ajoutés**:
- `editingVisible`: État pour l'édition de la visibilité
- `editingDiscount`: État pour l'édition du pourcentage de promotion

### 3. Interface Admin (page.tsx)

**Colonnes du tableau**:
- Ajout de la colonne "Visible" avec toggle switch en mode édition
- Ajout de la colonne "Promo %" avec input numérique en mode édition

**Fonctionnalités**:
- Edition en place avec sauvegarde vers Supabase
- Affichage du prix calculé après réduction
- Validation automatique (0-100% pour le discount)

## Application de la migration

⚠️ **Action requise**: La migration SQL doit être appliquée manuellement

Voir le fichier `APPLY_MIGRATION.md` pour les instructions détaillées.

### Vérification rapide
Après l'application de la migration, vérifiez que les colonnes sont présentes:
```bash
npx tsx check-schema.ts
```

Résultat attendu:
```
✓ is_visible: ✓ EXISTS
✓ admin_discount_percent: ✓ EXISTS
```

## Travail restant

### Frontend public (affichage des prix)
Le calcul automatique du prix avec le pourcentage de réduction admin doit être implémenté dans:
- Cartes produits (listes de produits)
- Pages détail produit
- Panier
- Récapitulatif de commande

**Logique à implémenter**:
```typescript
const finalPrice = product.admin_discount_percent > 0
  ? product.price * (1 - product.admin_discount_percent / 100)
  : product.price;
```

### Adaptateurs Supabase
Mettre à jour `/src/lib/supabase/adapters.ts` pour inclure les nouveaux champs dans les transformations de données.

### Tests
- Tester la création/modification de produits avec les nouveaux champs
- Vérifier que les produits masqués n'apparaissent pas dans le catalogue
- Vérifier que le prix réduit s'affiche correctement sur le site

## Notes importantes

1. **is_visible vs status**:
   - `is_visible` permet de masquer temporairement un produit sans changer son statut
   - `status = 'out-of-stock'` indique une rupture de stock
   - Un produit peut être actif (`status = 'active'`) mais masqué (`is_visible = false`)

2. **Promotions existantes**:
   - Les colonnes `discount` et `promo` existantes dans la base de données ne sont pas affectées
   - `admin_discount_percent` est un nouveau système de promotion contrôlé par l'admin
   - À terme, il faudra harmoniser les systèmes de promotion

3. **Performance**:
   - L'index sur `is_visible` optimise les requêtes de liste de produits
   - La RLS policy filtre automatiquement les produits non visibles côté base de données
