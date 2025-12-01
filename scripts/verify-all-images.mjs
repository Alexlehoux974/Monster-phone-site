// Script to verify all visible products have images
const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

async function main() {
  try {
    // Get all visible products
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name,images,is_visible&is_visible=eq.true&order=name`,
      {
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`
        }
      }
    );

    const products = await res.json();

    console.log(`\n=== VERIFICATION: ${products.length} visible products ===\n`);

    let withImages = 0;
    let withoutImages = 0;
    const missing = [];

    for (const p of products) {
      const hasImage = p.images && p.images.length > 0;
      if (hasImage) {
        withImages++;
        console.log(`✅ ${p.name}`);
      } else {
        withoutImages++;
        missing.push(p);
        console.log(`❌ ${p.name} (id: ${p.id})`);
      }
    }

    console.log(`\n=== SUMMARY ===`);
    console.log(`✅ With images: ${withImages}`);
    console.log(`❌ Without images: ${withoutImages}`);

    if (missing.length > 0) {
      console.log(`\n=== PRODUCTS STILL MISSING IMAGES ===`);
      for (const p of missing) {
        console.log(`- ${p.name} (${p.id})`);
      }
    } else {
      console.log(`\n🎉 All visible products have images!`);
    }

  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
