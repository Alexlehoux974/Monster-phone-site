// Script to fix ALL visible products missing images
// Copies first image from product_variants to products.images
const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

async function getProductsMissingImages() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/products?select=id,name,images&is_visible=eq.true&order=name`,
    {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      }
    }
  );
  const products = await res.json();

  // Filter products without images
  return products.filter(p => !p.images || p.images.length === 0);
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
  console.log('=== Fixing ALL products missing images ===\n');

  // Get products missing images
  const productsMissing = await getProductsMissingImages();
  console.log(`Found ${productsMissing.length} products without images\n`);

  let success = 0;
  let failed = 0;
  let noVariantImages = [];

  for (const product of productsMissing) {
    // Get variants for this product
    const variants = await getVariantImages(product.id);

    if (!variants || variants.length === 0) {
      console.log(`❌ ${product.name}: No variants found`);
      noVariantImages.push({ name: product.name, id: product.id, reason: 'no variants' });
      failed++;
      continue;
    }

    // Find variant with images (prefer default variant)
    const variantWithImages = variants.find(v => v.images && v.images.length > 0);

    if (!variantWithImages) {
      console.log(`❌ ${product.name}: No variant has images`);
      noVariantImages.push({ name: product.name, id: product.id, reason: 'no variant images' });
      failed++;
      continue;
    }

    // Update product with first image from variant
    const firstImage = variantWithImages.images[0];
    const updated = await updateProductImages(product.id, [firstImage]);

    if (updated) {
      console.log(`✅ ${product.name}`);
      success++;
    } else {
      console.log(`❌ ${product.name}: Update failed`);
      noVariantImages.push({ name: product.name, id: product.id, reason: 'update failed' });
      failed++;
    }

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`✅ Successfully updated: ${success}`);
  console.log(`❌ Failed/No images: ${failed}`);

  if (noVariantImages.length > 0) {
    console.log(`\n=== Products that need manual attention ===`);
    for (const p of noVariantImages) {
      console.log(`- ${p.name} (${p.id}): ${p.reason}`);
    }
  }
}

main().catch(console.error);
