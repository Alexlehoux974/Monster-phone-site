const fs = require('fs');
const path = require('path');

// Fix specific parsing errors based on the actual errors shown
const fixes = [
  {
    file: 'src/app/nos-produits/page.tsx',
    find: `const matchesProduct = selectedProduct === '&apos; || product.name === selectedProduct;`,
    replace: `const matchesProduct = selectedProduct === '' || product.name === selectedProduct;`
  },
  {
    file: 'src/app/nos-produits/page-optimized.tsx',
    find: `const matchesProduct = selectedProduct === '&apos; || product.name === selectedProduct;`,
    replace: `const matchesProduct = selectedProduct === '' || product.name === selectedProduct;`
  },
  {
    file: 'src/app/panier/page.tsx',
    find: `const [, isLoading, error] = useCart();`,
    replace: `const { isLoading, error } = useCart();`
  },
  {
    file: 'src/app/produit/[slug]/layout.tsx',
    find: `'product:category&apos;: product.category,`,
    replace: `'product:category': product.category,`
  },
  {
    file: 'src/app/services/support/page.tsx',
    find: `description: 'Pour les réparations ou échanges d'accessoires défectueux'`,
    replace: `description: 'Pour les réparations ou échanges d\\'accessoires défectueux'`
  },
  {
    file: 'src/components/NewsletterSection.tsx',
    find: `En vous inscrivant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.`,
    replace: `En vous inscrivant, vous acceptez nos conditions d&apos;utilisation et notre politique de confidentialité.`
  },
  {
    file: 'src/components/NewsletterSection.tsx',
    find: `Notre newsletter "Monster Deals" arrive chaque semaine avec des offres exclusives !`,
    replace: `Notre newsletter &quot;Monster Deals&quot; arrive chaque semaine avec des offres exclusives !`
  }
];

// Fix ShoppingCart import in MonsterPhoneHero
const importFix = {
  file: 'src/components/MonsterPhoneHero.tsx',
  find: `import { User, Mail, Phone, MapPin, Package, LogOut, ChevronRight, Shield, Calendar } from 'lucide-react';`,
  replace: `import { User, Mail, Phone, MapPin, Package, LogOut, ChevronRight, Shield, Calendar, ShoppingCart } from 'lucide-react';`
};

// Remove unused import
const unusedImportFix = {
  file: 'src/components/MonsterPhoneHero.tsx',
  find: `import Product from '@/types';`,
  replace: ``
};

// Apply all fixes
console.log('🔧 Fixing remaining ESLint errors...\n');

// Apply general fixes
fixes.forEach(({file, find, replace}) => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(find)) {
      content = content.replace(find, replace);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${file}`);
    } else {
      console.log(`⚠️  Pattern not found in ${file}`);
    }
  } else {
    console.log(`❌ File not found: ${file}`);
  }
});

// Apply import fix
const heroPath = path.join(__dirname, '..', importFix.file);
if (fs.existsSync(heroPath)) {
  let content = fs.readFileSync(heroPath, 'utf8');
  
  // Fix ShoppingCart import
  if (content.includes(importFix.find)) {
    content = content.replace(importFix.find, importFix.replace);
    console.log(`✅ Fixed ShoppingCart import in ${importFix.file}`);
  }
  
  // Remove unused import
  if (content.includes(unusedImportFix.find)) {
    content = content.replace(unusedImportFix.find, unusedImportFix.replace);
    console.log(`✅ Removed unused import in ${unusedImportFix.file}`);
  }
  
  fs.writeFileSync(heroPath, content, 'utf8');
}

console.log('\n✅ All fixes completed!');