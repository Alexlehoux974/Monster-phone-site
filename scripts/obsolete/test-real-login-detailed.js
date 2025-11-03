/**
 * Script pour tester une vraie connexion et voir exactement ce qui est renvoyé
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

async function testRealLogin(email) {
  console.log(`\n🔍 TEST DÉTAILLÉ DE CONNEXION POUR: ${email}`);
  console.log('═'.repeat(70));

  // 1. Simuler ce que fait /api/admin/verify
  console.log('\n📋 Étape 1: Simulation de /api/admin/verify');
  console.log('   🔍 Requête SQL: SELECT * FROM admin_users WHERE email = ...');
  
  const { data: adminData, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('is_active', true)
    .maybeSingle();

  if (adminError) {
    console.log('   ❌ Erreur SQL:', adminError.message);
    console.log('   📊 Code:', adminError.code);
    console.log('   📊 Détails:', adminError.details);
    return;
  }

  if (!adminData) {
    console.log('   ❌ Aucun utilisateur trouvé avec email:', email);
    console.log('   ❌ is_active: true');
    
    // Vérifier sans le filtre is_active
    console.log('\n   🔍 Vérification sans filtre is_active...');
    const { data: anyAdmin, error: anyError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    
    if (anyAdmin) {
      console.log('   ⚠️  Utilisateur trouvé MAIS is_active =', anyAdmin.is_active);
      console.log('   📊 Données complètes:', JSON.stringify(anyAdmin, null, 2));
    } else {
      console.log('   ❌ Utilisateur vraiment inexistant');
    }
    return;
  }

  console.log('   ✅ Utilisateur trouvé!');
  console.log('   📊 Données retournées par verify:');
  console.log(JSON.stringify(adminData, null, 2));

  // 2. Simuler ce que fait getAdminSession
  console.log('\n📋 Étape 2: Simulation de getAdminSession()');
  console.log('   Ce que le frontend reçoit:');
  
  const adminResponse = {
    id: adminData.id,
    email: adminData.email,
    role: adminData.role,
    is_active: adminData.is_active,
    last_login_at: adminData.last_login_at
  };
  
  console.log(JSON.stringify(adminResponse, null, 2));

  // 3. Simuler l'affichage du rôle
  console.log('\n📋 Étape 3: Affichage du rôle dans le layout');
  console.log('   Code: admin?.role === "super_admin" ? "Super Admin" : ...');
  console.log('   admin?.role =', `"${adminData.role}"`);
  console.log('   admin?.role === "super_admin" =', adminData.role === 'super_admin');
  
  let displayedRole;
  if (adminData.role === 'super_admin') {
    displayedRole = 'Super Admin';
  } else if (adminData.role === 'admin') {
    displayedRole = 'Admin';
  } else {
    displayedRole = 'Éditeur';
  }
  
  console.log('   🎯 Rôle affiché:', displayedRole);

  // 4. Vérifier les types de données
  console.log('\n📋 Étape 4: Vérification des types de données');
  console.log('   Type de role:', typeof adminData.role);
  console.log('   Longueur de role:', adminData.role?.length);
  console.log('   Bytes de role:', Buffer.from(adminData.role || '').toString('hex'));
  console.log('   Comparaison stricte:', adminData.role === 'super_admin' ? '✅' : '❌');
  console.log('   Comparaison loose:', adminData.role == 'super_admin' ? '✅' : '❌');
  console.log('   Includes "super":', adminData.role?.includes('super') ? '✅' : '❌');

  // 5. Vérifier si besoin de nettoyer
  if (adminData.role !== 'super_admin' && adminData.role?.trim() === 'super_admin') {
    console.log('\n⚠️  PROBLÈME DÉTECTÉ: Espaces dans le rôle!');
    console.log('   🔧 Correction nécessaire...');
    
    const { error: fixError } = await supabase
      .from('admin_users')
      .update({ role: 'super_admin' })
      .eq('id', adminData.id);
    
    if (!fixError) {
      console.log('   ✅ Rôle nettoyé avec succès!');
    }
  }
}

async function main() {
  console.log('🔍 DIAGNOSTIC COMPLET DE L\'AUTHENTIFICATION ADMIN');
  console.log('═'.repeat(70));
  
  await testRealLogin('alexandre@digiqo.fr');
  
  console.log('\n\n💡 RECOMMANDATIONS');
  console.log('═'.repeat(70));
  console.log('\n1. Si le rôle est correct dans la base mais mal affiché:');
  console.log('   → Problème de cache navigateur, videz le cache');
  console.log('\n2. Si le rôle contient des espaces:');
  console.log('   → Le script l\'a corrigé automatiquement');
  console.log('\n3. Si le rôle est vide ou incorrect:');
  console.log('   → Vérifiez manuellement dans Supabase Dashboard');
  console.log('\n4. Après correction:');
  console.log('   → Déconnexion totale (pas juste refresh)');
  console.log('   → Fermer tous les onglets du site');
  console.log('   → Rouvrir et se reconnecter');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
