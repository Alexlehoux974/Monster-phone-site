import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function fixHardcodedPrices() {
  console.log('🔍 Searching for products with hardcoded prices...\n');

  // Find products with hardcoded prices
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, sku, description, price, admin_discount_percent')
    .ilike('description', '%Prix garanti%€%');

  if (error) {
    console.error('❌ Error fetching products:', error);
    return;
  }

  if (!products || products.length === 0) {
    console.log('✅ No products with hardcoded prices found');
    return;
  }

  console.log(`Found ${products.length} products with hardcoded prices:\n`);

  // Update each product
  for (const product of products) {
    const match = product.description.match(/Prix garanti ([\d,\.]+)€/);
    const hardcodedPrice = match ? match[1] : 'unknown';
    const currentPrice = product.price;
    const finalPrice = product.admin_discount_percent > 0
      ? currentPrice * (1 - product.admin_discount_percent / 100)
      : currentPrice;

    console.log(`📦 ${product.name}`);
    console.log(`   SKU: ${product.sku}`);
    console.log(`   Hardcoded: ${hardcodedPrice}€ | Current: ${currentPrice}€ | Final: ${finalPrice.toFixed(2)}€`);

    // Remove the entire promotional banner with hardcoded price
    let updatedDescription = product.description.replace(
      /<div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">[\s\S]*?<\/div>/g,
      ''
    );

    // Also remove any standalone "Prix garanti" text
    updatedDescription = updatedDescription.replace(
      /Prix garanti [\d,\.]+€\s*/g,
      ''
    );

    // Update in database
    const { error: updateError } = await supabase
      .from('products')
      .update({ description: updatedDescription })
      .eq('id', product.id);

    if (updateError) {
      console.log(`   ❌ Failed to update: ${updateError.message}`);
    } else {
      console.log(`   ✅ Updated - promotional banner with hardcoded price removed`);
    }
    console.log('');
  }

  console.log('\n✅ All products updated successfully!');
  console.log('\n💡 Note: The promotional banners with hardcoded prices have been removed.');
  console.log('   Prices will now update automatically based on the database price and admin discount.');
}

fixHardcodedPrices().catch(console.error);
