# Application de la Migration Admin Fields

## Étapes pour appliquer la migration manuellement

La migration SQL se trouve dans: `supabase/migrations/004_add_admin_fields.sql`

### Option 1: Via Supabase Dashboard (Recommandé)

1. Aller sur https://supabase.com/dashboard/project/nswlznqoadjffpxkagoz
2. Cliquer sur "SQL Editor" dans le menu latéral
3. Cliquer sur "New Query"
4. Copier-coller le contenu du fichier `supabase/migrations/004_add_admin_fields.sql`
5. Cliquer sur "Run" pour exécuter la migration

### Option 2: Via psql

Si vous avez le mot de passe de la base de données PostgreSQL:

```bash
psql -h db.nswlznqoadjffpxkagoz.supabase.co \
     -U postgres \
     -d postgres \
     -f supabase/migrations/004_add_admin_fields.sql
```

### Vérification

Après l'application, vérifiez que les colonnes ont été ajoutées:

```bash
npx tsx check-schema.ts
```

Vous devriez voir:
```
✓ is_visible: ✓ EXISTS
✓ admin_discount_percent: ✓ EXISTS
```

## Colonnes ajoutées

1. **is_visible** (BOOLEAN, default: true)
   - Contrôle la visibilité du produit dans le catalogue
   - Permet de cacher un produit sans le supprimer

2. **admin_discount_percent** (INTEGER, default: 0, range: 0-100)
   - Pourcentage de réduction contrôlé par l'admin
   - Appliqué automatiquement au prix

3. **stock_quantity** (INTEGER, default: 0)
   - Déjà existe dans la base de données
   - Utilisé pour les produits sans variantes
