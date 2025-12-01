// Script to update products.images for remaining 5 products
const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const productsToUpdate = [
  { id: '6a5acd4b-798c-4ce9-b437-bce52bb24c50', name: 'HONOR X6C 6+' },
  { id: '3801608a-361d-4933-8d10-edb232d63c74', name: 'MONSTER ILLUMINESCENCE SMART CHROMA' },
  { id: '26f75f19-cf80-451b-8b9c-5819ab452170', name: 'CABLE RETRACTABLE USB C 3 EN 1' },
  { id: '755b5dac-d6f5-493d-a4a0-5d641646c1d9', name: 'CABLE TIGER POWER LITE 6 EN 1' },
  { id: '631855e7-d479-46b1-bf61-9a43e6e9ec43', name: 'ROULEAUX PAPIER PHOTO' }
];

async function updateProduct(product) {
  try {
    // Get variants for this product
    const variantsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/product_variants?product_id=eq.${product.id}&select=id,images,is_default`,
      {
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`
        }
      }
    );

    const variants = await variantsRes.json();

    if (!variants || variants.length === 0) {
      console.log(`❌ ${product.name}: No variants found`);
      return false;
    }

    // Find first variant with images
    const variantWithImages = variants.find(v => v.images && v.images.length > 0);

    if (!variantWithImages) {
      console.log(`❌ ${product.name}: No variant has images`);
      return false;
    }

    const firstImage = variantWithImages.images[0];
    console.log(`📷 ${product.name}: Found image ${firstImage.substring(0, 50)}...`);

    // Update product.images
    const updateRes = await fetch(
      `${SUPABASE_URL}/rest/v1/products?id=eq.${product.id}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ images: [firstImage] })
      }
    );

    if (updateRes.status === 204) {
      console.log(`✅ ${product.name}: Updated successfully`);
      return true;
    } else {
      const error = await updateRes.text();
      console.log(`❌ ${product.name}: Update failed - ${updateRes.status} ${error}`);
      return false;
    }
  } catch (err) {
    console.log(`❌ ${product.name}: Error - ${err.message}`);
    return false;
  }
}

async function main() {
  console.log('Starting update of remaining 5 products...\n');

  let success = 0;
  let failed = 0;

  for (const product of productsToUpdate) {
    const result = await updateProduct(product);
    if (result) success++;
    else failed++;
  }

  console.log(`\n=== Summary ===`);
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);
}

main();
