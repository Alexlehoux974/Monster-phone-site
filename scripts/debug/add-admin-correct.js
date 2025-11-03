const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

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
  const { data: existing, error: checkError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', 'alexandre@digiqo.fr')
    .maybeSingle();
  
  if (existing) {
    console.log('✅ alexandre@digiqo.fr existe déjà:');
    console.log(existing);
    return;
  }
  
  console.log('➕ Ajout de alexandre@digiqo.fr comme super_admin...\n');
  
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
  
  console.log('✅ alexandre@digiqo.fr ajouté avec succès !');
  console.log(data);
}

addAdmin();
