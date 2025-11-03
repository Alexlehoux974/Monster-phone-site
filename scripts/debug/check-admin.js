const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nswlznqoadjffpxkagoz.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, serviceKey);

async function checkAdmin() {
  console.log('🔍 Vérification de la table admin_users...\n');
  
  const { data, error } = await supabase
    .from('admin_users')
    .select('*');
  
  if (error) {
    console.error('❌ Erreur:', error);
    return;
  }
  
  console.log('📋 Utilisateurs admin trouvés:', data);
  
  if (data.length === 0) {
    console.log('\n⚠️  PROBLÈME: Aucun utilisateur admin trouvé !');
    console.log('Il faut créer l\'admin alexandre@digiqo.fr dans la table admin_users');
  }
}

checkAdmin();
