import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Contenu CMS sourcé pour tous les produits MY WAY - Source: Ascendeo
const myWayCMS: Record<string, any> = {
  // Câbles lumineux MY WAY (4 produits)
  'cable-lumineux-my-way-usb-a-lightning': {
    description_card: {
      title: 'Description',
      content: `<p>Le <strong>Câble Lumineux MY WAY USB-A vers Lightning</strong> combine fonctionnalité et esthétique avec son éclairage LED RGB à effet "respirant". Conçu pour la charge et la synchronisation de vos appareils Apple, ce câble de 1 mètre offre une puissance maximale de 60W.</p>

<p>L'<strong>effet lumineux RGB "respirant"</strong> crée une ambiance unique pendant la charge, avec des transitions douces entre les couleurs. Le câble reste fonctionnel pour la synchronisation de données tout en chargeant vos appareils.</p>

<p>Dimensions compactes de <strong>165x20x60mm</strong> pour seulement <strong>53 grammes</strong>, ce câble est facile à transporter et à ranger. Idéal pour les utilisateurs recherchant à la fois performance et style.</p>

<p>Compatible avec tous les appareils Apple équipés d'un port Lightning : iPhone, iPad, iPod. La puce MFi certifiée garantit une compatibilité parfaite et une charge sécurisée.</p>`,
      layout_variant: 'text-left-image-right'
    },
    specs_grid: {
      title: 'Caractéristiques Techniques',
      metadata: {
        specs: [
          { icon: '🔌', label: 'CONNECTEURS', value: 'USB-A → Lightning', details: 'MFi certifié' },
          { icon: '⚡', label: 'PUISSANCE', value: '60W max', details: 'Charge rapide' },
          { icon: '💡', label: 'ÉCLAIRAGE', value: 'LED RGB', details: 'Effet "respirant"' },
          { icon: '📏', label: 'LONGUEUR', value: '1 mètre', details: 'Pratique' },
          { icon: '🔄', label: 'FONCTION', value: 'Charge + Sync', details: 'Données + énergie' },
          { icon: '📦', label: 'DIMENSIONS', value: '165x20x60mm', details: 'Compact' },
          { icon: '⚖️', label: 'POIDS', value: '53 grammes', details: 'Ultra-léger' },
          { icon: '🎨', label: 'STYLE', value: 'RGB flow', details: 'Design unique' }
        ]
      },
      layout_variant: 'grid-4-cols'
    },
    features_list: {
      title: 'Points Forts',
      metadata: {
        features: [
          { icon: '💡', text: 'Éclairage LED RGB à effet "respirant" - Design unique et élégant' },
          { icon: '⚡', text: 'Charge rapide 60W - Recharge optimale de vos appareils Apple' },
          { icon: '🔄', text: 'Charge + synchronisation - Transférez vos données pendant la charge' },
          { icon: '✅', text: 'Certifié MFi Apple - Compatibilité et sécurité garanties' },
          { icon: '📏', text: 'Longueur idéale 1m - Confort d\'utilisation optimal' },
          { icon: '📦', text: 'Ultra-compact 53g - Facile à transporter partout' }
        ]
      },
      layout_variant: 'image-left-text-right'
    },
    engagement_card: {
      title: 'Pourquoi Choisir ce Câble ?',
      content: `<p>Le <strong>Câble Lumineux MY WAY USB-A Lightning</strong> transforme la charge de vos appareils Apple en expérience visuelle unique. L'effet LED RGB "respirant" apporte une touche d'élégance à votre bureau ou table de chevet.</p>

<p><strong>Performance et style réunis</strong> - Charge rapide 60W avec éclairage LED RGB.</p>

<p><strong>Qualité certifiée Apple</strong> - Puce MFi garantissant compatibilité parfaite.</p>

<p><strong>Prix attractif</strong> - Design premium et fonctionnalités avancées à prix abordable.</p>`,
      layout_variant: 'text-left-image-right'
    }
  },

  'cable-lumineux-my-way-usb-a-usb-c': {
    description_card: {
      title: 'Description',
      content: `<p>Le <strong>Câble Lumineux MY WAY USB-A vers USB-C</strong> allie technologie et esthétique avec son éclairage LED RGB à effet "respirant". Compatible avec la plupart des smartphones et tablettes modernes, ce câble de 1 mètre délivre jusqu'à 60W de puissance.</p>

<p>L'<strong>éclairage LED RGB</strong> crée un flux lumineux continu avec des transitions douces entre les couleurs, transformant chaque charge en spectacle visuel. Le câble supporte simultanément la charge rapide et la synchronisation de données.</p>

<p>Avec ses dimensions de <strong>165x20x60mm</strong> et son poids de seulement <strong>53 grammes</strong>, ce câble se glisse facilement dans votre sac pour vous accompagner partout. Construction robuste garantissant durabilité et fiabilité.</p>

<p>Compatible avec tous les appareils USB-C : smartphones Android, tablettes, ordinateurs portables, Nintendo Switch, et plus encore.</p>`,
      layout_variant: 'text-left-image-right'
    },
    specs_grid: {
      title: 'Caractéristiques Techniques',
      metadata: {
        specs: [
          { icon: '🔌', label: 'CONNECTEURS', value: 'USB-A → USB-C', details: 'Standard USB' },
          { icon: '⚡', label: 'PUISSANCE', value: '60W max', details: 'Charge rapide' },
          { icon: '💡', label: 'ÉCLAIRAGE', value: 'LED RGB', details: 'Effet "respirant"' },
          { icon: '📏', label: 'LONGUEUR', value: '1 mètre', details: 'Pratique' },
          { icon: '🔄', label: 'FONCTION', value: 'Charge + Sync', details: 'Données + énergie' },
          { icon: '📦', label: 'DIMENSIONS', value: '165x20x60mm', details: 'Compact' },
          { icon: '⚖️', label: 'POIDS', value: '53 grammes', details: 'Ultra-léger' },
          { icon: '🎨', label: 'STYLE', value: 'RGB flow', details: 'Design unique' }
        ]
      },
      layout_variant: 'grid-4-cols'
    },
    features_list: {
      title: 'Points Forts',
      metadata: {
        features: [
          { icon: '💡', text: 'Éclairage LED RGB "respirant" - Effet visuel élégant et moderne' },
          { icon: '⚡', text: 'Charge rapide 60W - Recharge optimale pour tous vos USB-C' },
          { icon: '🔄', text: 'Charge + synchronisation - Transférez données pendant la charge' },
          { icon: '🌐', text: 'Compatibilité universelle - Tous appareils USB-C' },
          { icon: '📏', text: 'Longueur idéale 1m - Confort d\'utilisation au quotidien' },
          { icon: '📦', text: 'Ultra-léger 53g - Transportez-le facilement partout' }
        ]
      },
      layout_variant: 'image-left-text-right'
    },
    engagement_card: {
      title: 'Pourquoi Choisir ce Câble ?',
      content: `<p>Le <strong>Câble Lumineux MY WAY USB-A USB-C</strong> révolutionne l'expérience de charge avec son éclairage LED RGB dynamique. Parfait pour les gamers, créateurs de contenu, ou simplement ceux qui apprécient le design soigné.</p>

<p><strong>Polyvalence maximale</strong> - Compatible avec smartphones, tablettes, laptops, Switch.</p>

<p><strong>Design RGB immersif</strong> - Effet "respirant" pour une ambiance unique.</p>

<p><strong>Qualité professionnelle</strong> - Construction robuste pour usage intensif quotidien.</p>`,
      layout_variant: 'text-left-image-right'
    }
  },

  'cable-lumineux-my-way-usb-c-lightning': {
    description_card: {
      title: 'Description',
      content: `<p>Le <strong>Câble Lumineux MY WAY USB-C vers Lightning</strong> est la solution idéale pour les utilisateurs Apple équipés de chargeurs USB-C modernes. Avec son éclairage LED RGB "respirant" et sa puissance de 60W avec Power Delivery, ce câble de 1 mètre offre charge rapide et style unique.</p>

<p>Le <strong>Power Delivery (PD)</strong> permet une charge ultra-rapide de vos iPhone et iPad, tandis que l'<strong>effet lumineux RGB</strong> crée une atmosphère élégante avec ses transitions de couleurs fluides. Compatible avec la synchronisation de données pour transférer photos, vidéos et fichiers.</p>

<p>Design compact avec dimensions de <strong>165x20x60mm</strong> et poids de <strong>53 grammes</strong>, ce câble se transporte facilement dans votre sac ou poche. Construction premium garantissant robustesse et longévité.</p>

<p>Compatible avec tous les chargeurs USB-C et appareils Apple Lightning : iPhone 8 et ultérieurs, iPad Pro, iPad Air, iPad mini. Puce MFi certifiée pour compatibilité et sécurité optimales.</p>`,
      layout_variant: 'text-left-image-right'
    },
    specs_grid: {
      title: 'Caractéristiques Techniques',
      metadata: {
        specs: [
          { icon: '🔌', label: 'CONNECTEURS', value: 'USB-C → Lightning', details: 'MFi certifié' },
          { icon: '⚡', label: 'PUISSANCE', value: '60W PD', details: 'Charge ultra-rapide' },
          { icon: '💡', label: 'ÉCLAIRAGE', value: 'LED RGB', details: 'Effet "respirant"' },
          { icon: '📏', label: 'LONGUEUR', value: '1 mètre', details: 'Pratique' },
          { icon: '🔄', label: 'FONCTION', value: 'Charge + Sync', details: 'Données + énergie' },
          { icon: '📦', label: 'DIMENSIONS', value: '165x20x60mm', details: 'Compact' },
          { icon: '⚖️', label: 'POIDS', value: '53 grammes', details: 'Ultra-léger' },
          { icon: '🎨', label: 'STYLE', value: 'RGB flow', details: 'Design unique' }
        ]
      },
      layout_variant: 'grid-4-cols'
    },
    features_list: {
      title: 'Points Forts',
      metadata: {
        features: [
          { icon: '💡', text: 'Éclairage LED RGB "respirant" - Expérience de charge unique' },
          { icon: '⚡', text: 'Power Delivery 60W - Charge ultra-rapide iPhone et iPad' },
          { icon: '🔄', text: 'Charge + synchronisation - Transférez données pendant charge' },
          { icon: '✅', text: 'Certifié MFi Apple - Garantie compatibilité et sécurité' },
          { icon: '🔌', text: 'USB-C moderne - Compatible nouveaux chargeurs Apple' },
          { icon: '📦', text: 'Ultra-compact 53g - Emportez-le partout facilement' }
        ]
      },
      layout_variant: 'image-left-text-right'
    },
    engagement_card: {
      title: 'Pourquoi Choisir ce Câble ?',
      content: `<p>Le <strong>Câble Lumineux MY WAY USB-C Lightning</strong> est le câble parfait pour les utilisateurs Apple recherchant performance et esthétique. Le Power Delivery 60W garantit une charge ultra-rapide, tandis que l'éclairage RGB apporte une touche premium.</p>

<p><strong>Charge ultra-rapide</strong> - Power Delivery 60W pour iPhone et iPad.</p>

<p><strong>Certifié Apple</strong> - Puce MFi garantissant sécurité et compatibilité.</p>

<p><strong>Design RGB premium</strong> - Transformez la charge en expérience visuelle élégante.</p>`,
      layout_variant: 'text-left-image-right'
    }
  },

  'cable-lumineux-my-way-usb-c-usb-c': {
    description_card: {
      title: 'Description',
      content: `<p>Le <strong>Câble Lumineux MY WAY USB-C vers USB-C</strong> est le câble haut de gamme pour tous vos appareils modernes. Avec sa puissance maximale de 100W et son éclairage LED RGB "respirant", ce câble de 1 mètre allie performance extrême et design spectaculaire.</p>

<p>La <strong>puissance de 100W</strong> permet de charger rapidement laptops, tablettes, smartphones et même certaines consoles de jeu. L'<strong>effet lumineux RGB</strong> crée un flux de couleurs dynamique pendant la charge, transformant votre espace en environnement gaming ou créatif.</p>

<p>Construction robuste avec dimensions de <strong>165x20x60mm</strong> et poids de <strong>53 grammes</strong>. Le câble supporte simultanément charge rapide et transfert de données à haute vitesse pour tous vos besoins connectés.</p>

<p>Compatible avec tous les appareils USB-C : MacBook, iPad Pro, smartphones Android flagship, Nintendo Switch, Steam Deck, laptops gaming, et plus encore.</p>`,
      layout_variant: 'text-left-image-right'
    },
    specs_grid: {
      title: 'Caractéristiques Techniques',
      metadata: {
        specs: [
          { icon: '🔌', label: 'CONNECTEURS', value: 'USB-C → USB-C', details: 'Standard USB' },
          { icon: '⚡', label: 'PUISSANCE', value: '100W max', details: 'Charge laptops' },
          { icon: '💡', label: 'ÉCLAIRAGE', value: 'LED RGB', details: 'Effet "respirant"' },
          { icon: '📏', label: 'LONGUEUR', value: '1 mètre', details: 'Pratique' },
          { icon: '🔄', label: 'FONCTION', value: 'Charge + Sync', details: 'Données + énergie' },
          { icon: '📦', label: 'DIMENSIONS', value: '165x20x60mm', details: 'Compact' },
          { icon: '⚖️', label: 'POIDS', value: '53 grammes', details: 'Ultra-léger' },
          { icon: '🎨', label: 'STYLE', value: 'RGB flow', details: 'Design gaming' }
        ]
      },
      layout_variant: 'grid-4-cols'
    },
    features_list: {
      title: 'Points Forts',
      metadata: {
        features: [
          { icon: '💡', text: 'Éclairage LED RGB "respirant" - Ambiance gaming et créative' },
          { icon: '⚡', text: 'Puissance 100W - Charge rapide laptops et tous USB-C' },
          { icon: '🔄', text: 'Charge + synchronisation - Transfert haute vitesse' },
          { icon: '🌐', text: 'Universalité maximale - MacBook, iPad, Android, Switch, PC' },
          { icon: '💪', text: 'Construction robuste - Durabilité pour usage intensif' },
          { icon: '📦', text: 'Compact 53g - Performance maximale, encombrement minimal' }
        ]
      },
      layout_variant: 'image-left-text-right'
    },
    engagement_card: {
      title: 'Pourquoi Choisir ce Câble ?',
      content: `<p>Le <strong>Câble Lumineux MY WAY USB-C USB-C 100W</strong> est le câble ultime pour les utilisateurs exigeants. Sa puissance de 100W permet de charger n'importe quel appareil USB-C, du smartphone au laptop gaming, tandis que l'éclairage RGB crée une atmosphère unique.</p>

<p><strong>Puissance maximale</strong> - 100W pour charger même les laptops les plus puissants.</p>

<p><strong>Design RGB immersif</strong> - Parfait pour setup gaming ou créatif.</p>

<p><strong>Polyvalence absolue</strong> - Un seul câble pour tous vos appareils USB-C.</p>`,
      layout_variant: 'text-left-image-right'
    }
  },

  // Câble rétractable MY WAY
  'cable-retractable-my-way-usb-c-3-en-1-100-w': {
    description_card: {
      title: 'Description',
      content: `<p>Le <strong>Câble Rétractable MY WAY USB-C 3-en-1 100W</strong> est la solution tout-en-un ultime pour charger tous vos appareils. Avec son mécanisme rétractable extensible jusqu'à 1.2m et ses 3 connecteurs (USB-C, Lightning, Micro-USB), ce câble élimine le besoin de transporter plusieurs câbles.</p>

<p>Le connecteur <strong>USB-C principal</strong> délivre jusqu'à 100W de puissance, idéal pour charger rapidement laptops, tablettes et smartphones haut de gamme. Les connecteurs <strong>Lightning et Micro-USB</strong> partagent une sortie 5V/2A pour vos appareils plus anciens ou accessoires.</p>

<p>Le <strong>mécanisme rétractable</strong> permet d'ajuster la longueur selon vos besoins et évite l'enchevêtrement des câbles. Dimensions compactes de <strong>29x80x165mm</strong> avec poids de <strong>110 grammes</strong>, parfait pour les déplacements et voyages.</p>

<p>Construction robuste garantissant durabilité et fiabilité. Compatible avec smartphones, tablettes, laptops, écouteurs, montres connectées, et pratiquement tous les appareils électroniques portables.</p>`,
      layout_variant: 'text-left-image-right'
    },
    specs_grid: {
      title: 'Caractéristiques Techniques',
      metadata: {
        specs: [
          { icon: '🔌', label: 'CONNECTEURS', value: '3-en-1', details: 'USB-C + Lightning + Micro' },
          { icon: '⚡', label: 'PUISSANCE USB-C', value: '100W max', details: 'Charge laptops' },
          { icon: '🔋', label: 'LIGHTNING/MICRO', value: '5V/2A', details: '10W partagé' },
          { icon: '📏', label: 'LONGUEUR', value: '1.2m extensible', details: 'Rétractable' },
          { icon: '🔄', label: 'MÉCANISME', value: 'Auto-rétractable', details: 'Anti-enchevêtrement' },
          { icon: '📦', label: 'DIMENSIONS', value: '29x80x165mm', details: 'Compact' },
          { icon: '⚖️', label: 'POIDS', value: '110 grammes', details: 'Transportable' },
          { icon: '🌐', label: 'COMPATIBILITÉ', value: 'Universelle', details: 'Tous appareils' }
        ]
      },
      layout_variant: 'grid-4-cols'
    },
    features_list: {
      title: 'Points Forts',
      metadata: {
        features: [
          { icon: '🔌', text: 'Câble 3-en-1 - USB-C 100W + Lightning + Micro-USB en un seul' },
          { icon: '⚡', text: 'Charge puissante - 100W pour laptops, smartphones, tablettes' },
          { icon: '🔄', text: 'Mécanisme rétractable - Extensible 1.2m, anti-enchevêtrement' },
          { icon: '🌐', text: 'Universalité totale - Charge tous vos appareils quotidiens' },
          { icon: '✈️', text: 'Parfait voyage - Compact, léger, remplace 3 câbles différents' },
          { icon: '💪', text: 'Construction robuste - Mécanisme rétractable durable et fiable' }
        ]
      },
      layout_variant: 'image-left-text-right'
    },
    engagement_card: {
      title: 'Pourquoi Choisir ce Câble ?',
      content: `<p>Le <strong>Câble Rétractable MY WAY 3-en-1 100W</strong> est l'accessoire essentiel pour simplifier votre vie numérique. Un seul câble remplace trois câbles différents, avec mécanisme rétractable pratique et puissance 100W pour tous vos besoins.</p>

<p><strong>Solution tout-en-un</strong> - Trois connecteurs, un seul câble compact.</p>

<p><strong>Puissance maximale</strong> - 100W USB-C pour charger même les laptops.</p>

<p><strong>Pratique quotidien</strong> - Rétractable, compact, parfait déplacements et voyages.</p>`,
      layout_variant: 'text-left-image-right'
    }
  },

  // Chargeur MagSafe MY WAY
  'chargeur-sans-fils-my-way-15w-magsafe-donuts': {
    description_card: {
      title: 'Description',
      content: `<p>Le <strong>Chargeur Sans Fil MY WAY MagSafe Donut 15W</strong> offre une charge magnétique rapide et élégante pour vos iPhone compatibles. Son design compact en forme de donut avec finition premium se fond parfaitement dans tous les environnements.</p>

<p>Compatible avec <strong>iPhone 12 et modèles ultérieurs</strong> ainsi que les appareils <strong>Qi2</strong>, ce chargeur délivre jusqu'à 15W de puissance pour une recharge optimale. L'alignement magnétique parfait garantit une charge stable et efficace à chaque utilisation.</p>

<p>Le <strong>câble USB-C fixe</strong> élimine les câbles détachables perdus. Dimensions ultra-compactes de <strong>60x165x30mm</strong> avec poids de seulement <strong>64 grammes</strong>, ce chargeur se transporte facilement et occupe un minimum d'espace sur votre bureau ou table de chevet.</p>

<p>Sécurité intégrée avec protection contre surchauffe, surcharge et court-circuit. Surface antidérapante pour maintenir votre téléphone en place pendant la charge.</p>`,
      layout_variant: 'text-left-image-right'
    },
    specs_grid: {
      title: 'Caractéristiques Techniques',
      metadata: {
        specs: [
          { icon: '🔌', label: 'TYPE', value: 'MagSafe Donut', details: 'Charge magnétique' },
          { icon: '⚡', label: 'PUISSANCE', value: '15W max', details: 'Charge rapide' },
          { icon: '📱', label: 'COMPATIBILITÉ', value: 'iPhone 12+', details: 'Qi2 compatible' },
          { icon: '🔗', label: 'CÂBLE', value: 'USB-C fixe', details: 'Intégré' },
          { icon: '🧲', label: 'MAGNÉTIQUE', value: 'Alignement auto', details: 'Stable' },
          { icon: '📦', label: 'DIMENSIONS', value: '60x165x30mm', details: 'Compact' },
          { icon: '⚖️', label: 'POIDS', value: '64 grammes', details: 'Ultra-léger' },
          { icon: '🛡️', label: 'SÉCURITÉ', value: 'Protections', details: 'Multi-protection' }
        ]
      },
      layout_variant: 'grid-4-cols'
    },
    features_list: {
      title: 'Points Forts',
      metadata: {
        features: [
          { icon: '🧲', text: 'Alignement magnétique - Position parfaite automatique' },
          { icon: '⚡', text: 'Charge rapide 15W - Recharge optimale iPhone 12 et ultérieurs' },
          { icon: '🎨', text: 'Design Donut élégant - Finition premium, style unique' },
          { icon: '🔗', text: 'Câble USB-C fixe - Jamais de câble perdu' },
          { icon: '📦', text: 'Ultra-compact 64g - Emportez partout facilement' },
          { icon: '🛡️', text: 'Protections intégrées - Surchauffe, surcharge, court-circuit' }
        ]
      },
      layout_variant: 'image-left-text-right'
    },
    engagement_card: {
      title: 'Pourquoi Choisir ce Chargeur ?',
      content: `<p>Le <strong>Chargeur MagSafe Donut MY WAY 15W</strong> combine design élégant et performance de charge. L'alignement magnétique automatique garantit une charge optimale à chaque fois, tandis que le design compact s'intègre parfaitement à votre espace.</p>

<p><strong>Charge MagSafe 15W</strong> - Recharge rapide et stable pour iPhone 12+.</p>

<p><strong>Design premium</strong> - Forme Donut unique, finition haut de gamme.</p>

<p><strong>Pratique quotidien</strong> - Compact, léger, câble fixe intégré.</p>`,
      layout_variant: 'text-left-image-right'
    }
  },

  // Powerbanks MY WAY (3 produits)
  'powerbank-my-way-5k-mah-magsafe': {
    description_card: {
      title: 'Description',
      content: `<p>La <strong>Batterie Externe MY WAY MagSafe 5000mAh</strong> est la solution de charge sans fil compacte pour vos iPhone 12 et modèles ultérieurs. Son alignement magnétique parfait garantit une charge stable et optimale en toute situation.</p>

<p>Avec sa <strong>capacité de 5000mAh</strong>, cette powerbank offre environ 1 recharge complète de votre iPhone. Elle supporte plusieurs puissances de charge sans fil : <strong>15W, 10W, 7.5W et 5W</strong>, s'adaptant automatiquement à votre appareil pour une charge optimale.</p>

<p>Le <strong>port USB-C bidirectionnel</strong> (entrée/sortie) permet de recharger la batterie externe rapidement et également de l'utiliser comme powerbank filaire pour d'autres appareils. Design ultra-compact parfait pour la poche, sac ou pochette.</p>

<p>Compatible avec tous les iPhone 12, 13, 14, 15 et modèles ultérieurs. Peut également charger d'autres appareils Qi via le port USB-C. Protections multiples : surchauffe, surcharge, court-circuit, décharge excessive.</p>`,
      layout_variant: 'text-left-image-right'
    },
    specs_grid: {
      title: 'Caractéristiques Techniques',
      metadata: {
        specs: [
          { icon: '🔋', label: 'CAPACITÉ', value: '5000 mAh', details: '1 recharge iPhone' },
          { icon: '🧲', label: 'TYPE', value: 'MagSafe', details: 'Alignement auto' },
          { icon: '⚡', label: 'SANS FIL', value: '15W/10W/7.5W/5W', details: 'Multi-puissance' },
          { icon: '🔌', label: 'PORT', value: 'USB-C in/out', details: 'Bidirectionnel' },
          { icon: '📱', label: 'COMPATIBILITÉ', value: 'iPhone 12+', details: 'MagSafe natif' },
          { icon: '📦', label: 'FORMAT', value: 'Compact', details: 'Tient en poche' },
          { icon: '⚖️', label: 'POIDS', value: 'Ultra-léger', details: 'Portable' },
          { icon: '🛡️', label: 'SÉCURITÉ', value: 'Multi-protection', details: 'Charge sûre' }
        ]
      },
      layout_variant: 'grid-4-cols'
    },
    features_list: {
      title: 'Points Forts',
      metadata: {
        features: [
          { icon: '🧲', text: 'MagSafe natif - Alignement magnétique parfait automatique' },
          { icon: '⚡', text: 'Charge sans fil 15W - Recharge rapide et stable' },
          { icon: '🔋', text: 'Capacité 5000mAh - 1 recharge complète iPhone' },
          { icon: '🔌', text: 'USB-C bidirectionnel - Charge filaire + recharge powerbank' },
          { icon: '📦', text: 'Ultra-compact - Se glisse dans poche, emportez partout' },
          { icon: '🛡️', text: 'Protections intégrées - Surchauffe, surcharge, court-circuit' }
        ]
      },
      layout_variant: 'image-left-text-right'
    },
    engagement_card: {
      title: 'Pourquoi Choisir cette Powerbank ?',
      content: `<p>La <strong>Batterie MY WAY MagSafe 5000mAh</strong> est l'accessoire essentiel pour les utilisateurs iPhone recherchant compacité et praticité. L'alignement magnétique MagSafe garantit une charge optimale sans avoir à brancher de câble.</p>

<p><strong>MagSafe pratique</strong> - Charge sans fil stable, pas de câble nécessaire.</p>

<p><strong>Format poche</strong> - Ultra-compact, accompagne tous vos déplacements.</p>

<p><strong>Polyvalence USB-C</strong> - Charge filaire et recharge rapide de la powerbank.</p>`,
      layout_variant: 'text-left-image-right'
    }
  },

  'powerbank-myway-10k-mah': {
    description_card: {
      title: 'Description',
      content: `<p>La <strong>Batterie Externe MY WAY 10000mAh</strong> est la solution de secours complète pour tous vos appareils mobiles. Avec sa technologie <strong>Fast Charge 10.5W</strong> et ses multiples ports, cette powerbank garantit des recharges rapides et efficaces.</p>

<p>Sa <strong>capacité de 10000mAh</strong> permet environ 3 recharges complètes d'un smartphone standard. Le <strong>port USB-C bidirectionnel</strong> (entrée/sortie) et les <strong>2 ports USB-A</strong> permettent de charger jusqu'à 3 appareils simultanément.</p>

<p>La technologie <strong>Fast Charge 10.5W</strong> optimise la vitesse de charge pour chaque appareil connecté. Écran LED intégré affichant le niveau de charge restant précisément. Construction robuste garantissant durabilité et fiabilité pour usage quotidien intensif.</p>

<p>Compatible avec tous les appareils se chargeant via USB : smartphones Android/iOS, tablettes, écouteurs Bluetooth, montres connectées, caméras d'action, et plus encore. Protections multiples intégrées pour charge sécurisée.</p>`,
      layout_variant: 'text-left-image-right'
    },
    specs_grid: {
      title: 'Caractéristiques Techniques',
      metadata: {
        specs: [
          { icon: '🔋', label: 'CAPACITÉ', value: '10000 mAh', details: '3 recharges' },
          { icon: '⚡', label: 'FAST CHARGE', value: '10.5W', details: 'Charge rapide' },
          { icon: '🔌', label: 'PORTS', value: 'USB-C + 2 USB-A', details: '3 appareils simult.' },
          { icon: '🔄', label: 'USB-C', value: 'In/Out', details: 'Bidirectionnel' },
          { icon: '📊', label: 'ÉCRAN', value: 'LED digital', details: 'Niveau charge' },
          { icon: '🌐', label: 'COMPATIBILITÉ', value: 'Universelle', details: 'Tous USB' },
          { icon: '⚖️', label: 'FORMAT', value: 'Compact', details: 'Transportable' },
          { icon: '🛡️', label: 'SÉCURITÉ', value: 'Multi-protection', details: 'Charge sûre' }
        ]
      },
      layout_variant: 'grid-4-cols'
    },
    features_list: {
      title: 'Points Forts',
      metadata: {
        features: [
          { icon: '🔋', text: 'Capacité 10000mAh - 3 recharges complètes smartphone' },
          { icon: '⚡', text: 'Fast Charge 10.5W - Recharge rapide et optimale' },
          { icon: '🔌', text: 'Triple sortie - USB-C + 2 USB-A, chargez 3 appareils' },
          { icon: '🔄', text: 'USB-C bidirectionnel - Charge appareils + recharge powerbank' },
          { icon: '📊', text: 'Écran LED - Suivi précis du niveau de charge restant' },
          { icon: '🛡️', text: 'Protections intégrées - Surchauffe, surcharge, court-circuit' }
        ]
      },
      layout_variant: 'image-left-text-right'
    },
    engagement_card: {
      title: 'Pourquoi Choisir cette Powerbank ?',
      content: `<p>La <strong>Batterie MY WAY 10000mAh</strong> est le compagnon idéal pour ne jamais tomber en panne de batterie. Avec 3 ports de sortie et Fast Charge 10.5W, chargez tous vos appareils rapidement et simultanément.</p>

<p><strong>Capacité optimale</strong> - 10000mAh pour 3 recharges complètes.</p>

<p><strong>Triple sortie</strong> - Chargez smartphone, écouteurs, montre en même temps.</p>

<p><strong>Écran LED pratique</strong> - Visualisez précisément l'énergie restante disponible.</p>`,
      layout_variant: 'text-left-image-right'
    }
  },

  'powerbank-myway-20k-mah': {
    description_card: {
      title: 'Description',
      content: `<p>La <strong>Batterie Externe MY WAY 20000mAh</strong> est la powerbank haute capacité pour les utilisateurs nomades et intensifs. Avec sa <strong>capacité massive de 20000mAh</strong>, cette batterie offre jusqu'à 6 recharges complètes d'un smartphone standard.</p>

<p>Équipée de la technologie <strong>Fast Charge 10.5W</strong>, elle garantit des recharges rapides et efficaces. Le <strong>port USB-C bidirectionnel</strong> (entrée/sortie) et les <strong>2 ports USB-A</strong> permettent de charger jusqu'à 3 appareils simultanément, idéal pour partager avec vos proches ou alimenter plusieurs de vos appareils.</p>

<p>L'<strong>écran LED digital</strong> affiche précisément le niveau de charge restant en pourcentage. Construction robuste en aluminium garantissant durabilité exceptionnelle et dissipation thermique optimale pour usage intensif prolongé.</p>

<p>Parfaite pour voyages prolongés, camping, festivals, ou simplement comme secours pour toute la semaine. Compatible avec tous les appareils USB. Protections multiples : surchauffe, surcharge, court-circuit, décharge excessive.</p>`,
      layout_variant: 'text-left-image-right'
    },
    specs_grid: {
      title: 'Caractéristiques Techniques',
      metadata: {
        specs: [
          { icon: '🔋', label: 'CAPACITÉ', value: '20000 mAh', details: '6 recharges' },
          { icon: '⚡', label: 'FAST CHARGE', value: '10.5W', details: 'Charge rapide' },
          { icon: '🔌', label: 'PORTS', value: 'USB-C + 2 USB-A', details: '3 appareils simult.' },
          { icon: '🔄', label: 'USB-C', value: 'In/Out', details: 'Bidirectionnel' },
          { icon: '📊', label: 'ÉCRAN', value: 'LED digital', details: 'Niveau %' },
          { icon: '🌐', label: 'COMPATIBILITÉ', value: 'Universelle', details: 'Tous USB' },
          { icon: '💪', label: 'CONSTRUCTION', value: 'Aluminium', details: 'Ultra-robuste' },
          { icon: '🛡️', label: 'SÉCURITÉ', value: 'Multi-protection', details: 'Charge sûre' }
        ]
      },
      layout_variant: 'grid-4-cols'
    },
    features_list: {
      title: 'Points Forts',
      metadata: {
        features: [
          { icon: '🔋', text: 'Capacité massive 20000mAh - 6 recharges complètes smartphone' },
          { icon: '⚡', text: 'Fast Charge 10.5W - Recharge rapide et optimale' },
          { icon: '🔌', text: 'Triple sortie - USB-C + 2 USB-A, chargez 3 appareils' },
          { icon: '🔄', text: 'USB-C bidirectionnel - Charge + recharge rapide powerbank' },
          { icon: '📊', text: 'Écran LED % - Suivi précis niveau charge en pourcentage' },
          { icon: '💪', text: 'Construction aluminium - Robustesse et dissipation thermique' }
        ]
      },
      layout_variant: 'image-left-text-right'
    },
    engagement_card: {
      title: 'Pourquoi Choisir cette Powerbank ?',
      content: `<p>La <strong>Batterie MY WAY 20000mAh</strong> est la solution ultime pour les nomades numériques et voyageurs. Avec 6 recharges complètes de capacité, vous êtes paré pour plusieurs jours sans accès à une prise électrique.</p>

<p><strong>Capacité exceptionnelle</strong> - 20000mAh pour une semaine d'autonomie.</p>

<p><strong>Usage intensif</strong> - Construction aluminium robuste, usage quotidien longue durée.</p>

<p><strong>Partage facile</strong> - 3 ports pour charger vos appareils et ceux de vos proches.</p>`,
      layout_variant: 'text-left-image-right'
    }
  }
};

