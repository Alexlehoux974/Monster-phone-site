const { createClient } = require('@supabase/supabase-js');

// Script to create admin user alexlehoux@gmail.com
async function createAdminUser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Variables manquantes');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl || 'MANQUANT');
    console.log('SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey || 'MANQUANT');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const email = 'alexlehoux@gmail.com';
  const password = 'Monster@phone2025!';

  console.log('🔍 Étape 1: Vérification dans auth.users...\n');

  // 1. Vérifier si l'utilisateur existe déjà dans auth.users
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  let authUser = existingUsers?.users?.find(u => u.email === email);

  if (!authUser) {
    console.log('📝 Création utilisateur dans auth.users...');

    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    });

    if (createError) {
      console.error('❌ Erreur création auth user:', createError.message);
      process.exit(1);
    }

    authUser = newUser.user;
    console.log('✅ Utilisateur créé dans auth.users');
    console.log('   ID:', authUser.id);
  } else {
    console.log('✅ Utilisateur existe déjà dans auth.users');
    console.log('   ID:', authUser.id);
  }

  console.log('\n🔍 Étape 2: Vérification dans admin_users...\n');

  // 2. Vérifier si l'utilisateur existe dans admin_users
  const { data: existingAdmin, error: checkError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('❌ Erreur vérification:', checkError.message);
    process.exit(1);
  }

  if (!existingAdmin) {
    console.log('📝 Ajout dans admin_users...');

    const { data: newAdmin, error: insertError } = await supabase
      .from('admin_users')
      .insert({
        id: authUser.id,
        email: email,
        role: 'super_admin',
        is_active: true
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Erreur insertion:', insertError.message);
      process.exit(1);
    }

    console.log('✅ Admin créé dans admin_users');
    console.log('   ID:', newAdmin.id);
    console.log('   Email:', newAdmin.email);
    console.log('   Rôle:', newAdmin.role);
    console.log('   Actif:', newAdmin.is_active);
  } else {
    console.log('✅ Admin existe déjà dans admin_users');
    console.log('   ID:', existingAdmin.id);
    console.log('   Email:', existingAdmin.email);
    console.log('   Rôle:', existingAdmin.role);
    console.log('   Actif:', existingAdmin.is_active);

    // Vérifier si is_active est true
    if (!existingAdmin.is_active) {
      console.log('\n⚠️  Admin inactif, activation...');

      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ is_active: true })
        .eq('email', email);

      if (updateError) {
        console.error('❌ Erreur activation:', updateError.message);
        process.exit(1);
      }

      console.log('✅ Admin activé');
    }
  }

  console.log('\n✅ CONFIGURATION TERMINÉE');
  console.log('\n📋 Informations de connexion:');
  console.log('   Email:', email);
  console.log('   Mot de passe:', password);
  console.log('\n🔗 Tester sur: https://monster-phone.re/admin/login');
}

createAdminUser().catch(console.error);
