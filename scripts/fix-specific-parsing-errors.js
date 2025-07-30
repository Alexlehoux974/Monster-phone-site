const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '..');

console.log('🔧 Fixing specific parsing errors...\n');

// Fix accessoires/page.tsx line 15
const accessoiresPath = path.join(basePath, 'src/app/accessoires/page.tsx');
let accessoiresContent = fs.readFileSync(accessoiresPath, 'utf8');
accessoiresContent = accessoiresContent.replace(
  "const [selectedProduct, setSelectedProduct] = useState<string>(&apos;&apos;);",
  "const [selectedProduct, setSelectedProduct] = useState<string>('');"
);
fs.writeFileSync(accessoiresPath, accessoiresContent);
console.log('✓ Fixed accessoires/page.tsx line 15');

// Fix compte/page.tsx line 325
const comptePath = path.join(basePath, 'src/app/compte/page.tsx');
let compteContent = fs.readFileSync(comptePath, 'utf8');
compteContent = compteContent.replace(
  "const newOrder = orders.find(o => o.id === 'CMD002&apos;);",
  "const newOrder = orders.find(o => o.id === 'CMD002');"
);
fs.writeFileSync(comptePath, compteContent);
console.log('✓ Fixed compte/page.tsx line 325');

// Fix nos-produits/page.tsx and page-optimized.tsx line 15
['src/app/nos-produits/page.tsx', 'src/app/nos-produits/page-optimized.tsx'].forEach(file => {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(
      "const [selectedProduct, setSelectedProduct] = useState<string>(&apos;&apos;);",
      "const [selectedProduct, setSelectedProduct] = useState<string>('');"
    );
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed ${file} line 15`);
  }
});

// Fix panier/page.tsx line 87
const panierPath = path.join(basePath, 'src/app/panier/page.tsx');
let panierContent = fs.readFileSync(panierPath, 'utf8');
panierContent = panierContent.replace(
  "const price = parseFloat(item.product.price?.replace('€', '') || '0&apos;);",
  "const price = parseFloat(item.product.price?.replace('€', '') || '0');"
);
fs.writeFileSync(panierPath, panierContent);
console.log('✓ Fixed panier/page.tsx line 87');

// Fix produit/[slug]/layout.tsx line 55
const layoutPath = path.join(basePath, 'src/app/produit/[slug]/layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');
layoutContent = layoutContent.replace(
  "urlSlug === params.slug || product.id === 'recxxx&apos;);",
  "urlSlug === params.slug || product.id === 'recxxx');"
);
fs.writeFileSync(layoutPath, layoutContent);
console.log('✓ Fixed produit/[slug]/layout.tsx line 55');

// Fix service-apres-vente/page.tsx - find the exact line with fabricants.join
const savPath = path.join(basePath, 'src/app/services/service-apres-vente/page.tsx');
if (fs.existsSync(savPath)) {
  let savContent = fs.readFileSync(savPath, 'utf8');
  // Look for any join with escaped quotes
  savContent = savContent.replace(/\.join\(&apos;, &apos;\)/g, ".join(', ')");
  fs.writeFileSync(savPath, savContent);
  console.log('✓ Fixed service-apres-vente/page.tsx');
}

// Fix MonsterPhoneHero imports that weren't removed properly
const heroPath = path.join(basePath, 'src/components/MonsterPhoneHero.tsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');
// Check if imports still exist and remove them more thoroughly
const lines = heroContent.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('import') && lines[i].includes('framer-motion') && 
      (lines[i].includes('useScroll') || lines[i].includes('useTransform'))) {
    lines[i] = 'import { motion } from "framer-motion";';
  }
  if (lines[i].includes('import') && lines[i].includes('lucide-react') && 
      (lines[i].includes('Star') || lines[i].includes('Headphones') || 
       lines[i].includes('Shield') || lines[i].includes('Zap'))) {
    lines[i] = 'import { ChevronRight } from "lucide-react";';
  }
  if (lines[i].includes('import') && lines[i].includes('Card') && lines[i].includes('@/components/ui/card')) {
    lines[i] = '// ' + lines[i];
  }
  if (lines[i].includes('import') && lines[i].includes('Product') && lines[i].includes('@/data/products')) {
    lines[i] = '// ' + lines[i];
  }
}
fs.writeFileSync(heroPath, lines.join('\n'));
console.log('✓ Fixed MonsterPhoneHero.tsx imports');

// Fix promotions import - remove Product type
const promotionsPath = path.join(basePath, 'src/app/promotions/page.tsx');
let promotionsContent = fs.readFileSync(promotionsPath, 'utf8');
promotionsContent = promotionsContent.replace(
  /import\s*\{[^}]*Product[^}]*\}\s*from\s*['"]@\/data\/products['"]/,
  "import { allProducts } from '@/data/products'"
);
fs.writeFileSync(promotionsPath, promotionsContent);
console.log('✓ Fixed promotions/page.tsx imports');

console.log('\n✅ All specific parsing errors fixed!');