async function enrichMyWayCMS() {
  console.log('🔧 ENRICHISSEMENT CMS MY WAY (9 PRODUITS)\n');
  console.log('='.repeat(80));

  const { data: brand, error: brandError } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%my way%')
    .single();

  if (brandError || !brand) {
    console.log('❌ Marque MY WAY introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  let successCount = 0;
  let failCount = 0;

  for (const [slug, cms] of Object.entries(myWayCMS)) {
    const { data: product } = await supabase
      .from('products')
      .select('id, name, url_slug')
      .eq('brand_id', brand.id)
      .eq('url_slug', slug)
      .single();

    if (!product) {
      console.log(`\n❌ Produit introuvable: ${slug}`);
      failCount++;
      continue;
    }

    console.log(`\n📱 ${product.name}`);
    console.log(`   Slug: ${product.url_slug}`);

    // Supprimer anciennes sections
    const { error: deleteError } = await supabase
      .from('product_content_sections')
      .delete()
      .eq('product_id', product.id);

    if (deleteError) {
      console.log(`   ❌ Erreur suppression: ${deleteError.message}`);
      failCount++;
      continue;
    }

    // Créer 4 nouvelles sections
    const sections = [
      {
        product_id: product.id,
        section_type: 'description_card',
        title: cms.description_card.title,
        content: cms.description_card.content,
        images: [],
        is_enabled: true,
        display_order: 1,
        layout_variant: cms.description_card.layout_variant,
        metadata: {}
      },
      {
        product_id: product.id,
        section_type: 'specs_grid',
        title: cms.specs_grid.title,
        content: '',
        images: [],
        is_enabled: true,
        display_order: 2,
        layout_variant: cms.specs_grid.layout_variant,
        metadata: cms.specs_grid.metadata
      },
      {
        product_id: product.id,
        section_type: 'features_list',
        title: cms.features_list.title,
        content: '',
        images: [],
        is_enabled: true,
        display_order: 3,
        layout_variant: cms.features_list.layout_variant,
        metadata: cms.features_list.metadata
      },
      {
        product_id: product.id,
        section_type: 'engagement_card',
        title: cms.engagement_card.title,
        content: cms.engagement_card.content,
        images: [],
        is_enabled: true,
        display_order: 4,
        layout_variant: cms.engagement_card.layout_variant,
        metadata: {}
      }
    ];

    const { error: insertError } = await supabase
      .from('product_content_sections')
      .insert(sections);

    if (insertError) {
      console.log(`   ❌ Erreur création sections: ${insertError.message}`);
      failCount++;
    } else {
      console.log(`   ✅ 4 sections créées avec succès`);
      successCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 RÉSULTATS MY WAY:`);
  console.log(`   ✅ Succès: ${successCount}/9`);
  console.log(`   ❌ Échecs: ${failCount}/9\n`);
}

enrichMyWayCMS();
