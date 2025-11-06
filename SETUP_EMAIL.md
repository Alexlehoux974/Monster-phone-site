# Configuration des Emails de Réinitialisation de Mot de Passe

## 📧 Configuration Supabase + Resend

### Étape 1 : Configuration SMTP dans Supabase

1. **Accéder au Dashboard Supabase**
   - URL : https://supabase.com/dashboard/project/nswlznqoadjffpxkagoz
   - Se connecter avec le compte propriétaire du projet

2. **Aller dans Authentication Settings**
   - Menu latéral → **Authentication** → **Settings**
   - Scroll jusqu'à **SMTP Settings**

3. **Configurer Resend comme fournisseur SMTP**
   ```
   Enable Custom SMTP: ✅ Activé

   Sender Details:
   - Sender Email: noreply@monsterphone.re (ou votre domaine vérifié)
   - Sender Name: Monster Phone Boutique

   SMTP Configuration:
   - Host: smtp.resend.com
   - Port Number: 465
   - Minimum Interval: 60 (secondes entre emails)
   - Username: resend
   - Password: re_YVULGKPi_2xNMJpwxTvPiXdLD8oixAm7g
   ```

4. **Tester la configuration**
   - Bouton **Send Test Email** pour vérifier que ça fonctionne
   - L'email devrait arriver dans quelques secondes

### Étape 2 : Vérifier le domaine sur Resend (IMPORTANT)

1. **Accéder à Resend Dashboard**
   - URL : https://resend.com/domains
   - Se connecter avec le compte

2. **Vérifier que le domaine est validé**
   - Le domaine utilisé dans "Sender Email" doit être vérifié
   - Si pas vérifié, ajouter les enregistrements DNS nécessaires

3. **Alternative : Utiliser le domaine de test Resend**
   - Email : `onboarding@resend.dev`
   - Pas besoin de vérification DNS
   - Limité à 100 emails/jour

### Étape 3 : Personnaliser les Templates d'Email (Optionnel)

1. **Dans Supabase Dashboard**
   - **Authentication** → **Email Templates**

2. **Template "Reset Password"**
   - Personnaliser le message
   - Variables disponibles :
     - `{{ .ConfirmationURL }}` : Lien de réinitialisation
     - `{{ .SiteURL }}` : URL de base du site
     - `{{ .Token }}` : Token de réinitialisation

   Exemple de template :
   ```html
   <h2>Réinitialisation de votre mot de passe</h2>
   <p>Bonjour,</p>
   <p>Vous avez demandé à réinitialiser votre mot de passe sur Monster Phone Boutique.</p>
   <p>Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
   <p><a href="{{ .ConfirmationURL }}">Réinitialiser mon mot de passe</a></p>
   <p>Ce lien est valable pendant 1 heure.</p>
   <p>Si vous n'avez pas demandé cette réinitialisation, ignorez simplement cet email.</p>
   <p>Cordialement,<br>L'équipe Monster Phone</p>
   ```

### Étape 4 : Configuration Environnement

Le `.env.local` est déjà configuré avec :
```bash
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
RESEND_API_KEY="re_YVULGKPi_2xNMJpwxTvPiXdLD8oixAm7g"
```

Pour la **production sur Vercel**, ajouter dans les **Environment Variables** :
```bash
NEXT_PUBLIC_SITE_URL="https://votre-domaine.com"
RESEND_API_KEY="re_YVULGKPi_2xNMJpwxTvPiXdLD8oixAm7g"
```

### Étape 5 : Test Complet

1. Aller sur `http://localhost:3000/auth/forgot-password`
2. Entrer l'email : `alexandre@digiqo.fr`
3. Vérifier la boîte mail (peut prendre 1-2 minutes)
4. Cliquer sur le lien de réinitialisation
5. Être redirigé vers `/auth/reset-password` avec le token
6. Créer un nouveau mot de passe

## 🔧 Troubleshooting

### Email non reçu ?

1. **Vérifier les logs Supabase**
   - Dashboard → **Logs** → **Auth Logs**
   - Chercher l'événement de réinitialisation

2. **Vérifier le domaine Resend**
   - Le domaine doit être vérifié ET validé
   - Vérifier les enregistrements DNS : SPF, DKIM, DMARC

3. **Vérifier les spams**
   - L'email peut être dans les spams la première fois

4. **Vérifier la clé API Resend**
   - Tester avec : https://resend.com/docs/send-with-curl
   ```bash
   curl -X POST 'https://api.resend.com/emails' \
     -H 'Authorization: Bearer re_YVULGKPi_2xNMJpwxTvPiXdLD8oixAm7g' \
     -H 'Content-Type: application/json' \
     -d '{
       "from": "onboarding@resend.dev",
       "to": "alexandre@digiqo.fr",
       "subject": "Test Email",
       "html": "<p>Test email</p>"
     }'
   ```

### Email reçu mais lien ne fonctionne pas ?

1. Vérifier que `NEXT_PUBLIC_SITE_URL` pointe vers le bon port/domaine
2. Vérifier que la page `/auth/reset-password` existe et fonctionne
3. Vérifier les logs du serveur Next.js pour erreurs

## 📝 Notes Importantes

- **Limite Resend gratuit** : 3000 emails/mois, 100/jour
- **Token valide** : 1 heure par défaut
- **Rate limiting** : Supabase limite à 1 email toutes les 60 secondes par email
- **Production** : Utiliser un domaine vérifié, pas `onboarding@resend.dev`

## 🚀 Prochaines Étapes

1. ✅ Configuration SMTP Supabase
2. ✅ Vérification domaine Resend
3. ✅ Test email de réinitialisation
4. ⏳ Configuration email de confirmation (signup)
5. ⏳ Configuration email de bienvenue
