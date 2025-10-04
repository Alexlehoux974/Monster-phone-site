# Admin Supabase Operations

## 🔐 Problème : Row Level Security (RLS)

Supabase a Row Level Security (RLS) activé pour protéger les données. Cela signifie que :
- Les clés `anon` (publiques) ont des permissions limitées
- Les updates/inserts/deletes peuvent être bloqués côté client
- Le panel admin DOIT utiliser la clé `service_role` pour bypasser RLS

## ✅ Solution : API Routes avec service_role

Toutes les opérations admin passent par des API routes sécurisées qui utilisent `service_role`.

### Architecture

```
Client Admin (navigateur)
    ↓
API Route (/api/admin/*)
    ↓ (utilise service_role)
Supabase (bypass RLS)
```

## 📚 Utilisation

### Option 1 : Hook useAdminSupabase (Recommandé)

```typescript
import { useAdminSupabase } from '@/hooks/useAdminSupabase';

function MyAdminComponent() {
  const { adminUpdate, adminInsert, adminDelete } = useAdminSupabase();

  const updateStock = async () => {
    await adminUpdate(
      'product_variants',
      { stock: 10 },
      [{ column: 'id', value: 'variant-id' }]
    );
  };

  const createProduct = async () => {
    await adminInsert('products', {
      name: 'New Product',
      price: 99.99
    });
  };

  return <button onClick={updateStock}>Update</button>;
}
```

### Option 2 : API Route Générique

```typescript
// POST /api/admin/supabase
const response = await fetch('/api/admin/supabase', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    operation: 'update', // 'insert' | 'delete' | 'upsert'
    table: 'product_variants',
    data: { stock: 10 },
    filters: [{ column: 'id', value: 'variant-id' }]
  })
});
```

### Option 3 : API Route Dédiée (Pour logique complexe)

Créez une route spécifique pour des opérations complexes :

```typescript
// src/app/api/admin/update-stock/route.ts
import { createAdminClient } from '@/lib/supabase/admin-client';

export async function POST(request: NextRequest) {
  const supabase = createAdminClient(); // Bypass RLS

  const { data, error } = await supabase
    .from('product_variants')
    .update({ stock: 5 })
    .eq('id', variantId);

  return NextResponse.json({ data });
}
```

## 🚨 Règles Importantes

### ❌ NE JAMAIS FAIRE (Client-side)

```typescript
// ❌ Ceci sera bloqué par RLS
const supabase = createClient(); // utilise anon key
await supabase
  .from('product_variants')
  .update({ stock: 10 })
  .eq('id', 'xxx');
```

### ✅ TOUJOURS FAIRE (Via API)

```typescript
// ✅ Passe par API avec service_role
const { adminUpdate } = useAdminSupabase();
await adminUpdate(
  'product_variants',
  { stock: 10 },
  [{ column: 'id', value: 'xxx' }]
);
```

## 📝 Real-time Updates

Les mises à jour via `service_role` déclenchent quand même les events Realtime :

```typescript
// Page produits - écoute les changements
useEffect(() => {
  const supabase = createClient(); // anon OK pour lire

  const channel = supabase
    .channel('products-stock')
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'product_variants'
    }, (payload) => {
      // Mise à jour UI en temps réel
      setProducts(prev => updateStock(prev, payload.new));
    })
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);
```

## 🔧 Configuration Requise

### Variables d'environnement (.env.local)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx... # Pour lecture publique
SUPABASE_SERVICE_ROLE_KEY=eyJyyy...     # Pour admin (JAMAIS exposer au client)
```

## 🎯 Cas d'Usage

### 1. Gestion des Stocks (/admin/stock)

```typescript
// Utilise /api/admin/update-stock
const response = await fetch('/api/admin/update-stock', {
  method: 'POST',
  body: JSON.stringify({ variantId, stock })
});
```

### 2. Futurs Produits

Pour tout nouveau produit/variant créé :
- Utiliser `adminInsert()` du hook
- Les variants créés seront automatiquement modifiables
- Le real-time fonctionnera automatiquement

### 3. Autres Sections Admin

Pour pricing, collections, banners :
- Remplacer `supabase.from().update()` par `adminUpdate()`
- Remplacer `supabase.from().insert()` par `adminInsert()`
- Remplacer `supabase.from().delete()` par `adminDelete()`

## 🚀 Migration Checklist

Pour migrer une page admin existante :

1. ✅ Importer le hook : `import { useAdminSupabase } from '@/hooks/useAdminSupabase'`
2. ✅ Remplacer les operations directes :
   - `supabase.from(table).update(data).eq()` → `adminUpdate(table, data, filters)`
   - `supabase.from(table).insert(data)` → `adminInsert(table, data)`
   - `supabase.from(table).delete().eq()` → `adminDelete(table, filters)`
3. ✅ Garder les SELECTs avec le client normal (anon peut lire)
4. ✅ Tester que les updates passent bien

## 📚 Ressources

- Client Admin : `/src/lib/supabase/admin-client.ts`
- Hook Admin : `/src/hooks/useAdminSupabase.ts`
- API Générique : `/src/app/api/admin/supabase/route.ts`
- API Stock : `/src/app/api/admin/update-stock/route.ts`
