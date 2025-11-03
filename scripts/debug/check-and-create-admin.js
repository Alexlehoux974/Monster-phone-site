/**
 * Script pour vérifier et créer l'utilisateur admin
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement manquantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function main() {
  console.log('🔍 Vérification de la table admin_users...');
  console.log('');

  // 1. Lister TOUS les utilisateurs admin
  const { data: allAdmins, error: listError } = await supabase
    .from('admin_users')
    .select('*');

  if (listError) {
    console.error('❌ Erreur lors de la récupération des admins:', listError.message);
    return;
  }

  console.log(`📊 Nombre total d'utilisateurs admin: ${allAdmins?.length || 0}`);
  console.log('');

  if (allAdmins && allAdmins.length > 0) {
    console.log('👥 Liste des utilisateurs admin:');
    allAdmins.forEach((admin, index) => {
      console.log(`\n${index + 1}. ${admin.email}`);
      console.log(`   ID: ${admin.id}`);
      console.log(`   Rôle: ${admin.role}`);
      console.log(`   Actif: ${admin.is_active}`);
      console.log(`   Créé: ${admin.created_at}`);
      console.log(`   Dernière connexion: ${admin.last_login_at || 'Jamais'}`);
    });
    console.log('');
  }

  // 2. Vérifier si l'email superaccess existe
  const targetEmail = 'superaccess@monsterphone.re';
  const existingAdmin = allAdmins?.find(a => a.email === targetEmail);

  if (existingAdmin) {
    console.log(`✅ Utilisateur ${targetEmail} trouvé!`);
    console.log(`   Rôle actuel: ${existingAdmin.role}`);

    if (existingAdmin.role !== 'super_admin') {
      console.log('   ⚠️  Correction du rôle en cours...');

      const { error: updateError } = await supabase
        .from('admin_users')
        .update({
          role: 'super_admin',
          is_active: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingAdmin.id);

      if (updateError) {
        console.error('   ❌ Erreur lors de la mise à jour:', updateError.message);
      } else {
        console.log('   ✅ Rôle mis à jour avec succès!');
      }
    }
  } else {
    console.log(`⚠️  Utilisateur ${targetEmail} non trouvé.`);
    console.log('');
    console.log('💡 Pour créer cet utilisateur:');
    console.log('   1. Allez sur le panel admin');
    console.log('   2. Créez un compte avec cet email');
    console.log('   3. Ou ajoutez manuellement dans Supabase Dashboard');
    console.log('');
    console.log('📝 SQL pour créer manuellement:');
    console.log(`
INSERT INTO admin_users (email, role, is_active, created_at, updated_at)
VALUES (
  '${targetEmail}',
  'super_admin',
  true,
  NOW(),
  NOW()
);
    `);
  }

  console.log('');
  console.log('🔧 Vérification de la structure de la table...');

  // 3. Obtenir la structure de la table
  const { data: tableInfo, error: schemaError } = await supabase
    .from('admin_users')
    .select('*')
    .limit(0);

  if (schemaError) {
    console.error('❌ Erreur lors de la récupération du schéma:', schemaError.message);
  } else {
    console.log('✅ Table admin_users accessible');
  }
}

main()
  .then(() => {
    console.log('');
    console.log('✅ Vérification terminée');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
