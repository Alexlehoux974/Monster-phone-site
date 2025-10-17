/**
 * Script pour diagnostiquer et corriger le rôle admin
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
  const email = 'superaccess@monsterphone.re';

  console.log('🔍 Vérification du rôle admin pour:', email);
  console.log('');

  // 1. Vérifier l'état actuel
  const { data: admins, error: checkError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email);

  if (checkError) {
    console.error('❌ Erreur lors de la vérification:', checkError.message);
    return;
  }

  if (!admins || admins.length === 0) {
    console.error('❌ Utilisateur admin non trouvé');
    return;
  }

  console.log(`📊 Trouvé ${admins.length} utilisateur(s) avec cet email`);
  console.log('');

  // Traiter tous les utilisateurs trouvés
  for (const [index, currentAdmin] of admins.entries()) {
    console.log(`👤 Utilisateur ${index + 1}/${admins.length}:`);
    console.log('  - ID:', currentAdmin.id);
    console.log('  - Email:', currentAdmin.email);
    console.log('  - Rôle actuel:', currentAdmin.role);
    console.log('  - Actif:', currentAdmin.is_active);
    console.log('  - Créé le:', currentAdmin.created_at);
    console.log('  - Dernière connexion:', currentAdmin.last_login_at);
    console.log('');

    // 2. Corriger le rôle si nécessaire
    if (currentAdmin.role !== 'super_admin') {
      console.log('  ⚠️  Le rôle n\'est pas "super_admin", correction en cours...');

      const { data: updated, error: updateError } = await supabase
        .from('admin_users')
        .update({
          role: 'super_admin',
          is_active: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentAdmin.id)
        .select()
        .single();

      if (updateError) {
        console.error('  ❌ Erreur lors de la mise à jour:', updateError.message);
        continue;
      }

      console.log('  ✅ Rôle mis à jour avec succès!');
      console.log('  📊 Nouvel état:');
      console.log('    - Rôle:', updated.role);
      console.log('    - Actif:', updated.is_active);
      console.log('');
    } else {
      console.log('  ✅ Le rôle est déjà "super_admin"');
      console.log('');
    }
  }

  console.log('');
  console.log('🔧 Vérification des permissions...');

  // 3. Vérifier les permissions sur la table admin_users
  const { data: testInsert, error: permError } = await supabase
    .from('admin_users')
    .select('count')
    .limit(1);

  if (permError) {
    console.error('❌ Problème de permissions:', permError.message);
  } else {
    console.log('✅ Permissions OK');
  }

  console.log('');
  console.log('🎯 Actions à faire:');
  console.log('  1. Déconnectez-vous du panel admin');
  console.log('  2. Reconnectez-vous avec vos identifiants');
  console.log('  3. Vérifiez que le rôle affiché est "Super Admin"');
}

main()
  .then(() => {
    console.log('');
    console.log('✅ Script terminé');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
