# Intégration Email - Monster Phone Boutique

## Configuration Resend ✅

### Variables d'environnement
```env
RESEND_API_KEY=re_YVULGKPi_2xNMJpwxTvPiXdLD8oixAm7g
```

### Installation
```bash
npm install resend
```

## Templates d'emails créés 📧

### 1. Email de confirmation de commande
**Fichier**: `/src/lib/email/templates/order-confirmation.tsx`

**Envoi automatique**: ✅ Lors de l'événement `checkout.session.completed`

**Contenu**:
- Message de remerciement avec emoji 🎉
- Numéro de commande et date
- Récapitulatif complet des articles
- Sous-total et total TTC
- Section "Les prochaines étapes"
- Bouton CTA "Suivre ma commande"
- Design moderne avec gradient violet

**Envoyé depuis**: `Monster Phone Boutique <onboarding@resend.dev>`

---

### 2. Email de notification d'expédition
**Fichier**: `/src/lib/email/templates/shipping-notification.tsx`

**Envoi**: Via API `/api/send-shipping-notification`

**Contenu**:
- Message d'expédition avec emoji 🚚
- Numéro de suivi en grand format
- Bouton "Suivre mon colis" avec lien direct
- Informations transporteur et date de livraison estimée
- Adresse de livraison
- Timeline de progression (5 étapes)
- Conseil pratique sur la réception
- Design moderne avec gradient vert

**Envoyé depuis**: `Monster Phone Boutique <onboarding@resend.dev>`

---

### 3. Email de facture
**Fichier**: `/src/lib/email/templates/invoice.tsx`

**Envoi**: Via API `/api/send-invoice`

**Contenu**:
- En-tête professionnelle avec numéro de facture
- Informations vendeur et client
- Tableau détaillé des articles
- Calculs HT, TVA 20%, TTC
- Informations de paiement
- Mentions légales
- Design professionnel avec gradient bleu

**Envoyé depuis**: `Monster Phone Boutique <onboarding@resend.dev>`

---

## Routes API créées

### `/api/webhook` (POST) - Modifiée ✅
Envoi automatique de l'email de confirmation après paiement réussi.

**Événement**: `checkout.session.completed`

**Workflow**:
1. Enregistrement de la commande dans Supabase
2. Enregistrement des items de commande
3. Récupération des détails pour l'email
4. Envoi de l'email de confirmation
5. Log de confirmation

**Gestion d'erreur**: Ne bloque pas le webhook si l'email échoue

---

### `/api/send-shipping-notification` (POST) - Nouvelle
Envoi manuel de la notification d'expédition.

**Paramètres requis**:
```json
{
  "orderId": "uuid-de-la-commande",
  "trackingNumber": "LA POSTE 1234567890",
  "trackingUrl": "https://tracking-url.com",
  "carrier": "La Poste",
  "estimatedDelivery": "2025-10-15" // optionnel
}
```

**Actions**:
1. Récupération de la commande
2. Mise à jour du statut → `shipped`
3. Ajout des infos de suivi (tracking_number, tracking_url, carrier)
4. Envoi de l'email de notification

---

### `/api/send-invoice` (POST) - Nouvelle
Envoi manuel de la facture.

**Paramètres requis**:
```json
{
  "orderId": "uuid-de-la-commande"
}
```

**Actions**:
1. Récupération de la commande et items
2. Calcul de la TVA (20%)
3. Formatage des données pour la facture
4. Envoi de l'email avec facture

---

## Tests à effectuer 🧪

### Test 1: Email de confirmation automatique
1. Passer une commande test sur `/checkout`
2. Compléter le paiement avec Stripe (carte test: `4242 4242 4242 4242`)
3. Vérifier que l'email est reçu à l'adresse du client
4. Vérifier le contenu (articles, prix, liens)

### Test 2: Notification d'expédition
```bash
curl -X POST http://localhost:3001/api/send-shipping-notification \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "votre-order-id",
    "trackingNumber": "LA POSTE 1234567890",
    "trackingUrl": "https://www.laposte.fr/outils/suivre-vos-envois?code=1234567890",
    "carrier": "La Poste",
    "estimatedDelivery": "2025-10-15"
  }'
```

### Test 3: Facture
```bash
curl -X POST http://localhost:3001/api/send-invoice \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "votre-order-id"
  }'
```

---

## Migration base de données requise

Ajouter les colonnes manquantes à la table `orders`:

```sql
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS tracking_number TEXT,
  ADD COLUMN IF NOT EXISTS tracking_url TEXT,
  ADD COLUMN IF NOT EXISTS carrier TEXT;
```

---

## Prochaines étapes 🚀

### 1. Configuration production
- [ ] Obtenir un domaine vérifié sur Resend (ex: `noreply@monsterphone.re`)
- [ ] Générer une nouvelle clé API de production
- [ ] Mettre à jour les templates avec le bon email "from"
- [ ] Configurer SPF/DKIM pour le domaine

### 2. Améliorations possibles
- [ ] Email de réinitialisation de mot de passe
- [ ] Email de bienvenue pour nouveaux utilisateurs
- [ ] Newsletter pour promotions
- [ ] Email de demande d'avis client
- [ ] Email de relance panier abandonné
- [ ] Notifications admin (nouvelle commande, stock bas)

### 3. Monitoring
- [ ] Dashboard Resend pour suivre les envois
- [ ] Logs des emails envoyés dans Supabase
- [ ] Alertes en cas d'échec d'envoi
- [ ] Tracking des ouvertures et clics

---

## Limites Resend (Plan gratuit)

- **100 emails/jour** maximum
- **Domaine de test** : `onboarding@resend.dev`
- **Domaine personnalisé** : Nécessite vérification DNS

Pour production, passage au plan payant recommandé :
- 50K emails/mois : $20/mois
- Emails illimités : sur demande

---

## Support et documentation

- [Documentation Resend](https://resend.com/docs)
- [Templates React Email](https://react.email)
- [Intégration Next.js](https://resend.com/docs/send-with-nextjs)
- [Vérification de domaine](https://resend.com/docs/dashboard/domains/introduction)
