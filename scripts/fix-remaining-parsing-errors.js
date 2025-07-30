const fs = require('fs');
const path = require('path');

// Fonction pour corriger un fichier
function fixFile(filePath, fixes) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = content;
  
  // Appliquer les corrections dans l'ordre
  fixes.forEach(fix => {
    if (fix.regex) {
      fixed = fixed.replace(fix.regex, fix.replace);
    } else if (fix.line && fix.find) {
      const lines = fixed.split('\n');
      if (lines[fix.line - 1] && lines[fix.line - 1].includes(fix.find)) {
        lines[fix.line - 1] = lines[fix.line - 1].replace(fix.find, fix.replace);
        fixed = lines.join('\n');
      }
    } else if (fix.find) {
      fixed = fixed.replace(fix.find, fix.replace);
    }
  });
  
  if (content !== fixed) {
    fs.writeFileSync(filePath, fixed);
    console.log(`✓ Fixed ${path.basename(filePath)}`);
  }
}

const basePath = path.join(__dirname, '..');

// Corrections ciblées pour chaque fichier
const filesToFix = [
  {
    file: 'src/app/accessoires/page.tsx',
    fixes: [
      { line: 14, find: "useState<string>(&apos;&apos;);", replace: "useState<string>('');" }
    ]
  },
  {
    file: 'src/app/compte/page.tsx',
    fixes: [
      { line: 325, find: "const newOrder = orders.find(o => o.id === 'CMD002&apos;);", replace: "const newOrder = orders.find(o => o.id === 'CMD002');" }
    ]
  },
  {
    file: 'src/app/contact/page.tsx',
    fixes: [
      { line: 292, find: "s'il vous plaît", replace: "s&apos;il vous plaît" },
      { line: 350, find: "l'envoi", replace: "l&apos;envoi" }
    ]
  },
  {
    file: 'src/app/legal/conditions-generales/page.tsx',
    fixes: [
      { line: 159, find: 'Conditions relatives au contenu "propriété intellectuelle"', replace: 'Conditions relatives au contenu &quot;propriété intellectuelle&quot;' },
      { line: 159, find: "s'engager", replace: "s&apos;engager" }
    ]
  },
  {
    file: 'src/app/legal/confidentialite/page.tsx',
    fixes: [
      { line: 235, find: "l'amélioration", replace: "l&apos;amélioration" }
    ]
  },
  {
    file: 'src/app/legal/mentions-legales/page.tsx',
    fixes: [
      { line: 172, find: 'Les "cookies" ou "témoins de connexion" sont', replace: 'Les &quot;cookies&quot; ou &quot;témoins de connexion&quot; sont' },
      { line: 188, find: 'Le "site"', replace: 'Le &quot;site&quot;' },
      { regex: /l'éditeur et l'utilisateur s'engage/g, replace: "l&apos;éditeur et l&apos;utilisateur s&apos;engage" }
    ]
  },
  {
    file: 'src/app/nos-produits/page-optimized.tsx',
    fixes: [
      { line: 14, find: "useState<string>(&apos;&apos;);", replace: "useState<string>('');" }
    ]
  },
  {
    file: 'src/app/nos-produits/page.tsx',
    fixes: [
      { line: 14, find: "useState<string>(&apos;&apos;);", replace: "useState<string>('');" }
    ]
  },
  {
    file: 'src/app/panier/page.tsx',
    fixes: [
      { line: 87, find: "const price = parseFloat(item.product.price?.replace('€', '') || '0&apos;);", replace: "const price = parseFloat(item.product.price?.replace('€', '') || '0');" }
    ]
  },
  {
    file: 'src/app/produit/[slug]/layout.tsx',
    fixes: [
      { line: 55, find: "urlSlug === params.slug || product.id === 'recxxx&apos;);", replace: "urlSlug === params.slug || product.id === 'recxxx');" }
    ]
  },
  {
    file: 'src/app/services/service-apres-vente/page.tsx',
    fixes: [
      { line: 287, find: "fabricants.join(', ')", replace: "fabricants.join(', ')" }
    ]
  },
  {
    file: 'src/app/services/support/page.tsx',
    fixes: [
      { line: 33, find: "Qu'est-ce que", replace: "Qu&apos;est-ce que" }
    ]
  },
  {
    file: 'src/app/services/support-technique/page.tsx',
    fixes: [
      { line: 98, find: 'response: "< 30 secondes"', replace: 'response: "< 30 secondes"' }
    ]
  },
  {
    file: 'src/components/NewsletterSection.tsx',
    fixes: [
      { line: 271, find: "C'est un moyen simple de recevoir nos offres exclusives", replace: "C&apos;est un moyen simple de recevoir nos offres exclusives" },
      { line: 271, find: "d'être informé", replace: "d&apos;être informé" },
      { line: 339, find: '"les tendances gaming"', replace: '&quot;les tendances gaming&quot;' }
    ]
  }
];

// Corriger les variables non utilisées
const unusedVarsFixes = [
  {
    file: 'src/app/promotions/page.tsx',
    fixes: [
      { regex: /import\s+\{[^}]*,?\s*type\s*,?[^}]*\}\s+from\s+['"]@\/data\/products['"];?/g, replace: "import { Product, allProducts } from '@/data/products';" }
    ]
  },
  {
    file: 'src/components/FeaturedProducts.tsx',
    fixes: [
      { find: ".map((product, index) =>", replace: ".map((product) =>" }
    ]
  },
  {
    file: 'src/components/TrustSection.tsx',
    fixes: [
      { find: "}, []);", replace: "}, [animateNumbers]);" }
    ]
  }
];

// Appliquer toutes les corrections
console.log('🔧 Fixing parsing errors...\n');
filesToFix.forEach(({ file, fixes }) => {
  const fullPath = path.join(basePath, file);
  fixFile(fullPath, fixes);
});

console.log('\n🔧 Fixing unused variables warnings...\n');
unusedVarsFixes.forEach(({ file, fixes }) => {
  const fullPath = path.join(basePath, file);
  fixFile(fullPath, fixes);
});

console.log('\n✅ All fixes applied!');