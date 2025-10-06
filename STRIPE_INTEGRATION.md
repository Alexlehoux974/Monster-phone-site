# Intégration Stripe - Monster Phone Boutique

## Configuration effectuée ✅

### 1. Installation des dépendances
```bash
npm install stripe @stripe/stripe-js
```

### 2. Variables d'environnement (.env.local)
```env
# Stripe (Mode Test)
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=(à configurer via Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

> ⚠️ **Important** : Remplacez les valeurs par vos vraies clés depuis [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)

### 3. Base de données Supabase
Structure mise à jour pour supporter Stripe :
- Table `orders` : colonnes ajoutées pour `stripe_session_id`, `stripe_payment_intent_id`, `billing_address`, `amount_subtotal`, `currency`
- Table `order_items` : colonne `product_metadata` ajoutée
- Index optimisés pour les recherches Stripe

### 4. Routes API créées

#### `/api/create-checkout-session` (POST)
Crée une session Stripe Checkout avec :
- Line items des produits du panier
- Informations client (email, nom, téléphone, adresse)
- Configuration pour La Réunion et France métropolitaine
- Support des codes promo
- Redirection vers page de succès/annulation

#### `/api/webhook` (POST)
Gère les événements Stripe :
- `checkout.session.completed` : Enregistre la commande dans Supabase
- `payment_intent.succeeded` : Met à jour le statut en "paid" et "confirmed"
- `payment_intent.payment_failed` : Met à jour le statut en "failed" et "cancelled"

#### `/api/order-details` (GET)
Récupère les détails d'une commande par `session_id` pour affichage sur la page de succès

### 5. Pages modifiées

#### `/checkout` - Processus de paiement simplifié
- **Étape 1** : Informations de livraison (nom, email, téléphone, adresse)
- **Étape 2** : Confirmation et redirection vers Stripe Checkout
- Formulaire de carte bancaire supprimé (géré par Stripe)
- Message de sécurité Stripe affiché
- Bouton "Procéder au paiement sécurisé" qui redirige vers Stripe

#### `/checkout/success` - Page de confirmation améliorée
- Récupération automatique des détails de commande via API
- Affichage du récapitulatif complet :
  - Numéro de commande
  - Liste des produits commandés avec quantités et prix
  - Total payé
  - Statut du paiement
  - Statut de la commande
  - Date de commande
- Informations sur les prochaines étapes
- Nettoyage automatique du panier après 2 secondes

### 6. Fichiers utilitaires

#### `/src/lib/stripe/client.ts`
Helper pour charger Stripe.js côté client avec la clé publique

## Flux de paiement complet

### Côté utilisateur
1. Utilisateur ajoute des produits au panier
2. Accède à `/checkout`
3. Remplit informations de livraison (Étape 1)
4. Valide et passe à la confirmation (Étape 2)
5. Clique sur "Procéder au paiement sécurisé"
6. **Redirigé vers Stripe Checkout** (page hébergée par Stripe)
7. Entre les informations de carte bancaire sur Stripe
8. Valide le paiement
9. **Redirigé vers `/checkout/success?session_id={id}`**
10. Voit le récapitulatif complet de sa commande

### Côté serveur
1. API `/api/create-checkout-session` crée la session Stripe
2. Stripe traite le paiement
3. Webhook `/api/webhook` reçoit l'événement `checkout.session.completed`
4. Commande enregistrée dans Supabase avec tous les détails
5. Items de commande enregistrés dans `order_items`
6. Statut mis à jour automatiquement selon les événements de paiement

## Configuration à finaliser

### 1. Webhook Stripe
1. Aller sur https://dashboard.stripe.com/test/webhooks
2. Cliquer sur "Add endpoint"
3. Entrer l'URL : `https://votre-domaine.com/api/webhook`
4. Sélectionner les événements :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copier le "Signing secret" et l'ajouter dans `.env.local` comme `STRIPE_WEBHOOK_SECRET`

### 2. Test en mode développement local
Pour tester le webhook localement :
```bash
# Installer Stripe CLI
brew install stripe/stripe-brew/stripe

# Se connecter
stripe login

# Écouter les webhooks
stripe listen --forward-to localhost:3001/api/webhook

# Le CLI affichera le webhook secret à utiliser
```

### 3. Passage en production
1. Remplacer les clés de test par les clés de production dans `.env.local`
2. Mettre à jour `NEXT_PUBLIC_BASE_URL` avec l'URL de production
3. Configurer le webhook sur le dashboard production avec l'URL de production
4. Tester un paiement réel avec une vraie carte

## Sécurité

✅ Clés secrètes stockées dans `.env.local` (non versionné)
✅ Validation des webhooks avec signature Stripe
✅ PCI compliance assurée par Stripe Checkout (pas de traitement de carte côté serveur)
✅ HTTPS requis pour les webhooks en production
✅ Service role key Supabase utilisée côté serveur uniquement

## Cartes de test Stripe

Mode test uniquement :
- **Succès** : `4242 4242 4242 4242`
- **Échec** : `4000 0000 0000 0002`
- **3D Secure** : `4000 0027 6000 3184`
- Date : N'importe quelle date future
- CVC : N'importe quel code à 3 chiffres

## Prochaines étapes recommandées

1. **Email de confirmation** : Intégrer Resend pour envoyer des emails après paiement
2. **Suivi de commande** : Page `/orders/[id]` pour que le client suive sa commande
3. **Gestion des erreurs** : Page `/checkout/canceled` pour les paiements annulés
4. **Webhooks avancés** : Gérer les remboursements, disputes, etc.
5. **Analytique** : Tracker les conversions et abandons de panier
6. **Optimisation** : Ajouter Apple Pay / Google Pay via Stripe

## Documentation Stripe

- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Webhooks](https://stripe.com/docs/webhooks)
- [Testing](https://stripe.com/docs/testing)
- [API Reference](https://stripe.com/docs/api)
