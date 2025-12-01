// Script to FORCE UPDATE the 9 products that have WRONG images
// Replace products.images with CORRECT images from product_variants.images
const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const PRODUCTS_TO_FIX = [
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

async function forceFixProducts() {
  console.log('=== FORCE FIXING 9 Products with WRONG Images ===\n');

  let fixed = 0;
  let failed = 0;

  for (const productName of PRODUCTS_TO_FIX) {
    console.log(`\n--- ${productName} ---`);

    // 1. Get product and its variants
    const encodedName = encodeURIComponent(productName);
    const getUrl = `${SUPABASE_URL}/rest/v1/products?name=eq.${encodedName}&select=id,name,images,product_variants(id,color,images,is_default)`;

    try {
      const getResponse = await fetch(getUrl, {
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`
        }
      });

      const data = await getResponse.json();

      if (data.length === 0) {
        console.log('  ❌ Product NOT FOUND');
        failed++;
        continue;
      }

      const product = data[0];
      console.log(`  ID: ${product.id}`);
      console.log(`  Current products.images: ${product.images ? product.images.length : 0} images`);
      if (product.images && product.images.length > 0) {
        console.log(`    WRONG image: ${product.images[0].substring(0, 60)}...`);
      }

      // 2. Find the best variant images (prefer is_default=true or first with images)
      let correctImages = null;

      if (product.product_variants && product.product_variants.length > 0) {
        // First try to find the default variant with images
        const defaultVariant = product.product_variants.find(v => v.is_default && v.images && v.images.length > 0);
        if (defaultVariant) {
          correctImages = defaultVariant.images;
          console.log(`  Found default variant (${defaultVariant.color || 'default'}) with ${correctImages.length} images`);
        } else {
          // Otherwise find any variant with images
          const variantWithImages = product.product_variants.find(v => v.images && v.images.length > 0);
          if (variantWithImages) {
            correctImages = variantWithImages.images;
            console.log(`  Found variant (${variantWithImages.color || 'any'}) with ${correctImages.length} images`);
          }
        }
      }

      if (!correctImages || correctImages.length === 0) {
        console.log('  ❌ NO variant images found to copy');
        failed++;
        continue;
      }

      console.log(`  CORRECT image: ${correctImages[0].substring(0, 60)}...`);

      // 3. FORCE UPDATE products.images with correct images
      const updateUrl = `${SUPABASE_URL}/rest/v1/products?id=eq.${product.id}`;
      const updateResponse = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          images: correctImages
        })
      });

      if (updateResponse.ok) {
        console.log(`  ✅ FIXED! Updated with ${correctImages.length} correct images`);
        fixed++;
      } else {
        const errorText = await updateResponse.text();
        console.log(`  ❌ UPDATE FAILED: ${updateResponse.status} - ${errorText}`);
        failed++;
      }

    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
      failed++;
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`✅ Fixed: ${fixed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Total: ${PRODUCTS_TO_FIX.length}`);
}

forceFixProducts().catch(console.error);
