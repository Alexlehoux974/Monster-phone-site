const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.vercel' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Variables d\'environnement manquantes!');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'PRÉSENT' : 'MANQUANT');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? 'PRÉSENT' : 'MANQUANT');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkAdmin() {
  console.log('🔍 Vérification de la table admin_users...\n');

  // 1. Récupérer TOUS les admins
  console.log('📋 TOUS les utilisateurs admin:');
  const { data: allAdmins, error: allError } = await supabase
    .from('admin_users')
    .select('*');

  if (allError) {
    console.error('❌ Erreur récupération admins:', allError.message);
    return;
  }

  if (!allAdmins || allAdmins.length === 0) {
    console.log('⚠️  AUCUN admin trouvé dans la table!');
  } else {
    console.log(`✅ ${allAdmins.length} admin(s) trouvé(s):\n`);
    allAdmins.forEach((admin, index) => {
      console.log(`${index + 1}. Email: ${admin.email}`);
      console.log(`   ID: ${admin.id}`);
      console.log(`   Actif: ${admin.is_active ? '✅ OUI' : '❌ NON'}`);
      console.log(`   Rôle: ${admin.role}`);
      console.log(`   Créé: ${admin.created_at}`);
      console.log(`   Dernière connexion: ${admin.last_login_at || 'Jamais'}\n`);
    });
  }

  // 2. Chercher spécifiquement alexlehoux@gmail.com
  console.log('🔍 Recherche de alexlehoux@gmail.com:');
  const { data: alexAdmin, error: alexError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', 'alexlehoux@gmail.com')
    .single();

  if (alexError) {
    if (alexError.code === 'PGRST116') {
      console.log('❌ alexlehoux@gmail.com N\'EXISTE PAS dans admin_users!');
      console.log('\n💡 SOLUTION: Créer cet utilisateur admin dans la table admin_users');
    } else {
      console.error('❌ Erreur:', alexError.message);
    }
  } else {
    console.log('✅ alexlehoux@gmail.com trouvé:');
    console.log('   Actif:', alexAdmin.is_active ? '✅ OUI' : '❌ NON');
    console.log('   Rôle:', alexAdmin.role);
  }

  // 3. Chercher dans auth.users
  console.log('\n🔍 Vérification dans auth.users:');
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

  if (authError) {
    console.error('❌ Erreur récupération users:', authError.message);
  } else {
    const alexUser = authUsers.users.find(u => u.email === 'alexlehoux@gmail.com');
    if (alexUser) {
      console.log('✅ alexlehoux@gmail.com existe dans auth.users');
      console.log('   User ID:', alexUser.id);
      console.log('   Email confirmé:', alexUser.email_confirmed_at ? '✅ OUI' : '❌ NON');
    } else {
      console.log('❌ alexlehoux@gmail.com N\'EXISTE PAS dans auth.users!');
      console.log('\n💡 SOLUTION: Créer cet utilisateur dans Supabase Auth');
    }
  }
}

checkAdmin().catch(console.error);
