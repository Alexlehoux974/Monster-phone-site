import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function testAdminTable() {
  console.log('🔍 Testing admin_users table...\n');

  // Test 1: Check if table exists by listing all admin users
  console.log('📋 Test 1: List all admin users');
  const { data: allAdmins, error: listError } = await supabaseAdmin
    .from('admin_users')
    .select('*');

  if (listError) {
    console.error('❌ Error listing admin users:', listError);
    return;
  }

  console.log('✅ Found', allAdmins?.length || 0, 'admin users:');
  allAdmins?.forEach((admin: any) => {
    console.log('  -', admin.email, '(role:', admin.role, ', active:', admin.is_active, ')');
  });

  console.log('\n📧 Test 2: Check specific email');
  // You should replace this with the actual email the user is trying to use
  const testEmail = 'test@example.com'; // Replace with actual email

  const { data: specificAdmin, error: specificError } = await supabaseAdmin
    .from('admin_users')
    .select('*')
    .eq('email', testEmail)
    .eq('is_active', true)
    .single();

  if (specificError) {
    console.log('❌ Admin not found or error:', specificError.message);
  } else {
    console.log('✅ Admin found:', specificAdmin);
  }
}

testAdminTable().then(() => {
  console.log('\n✅ Test completed');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
