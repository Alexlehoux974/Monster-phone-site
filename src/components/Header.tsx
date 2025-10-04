'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ChevronRight, ArrowRight, Truck, Flame, Trash2, CreditCard, Plus, Minus, Package, Smartphone, Watch, Headphones, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type CategoryStructure, type Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useSupabaseProducts, useSupabaseCategories } from '@/hooks/useSupabaseData';
import { supabaseProductToLegacy, generateMenuStructureFromProducts } from '@/lib/supabase/adapters';

// Composant pour la barre d'urgence promotionnelle
const PromoBar = () => (
  <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-2 px-3 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <div className="flex items-center justify-center gap-2 text-sm font-medium flex-wrap">
        <div className="flex items-center gap-1.5">
          <Truck className="w-4 h-4" />
          <span>LIVRAISON EXPRESS 24H/48H À LA RÉUNION</span>
        </div>
        <span className="hidden sm:block text-xs">•</span>
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4" />
          <span>LIVRAISON GRATUITE DÈS 50€</span>
        </div>
      </div>
    </div>
  </div>
);

// Composant DropdownMenu avec support complet des sous-catégories
const DropdownMenu = ({ 
  categories, 
  isOpen, 
  onClose,
  alignRight = false,
  menuType,
  allProducts,
  getProductsByCategory,
  getProductsByBrand
}: { 
  categories: CategoryStructure[];
  isOpen: boolean;
  onClose: () => void;
  alignRight?: boolean;
  menuType?: string;
  allProducts: Product[];
  getProductsByCategory: (category: string) => Product[];
  getProductsByBrand: (brand: string) => Product[];
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(categories[0]?.name || null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  // Réinitialiser les états quand le menu se ferme
  useEffect(() => {
    if (!isOpen) {
      setHoveredCategory(categories[0]?.name || null);
      setHoveredSubcategory(null);
      setHoveredBrand(null);
    } else {
      setHoveredCategory(categories[0]?.name || null);
      // Pour les menus avec structure simplifiée, initialiser avec la première marque
      if (categories[0]?.name) {
        const normalizedCat = categories[0].name.replace(/[📱🎧⌚💡🔧📦]/g, '').trim();
        const categoryProducts = allProducts.filter(p => {
          const productCat = p.category.replace(/[📱🎧⌚💡🔧📦]/g, '').trim();
          return productCat.toLowerCase() === normalizedCat.toLowerCase();
        });
        const brandSet = new Set<string>();
        categoryProducts.forEach(p => {
          if (p.brand) brandSet.add(p.brand);
        });
        const brands = Array.from(brandSet).sort();
        if (brands.length > 0) {
          setHoveredBrand(brands[0]);
        }
      }
    }
  }, [isOpen, categories, allProducts]);
  
  // Fonction helper pour vérifier si un produit appartient à une sous-catégorie consolidée LED
  const matchesConsolidatedSubcategory = (productSubcat: string | undefined, targetSubcat: string): boolean => {
    if (!productSubcat) return false;
    
    const productSubcatLower = productSubcat.toLowerCase();
    const targetSubcatLower = targetSubcat.toLowerCase();
    
    // Pour les catégories LED consolidées
    if (targetSubcatLower === 'ampoules') {
      return productSubcatLower === 'ampoules' || productSubcatLower === 'ampoules smart';
    } else if (targetSubcatLower === 'bandes & barres led') {
      return productSubcatLower === 'bandeaux led' || productSubcatLower === 'bandes led' || productSubcatLower === 'barres led';
    } else if (targetSubcatLower === 'éclairage studio') {
      return productSubcatLower === 'kits éclairage' || productSubcatLower === 'lampes led' || 
             productSubcatLower === 'lampes écran' || productSubcatLower === 'light bars' || 
             productSubcatLower === 'néon led' || productSubcatLower === 'projecteurs' ||
             productSubcatLower === 'éclairage studio';
    }
    
    // Pour les autres cas, comparaison exacte
    return productSubcat === targetSubcat;
  };

  // Obtenir les produits en fonction de la sélection
  const getProductsForDisplay = () => {
    // Normaliser les noms de catégories pour la comparaison
    const normalizeCategory = (cat: string) => {
      if (!cat) return '';
      // Retirer les emojis et normaliser
      const cleaned = cat.replace(/[📱🎧⌚💡🔧📦]/g, '').trim().toLowerCase();
      return cleaned;
    };
    
    const normalizedHoveredCategory = normalizeCategory(hoveredCategory || '');
    const isLEDCategory = normalizedHoveredCategory === 'led' || normalizedHoveredCategory === 'éclairage led';
    
    if (hoveredBrand) {
      // Filtrer par marque d'abord
      const brandProducts = allProducts.filter(p => 
        p.brand === hoveredBrand
      );
      
      // Si on a une sous-catégorie sélectionnée
      if (hoveredSubcategory && hoveredSubcategory !== 'Tous nos produits') {
        const filteredProducts = brandProducts.filter(p => {
          // Pour les catégories LED, utiliser la logique de regroupement
          if (isLEDCategory) {
            return matchesConsolidatedSubcategory(p.subcategory, hoveredSubcategory) && 
                   normalizeCategory(p.category) === normalizedHoveredCategory;
          }
          // Pour les autres catégories, comparaison exacte
          return p.subcategory === hoveredSubcategory && 
                 normalizeCategory(p.category) === normalizedHoveredCategory;
        });
        // Trier par prix décroissant (du plus cher au moins cher)
        return filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
      }
      
      // Sinon filtrer par catégorie
      if (normalizedHoveredCategory) {
        const filteredProducts = brandProducts.filter(p => 
          normalizeCategory(p.category) === normalizedHoveredCategory
        );
        // Trier par prix décroissant (du plus cher au moins cher)
        return filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
      }
      
      // Trier par prix décroissant (du plus cher au moins cher)
      return brandProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    
    // Si pas de marque sélectionnée mais une sous-catégorie
    if (hoveredSubcategory && hoveredSubcategory !== 'Tous nos produits' && normalizedHoveredCategory) {
      const filteredProducts = allProducts.filter(p => {
        // Pour les catégories LED, utiliser la logique de regroupement
        if (isLEDCategory) {
          return matchesConsolidatedSubcategory(p.subcategory, hoveredSubcategory) && 
                 normalizeCategory(p.category) === normalizedHoveredCategory;
        }
        // Pour les autres catégories, comparaison exacte
        return p.subcategory === hoveredSubcategory && 
               normalizeCategory(p.category) === normalizedHoveredCategory;
      });
      // Trier par prix décroissant (du plus cher au moins cher)
      return filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    
    // Si seulement une catégorie
    if (normalizedHoveredCategory) {
      const filteredProducts = allProducts.filter(p => 
        normalizeCategory(p.category) === normalizedHoveredCategory
      );
      // Trier par prix décroissant (du plus cher au moins cher)
      return filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    
    return [];
  };

  // Obtenir toutes les marques pour une catégorie ou sous-catégorie
  const getBrandsForSelection = () => {
    const brands = new Set<string>();
    
    if (hoveredSubcategory) {
      // Obtenir les marques pour la sous-catégorie
      allProducts.forEach(p => {
        if (p.subcategory === hoveredSubcategory && p.category === hoveredCategory && p.brand) {
          brands.add(p.brand);
        }
      });
    } else if (hoveredCategory) {
      // Obtenir les marques pour la catégorie
      const categoryProducts = getProductsByCategory(hoveredCategory);
      categoryProducts.forEach(p => {
        if (p.brand) brands.add(p.brand);
      });
    }
    
    return Array.from(brands).sort();
  };

  // Trouver la catégorie actuellement survolée
  const getCurrentCategory = () => {
    return categories.find(cat => cat.name === hoveredCategory);
  };

  if (!isOpen) return null;
  
  return (
    <div
      className={`absolute top-full mt-1 bg-white shadow-2xl border border-gray-200 rounded-xl z-[150] ${
        alignRight ? '!right-[80px]' : 'left-0'
      }`}
      style={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        overflow: 'hidden'
      }}
    >
      <div className="flex min-h-[400px] w-fit max-w-[calc(100vw-4rem)]">
        {/* Colonne 1: Marques (directement) */}
        <div className="min-w-[180px] bg-white border-r border-gray-200 max-h-[500px] flex flex-col">
          <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 flex-shrink-0">
            <h4 className="font-bold text-gray-900 text-base">Marques</h4>
          </div>
          <div className="flex-1 overflow-y-auto" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#9ca3af #f3f4f6'
          }}>
            <div className="py-2 px-2">
              {(() => {
                // Obtenir toutes les marques uniques pour cette catégorie
                const normalizedCat = categories[0].name.replace(/[📱🎧⌚💡🔧📦]/g, '').trim();
                const categoryProducts = allProducts.filter(p => {
                  const productCat = p.category.replace(/[📱🎧⌚💡🔧📦]/g, '').trim();
                  return productCat.toLowerCase() === normalizedCat.toLowerCase();
                });

                const brandSet = new Set<string>();
                categoryProducts.forEach(p => {
                  if (p.brand) brandSet.add(p.brand);
                });
                const brands = Array.from(brandSet).sort();

                // Compter les produits pour chaque marque
                return brands.map((brand) => {
                  const brandProductCount = categoryProducts.filter(p => p.brand === brand).length;

                  return (
                    <div key={brand}>
                      <button
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm transition-all duration-200",
                          hoveredBrand === brand
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-l-4 border-green-600"
                            : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                        )}
                        onMouseEnter={() => setHoveredBrand(brand)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-base">{brand}</span>
                            <span className="block text-xs text-gray-500 mt-0.5">
                              {brandProductCount} produit{brandProductCount > 1 ? 's' : ''}
                            </span>
                          </div>
                          <ChevronRight className={cn(
                            "w-4 h-4 transition-transform",
                            hoveredBrand === brand ? "translate-x-1" : ""
                          )} />
                        </div>
                      </button>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>


        {/* Colonne 2: Produits */}
        {hoveredBrand && (
          <div className="min-w-[190px] bg-gradient-to-b from-gray-50 to-white max-h-[500px] flex flex-col">
            {(() => {
              // Utiliser getProductsForDisplay pour tous les cas
              const products = getProductsForDisplay();

              return (
                <>
                  <div className="p-3 border-b border-gray-200 flex-shrink-0">
                    <h4 className="font-bold text-gray-900 text-sm">
                      {hoveredBrand || (menuType === 'tablettes' ? 'Tablettes' : '')}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">{products.length} produit{products.length > 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex-1 overflow-y-auto" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#9ca3af #f3f4f6'
          }}>
                    <div className="py-3 px-2">
                      {products && products.length > 0 ? (
                        <>
                          {products.map((product) => (
                            <Link
                              key={product.id}
                              href={`/produit/${product.urlSlug || product.id}`}
                              className="block px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent transition-all duration-200"
                              onClick={onClose}
                            >
                              <div className="flex items-start space-x-2">
                                <div className="w-12 h-12 bg-black border border-gray-800 rounded overflow-hidden flex-shrink-0 shadow-sm">
                                  {product.images && product.images.length > 0 && !product.images[0].includes('placeholder') ? (
                                    <ImageWithFallback
                                      src={product.images[0]}
                                      alt={product.name}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-contain"
                                      productCategory={product.category}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center relative">
                                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-pink-500/15 to-purple-600/10"></div>
                                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                                        <rect x="10" y="6" width="12" height="20" rx="2" fill="#1A1A1A" stroke="#F72585" strokeWidth="1.5"/>
                                        <rect x="11.5" y="8" width="9" height="14" rx="1" fill="#0A0A0A"/>
                                        <rect x="8.5" y="12" width="1.5" height="8" fill="#FF6B35" opacity="0.8"/>
                                        <rect x="22" y="12" width="1.5" height="8" fill="#7209B7" opacity="0.8"/>
                                        <circle cx="16" cy="23.5" r="1.5" fill="#F72585" opacity="0.6"/>
                                        <text x="16" y="30" fontSize="5" fill="#F72585" textAnchor="middle" fontWeight="bold" fontFamily="Arial">
                                          BIENTÔT
                                        </text>
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-gray-900 whitespace-normal">
                                    {product.name}
                                  </p>
                                  {product.price && (
                                    <p className="text-base font-bold text-red-600 mt-1 whitespace-nowrap">
                                      {typeof product.price === 'number' 
                                        ? `${product.price.toFixed(2)} €` 
                                        : product.price}
                                    </p>
                                  )}
                                  {product.shortDescription && (
                                    <p className="text-xs text-gray-600 mt-1 whitespace-normal">
                                      {product.shortDescription}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p className="text-sm">Aucun produit disponible</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {products.length > 0 && (
                    <div className="px-4 py-3 border-t border-gray-100 bg-white flex-shrink-0">
                      <Link
                        href={`/nos-produits?category=${encodeURIComponent(hoveredCategory || '')}&subcategory=${encodeURIComponent(hoveredSubcategory || '')}&brand=${encodeURIComponent(hoveredBrand || '')}`}
                        className="flex items-center justify-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                        onClick={onClose}
                      >
                        Voir tous les {products.length} produits
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

// Composant pour le menu mobile avec navigation complète
const MobileMenu = ({
  onClose,
  searchQuery,
  setSearchQuery,
  menuStructure,
  allProducts
}: {
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  menuStructure: CategoryStructure[];
  allProducts: Product[];
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  // Empêcher le scroll du body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Catégories statiques de secours si menuStructure est vide
  const fallbackCategories: CategoryStructure[] = [
    { name: '📱 Smartphones', slug: 'smartphones', subcategories: [] },
    { name: '🎧 Audio & Chargement', slug: 'audio', subcategories: [] },
    { name: '⌚ Montres Connectées', slug: 'montres', subcategories: [] },
    { name: '💡 Créativité & LED', slug: 'led', subcategories: [] },
    { name: '🔧 Accessoires', slug: 'accessoires', subcategories: [] },
  ];

  // Utiliser menuStructure ou fallback
  const displayCategories = (menuStructure && menuStructure.length > 0) ? menuStructure : fallbackCategories;

  // Helper pour obtenir les produits d'une catégorie
  const getProductsByCategory = (categoryName: string): Product[] => {
    // Nettoyer la catégorie en retirant les emojis et normaliser
    const cleanCategory = (cat: string) => {
      return cat.replace(/[📱🎧⌚💡🔧📦]/g, '').trim().toLowerCase();
    };

    const searchCategory = cleanCategory(categoryName);

    return allProducts.filter(p => {
      const productCategory = cleanCategory(p.category);
      return productCategory === searchCategory;
    });
  };

  // Helper pour obtenir les produits d'une marque
  const getProductsByBrand = (brandName: string): Product[] => {
    return allProducts.filter(p =>
      p.brand.toLowerCase() === brandName.toLowerCase()
    );
  };

  // Utiliser menuStructure directement depuis products.ts
  const getCategoryIcon = (categoryName: string) => {
    const lowerName = categoryName.toLowerCase();
    if (lowerName.includes('smartphones')) return <Smartphone className="w-5 h-5" />;
    if (lowerName.includes('tablettes')) return <Package className="w-5 h-5" />;
    if (lowerName.includes('montres')) return <Watch className="w-5 h-5" />;
    if (lowerName.includes('audio') || lowerName.includes('chargement')) return <Headphones className="w-5 h-5" />;
    if (lowerName.includes('créativité') || lowerName.includes('led')) return <Lightbulb className="w-5 h-5" />;
    return <Package className="w-5 h-5" />;
  };

  const resetNavigation = () => {
    setActiveCategory(null);
    setActiveBrand(null);
  };

  return (
    <>
      {/* Backdrop flouté - laisse voir le site en dessous */}
      <div
        className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[190]"
        onClick={onClose}
      />

      {/* Menu mobile moderne - carte flottante avec marges */}
      <div className="lg:hidden fixed top-[7.5rem] left-4 right-4 bottom-16 bg-white z-[200] flex flex-col rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Liste avec accordéon */}
        <div className="flex-1 overflow-y-auto">
          {displayCategories.map((category) => {
            const cleanName = category.name.replace(/[📱🎧⌚💡🔧📦]/g, '').trim();
            const isOpen = activeCategory === category.name;
            const products = getProductsByCategory(category.name);
            const brands = new Set<string>();
            products.forEach(p => { if (p.brand) brands.add(p.brand); });
            const uniqueBrands = Array.from(brands).sort();

            return (
              <div key={category.name} className="border-b border-gray-200">
                {/* Catégorie - bouton accordéon */}
                <button
                  onClick={() => setActiveCategory(isOpen ? null : category.name)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(category.name)}
                    <span className="font-medium text-gray-900">{cleanName}</span>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-gray-400 transition-transform",
                    isOpen && "rotate-180"
                  )} />
                </button>

                {/* Contenu de l'accordéon - marques et produits */}
                {isOpen && (
                  <div className="bg-blue-50 border-t border-blue-200 py-2">
                    {uniqueBrands.map((brand) => {
                      const isBrandOpen = activeBrand === brand;
                      const brandProducts = getProductsByBrand(brand).filter(p => {
                        const cleanCat = (cat: string) => cat.replace(/[📱🎧⌚💡🔧📦]/g, '').trim().toLowerCase();
                        return cleanCat(p.category) === cleanCat(category.name);
                      }).sort((a, b) => (b.price || 0) - (a.price || 0));

                      return (
                        <div key={brand} className="border-b border-blue-100 last:border-0">
                          {/* Marque */}
                          <button
                            onClick={() => setActiveBrand(isBrandOpen ? null : brand)}
                            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-blue-100 transition-colors"
                          >
                            <div className="flex items-center gap-2 ml-4">
                              <Package className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-semibold text-gray-900">{brand}</span>
                              <span className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded-full">
                                {brandProducts.length}
                              </span>
                            </div>
                            <ChevronDown className={cn(
                              "w-4 h-4 text-blue-600 transition-transform",
                              isBrandOpen && "rotate-180"
                            )} />
                          </button>

                          {/* Produits */}
                          {isBrandOpen && (
                            <div className="bg-white mx-4 mb-2 rounded-lg border border-gray-200 divide-y divide-gray-100">
                              {brandProducts.map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/produit/${product.urlSlug || product.id}`}
                                  onClick={onClose}
                                  className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                                >
                                  {product.images && product.images.length > 0 && (
                                    <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                      <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={56}
                                        height={56}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</p>
                                    {product.price && (
                                      <p className="text-base font-bold text-blue-600 mt-1">{product.price}</p>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [menuStructure, setMenuStructure] = useState<CategoryStructure[]>([]);
  
  const { items, removeFromCart, updateQuantity, getCartTotal, getItemCount } = useCart();
  // const { isAuthenticated } = useAuth();
  const { products: supabaseProducts } = useSupabaseProducts({ limit: 1000 });
  const { categories: supabaseCategories } = useSupabaseCategories();
  
  // Charger tous les produits depuis Supabase et générer la structure du menu dynamiquement
  useEffect(() => {
    console.log('🔍 Debug Header - Produits:', supabaseProducts?.length || 0);
    console.log('🔍 Debug Header - Catégories:', supabaseCategories?.length || 0);

    if (supabaseProducts && supabaseProducts.length > 0 && supabaseCategories && supabaseCategories.length > 0) {
      // Convertir les produits Supabase en format legacy
      const legacyProducts = supabaseProducts.map(supabaseProductToLegacy);

      console.log(`✅ Total produits Supabase: ${legacyProducts.length}`);
      console.log(`✅ Total catégories Supabase: ${supabaseCategories.length}`);

      // Utiliser TOUS les produits Supabase sans filtrage
      setAllProducts(legacyProducts);

      // Générer dynamiquement la structure du menu depuis TOUS les produits Supabase avec les catégories
      const dynamicMenuStructure = generateMenuStructureFromProducts(legacyProducts, supabaseCategories);
      
      // Log détaillé de la structure du menu
      console.log('📋 Structure du menu générée:');
      dynamicMenuStructure.forEach(cat => {
        const totalProducts = legacyProducts.filter(p => {
          const normalizedCat = cat.slug.toLowerCase();
          const normalizedProdCat = p.category.toLowerCase();
          return normalizedProdCat === normalizedCat;
        }).length;
        console.log(`  📂 ${cat.name}: ${totalProducts} produits, ${cat.subcategories?.length || 0} sous-catégories`);
        cat.subcategories?.forEach(subcat => {
          console.log(`    └─ ${subcat.name}: ${subcat.brands?.length || 0} marques`);
        });
      });
      setMenuStructure(dynamicMenuStructure);
      
      // Logger les catégories générées pour debug
      console.log('📂 Catégories générées:', dynamicMenuStructure.map(cat => ({
        name: cat.name,
        products: legacyProducts.filter(p => p.category.toLowerCase() === cat.slug.toLowerCase()).length
      })));
    } else {
      // Fallback: créer des catégories basiques à partir des produits seuls
      if (supabaseProducts && supabaseProducts.length > 0) {
        const legacyProducts = supabaseProducts.map(supabaseProductToLegacy);
        setAllProducts(legacyProducts);

        // Créer des catégories simples depuis les produits
        const categoryMap = new Map<string, CategoryStructure>();

        legacyProducts.forEach(product => {
          const catName = product.category;
          if (!categoryMap.has(catName)) {
            categoryMap.set(catName, {
              name: catName,
              slug: catName.toLowerCase().replace(/\s+/g, '-'),
              subcategories: []
            });
          }
        });

        const fallbackStructure = Array.from(categoryMap.values());
        console.log('⚠️ Fallback - Catégories créées depuis produits:', fallbackStructure.length);
        setMenuStructure(fallbackStructure);
      }
    }
  }, [supabaseProducts, supabaseCategories]);
  
  // Fonctions utilitaires pour obtenir les produits
  const getProductsByCategory = (category: string) => {
    // Nettoyer la catégorie en retirant les emojis et normaliser
    const cleanCategory = (cat: string) => {
      return cat.replace(/[📱🎧⌚💡🔧📦]/g, '').trim().toLowerCase();
    };
    
    const searchCategory = cleanCategory(category);
    
    return allProducts.filter(p => {
      const productCategory = cleanCategory(p.category);
      // Matcher sur les noms normalisés
      return productCategory === searchCategory || 
             // Gérer les variations communes
             (searchCategory === 'smartphones' && productCategory === 'smartphones') ||
             (searchCategory === 'tablettes' && productCategory === 'tablettes') ||
             (searchCategory === 'audio' && productCategory === 'audio') ||
             (searchCategory === 'montres' && productCategory === 'montres') ||
             (searchCategory === 'led' && (productCategory === 'led' || productCategory === 'eclairage led' || productCategory === 'éclairage led')) ||
             (searchCategory === 'accessoires' && productCategory === 'accessoires');
    });
  };
  
  const getProductsByBrand = (brand: string) => {
    return allProducts.filter(p => 
      p.brand.toLowerCase() === brand.toLowerCase()
    );
  };
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fonction de recherche avec debounce
  const debouncedSearch = debounce((query: string) => {
      if (query.trim().length > 1) {
        const suggestions = allProducts.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5); // Limiter à 5 suggestions
        setSearchSuggestions(suggestions);
        setShowSuggestions(true);
      } else {
        setSearchSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

  // Gérer le changement de recherche
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Soumettre la recherche
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/nos-produits?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  // Sélectionner une suggestion
  const handleSuggestionClick = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      router.push(`/produit/${product.urlSlug || product.id}`);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };
  
  // Helper pour obtenir les catégories depuis menuStructure
  const getMenuCategory = (categoryName: string): CategoryStructure[] => {
    const category = menuStructure.find(cat => 
      cat.name.toLowerCase() === categoryName.toLowerCase() ||
      cat.slug === categoryName
    );
    return category ? [category] : [];
  };
  
  // Helper pour obtenir toutes les catégories avec des produits
  const getAllCategories = (): CategoryStructure[] => {
    return menuStructure.filter(cat => {
      // Vérifier s'il y a des produits dans cette catégorie
      const products = getProductsByCategory(cat.name);
      return products && products.length > 0;
    });
  };

  // Gestion du scroll - supprimé car non utilisé

  // Fermer le panier et les suggestions quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    if (isCartOpen || showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, showSuggestions]);

  // Fermer le menu dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setClickedMenu(null);
        setDropdownOpen(null);
      }
    };

    if (clickedMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickedMenu]);

  const handleMouseEnter = (menu: string) => {
    // Ne pas activer le hover si un menu est déjà ouvert par clic
    if (!clickedMenu) {
      setDropdownOpen(menu);
    }
  };

  const handleMouseLeave = () => {
    // Ne pas fermer si le menu est ouvert par clic
    if (!clickedMenu) {
      setDropdownOpen(null);
    }
  };

  const handleMenuClick = (menu: string) => {
    if (clickedMenu === menu) {
      // Si le même menu est cliqué, le fermer
      setClickedMenu(null);
      setDropdownOpen(null);
    } else {
      // Ouvrir le nouveau menu et fermer l'ancien
      setClickedMenu(menu);
      setDropdownOpen(menu);
    }
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
    setClickedMenu(null);
  };


  // Navigation (sans Accueil car intégré dans le logo)
  const navigation: Array<{ name: string; href: string; icon: React.ReactNode }> = [];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        {/* Barre promotionnelle */}
        <PromoBar />
      
      <header
        className="bg-white backdrop-blur-md shadow-lg border-b border-gray-200 transition-all duration-300"
      >
        <div className="w-full px-6">
          {/* Header principal */}
          <div className="flex items-center justify-between gap-3 h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
              <Image 
                src="/LOGO-MONSTER-PHONE.png" 
                alt="Monster Phone" 
                width={120} 
                height={60}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Navigation centrale */}
            <nav className="hidden xl:flex items-center gap-1 overflow-visible flex-1" ref={menuRef}>
              {/* Génération dynamique des menus à partir de menuStructure */}
              {menuStructure.map((category) => {
                // Extraire l'emoji et le nom du menu
                const menuIcon = category.name.substring(0, 2); // Récupérer l'emoji
                const menuLabel = category.name.substring(2).trim(); // Récupérer le nom sans emoji
                
                return (
                  <div 
                    key={category.slug}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(category.slug)}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(category.slug);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-all duration-200 rounded-lg ${
                        dropdownOpen === category.slug || clickedMenu === category.slug
                          ? 'text-blue-600 bg-blue-50 shadow-sm' 
                          : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <span className="text-base">{menuIcon}</span>
                      <span>{menuLabel}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        dropdownOpen === category.slug || clickedMenu === category.slug ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    <DropdownMenu
                      categories={[category]}
                      isOpen={dropdownOpen === category.slug || clickedMenu === category.slug}
                      onClose={closeDropdown}
                      menuType={category.slug}
                      allProducts={allProducts}
                      getProductsByCategory={getProductsByCategory}
                      getProductsByBrand={getProductsByBrand}
                    />
                  </div>
                );
              })}
              
            </nav>
            
            {/* Barre de recherche desktop */}
            <div className="relative hidden xl:flex flex-shrink-0" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                  className="w-64 px-3 py-1.5 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-900 hover:text-blue-600 transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
              
              {/* Suggestions de recherche */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {searchSuggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggestionClick(product.id)}
                      className="w-full px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {product.images && product.images.length > 0 && (
                          <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.brand} - {product.category}</p>
                        </div>
                        <p className="text-sm font-bold text-blue-600">{product.price}€</p>
                      </div>
                    </button>
                  ))}
                  <Link
                    href={`/nos-produits?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setShowSuggestions(false)}
                    className="block w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-center text-sm font-medium text-blue-600 transition-colors"
                  >
                    Voir tous les résultats pour "{searchQuery}"
                  </Link>
                </div>
              )}
            </div>
            
            {/* Navigation tablette (version simplifiée) */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-1">
              {menuStructure.map((category) => {
                const menuIcon = category.name.substring(0, 2);
                const menuLabel = category.name.substring(3).split(' ')[0]; // Premier mot seulement pour tablette
                
                return (
                  <Link
                    key={category.slug}
                    href={`/nos-produits?category=${encodeURIComponent(category.name.substring(3))}`}
                    className="flex items-center gap-2 text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-bold transition-colors rounded-lg hover:bg-blue-50"
                  >
                    <span className="text-lg">{menuIcon}</span>
                    <span>{menuLabel}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Recherche mobile */}
              <button className="lg:hidden p-1 text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Search className="h-4 w-4" />
              </button>

              {/* Panier avec aperçu */}
              <div className="relative" ref={cartRef}>
                <button 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-1.5 text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {getItemCount() > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-medium">
                      {getItemCount()}
                    </span>
                  )}
                </button>

                {/* Dropdown du panier */}
                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-lg flex items-center justify-between">
                        Mon Panier ({getItemCount()} article{getItemCount() > 1 ? 's' : ''})
                        <button
                          onClick={() => setIsCartOpen(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </h3>
                    </div>

                    {items.length === 0 ? (
                      <div className="p-8 text-center">
                        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">Votre panier est vide</p>
                        <Link
                          href="/nos-produits"
                          onClick={() => setIsCartOpen(false)}
                          className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Découvrir nos produits
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="">
                          {items && items.length > 0 && items.map((item) => {
                            // Price is already a number in the Product interface
                            const price = item.product.price;
                            return (
                              <div key={`${item.product.id}-${item.variant}`} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                                <div className="flex items-start space-x-3">
                                  <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {item.product.images[0] ? (
                                      <Image
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        fill
                                        className="object-contain"
                                        onError={(e) => {
                                          e.currentTarget.src = '/placeholder-product.png';
                                        }}
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Package className="w-6 h-6 text-gray-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium">{item.product.name}</h4>
                                    <p className="text-xs text-gray-600 mt-1 whitespace-normal">
                                      {item.quantity} × {price.toFixed(2)} €
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                        className="text-gray-400 hover:text-gray-600"
                                      >
                                        <Minus className="w-4 h-4" />
                                      </button>
                                      <span className="text-sm font-medium">{item.quantity}</span>
                                      <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                        className="text-gray-400 hover:text-gray-600"
                                      >
                                        <Plus className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-sm">
                                      {(price * item.quantity).toFixed(2)} €
                                    </p>
                                    <button
                                      onClick={() => removeFromCart(item.product.id)}
                                      className="text-red-500 hover:text-red-700 mt-1"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Total et actions */}
                        <div className="p-4 bg-gray-50">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold text-lg">Total</span>
                            <span className="font-bold text-xl text-blue-600">
                              {getCartTotal().toFixed(2)} €
                            </span>
                          </div>
                          <div className="space-y-2">
                            <Link
                              href="/panier"
                              onClick={() => setIsCartOpen(false)}
                              className="block w-full text-center bg-gray-100 text-gray-700 px-2 py-1 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                              Voir le panier
                            </Link>
                            <button
                              onClick={() => {
                                setIsCartOpen(false);
                                router.push('/checkout');
                              }}
                              className="w-full bg-blue-600 text-white px-2 py-1 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            >
                              <CreditCard className="w-4 h-4" />
                              Paiement rapide
                            </button>
                          </div>
                          {getCartTotal() < 50 && (
                            <p className="text-xs text-gray-600 text-center mt-3">
                              Plus que {(50 - getCartTotal()).toFixed(2)} € pour la livraison gratuite !
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Compte */}
              <Link
                href="/compte"
                className="p-1.5 text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-block"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* CTA */}
              <Link href="/nos-produits" className="hidden lg:flex ml-2 mr-1">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1.5 rounded-lg font-medium text-xs shadow-md hover:shadow-lg transition-shadow whitespace-nowrap">
                  Découvrir
                </button>
              </Link>

              {/* Menu mobile */}
              <button
                className="lg:hidden p-1 text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

        </div>
      </header>
      </div>

      {/* Menu mobile - rendu en dehors du header pour éviter les problèmes de z-index */}
    {isMenuOpen && (
      <MobileMenu
        onClose={() => setIsMenuOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        menuStructure={menuStructure}
        allProducts={allProducts}
      />
    )}
  </>
  );
}