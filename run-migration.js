const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const serviceKey = process.argv[2];

if (!serviceKey) {
  console.error('❌ Usage: node run-migration.js <SUPABASE_SERVICE_ROLE_KEY>');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function runMigration() {
  console.log('🚀 Ajout de alexandre@digiqo.fr comme super admin...\n');
  
  const sql = fs.readFileSync('./supabase/migrations/009_add_alexandre_admin.sql', 'utf8');
  
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql }).catch(async () => {
    // Fallback: insert directly
    const { data, error } = await supabase
      .from('admin_users')
      .upsert({ 
        email: 'alexandre@digiqo.fr', 
        role: 'super_admin', 
        is_active: true 
      }, {
        onConflict: 'email'
      });
    
    return { data, error };
  });
  
  if (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
  
  console.log('✅ alexandre@digiqo.fr ajouté comme super admin !');
  
  // Vérification
  const { data: check } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', 'alexandre@digiqo.fr')
    .single();
  
  console.log('\n📋 Vérification:', check);
}

runMigration();
