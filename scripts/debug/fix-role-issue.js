const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkAndFixRoles() {
  console.log('🔍 Vérification des utilisateurs admin...\n');

  // Récupérer tous les utilisateurs admin
  const { data: adminUsers, error } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('❌ Erreur:', error.message);
    return;
  }

  console.log(`📊 ${adminUsers.length} utilisateur(s) trouvé(s):\n`);

  for (const user of adminUsers) {
    console.log(`📧 ${user.email}`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Rôle actuel: ${user.role}`);
    console.log(`   Actif: ${user.is_active}`);
    console.log('');
  }

  // Mettre tous les utilisateurs en super_admin
  console.log('🔧 Mise à jour de tous les utilisateurs en super_admin...\n');

  const { data: updated, error: updateError } = await supabase
    .from('admin_users')
    .update({ role: 'super_admin', updated_at: new Date().toISOString() })
    .neq('role', 'super_admin')
    .select();

  if (updateError) {
    console.error('❌ Erreur lors de la mise à jour:', updateError.message);
    return;
  }

  if (updated && updated.length > 0) {
    console.log(`✅ ${updated.length} utilisateur(s) mis à jour en super_admin`);
    for (const user of updated) {
      console.log(`   - ${user.email}`);
    }
  } else {
    console.log('✅ Tous les utilisateurs sont déjà super_admin');
  }

  // Vérification finale
  console.log('\n📋 État final:\n');
  const { data: final } = await supabase
    .from('admin_users')
    .select('email, role, is_active')
    .order('email');

  for (const user of final) {
    const status = user.is_active ? 'actif' : 'inactif';
    console.log(`   ${user.email}: ${user.role} (${status})`);
  }
}

checkAndFixRoles().then(() => {
  console.log('\n✅ Terminé');
  process.exit(0);
}).catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
