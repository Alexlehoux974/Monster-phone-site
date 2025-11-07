import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testCatalogPage() {
  console.log('📄 TEST PAGE "TOUS NOS PRODUITS" (CATALOG)\n');
  console.log('='.repeat(80));

  // Simuler la requête exacte de la page produits-supabase
  console.log('\n🔍 Requête Supabase (simulation page catalog)...\n');

  // Récupérer les produits (comme dans la vraie page)
  const { data: productsData, error: productsError } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(12); // Première page

  if (productsError) {
    console.log('❌ Erreur requête catalog:', productsError.message);
    return;
  }

  // Récupérer les marques
  const { data: brandsData } = await supabase
    .from('brands')
    .select('*');

  // Récupérer les catégories
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*');

  // Récupérer les variantes
  const { data: variantsData } = await supabase
    .from('product_variants')
    .select('*');

  // Mapper les données (comme dans la vraie page)
  const brandsMap = new Map(brandsData?.map(b => [b.id, b]) || []);
  const categoriesMap = new Map(categoriesData?.map(c => [c.id, c]) || []);
  const variantsMap = new Map<string, any[]>();

  variantsData?.forEach(v => {
    if (!variantsMap.has(v.product_id)) {
      variantsMap.set(v.product_id, []);
    }
    variantsMap.get(v.product_id)?.push(v);
  });

  // Combiner les données
  const products = productsData?.map(product => ({
    ...product,
    brands: brandsMap.get(product.brand_id),
    categories: categoriesMap.get(product.category_id),
    product_variants: variantsMap.get(product.id) || []
  }));

  // Compter le total
  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  console.log(`✅ ${products.length} produits récupérés (count total: ${count})`);
  console.log(`   Pagination: Page 1/12 produits par page`);

  // Vérification structure de chaque produit
  console.log('\n📊 VÉRIFICATION STRUCTURE PRODUITS\n');

  let validProducts = 0;
  let issuesFound: string[] = [];

  for (const product of products) {
    const p = product as any;
    const brand = p.brands?.name || 'N/A';
    const category = p.categories?.name || 'N/A';
    const variants = p.product_variants || [];
    const totalStock = variants.reduce((sum: number, v: any) => sum + (v.stock || 0), 0);

    // Vérifications critiques
    const hasName = !!p.name;
    const hasSlug = !!p.url_slug;
    const hasShortDesc = !!p.short_description;
    const hasPrice = p.price > 0;
    const hasBrand = !!p.brands;

    const isValid = hasName && hasSlug && hasShortDesc && hasPrice && hasBrand;

    if (isValid) {
      validProducts++;
    } else {
      const missing: string[] = [];
      if (!hasName) missing.push('name');
      if (!hasSlug) missing.push('url_slug');
      if (!hasShortDesc) missing.push('short_description');
      if (!hasPrice) missing.push('price');
      if (!hasBrand) missing.push('brand');

      issuesFound.push(`${brand} - ${p.name || 'Sans nom'}: Manque ${missing.join(', ')}`);
    }

    const status = isValid ? '✅' : '⚠️';
    console.log(`   ${status} ${brand} - ${p.name?.substring(0, 40)}`);
    console.log(`      Short desc: ${hasShortDesc ? '✅' : '❌'} | Prix: ${p.price}€ | Stock: ${totalStock}`);
    console.log(`      Slug: ${p.url_slug}`);
  }

  // Résumé
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 RÉSUMÉ TEST CATALOG PAGE\n');
  console.log(`   Total produits chargés: ${products.length}`);
  console.log(`   ✅ Produits valides (structure complète): ${validProducts}/${products.length}`);
  console.log(`   ⚠️  Produits avec problèmes: ${issuesFound.length}`);

  if (issuesFound.length > 0) {
    console.log('\n🚨 PROBLÈMES DÉTECTÉS:\n');
    issuesFound.forEach(issue => console.log(`   - ${issue}`));
  }

  // Test filtres
  console.log('\n\n🔧 TEST FILTRES DISPONIBLES\n');

  // Récupérer toutes les marques
  const { data: brands } = await supabase
    .from('brands')
    .select('id, name')
    .order('name');

  console.log(`   ✅ Filtres marques: ${brands?.length || 0} marques disponibles`);
  if (brands && brands.length > 0) {
    console.log(`      Exemples: ${brands.slice(0, 5).map(b => b.name).join(', ')}`);
  }

  // Récupérer toutes les catégories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name');

  console.log(`   ✅ Filtres catégories: ${categories?.length || 0} catégories disponibles`);
  if (categories && categories.length > 0) {
    console.log(`      Exemples: ${categories.slice(0, 5).map(c => c.name).join(', ')}`);
  }

  // Test recherche
  console.log('\n\n🔍 TEST FONCTIONNALITÉ RECHERCHE\n');

  const { data: searchResults, error: searchError } = await supabase
    .from('products')
    .select('id, name, url_slug, brands!products_brand_id_fkey(name)')
    .eq('status', 'active')
    .ilike('name', '%MONSTER%')
    .limit(5);

  if (searchError) {
    console.log('   ❌ Erreur recherche:', searchError.message);
  } else {
    console.log(`   ✅ Recherche "MONSTER": ${searchResults.length} résultats`);
    if (searchResults.length > 0) {
      searchResults.forEach((r: any) => {
        console.log(`      - ${r.brands?.name} - ${r.name.substring(0, 50)}`);
      });
    }
  }

  // Test tri par prix
  console.log('\n\n💰 TEST TRI PAR PRIX\n');

  const { data: sortedByPrice } = await supabase
    .from('products')
    .select('name, price, brands!products_brand_id_fkey(name)')
    .eq('status', 'active')
    .order('price', { ascending: true })
    .limit(3);

  if (sortedByPrice && sortedByPrice.length > 0) {
    console.log('   ✅ Tri prix croissant (3 premiers):');
    sortedByPrice.forEach((p: any) => {
      console.log(`      ${p.price}€ - ${p.brands?.name} - ${p.name.substring(0, 40)}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ TEST CATALOG PAGE TERMINÉ\n');
}

testCatalogPage();
