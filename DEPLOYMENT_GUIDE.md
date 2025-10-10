# 🚀 Guide de Déploiement en Production - Monster Phone Boutique

## 📋 Checklist Pré-Déploiement

### 1. ✅ Configuration Stripe Production

#### A. Récupérer les Clés de Production
1. Connectez-vous à [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. **Activez le mode "Live"** en haut à droite (toggle View test data → OFF)
3. Révélez et copiez vos clés:
   - **Secret key** (sk_live_...)
   - **Publishable key** (pk_live_...)

#### B. Configurer le Webhook de Production
1. Allez dans [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Cliquez sur **"Add endpoint"**
3. Configurez:
   - **Endpoint URL**: `https://monster-phone.re/api/webhooks/stripe`
   - **Events to send**: Sélectionnez `checkout.session.completed`
   - **API version**: Latest (2025-09-30.clover)
4. Copiez le **Signing secret** (whsec_...)

#### C. Mettre à Jour les Variables d'Environnement
Créez un fichier `.env.production` à partir de `.env.production.example`:

```bash
cp .env.production.example .env.production
```

Éditez `.env.production` et remplacez:
```env
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_SECRETE_LIVE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE_PUBLIQUE_LIVE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_LIVE
```

### 2. ✅ Vérification de la Base de Données

#### A. Vérifier les Migrations
```bash
# Se connecter à Supabase et vérifier que toutes les migrations sont appliquées
# Les migrations incluent:
# - 001_initial_schema.sql (schéma de base)
# - 002_orders_table.sql (table commandes)
# - 003_order_items_table.sql (table items commandes)
# - 004_stock_management.sql (gestion du stock)
```

#### B. Vérifier les RLS (Row Level Security)
- Les politiques RLS doivent être activées sur toutes les tables
- Vérifier les permissions pour `service_role` et `anon`

### 3. ✅ Configuration Email (Resend)

La clé Resend actuelle (`re_YVULGKPi_2xNMJpwxTvPiXdLD8oixAm7g`) fonctionne en production.

**Vérifications**:
1. Le domaine `monster-phone.re` est vérifié dans Resend
2. Le sender `commandes@monster-phone.re` est configuré
3. Tester l'envoi d'un email de test

### 4. ✅ Build et Déploiement

#### A. Build Local (Test)
```bash
npm run build
```

Vérifiez qu'il n'y a pas d'erreurs TypeScript ou de lint.

#### B. Déploiement Vercel

**Option 1: Déploiement via Interface Vercel**
1. Connectez-vous à [Vercel Dashboard](https://vercel.com)
2. Importez le projet depuis GitHub
3. Ajoutez les variables d'environnement de production
4. Déployez

**Option 2: Déploiement via CLI**
```bash
# Installation de Vercel CLI (si nécessaire)
npm i -g vercel

# Connexion
vercel login

# Déploiement en production
vercel --prod

# Variables d'environnement via CLI
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
```

### 5. ✅ Tests Post-Déploiement

#### A. Test Complet de Paiement (Mode Live)
1. **Attention**: Les paiements seront réels !
2. Utilisez une vraie carte bancaire pour un petit montant (ex: produit à 1€)
3. Vérifiez:
   - ✅ Session Stripe créée
   - ✅ Paiement réussi
   - ✅ Webhook reçu et traité
   - ✅ Commande créée dans Supabase
   - ✅ Stock décrémenté
   - ✅ Email de confirmation envoyé
   - ✅ Affichage de la page de succès

#### B. Vérification du Webhook
1. Allez dans Stripe Dashboard > Webhooks
2. Cliquez sur votre endpoint de production
3. Vérifiez les **Recent deliveries**
4. Status doit être: **Succeeded (200)**

#### C. Vérification de la Base de Données
```sql
-- Vérifier la commande créée
SELECT * FROM orders ORDER BY created_at DESC LIMIT 1;

-- Vérifier les items
SELECT * FROM order_items WHERE order_id = 'ID_DE_LA_COMMANDE';

-- Vérifier le stock (doit être décrémenté)
SELECT * FROM product_variants WHERE product_id = 'ID_DU_PRODUIT';
```

#### D. Vérification Email
- Vérifiez votre boîte email (celle utilisée lors du paiement)
- Vous devez recevoir l'email de confirmation de commande

### 6. ✅ Monitoring et Logs

#### A. Logs Vercel
```bash
# Voir les logs en temps réel
vercel logs https://monster-phone.re --follow
```

#### B. Logs Stripe
- Activez les logs dans Stripe Dashboard
- Surveillez les événements webhook
- Vérifiez les paiements réussis/échoués

#### C. Logs Supabase
- Consultez les logs de la base de données
- Vérifiez les appels RPC pour le stock

## 🔒 Sécurité

### Variables Sensibles
**JAMAIS** commiter les fichiers suivants:
- `.env.production` (contient les clés live)
- `.env.local` (contient les clés de test)

Ces fichiers sont déjà dans `.gitignore`.

### Webhook Stripe
Le webhook vérifie la signature pour garantir l'authenticité:
```typescript
const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
```

## 📊 Tableau de Bord Admin

Accédez au tableau de bord admin à: `https://monster-phone.re/admin/orders`

**Fonctionnalités**:
- ✅ Vue d'ensemble des commandes (statistiques)
- ✅ Filtres par statut (pending, processing, shipped, delivered, cancelled)
- ✅ Recherche par numéro, nom ou email
- ✅ Voir les détails d'une commande (modal)
- ✅ Modifier le statut d'une commande
- ✅ Exporter les commandes en CSV

## 🐛 Troubleshooting

### Webhook Non Reçu
1. Vérifiez l'URL du webhook dans Stripe Dashboard
2. Vérifiez que le secret webhook est correct
3. Consultez les logs Vercel: `vercel logs https://monster-phone.re/api/webhooks/stripe --follow`

### Email Non Envoyé
1. Vérifiez la clé Resend
2. Vérifiez le domaine sender dans Resend Dashboard
3. Consultez les logs de l'API: `vercel logs --follow`

### Stock Non Décrémenté
1. Vérifiez que la fonction `process_order_stock_decrement` existe dans Supabase
2. Vérifiez les permissions `service_role` sur la fonction
3. Consultez les logs de la console pour les erreurs

### Commande Non Créée
1. Vérifiez les logs webhook Stripe (Recent deliveries)
2. Vérifiez les logs Vercel pour l'endpoint `/api/webhooks/stripe`
3. Vérifiez la structure de la table `orders` dans Supabase

## 📞 Support

- **Stripe**: https://support.stripe.com
- **Vercel**: https://vercel.com/support
- **Supabase**: https://supabase.com/support
- **Resend**: https://resend.com/support

---

✅ **Checklist finale avant mise en production**:
- [ ] Clés Stripe Live configurées
- [ ] Webhook Stripe configuré et testé
- [ ] Variables d'environnement Vercel ajoutées
- [ ] Build sans erreurs
- [ ] Test de paiement réel réussi
- [ ] Email de confirmation reçu
- [ ] Stock décrémenté correctement
- [ ] Commande visible dans admin dashboard
- [ ] Monitoring actif (logs)
