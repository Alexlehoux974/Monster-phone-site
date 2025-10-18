const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

async function testLoginFlow() {
  console.log('🧪 Testing Admin Login Flow\n');

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const email = 'alexandre@digiqo.fr';
  const password = 'MonsterAdmin2025';

  try {
    // Step 1: Sign in
    console.log('Step 1: Attempting sign in...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error('❌ Sign in failed:', authError.message);
      return;
    }

    console.log('✅ Sign in successful');
    console.log('   User ID:', authData.user?.id);
    console.log('   Session exists:', !!authData.session);
    console.log('   Access token length:', authData.session?.access_token?.length || 0);

    // Step 2: Wait a moment
    console.log('\nStep 2: Waiting 1 second...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 3: Get session
    console.log('\nStep 3: Getting session...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('❌ Get session failed:', sessionError.message);
      return;
    }

    if (!session) {
      console.error('❌ No session found after sign in!');
      console.log('   This is the problem - session created but not retrievable');
      return;
    }

    console.log('✅ Session retrieved successfully');
    console.log('   User ID:', session.user?.id);
    console.log('   Access token length:', session.access_token?.length || 0);

    // Step 4: Verify admin status
    console.log('\nStep 4: Verifying admin status...');
    const verifyResponse = await fetch('https://monster-phone.re/api/admin/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const verifyData = await verifyResponse.json();

    if (!verifyResponse.ok || !verifyData.isAdmin) {
      console.error('❌ Admin verification failed');
      console.log('   Response:', verifyData);
      return;
    }

    console.log('✅ Admin verification successful');
    console.log('   Role:', verifyData.admin?.role);
    console.log('   Email:', verifyData.admin?.email);

    console.log('\n✅ ALL TESTS PASSED - Login flow working correctly');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testLoginFlow();
