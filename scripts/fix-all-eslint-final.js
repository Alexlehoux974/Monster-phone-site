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
      },
      {
        find: `// @ts-ignore\nimport Product from '@/types';`,
        replace: ``
      }
    ]
  }
];

// Fix unescaped entities
const entityFixes = [
  {
    file: 'src/app/contact/page.tsx',
    entities: [
      { line: 107, find: `Notre équipe d'experts est à votre écoute`, replace: `Notre équipe d&apos;experts est à votre écoute` },
      { line: 292, find: `Horaires d'ouverture`, replace: `Horaires d&apos;ouverture` },
      { line: 350, find: `contactez-nous directement par téléphone aux heures d'ouverture.`, replace: `contactez-nous directement par téléphone aux heures d&apos;ouverture.` },
      { line: 379, find: `Partout sur l'île, gratuit dès 50€`, replace: `Partout sur l&apos;île, gratuit dès 50€` }
    ]
  },
  {
    file: 'src/app/legal/conditions-generales/page.tsx',
    entities: [
      { line: 70, find: `Les présentes conditions générales de vente s'appliquent`, replace: `Les présentes conditions générales de vente s&apos;appliquent` },
      { line: 86, find: `Les prix peuvent être modifiés à tout moment mais ne s'appliquent qu'aux commandes futures`, replace: `Les prix peuvent être modifiés à tout moment mais ne s&apos;appliquent qu&apos;aux commandes futures` },
      { line: 87, find: `Frais de livraison : gratuits dès 50€ d'achat, sinon forfait de 5€ sur toute l'île`, replace: `Frais de livraison : gratuits dès 50€ d&apos;achat, sinon forfait de 5€ sur toute l&apos;île` },
      { line: 111, find: `<strong>Express (24h)</strong> : Nord et Ouest de l'île - 10€`, replace: `<strong>Express (24h)</strong> : Nord et Ouest de l&apos;île - 10€` },
      { line: 112, find: `<strong>Standard (48h)</strong> : Toute l'île - Gratuit dès 50€`, replace: `<strong>Standard (48h)</strong> : Toute l&apos;île - Gratuit dès 50€` },
      { line: 114, find: `<strong>Zones difficiles d'accès</strong> : 72h maximum + 5€`, replace: `<strong>Zones difficiles d&apos;accès</strong> : 72h maximum + 5€` },
      { line: 123, find: `Conformément au Code de la consommation, vous disposez d'un délai de 14 jours francs`, replace: `Conformément au Code de la consommation, vous disposez d&apos;un délai de 14 jours francs` },
      { line: 137, find: `Produit dans son emballage d'origine`, replace: `Produit dans son emballage d&apos;origine` },
      { line: 139, find: `Aucune trace d'usure ou de choc`, replace: `Aucune trace d&apos;usure ou de choc` },
      { line: 146, find: `Monster Phone Boutique ne saurait être tenue responsable des dommages de toute nature \n                  qui pourraient résulter d'une mauvaise utilisation des produits vendus.`, replace: `Monster Phone Boutique ne saurait être tenue responsable des dommages de toute nature \n                  qui pourraient résulter d&apos;une mauvaise utilisation des produits vendus.` },
      { line: 159, find: `Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez d'un droit`, replace: `Conformément à la loi &quot;Informatique et Libertés&quot; et au RGPD, vous disposez d&apos;un droit` }
    ]
  },
  {
    file: 'src/app/legal/confidentialite/page.tsx',
    entities: [
      { line: 180, find: `Jusqu'à désinscription`, replace: `Jusqu&apos;à désinscription` },
      { line: 235, find: `Nous vous répondrons dans un délai d'un mois. Une pièce d'identité pourra être demandée.`, replace: `Nous vous répondrons dans un délai d&apos;un mois. Une pièce d&apos;identité pourra être demandée.` },
      { line: 255, find: `<strong>Statistiques</strong> : Mesure d'audience anonyme (Google Analytics)`, replace: `<strong>Statistiques</strong> : Mesure d&apos;audience anonyme (Google Analytics)` }
    ]
  },
  {
    file: 'src/app/legal/mentions-legales/page.tsx',
    entities: [
      { line: 67, find: `1. Informations sur l'entreprise`, replace: `1. Informations sur l&apos;entreprise` },
      { line: 90, find: `4741Z - Commerce de détail d'ordinateurs`, replace: `4741Z - Commerce de détail d&apos;ordinateurs` },
      { line: 167, find: `Le site monster-phone-boutique.fr, sa structure, son contenu, ses textes, images, \n                  sons, vidéos, et tous les éléments qui le composent sont protégés par le droit \n                  d'auteur et appartiennent à Monster Phone Boutique ou à ses partenaires.`, replace: `Le site monster-phone-boutique.fr, sa structure, son contenu, ses textes, images, \n                  sons, vidéos, et tous les éléments qui le composent sont protégés par le droit \n                  d&apos;auteur et appartiennent à Monster Phone Boutique ou à ses partenaires.` },
      { line: 172, find: `Les marques "Monster Phone", "Monster Phone Boutique" et tous les logos associés`, replace: `Les marques &quot;Monster Phone&quot;, &quot;Monster Phone Boutique&quot; et tous les logos associés` },
      { line: 188, find: `Monster Phone Boutique s'efforce d'assurer l'exactitude des informations diffusées \n                  sur le site, mais ne peut garantir l'exactitude, la précision ou l'exhaustivité \n                  des informations mises à disposition.`, replace: `Monster Phone Boutique s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées \n                  sur le site, mais ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité \n                  des informations mises à disposition.` },
      { line: 203, find: `Monster Phone Boutique \n                  n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant \n                  à leur contenu.`, replace: `Monster Phone Boutique \n                  n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant \n                  à leur contenu.` },
      { line: 218, find: `Le site utilise des cookies pour améliorer l'expérience utilisateur.`, replace: `Le site utilise des cookies pour améliorer l&apos;expérience utilisateur.` },
      { line: 226, find: `Tout litige relatif à l'utilisation du site relève de la compétence \n                  exclusive des tribunaux de Saint-Denis de La Réunion.`, replace: `Tout litige relatif à l&apos;utilisation du site relève de la compétence \n                  exclusive des tribunaux de Saint-Denis de La Réunion.` }
    ]
  },
  {
    file: 'src/app/services/support/page.tsx',
    entities: [
      { line: 33, find: `description: 'Pour les réparations ou échanges d'accessoires défectueux'`, replace: `description: 'Pour les réparations ou échanges d&apos;accessoires défectueux'` }
    ]
  },
  {
    file: 'src/components/NewsletterSection.tsx',
    entities: [
      { line: 271, find: `En vous inscrivant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.`, replace: `En vous inscrivant, vous acceptez nos conditions d&apos;utilisation et notre politique de confidentialité.` },
      { line: 339, find: `Notre newsletter "Monster Deals" arrive chaque semaine avec des offres exclusives !`, replace: `Notre newsletter &quot;Monster Deals&quot; arrive chaque semaine avec des offres exclusives !` }
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