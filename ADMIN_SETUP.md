# Guide de Configuration du Panel Admin

## 🚀 Étape 1 : Appliquer la Migration SQL

1. **Ouvrir Supabase Dashboard**
   - Aller sur https://supabase.com/dashboard
   - Sélectionner le projet Monster Phone
   - Aller dans **SQL Editor** (menu de gauche)

2. **Exécuter la Migration**
   - Cliquer sur **New Query**
   - Copier tout le contenu du fichier `supabase/migrations/003_admin_setup.sql`
   - Coller dans l'éditeur SQL
   - Cliquer sur **Run** pour exécuter

3. **Vérifier la Création des Tables**
   - Aller dans **Table Editor**
   - Vous devriez voir les nouvelles tables :
     - `admin_users`
     - `product_stock_history`
     - `promo_banners`
     - `collection_products`

## 🔐 Étape 2 : Créer le Premier Administrateur

1. **Modifier l'Email Admin (Optionnel)**
   - Dans la migration SQL, ligne 259, remplacer `admin@monsterphone.re` par votre email
   - Ou garder cet email pour les tests

2. **Créer le Compte dans Supabase Auth**
   - Aller dans **Authentication** > **Users** (menu Supabase)
   - Cliquer sur **Add User** > **Create new user**
   - Email : `admin@monsterphone.re` (ou votre email)
   - Password : Choisir un mot de passe sécurisé (minimum 8 caractères)
   - Cliquer sur **Create User**

3. **Vérifier l'Entrée Admin**
   - Aller dans **Table Editor** > `admin_users`
   - Vérifier que l'entrée existe avec :
     - Email : votre email
     - Role : `super_admin`
     - Is Active : `true`

## 🎯 Étape 3 : Tester la Connexion Admin

1. **Accéder à la Page de Login**
   - URL : http://localhost:3006/admin/login
   - Ou via production : https://[votre-domaine]/admin/login

2. **Se Connecter**
   - Email : `admin@monsterphone.re` (ou votre email)
   - Mot de passe : celui créé dans Supabase Auth
   - Cliquer sur **Se connecter**

3. **Vérifier l'Accès au Dashboard**
   - Si connexion réussie → Redirection vers `/admin` (dashboard)
   - Si erreur → Vérifier que l'email existe dans `admin_users` ET dans Supabase Auth

## 📊 Étape 4 : Fonctionnalités Disponibles

Une fois connecté, vous aurez accès à :

### ✅ Déjà Implémenté
- ✅ **Dashboard** : Vue d'ensemble avec statistiques
  - Produits total, actifs, en rupture
  - Collections et bannières
  - Santé du stock
  - Actions rapides

- ✅ **Authentification** : Connexion sécurisée
- ✅ **Navigation** : Sidebar avec menu admin
- ✅ **Protection** : Routes protégées par middleware

### 🔄 En Cours de Développement
- 🔄 **Gestion Stock** : Mise à jour des quantités (prochaine étape)
- 🔄 **Prix & Promotions** : Gestion des tarifs
- 🔄 **Collections** : Ajout/retrait de produits
- 🔄 **Bannières** : Gestion des annonces

## 🔧 Configuration des Variables d'Environnement

Le fichier `.env.local` doit contenir :

```env
# Supabase - Déjà configuré
NEXT_PUBLIC_SUPABASE_URL=https://nswlznqoadjffpxkagoz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# Pour les migrations (optionnel)
SUPABASE_SERVICE_ROLE_KEY=[votre-service-role-key]
```

Pour obtenir le Service Role Key (optionnel, pour migrations automatiques) :
1. Supabase Dashboard > Settings > API
2. Copier "service_role secret" (⚠️ NE JAMAIS commit cette clé)
3. Ajouter dans `.env.local`

## 🛡️ Sécurité

### Politiques de Sécurité Implémentées

1. **Row Level Security (RLS)** activée sur toutes les tables
2. **Middleware Next.js** protège toutes les routes `/admin/*`
3. **Vérification double** : Auth Supabase + table `admin_users`
4. **Historique** : Toutes les modifications de stock sont tracées
5. **Rôles** : `super_admin`, `admin`, `editor` avec permissions différenciées

### Gestion des Rôles

- **super_admin** : Tous les droits + gestion des admins
- **admin** : Gestion produits, prix, collections, bannières
- **editor** : Modification basique (à configurer selon besoins)

## 🔄 Sync en Temps Réel

La prochaine étape implémentera Supabase Realtime pour :
- Mise à jour instantanée du stock sur le site
- Synchronisation automatique des prix
- Changements de bannières en direct
- Modifications de collections en temps réel

## 📝 Notes Importantes

1. **Premier Super Admin** : Un seul super_admin créé automatiquement via migration
2. **Ajout d'Admins** : Les super_admins peuvent ajouter d'autres admins via le dashboard
3. **Bannière par Défaut** : Une bannière de livraison est créée automatiquement
4. **Historique Stock** : Chaque modification de stock est enregistrée avec raison et admin

## 🆘 Dépannage

### Erreur "Cannot resolve '@supabase/ssr'"
```bash
npm install @supabase/ssr
npm run dev  # Redémarrer le serveur
```

### Erreur de Connexion
1. Vérifier que l'email existe dans Supabase Auth
2. Vérifier que l'email existe dans `admin_users` avec `is_active = true`
3. Vérifier que le mot de passe est correct

### Migration SQL Échoue
1. Vérifier que les tables `products` et `collections` existent
2. Exécuter les migrations dans l'ordre (001, 002, puis 003)
3. Regarder les erreurs spécifiques dans Supabase SQL Editor

### Redirection Infinie
1. Vérifier la session dans les DevTools (Application > Cookies)
2. Vider le cache et les cookies
3. Se reconnecter

## 📞 Support

Pour toute question ou problème :
1. Vérifier les logs dans le terminal Next.js
2. Vérifier les logs dans la console du navigateur
3. Vérifier les logs dans Supabase Dashboard > Logs
