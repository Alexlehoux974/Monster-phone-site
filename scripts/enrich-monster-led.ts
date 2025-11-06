import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Fonction pour générer une description courte intelligente basée sur le nom
function generateLedShortDesc(name: string): string {
  const lower = name.toLowerCase();

  // Extraction des caractéristiques
  const isBasic = lower.includes('basic');
  const isSmart = lower.includes('smart');
  const isSoundReactive = lower.includes('sound reactive') || lower.includes('sound react') || lower.includes('sound flow');
  const isMotionReactive = lower.includes('motion reactive');
  const isFlowTech = lower.includes('flow');
  const isIndoorOutdoor = lower.includes('int/ext') || lower.includes('intext');
  const isIPX6 = lower.includes('ipx6');
  const isRGB = lower.includes('rgb');
  const isRGBW = lower.includes('rgb+w') || lower.includes('rgbw');
  const isRGBIC = lower.includes('rgb+ic') || lower.includes('rgbic') || lower.includes('rgb ic');
  const isNeon = lower.includes('neon');

  // Extraction de la longueur
  let length = '';
  if (lower.includes('30m')) length = '30m';
  else if (lower.includes('2x 5m') || lower.includes('2x5m')) length = '2x5m';
  else if (lower.includes('5m')) length = '5m';
  else if (lower.includes('4m')) length = '4m';
  else if (lower.includes('2m')) length = '2m';

  // Type de produit
  let productType = '';
  if (lower.includes('light strip') || lower.includes('lightstrip')) productType = 'Bande LED';
  else if (lower.includes('light bar')) productType = 'Barres LED';
  else if (lower.includes('beam')) productType = 'Faisceau LED';
  else if (lower.includes('touch light')) productType = 'Lumières tactiles';
  else if (lower.includes('prism')) productType = 'Lumières Prism';
  else if (lower.includes('chroma light')) productType = 'Lumières Chroma';
  else if (lower.includes('monitor light') || lower.includes('monit light')) productType = 'Éclairage moniteur';
  else if (lower.includes('ampoule') || lower.includes('bulb')) productType = 'Ampoule LED';

  // Quantité
  let quantity = '';
  if (lower.includes('x6')) quantity = '6x';
  else if (lower.includes('x3')) quantity = '3x';
  else if (lower.includes('x2') || lower.includes('2x') || lower.includes('pair')) quantity = '2x';

  // Construction de la description
  let parts: string[] = [];

  // Type et quantité
  if (quantity && productType) {
    parts.push(`${quantity} ${productType}`);
  } else if (productType) {
    parts.push(productType);
  }

  // Longueur
  if (length) parts.push(length);

  // Technologie couleur (ordre de priorité: RGBIC > RGBW > RGB)
  if (isRGBIC) parts.push('RGBIC');
  else if (isRGBW) parts.push('RGBW');
  else if (isRGB) parts.push('RGB');
  else if (lower.includes('multicol')) parts.push('Multicolore');

  // Type (Smart/Basic)
  if (isSmart) parts.push('Smart');
  else if (isBasic) parts.push('Basic');

  // Caractéristiques spéciales
  if (isFlowTech && !isSoundReactive) parts.push('Flow');
  if (isSoundReactive) parts.push('réactif son');
  if (isMotionReactive) parts.push('réactif mouvement');
  if (isNeon) parts.push('effet néon');

  // Utilisation
  if (isIndoorOutdoor && isIPX6) parts.push('int/ext IPX6');
  else if (isIndoorOutdoor) parts.push('int/ext');
  else parts.push('intérieur');

  // Si on n'a pas assez d'infos, description générique
  if (parts.length === 0) {
    return 'Éclairage LED MONSTER Illuminescence pour ambiance gaming et créative.';
  }

  return parts.join(', ') + '.';
}

async function enrichMonsterLED() {
  console.log('💡 ENRICHISSEMENT PRODUITS LED MONSTER\n');
  console.log('='.repeat(80));

  // Récupérer la marque MONSTER
  const { data: brand } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%monster%')
    .single();

  if (!brand) {
    console.log('❌ Marque MONSTER introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // Récupérer toutes les catégories LED/RGB/Néon
  const { data: ledCategories } = await supabase
    .from('categories')
    .select('id, name')
    .or('name.ilike.%led%,name.ilike.%rgb%,name.ilike.%néon%,name.ilike.%neon%,name.ilike.%barre led%,name.ilike.%eclairage%,name.ilike.%ampoule%');

  if (!ledCategories || ledCategories.length === 0) {
    console.log('❌ Catégories LED introuvables');
    return;
  }

  console.log(`✅ Catégories trouvées: ${ledCategories.map(c => c.name).join(', ')}\n`);

  const categoryIds = ledCategories.map(c => c.id);

  // Récupérer tous les produits LED MONSTER
  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug, category:categories!products_category_id_fkey(name)')
    .eq('brand_id', brand.id)
    .in('category_id', categoryIds)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit LED MONSTER trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits LED MONSTER à enrichir:\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    // Générer la description automatiquement
    const shortDesc = generateLedShortDesc(product.name);

    console.log(`🔄 ${product.name}`);
    console.log(`   Slug: ${product.url_slug}`);
    console.log(`   Catégorie: ${(product.category as any)?.name || 'N/A'}`);
    console.log(`   📝 Description: "${shortDesc}"`);

    // Mise à jour de la short_description
    const { error } = await supabase
      .from('products')
      .update({ short_description: shortDesc })
      .eq('id', product.id);

    if (error) {
      console.log(`   ❌ Erreur: ${error.message}\n`);
      errorCount++;
    } else {
      console.log(`   ✅ Short description ajoutée\n`);
      successCount++;
    }
  }

  console.log('='.repeat(80));
  console.log(`\n📊 RÉSULTATS:`);
  console.log(`   ✅ Succès: ${successCount}`);
  console.log(`   ❌ Erreurs: ${errorCount}`);
  console.log(`   📦 Total: ${products.length}\n`);
}

enrichMonsterLED();
