const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '..');

console.log('🔧 Fixing all unescaped entities...\n');

// Files with unescaped entities
const filesToFix = [
  {
    file: 'src/app/contact/page.tsx',
    replacements: [
      { find: "s'il vous plaît", replace: "s&apos;il vous plaît" },
      { find: "l'envoi", replace: "l&apos;envoi" }
    ]
  },
  {
    file: 'src/app/legal/conditions-generales/page.tsx',
    replacements: [
      { find: '"propriété intellectuelle"', replace: '&quot;propriété intellectuelle&quot;' },
      { find: "s'engager", replace: "s&apos;engager" }
    ]
  },
  {
    file: 'src/app/legal/confidentialite/page.tsx',
    replacements: [
      { find: "l'amélioration", replace: "l&apos;amélioration" }
    ]
  },
  {
    file: 'src/app/legal/mentions-legales/page.tsx',
    replacements: [
      { find: '"cookies"', replace: '&quot;cookies&quot;' },
      { find: '"témoins de connexion"', replace: '&quot;témoins de connexion&quot;' },
      { find: '"site"', replace: '&quot;site&quot;' },
      { find: "l'éditeur", replace: "l&apos;éditeur" },
      { find: "l'utilisateur", replace: "l&apos;utilisateur" },
      { find: "s'engage", replace: "s&apos;engage" }
    ]
  },
  {
    file: 'src/app/services/support/page.tsx',
    replacements: [
      { find: "Qu'est-ce que", replace: "Qu&apos;est-ce que" }
    ]
  },
  {
    file: 'src/components/NewsletterSection.tsx',
    replacements: [
      { find: "C'est un moyen simple", replace: "C&apos;est un moyen simple" },
      { find: "d'être informé", replace: "d&apos;être informé" },
      { find: '"les tendances gaming"', replace: '&quot;les tendances gaming&quot;' }
    ]
  }
];

// Apply replacements
filesToFix.forEach(({ file, replacements }) => {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    replacements.forEach(({ find, replace }) => {
      if (content.includes(find)) {
        content = content.replace(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
      }
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed ${file}`);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

// Fix service-apres-vente - search more thoroughly
const savPath = path.join(basePath, 'src/app/services/service-apres-vente/page.tsx');
if (fs.existsSync(savPath)) {
  let savContent = fs.readFileSync(savPath, 'utf8');
  const lines = savContent.split('\n');
  
  // Find line 287 and check what's there
  if (lines[286]) { // Line 287 is index 286
    console.log(`Line 287 contains: "${lines[286]}"`);
    // Look for any apostrophes in join calls
    lines[286] = lines[286].replace(/\.join\('[^']*'\)/g, (match) => {
      return match.replace(/'/g, "'");
    });
  }
  
  fs.writeFileSync(savPath, lines.join('\n'));
  console.log('✓ Fixed service-apres-vente/page.tsx line 287');
}

console.log('\n✅ All unescaped entities fixed!');