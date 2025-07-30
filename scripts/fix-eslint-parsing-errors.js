const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fonction pour corriger les erreurs de parsing spécifiques
function fixParsingErrors(content, filePath) {
  let fixed = content;
  const fileName = path.basename(filePath);
  
  // Corrections spécifiques par fichier
  const fileSpecificFixes = {
    'smoke.test.tsx': {
      find: "it('should render a basic React component&apos;, () => {",
      replace: "it('should render a basic React component', () => {"
    },
    'accessoires/page.tsx': {
      patterns: [
        { find: "useState<string>('&apos;);", replace: "useState<string>('');" },
        { find: "matchesProduct === '&apos; ||", replace: "matchesProduct === '' ||" },
        { find: "'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200&apos;", replace: "'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'" },
        { find: "setSelectedCategory('&apos;)", replace: "setSelectedCategory('')" },
        { find: "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors&quot;", replace: "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors\"" },
        { find: "focus:ring-blue-500 focus:border-transparent&quot;", replace: "focus:ring-blue-500 focus:border-transparent\"" },
        { find: "'Prix sur demande&apos;", replace: "'Prix sur demande'" },
        { find: "setSelectedProduct('&apos;);", replace: "setSelectedProduct('');" }
      ]
    },
    'checkout/page.tsx': {
      patterns: [
        { find: "postalCode || '&apos;,", replace: "postalCode || ''," },
        { find: "setErrors(prev => ({ ...prev, [name]: '&apos; }));", replace: "setErrors(prev => ({ ...prev, [name]: '' }));" },
        { find: "'Confirmation&apos;, icon: Check },", replace: "'Confirmation', icon: Check }," },
        { find: "'Standard (3-5 jours)&apos;}", replace: "'Standard (3-5 jours)'}" },
        { find: "router.push('/nos-produits&apos;)", replace: "router.push('/nos-produits')" },
        { find: "router.push('/compte&apos;)", replace: "router.push('/compte')" },
        { find: "router.push('/panier&apos;)", replace: "router.push('/panier')" },
        { find: ">d&apos;expiration", replace: ">d'expiration" },
        { find: "formData.paymentMethod === 'card&apos; &&", replace: "formData.paymentMethod === 'card' &&" },
        { find: "formData.paymentMethod === 'paypal&apos; &&", replace: "formData.paymentMethod === 'paypal' &&" },
        { find: "'Livraison standard&apos;", replace: "'Livraison standard'" },
        { find: "'24-48h' : '3-5 jours ouvrés&apos;", replace: "'24-48h' : '3-5 jours ouvrés'" },
        { find: "'card' ? 'Carte bancaire' : 'PayPal&apos;", replace: "'card' ? 'Carte bancaire' : 'PayPal'" },
        { find: "formData.paymentMethod === 'card&apos; &&", replace: "formData.paymentMethod === 'card' &&" },
        { find: ">J&apos;accepte", replace: ">J'accepte" },
        { find: "price?.replace('€', '') || '0&apos;", replace: "price?.replace('€', '') || '0'" },
        { find: "e.currentTarget.src = '/placeholder-product.png&apos;;", replace: "e.currentTarget.src = '/placeholder-product.png';" },
        { find: "'Gratuit' : '4,99 €&apos;", replace: "'Gratuit' : '4,99 €'" }
      ]
    },
    'contact/page.tsx': {
      patterns: [
        { find: "setFormData({ name: '', email: '', phone: '', subject: '', message: '&apos; });", replace: "setFormData({ name: '', email: '', phone: '', subject: '', message: '' });" },
        { find: "document.querySelector('meta[name=\"keywords&quot;]');", replace: "document.querySelector('meta[name=\"keywords\"]');" },
        { find: "'contact monster phone, téléphone gaming réunion, boutique smartphone 974, sainte marie réunion, honor réunion, réparation téléphone réunion&apos;';", replace: "'contact monster phone, téléphone gaming réunion, boutique smartphone 974, sainte marie réunion, honor réunion, réparation téléphone réunion';" },
        { find: "submitStatus === 'success&apos; &&", replace: "submitStatus === 'success' &&" },
        { find: ">d&apos;experts", replace: ">d'experts" },
        { find: ">d&apos;ouverture", replace: ">d'ouverture" },
        { find: "d&apos;ouverture", replace: "d'ouverture" },
        { find: "dès 50€</p>", replace: "dès 50€</p>" }
      ]
    }
  };

  // Appliquer les corrections spécifiques au fichier
  Object.keys(fileSpecificFixes).forEach(key => {
    if (filePath.includes(key)) {
      const fixes = fileSpecificFixes[key];
      if (fixes.patterns) {
        fixes.patterns.forEach(pattern => {
          fixed = fixed.replace(new RegExp(pattern.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), pattern.replace);
        });
      } else if (fixes.find && fixes.replace) {
        fixed = fixed.replace(fixes.find, fixes.replace);
      }
    }
  });

  // Corrections générales pour tous les fichiers
  // Corriger les apostrophes mal échappées dans les chaînes
  fixed = fixed.replace(/&apos;,/g, "',");
  fixed = fixed.replace(/&apos;}/g, "'}");
  fixed = fixed.replace(/&apos;]/g, "']");
  fixed = fixed.replace(/&apos;\)/g, "')");
  fixed = fixed.replace(/&apos;;/g, "';");
  fixed = fixed.replace(/&apos; \)/g, "' )");
  fixed = fixed.replace(/&apos; }/g, "' }");
  fixed = fixed.replace(/\('&apos;/g, "('");
  fixed = fixed.replace(/\['&apos;/g, "['");
  fixed = fixed.replace(/{'&apos;/g, "{'");
  fixed = fixed.replace(/&apos;$/gm, "'");
  
  // Corriger les guillemets mal échappés
  fixed = fixed.replace(/&quot;,/g, '",');
  fixed = fixed.replace(/&quot;}/g, '"}');
  fixed = fixed.replace(/&quot;]/g, '"]');
  fixed = fixed.replace(/&quot;\)/g, '")');
  fixed = fixed.replace(/&quot;;/g, '";');
  fixed = fixed.replace(/\("&quot;/g, '("');
  fixed = fixed.replace(/\["&quot;/g, '["');
  fixed = fixed.replace(/{"&quot;/g, '{"');
  fixed = fixed.replace(/&quot;$/gm, '"');

  // Corrections spécifiques pour les patterns JSX courants
  fixed = fixed.replace(/100vw&apos;/g, "100vw'");
  fixed = fixed.replace(/resize&quot;/g, 'resize"');
  fixed = fixed.replace(/context\("2d&quot;\)/g, 'context("2d")');
  fixed = fixed.replace(/fr-FR&apos;/g, "fr-FR'");
  fixed = fixed.replace(/&apos;\)}/g, "')}");

  return fixed;
}

// Find all TSX/JSX files
const files = glob.sync('src/**/*.{tsx,jsx,ts}', { 
  cwd: path.join(__dirname, '..'),
  absolute: true 
});

console.log(`Found ${files.length} files to check for parsing errors...`);

let fixedCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const fixed = fixParsingErrors(content, file);
  
  if (content !== fixed) {
    fs.writeFileSync(file, fixed);
    console.log(`✓ Fixed parsing errors in ${path.basename(file)}`);
    fixedCount++;
  }
});

console.log(`\n✅ Fixed parsing errors in ${fixedCount} files`);
console.log('🔍 Running ESLint to verify remaining issues...\n');