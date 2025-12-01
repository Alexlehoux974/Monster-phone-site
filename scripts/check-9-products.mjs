// Script to check the 9 products that supposedly have images but still show placeholders
const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const PRODUCTS_TO_CHECK = [
  'HONOR PAD 9 WIFI 8+',
  'CHARGEUR SANS FILS MY WAY 15W MAGSAFE DONUTS',
  'MONSTER CABLE TYPE C VERS HDMI 4K 2M',
  'CABLE LUMINEUX MY WAY USB A - USB C',
  'MONSTER ILLUMINESCENCE BASIC LIGHT STRIP 2X 5M RGB+W SOUND REACTIVE INT',
  'MONSTER BLASTER MICRO',
  'MONSTER ILLUMINESCENCE BASIC LED TOUCH LIGHT X3 RGB INT',
  'MONSTER ILLUMINESCENCE BASIC LED LIGHT BAR PAIR RGB INT',
  'POWERBANK MYWAY 10K MAH'
];

async function checkProducts() {
  console.log('=== Checking 9 Products with Supposed Images ===\n');

  for (const productName of PRODUCTS_TO_CHECK) {
    console.log(`\n--- ${productName} ---`);

    // Query product and its variants
    const encodedName = encodeURIComponent(productName);
    const url = `${SUPABASE_URL}/rest/v1/products?name=eq.${encodedName}&select=id,name,images,is_visible,product_variants(id,color,images,is_default)`;

    try {
      const response = await fetch(url, {
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`
        }
      });

      const data = await response.json();

      if (data.length === 0) {
        console.log('  ❌ Product NOT FOUND in database');
        continue;
      }

      const product = data[0];
      console.log(`  ID: ${product.id}`);
      console.log(`  is_visible: ${product.is_visible}`);
      console.log(`  products.images: ${JSON.stringify(product.images)}`);
      console.log(`  images array length: ${product.images ? product.images.length : 0}`);

      if (product.product_variants && product.product_variants.length > 0) {
        console.log(`  Variants: ${product.product_variants.length}`);
        for (const variant of product.product_variants) {
          console.log(`    - ${variant.color || 'default'}: ${variant.images ? variant.images.length : 0} images`);
          if (variant.images && variant.images.length > 0) {
            console.log(`      First image: ${variant.images[0].substring(0, 80)}...`);
          }
        }
      } else {
        console.log('  No variants found');
      }

      // Check if images is null, empty array, or has content
      if (!product.images || product.images.length === 0) {
        console.log('  🔴 NEEDS FIX: products.images is empty or null');
      } else {
        console.log('  🟢 Has images in products.images field');
        console.log(`    First image: ${product.images[0].substring(0, 80)}...`);
      }

    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }
}

checkProducts().catch(console.error);
