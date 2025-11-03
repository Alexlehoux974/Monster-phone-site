/**
 * Script pour tester le flux d'authentification admin complet
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

async function testAuthFlow(email) {
  console.log(`\n🧪 Test du flux d'authentification pour: ${email}`);
  console.log('═'.repeat(60));

  // 1. Vérifier l'utilisateur dans auth.users
  console.log('\n📋 Étape 1: Vérification dans auth.users');
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

  if (authError) {
    console.error('   ❌ Erreur:', authError.message);
    return;
  }

  const authUser = authUsers.users.find(u => u.email === email);
  if (authUser) {
    console.log('   ✅ Utilisateur trouvé dans auth.users');
    console.log(`   ID: ${authUser.id}`);
    console.log(`   Email: ${authUser.email}`);
    console.log(`   Confirmé: ${authUser.email_confirmed_at ? 'Oui' : 'Non'}`);
    console.log(`   Dernière connexion: ${authUser.last_sign_in_at || 'Jamais'}`);
  } else {
    console.log('   ❌ Utilisateur NON trouvé dans auth.users');
    return;
  }

  // 2. Vérifier dans admin_users
  console.log('\n📋 Étape 2: Vérification dans admin_users');
  const { data: adminUser, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (!adminUser || adminError) {
    console.log('   ❌ Utilisateur NON trouvé dans admin_users');
    if (adminError) console.log(`   Erreur: ${adminError.message}`);

    // Créer l'entrée admin_users
    console.log('\n🔧 Création de l\'entrée admin_users...');
    const { data: newAdmin, error: createError } = await supabase
      .from('admin_users')
      .insert({
        email: email,
        role: 'super_admin',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (createError) {
      console.error('   ❌ Erreur lors de la création:', createError.message);
      return;
    }

    console.log('   ✅ Entrée admin_users créée avec succès!');
    console.log(`   ID: ${newAdmin.id}`);
    console.log(`   Rôle: ${newAdmin.role}`);
  } else {
    console.log('   ✅ Utilisateur trouvé dans admin_users');
    console.log(`   ID: ${adminUser.id}`);
    console.log(`   Rôle: ${adminUser.role}`);
    console.log(`   Actif: ${adminUser.is_active}`);

    // Vérifier si mise à jour nécessaire
    if (adminUser.role !== 'super_admin' || !adminUser.is_active) {
      console.log('\n🔧 Mise à jour du rôle et du statut...');
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({
          role: 'super_admin',
          is_active: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', adminUser.id);

      if (updateError) {
        console.error('   ❌ Erreur lors de la mise à jour:', updateError.message);
      } else {
        console.log('   ✅ Rôle et statut mis à jour!');
      }
    }
  }

  console.log('\n✅ Diagnostic terminé pour ' + email);
}

async function main() {
  console.log('🔍 Test du système d\'authentification admin');
  console.log('═'.repeat(60));

  // Tester les deux emails existants
  await testAuthFlow('alexandre@digiqo.fr');
  await testAuthFlow('admin@monsterphone.re');

  console.log('\n\n📊 RÉSUMÉ');
  console.log('═'.repeat(60));
  console.log('');
  console.log('🎯 Actions recommandées:');
  console.log('   1. Déconnectez-vous du panel admin');
  console.log('   2. Reconnectez-vous avec un des emails ci-dessus');
  console.log('   3. Vérifiez que le rôle affiché est "Super Admin"');
  console.log('   4. Testez l\'enregistrement des modifications');
  console.log('');
  console.log('💡 Si le problème persiste:');
  console.log('   - Videz le cache du navigateur (Ctrl+Shift+Delete)');
  console.log('   - Essayez en navigation privée');
  console.log('   - Vérifiez les logs de la console navigateur (F12)');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
