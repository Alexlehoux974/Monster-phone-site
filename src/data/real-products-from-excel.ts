/**
 * Liste des produits réels depuis le fichier Excel de stock
 * Ces produits sont les seuls qui doivent apparaître dans le header
 */

export const realProductsFromExcel = new Set([
  // HONOR Smartphones
  "HONOR X8B GRIS 8+8/512",
  "HONOR X8B NOIR 8+8/512",
  "HONOR X9B ORANGE 12+8/256",
  "HONOR X9B NOIR 12+8/256",
  "HONOR X7C NOIR 8+6/256",
  "HONOR X5B BLEU 4+4/64",
  "HONOR 200 PRO NOIR 12+12/512",
  "HONOR 200 PRO BLANC 12+12/512",
  
  // HIFUTURE Montres
  "HIFUTURE MONTRE EVO 2 BEIGE",
  "HIFUTURE MONTRE EVO 2 NOIR",
  "MONTRE HIFUTURE ZONE 2 ROSE",
  "MONTRE HIFUTURE ZONE 2 NOIR",
  "MONTRE HIFUTURE AURORA BLEU",
  "MONTRE HIFUTURE AIX GRISE ACIER",
  "MONTRE HIFUTURE LUME PRO PINK",
  "MONTRE HIFUTURE LUME NOIR",
  "MONTRE HIFUTURE VELA NOIR",
  "MONTRE HIFUTURE AURA 2 NOIR",
  "MONTRE HIFUTURE LUME CHAMPAGNE",
  "MONTRE HIFUTURE VELA BEIGE",
  "MONTRE HIFUTURE LUME PRO VERT",
  "MONTRE HIFUTURE MIXX 3 JAUNE FLUO",
  
  // HIFUTURE Audio
  "ECOUTEUR HIFUTURE SONIFY NOIR",
  "ECOUTEUR HIFUTURE FLYBUDS 4 ANC BEIGE",
  "ECOUTEUR HIFUTURE OLYMBUDS 3 NOIR",
  "ECOUTEUR HIFUTURE OLYMBUDS 3 BLANC",
  "ENCEINTE HIFUTURE RIPPLE NOIR",
  "ENCEINTE HIFUTURE RIPPLE ROUGE",
  "ECOUTEUR CONDUCTION A AIR MATE NOIR",
  "CASQUE HIFUTURE TOUR X NOIR",
  
  // MONSTER Audio
  "MONSTER CHAMPION AIRLINKS",
  "MONSTER ELEMENT AIR",
  "MONSTER ENCEINTE S150 PLUS NOIR",
  "MONSTER PERSONA SE ANC GRIS",
  "MONSTER TH300 TACTILE BLANC",
  "MONSTER ENCEINTE CUBE 1 NOIR",
  "MONSTER BLASTER MICRO NOIR",
  
  // MONSTER LED/Illuminescence
  "MONSTER ILLUMINESCENCE SMART LIGHT STRIP 2M INT",
  "MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M MOTION REACTIVE PILES INT",
  "MONSTER ILLUMINESCENCE SMART LIGHT STRIP 2M MULTICOLOR FLOW INT",
  "MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M RGB + IC FLOW INT",
  "MONSTER ILLUMINESCENCE DUO + SOUND REACTIVE MONITOR LIGHT",
  "MONSTER ILLUMINESCENCE BASIC LED LIGHT BAR PAIR RGB INT",
  "MONSTER ILLUMINESCENCE SMART CHROMA LIGHT 2X BARS RGB IC",
  "MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M NEON RGB SOUND REACTIVE INT",
  
  // MONSTER Accessoires
  "MONSTER NETTOYANT ET LINGETTE 200ML",
  "MONSTER CABLE HDMI ESSENTIAL 4K 1M8",
  
  // MY WAY
  "POWERBANK MYWAY 20K MAH",
  "POWERBANK MY WAY 5K MAH MAGSAFE",
  "CHARGEUR SANS FILS MY WAY 15W MAGSAFE DONUTS",
  "CABLE TIGER POWER LITE 6 EN 1 AVEC APPLE WATCH",
  
  // MUVIT
  "APPAREIL PHOTO ENFANT MUVIT KIDPIC BLEU",
  "CASQUE SANS FILS ENFANTS MUVIT PIKA",
  
  // NOKIA
  "NOKIA G42 5G",
  "NOKIA C32",
  "NOKIA 105 2023",
  "NOKIA 110 4G 2024"
]);

/**
 * Normaliser le nom d'un produit pour la comparaison
 */
export function normalizeProductName(name: string): string {
  return name
    .toUpperCase()
    .replace(/[📱🎧⌚💡🔧📦]/g, '') // Enlever les emojis
    .replace(/\s+/g, ' ') // Normaliser les espaces
    .trim();
}

/**
 * Vérifier si un produit est réel (existe dans le stock Excel)
 */
export function isRealProduct(productName: string): boolean {
  const normalized = normalizeProductName(productName);
  
  // Vérifier correspondance exacte
  if (realProductsFromExcel.has(normalized)) {
    return true;
  }
  
  // Vérifier correspondance partielle pour certains produits
  for (const realProduct of realProductsFromExcel) {
    // Cas spéciaux pour les produits HONOR (sans les specs mémoire)
    if (normalized.includes('HONOR') && realProduct.includes('HONOR')) {
      const baseNameNormalized = normalized.replace(/\d+\+\d+\/\d+/g, '').trim();
      const baseNameReal = realProduct.replace(/\d+\+\d+\/\d+/g, '').trim();
      if (baseNameNormalized === baseNameReal) {
        return true;
      }
    }
    
    // Cas spéciaux pour HIFUTURE
    if (normalized.includes('HIFUTURE')) {
      // Enlever "MONTRE" du début si présent
      const cleanNormalized = normalized.replace(/^MONTRE\s+/, '');
      const cleanReal = realProduct.replace(/^MONTRE\s+/, '');
      if (cleanNormalized === cleanReal || cleanReal === normalized) {
        return true;
      }
    }
    
    // Correspondance exacte après normalisation
    if (normalizeProductName(realProduct) === normalized) {
      return true;
    }
  }
  
  return false;
}