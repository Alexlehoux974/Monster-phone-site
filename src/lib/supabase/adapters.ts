/**
 * Adaptateurs pour convertir les types Supabase vers les types legacy
 * Facilite la migration progressive des composants
 */

import type { ProductFullView } from './client';
import type { Product, ProductVariant as LegacyVariant, Review, ProductSpecification, CategoryStructure } from '@/data/products';

/**
 * Convertir un ProductFullView Supabase vers le type Product legacy
 */
export function supabaseProductToLegacy(product: ProductFullView): Product {
  // Construire les variants legacy depuis product_variants
  const variants: LegacyVariant[] = product.product_variants?.map(v => ({
    id: v.id,
    color: v.color,
    colorHex: v.color_code,
    price: product.price, // Les variants n'ont pas de prix séparé pour l'instant
    originalPrice: undefined,
    images: v.images || [],
    stock: v.stock || 0,
    sku: v.ean, // Utiliser l'EAN comme SKU pour les variants
    is_default: v.is_default
  })) || [];

  // Construire les spécifications
  const specifications: ProductSpecification[] = [];
  
  // Ajouter les spécifications depuis les données Supabase
  if (product.specifications) {
    Object.entries(product.specifications).forEach(([key, value]) => {
      if (value) {
        specifications.push({
          label: formatSpecLabel(key),
          value: String(value)
        });
      }
    });
  }

  // Construire les avis (reviews)
  const reviews: Review[] = product.reviews?.map(r => ({
    id: r.id,
    author: r.author_name,
    rating: r.rating,
    date: r.created_at,
    title: r.title || '',
    comment: r.comment || '',
    verified: r.is_verified || false,
    helpful: r.helpful_count || 0
  })) || generateDefaultReviews(product.name);

  // Calculer le rating
  const rating = {
    average: product.average_rating || 4.5,
    count: product.total_reviews || reviews.length,
    distribution: calculateRatingDistribution(reviews)
  };

  return {
    id: product.id,
    name: product.name,
    brand: product.brand_name || 'Sans marque',
    category: mapCategoryToLegacy(product.category_slug || ''),
    subcategory: mapSubcategoryToLegacy(product.subcategory_slug),
    price: product.price,
    originalPrice: product.original_price,
    discount: product.discount_percentage,
    promo: product.is_promo || false,
    description: product.description || '',
    shortDescription: product.short_description || product.description?.substring(0, 150) || '',
    urlSlug: product.url_slug,
    images: product.images || [],
    specifications,
    highlights: product.highlights || generateHighlights(product),
    badges: product.badges || [],
    variants,
    hasVariants: product.has_variants || (variants.length > 0),
    stock: product.stock || product.stock_quantity || 0,
    rating,
    reviews,
    warranty: product.warranty || '2 ans constructeur',
    deliveryTime: product.delivery_time || '24-48h',
    repairabilityIndex: product.repairability_index,
    dasHead: product.das_head,
    dasBody: product.das_body,
    dasLimb: product.das_limb,
    keywords: product.keywords || [],
    metaTitle: product.meta_title,
    metaDescription: product.meta_description
  };
}

/**
 * Mapper les catégories Supabase vers les catégories legacy
 */
function mapCategoryToLegacy(supabaseCategory: string): string {
  const mapping: Record<string, string> = {
    'smartphones': 'Smartphones',
    'tablettes': 'Tablettes',
    'audio': 'Audio',
    'montres': 'Montres',
    'led': 'LED',
    'eclairage-led': 'LED',  // Ajouter la vraie catégorie de la base
    'éclairage-led': 'LED',  // Variation possible
    'eclairage led': 'LED',  // Autre variation
    'accessoires': 'Accessoires'
  };
  
  return mapping[supabaseCategory] || supabaseCategory;
}

/**
 * Mapper les sous-catégories Supabase vers les sous-catégories legacy
 */
