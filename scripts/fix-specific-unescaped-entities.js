const fs = require('fs');
const path = require('path');

const fixes = [
  // compte/page.tsx - ligne 247
  {
    file: 'src/app/compte/page.tsx',
    fixes: [
      {
        find: "{isSubmitting ? 'Chargement...' : isLoginMode ? 'Se connecter' : 'S\\'inscrire'}",
        replace: "{isSubmitting ? 'Chargement...' : isLoginMode ? 'Se connecter' : \"S'inscrire\"}"
      }
    ]
  },
  // contact/page.tsx - ligne 40
  {
    file: 'src/app/contact/page.tsx',
    fixes: [
      {
        find: "// Simuler l&apos;envoi (à remplacer par vraie logique)",
        replace: "// Simuler l'envoi (à remplacer par vraie logique)"
      },
      {
        find: "Notre équipe d&apos;experts est à votre écoute",
        replace: "Notre équipe d'experts est à votre écoute"
      },
      {
        find: "Partout sur l&apos;île, gratuit dès 50€",
        replace: "Partout sur l'île, gratuit dès 50€"
      }
    ]
  },
  // conditions-generales/page.tsx
  {
    file: 'src/app/legal/conditions-generales/page.tsx',
    fixes: [
      {
        find: "Les présentes conditions générales de vente s&apos;appliquent",
        replace: "Les présentes conditions générales de vente s'appliquent"
      },
      {
        find: "Les prix incluent la TVA au taux en vigueur à La Réunion",
        replace: "Les prix incluent la TVA au taux en vigueur à La Réunion"
      },
      {
        find: "Les prix peuvent être modifiés à tout moment mais ne s&apos;appliquent qu&apos;aux commandes futures",
        replace: "Les prix peuvent être modifiés à tout moment mais ne s'appliquent qu'aux commandes futures"
      },
      {
        find: "Frais de livraison : gratuits dès 50€ d&apos;achat, sinon forfait de 5€ sur toute l&apos;île",
        replace: "Frais de livraison : gratuits dès 50€ d'achat, sinon forfait de 5€ sur toute l'île"
      },
      {
        find: "<strong>Express (24h)</strong> : Nord et Ouest de l&apos;île - 10€",
        replace: "<strong>Express (24h)</strong> : Nord et Ouest de l'île - 10€"
      },
      {
        find: "<strong>Standard (48h)</strong> : Toute l&apos;île - Gratuit dès 50€",
        replace: "<strong>Standard (48h)</strong> : Toute l'île - Gratuit dès 50€"
      },
      {
        find: "<strong>Zones difficiles d&apos;accès</strong> : 72h maximum + 5€",
        replace: "<strong>Zones difficiles d'accès</strong> : 72h maximum + 5€"
      },
      {
        find: "Conformément au Code de la consommation, vous disposez d&apos;un délai de 14 jours francs",
        replace: "Conformément au Code de la consommation, vous disposez d'un délai de 14 jours francs"
      },
      {
        find: "Produit dans son emballage d&apos;origine",
        replace: "Produit dans son emballage d'origine"
      },
      {
        find: "Aucune trace d&apos;usure ou de choc",
        replace: "Aucune trace d'usure ou de choc"
      },
      {
        find: "Monster Phone Boutique ne saurait être tenue responsable des dommages de toute nature \n                  qui pourraient résulter d&apos;une mauvaise utilisation des produits vendus.",
        replace: "Monster Phone Boutique ne saurait être tenue responsable des dommages de toute nature \n                  qui pourraient résulter d'une mauvaise utilisation des produits vendus."
      },
      {
        find: 'Conformément à la loi "Informatique et Libertés&quot; et au RGPD',
        replace: 'Conformément à la loi "Informatique et Libertés" et au RGPD'
      },
      {
        find: "Pour exercer ce droit, contactez-nous à contact@monster-phone-reunion.com.",
        replace: "Pour exercer ce droit, contactez-nous à contact@monster-phone-reunion.com."
      }
    ]
  },
  // confidentialite/page.tsx
  {
    file: 'src/app/legal/confidentialite/page.tsx',
    fixes: [
      {
        find: "Jusqu&apos;à désinscription",
        replace: "Jusqu'à désinscription"
      },
      {
        find: "Une pièce d&apos;identité pourra être demandée.",
        replace: "Une pièce d'identité pourra être demandée."
      },
      {
        find: "Mesure d&apos;audience anonyme (Google Analytics)",
        replace: "Mesure d'audience anonyme (Google Analytics)"
      }
    ]
  },
  // mentions-legales/page.tsx
  {
    file: 'src/app/legal/mentions-legales/page.tsx',
    fixes: [
      {
        find: "Informations sur l&apos;entreprise",
        replace: "Informations sur l'entreprise"
      },
      {
        find: "4741Z - Commerce de détail d&apos;ordinateurs",
        replace: "4741Z - Commerce de détail d'ordinateurs"
      },
      {
        find: "Le site monster-phone-boutique.fr, sa structure, son contenu, ses textes, images, \n                  sons, vidéos, et tous les éléments qui le composent sont protégés par le droit \n                  d&apos;auteur et appartiennent à Monster Phone Boutique ou à ses partenaires.",
        replace: "Le site monster-phone-boutique.fr, sa structure, son contenu, ses textes, images, \n                  sons, vidéos, et tous les éléments qui le composent sont protégés par le droit \n                  d'auteur et appartiennent à Monster Phone Boutique ou à ses partenaires."
      },
      {
        find: 'Les marques "Monster Phone", "Monster Phone Boutique&quot; et tous les logos associés',
        replace: 'Les marques "Monster Phone", "Monster Phone Boutique" et tous les logos associés'
      },
      {
        find: "Monster Phone Boutique s'efforce d'assurer l'exactitude des informations diffusées \n                  sur le site, mais ne peut garantir l'exactitude, la précision ou l&apos;exhaustivité \n                  des informations mises à disposition.",
        replace: "Monster Phone Boutique s'efforce d'assurer l'exactitude des informations diffusées \n                  sur le site, mais ne peut garantir l'exactitude, la précision ou l'exhaustivité \n                  des informations mises à disposition."
      },
      {
        find: "Monster Phone Boutique \n                  n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant \n                  à leur contenu.",
        replace: "Monster Phone Boutique \n                  n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant \n                  à leur contenu."
      },
      {
        find: "Le site utilise des cookies pour améliorer l&apos;expérience utilisateur.",
        replace: "Le site utilise des cookies pour améliorer l'expérience utilisateur."
      },
      {
        find: "Tout litige relatif à l&apos;utilisation du site relève de la compétence \n                  exclusive des tribunaux de Saint-Denis de La Réunion.",
        replace: "Tout litige relatif à l'utilisation du site relève de la compétence \n                  exclusive des tribunaux de Saint-Denis de La Réunion."
      }
    ]
  }
];

// Apply fixes
fixes.forEach(({file, fixes: fileFixes}) => {
  const filePath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  fileFixes.forEach(({find, replace}) => {
    if (content.includes(find)) {
      content = content.replace(find, replace);
      changed = true;
      console.log(`✅ Fixed in ${file}: "${find.substring(0, 50)}..."`);
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${file}`);
  }
});

console.log('✅ All specific unescaped entities fixes completed');