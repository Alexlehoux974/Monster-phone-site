# 📦 Guide complet du système de gestion des commandes

## 🎯 Vue d'ensemble

Le système de gestion des commandes est maintenant **complètement opérationnel** et connecte :
- ✅ **Site web** : Panier → Checkout → Confirmation
- ✅ **API** : Création de commande → Déduction de stock automatique
- ✅ **Base de données** : Supabase (orders + order_items + mise à jour stock)
- ✅ **Panel Admin** : Visualisation et gestion des commandes

## 🔄 Flux complet de commande

### 1. Le client ajoute des produits au panier
- **Fichier** : `src/contexts/CartContext.tsx`
- **Fonction** : `addToCart()`
- **Logique** :
  - Vérifie le stock disponible (variant OU stockQuantity)
  - Limite la quantité au stock disponible
  - Sauvegarde dans localStorage

### 2. Le client passe commande
- **Fichier** : `src/app/checkout/page.tsx`
- **Fonction** : `handleSubmit()` → `createOrder()`
- **Données envoyées** :
  ```typescript
  {
    customerInfo: {
      name: "Jean Dupont",
      email: "jean@example.com",
      phone: "+33 6 12 34 56 78",
      address: "123 Rue de la Paix, 75001 Paris"
    },
    items: [
      {
        productId: "uuid-product",
        variantId: "uuid-variant", // optionnel
        quantity: 2,
        price: 29.99,
        productName: "POCO F6 Pro",
        variantColor: "Noir"
      }
    ],
    totalAmount: 59.98
  }
  ```

### 3. L'API crée la commande et déduit le stock
- **Fichier** : `src/app/api/orders/create/route.ts`
- **Processus** :
  1. ✅ Validation des données client
  2. ✅ Création de la commande dans `orders`
  3. ✅ Création des articles dans `order_items`
  4. ✅ **Déduction automatique du stock** via `deductStockAfterOrder()`
  5. ✅ Retour de la commande créée

### 4. Mise à jour du stock (automatique)
- **Fichier** : `src/lib/supabase/admin.ts`
- **Fonction** : `deductStockAfterOrder()`
- **Logique** :
  - Pour chaque article :
    - Si `variantId` → Met à jour `product_variants.stock`
    - Sinon → Met à jour `products.stock_quantity`
  - Empêche le stock négatif (minimum 0)
  - Retourne un rapport détaillé

### 5. Confirmation au client
- **Fichier** : `src/app/checkout/success/page.tsx`
- **Affiche** :
  - ✅ Numéro de commande
  - ✅ Résumé de la commande
  - ✅ Informations client
  - ✅ Montant total

### 6. Gestion admin
- **Fichier** : `src/app/admin/orders/page.tsx`
- **Fonctionnalités** :
  - ✅ Liste de toutes les commandes
  - ✅ Statistiques (total, CA, en attente, livrées)
  - ✅ Filtres par statut
  - ✅ Mise à jour du statut de commande
  - ✅ Affichage nombre d'articles

## 📊 Structure de la base de données

### Table `orders`
```sql
CREATE TABLE public.orders (
  id UUID PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_address TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL, -- pending, processing, shipped, delivered, cancelled
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);
```

### Table `order_items`
```sql
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  product_name TEXT NOT NULL,
  variant_color TEXT,
  created_at TIMESTAMPTZ NOT NULL
);
```

## 🧪 Test du système

### Test 1 : Commande simple (produit avec variant)

1. **Aller sur** http://localhost:3002/collections
2. **Ajouter au panier** : POCO F6 Pro - Noir (quantité: 2)
3. **Aller au panier** : Vérifier que les 2 articles sont là
4. **Passer commande** : Remplir le formulaire
5. **Résultat attendu** :
   - ✅ Commande créée dans `orders`
   - ✅ 1 ligne dans `order_items` avec `variant_id` = ID du variant Noir
   - ✅ Stock du variant Noir diminué de 2 dans `product_variants`
   - ✅ Confirmation affichée avec numéro de commande

### Test 2 : Commande mixte (variant + non-variant)

1. **Ajouter** : POCO F6 Pro - Noir (1x)
2. **Ajouter** : Un produit sans variants (1x)
3. **Passer commande**
4. **Résultat attendu** :
   - ✅ 2 lignes dans `order_items`
   - ✅ Stock du variant mis à jour
   - ✅ `stock_quantity` du produit sans variant mis à jour

### Test 3 : Vérification admin

1. **Se connecter** : http://localhost:3002/admin/login
2. **Aller sur** : http://localhost:3002/admin/orders
3. **Vérifier** :
   - ✅ Commandes affichées
   - ✅ Statistiques correctes
   - ✅ Statut modifiable

### Test 4 : Vérification stock

