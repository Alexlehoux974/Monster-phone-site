import { supabase } from '@/lib/supabase/client';
import type { ProductFullView } from '@/lib/supabase/client';

async function testProductsIntegration() {
  console.log('🔍 Testing Product Integration...\n');
  
  // 1. Fetch all products
  const { data: products, error } = await supabase
    .from('product_full_view')
    .select('*');
    
  if (error || !products) {
    console.error('❌ Error fetching products:', error);
    return;
  }
  
  console.log(`✅ Found ${products.length} products in Supabase\n`);
  
  // 2. Group products by category
  const categoryCounts: Record<string, number> = {};
  const brandCounts: Record<string, number> = {};
  const productsWithImages: number = products.filter(p => p.images && p.images.length > 0).length;
  const productsWithDescriptions: number = products.filter(p => p.description).length;
  const productsWithWarranty: number = products.filter(p => p.warranty).length;
  const productsWithDeliveryTime: number = products.filter(p => p.delivery_time).length;
  const productsWithRepairability: number = products.filter(p => p.repairability_index).length;
  const productsWithReviews: number = products.filter(p => p.reviews && p.reviews.length > 0).length;
  
  products.forEach((product: ProductFullView) => {
    // Count by category
    const category = product.category_name || 'uncategorized';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;

    // Count by brand
    const brand = product.brand_name || 'unknown';
    brandCounts[brand] = (brandCounts[brand] || 0) + 1;
  });
  
  console.log('📊 Products by Category:');
  Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).forEach(([category, count]) => {
    console.log(`  - ${category}: ${count} products`);
  });
  
  console.log('\n🏭 Products by Brand:');
  Object.entries(brandCounts).sort((a, b) => b[1] - a[1]).forEach(([brand, count]) => {
    console.log(`  - ${brand}: ${count} products`);
  });
  
  console.log('\n📋 Product Field Coverage:');
  console.log(`  - With images: ${productsWithImages}/${products.length} (${Math.round(productsWithImages/products.length*100)}%)`);
  console.log(`  - With descriptions: ${productsWithDescriptions}/${products.length} (${Math.round(productsWithDescriptions/products.length*100)}%)`);
  console.log(`  - With warranty: ${productsWithWarranty}/${products.length} (${Math.round(productsWithWarranty/products.length*100)}%)`);
  console.log(`  - With delivery time: ${productsWithDeliveryTime}/${products.length} (${Math.round(productsWithDeliveryTime/products.length*100)}%)`);
  console.log(`  - With repairability index: ${productsWithRepairability}/${products.length} (${Math.round(productsWithRepairability/products.length*100)}%)`);
  console.log(`  - With reviews: ${productsWithReviews}/${products.length} (${Math.round(productsWithReviews/products.length*100)}%)`);
  
  // 3. Test product URL slugs
  const missingSlug = products.filter(p => !p.url_slug);
  if (missingSlug.length > 0) {
    console.log(`\n⚠️ Products missing URL slug: ${missingSlug.length}`);
    missingSlug.forEach(p => console.log(`  - ${p.name} (ID: ${p.id})`));
  } else {
    console.log('\n✅ All products have URL slugs');
  }
  
  // 4. Check for duplicate slugs
  const slugCounts: Record<string, number> = {};
  products.forEach(p => {
    if (p.url_slug) {
      slugCounts[p.url_slug] = (slugCounts[p.url_slug] || 0) + 1;
    }
  });
  
  const duplicateSlugs = Object.entries(slugCounts).filter(([_, count]) => count > 1);
  if (duplicateSlugs.length > 0) {
    console.log('\n⚠️ Duplicate URL slugs found:');
    duplicateSlugs.forEach(([slug, count]) => {
      console.log(`  - ${slug}: ${count} products`);
    });
  } else {
    console.log('✅ No duplicate URL slugs');
  }
  
  console.log('\n🎯 Integration Test Complete!');
}

testProductsIntegration().catch(console.error);