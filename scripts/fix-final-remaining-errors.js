const fs = require('fs');
const path = require('path');

// Fix remaining errors
const fixes = [
  {
    file: 'src/components/NewsletterSection.tsx',
    find: `                    ✅ J'accepte de recevoir les offres VIP Monster Phone et j'ai lu la{' '}`,
    replace: `                    ✅ J&apos;accepte de recevoir les offres VIP Monster Phone et j&apos;ai lu la{' '}`
  },
  {
    file: 'src/components/NewsletterSection.tsx',
    find: `                    "Meilleur site tech de la Réunion ! Livraison ultra rapide 🚀"`,
    replace: `                    &quot;Meilleur site tech de la Réunion ! Livraison ultra rapide 🚀&quot;`
  }
];

// Fix TrustSection - move animateNumbers to useCallback
const trustSectionFix = {
  file: 'src/components/TrustSection.tsx',
  find: `'use client';
import { useState, useEffect, useRef } from 'react';`,
  replace: `'use client';
import { useState, useEffect, useRef, useCallback } from 'react';`
};

// Fix MonsterPhoneHero imports
const heroFix = {
  file: 'src/components/MonsterPhoneHero.tsx',
  fixes: [
    {
      find: `import { User, Mail, Phone, MapPin, Package, LogOut, ChevronRight, Shield, Calendar } from 'lucide-react';`,
      replace: `import { User, Mail, Phone, MapPin, Package, LogOut, ChevronRight, Shield, Calendar, ShoppingCart } from 'lucide-react';`
    },
    {
      find: `import Product from '@/types';\n`,
      replace: ``
    },
    {
      find: `import Product from '@/types';`,
      replace: ``
    }
  ]
};

// Apply fixes
console.log('🔧 Fixing final remaining ESLint errors...\n');

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

// Fix TrustSection import
const trustPath = path.join(__dirname, '..', trustSectionFix.file);
if (fs.existsSync(trustPath)) {
  let content = fs.readFileSync(trustPath, 'utf8');
  
  // Add useCallback import
  if (content.includes(trustSectionFix.find)) {
    content = content.replace(trustSectionFix.find, trustSectionFix.replace);
  }
  
  // Wrap animateNumbers in useCallback
  content = content.replace(
    `  const animateNumbers = () => {`,
    `  const animateNumbers = useCallback(() => {`
  );
  
  // Find the end of animateNumbers function and add the dependency array
  const animateEnd = content.indexOf('    }, stepDuration);');
  if (animateEnd !== -1) {
    const endIndex = content.indexOf('  };', animateEnd);
    if (endIndex !== -1) {
      content = content.slice(0, endIndex + 4) + ', [finalStats]);' + content.slice(endIndex + 4);
    }
  }
  
  // Update useEffect dependency
  content = content.replace(
    `}, [isVisible]);`,
    `}, [isVisible, animateNumbers]);`
  );
  
  fs.writeFileSync(trustPath, content, 'utf8');
  console.log('✅ Fixed TrustSection hooks');
}

// Fix MonsterPhoneHero
const heroPath = path.join(__dirname, '..', heroFix.file);
if (fs.existsSync(heroPath)) {
  let content = fs.readFileSync(heroPath, 'utf8');
  let changed = false;
  
  heroFix.fixes.forEach(({find, replace}) => {
    if (content.includes(find)) {
      content = content.replace(find, replace);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(heroPath, content, 'utf8');
    console.log('✅ Fixed MonsterPhoneHero imports');
  }
}

console.log('\n✅ All fixes completed!');