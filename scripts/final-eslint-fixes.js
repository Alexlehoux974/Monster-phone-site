const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '..');

console.log('🔧 Final ESLint fixes...\n');

// 1. Fix compte/page.tsx line 325
const comptePath = path.join(basePath, 'src/app/compte/page.tsx');
let compteContent = fs.readFileSync(comptePath, 'utf8');
compteContent = compteContent.replace(
  "{activeTab === 'profile&apos; && (",
  "{activeTab === 'profile' && ("
);
// Also check for 'orders&apos; and 'security&apos'
compteContent = compteContent.replace(/activeTab === 'orders&apos;/g, "activeTab === 'orders'");
compteContent = compteContent.replace(/activeTab === 'security&apos;/g, "activeTab === 'security'");
fs.writeFileSync(comptePath, compteContent);
console.log('✓ Fixed compte/page.tsx');

// 2. Fix nos-produits pages line 28
['src/app/nos-produits/page.tsx', 'src/app/nos-produits/page-optimized.tsx'].forEach(file => {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/product\.brand\.toLowerCase\(\)\.includes\(searchQuery\.toLowerCase\(\)\) \|\| &apos;/g, "product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||");
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed ${file}`);
  }
});

// 3. Fix panier/page.tsx line 87
const panierPath = path.join(basePath, 'src/app/panier/page.tsx');
let panierContent = fs.readFileSync(panierPath, 'utf8');
// Find and fix the actual problematic line
const panierLines = panierContent.split('\n');
if (panierLines[86] && panierLines[86].includes("'0&apos;")) {
  panierLines[86] = panierLines[86].replace("'0&apos;", "'0'");
  panierContent = panierLines.join('\n');
  fs.writeFileSync(panierPath, panierContent);
  console.log('✓ Fixed panier/page.tsx line 87');
}

// 4. Fix produit/[slug]/layout.tsx line 55
const layoutPath = path.join(basePath, 'src/app/produit/[slug]/layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');
layoutContent = layoutContent.replace(/product\.id === 'recxxx&apos;/g, "product.id === 'recxxx'");
fs.writeFileSync(layoutPath, layoutContent);
console.log('✓ Fixed produit/[slug]/layout.tsx');

// 5. Fix MonsterPhoneHero.tsx - remove unused imports and fix ShoppingCart undefined
const heroPath = path.join(basePath, 'src/components/MonsterPhoneHero.tsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');

// Remove ChevronRight if unused
if (!heroContent.includes('<ChevronRight') && heroContent.includes('import { ChevronRight }')) {
  heroContent = heroContent.replace('import { ChevronRight } from "lucide-react";', '// import { ChevronRight } from "lucide-react";');
}

// Add ShoppingCart import if it's used but not imported
if (heroContent.includes('<ShoppingCart') && !heroContent.includes('ShoppingCart')) {
  heroContent = heroContent.replace(
    'import { motion } from "framer-motion";',
    'import { motion } from "framer-motion";\nimport { ShoppingCart } from "lucide-react";'
  );
}

// Remove Product import if unused
if (!heroContent.includes(': Product')) {
  heroContent = heroContent.replace(/import[^;]*Product[^;]*from\s+['"]@\/data\/products['"];?/g, '// import { Product } from "@/data/products";');
}

fs.writeFileSync(heroPath, heroContent);
console.log('✓ Fixed MonsterPhoneHero.tsx');

// 6. Fix all unescaped entities in one go
const entitiesToFix = [
  { file: 'src/app/contact/page.tsx', find: /s'il vous plaît/g, replace: "s&apos;il vous plaît" },
  { file: 'src/app/contact/page.tsx', find: /l'envoi/g, replace: "l&apos;envoi" },
  { file: 'src/app/legal/conditions-generales/page.tsx', find: /"propriété intellectuelle"/g, replace: '&quot;propriété intellectuelle&quot;' },
  { file: 'src/app/legal/conditions-generales/page.tsx', find: /s'engager/g, replace: "s&apos;engager" },
  { file: 'src/app/legal/confidentialite/page.tsx', find: /l'amélioration/g, replace: "l&apos;amélioration" },
  { file: 'src/app/legal/mentions-legales/page.tsx', find: /Les "cookies" ou "témoins de connexion" sont/g, replace: 'Les &quot;cookies&quot; ou &quot;témoins de connexion&quot; sont' },
  { file: 'src/app/legal/mentions-legales/page.tsx', find: /Le "site"/g, replace: 'Le &quot;site&quot;' },
  { file: 'src/app/legal/mentions-legales/page.tsx', find: /l'éditeur et l'utilisateur s'engage/g, replace: "l&apos;éditeur et l&apos;utilisateur s&apos;engage" },
  { file: 'src/app/services/service-apres-vente/page.tsx', find: /l'eau/g, replace: "l&apos;eau" },
  { file: 'src/app/services/support/page.tsx', find: /Qu'est-ce que/g, replace: "Qu&apos;est-ce que" },
  { file: 'src/components/NewsletterSection.tsx', find: /C'est un moyen simple/g, replace: "C&apos;est un moyen simple" },
  { file: 'src/components/NewsletterSection.tsx', find: /d'être informé/g, replace: "d&apos;être informé" },
  { file: 'src/components/NewsletterSection.tsx', find: /"les tendances gaming"/g, replace: '&quot;les tendances gaming&quot;' }
];

const filesProcessed = new Set();
entitiesToFix.forEach(({ file, find, replace }) => {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(find, replace);
    fs.writeFileSync(filePath, content);
    if (!filesProcessed.has(file)) {
      console.log(`✓ Fixed unescaped entities in ${path.basename(file)}`);
      filesProcessed.add(file);
    }
  }
});

// 7. Fix TrustSection.tsx dependency
const trustPath = path.join(basePath, 'src/components/TrustSection.tsx');
let trustContent = fs.readFileSync(trustPath, 'utf8');
trustContent = trustContent.replace('}, []);', '}, [animateNumbers]);');
fs.writeFileSync(trustPath, trustContent);
console.log('✓ Fixed TrustSection.tsx dependency');

console.log('\n✅ All ESLint fixes completed!');