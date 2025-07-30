const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fonction pour corriger les erreurs restantes
function fixRemainingErrors(content, filePath) {
  let fixed = content;
  const fileName = path.basename(filePath);
  
  // Corrections spécifiques par fichier
  const fileSpecificFixes = {
    'compte/page.tsx': {
      patterns: [
        { find: /const newOrder = orders\.find\(o => o\.id === 'CMD002&apos;\);/g, replace: "const newOrder = orders.find(o => o.id === 'CMD002');" }
      ]
    },
    'contact/page.tsx': {
      patterns: [
        { find: /aujourd'hui/g, replace: "aujourd&apos;hui" }
      ]
    },
    'conditions-generales/page.tsx': {
      patterns: [
        { find: /l'acceptation/g, replace: "l&apos;acceptation" },
        { find: /l'utilisation/g, replace: "l&apos;utilisation" },
        { find: /"propriété intellectuelle"/g, replace: "&quot;propriété intellectuelle&quot;" },
        { find: /s'engager/g, replace: "s&apos;engager" }
      ]
    },
    'confidentialite/page.tsx': {
      patterns: [
        { find: /l'amélioration/g, replace: "l&apos;amélioration" }
      ]
    },
    'mentions-legales/page.tsx': {
      patterns: [
        { find: /"cookies"/g, replace: "&quot;cookies&quot;" },
        { find: /"site"/g, replace: "&quot;site&quot;" },
        { find: /l'éditeur/g, replace: "l&apos;éditeur" },
        { find: /l'utilisateur/g, replace: "l&apos;utilisateur" },
        { find: /s'engage/g, replace: "s&apos;engage" }
      ]
    },
    'page-optimized.tsx': {
      patterns: [
        { find: /useState<string>\('&apos;\);/g, replace: "useState<string>('');" }
      ]
    },
    'nos-produits/page.tsx': {
      patterns: [
        { find: /useState<string>\('&apos;'\);/g, replace: "useState<string>('');" }
      ]
    },
    'layout.tsx': {
      patterns: [
        { find: /urlSlug === params\.slug \|\| product\.id === 'recxxx'\);/g, replace: "urlSlug === params.slug || product.id === 'recxxx');" }
      ]
    },
    'service-apres-vente/page.tsx': {
      patterns: [
        { find: /jusqu'à/g, replace: "jusqu&apos;à" }
      ]
    },
    'support/page.tsx': {
      patterns: [
        { find: /Qu'est-ce que/g, replace: "Qu&apos;est-ce que" }
      ]
    },
    'support-technique/page.tsx': {
      patterns: [
        { find: /Mon téléphone ne s&apos;allume plus/g, replace: "Mon téléphone ne s'allume plus" }
      ]
    },
    'NewsletterSection.tsx': {
      patterns: [
        { find: /d'abonnement/g, replace: "d&apos;abonnement" },
        { find: /aujourd'hui/g, replace: "aujourd&apos;hui" },
        { find: /"Bienvenue dans la famille Monster Phone !"/g, replace: "&quot;Bienvenue dans la famille Monster Phone !&quot;" }
      ]
    }
  };

  // Appliquer les corrections spécifiques au fichier
  Object.keys(fileSpecificFixes).forEach(key => {
    if (filePath.includes(key)) {
      const fixes = fileSpecificFixes[key];
      if (fixes.patterns) {
        fixes.patterns.forEach(pattern => {
          fixed = fixed.replace(pattern.find, pattern.replace);
        });
      }
    }
  });

  // Corrections générales pour les apostrophes et guillemets dans JSX
  // Éviter de toucher aux apostrophes déjà échappées
  const lines = fixed.split('\n');
  const fixedLines = lines.map((line, index) => {
    // Détecter si on est dans du JSX (entre > et <)
    if (line.includes('>') && line.includes('<')) {
      let inJSX = false;
      let result = '';
      let i = 0;
      
      while (i < line.length) {
        if (line[i] === '>' && i + 1 < line.length && line[i + 1] !== ' ') {
          inJSX = true;
        } else if (line[i] === '<' && inJSX) {
          inJSX = false;
        }
        
        if (inJSX && line[i] === "'" && 
            !(i > 0 && line.substring(i - 5, i) === '&apos') &&
            !(i > 0 && line.substring(i - 5, i) === '&#39;')) {
          result += '&apos;';
        } else if (inJSX && line[i] === '"' && 
                   !(i > 0 && line.substring(i - 5, i) === '&quot') &&
                   !(i > 0 && line.substring(i - 5, i) === '&#34;')) {
          result += '&quot;';
        } else {
          result += line[i];
        }
        i++;
      }
      return result;
    }
    return line;
  });

  return fixedLines.join('\n');
}

// Fonction pour supprimer les imports non utilisés
function removeUnusedImports(content, filePath) {
  const fileName = path.basename(filePath);
  
  const unusedImports = {
    'mentions-legales/page.tsx': ['Mail'],
    'plan-du-site/page.tsx': ['Watch'],
    'promotions/page.tsx': ['Tag', 'Product'],
    'livraison/page.tsx': ['Button'],
    'retours/page.tsx': ['Badge'],
    'retours-30-jours/page.tsx': ['Truck'],
    'sav/page.tsx': ['Button', 'Badge'],
    'FeaturedProducts.tsx': ['Product'],
    'Header.tsx': ['hoveredSubcategory', 'setHoveredSubcategory', 'isScrolled', 'isAuthenticated'],
    'MonsterPhoneHero.tsx': ['ContainerScroll', 'ProductCard', 'products'],
    'ProductCard.tsx': ['Package'],
    'useProductSuggestions.ts': ['Product']
  };

  Object.keys(unusedImports).forEach(key => {
    if (filePath.includes(key)) {
      const imports = unusedImports[key];
      imports.forEach(importName => {
        // Supprimer l'import
        const importRegex = new RegExp(`\\b${importName}\\b,?\\s*`, 'g');
        content = content.replace(importRegex, '');
        
        // Nettoyer les virgules orphelines
        content = content.replace(/,\s*}/g, ' }');
        content = content.replace(/{\s*,/g, '{ ');
        content = content.replace(/,\s*,/g, ',');
      });
    }
  });

  return content;
}

// Find all TSX/JSX/TS files
const files = glob.sync('src/**/*.{tsx,jsx,ts}', { 
  cwd: path.join(__dirname, '..'),
  absolute: true 
});

console.log(`Found ${files.length} files to check for remaining errors...`);

let fixedCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let fixed = fixRemainingErrors(content, file);
  fixed = removeUnusedImports(fixed, file);
  
  if (content !== fixed) {
    fs.writeFileSync(file, fixed);
    console.log(`✓ Fixed errors in ${path.basename(file)}`);
    fixedCount++;
  }
});

console.log(`\n✅ Fixed errors in ${fixedCount} files`);
console.log('🔍 Running final ESLint check...\n');