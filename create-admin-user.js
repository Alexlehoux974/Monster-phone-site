const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function createAdminUser() {
  const email = 'alexandre@digiqo.fr';
  const password = process.argv[2];
  
  if (!password) {
    console.error('Usage: node create-admin-user.js <password>');
    process.exit(1);
  }

  console.log('Creating auth user for:', email);
  
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true
  });

  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  console.log('✅ User created successfully!');
  console.log('User ID:', data.user.id);
  console.log('Email:', data.user.email);
  console.log('\nYou can now login with:');
  console.log('Email:', email);
  console.log('Password: [your password]');
}

createAdminUser();
