const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Simuler la fonction mapCategoryToLegacy AVEC le fix
function mapCategoryToLegacy(supabaseCategory) {
  const mapping = {
    'smartphones': 'Smartphones',
    'tablettes': 'Tablettes',
    'audio': 'Audio',
    'montres': 'Montres',
    'led': 'LED',
    'accessoires': 'Accessoires'
  };

  const lowerCategory = supabaseCategory.toLowerCase();
  return mapping[lowerCategory] || supabaseCategory;
}

async function testMenuGeneration() {
  console.log('Testing menu generation logic...\n');

  // EXACTLY comme getActiveProducts() dans api.ts
  const { data: rawProducts, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug, logo_url),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug)
    `)
    .eq('status', 'active')
    .limit(20);

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Transform comme dans api.ts
  const products = (rawProducts || []).map(product => ({
    ...product,
    category_name: product.category?.name || '',
    brand_name: product.brand?.name || ''
  }));

  console.log(`Found ${products.length} active products\n`);

  const categoryMap = new Map();

  products.forEach(product => {
    if (!product.category_name) {
      console.log(`⚠️  Product ${product.name} has NO category_name!`);
      return;
    }

    const mappedCategory = mapCategoryToLegacy(product.category_name);
    console.log(`  ${product.category_name} -> ${mappedCategory}`);

    if (!categoryMap.has(mappedCategory)) {
      categoryMap.set(mappedCategory, []);
    }
    categoryMap.get(mappedCategory).push(product);
  });

  console.log(`\nCategory Map Contents:`);
  categoryMap.forEach((prods, category) => {
    console.log(`  ${category}: ${prods.length} products`);
  });

  const categoryOrder = ['Smartphones', 'Tablettes', 'Montres', 'Audio', 'LED', 'Accessoires'];

  console.log(`\nMenu Categories Check:`);
  categoryOrder.forEach(categoryName => {
    const prods = categoryMap.get(categoryName);
    if (prods && prods.length > 0) {
      console.log(`  ✅ ${categoryName}: ${prods.length} products`);
    } else {
      console.log(`  ❌ ${categoryName}: NO PRODUCTS!`);
    }
  });
}

testMenuGeneration();
