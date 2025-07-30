const fs = require('fs');
const path = require('path');

function fixFile(filePath, lineNumber, oldText, newText) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  if (lineNumber && lineNumber > 0 && lineNumber <= lines.length) {
    if (lines[lineNumber - 1].includes(oldText)) {
      lines[lineNumber - 1] = lines[lineNumber - 1].replace(oldText, newText);
      fs.writeFileSync(filePath, lines.join('\n'));
      console.log(`✓ Fixed ${path.basename(filePath)} at line ${lineNumber}`);
    }
  }
}

function fixContent(filePath, oldText, newText) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(oldText)) {
    content = content.replace(oldText, newText);
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed ${path.basename(filePath)}`);
  }
}

const basePath = path.join(__dirname, '..');

console.log('🔧 Fixing all remaining ESLint errors...\n');

// Fix parsing errors
fixFile(path.join(basePath, 'src/app/services/support-technique/page.tsx'), 98, 
  'response: "< 30 secondes""', 
  'response: "< 30 secondes"'
);

// Fix unescaped entities in NewsletterSection
const newsletterPath = path.join(basePath, 'src/components/NewsletterSection.tsx');
let newsletterContent = fs.readFileSync(newsletterPath, 'utf8');
newsletterContent = newsletterContent
  .replace(/C'est un moyen simple/g, "C&apos;est un moyen simple")
  .replace(/d'être informé/g, "d&apos;être informé")
  .replace(/"les tendances gaming"/g, "&quot;les tendances gaming&quot;");
fs.writeFileSync(newsletterPath, newsletterContent);
console.log('✓ Fixed NewsletterSection.tsx');

// Fix legal pages
const conditionsPath = path.join(basePath, 'src/app/legal/conditions-generales/page.tsx');
let conditionsContent = fs.readFileSync(conditionsPath, 'utf8');
conditionsContent = conditionsContent
  .replace(/Conditions relatives au contenu "propriété intellectuelle"/g, 'Conditions relatives au contenu &quot;propriété intellectuelle&quot;')
  .replace(/s'engager/g, "s&apos;engager");
fs.writeFileSync(conditionsPath, conditionsContent);
console.log('✓ Fixed conditions-generales/page.tsx');

const confidentialitePath = path.join(basePath, 'src/app/legal/confidentialite/page.tsx');
let confidentialiteContent = fs.readFileSync(confidentialitePath, 'utf8');
confidentialiteContent = confidentialiteContent.replace(/l'amélioration/g, "l&apos;amélioration");
fs.writeFileSync(confidentialitePath, confidentialiteContent);
console.log('✓ Fixed confidentialite/page.tsx');

const mentionsPath = path.join(basePath, 'src/app/legal/mentions-legales/page.tsx');
let mentionsContent = fs.readFileSync(mentionsPath, 'utf8');
mentionsContent = mentionsContent
  .replace(/Les "cookies" ou "témoins de connexion" sont/g, 'Les &quot;cookies&quot; ou &quot;témoins de connexion&quot; sont')
  .replace(/Le "site"/g, 'Le &quot;site&quot;')
  .replace(/l'éditeur et l'utilisateur s'engage/g, "l&apos;éditeur et l&apos;utilisateur s&apos;engage");
fs.writeFileSync(mentionsPath, mentionsContent);
console.log('✓ Fixed mentions-legales/page.tsx');

// Fix contact page
const contactPath = path.join(basePath, 'src/app/contact/page.tsx');
let contactContent = fs.readFileSync(contactPath, 'utf8');
contactContent = contactContent
  .replace(/s'il vous plaît/g, "s&apos;il vous plaît")
  .replace(/l'envoi/g, "l&apos;envoi");
fs.writeFileSync(contactPath, contactContent);
console.log('✓ Fixed contact/page.tsx');

// Fix support page
const supportPath = path.join(basePath, 'src/app/services/support/page.tsx');
let supportContent = fs.readFileSync(supportPath, 'utf8');
supportContent = supportContent.replace(/Qu'est-ce que/g, "Qu&apos;est-ce que");
fs.writeFileSync(supportPath, supportContent);
console.log('✓ Fixed support/page.tsx');

// Fix SAV page
const savPath = path.join(basePath, 'src/app/services/service-apres-vente/page.tsx');
const savContent = fs.readFileSync(savPath, 'utf8');
const lines = savContent.split('\n');
// Find line containing fabricants.join and fix it if needed
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('fabricants.join') && lines[i].includes('&apos;, &apos;')) {
    lines[i] = lines[i].replace('&apos;, &apos;', "', '");
    fs.writeFileSync(savPath, lines.join('\n'));
    console.log('✓ Fixed service-apres-vente/page.tsx');
    break;
  }
}

// Remove unused variables from Header, MonsterPhoneHero, and components
console.log('\n🔧 Removing unused variables...\n');

// Fix Header.tsx - comment out unused variables
const headerPath = path.join(basePath, 'src/components/Header.tsx');
let headerContent = fs.readFileSync(headerPath, 'utf8');
headerContent = headerContent
  .replace('const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);', '// const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);')
  .replace('const [isScrolled, setIsScrolled] = useState(false);', '// const [isScrolled, setIsScrolled] = useState(false);')
  .replace('const { isAuthenticated } = useAuth();', '// const { isAuthenticated } = useAuth();');
fs.writeFileSync(headerPath, headerContent);
console.log('✓ Fixed Header.tsx unused variables');

// Fix MonsterPhoneHero.tsx - comment out unused components
const heroPath = path.join(basePath, 'src/components/MonsterPhoneHero.tsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');
// Comment out the unused components
heroContent = heroContent
  .replace(/const ContainerScroll = \(/g, '// const ContainerScroll = (')
  .replace(/const ProductCard = \(/g, '// const ProductCard = (')
  .replace(/const products = \[/g, '// const products = [');

// Find and comment out the entire unused components
const lines2 = heroContent.split('\n');
let inContainerScroll = false;
let inProductCard = false;
let inProducts = false;
let braceCount = 0;

for (let i = 0; i < lines2.length; i++) {
  if (lines2[i].includes('const ContainerScroll = (')) {
    inContainerScroll = true;
    lines2[i] = '// ' + lines2[i];
    braceCount = 1;
  } else if (lines2[i].includes('const ProductCard = (')) {
    inProductCard = true;
    lines2[i] = '// ' + lines2[i];
    braceCount = 1;
  } else if (lines2[i].includes('const products = [')) {
    inProducts = true;
    lines2[i] = '// ' + lines2[i];
    braceCount = 1;
  } else if (inContainerScroll || inProductCard || inProducts) {
    lines2[i] = '// ' + lines2[i];
    // Count braces to know when component ends
    for (const char of lines2[i]) {
      if (char === '{' || char === '(' || char === '[') braceCount++;
      if (char === '}' || char === ')' || char === ']') braceCount--;
    }
    if (braceCount === 0) {
      inContainerScroll = false;
      inProductCard = false;
      inProducts = false;
    }
  }
}

fs.writeFileSync(heroPath, lines2.join('\n'));
console.log('✓ Fixed MonsterPhoneHero.tsx unused components');

console.log('\n✅ All fixes applied!');