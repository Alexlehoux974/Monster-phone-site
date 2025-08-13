'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ChevronRight, ArrowRight, Shield, Truck, Flame, Smartphone, Watch, Headphones, Lightbulb, Package, Star, Trash2, CreditCard, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { menuStructure, type CategoryStructure, allProducts, getProductsByCategory, getProductsByBrand, brandMenuStructure, getBrandsByCategory, getProductsByBrandAndCategory } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

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
  menuType
}: { 
  categories: CategoryStructure[];
  isOpen: boolean;
  onClose: () => void;
  alignRight?: boolean;
  menuType?: string;
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [hoveredAccessorySubcategory, setHoveredAccessorySubcategory] = useState<string | null>(null);
  
  // Réinitialiser les états quand le menu se ferme
  useEffect(() => {
    if (!isOpen) {
      setHoveredCategory(null);
      setHoveredSubcategory(null);
      setHoveredBrand(null);
      setHoveredAccessorySubcategory(null);
    }
  }, [isOpen]);
  
  // Obtenir les produits en fonction de la sélection
  const getProductsForDisplay = () => {
    if (hoveredBrand) {
      const brandProducts = getProductsByBrand(hoveredBrand) || [];
      
      // Si on a une sous-catégorie sélectionnée
      if (hoveredSubcategory) {
        return brandProducts.filter(p => 
          p.subcategory === hoveredSubcategory && 
          p.category === hoveredCategory
        );
      }
      
      // Sinon filtrer par catégorie
      if (hoveredCategory) {
        return brandProducts.filter(p => p.category === hoveredCategory);
      }
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
      className={`absolute top-full mt-1 bg-white shadow-2xl border border-gray-200 rounded-xl z-[150] overflow-hidden ${
        alignRight ? 'right-0' : 'left-0'
      }`}
      style={{ 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
    >
      <div className="flex min-h-[450px] w-fit">
        {/* Colonne 1: Catégories */}
        <div className="min-w-[240px] bg-gradient-to-b from-gray-50 to-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="font-bold text-gray-900 text-lg">
              {(menuType === 'smartphones' || menuType === 'led' || menuType === 'montres' || menuType === 'tablettes' || menuType === 'accessoires') ? 'Marques' : 'Nos Produits'}
            </h3>
          </div>
          <div className="py-4 px-4">
            {(menuType === 'smartphones' || menuType === 'led' || menuType === 'montres' || menuType === 'tablettes' || menuType === 'accessoires') ? (
              // Pour Smartphones, LED, Montres, Tablettes et Accessoires, afficher les marques directement
              (() => {
                const categoryName = menuType === 'smartphones' ? 'Smartphones' : 
                                   menuType === 'montres' ? 'Montres' :
                                   menuType === 'tablettes' ? 'Tablettes' : 
                                   menuType === 'accessoires' ? ['Audio', 'Chargement', 'Créativité', 'Accessoires'] :
                                   menuType === 'led' ? 'LED' : 'Accessoires';
                
                // Pour accessoires et LED, on récupère les marques de toutes les catégories concernées
                const brands = menuType === 'accessoires' 
                  ? (() => {
                      const brandsSet = new Set<string>();
                      allProducts.forEach(p => {
                        if ((p.category === 'Audio' || p.category === 'Chargement' || 
                             p.category === 'Créativité' || p.category === 'Accessoires') && p.brand) {
                          brandsSet.add(p.brand);
                        }
                      });
                      return Array.from(brandsSet).sort();
                    })()
                  : menuType === 'led'
                  ? (() => {
                      const brandsSet = new Set<string>();
                      allProducts.forEach(p => {
                        if (p.category === 'LED' && p.brand) {
                          brandsSet.add(p.brand);
                        }
                      });
                      return Array.from(brandsSet).sort();
                    })()
                  : getBrandsByCategory(categoryName as string);
                return brands.length > 0 ? brands.map((brand) => {
                  const brandProducts = menuType === 'accessoires'
                    ? allProducts.filter(p => 
                        p.brand === brand && 
                        (p.category === 'Audio' || p.category === 'Chargement' || 
                         p.category === 'Créativité' || p.category === 'Accessoires')
                      )
                    : menuType === 'led'
                    ? allProducts.filter(p => p.brand === brand && p.category === 'LED')
                    : getProductsByBrandAndCategory(brand, categoryName as string);
                  return (
                    <div key={brand}>
                      <button
                        className={cn(
                          "w-full text-left px-6 py-4 text-sm font-medium transition-all duration-200",
                          hoveredBrand === brand 
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-600" 
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        )}
                        onMouseEnter={() => {
                          if (menuType === 'accessoires') {
                            setHoveredCategory('Accessoires');
                            setHoveredAccessorySubcategory(null);
                          } else if (menuType === 'led') {
                            setHoveredCategory('LED');
                          } else {
                            setHoveredCategory(categoryName as string);
                          }
                          setHoveredSubcategory(null);
                          setHoveredBrand(brand);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-base">{brand}</span>
                            <span className="block text-xs text-gray-500 mt-0.5">
                              {brandProducts.length} produit{brandProducts.length > 1 ? 's' : ''}
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
                }) : (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    Aucune marque disponible
                  </div>
                );
              })()
            ) : (
              // Pour les autres menus, afficher les catégories normalement
              categories && categories.length > 0 && categories.map((category) => (
                <div key={category.name}>
                  <button
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200",
                      hoveredCategory === category.name 
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-600" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    )}
                    onMouseEnter={() => {
                      setHoveredCategory(category.name);
                      setHoveredSubcategory(null);
                      setHoveredBrand(null);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{category.name}</span>
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-transform",
                        hoveredCategory === category.name ? "translate-x-1" : ""
                      )} />
                    </div>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Colonne 2: Sous-catégories ou Marques ou Produits */}
        {menuType === 'accessoires' && hoveredBrand && (
          <div className="min-w-[200px] bg-white border-r border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <h4 className="font-bold text-gray-900 text-base">Sous-catégories</h4>
            </div>
            <div className="py-4 px-4">
              {(() => {
                // Obtenir toutes les sous-catégories pour cette marque
                const subcategoriesSet = new Set<string>();
                allProducts.forEach(p => {
                  if (p.brand === hoveredBrand && 
                      (p.category === 'Audio' || p.category === 'Chargement' || 
                       p.category === 'Créativité' || p.category === 'Accessoires') && 
                      p.subcategory) {
                    subcategoriesSet.add(p.subcategory);
                  }
                });
                const subcategories = Array.from(subcategoriesSet).sort();
                
                return subcategories.map((subcat) => {
                  const subcatProducts = allProducts.filter(p => 
                    p.brand === hoveredBrand && 
                    p.subcategory === subcat &&
                    (p.category === 'Audio' || p.category === 'Chargement' || 
                     p.category === 'Créativité' || p.category === 'Accessoires')
                  );
                  
                  return (
                    <div key={subcat}>
                      <button
                        className={cn(
                          "w-full text-left px-4 py-3 text-sm transition-all duration-200",
                          hoveredAccessorySubcategory === subcat 
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-l-4 border-green-600" 
                            : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                        )}
                        onMouseEnter={() => setHoveredAccessorySubcategory(subcat)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-base">{subcat}</span>
                            <span className="block text-xs text-gray-500 mt-0.5">
                              {subcatProducts.length} produit{subcatProducts.length > 1 ? 's' : ''}
                            </span>
                          </div>
                          <ChevronRight className={cn(
                            "w-4 h-4 transition-transform",
                            hoveredAccessorySubcategory === subcat ? "translate-x-1" : ""
                          )} />
                        </div>
                      </button>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}
        {hoveredCategory && !((menuType === 'smartphones' || menuType === 'led' || menuType === 'montres' || menuType === 'tablettes' || menuType === 'accessoires')) && (
          <div className="min-w-[200px] bg-white border-r border-gray-200">
            {(() => {
              
              const currentCategory = getCurrentCategory();
              
              // Si la catégorie a des sous-catégories, les afficher
              if (currentCategory?.subcategories && currentCategory.subcategories.length > 0) {
                return (
                  <>
                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                      <h4 className="font-bold text-gray-900 text-base">Sous-catégories</h4>
                    </div>
                    <div className="py-4 px-5">
                      {currentCategory.subcategories.map((subcat) => {
                        // Compter les produits dans cette sous-catégorie
                        const subcatProducts = allProducts.filter(p => 
                          p.category === hoveredCategory && 
                          p.subcategory === subcat.name
                        );
                        
                        return (
                          <div key={subcat.name}>
                            <button
                              className={cn(
                                "w-full text-left px-4 py-3 text-sm transition-all duration-200",
                                hoveredSubcategory === subcat.name 
                                  ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-l-4 border-green-600" 
                                  : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                              )}
                              onMouseEnter={() => {
                                setHoveredSubcategory(subcat.name);
                                setHoveredBrand(null);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium text-base">{subcat.name}</span>
                                  <span className="block text-xs text-gray-500 mt-0.5">
                                    {subcatProducts.length} produit{subcatProducts.length > 1 ? 's' : ''}
                                  </span>
                                </div>
                                <ChevronRight className={cn(
                                  "w-4 h-4 transition-transform",
                                  hoveredSubcategory === subcat.name ? "translate-x-1" : ""
                                )} />
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              }
              
              // Sinon, afficher directement les marques
              const brands = getBrandsForSelection();
              
              if (brands.length === 0) return null;

              return (
                <>
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                    <h4 className="font-bold text-gray-900 text-base">Marques</h4>
                  </div>
                  <div className="py-4 px-5">
                    {brands.map((brand) => {
                      const brandProducts = getProductsByBrand(brand).filter(p => p.category === hoveredCategory);
                      return (
                        <div key={brand}>
                          <button
                            className={cn(
                              "w-full text-left px-4 py-3 text-sm transition-all duration-200",
                              hoveredBrand === brand 
                                ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-l-4 border-purple-600" 
                                : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                            )}
                            onMouseEnter={() => setHoveredBrand(brand)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-base">{brand}</span>
                                <span className="block text-xs text-gray-500 mt-0.5">
                                  {brandProducts.length} produit{brandProducts.length > 1 ? 's' : ''}
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
                    })}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Colonne 3: Marques (si sous-catégorie sélectionnée) */}
        {hoveredSubcategory && !((menuType === 'smartphones' || menuType === 'led' || menuType === 'montres' || menuType === 'tablettes')) && (
          <div className="min-w-[200px] bg-white border-r border-gray-200">
            {(() => {
              
              const brands = getBrandsForSelection();
              
              if (brands.length === 0) return null;

              return (
                <>
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                    <h4 className="font-bold text-gray-900 text-base">Marques</h4>
                  </div>
                  <div className="py-4 px-5">
                    {brands.map((brand) => {
                      const brandProducts = allProducts.filter(p => 
                        p.category === hoveredCategory && 
                        p.subcategory === hoveredSubcategory && 
                        p.brand === brand
                      );
                      return (
                        <div key={brand}>
                          <button
                            className={cn(
                              "w-full text-left px-4 py-3 text-sm transition-all duration-200",
                              hoveredBrand === brand 
                                ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-l-4 border-purple-600" 
                                : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                            )}
                            onMouseEnter={() => setHoveredBrand(brand)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-base">{brand}</span>
                                <span className="block text-xs text-gray-500 mt-0.5">
                                  {brandProducts.length} produit{brandProducts.length > 1 ? 's' : ''}
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
                    })}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Colonne Produits */}
        {((menuType === 'accessoires' && hoveredBrand && hoveredAccessorySubcategory) || 
          (menuType === 'led' && hoveredBrand) ||
          (menuType !== 'accessoires' && menuType !== 'led' && hoveredBrand)) && (
          <div className="min-w-[380px] bg-gradient-to-b from-gray-50 to-white">
            {(() => {
              const products = menuType === 'accessoires' 
                ? allProducts.filter(p => 
                    p.brand === hoveredBrand && 
                    p.subcategory === hoveredAccessorySubcategory &&
                    (p.category === 'Audio' || p.category === 'Chargement' || 
                     p.category === 'Créativité' || p.category === 'Accessoires')
                  )
                : menuType === 'led'
                ? allProducts.filter(p => 
                    p.brand === hoveredBrand && 
                    p.category === 'LED'
                  )
                : getProductsForDisplay() || [];

              return (
                <>
                  <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
                    <h4 className="font-bold text-gray-900 text-base">
                      {menuType === 'accessoires' ? `${hoveredAccessorySubcategory}` : 
                       `Collection ${hoveredBrand}`}
                    </h4>
                    <p className="text-sm text-gray-600 mt-0.5">{products.length} produit{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}</p>
                  </div>
                  <div className="py-4 px-5">
                    {products && products.length > 0 ? (
                      <>
                        {products.slice(0, 6).map((product) => (
                          <Link
                            key={product.id}
                            href={`/produit/${product.urlSlug || product.id}`}
                            className="block px-5 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent transition-all duration-200"
                            onClick={onClose}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                {product.images && product.images.length > 0 ? (
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                      e.currentTarget.src = '/placeholder-product.png';
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <Package className="w-5 h-5 text-gray-400" />
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
                        {products.length > 6 && (
                          <div className="px-4 py-3 border-t border-gray-100">
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
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">Aucun produit disponible</p>
                      </div>
                    )}
                  </div>
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
  setSearchQuery 
}: { 
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
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
      {/* Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[190]"
        onClick={onClose}
      />
      
      {/* Menu sliding */}
      <div className="lg:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[200] transform transition-transform duration-300 ease-out shadow-2xl animate-slide-in-right">
        {/* Header du menu mobile */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-3 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Fil d'ariane */}
        {(activeCategory || activeBrand) && (
          <div className="px-2 pb-1.5 flex items-center gap-2 text-sm overflow-x-auto">
            <button
              onClick={resetNavigation}
              className="text-blue-600 hover:text-blue-800 whitespace-nowrap"
            >
              Menu
            </button>
            {activeCategory && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <button
                  onClick={() => setActiveBrand(null)}
                  className={cn(
                    "whitespace-nowrap",
                    activeBrand ? "text-blue-600 hover:text-blue-800" : "text-gray-900"
                  )}
                >
                  {activeCategory}
                </button>
              </>
            )}
            {activeBrand && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-900 whitespace-nowrap">{activeBrand}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Contenu scrollable */}
      <div className="h-full overflow-y-auto pb-20">
        {/* Vue principale - Catégories */}
        {!activeCategory && (
          <div className="p-4 space-y-2">
            {/* Recherche mobile */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Catégories principales */}
            <div className="space-y-2">
              {menuStructure && menuStructure.length > 0 && menuStructure.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className="w-full flex items-center justify-between p-4 text-left bg-gray-50 active:bg-gray-200 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getCategoryIcon(category.name)}
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              ))}
            </div>

            {/* Liens rapides */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Liens rapides</h3>
              <Link
                href="/promotions"
                onClick={onClose}
                className="block p-4 bg-red-50 active:bg-red-200 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Flame className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-900">Promotions</span>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Vue des marques */}
        {activeCategory && !activeBrand && (
          <div className="p-4 space-y-2">
            {(() => {
              // Obtenir toutes les marques pour cette catégorie
              const products = getProductsByCategory(activeCategory);
              const brands = new Set<string>();
              products.forEach(p => {
                if (p.brand) brands.add(p.brand);
              });
              const uniqueBrands = Array.from(brands).sort();
              
              if (uniqueBrands.length === 0) return null;

              return (
                <>
                  {/* Lien vers toute la catégorie */}
                  <Link
                    href={`/nos-produits?category=${encodeURIComponent(activeCategory)}`}
                    onClick={onClose}
                    className="block p-4 bg-blue-50 active:bg-blue-200 rounded-lg transition-colors mb-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-blue-900">Voir tous les {activeCategory}</span>
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </div>
                  </Link>

                  {/* Liste des marques */}
                  {uniqueBrands.map((brand) => {
                    const brandProducts = getProductsByBrand(brand).filter(p => p.category === activeCategory);
                    return (
                      <button
                        key={brand}
                        onClick={() => setActiveBrand(brand)}
                        className="w-full flex items-center justify-between p-4 text-left bg-gray-50 active:bg-gray-200 rounded-lg transition-colors"
                      >
                        <div>
                          <span className="font-medium text-gray-900">{brand}</span>
                          <span className="block text-sm text-gray-600 mt-1">
                            {brandProducts.length} produit{brandProducts.length > 1 ? 's' : ''}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    );
                  })}
                </>
              );
            })()}
          </div>
        )}

        {/* Vue des produits */}
        {activeCategory && activeBrand && (
          <div className="p-4 space-y-3">
            {(() => {
              const products = getProductsByBrand(activeBrand).filter(p => p.category === activeCategory);

              return (
                <>
                  {/* Lien vers tous les produits de la marque dans cette catégorie */}
                  <Link
                    href={`/nos-produits?category=${encodeURIComponent(activeCategory)}&brand=${encodeURIComponent(activeBrand)}`}
                    onClick={onClose}
                    className="block p-4 bg-green-50 active:bg-green-200 rounded-lg transition-colors mb-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-900">
                        Voir tous les produits {activeBrand}
                      </span>
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </div>
                  </Link>

                  {/* Liste des produits */}
                  {products && products.length > 0 && products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/produit/${product.urlSlug || product.id}`}
                      onClick={onClose}
                      className="block p-4 bg-white border border-gray-200 active:border-blue-500 active:bg-gray-50 rounded-lg transition-all"
                    >
                      <div className="flex items-start gap-2">
                        {product.images && product.images.length > 0 && (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900">
                            {product.name}
                          </h4>
                          {product.price && (
                            <p className="text-lg font-bold text-blue-600 mt-1">
                              {product.price}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* CTA fixe en bas */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Link href="/nos-produits" onClick={onClose}>
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-1.5 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all">
            🎮 Découvrir tous nos produits
          </button>
        </Link>
      </div>
      </div>
    </>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { items, removeFromCart, updateQuantity, getCartTotal, getItemCount } = useCart();
  // const { isAuthenticated } = useAuth();
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
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

  // Fermer le panier quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen]);

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
    <div className="fixed top-0 left-0 right-0 z-[100]">
      {/* Barre promotionnelle */}
      <PromoBar />
      
      <header 
        className="bg-white backdrop-blur-md shadow-lg border-b border-gray-200 transition-all duration-300 overflow-visible"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
          {/* Header principal */}
          <div className="flex items-center gap-2 h-20 overflow-visible">
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
            <nav className="hidden xl:flex items-center gap-0.5 flex-1 overflow-visible" ref={menuRef}>
              {navigation && navigation.length > 0 && navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-1 text-gray-900 hover:text-blue-600 px-4 py-3 text-xs font-medium transition-colors rounded-lg hover:bg-blue-50"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Menu déroulant Smartphones avec Marques */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('smartphones')}
                onMouseLeave={() => handleMouseLeave()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClick('smartphones');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-all duration-200 rounded-lg ${
                    dropdownOpen === 'smartphones' || clickedMenu === 'smartphones'
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Smartphones</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen === 'smartphones' || clickedMenu === 'smartphones' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <DropdownMenu
                  categories={getMenuCategory('smartphones')}
                  isOpen={dropdownOpen === 'smartphones' || clickedMenu === 'smartphones'}
                  onClose={closeDropdown}
                  menuType="smartphones"
                />
              </div>

              {/* Menu déroulant Tablettes */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('tablettes')}
                onMouseLeave={() => handleMouseLeave()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClick('tablettes');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-all duration-200 rounded-lg ${
                    dropdownOpen === 'tablettes' || clickedMenu === 'tablettes'
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Tablettes</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen === 'tablettes' || clickedMenu === 'tablettes' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <DropdownMenu
                  categories={getMenuCategory('tablettes')}
                  isOpen={dropdownOpen === 'tablettes' || clickedMenu === 'tablettes'}
                  onClose={closeDropdown}
                  menuType="tablettes"
                />
              </div>

              {/* Menu déroulant Montres */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('montres')}
                onMouseLeave={() => handleMouseLeave()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClick('montres');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-all duration-200 rounded-lg ${
                    dropdownOpen === 'montres' || clickedMenu === 'montres'
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Watch className="w-4 h-4" />
                  <span>Montres</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen === 'montres' || clickedMenu === 'montres' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <DropdownMenu
                  categories={getMenuCategory('montres connectées')}
                  isOpen={dropdownOpen === 'montres' || clickedMenu === 'montres'}
                  onClose={closeDropdown}
                  menuType="montres"
                />
              </div>

              {/* Menu déroulant Accessoires */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('accessoires')}
                onMouseLeave={() => handleMouseLeave()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClick('accessoires');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-all duration-200 rounded-lg ${
                    dropdownOpen === 'accessoires' || clickedMenu === 'accessoires'
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Headphones className="w-4 h-4" />
                  <span>Accessoires</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen === 'accessoires' || clickedMenu === 'accessoires' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <DropdownMenu
                  categories={getAllCategories().filter(cat => 
                    cat.name.includes('Audio') || 
                    cat.name.includes('Chargement') || 
                    cat.name.includes('Créativité')
                  )}
                  isOpen={dropdownOpen === 'accessoires' || clickedMenu === 'accessoires'}
                  onClose={closeDropdown}
                  menuType="accessoires"
                />
              </div>

              {/* Menu déroulant LED */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('led')}
                onMouseLeave={() => handleMouseLeave()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClick('led');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-all duration-200 rounded-lg ${
                    dropdownOpen === 'led' || clickedMenu === 'led'
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>LED</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen === 'led' || clickedMenu === 'led' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <DropdownMenu
                  categories={getMenuCategory('créativité & enfants')}
                  isOpen={dropdownOpen === 'led' || clickedMenu === 'led'}
                  onClose={closeDropdown}
                  menuType="led"
                />
              </div>
              
            </nav>
            
            {/* Barre de recherche desktop */}
            <div className="relative hidden xl:flex ml-auto mr-4">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-900 hover:text-blue-600 transition-colors">
                <Search className="h-3 w-3" />
              </button>
            </div>
            
            {/* Navigation tablette (version simplifiée) */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-1">
              <Link
                href="/nos-produits?category=Smartphones"
                className="flex items-center gap-2 text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-bold transition-colors rounded-lg hover:bg-blue-50"
              >
                <Smartphone className="w-5 h-5" />
                <span>Smartphones</span>
              </Link>
              <Link
                href="/nos-produits?category=Montres+Connectées"
                className="flex items-center gap-2 text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-bold transition-colors rounded-lg hover:bg-blue-50"
              >
                <Watch className="w-5 h-5" />
                <span>Montres</span>
              </Link>
              <Link
                href="/nos-produits"
                className="flex items-center gap-2 text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-bold transition-colors rounded-lg hover:bg-blue-50"
              >
                <Headphones className="w-5 h-5" />
                <span>Accessoires</span>
              </Link>
              <Link
                href="/nos-produits?category=Créativité+%26+Enfants"
                className="flex items-center gap-2 text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-bold transition-colors rounded-lg hover:bg-blue-50"
              >
                <Lightbulb className="w-5 h-5" />
                <span>LED</span>
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
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
              <Link href="/nos-produits" className="hidden lg:block ml-3">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-lg font-medium text-xs shadow-md hover:shadow-lg transition-shadow">
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

          {/* Menu mobile */}
          {isMenuOpen && (
            <MobileMenu 
              onClose={() => setIsMenuOpen(false)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
        </div>
      </header>
    </div>
  );
}