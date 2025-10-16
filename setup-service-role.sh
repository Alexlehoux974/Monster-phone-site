#!/bin/bash

# Script pour configurer la SUPABASE_SERVICE_ROLE_KEY sur Vercel
# Usage: ./setup-service-role.sh <service_role_key>

if [ -z "$1" ]; then
  echo "❌ Erreur: Service role key manquante"
  echo ""
  echo "📋 Instructions:"
  echo "1. Allez sur https://supabase.com/dashboard/project/nswlznqoadjffpxkagoz/settings/api"
  echo "2. Copiez la clé 'service_role' (section 'Project API keys')"
  echo "3. Lancez: ./setup-service-role.sh 'VOTRE_CLE_ICI'"
  echo ""
  exit 1
fi

SERVICE_ROLE_KEY="$1"
VERCEL_TOKEN="HQnWfXplyYLKpVB2AUY23y1B"

echo "🔧 Configuration de SUPABASE_SERVICE_ROLE_KEY sur Vercel..."
echo ""

# Supprimer l'ancienne variable si elle existe (pour éviter erreur)
echo "🗑️  Suppression de l'ancienne variable (si existante)..."
vercel env rm SUPABASE_SERVICE_ROLE_KEY production --token "$VERCEL_TOKEN" --yes 2>/dev/null

# Ajouter la nouvelle variable
echo "✅ Ajout de la nouvelle variable..."
echo "$SERVICE_ROLE_KEY" | vercel env add SUPABASE_SERVICE_ROLE_KEY production --token "$VERCEL_TOKEN"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Variable configurée avec succès !"
  echo ""
  echo "🚀 Déploiement en cours..."
  vercel --prod --yes --token "$VERCEL_TOKEN"
  echo ""
  echo "✅ Déploiement terminé ! L'admin panel fonctionne maintenant."
else
  echo ""
  echo "❌ Erreur lors de la configuration"
  exit 1
fi
