#!/bin/bash

echo "🔍 Récupération des variables Supabase depuis Vercel production..."

# Récupérer les variables d'environnement depuis Vercel production
SUPABASE_URL=$(VERCEL_TOKEN=HQnWfXplyYLKpVB2AUY23y1B vercel env ls --token HQnWfXplyYLKpVB2AUY23y1B | grep "NEXT_PUBLIC_SUPABASE_URL" | grep "Production" | awk '{print $2}')
SERVICE_ROLE_KEY=$(VERCEL_TOKEN=HQnWfXplyYLKpVB2AUY23y1B vercel env ls --token HQnWfXplyYLKpVB2AUY23y1B | grep "SUPABASE_SERVICE_ROLE_KEY" | grep "Production" | awk '{print $2}')

echo "📋 NEXT_PUBLIC_SUPABASE_URL: $SUPABASE_URL"
echo "📋 SUPABASE_SERVICE_ROLE_KEY: ${SERVICE_ROLE_KEY:0:20}..."

# Créer un fichier .env temporaire pour le script Node
cat > .env.temp << EOF
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=$SERVICE_ROLE_KEY
EOF

# Lancer le script Node avec ces variables
node -e "
require('dotenv').config({ path: '.env.temp' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Variables manquantes!');
  console.log('URL:', supabaseUrl ? 'OK' : 'MANQUANT');
  console.log('KEY:', serviceRoleKey ? 'OK' : 'MANQUANT');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

(async () => {
  console.log('\n🔍 Vérification table admin_users...\n');

  // 1. Tous les admins
  const { data: allAdmins, error: allError } = await supabase
    .from('admin_users')
    .select('*');

  if (allError) {
    console.error('❌ Erreur:', allError.message);
    return;
  }

  if (!allAdmins || allAdmins.length === 0) {
    console.log('⚠️  AUCUN admin dans la table!');
    console.log('\n💡 SOLUTION: Créer un admin dans la table admin_users');
  } else {
    console.log(\`✅ \${allAdmins.length} admin(s) trouvé(s):\n\`);
    allAdmins.forEach((admin, index) => {
      console.log(\`\${index + 1}. \${admin.email}\`);
      console.log(\`   Actif: \${admin.is_active ? '✅' : '❌'}\`);
      console.log(\`   Rôle: \${admin.role}\n\`);
    });
  }

  // 2. Chercher alexlehoux@gmail.com
  console.log('🔍 Recherche alexlehoux@gmail.com:');
  const { data: alex, error: alexError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', 'alexlehoux@gmail.com')
    .single();

  if (alexError) {
    if (alexError.code === 'PGRST116') {
      console.log('❌ alexlehoux@gmail.com N\\'EXISTE PAS!');
      console.log('\n💡 Il faut créer cet utilisateur dans admin_users');
    } else {
      console.error('❌ Erreur:', alexError.message);
    }
  } else {
    console.log('✅ Trouvé!');
    console.log(\`   Actif: \${alex.is_active ? '✅' : '❌'}\`);
    console.log(\`   Rôle: \${alex.role}\`);
  }
})();
"

# Nettoyer
rm -f .env.temp
