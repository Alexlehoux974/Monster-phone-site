# Intégration du système de mise à jour du stock après commande

## Vue d'ensemble

Le système de gestion du stock a été mis à jour pour assurer une cohérence parfaite entre Supabase (base de données), le site web (frontend) et le panel admin.

## Architecture de gestion du stock

### 1. Base de données Supabase (Source de vérité)

**Produits AVEC variants** (19 produits, 39 variants):
- Stock stocké dans: `product_variants.stock`
- Chaque variant a son propre stock indépendant
- Exemple: Samsung Galaxy S24 avec 3 couleurs (Noir: 10 unités, Bleu: 5 unités, Blanc: 0 unités)

**Produits SANS variants** (60 produits):
- Stock stocké dans: `products.stock_quantity`
- Stock direct au niveau du produit
- Exemple: Câble USB-C (25 unités disponibles)

### 2. Panel Admin (Affichage hybride)

Le panel admin affiche **99 lignes** au total:
- 39 lignes pour les variants (produits avec variants)
- 60 lignes pour les produits sans variants
- Logique dans: `/app/admin/stock/page.tsx:131-161`

### 3. Site Web (Affichage client)

**ProductCard.tsx** vérifie le stock correctement:
```typescript
const isInStock = selectedVariant
  ? selectedVariant.stock > 0  // Produits avec variants
  : (product.stockQuantity !== undefined ? product.stockQuantity > 0 : true); // Produits sans variants
```

**CartContext** gère les limites de stock:
- Vérifie le stock disponible avant ajout au panier
- Empêche d'ajouter plus que le stock disponible
- Support complet pour variants ET produits sans variants

## Mise à jour du stock après commande

### Fonction principale: `deductStockAfterOrder()`

**Localisation**: `/lib/supabase/admin.ts:198-273`

**Paramètres**:
```typescript
{
  productId: string;     // ID du produit dans Supabase
  variantId?: string;    // ID du variant (si produit avec variants)
  quantity: number;      // Quantité commandée
}[]
```

**Comportement**:
- Si `variantId` est fourni → met à jour `product_variants.stock`
- Si `variantId` est absent → met à jour `products.stock_quantity`
- Retourne un rapport détaillé pour chaque article traité

### Exemple d'intégration dans une page checkout

```typescript
'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { deductStockAfterOrder } from '@/lib/supabase/admin';

export default function CheckoutPage() {
  const { items, prepareOrderItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmOrder = async () => {
    setIsProcessing(true);

    try {
      // 1. Traiter le paiement (Stripe, PayPal, etc.)
      const paymentResult = await processPayment({
        amount: getCartTotal(),
        // ... autres données de paiement
      });

      if (!paymentResult.success) {
        throw new Error('Échec du paiement');
      }

      // 2. Préparer les données pour la mise à jour du stock
      const orderItems = prepareOrderItems();

      console.log('📦 Articles à traiter:', orderItems);
      // Exemple de sortie:
      // [
      //   { productId: "uuid-123", variantId: "uuid-variant-1", quantity: 2 },
      //   { productId: "uuid-456", variantId: undefined, quantity: 1 }
      // ]

      // 3. Déduire le stock dans Supabase
      const stockUpdateResult = await deductStockAfterOrder(orderItems);

      if (!stockUpdateResult.success) {
        console.error('❌ Échec de mise à jour du stock:', stockUpdateResult.results);
        // Décider si on annule la commande ou on continue avec alerte
      }

      console.log('✅ Stock mis à jour avec succès:', stockUpdateResult.results);

      // 4. Enregistrer la commande dans la base
      await saveOrder({
        items: orderItems,
        paymentId: paymentResult.id,
        total: getCartTotal(),
        // ... autres données
      });

      // 5. Vider le panier
      clearCart();

      // 6. Rediriger vers page de confirmation
      router.push('/order-confirmation');

    } catch (error) {
      console.error('Erreur lors de la validation de la commande:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {/* Interface de checkout */}
      <button
        onClick={handleConfirmOrder}
        disabled={isProcessing || items.length === 0}
      >
        {isProcessing ? 'Traitement...' : 'Confirmer la commande'}
      </button>
    </div>
  );
}
```

