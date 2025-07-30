const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns to find and replace unescaped entities in JSX
const replacements = [
  // Apostrophes
  { pattern: />([^<]*)'([^<]*)</g, replacement: '>$1&apos;$2<' },
  // Quotes  
  { pattern: />([^<]*)"([^<]*)</g, replacement: '>$1&quot;$2<' },
];

// Find all TSX/JSX files
const files = glob.sync('src/**/*.{tsx,jsx}', { 
  cwd: path.join(__dirname, '..'),
  absolute: true 
});

console.log(`Found ${files.length} files to process...`);

let totalReplacements = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let fileReplacements = 0;
  
  replacements.forEach(({ pattern, replacement }) => {
    const matches = content.match(pattern);
    if (matches) {
      fileReplacements += matches.length;
      content = content.replace(pattern, replacement);
    }
  });
  
  if (fileReplacements > 0) {
    fs.writeFileSync(file, content);
    console.log(`✓ Fixed ${fileReplacements} unescaped entities in ${path.basename(file)}`);
    totalReplacements += fileReplacements;
  }
});

console.log(`\n✅ Total replacements: ${totalReplacements}`);
console.log('🔍 Running ESLint to verify...\n');

// Run ESLint to check remaining issues
const { execSync } = require('child_process');
try {
  execSync('npm run lint', { stdio: 'inherit' });
} catch (e) {
  // ESLint will exit with error if there are still issues
  console.log('\n⚠️  Some ESLint issues may still remain. Check the output above.');
}