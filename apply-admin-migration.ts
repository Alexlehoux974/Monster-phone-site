import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.D5eJV1zBjECjcovPsVXCEL21F-LFsQ-RmQkTw3S4yAw';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

async function applyMigration() {
  console.log('Starting migration...');

  try {
    // Check if columns already exist
    console.log('Checking existing schema...');
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('*')
      .limit(1);

    if (checkError) {
      console.error('Error checking schema:', checkError);
      return;
    }

    console.log('Existing product sample:', existingProducts?.[0] ? Object.keys(existingProducts[0]) : 'No products');

    // Execute ALTER TABLE statements via SQL
    const statements = [
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0)`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS admin_discount_percent INTEGER DEFAULT 0 CHECK (admin_discount_percent >= 0 AND admin_discount_percent <= 100)`,
      `CREATE INDEX IF NOT EXISTS idx_products_is_visible ON products(is_visible) WHERE is_visible = true`,
      `DROP POLICY IF EXISTS "Public read access for active products" ON products`,
      `CREATE POLICY "Public read access for active and visible products" ON products FOR SELECT USING (status = 'active' AND is_visible = true)`
    ];

    for (const sql of statements) {
      console.log(`Executing: ${sql.substring(0, 60)}...`);

      // Use rpc to execute raw SQL
      const { error } = await (supabase as any).rpc('exec', { sql });

      if (error && !error.message?.includes('already exists')) {
        console.error('Error:', error.message);
      } else {
        console.log('✓ Success');
      }
    }

    console.log('\n✅ Migration completed successfully!');

    // Verify the changes
    console.log('\nVerifying schema changes...');
    const { data: verifyProducts } = await supabase
      .from('products')
      .select('*')
      .limit(1);

    if (verifyProducts && verifyProducts.length > 0) {
      console.log('New columns available:', Object.keys(verifyProducts[0]).filter(k =>
        ['is_visible', 'stock_quantity', 'admin_discount_percent'].includes(k)
      ));
    }

  } catch (error: any) {
    console.error('Migration failed:', error.message);
  }
}

applyMigration();