### Gestion des erreurs

La fonction `deductStockAfterOrder()` retourne un rapport détaillé:

```typescript
{
  success: boolean,  // true si TOUS les articles ont été traités
  results: [
    {
      productId: "uuid-123",
      variantId: "uuid-variant-1",
      success: true,
      oldStock: 10,
      newStock: 8
    },
    {
      productId: "uuid-456",
      success: false,
      error: { ... }  // Détails de l'erreur
    }
  ]
}
```

**Recommandations**:
1. Toujours vérifier `stockUpdateResult.success`
2. Logger les échecs pour investigation
3. Décider de la stratégie en cas d'échec partiel:
   - Annuler toute la commande (plus sûr)
   - Continuer avec alerte et traitement manuel (plus flexible)

## Synchronisation automatique

### Lors d'une commande validée

1. **Frontend** → Ajoute produits au panier avec vérification du stock
2. **Checkout** → Appelle `deductStockAfterOrder()` après paiement validé
3. **Supabase** → Stock mis à jour dans `product_variants` OU `products`
4. **Admin Panel** → Affiche le nouveau stock automatiquement (requête en temps réel)
5. **Site Web** → Prochaine visite affiche le stock mis à jour (ISR 60s)

### Invalidation du cache

Le site utilise ISR (Incremental Static Regeneration) avec `revalidate: 60`:
- Les pages produits se régénèrent toutes les 60 secondes
- Stock mis à jour visible maximum 1 minute après commande
- Pour invalidation immédiate: utiliser `revalidatePath()` dans l'API route

## Structure des fichiers modifiés

```
/src
├── data/products.ts
│   └── Interface Product: ajout de stockQuantity
│   └── Interface ProductVariant: ajout de id
│
├── lib/supabase/
│   ├── adapters.ts
│   │   └── supabaseProductToLegacy(): copie stock_quantity et variant.id
│   └── admin.ts
│       └── deductStockAfterOrder(): nouvelle fonction de mise à jour
│
├── contexts/CartContext.tsx
│   ├── Vérification stock avec stockQuantity
│   └── prepareOrderItems(): prépare données pour deductStockAfterOrder()
│
└── components/ProductCard.tsx
    └── isInStock: vérifie stock pour variants ET produits directs
```

## Tests recommandés

### Test 1: Produit avec variant
```typescript
const orderItems = [
  {
    productId: "samsung-s24-uuid",
    variantId: "variant-noir-uuid",
    quantity: 2
  }
];

const result = await deductStockAfterOrder(orderItems);
// Vérifier: product_variants.stock réduit de 2 pour le variant noir
```

### Test 2: Produit sans variant
```typescript
const orderItems = [
  {
    productId: "cable-usb-c-uuid",
    quantity: 5
  }
];

const result = await deductStockAfterOrder(orderItems);
// Vérifier: products.stock_quantity réduit de 5
```

### Test 3: Commande mixte
```typescript
const orderItems = [
  { productId: "samsung-s24-uuid", variantId: "variant-noir-uuid", quantity: 1 },
  { productId: "cable-usb-c-uuid", quantity: 2 },
  { productId: "ecouteurs-uuid", variantId: "variant-blanc-uuid", quantity: 1 }
];

const result = await deductStockAfterOrder(orderItems);
// Vérifier: tous les stocks mis à jour correctement
```

## Prochaines étapes (optionnel)

1. **Historique des mouvements de stock**:
   - Créer table `stock_movements` avec triggers
   - Tracer chaque modification (commande, retour, ajustement manuel)

2. **Alertes de stock faible**:
   - Notifier admin si stock < seuil
   - Trigger automatique dans Supabase

3. **Gestion des retours**:
   - Créer fonction `increaseStockAfterReturn()`
   - Inverse de `deductStockAfterOrder()`

4. **Synchronisation en temps réel**:
   - Utiliser Supabase Realtime pour updates instantanées
   - Mettre à jour stock dans admin panel sans refresh

## Support

Pour toute question sur l'intégration:
1. Consulter ce fichier
2. Vérifier les logs console (préfixes ✅ et ❌)
3. Inspecter les retours de `deductStockAfterOrder()`
