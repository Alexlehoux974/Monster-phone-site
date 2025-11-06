import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listHifutureProducts() {
  console.log('🔍 Recherche des produits HIFUTURE\n');

  const { data, error } = await supabase
    .from('products')
    .select('id, name')
    .ilike('name', '%hifuture%')
    .order('name');

  if (error) {
    console.error('❌ Erreur:', error);
    return;
  }

  console.log(`📦 ${data?.length || 0} produit(s) HIFUTURE trouvé(s):\n`);
  data?.forEach(p => console.log(`   - ${p.name}`));
}

listHifutureProducts();
