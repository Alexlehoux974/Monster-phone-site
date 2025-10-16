// On va utiliser le client admin qui existe déjà
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTM1MjgzNSwiZXhwIjoyMDQwOTI4ODM1fQ.p-L9YQRDxj9Jx6MnlzIc4dv48QNXeClIjAxIBXKpzgo';

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://nswlznqoadjffpxkagoz.supabase.co', serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function addAdmin() {
  console.log('🔍 Vérification de alexandre@digiqo.fr...\n');
  
  // Vérifier si existe déjà
  const { data: existing } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', 'alexandre@digiqo.fr')
    .single();
  
  if (existing) {
    console.log('✅ alexandre@digiqo.fr existe déjà:', existing);
    return;
  }
  
  console.log('➕ Ajout de alexandre@digiqo.fr...\n');
  
  // Ajouter
  const { data, error } = await supabase
    .from('admin_users')
    .insert({ 
      email: 'alexandre@digiqo.fr', 
      role: 'super_admin', 
      is_active: true 
    })
    .select()
    .single();
  
  if (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
  
  console.log('✅ alexandre@digiqo.fr ajouté !', data);
}

addAdmin();
