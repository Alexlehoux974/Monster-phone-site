// Script to fix 16 specific products missing images
// Copies first image from product_variants to products.images
const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

// The 16 products to fix (exact names from user)
const PRODUCTS_TO_FIX = [
  'HONOR PAD 9 WIFI 8+',
  'MONSTER ELEMENT AIR',
  'PARTYBOX HIFUTURE MUSICBOX',
  'CHARGEUR SANS FILS MY WAY 15W MAGSAFE DONUTS',
  'MONSTER CABLE TYPE C VERS HDMI 4K 2M',
  'CABLE LUMINEUX MY WAY USB A - USB C',
  'MONSTER CHAMPION AIRLINKS',
  'MONSTER PERSONA SE ANC',
  'MONSTER MISSION 100',
  'MONSTER ILLUMINESCENCE BASIC LIGHT STRIP 2X 5M RGB+W SOUND REACTIVE INT',
  'MONSTER BLASTER MICRO',
  'MONSTER CABLE ESSENTIAL FIBRE OPTIQUE 3M',
  'MONSTER ILLUMINESCENCE BASIC LED TOUCH LIGHT X3 RGB INT',
  'MONSTER CABLE ESSENTIAL FIBRE OPTIQUE 1M5',
  'MONSTER ILLUMINESCENCE BASIC LED LIGHT BAR PAIR RGB INT',
  'POWERBANK MYWAY 10K MAH'
];

async function getProductByName(name) {
  // Use ilike for case-insensitive partial match
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/products?select=id,name,images&name=ilike.*${encodeURIComponent(name)}*`,
    {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      }
    }
  );
  const products = await res.json();
  // Find exact match first, or closest match
  return products.find(p => p.name.toUpperCase().includes(name.toUpperCase())) || products[0];
}

async function getVariantImages(productId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/product_variants?product_id=eq.${productId}&select=id,images,is_default&order=is_default.desc`,
    {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      }
    }
  );
  return await res.json();
}

async function updateProductImages(productId, images) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/products?id=eq.${productId}`,
    {
      method: 'PATCH',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ images })
    }
  );
  return res.status === 204;
}

async function main() {
  console.log('=== Fixing 16 specific products ===\n');

  let success = 0;
  let failed = 0;
  let skipped = 0;
  const issues = [];

  for (const productName of PRODUCTS_TO_FIX) {
    console.log(`\nProcessing: ${productName}`);

    // Find product
    const product = await getProductByName(productName);

    if (!product) {
      console.log(`  ❌ Product not found`);
      issues.push({ name: productName, reason: 'not found' });
      failed++;
      continue;
    }

    console.log(`  Found: ${product.name} (${product.id})`);

    // Check if already has images
    if (product.images && product.images.length > 0) {
      console.log(`  ⏭️ Already has ${product.images.length} image(s), skipping`);
      skipped++;
      continue;
    }

    // Get variants
    const variants = await getVariantImages(product.id);

    if (!variants || variants.length === 0) {
      console.log(`  ❌ No variants found`);
      issues.push({ name: product.name, id: product.id, reason: 'no variants' });
      failed++;
      continue;
    }

    // Find variant with images
    const variantWithImages = variants.find(v => v.images && v.images.length > 0);

    if (!variantWithImages) {
      console.log(`  ❌ No variant has images`);
      issues.push({ name: product.name, id: product.id, reason: 'no variant images' });
      failed++;
      continue;
    }

    // Update product with first image from variant
    const firstImage = variantWithImages.images[0];
    console.log(`  Updating with image: ${firstImage.substring(0, 60)}...`);

    const updated = await updateProductImages(product.id, [firstImage]);

    if (updated) {
      console.log(`  ✅ Updated successfully`);
      success++;
    } else {
      console.log(`  ❌ Update failed`);
      issues.push({ name: product.name, id: product.id, reason: 'update failed' });
      failed++;
    }

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`✅ Successfully updated: ${success}`);
  console.log(`⏭️ Skipped (already has images): ${skipped}`);
  console.log(`❌ Failed: ${failed}`);

  if (issues.length > 0) {
    console.log(`\n=== Products that need attention ===`);
    for (const p of issues) {
      console.log(`- ${p.name}${p.id ? ` (${p.id})` : ''}: ${p.reason}`);
    }
  }
}

main().catch(console.error);
