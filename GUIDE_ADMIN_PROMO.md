# Guide d'Utilisation - Promotions et Visibilité Admin

## 🎉 Nouvelles Fonctionnalités

Le panel admin du Monster Phone Boutique permet maintenant de :
1. **Masquer/afficher des produits** du catalogue sans les supprimer
2. **Appliquer des réductions** automatiquement sur les prix

## 📍 Accès au Panel Admin

URL : `http://localhost:3001/admin/stock`

## 🛠️ Comment Utiliser

### 1. Masquer/Afficher un Produit

**Objectif** : Retirer temporairement un produit du catalogue sans perdre ses données

**Étapes** :
1. Cliquez sur le bouton **Modifier** (icône crayon) du produit
2. Utilisez le **toggle Visible** pour activer/désactiver la visibilité
3. Cliquez sur **Sauvegarder** (icône disquette)

**Résultat** :
- ✅ **Visible activé** (Eye 👁️) : Le produit apparaît sur le site
- ❌ **Visible désactivé** (EyeOff 👁️‍🗨️) : Le produit est masqué du catalogue

### 2. Appliquer une Promotion

**Objectif** : Réduire automatiquement le prix d'un produit

**Étapes** :
1. Cliquez sur le bouton **Modifier** (icône crayon) du produit
2. Dans la colonne **Promo %**, entrez un pourcentage entre **0 et 100**
3. Cliquez sur **Sauvegarder** (icône disquette)

**Exemples de réductions** :
- **10%** : Black Friday / Ventes flash
- **20%** : Promotion standard
- **25%** : Soldes
- **50%** : Liquidation / Fin de série

**Résultat** :
- Le prix est automatiquement réduit sur **tout le site**
- Un **badge rouge** affiche le pourcentage de réduction
- Le **prix original** est affiché barré
- Le **prix réduit** s'affiche en grand en bleu

## 💰 Exemple de Calcul Automatique

**Produit** : Câble Tiger Power Lite 6 en 1
- Prix original : **29,99€**
- Réduction admin : **20%**
- Prix final affiché : **23,99€**
- Économie : **6,00€**

### Ce qui s'affiche sur le site :
```
🏷️ Badge: -20%
💰 Prix principal: 23,99€ (en bleu, gros)
💸 Prix barré: 29,99€ (en gris, petit)
```

## 📊 Colonnes du Panel Admin

| Colonne | Description | Modification |
|---------|-------------|--------------|
| **Produit** | Nom du produit | ❌ Lecture seule |
| **SKU** | Code produit | ❌ Lecture seule |
| **Stock** | Quantité disponible | ✅ Éditable |
| **Statut** | En stock / Rupture / Stock faible | 🔄 Auto |
| **Prix** | Prix de vente | ✅ Éditable |
| **Visible** | Visible sur le site | ✅ Toggle |
| **Promo %** | Réduction automatique | ✅ 0-100% |
| **Actions** | Modifier / Sauvegarder | 🔧 Boutons |

## 🔄 Mises à Jour en Temps Réel

Les modifications sont appliquées **immédiatement** :
- ✅ Base de données Supabase mise à jour
- ✅ Cache du site invalidé automatiquement
- ✅ Prix recalculés automatiquement
- ✅ Badges de réduction mis à jour

## 🎯 Priorités des Réductions

Si un produit a **plusieurs réductions** :
1. **Réduction admin** (colonne Promo %) = **PRIORITÉ MAXIMALE**
2. Réduction Airtable (discount_percentage) = secondaire

La réduction admin **écrase** toujours les autres réductions.

## 🧪 Tests Effectués

✅ Migration SQL appliquée avec succès
✅ Colonnes `is_visible` et `admin_discount_percent` créées
✅ Panel admin fonctionnel (toggle + input)
✅ Calculs de prix corrects en base de données
✅ Adapter Supabase → Product converti correctement
✅ ProductCard affiche les prix réduits
✅ ProductDetail affiche les prix réduits
✅ Badges de réduction affichés correctement
✅ Mises à jour temps réel fonctionnelles

## 📝 Notes Techniques

### Structure Base de Données
```sql
ALTER TABLE products
ADD COLUMN is_visible BOOLEAN DEFAULT true;

ALTER TABLE products
ADD COLUMN admin_discount_percent INTEGER DEFAULT 0
  CHECK (admin_discount_percent >= 0 AND admin_discount_percent <= 100);
```

### Calcul du Prix Final
```typescript
const finalPrice = hasAdminDiscount
  ? product.price * (1 - product.adminDiscountPercent! / 100)
  : product.price;
```

### API de Mise à Jour
```typescript
// Endpoint: POST /api/admin/supabase
{
  operation: 'update',
  table: 'products',
  data: {
    is_visible: true,
    admin_discount_percent: 20
  }
}
```

## 🚀 Scénarios d'Usage

### Scénario 1 : Vente Flash
1. Appliquer **-30%** sur une sélection de produits
2. Laisser actif pendant 24h
3. Remettre à **0%** après la vente

### Scénario 2 : Produit Épuisé
1. Désactiver la **visibilité** (toggle Visible = OFF)
2. Le produit reste en base mais n'apparaît plus sur le site
3. Réactiver quand le stock est à nouveau disponible

### Scénario 3 : Liquidation
1. Appliquer **-50%** sur les produits à écouler
2. Surveiller le stock
3. Désactiver la visibilité quand stock = 0

### Scénario 4 : Promotion Saisonnière
1. Black Friday : **-25%** sur toute une catégorie
2. Soldes d'été : **-20%** sur accessoires
3. Fin d'année : **-15%** sur câbles

## 📱 Support

Pour tout problème :
1. Vérifier que la migration SQL est bien appliquée
2. Vérifier les colonnes avec : `npx tsx check-schema.ts`
3. Tester avec : `npx tsx test-admin-discount.ts`
4. Tester l'affichage : `npx tsx test-frontend-display.ts`

## ✅ Checklist de Vérification

- [x] Migration SQL appliquée
- [x] Colonnes `is_visible` et `admin_discount_percent` présentes
- [x] Panel admin affiche les nouvelles colonnes
- [x] Toggle Visible fonctionne
- [x] Input Promo % fonctionne (0-100)
- [x] Sauvegarde met à jour Supabase
- [x] Prix calculés correctement
- [x] Badges de réduction affichés
- [x] Prix barrés et prix réduits visibles
- [x] Cache invalidé automatiquement

🎉 **Tout est prêt à être utilisé en production !**
