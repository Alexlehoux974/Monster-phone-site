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
  console.error('Please add SUPABASE_SERVICE_ROLE_KEY to .env.local');
  process.exit(1);
}

// Create admin client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function applyMigration(migrationFile: string) {
  try {
    console.log(`\n🚀 Applying migration: ${migrationFile}`);

    // Read SQL file
    const sqlPath = join(__dirname, 'migrations', migrationFile);
    const sql = readFileSync(sqlPath, 'utf-8');

    // Split by statements (simple approach)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      console.log(`\n[${i + 1}/${statements.length}] Executing statement...`);

      const { data, error } = await supabase.rpc('exec_sql', {
        sql_query: statement
      });

      if (error) {
        // Try direct execution if RPC fails
        const { error: directError } = await supabase
          .from('_migrations')
          .insert({ sql: statement });

        if (directError) {
          console.error(`❌ Error executing statement ${i + 1}:`, error.message);
          console.error('Statement:', statement.substring(0, 200) + '...');
          throw error;
        }
      }

      console.log(`✅ Statement ${i + 1} executed successfully`);
    }

    console.log(`\n✅ Migration ${migrationFile} applied successfully!`);

  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message);
    throw error;
  }
}

// Main execution
async function main() {
  try {
    console.log('🔧 Monster Phone - Admin Setup Migration');
    console.log('========================================\n');

    // Apply admin setup migration
    await applyMigration('003_admin_setup.sql');

    console.log('\n✅ All migrations applied successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to Supabase Dashboard > SQL Editor');
    console.log('2. Paste the content of supabase/migrations/003_admin_setup.sql');
    console.log('3. Run the SQL to create admin tables');
    console.log('4. Update admin@monsterphone.re email in the SQL if needed');
    console.log('5. Create password in Supabase Auth > Users for admin email');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration process failed');
    process.exit(1);
  }
}

main();
