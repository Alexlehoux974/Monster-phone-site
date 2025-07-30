const fs = require('fs');
const path = require('path');

// Fix remaining errors
const fixes = [
  {
    file: 'src/app/panier/page.tsx',
    find: `<h1 className="text-3xl font-bold mb-8">Mon Panier ({items.length} article{items.length > 1 ? &apos;s&apos; : &apos;&apos;})</h1>`,
    replace: `<h1 className="text-3xl font-bold mb-8">Mon Panier ({items.length} article{items.length > 1 ? 's' : ''})</h1>`
  },
  {
    file: 'src/app/services/support/page.tsx',
    find: `Besoin d'aide avec vos appareils ? Notre équipe technique à La Réunion`,
    replace: `Besoin d&apos;aide avec vos appareils ? Notre équipe technique à La Réunion`
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
  },
  {
    file: 'src/components/TrustSection.tsx',
    find: `}, []);`,
    replace: `}, [animateNumbers]);`
  }
];

// Fix MonsterPhoneHero imports and unused variables
const heroFixes = [
  {
    file: 'src/components/MonsterPhoneHero.tsx',
    imports: {
      find: `import { User, Mail, Phone, MapPin, Package, LogOut, ChevronRight, Shield, Calendar } from 'lucide-react';`,
      replace: `import { User, Mail, Phone, MapPin, Package, LogOut, ChevronRight, Shield, Calendar, ShoppingCart } from 'lucide-react';`
    },
    unusedImport: {
      find: `import Product from '@/types';`,
      replace: ``
    }
  }
];

// Apply fixes
console.log('🔧 Fixing last ESLint errors...\n');

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
  }
});

// Fix MonsterPhoneHero
heroFixes.forEach(({file, imports, unusedImport}) => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Fix ShoppingCart import
    if (imports && content.includes(imports.find)) {
      content = content.replace(imports.find, imports.replace);
      changed = true;
      console.log(`✅ Fixed ShoppingCart import in ${file}`);
    }
    
    // Remove unused import
    if (unusedImport && content.includes(unusedImport.find)) {
      // Remove the entire line including newline
      content = content.replace(unusedImport.find + '\n', '');
      changed = true;
      console.log(`✅ Removed unused import in ${file}`);
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
});

console.log('\n✅ All fixes completed!');