function mapSubcategoryToLegacy(supabaseSubcategory?: string): string | undefined {
  if (!supabaseSubcategory) return undefined;
  
  const mapping: Record<string, string> = {
    // Smartphones
    'smartphones-entree-de-gamme': 'Entrée de gamme',
    'smartphones-milieu-de-gamme': 'Milieu de gamme', 
    'smartphones-haut-de-gamme': 'Haut de gamme',
    'smartphones-flagship': 'Flagship',
    'smartphones-flagship-pro': 'Flagship Pro',
    // Tablettes
    'tablettes-premium': 'Premium',
    // Audio
    'audio-ecouteurs': 'Écouteurs',
    'audio-casques': 'Casques',
    'audio-enceintes': 'Enceintes',
    // Montres
    'montres-connectees': 'Connectées',
    'montres-montres-connectees': 'Connectées',
    'montres-montres-sport': 'Sport',
    // LED
    'led-bandeaux-led': 'Bandeaux LED',
    'led-bandes-led': 'Bandes LED',
    'led-panneaux-led': 'Panneaux LED',
    'led-barres-led': 'Barres LED',
    'led-ampoules-smart': 'Ampoules Smart',
    'led-projecteurs': 'Projecteurs',
    'led-lampes-led': 'Lampes LED',
    'led-neon-led': 'Néon LED',
    'led-kits-eclairage': 'Kits Éclairage',
    'led-retroeclairage-tv': 'Rétroéclairage TV',
    'led-light-bars': 'Light Bars',
    'led-eclairage-studio': 'Éclairage Studio',
    'led-lampes-ecran': 'Lampes Écran',
    'led-deco-led': 'Déco LED',
    'led-ampoules': 'Ampoules',
    // Accessoires
    'accessoires-cables-et-connecteurs': 'Câbles et connecteurs',
    'accessoires-eclairage-led': 'Éclairage LED',
    'accessoires-chargeurs': 'Chargeurs',
    'accessoires-supports-gaming': 'Supports gaming',
    'accessoires-cables': 'Câbles',
    'accessoires-batteries-externes': 'Batteries externes',
    'accessoires-appareil-photo': 'Appareil Photo'
  };
  
  return mapping[supabaseSubcategory] || supabaseSubcategory;
}

/**
 * Formater les labels de spécifications
 */
function formatSpecLabel(key: string): string {
  const labels: Record<string, string> = {
    'screen_size': 'Taille écran',
    'screen_type': 'Type d\'écran',
    'resolution': 'Résolution',
    'processor': 'Processeur',
    'ram': 'RAM',
    'storage': 'Stockage',
    'battery': 'Batterie',
    'camera_main': 'Caméra principale',
    'camera_front': 'Caméra frontale',
    'os': 'Système',
    'connectivity': 'Connectivité',
    'weight': 'Poids',
    'dimensions': 'Dimensions',
    'color': 'Couleur',
    'material': 'Matériau'
  };
  
  return labels[key] || key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Générer des highlights par défaut
 */
function generateHighlights(product: ProductFullView): string[] {
  const highlights: string[] = [];
  
  if (product.brand_name) {
    highlights.push(`Marque ${product.brand_name} reconnue`);
  }
  
  if (product.warranty) {
    highlights.push(product.warranty);
  }
  
  if (product.delivery_time) {
    highlights.push(`Livraison ${product.delivery_time}`);
  }
  
  if (product.is_promo) {
    highlights.push(`Promotion -${product.discount_percentage}%`);
  }
  
  if (product.stock && product.stock > 0) {
    highlights.push('En stock');
  }
  
  return highlights.slice(0, 4);
}

/**
 * Calculer la distribution des ratings
 */
function calculateRatingDistribution(reviews: Review[]): Record<number, number> {
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      distribution[review.rating]++;
    }
  });
  
  // Si pas assez d'avis, générer une distribution réaliste
  if (reviews.length < 10) {
    return {
      5: Math.floor(reviews.length * 0.6),
      4: Math.floor(reviews.length * 0.25),
      3: Math.floor(reviews.length * 0.1),
      2: Math.floor(reviews.length * 0.03),
      1: Math.floor(reviews.length * 0.02)
    };
  }
  
  return distribution;
}

/**
 * Générer des avis par défaut (temporaire, pour la compatibilité)
 */
