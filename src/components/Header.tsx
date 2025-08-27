'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ChevronRight, ArrowRight, Shield, Truck, Flame, Star, Trash2, CreditCard, Plus, Minus, Package, Smartphone, Watch, Headphones, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { menuStructure, type CategoryStructure, allProducts, getProductsByCategory, getProductsByBrand, getProductsByBrandAndCategory } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import ImageWithFallback from '@/components/ImageWithFallback';

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
        const filtered = brandProducts.filter(p => 
          p.subcategory === hoveredSubcategory && 
          p.category === hoveredCategory
        );
        console.log('Debug - Filtering for:', {
          subcategory: hoveredSubcategory, 
          category: hoveredCategory,
          brand: hoveredBrand,
          brandProductsCount: brandProducts.length,
          filteredCount: filtered.length,
          products: filtered.map(p => ({name: p.name, subcategory: p.subcategory, category: p.category}))
        });
        return filtered;
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
      className={`absolute top-full mt-1 bg-white shadow-2xl border border-gray-200 rounded-xl z-[150] ${
        alignRight ? '!right-[80px]' : 'left-0'
      }`}
      style={{ 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        overflow: 'hidden'
      }}
    >
      <div className="flex min-h-[450px] w-fit max-w-[calc(100vw-4rem)]">
        {/* Colonne 1: Catégories */}
        <div className="min-w-[200px] bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 max-h-[600px] flex flex-col">
          <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
            <h3 className="font-bold text-gray-900 text-lg">
              {categories[0]?.name || 'Nos Produits'}
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#9ca3af #f3f4f6'
          }}>
            <div className="py-2 px-2">
            {categories[0]?.subcategories && categories[0].subcategories.length > 0 ? (
              // Afficher les sous-catégories de la nouvelle structure
              categories[0].subcategories.map((subcat) => (
                <div key={subcat.slug}>
                  <button
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200",
                      hoveredSubcategory === subcat.name 
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-600" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    )}
                    onMouseEnter={() => {
                      setHoveredCategory(categories[0].name);
                      setHoveredSubcategory(subcat.name);
                      setHoveredBrand(null);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-base">{subcat.name}</span>
                      </div>
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-transform",
                        hoveredSubcategory === subcat.name ? "translate-x-1" : ""
                      )} />
                    </div>
                  </button>
                </div>
              ))
            ) : (
              // Pour les autres catégories sans sous-catégories
              categories && categories.length > 0 && !categories[0]?.subcategories && categories.map((category) => (
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
        </div>

        {/* Colonne 2: Marques (pour Smartphones avec sous-catégories) */}
        {hoveredSubcategory && categories[0]?.subcategories && (
          <div className="min-w-[170px] bg-white border-r border-gray-200 max-h-[600px] flex flex-col">
            <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 flex-shrink-0">
              <h4 className="font-bold text-gray-900 text-base">Marques</h4>
            </div>
            <div className="flex-1 overflow-y-auto" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#9ca3af #f3f4f6'
          }}>
              <div className="py-2 px-2">
                {(() => {
                  // Trouver la sous-catégorie sélectionnée
                  const selectedSubcat = categories[0].subcategories.find(sub => sub.name === hoveredSubcategory);
                  const brands = selectedSubcat?.brands || [];
                  
                  return brands.map((brand) => (
                    <div key={brand}>
                      <button
                        className={cn(
                          "w-full text-left px-4 py-3 text-sm transition-all duration-200",
                          hoveredBrand === brand 
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-l-4 border-green-600" 
                            : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                        )}
                        onMouseEnter={() => setHoveredBrand(brand)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-base">{brand}</span>
                          <ChevronRight className={cn(
                            "w-4 h-4 transition-transform",
                            hoveredBrand === brand ? "translate-x-1" : ""
                          )} />
                        </div>
                      </button>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Colonne 2: Sous-catégories ou Marques */}
        {hoveredCategory && !((menuType === 'smartphones' || menuType === 'audio' || menuType === 'montres' || menuType === 'led' || menuType === 'tablettes' || menuType === 'accessoires')) && (
          <div className="min-w-[180px] bg-white border-r border-gray-200 max-h-[600px] flex flex-col">
            {(() => {
              
              const currentCategory = getCurrentCategory();
              
              // Si la catégorie a des sous-catégories, les afficher
              if (currentCategory?.subcategories && currentCategory.subcategories.length > 0) {
                return (
                  <>
                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 flex-shrink-0">
                      <h4 className="font-bold text-gray-900 text-base">Sous-catégories</h4>
                    </div>
                    <div className="flex-1 overflow-y-auto" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#9ca3af #f3f4f6'
          }}>
                      <div className="py-3 px-2">
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
                  <div className="py-3 px-3">
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
        {hoveredSubcategory && !((menuType === 'smartphones' || menuType === 'audio' || menuType === 'montres' || menuType === 'led' || menuType === 'tablettes' || menuType === 'accessoires')) && (
          <div className="min-w-[180px] bg-white border-r border-gray-200 max-h-[600px] flex flex-col">
            {(() => {
              
              const brands = getBrandsForSelection();
              
              if (brands.length === 0) return null;

              return (
                <>
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 flex-shrink-0">
                    <h4 className="font-bold text-gray-900 text-base">Marques</h4>
                  </div>
                  <div className="flex-1 overflow-y-auto" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#9ca3af #f3f4f6'
          }}>
                    <div className="py-3 px-2">
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
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Colonne Produits */}
        {(hoveredBrand || (menuType === 'tablettes' && hoveredCategory === 'Tablettes')) && (
          <div className="min-w-[190px] bg-gradient-to-b from-gray-50 to-white max-h-[600px] flex flex-col">
            {(() => {
              const products = menuType === 'accessoires' 
                ? allProducts.filter(p => 
                    p.brand === hoveredBrand && 
                    p.category === 'Accessoires'
                  )
                : menuType === 'led'
                ? (hoveredBrand === 'MONSTER' && hoveredSubcategory === 'Bandeaux LED'
                    ? allProducts.filter(p => [
                        'monster-smart-light-strip-rgbw',
                        'monster-illuminescence-smart-prism-ii-rgb-ic', 
                        'monster-illuminescence-smart-beam-2x-bars-kit',
                        'monster-illuminescence-neon',
                        'monster-basic-30m-rgb',
                        'monster-illuminescence-color-blanc',
                        'monster-chroma-2x-bars'
                      ].includes(p.id))
                    : hoveredBrand === 'MONSTER' && hoveredSubcategory === 'Éclairage LED'
                    ? allProducts.filter(p => 
                        p.brand === 'MONSTER' && 
                        p.category === 'LED' &&
                        ![
                          'monster-smart-light-strip-rgbw',
                          'monster-illuminescence-smart-prism-ii-rgb-ic', 
                          'monster-illuminescence-smart-beam-2x-bars-kit',
                          'monster-illuminescence-neon',
                          'monster-basic-30m-rgb',
                          'monster-illuminescence-color-blanc',
                          'monster-chroma-2x-bars'
                        ].includes(p.id)
                      )
                    : allProducts.filter(p => 
                        p.brand === hoveredBrand && 
                        p.category === 'LED'
                      )
                  )
                : menuType === 'audio'
                ? allProducts.filter(p => 
                    p.brand === hoveredBrand && 
                    p.category === 'Audio' &&
                    (hoveredSubcategory ? p.subcategory === hoveredSubcategory : true)
                  )
                : menuType === 'montres'
                ? allProducts.filter(p => 
                    p.brand === hoveredBrand && 
                    p.category === 'Montres' &&
                    (hoveredSubcategory ? p.subcategory === hoveredSubcategory : true)
                  )
                : menuType === 'smartphones'
                ? (hoveredBrand === 'HONOR' 
                    ? allProducts.filter(p => p.category === 'Smartphones' && p.brand === 'HONOR')
                    : allProducts.filter(p => 
                        p.category === 'Smartphones' && 
                        (hoveredBrand ? p.brand === hoveredBrand : true) &&
                        (hoveredSubcategory ? p.subcategory === hoveredSubcategory : true)
                      )
                  )
                : menuType === 'tablettes'
                ? allProducts.filter(p => 
                    p.category === 'Tablettes' && p.id !== 'ipad-10-9-10th-gen'
                  )
                : getProductsForDisplay() || [];

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
                                <div className="w-12 h-12 bg-white border border-gray-200 rounded overflow-hidden flex-shrink-0 shadow-sm">
                                  {product.images && product.images.length > 0 ? (
                                    <ImageWithFallback
                                      src={product.images[0]}
                                      alt={product.name}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-contain"
                                      productCategory={product.category}
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
  const [searchSuggestions, setSearchSuggestions] = useState<typeof allProducts>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { items, removeFromCart, updateQuantity, getCartTotal, getItemCount } = useCart();
  // const { isAuthenticated } = useAuth();
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
                    />
                  </div>
                );
              })}
              
            </nav>
            
            {/* Barre de recherche desktop */}
            <div className="relative hidden xl:flex ml-auto mr-4" ref={searchRef}>
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