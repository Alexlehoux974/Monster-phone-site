import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Present' : 'Missing');
  process.exit(1);
}

console.log('✅ Supabase URL:', supabaseUrl);
console.log('✅ Service key:', supabaseServiceKey.substring(0, 20) + '...');

// Create admin client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function applyMigration() {
  try {
    console.log('\n🚀 Applying migration: 008_add_admin_discount_to_variants.sql');

    // Read SQL file
    const sqlPath = join(__dirname, 'supabase', 'migrations', '008_add_admin_discount_to_variants.sql');
    console.log('📁 Reading from:', sqlPath);

    const sql = readFileSync(sqlPath, 'utf-8');
    console.log('📝 SQL content:', sql.substring(0, 200) + '...\n');

    // Execute SQL statements one by one
    const statements = [
      `ALTER TABLE product_variants ADD COLUMN IF NOT EXISTS admin_discount_percent INTEGER DEFAULT 0 CHECK (admin_discount_percent >= 0 AND admin_discount_percent <= 100);`,
      `ALTER TABLE product_variants ADD COLUMN IF NOT EXISTS visible BOOLEAN DEFAULT true;`,
      `UPDATE product_variants SET visible = true WHERE visible IS NULL;`
    ];

    for (let i = 0; i < statements.length; i++) {
      console.log(`\n[${i + 1}/${statements.length}] Executing statement...`);
      console.log('SQL:', statements[i].substring(0, 100) + '...');

      // Use direct query execution
      const { data, error } = await supabase.rpc('exec_sql', {
        query: statements[i]
      });

      if (error) {
        console.log('⚠️ RPC method not available, trying alternative...');

        // Alternative: Use the SQL editor API
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: statements[i] })
        });

        if (!response.ok) {
          console.error(`❌ Failed to execute statement ${i + 1}`);
          console.error('HTTP Status:', response.status);
          console.error('Response:', await response.text());
          throw new Error(`Failed to execute statement ${i + 1}`);
        }

        console.log(`✅ Statement ${i + 1} executed successfully (via API)`);
      } else {
        console.log(`✅ Statement ${i + 1} executed successfully`);
      }
    }

    console.log('\n✅ Migration applied successfully!');
    console.log('\n📋 Columns added:');
    console.log('  - product_variants.admin_discount_percent (INTEGER 0-100)');
    console.log('  - product_variants.visible (BOOLEAN)');

  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('Stack:', error.stack);
    throw error;
  }
}

applyMigration()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  });
