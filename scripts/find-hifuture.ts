import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function findHifuture() {
  const { data } = await supabase
    .from('products')
    .select('url_slug, name, brands!products_brand_id_fkey(name)')
    .ilike('name', '%HIFUTURE%')
    .limit(10);

  data?.forEach(p => console.log((p.brands as any).name + ' - ' + p.url_slug));
}

findHifuture();