1. **Avant commande** : Noter le stock du produit (Admin > Stock)
2. **Passer une commande** de 2 articles
3. **Après commande** : Vérifier le stock diminué de 2

## 🔍 Requêtes SQL utiles

### Voir toutes les commandes avec détails
```sql
SELECT
  o.id,
  o.customer_name,
  o.customer_email,
  o.total_amount,
  o.status,
  o.created_at,
  COUNT(oi.id) as items_count
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id
ORDER BY o.created_at DESC;
```

### Voir les articles d'une commande
```sql
SELECT
  oi.product_name,
  oi.variant_color,
  oi.quantity,
  oi.unit_price,
  (oi.quantity * oi.unit_price) as total_line
FROM order_items oi
WHERE oi.order_id = 'VOTRE_ORDER_ID';
```

### Vérifier la cohérence stock après commande
```sql
-- Stock des variants
SELECT
  pv.id,
  p.name,
  pv.color,
  pv.stock as current_stock
FROM product_variants pv
JOIN products p ON p.id = pv.product_id
ORDER BY p.name, pv.color;

-- Stock des produits sans variants
SELECT
  id,
  name,
  stock_quantity as current_stock
FROM products
WHERE id NOT IN (SELECT DISTINCT product_id FROM product_variants WHERE product_id IS NOT NULL)
ORDER BY name;
```

### Historique des commandes par produit
```sql
SELECT
  oi.product_name,
  oi.variant_color,
  SUM(oi.quantity) as total_sold,
  COUNT(DISTINCT oi.order_id) as orders_count,
  SUM(oi.quantity * oi.unit_price) as revenue
FROM order_items oi
JOIN orders o ON o.id = oi.order_id
WHERE o.status != 'cancelled'
GROUP BY oi.product_name, oi.variant_color
ORDER BY total_sold DESC;
```

## 📁 Fichiers créés/modifiés

### Nouveaux fichiers
- ✅ `/src/app/api/orders/create/route.ts` - API de création de commande
- ✅ `/src/app/checkout/success/page.tsx` - Page de confirmation
- ✅ `/src/app/admin/orders/page.tsx` - Panel admin des commandes
- ✅ `/supabase/migrations/20250104_create_orders_tables.sql` - Migration SQL
- ✅ `/INSTALLATION_SQL.md` - Guide d'installation SQL
- ✅ `/GUIDE_SYSTEME_COMMANDES.md` - Ce guide

### Fichiers modifiés
- ✅ `/src/contexts/CartContext.tsx` - Ajout de `createOrder()`
- ✅ `/src/app/checkout/page.tsx` - Intégration de `createOrder()`
- ✅ `/src/data/products.ts` - Ajout `stockQuantity` et `id` pour variants
- ✅ `/src/lib/supabase/adapters.ts` - Mapping `stockQuantity` et `variant.id`
- ✅ `/src/components/ProductCard.tsx` - Fix vérification stock
- ✅ `/src/lib/supabase/admin.ts` - Fonction `deductStockAfterOrder()`

## ✅ Checklist de vérification

- [ ] Tables `orders` et `order_items` créées dans Supabase
- [ ] Serveur de développement lancé (npm run dev -- -p 3002)
- [ ] Test : Ajouter produit au panier ✓
- [ ] Test : Passer une commande ✓
- [ ] Test : Vérifier stock déduit ✓
- [ ] Test : Voir commande dans admin ✓
- [ ] Test : Modifier statut commande ✓

## 🎯 Prochaines étapes possibles

1. **Emails** : Envoyer un email de confirmation (via SendGrid, Resend, etc.)
2. **Webhooks** : Notifier d'autres systèmes lors d'une commande
3. **Historique de statut** : Tracer tous les changements de statut
4. **Factures** : Générer des PDF de factures
5. **Tableau de bord** : Graphiques de ventes, produits populaires, etc.
6. **Export** : Exporter les commandes en CSV/Excel
7. **Suivi de livraison** : Intégration avec transporteurs (Chronopost, etc.)

## 🔧 Dépannage

### Erreur : "Table orders does not exist"
→ Exécutez le SQL dans `INSTALLATION_SQL.md`

### Erreur : "Stock not updated"
→ Vérifiez les logs de `deductStockAfterOrder()` dans la console

### Commande créée mais pas visible dans admin
→ Vérifiez l'authentification admin et les policies RLS dans Supabase

### Stock incorrect après commande
→ Requête SQL pour vérifier :
```sql
SELECT pv.id, pv.color, pv.stock
FROM product_variants pv
WHERE pv.id = 'VARIANT_ID';
```

## 📞 Support

En cas de problème :
1. Vérifiez les logs de la console (F12)
2. Vérifiez les logs Supabase (Dashboard > Logs)
3. Vérifiez les policies RLS (Dashboard > Authentication > Policies)
4. Vérifiez les migrations SQL (Dashboard > SQL Editor)