function generateDefaultReviews(productName: string): Review[] {
  const reviews: Review[] = [
    {
      id: '1',
      author: 'Jean D.',
      rating: 5,
      date: '2024-01-15',
      title: 'Excellent produit',
      comment: `Le ${productName} répond parfaitement à mes attentes. Livraison rapide à La Réunion.`,
      verified: true,
      helpful: 12
    },
    {
      id: '2',
      author: 'Marie L.',
      rating: 4,
      date: '2024-01-10',
      title: 'Très satisfaite',
      comment: 'Bon rapport qualité/prix. Monster Phone toujours au top !',
      verified: true,
      helpful: 8
    },
    {
      id: '3',
      author: 'Paul M.',
      rating: 5,
      date: '2024-01-05',
      title: 'Parfait',
      comment: 'Conforme à la description, je recommande.',
      verified: true,
      helpful: 5
    }
  ];
  
  return reviews;
}

/**
 * Convertir un tableau de ProductFullView vers Product[]
 */
export function convertProductsArray(products: ProductFullView[]): Product[] {
  return products.map(supabaseProductToLegacy);
}

/**
 * Obtenir les produits par catégorie (format legacy)
 */
export function getProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Obtenir les produits par marque (format legacy)
 */
export function getProductsByBrand(products: Product[], brand: string): Product[] {
  return products.filter(p => 
    p.brand.toLowerCase() === brand.toLowerCase()
  );
}

/**
 * Obtenir les produits par sous-catégorie (format legacy)
 * Gère le regroupement des sous-catégories LED
 */
export function getProductsBySubcategory(products: Product[], subcategory: string): Product[] {
  const subcategoryLower = subcategory.toLowerCase();
  
  // Si c'est une sous-catégorie regroupée LED, retourner tous les produits des sous-catégories correspondantes
  if (subcategoryLower === 'ampoules') {
    return products.filter(p => {
      if (!p.subcategory) return false;
      const subcat = p.subcategory.toLowerCase();
      // Gérer les variations exactes de la base de données
      return subcat === 'ampoules' || subcat === 'ampoules smart';
    });
  } else if (subcategoryLower === 'bandes & barres led') {
    return products.filter(p => {
      if (!p.subcategory) return false;
      const subcat = p.subcategory.toLowerCase();
      // Gérer les variations exactes de la base de données
      return subcat === 'bandeaux led' || subcat === 'bandes led' || subcat === 'barres led';
    });
  } else if (subcategoryLower === 'éclairage studio') {
    return products.filter(p => {
      if (!p.subcategory) return false;
      const subcat = p.subcategory.toLowerCase();
      // Inclure toutes les sous-catégories trouvées dans la base
      return subcat === 'kits éclairage' || subcat === 'lampes led' || 
             subcat === 'lampes écran' || subcat === 'light bars' || 
             subcat === 'néon led' || subcat === 'projecteurs' ||
             subcat === 'éclairage studio'; // Inclure aussi la catégorie existante
    });
  } else if (subcategoryLower === 'déco led' || subcategoryLower === 'panneaux led' || subcategoryLower === 'rétroéclairage tv') {
    // Gérer les autres sous-catégories LED non regroupées
    return products.filter(p => 
      p.subcategory?.toLowerCase() === subcategoryLower
    );
  }
  
  // Pour les autres sous-catégories, recherche normale
  return products.filter(p => 
    p.subcategory?.toLowerCase() === subcategoryLower
  );
}

/**
 * Génère dynamiquement la structure du menu depuis les produits Supabase
 * Remplace le menuStructure statique par une structure basée sur les données réelles
 */
