import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listAllBrandsStatus() {
  console.log('📊 ÉTAT DES DESCRIPTIONS PAR MARQUE\n');
  console.log('='.repeat(80));

  // Récupérer toutes les marques
  const { data: brands } = await supabase
    .from('brands')
    .select('id, name')
    .order('name');

  if (!brands || brands.length === 0) {
    console.log('❌ Aucune marque trouvée');
    return;
  }

  console.log(`\n🏷️  ${brands.length} marques trouvées\n`);

  const brandStats: Array<{
    name: string;
    total: number;
    withShort: number;
    withLong: number;
    missingShort: number;
    missingLong: number;
  }> = [];

  for (const brand of brands) {
    const { data: products } = await supabase
      .from('products')
      .select('id, short_description, description')
      .eq('brand_id', brand.id)
      .eq('status', 'active');

    if (!products || products.length === 0) {
      continue;
    }

    const withShort = products.filter(p => p.short_description && p.short_description.trim() !== '').length;
    const withLong = products.filter(p => p.description && p.description.trim() !== '').length;

    brandStats.push({
      name: brand.name,
      total: products.length,
      withShort,
      withLong,
      missingShort: products.length - withShort,
      missingLong: products.length - withLong
    });
  }

  // Trier par nombre de produits manquant short_description (décroissant)
  brandStats.sort((a, b) => b.missingShort - a.missingShort);

  console.log('📋 STATISTIQUES PAR MARQUE:\n');
  console.log('-'.repeat(80));

  brandStats.forEach(stat => {
    const shortPercent = ((stat.withShort / stat.total) * 100).toFixed(0);
    const longPercent = ((stat.withLong / stat.total) * 100).toFixed(0);

    const shortStatus = stat.missingShort === 0 ? '✅' : '❌';
    const longStatus = stat.missingLong === 0 ? '✅' : '❌';

    console.log(`${shortStatus} ${stat.name} (${stat.total} produits)`);
    console.log(`   Short: ${stat.withShort}/${stat.total} (${shortPercent}%) ${stat.missingShort > 0 ? `[MANQUE: ${stat.missingShort}]` : ''}`);
    console.log(`   Long:  ${stat.withLong}/${stat.total} (${longPercent}%) ${stat.missingLong > 0 ? `[MANQUE: ${stat.missingLong}]` : ''}`);
    console.log('');
  });

  console.log('='.repeat(80));
  console.log(`\n📊 RÉSUMÉ GLOBAL:`);
  const totalProducts = brandStats.reduce((sum, s) => sum + s.total, 0);
  const totalWithShort = brandStats.reduce((sum, s) => sum + s.withShort, 0);
  const totalWithLong = brandStats.reduce((sum, s) => sum + s.withLong, 0);
  const totalMissingShort = brandStats.reduce((sum, s) => sum + s.missingShort, 0);
  const totalMissingLong = brandStats.reduce((sum, s) => sum + s.missingLong, 0);

  console.log(`   📦 Total produits: ${totalProducts}`);
  console.log(`   ✅ Avec short_description: ${totalWithShort}/${totalProducts} (${((totalWithShort / totalProducts) * 100).toFixed(1)}%)`);
  console.log(`   ✅ Avec description: ${totalWithLong}/${totalProducts} (${((totalWithLong / totalProducts) * 100).toFixed(1)}%)`);
  console.log(`   ❌ Sans short_description: ${totalMissingShort}`);
  console.log(`   ❌ Sans description: ${totalMissingLong}`);

  console.log(`\n🎯 MARQUES PRIORITAIRES (manque short_description):`);
  const needsWork = brandStats.filter(s => s.missingShort > 0);
  if (needsWork.length === 0) {
    console.log(`   ✅ Toutes les marques sont complètes!\n`);
  } else {
    needsWork.forEach((stat, idx) => {
      console.log(`   ${idx + 1}. ${stat.name}: ${stat.missingShort} produits à enrichir`);
    });
    console.log('');
  }
}

listAllBrandsStatus();
