import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Contenu CMS pour les produits MONSTER ILLUMINESCENCE LED
// Basé sur les spécifications officielles MONSTER GAMING

// CMS pour Basic LED Light Bar Pair RGB INT
const basicLedLightBarCMS = {
  description_card: {
    title: 'Description',
    content: `Les barres LED MONSTER ILLUMINESCENCE BASIC offrent un éclairage RGB dynamique parfait pour personnaliser votre setup gaming ou bureau. Cette paire de barres lumineuses propose une gamme complète de couleurs RGB contrôlables, créant une ambiance immersive adaptée à votre style.

Conçues pour une installation facile, ces barres LED s'intègrent discrètement à n'importe quel environnement intérieur tout en délivrant un éclairage puissant et uniforme. Le système RGB permet de personnaliser l'ambiance selon vos préférences ou de synchroniser avec votre contenu multimédia.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Barres LED RGB', details: 'Paire de barres lumineuses' },
        { icon: '🎨', label: 'COULEURS', value: 'RGB', details: 'Millions de couleurs' },
        { icon: '🏠', label: 'USAGE', value: 'Intérieur', details: 'Gaming, bureau, décoration' },
        { icon: '⚡', label: 'ALIMENTATION', value: 'USB', details: 'Plug & Play' },
        { icon: '🔌', label: 'CONNECTIVITÉ', value: 'Filaire', details: 'Connexion USB' },
        { icon: '📏', label: 'FORMAT', value: 'Paire', details: '2 barres LED' },
        { icon: '🎮', label: 'USAGE', value: 'Gaming', details: 'Setup gaming optimal' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🎨', text: 'RGB complet - Millions de couleurs pour personnalisation totale' },
        { icon: '⚡', text: 'Installation simple - Plug & Play via USB, aucune configuration complexe' },
        { icon: '💡', text: 'Éclairage puissant - Luminosité optimale pour ambiance immersive' },
        { icon: '🎮', text: 'Gaming-first - Conçu spécifiquement pour setups gaming' },
        { icon: '🏠', text: 'Polyvalent - Bureau, gaming, streaming, décoration' },
        { icon: '🔧', text: 'Discret - Design épuré qui s\'intègre parfaitement' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Les barres LED MONSTER ILLUMINESCENCE BASIC transforment instantanément votre espace de gaming ou de travail. L'éclairage RGB personnalisable crée une ambiance unique qui reflète votre personnalité.

**Design gaming** - Esthétique moderne parfaite pour tout setup gaming professionnel.

**Simplicité d'usage** - Installation immédiate sans configuration compliquée, branchez et profitez.

**Qualité MONSTER** - Fiabilité et performance reconnues dans l'univers du gaming.`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour Basic LED Touch Light x3 RGB INT
const basicLedTouchLightCMS = {
  description_card: {
    title: 'Description',
    content: `Les touch lights MONSTER ILLUMINESCENCE BASIC offrent un éclairage RGB tactile innovant en pack de 3 unités. Ces lampes tactiles compactes permettent de créer des points lumineux personnalisables partout où vous en avez besoin, que ce soit pour éclairer votre setup gaming, votre bureau ou créer une ambiance unique.

Le contrôle tactile intuitif permet de changer facilement les couleurs et modes d'éclairage d'une simple pression. Leur format compact et leur design moderne les rendent parfaits pour multiplier les sources lumineuses et créer une atmosphère immersive complète.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Touch Lights', details: 'Pack de 3 lampes tactiles' },
        { icon: '🎨', label: 'COULEURS', value: 'RGB', details: 'Personnalisation complète' },
        { icon: '👆', label: 'CONTRÔLE', value: 'Tactile', details: 'Changement facile' },
        { icon: '⚡', label: 'ALIMENTATION', value: 'Secteur/Piles', details: 'Double option' },
        { icon: '📦', label: 'QUANTITÉ', value: '3 unités', details: 'Pack économique' },
        { icon: '🏠', label: 'USAGE', value: 'Intérieur', details: 'Multi-usages' },
        { icon: '📏', label: 'FORMAT', value: 'Compact', details: 'Discret et mobile' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '👆', text: 'Contrôle tactile - Changement de couleur intuitif d\'une simple pression' },
        { icon: '📦', text: 'Pack de 3 - Créez plusieurs points lumineux pour ambiance complète' },
        { icon: '🎨', text: 'RGB personnalisable - Adaptez l\'éclairage à chaque moment' },
        { icon: '📏', text: 'Format compact - Placement flexible partout où nécessaire' },
        { icon: '⚡', text: 'Double alimentation - Secteur ou piles pour mobilité maximale' },
        { icon: '🎮', text: 'Gaming & décoration - Parfait pour setups gaming et ambiance' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Les touch lights MONSTER ILLUMINESCENCE BASIC offrent la flexibilité ultime pour personnaliser votre éclairage. Le pack de 3 unités permet de créer une ambiance homogène sur l'ensemble de votre espace.

**Contrôle intuitif** - Technologie tactile pour changement de couleur instantané sans télécommande.

**Polyvalence maximale** - Gaming, bureau, chambre, chaque espace mérite son éclairage personnalisé.

**Installation libre** - Format compact et double alimentation pour placement optimal partout.`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS commun pour les Basic Light Strips Sound Reactive (2x5M, 5M RGBW)
const basicLightStripSoundReactiveCMS = {
  description_card: {
    title: 'Description',
    content: `Le ruban LED MONSTER ILLUMINESCENCE BASIC Sound Reactive révolutionne l'éclairage ambiant en synchronisant automatiquement les lumières avec le son environnant. Équipé d'un microphone intégré, ce système RGB+W réagit en temps réel à la musique, aux jeux et aux films pour créer une expérience immersive totale.

La technologie RGB+W (Rouge-Vert-Bleu + Blanc) offre une palette de couleurs étendue incluant des blancs purs, parfaite pour l'éclairage fonctionnel comme pour l'ambiance. La réactivité sonore transforme votre pièce en véritable espace de divertissement dynamique où la lumière danse au rythme de votre contenu.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Ruban LED', details: 'Light Strip flexible' },
        { icon: '🎨', label: 'COULEURS', value: 'RGB+W', details: 'RGB + Blanc pur' },
        { icon: '🎵', label: 'SON', value: 'Sound Reactive', details: 'Micro intégré' },
        { icon: '🏠', label: 'USAGE', value: 'Intérieur', details: 'Gaming, salon, bureau' },
        { icon: '⚡', label: 'ALIMENTATION', value: 'Secteur', details: 'Adaptateur inclus' },
        { icon: '🔌', label: 'CONTRÔLE', value: 'Télécommande', details: 'IR incluse' },
        { icon: '✂️', label: 'DÉCOUPE', value: 'Découpable', details: 'Tous les 10cm' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🎵', text: 'Réactivité sonore - Synchronisation automatique avec musique, jeux et films' },
        { icon: '🎨', text: 'RGB+W complet - Couleurs vives + blancs purs pour éclairage fonctionnel' },
        { icon: '🎮', text: 'Immersion gaming - Transforme chaque session en expérience visuelle dynamique' },
        { icon: '📏', text: 'Longueur généreuse - Couverture complète de votre espace' },
        { icon: '✂️', text: 'Découpable - Ajustement précis à vos dimensions exactes' },
        { icon: '🔧', text: 'Installation facile - Adhésif 3M, montage sans outil en minutes' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Le ruban LED MONSTER ILLUMINESCENCE Sound Reactive transforme votre pièce en espace de divertissement immersif. La réaction en temps réel au son crée une ambiance dynamique qui amplifie chaque moment.

**Gaming immersif** - La lumière réagit à l'action du jeu pour immersion maximale.

**Soirées animées** - Ambiance disco automatique qui suit parfaitement la musique.

**Polyvalent** - Mode sound reactive ou couleurs statiques selon l'usage.`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour Basic Light Strip 30M RGB INT
const basicLightStrip30MCMS = {
  description_card: {
    title: 'Description',
    content: `Le ruban LED MONSTER ILLUMINESCENCE BASIC 30M RGB offre une solution d'éclairage exceptionnelle pour les grands espaces. Avec ses 30 mètres de longueur, ce système permet de créer des installations lumineuses spectaculaires couvrant l'intégralité de pièces spacieuses, salles de gaming professionnelles ou setups multi-écrans.

La technologie RGB propose des millions de combinaisons de couleurs pour personnaliser l'ambiance selon vos préférences. La longueur généreuse permet de contourner meubles, suivre le périmètre des pièces ou créer des motifs lumineux complexes pour un impact visuel maximum.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '📏', label: 'LONGUEUR', value: '30 mètres', details: 'Ultra longue portée' },
        { icon: '🎨', label: 'COULEURS', value: 'RGB', details: 'Millions de couleurs' },
        { icon: '💡', label: 'TYPE', value: 'Ruban LED', details: 'Light Strip flexible' },
        { icon: '🏠', label: 'USAGE', value: 'Intérieur', details: 'Grands espaces' },
        { icon: '⚡', label: 'ALIMENTATION', value: 'Secteur', details: 'Adaptateur puissant' },
        { icon: '🔌', label: 'CONTRÔLE', value: 'Télécommande', details: 'Télécommande IR' },
        { icon: '✂️', label: 'DÉCOUPE', value: 'Découpable', details: 'Ajustable' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '📏', text: '30 mètres - Longueur exceptionnelle pour grands espaces et projets ambitieux' },
        { icon: '🎨', text: 'RGB complet - Personnalisation totale de l\'ambiance lumineuse' },
        { icon: '🎮', text: 'Setups XL - Parfait pour salles gaming, home cinéma et espaces pros' },
        { icon: '✂️', text: 'Flexible - Découpable pour adaptation précise à vos besoins' },
        { icon: '💡', text: 'Luminosité intense - Éclairage puissant même sur grande distance' },
        { icon: '🔧', text: 'Installation complète - Kit avec tout le nécessaire pour installation immédiate' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Le ruban LED MONSTER ILLUMINESCENCE 30M est la solution ultime pour les projets d'éclairage ambitieux. Cette longueur exceptionnelle permet de réaliser des installations spectaculaires sans multiplier les contrôleurs.

**Projets XL** - Couvrez salles entières, périmètres complets ou créez des motifs élaborés.

**Économique** - Solution plus rentable qu'assembler plusieurs rubans courts.

**Impact visuel** - Créez des ambiances immersives à grande échelle impressionnantes.`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour Smart Light Strip standard (2M, 4M, 5M) - Contrôle Wi-Fi/App
const smartLightStripStandardCMS = {
  description_card: {
    title: 'Description',
    content: `Le ruban LED MONSTER ILLUMINESCENCE SMART transforme votre éclairage en système intelligent contrôlable depuis votre smartphone. Compatible avec les assistants vocaux et applications dédiées, ce ruban LED offre un contrôle total sur l'ambiance lumineuse de votre espace via Wi-Fi.

La technologie smart permet de programmer des scénarios d'éclairage, synchroniser avec votre emploi du temps, et créer des ambiances personnalisées depuis n'importe où. RGB complet avec millions de couleurs, modes prédéfinis, et minuteries programmables pour un éclairage qui s'adapte à votre vie quotidienne.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Ruban LED Smart', details: 'Contrôle Wi-Fi' },
        { icon: '🎨', label: 'COULEURS', value: 'RGB', details: 'Millions de couleurs' },
        { icon: '📱', label: 'CONTRÔLE', value: 'App mobile', details: 'iOS & Android' },
        { icon: '🗣️', label: 'VOCAL', value: 'Compatible', details: 'Alexa, Google Home' },
        { icon: '⚡', label: 'ALIMENTATION', value: 'Secteur', details: 'Adaptateur inclus' },
        { icon: '🏠', label: 'USAGE', value: 'Intérieur', details: 'Maison connectée' },
        { icon: '✂️', label: 'DÉCOUPE', value: 'Découpable', details: 'Ajustable' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '📱', text: 'Contrôle app - Commande totale depuis smartphone iOS ou Android' },
        { icon: '🗣️', text: 'Assistants vocaux - Compatible Alexa et Google Assistant' },
        { icon: '⏰', text: 'Programmation - Scénarios automatiques et minuteries' },
        { icon: '🎨', text: 'RGB intelligent - Personnalisation avancée des couleurs' },
        { icon: '🌐', text: 'Contrôle distant - Gérez votre éclairage de n\'importe où' },
        { icon: '🏠', text: 'Maison connectée - S\'intègre à votre écosystème smart home' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Le ruban LED MONSTER ILLUMINESCENCE SMART apporte l'intelligence à votre éclairage. Contrôle app, commande vocale et automatisation transforment votre quotidien avec un éclairage qui anticipe vos besoins.

**Smart home ready** - S'intègre parfaitement à votre maison connectée existante.

**Automatisation** - Programmez des scénarios pour chaque moment de la journée.

**Contrôle total** - Gérez votre éclairage depuis le canapé ou à distance.`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour Smart Flow & Neon - Effets lumineux dynamiques
const smartFlowNeonCMS = {
  description_card: {
    title: 'Description',
    content: `Le ruban LED MONSTER ILLUMINESCENCE SMART Flow/Neon combine technologie smart et effets lumineux dynamiques pour créer des ambiances spectaculaires. La technologie Flow permet des transitions fluides et des effets de couleur qui circulent le long du ruban, créant un spectacle visuel captivant.

L'effet néon moderne offre un éclairage diffus et uniforme, parfait pour recréer l'esthétique des enseignes lumineuses vintage avec les avantages de la technologie LED moderne. Contrôle Wi-Fi, compatibilité assistants vocaux, et effets dynamiques programmables pour un éclairage qui impressionne.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Smart Flow/Neon', details: 'Effets dynamiques' },
        { icon: '🎨', label: 'COULEURS', value: 'RGB+IC Flow', details: 'Effets multicouleurs' },
        { icon: '🌊', label: 'EFFETS', value: 'Flow animé', details: 'Transitions fluides' },
        { icon: '📱', label: 'CONTRÔLE', value: 'App mobile', details: 'iOS & Android' },
        { icon: '🏠', label: 'USAGE', value: 'Int/Ext', details: 'Polyvalent' },
        { icon: '💧', label: 'PROTECTION', value: 'IPX6/IP65', details: 'Résistant eau' },
        { icon: '⚡', label: 'ALIMENTATION', value: 'Secteur', details: 'Adaptateur inclus' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🌊', text: 'Effets Flow - Animations fluides et transitions de couleurs spectaculaires' },
        { icon: '💡', text: 'Style néon - Éclairage diffus moderne inspiré des enseignes vintage' },
        { icon: '📱', text: 'Smart control - App mobile et commande vocale intégrées' },
        { icon: '💧', text: 'Usage extérieur - Protection IP65/IPX6 pour installations outdoor' },
        { icon: '🎨', text: 'RGB+IC - Contrôle indépendant de chaque LED pour effets complexes' },
        { icon: '🎮', text: 'Gaming spectacle - Créez des ambiances visuelles immersives' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Le ruban LED MONSTER ILLUMINESCENCE Smart Flow/Neon offre le summum de l'éclairage décoratif moderne. Les effets Flow créent un spectacle visuel constant qui transforme n'importe quel espace en œuvre d'art lumineuse.

**Effets spectaculaires** - Animations fluides qui captivent et impressionnent.

**Polyvalence totale** - Intérieur gaming ou extérieur terrasse, résiste aux intempéries.

**Technologie premium** - RGB+IC pour contrôle individuel de chaque LED.`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour Basic Flow Multicol - Effets multicouleurs sans Wi-Fi
const basicFlowMulticolCMS = {
  description_card: {
    title: 'Description',
    content: `Le ruban LED MONSTER ILLUMINESCENCE BASIC Flow Multicol offre des effets lumineux dynamiques sans nécessiter de connexion Wi-Fi ou smartphone. Parfait pour ceux qui recherchent un éclairage spectaculaire plug & play, ce ruban propose des transitions de couleurs fluides et des modes prédéfinis contrôlables via télécommande infrarouge.

Les effets Flow multicouleurs créent des animations fascinantes avec des transitions douces entre nuances, idéal pour ambiances festives, setups gaming, ou simplement ajouter une touche dynamique à votre décoration. Installation simple, utilisation immédiate, résultat spectaculaire.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Ruban LED Flow', details: 'Effets multicouleurs' },
        { icon: '🎨', label: 'COULEURS', value: 'Multicouleurs', details: 'Transitions fluides' },
        { icon: '🌊', label: 'EFFETS', value: 'Flow animé', details: 'Modes prédéfinis' },
        { icon: '🔌', label: 'CONTRÔLE', value: 'Télécommande IR', details: 'Plug & Play' },
        { icon: '⚡', label: 'ALIMENTATION', value: 'Secteur', details: 'Adaptateur inclus' },
        { icon: '🏠', label: 'USAGE', value: 'Intérieur', details: 'Gaming, décoration' },
        { icon: '✂️', label: 'DÉCOUPE', value: 'Découpable', details: 'Ajustable' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🌊', text: 'Effets Flow - Transitions de couleurs fluides et captivantes' },
        { icon: '⚡', text: 'Plug & Play - Aucune app ni Wi-Fi, branchez et profitez' },
        { icon: '🎨', text: 'Modes variés - Plusieurs animations préprogrammées' },
        { icon: '🔌', text: 'Télécommande IR - Contrôle simple et immédiat' },
        { icon: '💰', text: 'Rapport qualité/prix - Effets premium sans surcoût smart' },
        { icon: '🎮', text: 'Gaming ready - Ambiance dynamique pour setups immersifs' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Le ruban LED MONSTER ILLUMINESCENCE BASIC Flow Multicol apporte des effets spectaculaires sans complexité technique. La simplicité du plug & play rencontre la beauté des animations Flow pour un résultat impressionnant immédiat.

**Simplicité d'usage** - Aucune configuration, aucune app, branchez et admirez.

**Effets premium** - Qualité visuelle comparable aux modèles smart.

**Prix maîtrisé** - Économisez sans sacrifier l'impact visuel.`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour Motion Reactive à piles
const motionReactiveBatteryCMS = {
  description_card: {
    title: 'Description',
    content: `Le ruban LED MONSTER ILLUMINESCENCE Motion Reactive à piles révolutionne l'éclairage d'appoint avec sa détection de mouvement automatique. Alimenté par piles, ce système totalement sans fil s'installe n'importe où sans contrainte électrique, parfait pour placards, couloirs, escaliers, ou zones difficiles d'accès.

Le capteur de mouvement intégré détecte votre présence et active automatiquement l'éclairage, s'éteignant après quelques secondes d'inactivité pour économiser l'énergie. Installation ultra-simple grâce à l'adhésif 3M, aucun câble, aucun branchement, liberté totale de placement.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Motion Reactive', details: 'Détection mouvement' },
        { icon: '🔋', label: 'ALIMENTATION', value: 'Piles', details: '100% sans fil' },
        { icon: '👁️', label: 'CAPTEUR', value: 'PIR intégré', details: 'Détection auto' },
        { icon: '⏱️', label: 'DURÉE', value: 'Auto-off', details: 'Économie énergie' },
        { icon: '📏', label: 'LONGUEUR', value: '2 mètres', details: 'Format compact' },
        { icon: '🏠', label: 'USAGE', value: 'Intérieur', details: 'Multi-zones' },
        { icon: '🔧', label: 'INSTALLATION', value: 'Adhésif', details: 'Sans outil' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '👁️', text: 'Détection auto - S\'allume automatiquement à votre passage' },
        { icon: '🔋', text: '100% sans fil - Piles, aucun branchement électrique nécessaire' },
        { icon: '💡', text: 'Éclairage d\'appoint - Parfait placards, couloirs, escaliers' },
        { icon: '⏱️', text: 'Économe - Extinction automatique après inactivité' },
        { icon: '🔧', text: 'Installation libre - Adhésif 3M, placement illimité' },
        { icon: '🌙', text: 'Pratique nuit - Éclairage automatique sans chercher interrupteur' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Le ruban LED MONSTER ILLUMINESCENCE Motion Reactive à piles résout le problème d'éclairage dans les zones sans prise électrique. La détection de mouvement automatique apporte confort et économie d'énergie au quotidien.

**Liberté totale** - Installez où vous voulez, aucune contrainte électrique.

**Confort automatique** - Plus besoin de chercher l'interrupteur dans le noir.

**Multi-usages** - Dressing, garde-manger, sous-lit, escalier, garage...`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour IPX6 Exterior (résistant projections eau)
const ipx6ExteriorCMS = {
  description_card: {
    title: 'Description',
    content: `Le ruban LED MONSTER ILLUMINESCENCE IPX6 Extérieur est conçu pour résister aux conditions extérieures avec sa certification IPX6 contre les projections d'eau puissantes. Idéal pour terrasses, balcons, pergolas, ou installations semi-extérieures, ce ruban LED multicouleur crée des ambiances lumineuses qui défient les intempéries.

La protection IPX6 garantit une résistance aux jets d'eau de toutes directions, permettant une utilisation sereine même lors de pluies intenses ou lavage au jet. LED RGB multicouleurs pour personnaliser l'ambiance extérieure, matériaux résistants aux UV et températures variables pour durabilité maximale.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Ruban LED Ext', details: 'Usage outdoor' },
        { icon: '🎨', label: 'COULEURS', value: 'Multicouleurs', details: 'RGB personnalisable' },
        { icon: '💧', label: 'PROTECTION', value: 'IPX6', details: 'Jets d\'eau puissants' },
        { icon: '☀️', label: 'UV', value: 'Résistant', details: 'Anti-décoloration' },
        { icon: '📏', label: 'LONGUEUR', value: '5 mètres', details: 'Couverture étendue' },
        { icon: '⚡', label: 'ALIMENTATION', value: 'Secteur', details: 'Adaptateur IP65' },
        { icon: '🌡️', label: 'TEMPÉRATURE', value: '-20° à +50°C', details: 'Toutes saisons' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '💧', text: 'IPX6 certifié - Résiste aux jets d\'eau puissants de toutes directions' },
        { icon: '☀️', text: 'Anti-UV - Matériaux résistants à la décoloration solaire' },
        { icon: '🏡', text: 'Outdoor ready - Terrasse, balcon, pergola, jardin' },
        { icon: '🎨', text: 'RGB multicouleurs - Personnalisez l\'ambiance extérieure' },
        { icon: '🌡️', text: 'Toutes saisons - Fonctionne de -20°C à +50°C' },
        { icon: '🔧', text: 'Installation durable - Adhésif renforcé pour conditions extérieures' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Le ruban LED MONSTER ILLUMINESCENCE IPX6 Extérieur apporte l'éclairage décoratif RGB aux espaces outdoor sans compromis sur la fiabilité. La certification IPX6 garantit une durabilité qui résiste aux conditions réelles d'utilisation extérieure.

**Durabilité outdoor** - Conçu spécifiquement pour résister aux intempéries.

**Ambiances extérieures** - Créez des soirées magiques sur votre terrasse.

**Tranquillité** - Protection IPX6 pour utilisation sereine toute l'année.`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour Smart Chroma Light - Barres lumineuses RGB IC
const smartChromaLightCMS = {
  description_card: {
    title: 'Description',
    content: `Les barres lumineuses MONSTER ILLUMINESCENCE SMART CHROMA combinent design élégant et technologie RGB+IC avancée dans un format compact et polyvalent. Le contrôle indépendant de chaque LED (IC - Independent Control) permet de créer des effets visuels complexes impossibles avec l'éclairage RGB standard, comme des dégradés fluides, des vagues de couleur, ou des animations directionnelles.

Pack de 2 barres connectées en Wi-Fi, contrôlables via app mobile et assistants vocaux. Parfaites pour éclairer un bureau, mettre en valeur un meuble, créer une ambiance gaming, ou servir de veilleuse d'ambiance intelligente. Design minimaliste qui se fond dans n'importe quel décor moderne.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Barres LED Smart', details: 'Pack de 2 barres' },
        { icon: '🎨', label: 'COULEURS', value: 'RGB+IC', details: 'Contrôle indépendant' },
        { icon: '🌈', label: 'EFFETS', value: 'Dégradés', details: 'Animations complexes' },
        { icon: '📱', label: 'CONTRÔLE', value: 'App + Vocal', details: 'Wi-Fi smart' },
        { icon: '⚡', label: 'ALIMENTATION', value: 'USB', details: 'Câble inclus' },
        { icon: '🏠', label: 'USAGE', value: 'Intérieur', details: 'Multi-usages' },
        { icon: '🎮', label: 'GAMING', value: 'Optimisé', details: 'Setup gaming' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🌈', text: 'RGB+IC avancé - Contrôle indépendant de chaque LED pour effets complexes' },
        { icon: '📱', text: 'Smart control - App mobile et commande vocale intégrées' },
        { icon: '🎨', text: 'Effets premium - Dégradés, vagues, animations directionnelles' },
        { icon: '💡', text: 'Design élégant - Barres compactes au style minimaliste moderne' },
        { icon: '🎮', text: 'Gaming setup - Éclairage d\'ambiance parfait pour bureau gaming' },
        { icon: '🔧', text: 'Installation facile - Montage rapide avec supports adhésifs' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Les barres LED MONSTER ILLUMINESCENCE SMART CHROMA représentent l'évolution de l'éclairage décoratif. La technologie RGB+IC offre des possibilités créatives inégalées avec des effets visuels qui impressionnent.

**Technologie IC** - Contrôle LED individuel pour effets impossibles en RGB standard.

**Format compact** - Barres élégantes qui s'intègrent discrètement partout.

**Smart & vocal** - Contrôle moderne via app et assistants vocaux.`,
    layout_variant: 'text-left-image-right'
  }
};

// CMS pour Smart Prism II - Panneaux lumineux modulaires
const smartPrismIICMS = {
  description_card: {
    title: 'Description',
    content: `Les panneaux lumineux MONSTER ILLUMINESCENCE SMART PRISM II X6 révolutionnent l'éclairage décoratif avec leur système modulaire de 6 panneaux connectables. Chaque panneau triangulaire s'assemble aux autres pour créer des compositions géométriques personnalisées, transformant votre mur en œuvre d'art lumineuse interactive.

La technologie RGB+IC Flow permet à chaque panneau d'afficher des couleurs et animations indépendantes tout en se synchronisant pour créer des effets d'ensemble spectaculaires. Contrôle Wi-Fi, app mobile, assistants vocaux, et modes prédéfinis pour une personnalisation totale. Design iconique reconnaissable qui devient le point focal de n'importe quelle pièce.`,
    layout_variant: 'text-left-image-right'
  },
  specs_grid: {
    title: 'Caractéristiques Techniques',
    metadata: {
      specs: [
        { icon: '💡', label: 'TYPE', value: 'Panneaux Smart', details: 'Pack de 6 modules' },
        { icon: '🔺', label: 'FORME', value: 'Triangulaire', details: 'Modulaire connecté' },
        { icon: '🎨', label: 'COULEURS', value: 'RGB+IC Flow', details: '16M+ couleurs' },
        { icon: '🌊', label: 'EFFETS', value: 'Synchronisés', details: 'Animations fluides' },
        { icon: '📱', label: 'CONTRÔLE', value: 'App + Vocal', details: 'Wi-Fi smart' },
        { icon: '🔌', label: 'CONNEXION', value: 'Modulaire', details: 'Connecteurs inclus' },
        { icon: '⚡', label: 'ALIMENTATION', value: 'Secteur', details: 'Adaptateur puissant' },
        { icon: '✅', label: 'GARANTIE', value: '2 ans', details: 'Garantie constructeur' }
      ]
    },
    layout_variant: 'grid-4-cols'
  },
  features_list: {
    title: 'Points Forts',
    metadata: {
      features: [
        { icon: '🔺', text: 'Design modulaire - 6 panneaux connectables pour compositions infinies' },
        { icon: '🌊', text: 'RGB+IC Flow - Effets synchronisés spectaculaires entre panneaux' },
        { icon: '🎨', text: 'Œuvre d\'art murale - Transformez votre mur en installation lumineuse' },
        { icon: '📱', text: 'Smart complet - App, vocal, scénarios programmables' },
        { icon: '💡', text: 'Iconique - Design reconnaissable qui impressionne' },
        { icon: '🎮', text: 'Gaming spectacle - Centre d\'attention ultime pour setup pro' }
      ]
    },
    layout_variant: 'image-left-text-right'
  },
  engagement_card: {
    title: 'Pourquoi Choisir ce Produit ?',
    content: `Les panneaux MONSTER ILLUMINESCENCE SMART PRISM II X6 transcendent l'éclairage pour devenir une véritable installation artistique interactive. Le système modulaire permet de créer votre propre composition unique qui évoluera avec vos envies.

**Art lumineux** - Chaque installation est unique, créez votre œuvre personnelle.

**Technologie premium** - RGB+IC Flow pour effets synchronisés impossibles ailleurs.

**Impact visuel** - Point focal spectaculaire qui définit l'ambiance de la pièce.`,
    layout_variant: 'text-left-image-right'
  }
};

async function enrichMonsterLEDCMS() {
  console.log('🎨 ENRICHISSEMENT CMS PRODUITS MONSTER LED\n');
  console.log('='.repeat(80));

  const { data: brand } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%monster%')
    .single();

  if (!brand) {
    console.log('❌ Marque MONSTER introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // Récupérer tous les produits MONSTER LED
  const ledCategoryNames = ['LED', 'Barre LED', 'Cables Lumineux', 'Kits Éclairage', 'Néon', 'RGB', 'Ampoules'];

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .in('name', ledCategoryNames);

  if (!categories) {
    console.log('❌ Catégories LED introuvables');
    return;
  }

  const categoryIds = categories.map(c => c.id);

  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .eq('brand_id', brand.id)
    .in('category_id', categoryIds)
    .eq('status', 'active');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit MONSTER LED trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits MONSTER LED à enrichir:\n`);

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const product of products) {
    console.log(`\n🔄 ${product.name}`);
    console.log(`   Slug: ${product.url_slug}`);

    // Vérifier si le produit a déjà 4 sections CMS
    const { data: existingSections } = await supabase
      .from('product_content_sections')
      .select('section_type')
      .eq('product_id', product.id);

    if (existingSections && existingSections.length === 4) {
      console.log(`   ⏭️  Déjà enrichi (4/4 sections) - ignoré`);
      skippedCount++;
      continue;
    }

    // Déterminer quel contenu CMS utiliser
    let cmsContent;
    const slug = product.url_slug;

    if (slug === 'monster-illuminescence-basic-led-light-bar-pair-rgb-int') {
      cmsContent = basicLedLightBarCMS;
    } else if (slug === 'monster-illuminescence-basic-led-touch-light-x3-rgb-int') {
      cmsContent = basicLedTouchLightCMS;
    } else if (slug === 'monster-illuminescence-smart-chroma-light-2x-bars-rgb-ic') {
      cmsContent = smartChromaLightCMS;
    } else if (slug === 'monster-illuminescence-smart-prism-ii-x6-rgbic-flow') {
      cmsContent = smartPrismIICMS;
    } else if (slug.includes('motion-reactive') && slug.includes('piles')) {
      cmsContent = motionReactiveBatteryCMS;
    } else if (slug.includes('ipx6') || slug.includes('intext-ipx')) {
      cmsContent = ipx6ExteriorCMS;
    } else if (slug.includes('sound-reactive') || slug.includes('sound-react')) {
      cmsContent = basicLightStripSoundReactiveCMS;
    } else if (slug.includes('multicol-sound-flow') || (slug.includes('multicol-flow') && slug.includes('basic'))) {
      cmsContent = basicFlowMulticolCMS;
    } else if (slug.includes('flow') || slug.includes('neon')) {
      cmsContent = smartFlowNeonCMS;
    } else if (slug.includes('smart-light-strip')) {
      cmsContent = smartLightStripStandardCMS;
    } else if (slug === 'monster-illuminescence-basic-light-strip-30m-rgb-int') {
      cmsContent = basicLightStrip30MCMS;
    } else {
      console.log(`   ⏭️  Contenu CMS non encore créé pour ce produit - à faire manuellement`);
      skippedCount++;
      continue;
    }

    // Supprimer les anciennes sections CMS si elles existent
    await supabase
      .from('product_content_sections')
      .delete()
      .eq('product_id', product.id);

    // Créer les 4 sections CMS
    const sections = [
      {
        product_id: product.id,
        section_type: 'description_card',
        title: cmsContent.description_card.title,
        content: cmsContent.description_card.content,
        images: [],
        is_enabled: true,
        display_order: 1,
        layout_variant: cmsContent.description_card.layout_variant,
        metadata: {}
      },
      {
        product_id: product.id,
        section_type: 'specs_grid',
        title: cmsContent.specs_grid.title,
        content: null,
        images: [],
        is_enabled: true,
        display_order: 2,
        layout_variant: cmsContent.specs_grid.layout_variant,
        metadata: cmsContent.specs_grid.metadata
      },
      {
        product_id: product.id,
        section_type: 'features_list',
        title: cmsContent.features_list.title,
        content: null,
        images: [],
        is_enabled: true,
        display_order: 3,
        layout_variant: cmsContent.features_list.layout_variant,
        metadata: cmsContent.features_list.metadata
      },
      {
        product_id: product.id,
        section_type: 'engagement_card',
        title: cmsContent.engagement_card.title,
        content: cmsContent.engagement_card.content,
        images: [],
        is_enabled: true,
        display_order: 4,
        layout_variant: cmsContent.engagement_card.layout_variant,
        metadata: {}
      }
    ];

    const { error } = await supabase
      .from('product_content_sections')
      .insert(sections);

    if (error) {
      console.log(`   ❌ Erreur: ${error.message}`);
      errorCount++;
    } else {
      console.log(`   ✅ 4 sections CMS créées avec succès`);
      successCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 RÉSULTATS:`);
  console.log(`   ✅ Succès: ${successCount} produits`);
  console.log(`   ⏭️  Ignorés: ${skippedCount} produits`);
  console.log(`   ❌ Erreurs: ${errorCount} produits`);
  console.log(`   📦 Total: ${products.length} produits\n`);
}

enrichMonsterLEDCMS();
