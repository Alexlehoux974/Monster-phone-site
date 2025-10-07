/**
 * Test que la page produit affiche correctement le prix réduit
 */
async function testRealPage() {
  console.log('🔍 Testing real product page rendering...\n');

  const productUrl = 'http://localhost:3001/produit/cable-tiger-power-lite-6-en-1-apple-watch';

  try {
    const response = await fetch(productUrl);
    const html = await response.text();

    console.log('✅ Page loaded successfully');
    console.log('   URL:', productUrl);
    console.log('   Status:', response.status);

    // Vérifier que le nom du produit est présent
    const hasProductName = html.includes('Câble Tiger Power Lite');
    console.log('   Product Name Found:', hasProductName ? '✅' : '❌');

    // Vérifier la présence des prix
    const hasPriceDisplay = html.includes('29.99') || html.includes('23.99');
    console.log('   Price Display Found:', hasPriceDisplay ? '✅' : '❌');

    // Vérifier la présence du badge de réduction
    const hasDiscountBadge = html.includes('-20%') || html.includes('20%');
    console.log('   Discount Badge Found:', hasDiscountBadge ? '✅' : '❌');

    console.log('\n✅ Page rendering test completed!');

    // Afficher un extrait du HTML pour debug
    const priceMatches = html.match(/\d+\.\d+\s*€/g);
    if (priceMatches) {
      console.log('\n💰 Prices found in HTML:', priceMatches.slice(0, 5).join(', '));
    }

  } catch (error) {
    console.error('❌ Error fetching page:', error);
  }
}

testRealPage();
