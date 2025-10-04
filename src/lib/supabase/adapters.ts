/**
 * Adaptateurs pour convertir les types Supabase vers les types legacy
 * Facilite la migration progressive des composants
 */

import type { ProductFullView, DatabaseCategory } from './client';
import type { Product, ProductVariant as LegacyVariant, Review, ProductSpecification, CategoryStructure } from '@/data/products';

/**
 * Convertir un ProductFullView Supabase vers le type Product legacy
 */
export function supabaseProductToLegacy(product: ProductFullView): Product {
  // Débogage pour vérifier brand_name
  if (product.name?.toLowerCase().includes('monster')) {
    console.log(`🔍 Produit Monster détecté: ${product.name}`);
    console.log(`   - brand_name dans ProductFullView: ${product.brand_name}`);
  }
  
  // Construire les variants legacy depuis variants
  const variants: LegacyVariant[] = product.variants?.map(v => ({
    id: v.id, // ID Supabase pour mise à jour stock
    color: v.color || '',
    colorCode: v.color_code || '',
    ean: v.ean || '',
    stock: v.stock || 0,
    images: v.images || [],
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
  })) || []; // Ne plus générer d'avis par défaut

  // Calculer le rating avec les notes de Supabase
  const rating = {
    average: product.average_rating || 4.5,
    count: product.total_reviews || 0,
    distribution: (product.total_reviews ?? 0) > 0
      ? calculateRatingDistribution(reviews)
      : { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  };

  // Utiliser brand_name de la vue products_full, ou extraire depuis le nom du produit
  let brandName = product.brand_name;
  
  // Toujours vérifier dans le nom du produit pour Monster, même si brand_name existe
  // car il semble y avoir un problème avec brand_name qui n'est pas toujours défini
  if (product.name) {
    const nameLower = product.name.toLowerCase();
    
    // Forcer la détection pour Monster
    if (nameLower.includes('monster')) {
      brandName = 'Monster';
    } else if (!brandName) {
      // Pour les autres marques, détecter seulement si brand_name n'est pas défini
      if (nameLower.includes('muvit')) {
        brandName = 'MUVIT';
      } else if (nameLower.includes('samsung')) {
        brandName = 'Samsung';
      } else if (nameLower.includes('apple') || nameLower.includes('iphone')) {
        brandName = 'Apple';
      } else if (nameLower.includes('xiaomi')) {
        brandName = 'Xiaomi';
      } else if (nameLower.includes('honor')) {
        brandName = 'Honor';
      } else if (nameLower.includes('my way')) {
        brandName = 'MY WAY';
      }
    }
  }
  
  return {
    id: product.id,
    airtableId: product.id, // Utiliser l'ID Supabase comme airtableId pour compatibilité
    sku: product.sku,
    name: product.name,
    brand: brandName || 'Sans marque',
    category: mapCategoryToLegacy(product.category_name || ''),
    subcategory: mapSubcategoryToLegacy(product.subcategory_name),
    price: product.price,
    originalPrice: product.original_price,
    discount: product.discount_percentage,
    promo: product.discount_percentage ? `${product.discount_percentage}% de réduction` : undefined,
    description: product.description || '',
    shortDescription: product.short_description || product.description?.substring(0, 150) || '',
    urlSlug: product.url_slug,
    images: product.images || [],
    specifications,
    highlights: product.highlights || generateHighlights(product),
    badges: product.badges || [],
    variants,
    stockQuantity: product.stock_quantity, // Stock pour produits sans variants
    rating,
    reviews,
    warranty: product.warranty || '2 ans constructeur',
    deliveryTime: product.delivery_time || '24-48h',
    repairabilityIndex: product.repairability_index,
    dasHead: product.das_head,
    dasBody: product.das_body,
    keywords: [],
    metaTitle: `${product.name} | Monster Phone 974`,
    metaDescription: product.short_description || product.description?.substring(0, 160) || `${product.name} disponible chez Monster Phone La Réunion`,
    status: (product.status as 'active' | 'draft' | 'out-of-stock') || 'active'
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
    'audio-écouteurs': 'Écouteurs',
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
  
  if (product.discount_percentage) {
    highlights.push(`Promotion -${product.discount_percentage}%`);
  }
  
  if (product.variants && product.variants.length > 0) {
    const totalStock = product.variants.reduce((sum: number, v: any) => sum + (v.stock || 0), 0);
    if (totalStock > 0) {
      highlights.push('En stock');
    }
  }
  
  return highlights.slice(0, 4);
}

/**
 * Calculer la distribution des ratings
 */
function calculateRatingDistribution(reviews: Review[]): { 5: number; 4: number; 3: number; 2: number; 1: number } {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      distribution[review.rating as 1 | 2 | 3 | 4 | 5]++;
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
 * Utilise la structure parent-enfant des catégories de la base de données
 */
export function generateMenuStructureFromProducts(
  products: Product[],
  categories?: DatabaseCategory[]
): CategoryStructure[] {
  // Créer une Map pour organiser les produits par catégorie
  const categoryProductsMap = new Map<string, Product[]>();
  const categoryInfo = new Map<string, DatabaseCategory>();

  // Si on a les catégories, les utiliser pour créer la hiérarchie
  if (categories && categories.length > 0) {
    categories.forEach(cat => {
      categoryInfo.set(cat.id, cat);
    });
  }

  // Icônes par slug de catégorie
  const categoryIcons: Record<string, string> = {
    'smartphones': '📱',
    'tablettes': '📱',
    'audio': '🎧',
    'montres': '⌚',
    'led': '💡',
    'accessoires': '🔧'
  };

  // Organiser les produits par catégorie principale
  products.forEach(product => {
    if (!product.category) return;

    // Utiliser le nom de la catégorie tel quel
    const categoryKey = product.category;

    if (!categoryProductsMap.has(categoryKey)) {
      categoryProductsMap.set(categoryKey, []);
    }

    categoryProductsMap.get(categoryKey)!.push(product);
  });

  // Construire la structure du menu
  const menuStructure: CategoryStructure[] = [];

  // Ordre préféré des catégories par nom
  const categoryOrder = ['Smartphones', 'Tablettes', 'Montres', 'Audio', 'LED', 'Accessoires'];

  categoryOrder.forEach(categoryName => {
    const products = categoryProductsMap.get(categoryName);
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
        (categoryName === 'Tablettes' && product.subcategory?.toLowerCase() === 'premium') ||
        (categoryName === 'Smartphones' && product.subcategory);
        
      if (product.subcategory && !excludeSubcategory) {
        let displaySubcategory = product.subcategory;
        
        // Utiliser les nouvelles sous-catégories Audio
        if (categoryName === 'Audio') {
          const subcatLower = product.subcategory.toLowerCase();
          
          // Mapper vers les sous-catégories Audio
          if (subcatLower === 'écouteurs' || subcatLower === 'ecouteurs' || subcatLower === 'earbuds' || subcatLower === 'airpods') {
            displaySubcategory = 'Écouteurs';
          }
          else if (subcatLower === 'casques' || subcatLower === 'casques-audio' || subcatLower === 'headphones') {
            displaySubcategory = 'Casques';
          }
          else if (subcatLower === 'enceintes' || subcatLower === 'speakers' || subcatLower === 'haut-parleurs') {
            displaySubcategory = 'Enceintes';
          }
          else if (subcatLower === 'gaming-audio' || subcatLower === 'gaming audio' || subcatLower === 'gaming') {
            displaySubcategory = 'Gaming Audio';
          }
        }
        
        // Utiliser les nouvelles sous-catégories LED créées dans la base
        else if (categoryName === 'Éclairage LED') {
          const subcatLower = product.subcategory.toLowerCase();
          
          // Mapper vers les nouvelles sous-catégories
          if (subcatLower === 'ampoules' || subcatLower === 'ampoules smart') {
            displaySubcategory = 'Ampoules';
          }
          else if (subcatLower === 'bandeaux led' || subcatLower === 'bandes led' || subcatLower === 'barres led' || subcatLower === 'barre led') {
            displaySubcategory = 'Barre LED';
          }
          else if (subcatLower === 'kits éclairage' || subcatLower === 'lampes led' || 
                   subcatLower === 'lampes écran' || subcatLower === 'light bars' || 
                   subcatLower === 'projecteurs' || subcatLower === 'éclairage studio') {
            displaySubcategory = 'Kits Éclairage';
          }
          else if (subcatLower === 'néon led' || subcatLower === 'néon') {
            displaySubcategory = 'Néon';
          }
          else if (subcatLower === 'déco led' || subcatLower === 'panneaux led' || 
                   subcatLower === 'rétroéclairage tv' || subcatLower === 'rgb') {
            displaySubcategory = 'RGB';
          }
          else if (subcatLower === 'cables-lumineux' || subcatLower === 'câbles lumineux' || 
                   product.name.toLowerCase().includes('câble lumineux') || 
                   product.name.toLowerCase().includes('cable lumineux')) {
            displaySubcategory = 'Cables Lumineux';
          }
        }
        
        // Utiliser les nouvelles sous-catégories Accessoires
        else if (categoryName === 'Accessoires') {
          const subcatLower = product.subcategory.toLowerCase();
          
          // Mapper vers les sous-catégories Accessoires
          if (subcatLower === 'batteries-externes' || subcatLower === 'batteries externes' || 
              subcatLower === 'powerbank' || product.name.toLowerCase().includes('powerbank')) {
            displaySubcategory = 'Batteries externes';
          }
          else if (subcatLower === 'chargeurs' || subcatLower === 'chargers' || 
                   product.name.toLowerCase().includes('chargeur')) {
            displaySubcategory = 'Chargeurs';
          }
          else if (subcatLower === 'câbles' || subcatLower === 'cables' || 
                   product.name.toLowerCase().includes('câble') || 
                   product.name.toLowerCase().includes('cable')) {
            displaySubcategory = 'Câbles';
          }
          else if (subcatLower === 'accessoires-photo' || subcatLower === 'photo' || 
                   product.name.toLowerCase().includes('photo') || 
                   product.name.toLowerCase().includes('appareil')) {
            displaySubcategory = 'Accessoires Photo';
          }
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

    // Pour LED, toujours afficher toutes les sous-catégories
    if (categoryName === 'Éclairage LED') {
      const ledSubcategories = [
        { name: 'Barre LED', slug: 'barre-led', brands: [] as string[] },
        { name: 'Néon', slug: 'neon', brands: [] as string[] },
        { name: 'Kits Éclairage', slug: 'kits-eclairage', brands: [] as string[] },
        { name: 'Ampoules', slug: 'ampoules', brands: [] as string[] },
        { name: 'RGB', slug: 'rgb', brands: [] as string[] },
        { name: 'Cables Lumineux', slug: 'cables-lumineux', brands: [] as string[] }
      ];

      // Ajouter les marques des produits existants
      ledSubcategories.forEach(subcat => {
        if (subcategoryMap.has(subcat.name)) {
          subcat.brands = Array.from(subcategoryMap.get(subcat.name)!).sort();
        }
      });

      subcategories.push(...ledSubcategories);
    } 
    // Pour Audio, afficher toutes les sous-catégories définies
    else if (categoryName === 'Audio') {
      const audioSubcategories = [
        { name: 'Écouteurs', slug: 'ecouteurs', brands: [] as string[] },
        { name: 'Casques', slug: 'casques-audio', brands: [] as string[] },
        { name: 'Enceintes', slug: 'enceintes', brands: [] as string[] },
        { name: 'Gaming Audio', slug: 'gaming-audio', brands: [] as string[] }
      ];

      // Ajouter les marques des produits existants pour chaque sous-catégorie
      audioSubcategories.forEach(subcat => {
        if (subcategoryMap.has(subcat.name)) {
          subcat.brands = Array.from(subcategoryMap.get(subcat.name)!).sort();
        }
      });

      // Afficher toutes les sous-catégories Audio qui ont des produits
      subcategories.push(...audioSubcategories.filter(s => subcategoryMap.has(s.name)));
    }
    // Pour Accessoires, afficher toutes les sous-catégories définies
    else if (categoryName === 'Accessoires') {
      const accessoiresSubcategories = [
        { name: 'Batteries externes', slug: 'batteries-externes', brands: [] as string[] },
        { name: 'Chargeurs', slug: 'chargeurs', brands: [] as string[] },
        { name: 'Câbles', slug: 'cables', brands: [] as string[] },
        { name: 'Accessoires Photo', slug: 'accessoires-photo', brands: [] as string[] }
      ];

      // Ajouter les marques des produits existants pour chaque sous-catégorie
      accessoiresSubcategories.forEach(subcat => {
        if (subcategoryMap.has(subcat.name)) {
          subcat.brands = Array.from(subcategoryMap.get(subcat.name)!).sort();
        }
      });

      // Afficher toutes les sous-catégories Accessoires qui ont des produits
      subcategories.push(...accessoiresSubcategories.filter(s => subcategoryMap.has(s.name)));
    } else {
      // Pour les autres catégories, n'ajouter que les sous-catégories avec des produits
      if (subcategoryMap.size > 0) {
        subcategoryMap.forEach((brands, subcatName) => {
          subcategories.push({
            name: subcatName,
            slug: subcatName.toLowerCase().replace(/\s+/g, '-'),
            brands: Array.from(brands).sort()
          });
        });
      }
    }

    // Ajouter une entrée "Tous nos produits" avec toutes les marques de la catégorie
    // Sauf pour Audio, LED et Accessoires qui ont leur propre structure
    if (brandsInCategory.size > 0 && categoryName !== 'Audio' && categoryName !== 'Éclairage LED' && categoryName !== 'Accessoires') {
      subcategories.unshift({
        name: 'Tous nos produits',
        slug: 'toutes-les-marques',
        brands: Array.from(brandsInCategory).sort()
      });
    }

    // Générer le slug à partir du nom de la catégorie
    const categorySlug = categoryName.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Enlever les accents
      .replace(/\s+/g, '-'); // Remplacer les espaces par des tirets

    // Ajouter la catégorie au menu avec son icône
    const icon = categoryIcons[categorySlug] || '📦';

    menuStructure.push({
      name: `${icon} ${categoryName}`,
      slug: categorySlug,
      subcategories: subcategories.sort((a, b) => {
        // Mettre "Tous nos produits" en premier
        if (a.name === 'Tous nos produits') return -1;
        if (b.name === 'Tous nos produits') return 1;
        return a.name.localeCompare(b.name);
      })
    });

    // Log pour debug
    console.log(`Catégorie ${categoryName}: ${products.length} produits, ${brandsInCategory.size} marques`);
  });

  // NE PAS ajouter les catégories qui ne sont pas dans l'ordre préféré
  // Toutes les autres catégories ont déjà été mappées vers "accessoires"

  console.log(`Menu généré: ${menuStructure.length} catégories avec ${products.length} produits au total`);
  
  return menuStructure;
}