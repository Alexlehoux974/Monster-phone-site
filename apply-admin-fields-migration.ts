import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyMigration() {
  console.log('Applying admin fields migration...\n');

  try {
    // Step 1: Add is_visible column
    console.log('1. Adding is_visible column...');
    const { error: error1 } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE products ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;'
    });
    if (error1) {
      console.error('Error adding is_visible:', error1);
    } else {
      console.log('✓ is_visible column added');
    }

    // Step 2: Add admin_discount_percent column
    console.log('2. Adding admin_discount_percent column...');
    const { error: error2 } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE products ADD COLUMN IF NOT EXISTS admin_discount_percent INTEGER DEFAULT 0 CHECK (admin_discount_percent >= 0 AND admin_discount_percent <= 100);'
    });
    if (error2) {
      console.error('Error adding admin_discount_percent:', error2);
    } else {
      console.log('✓ admin_discount_percent column added');
    }

    // Step 3: Create index
    console.log('3. Creating index on is_visible...');
    const { error: error3 } = await supabase.rpc('exec_sql', {
      sql: 'CREATE INDEX IF NOT EXISTS idx_products_is_visible ON products(is_visible) WHERE is_visible = true;'
    });
    if (error3) {
      console.error('Error creating index:', error3);
    } else {
      console.log('✓ Index created');
    }

    // Step 4: Update RLS policy
    console.log('4. Updating RLS policy...');
    const { error: error4 } = await supabase.rpc('exec_sql', {
      sql: 'DROP POLICY IF EXISTS "Public read access for active products" ON products;'
    });
    if (error4) {
      console.error('Error dropping old policy:', error4);
    } else {
      console.log('✓ Old policy dropped');
    }

    const { error: error5 } = await supabase.rpc('exec_sql', {
      sql: `CREATE POLICY "Public read access for active and visible products" ON products
            FOR SELECT USING (status = 'active' AND is_visible = true);`
    });
    if (error5) {
      console.error('Error creating new policy:', error5);
    } else {
      console.log('✓ New policy created');
    }

    console.log('\n✅ Migration completed successfully!');

  } catch (error) {
    console.error('Migration error:', error);
  }
}

applyMigration();
