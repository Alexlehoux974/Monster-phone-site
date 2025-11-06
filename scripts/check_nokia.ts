#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://nswlznqoadjffpxkagoz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI'
);

async function main() {
  const { data: products } = await supabase
    .from('products')
    .select('id, name, sku')
    .ilike('name', '%nokia%');

  console.log('Nokia Products:', products);

  if (products && products.length > 0) {
    const { data: variants } = await supabase
      .from('product_variants')
      .select('*')
      .in('product_id', products.map(p => p.id));

    console.log('Nokia Variants:', variants);
  }
}

main().catch(console.error);
