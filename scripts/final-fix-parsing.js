const fs = require('fs');
const path = require('path');

function fixSpecificLine(filePath, lineNumber, searchText, replaceText) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  if (lineNumber > 0 && lineNumber <= lines.length) {
    if (lines[lineNumber - 1].includes(searchText)) {
      lines[lineNumber - 1] = lines[lineNumber - 1].replace(searchText, replaceText);
      fs.writeFileSync(filePath, lines.join('\n'));
      console.log(`✓ Fixed ${path.basename(filePath)} line ${lineNumber}`);
      return true;
    }
  }
  return false;
}

const basePath = path.join(__dirname, '..');

console.log('🔧 Final parsing fixes...\n');

// Fix accessoires page - line 15
const accessoiresPath = path.join(basePath, 'src/app/accessoires/page.tsx');
const accessoiresContent = fs.readFileSync(accessoiresPath, 'utf8');
const accessoiresFixed = accessoiresContent.replace(
  /const \[selectedCategory, setSelectedCategory\] = useState<string>\(&apos;&apos;\);/g,
  "const [selectedCategory, setSelectedCategory] = useState<string>('');"
);
fs.writeFileSync(accessoiresPath, accessoiresFixed);
console.log('✓ Fixed accessoires/page.tsx');

// Fix compte page - line 325
fixSpecificLine(
  path.join(basePath, 'src/app/compte/page.tsx'),
  325,
  "const newOrder = orders.find(o => o.id === 'CMD002&apos;);",
  "const newOrder = orders.find(o => o.id === 'CMD002');"
);

// Fix nos-produits pages
const nosProduits1 = path.join(basePath, 'src/app/nos-produits/page.tsx');
const nosProduits2 = path.join(basePath, 'src/app/nos-produits/page-optimized.tsx');

[nosProduits1, nosProduits2].forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const fixed = content.replace(
      /const \[selectedCategory, setSelectedCategory\] = useState<string>\(&apos;&apos;\);/g,
      "const [selectedCategory, setSelectedCategory] = useState<string>('');"
    );
    fs.writeFileSync(file, fixed);
    console.log(`✓ Fixed ${path.basename(file)}`);
  }
});

// Fix panier page - line 87
fixSpecificLine(
  path.join(basePath, 'src/app/panier/page.tsx'),
  87,
  "const price = parseFloat(item.product.price?.replace('€', '') || '0&apos;);",
  "const price = parseFloat(item.product.price?.replace('€', '') || '0');"
);

// Fix produit layout - line 55
fixSpecificLine(
  path.join(basePath, 'src/app/produit/[slug]/layout.tsx'),
  55,
  "urlSlug === params.slug || product.id === 'recxxx&apos;);",
  "urlSlug === params.slug || product.id === 'recxxx');"
);

// Remove unused imports
console.log('\n🔧 Removing unused imports...\n');

// Fix promotions page
const promotionsPath = path.join(basePath, 'src/app/promotions/page.tsx');
let promotionsContent = fs.readFileSync(promotionsPath, 'utf8');
promotionsContent = promotionsContent.replace(
  "import { Product, allProducts, type } from '@/data/products';",
  "import { allProducts } from '@/data/products';"
);
fs.writeFileSync(promotionsPath, promotionsContent);
console.log('✓ Fixed promotions/page.tsx imports');

// Fix Header.tsx
const headerPath = path.join(basePath, 'src/components/Header.tsx');
let headerContent = fs.readFileSync(headerPath, 'utf8');
headerContent = headerContent.replace(
  "import { useAuth } from '@/contexts/AuthContext';",
  "// import { useAuth } from '@/contexts/AuthContext';"
);
fs.writeFileSync(headerPath, headerContent);
console.log('✓ Fixed Header.tsx imports');

// Fix MonsterPhoneHero.tsx
const heroPath = path.join(basePath, 'src/components/MonsterPhoneHero.tsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');
// Remove unused imports
heroContent = heroContent
  .replace('import { motion, useScroll, useTransform } from "framer-motion";', 'import { motion } from "framer-motion";')
  .replace('import { ChevronRight, Star, Headphones, Shield, Zap } from "lucide-react";', 'import { ChevronRight } from "lucide-react";')
  .replace('import { Card, CardContent } from "@/components/ui/card";', '// import { Card, CardContent } from "@/components/ui/card";')
  .replace('import { Badge } from "@/components/ui/badge";', '// import { Badge } from "@/components/ui/badge";')
  .replace('import { Product } from "@/data/products";', '// import { Product } from "@/data/products";');

fs.writeFileSync(heroPath, heroContent);
console.log('✓ Fixed MonsterPhoneHero.tsx imports');

console.log('\n✅ All parsing fixes applied!');