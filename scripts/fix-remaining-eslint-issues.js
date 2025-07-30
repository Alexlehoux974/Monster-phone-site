const fs = require('fs');
const path = require('path');

// Fix parsing errors first
const parsingFixes = [
  {
    file: 'src/app/nos-produits/page.tsx',
    find: `sortByField === 'price' || sortByField === 'price_desc' as const`,
    replace: `sortByField === 'price' || sortByField === 'price_desc'`
  },
  {
    file: 'src/app/nos-produits/page-optimized.tsx',
    find: `sortByField === 'price' || sortByField === 'price_desc' as const`,
    replace: `sortByField === 'price' || sortByField === 'price_desc'`
  },
  {
    file: 'src/app/panier/page.tsx',
    find: `const [, isLoading, error] = useCart();`,
    replace: `const { isLoading, error } = useCart();`
  },
  {
    file: 'src/app/produit/[slug]/layout.tsx',
    // Fix the template literal in the meta description
    find: 'content="Découvrez le ${product?.name || \'produit\'} Monster Phone Boutique La Réunion.',
    replace: 'content={`Découvrez le ${product?.name || \'produit\'} Monster Phone Boutique La Réunion.`}'
  }
];

// Fix ShoppingCart import in MonsterPhoneHero
const componentFixes = [
  {
    file: 'src/components/MonsterPhoneHero.tsx',
    replacements: [
      {
        find: `import { User, Mail, Phone, MapPin, Package, LogOut, ChevronRight, Shield, Calendar } from 'lucide-react';`,
        replace: `import { User, Mail, Phone, MapPin, Package, LogOut, ChevronRight, Shield, Calendar, ShoppingCart } from 'lucide-react';`
      }
    ]
  }
];

// Fix unescaped entities - only the ones actually in the files
const entityFixes = [
  {
    file: 'src/app/services/support/page.tsx',
    entities: [
      { find: `description: 'Pour les réparations ou échanges d'accessoires défectueux'`, replace: `description: 'Pour les réparations ou échanges d\\'accessoires défectueux'` }
    ]
  },
  {
    file: 'src/components/NewsletterSection.tsx',
    entities: [
      { find: `En vous inscrivant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.`, replace: `En vous inscrivant, vous acceptez nos conditions d&apos;utilisation et notre politique de confidentialité.` },
      { find: `Notre newsletter "Monster Deals" arrive chaque semaine avec des offres exclusives !`, replace: `Notre newsletter &quot;Monster Deals&quot; arrive chaque semaine avec des offres exclusives !` }
    ]
  }
];

// Apply parsing fixes
console.log('🔧 Fixing parsing errors...');
parsingFixes.forEach(({file, find, replace}) => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(find)) {
      content = content.replace(find, replace);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed parsing error in ${file}`);
    }
  }
});

// Apply component fixes
console.log('\n🔧 Fixing component imports...');
componentFixes.forEach(({file, replacements}) => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    replacements.forEach(({find, replace}) => {
      if (content.includes(find)) {
        content = content.replace(find, replace);
        changed = true;
        console.log(`✅ Fixed import in ${file}`);
      }
    });
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
});

// Apply entity fixes
console.log('\n🔧 Fixing unescaped entities...');
entityFixes.forEach(({file, entities}) => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    entities.forEach(({find, replace}) => {
      if (content.includes(find)) {
        content = content.replace(find, replace);
        changed = true;
      }
    });
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed entities in ${file}`);
    }
  }
});

console.log('\n✅ All ESLint fixes completed!');