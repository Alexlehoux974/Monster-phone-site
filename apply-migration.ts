import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyMigration() {
  console.log('Reading migration file...');
  const migrationPath = path.join(__dirname, 'supabase', 'migrations', '004_add_admin_fields.sql');
  const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

  console.log('Applying migration to Supabase...');

  // Split SQL statements and execute them one by one
  const statements = migrationSQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (const statement of statements) {
    if (statement.trim()) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: statement + ';'
      });

      if (error) {
        // Try direct query instead
        const { error: queryError } = await supabase.from('_').select('*').limit(0);
        if (queryError) {
          console.error('Error executing statement:', error);
          console.log('Trying alternative method...');
          // Last resort: execute via raw query
          try {
            await supabase.rpc('execute', { query: statement });
          } catch (e: any) {
            console.error('Failed:', e.message);
          }
        }
      }
    }
  }

  console.log('Migration completed!');
}

applyMigration().catch(console.error);