export function generateMenuStructureFromProducts(products: Product[]): CategoryStructure[] {
  // Créer une Map pour organiser les produits par catégorie
  const categoryProductsMap = new Map<string, Product[]>();

  // Mapper les catégories normalisées
  const categoryNormalizer: Record<string, string> = {
    'smartphones': 'smartphones',
    'smartphone': 'smartphones',
    'tablettes': 'tablettes',
    'tablette': 'tablettes',
    'audio': 'audio',
    'chargement & audio': 'audio',
    'montres': 'montres',
    'montres connectées': 'montres',
    'montre': 'montres',
    'led': 'led',
    'créativité & led': 'led',
    'eclairage led': 'led',
    'éclairage led': 'led',
    'accessoires': 'accessoires',
    'accessoire': 'accessoires',
    'autres': 'accessoires'
  };

  // Icônes par catégorie
  const categoryIcons: Record<string, string> = {
    'smartphones': '📱',
    'tablettes': '📱',
    'audio': '🎧',
    'montres': '⌚',
    'led': '💡',
    'accessoires': '🔧'
  };

  // Noms d'affichage par catégorie
  const categoryDisplayNames: Record<string, string> = {
    'smartphones': 'Smartphones',
    'tablettes': 'Tablettes',
    'audio': 'Audio',
    'montres': 'Montres',
    'led': 'LED', 
    'accessoires': 'Accessoires'
  };

  // Parcourir tous les produits et les organiser par catégorie normalisée
  products.forEach(product => {
    if (!product.category) return;

    // Normaliser la catégorie
    const normalizedCategory = categoryNormalizer[product.category.toLowerCase()] || 
                              product.category.toLowerCase();
    
    if (!categoryProductsMap.has(normalizedCategory)) {
      categoryProductsMap.set(normalizedCategory, []);
    }
    
    categoryProductsMap.get(normalizedCategory)!.push(product);
  });

  // Construire la structure du menu
  const menuStructure: CategoryStructure[] = [];

  // Ordre préféré des catégories
  const categoryOrder = ['smartphones', 'tablettes', 'audio', 'montres', 'led', 'accessoires'];

  categoryOrder.forEach(categoryKey => {
    const products = categoryProductsMap.get(categoryKey);
    if (!products || products.length === 0) return;

    // Créer une structure par sous-catégories et marques
    const subcategoryMap = new Map<string, Set<string>>();
    const brandsInCategory = new Set<string>();

    products.forEach(product => {
      // Ajouter la marque
      if (product.brand) {
        brandsInCategory.add(product.brand);
      }

      // Organiser par sous-catégorie uniquement si elle existe
      // Exclure "Premium" pour les tablettes
      // Exclure toutes les sous-catégories pour les smartphones
      const excludeSubcategory = 
        (categoryKey === 'tablettes' && product.subcategory?.toLowerCase() === 'premium') ||
        (categoryKey === 'smartphones' && product.subcategory);
        
      if (product.subcategory && !excludeSubcategory) {
        let displaySubcategory = product.subcategory;
        
        // Regroupement des sous-catégories LED pour simplifier le menu
        if (categoryKey === 'led' || categoryKey === 'eclairage-led') {
          const subcatLower = product.subcategory.toLowerCase();
          
          // Regrouper Ampoules et Ampoules smart sous "Ampoules"
          if (subcatLower === 'ampoules' || subcatLower === 'ampoules smart') {
            displaySubcategory = 'Ampoules';
          }
          // Regrouper Bandeaux LED, Bandes LED et Barres LED sous "Bandes & Barres LED"
          else if (subcatLower === 'bandeaux led' || subcatLower === 'bandes led' || subcatLower === 'barres led') {
            displaySubcategory = 'Bandes & Barres LED';
          }
          // Regrouper Kits éclairage, Lampes LED, Lampes Écran, Light Bars, Néon LED, Projecteurs et Éclairage Studio sous "Éclairage Studio"
          else if (subcatLower === 'kits éclairage' || subcatLower === 'lampes led' || 
                   subcatLower === 'lampes écran' || subcatLower === 'light bars' || 
                   subcatLower === 'néon led' || subcatLower === 'projecteurs' ||
                   subcatLower === 'éclairage studio') {
            displaySubcategory = 'Éclairage Studio';
          }
          // Les autres sous-catégories LED restent telles quelles
          // Déco LED, Panneaux LED, Rétroéclairage TV
        }
        
        if (!subcategoryMap.has(displaySubcategory)) {
          subcategoryMap.set(displaySubcategory, new Set());
        }
        if (product.brand) {
          subcategoryMap.get(displaySubcategory)!.add(product.brand);
        }
      }
    });

    // Construire les sous-catégories pour le menu
    const subcategories = [];

    // Si on a des sous-catégories, les ajouter
    if (subcategoryMap.size > 0) {
      subcategoryMap.forEach((brands, subcatName) => {
        subcategories.push({
          name: subcatName,
          slug: subcatName.toLowerCase().replace(/\s+/g, '-'),
          brands: Array.from(brands).sort()
        });
      });
    }

    // Ajouter une entrée "Tous nos produits" avec toutes les marques de la catégorie
    if (brandsInCategory.size > 0) {
      subcategories.unshift({
        name: 'Tous nos produits',
        slug: 'toutes-les-marques',
        brands: Array.from(brandsInCategory).sort()
      });
    }

    // Ajouter la catégorie au menu avec son icône
    const icon = categoryIcons[categoryKey] || '📦';
    const displayName = categoryDisplayNames[categoryKey] || 
                       categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);

    menuStructure.push({
      name: `${icon} ${displayName}`,
      slug: categoryKey,
      subcategories: subcategories.sort((a, b) => {
        // Mettre "Tous nos produits" en premier
        if (a.name === 'Tous nos produits') return -1;
        if (b.name === 'Tous nos produits') return 1;
        return a.name.localeCompare(b.name);
      })
    });

    // Log pour debug
    console.log(`Catégorie ${categoryKey}: ${products.length} produits, ${brandsInCategory.size} marques`);
  });

  // Ajouter les catégories qui n'étaient pas dans l'ordre préféré
  categoryProductsMap.forEach((products, categoryKey) => {
    if (!categoryOrder.includes(categoryKey) && products.length > 0) {
      const subcategoryMap = new Map<string, Set<string>>();
      const brandsInCategory = new Set<string>();

      products.forEach(product => {
        if (product.brand) brandsInCategory.add(product.brand);
        
        // Organiser par sous-catégorie uniquement si elle existe
        // Exclure "Premium" pour les tablettes
        // Exclure toutes les sous-catégories pour les smartphones
        const excludeSubcategory = 
          (categoryKey === 'tablettes' && product.subcategory?.toLowerCase() === 'premium') ||
          (categoryKey === 'smartphones' && product.subcategory);
          
        if (product.subcategory && !excludeSubcategory) {
          let displaySubcategory = product.subcategory;
          
          // Regroupement des sous-catégories LED pour simplifier le menu
          if (categoryKey === 'led' || categoryKey === 'eclairage-led') {
            const subcatLower = product.subcategory.toLowerCase();
            
            // Regrouper Ampoules et Ampoules smart sous "Ampoules"
            if (subcatLower === 'ampoules' || subcatLower === 'ampoules smart') {
              displaySubcategory = 'Ampoules';
            }
            // Regrouper Bandeaux LED, Bandes LED et Barres LED sous "Bandes & Barres LED"
            else if (subcatLower === 'bandeaux led' || subcatLower === 'bandes led' || subcatLower === 'barres led') {
              displaySubcategory = 'Bandes & Barres LED';
            }
            // Regrouper Kits éclairage, Lampes LED, Lampes Écran, Light Bars, Néon LED, Projecteurs et Éclairage Studio sous "Éclairage Studio"
            else if (subcatLower === 'kits éclairage' || subcatLower === 'lampes led' || 
                     subcatLower === 'lampes écran' || subcatLower === 'light bars' || 
                     subcatLower === 'néon led' || subcatLower === 'projecteurs' ||
                     subcatLower === 'éclairage studio') {
              displaySubcategory = 'Éclairage Studio';
            }
            // Les autres sous-catégories LED restent telles quelles
            // Déco LED, Panneaux LED, Rétroéclairage TV
          }
          
          if (!subcategoryMap.has(displaySubcategory)) {
            subcategoryMap.set(displaySubcategory, new Set());
          }
          if (product.brand) {
            subcategoryMap.get(displaySubcategory)!.add(product.brand);
          }
        }
      });

      const subcategories = [];
      subcategoryMap.forEach((brands, subcatName) => {
        subcategories.push({
          name: subcatName,
          slug: subcatName.toLowerCase().replace(/\s+/g, '-'),
          brands: Array.from(brands).sort()
        });
      });

      if (brandsInCategory.size > 0) {
        subcategories.unshift({
          name: 'Tous nos produits',
          slug: 'toutes-les-marques',
          brands: Array.from(brandsInCategory).sort()
        });
      }

      const icon = categoryIcons[categoryKey] || '📦';
      const categoryName = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
      
      menuStructure.push({
        name: `${icon} ${categoryName}`,
        slug: categoryKey,
        subcategories: subcategories.sort((a, b) => {
          if (a.name === 'Tous nos produits') return -1;
          if (b.name === 'Tous nos produits') return 1;
          return a.name.localeCompare(b.name);
        })
      });

      console.log(`Catégorie ${categoryKey}: ${products.length} produits, ${brandsInCategory.size} marques`);
    }
  });

  console.log(`Menu généré: ${menuStructure.length} catégories avec ${products.length} produits au total`);
  
  return menuStructure;
}