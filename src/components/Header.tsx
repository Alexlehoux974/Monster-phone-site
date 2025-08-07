'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ChevronRight, ArrowRight, Shield, Truck, Flame, Smartphone, Watch, Headphones, Lightbulb, Package, Star, Trash2, CreditCard, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { menuStructure, type CategoryStructure, allProducts, getProductsByCategory, getProductsByBrand } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

// Composant pour la barre d'urgence promotionnelle
const PromoBar = () => (
  <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-2 px-3 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <div className="flex items-center justify-center gap-4 text-sm font-medium flex-wrap">
        <div className="flex items-center gap-1.5">
          <Truck className="w-4 h-4" />
          <span>LIVRAISON EXPRESS 24H/48H À LA RÉUNION</span>
        </div>
        <span className="hidden sm:block text-xs">•</span>
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4" />
          <span>LIVRAISON GRATUITE DÈS 50€</span>
        </div>
        <span className="hidden sm:block text-xs">•</span>
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4" />
          <span>GARANTIE 2 ANS</span>
        </div>
      </div>
    </div>
  </div>
);

// Composant DropdownMenu simplifié et stable
const DropdownMenu = ({ 
  categories, 
  isOpen, 
  onClose,
  alignRight = false
}: { 
  categories: CategoryStructure[];
  isOpen: boolean;
  onClose: () => void;
  alignRight?: boolean;
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  
  // Obtenir les produits par catégorie ou marque
  const getProductsForDisplay = () => {
    if (hoveredBrand) {
      return getProductsByBrand(hoveredBrand) || [];
    }
    if (hoveredCategory) {
      return getProductsByCategory(hoveredCategory) || [];
    }
    return [];
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`absolute top-full mt-2 bg-white shadow-xl border border-gray-200 rounded-lg z-[150] min-w-[600px] overflow-hidden ${
        alignRight ? 'right-0' : 'left-0'
      }`}
      style={{ boxShadow: "0 20px 40px -8px rgba(0, 0, 0, 0.15)" }}
    >
      <div className="flex min-h-[350px]">
        {/* Colonne des catégories - maintenant première colonne */}
        <div className="w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-xl">Nos articles</h3>
          </div>
          <div className="py-2">
            {categories.map((category) => (
              <div key={category.name}>
                <Link
                  href={`/nos-produits?category=${encodeURIComponent(category.name)}`}
                  className={cn(
                    "block px-4 py-3 text-base font-medium transition-colors",
                    hoveredCategory === category.name 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-900 hover:text-blue-600 hover:bg-gray-100"
                  )}
                  onMouseEnter={() => {
                    setHoveredCategory(category.name);
                    setHoveredSubcategory(null);
                    setHoveredBrand(null);
                  }}
                  onClick={onClose}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    {(category.subcategories || category.brands) && (
                      <ArrowRight className="w-4 h-4 text-gray-900" />
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne des sous-catégories ou marques */}
        {hoveredCategory && (
          <div className="w-64 border-r border-gray-200">
            {(() => {
              const category = categories.find(c => c.name === hoveredCategory);
              if (!category) return null;

              // Si la catégorie a des sous-catégories
              if (category.subcategories) {
                return (
                  <>
                    <div className="p-4 border-b border-gray-200 bg-green-50">
                      <h4 className="font-semibold text-gray-900 text-lg">Types</h4>
                    </div>
                    <div className="py-2">
                      {category.subcategories.map((subcat) => (
                        <div key={subcat.name}>
                          <Link
                            href={`/nos-produits?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(subcat.slug)}`}
                            className={cn(
                              "block px-4 py-3 text-base font-medium transition-colors",
                              hoveredSubcategory === subcat.name 
                                ? "bg-green-50 text-green-700" 
                                : "text-gray-900 hover:text-green-600 hover:bg-gray-100"
                            )}
                            onMouseEnter={() => {
                              setHoveredSubcategory(subcat.name);
                              setHoveredBrand(subcat.brands?.[0] || null);
                            }}
                            onClick={onClose}
                          >
                            <div className="flex items-center justify-between">
                              <span>{subcat.name}</span>
                              {subcat.brands && <ChevronRight className="w-4 h-4" />}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                );
              }
              
              // Si la catégorie a directement des marques
              if (category.brands) {
                return (
                  <>
                    <div className="p-4 border-b border-gray-200 bg-green-50">
                      <h4 className="font-semibold text-gray-900 text-lg">Marques</h4>
                    </div>
                    <div className="py-2">
                      {category.brands.map((brand) => {
                        const brandProducts = getProductsByBrand(brand);
                        return (
                          <div key={brand}>
                            <Link
                              href={`/nos-produits?brand=${encodeURIComponent(brand)}`}
                              className={cn(
                                "block px-4 py-3 text-lg font-medium transition-colors",
                                hoveredBrand === brand 
                                  ? "bg-green-50 text-green-700" 
                                  : "text-gray-900 hover:text-green-600 hover:bg-gray-100"
                              )}
                              onMouseEnter={() => setHoveredBrand(brand)}
                              onClick={onClose}
                            >
                              <div>
                                <span className="font-medium">{brand}</span>
                                <span className="text-sm text-gray-900 block">({brandProducts.length} produits)</span>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              }

              return null;
            })()}
          </div>
        )}

        {/* Colonne des produits */}
        {hoveredBrand && (
          <div className="flex-1 bg-gray-50">
            {(() => {
              const products = getProductsForDisplay() || [];

              return (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900 text-lg">Collection {hoveredBrand}</h4>
                    <p className="text-base text-gray-900 mt-1">{products.length} produits disponibles</p>
                  </div>
                  <div className="py-2 max-h-80 overflow-y-auto">
                    {products && products.length > 0 ? products.slice(0, 5).map((product) => (
                      <div key={product.id}>
                        <Link
                          href={`/produit/${product.urlSlug || product.id}`}
                          className="block px-4 py-3 hover:bg-white transition-colors"
                          onClick={onClose}
                        >
                          <div className="flex items-start space-x-3">
                            {product.images && product.images.length > 0 && (
                              <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-lg font-medium text-gray-900 line-clamp-1">
                                {product.name}
                              </p>
                              {product.price && (
                                <p className="text-lg font-semibold text-blue-600 mt-1">
                                  {typeof product.price === 'number' 
                                    ? `${product.price.toFixed(2)} €` 
                                    : product.price}
                                </p>
                              )}
                              <p className="text-sm text-gray-900 mt-1 line-clamp-2">
                                {product.shortDescription || product.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )) : null}
                    {products && products.length > 5 && (
                      <div className="px-4 py-3">
                        <Link
                          href={`/nos-produits?brand=${encodeURIComponent(hoveredBrand)}`}
                          className="text-base font-medium text-blue-600 hover:text-blue-800"
                          onClick={onClose}
                        >
                          Voir tous les {products.length} produits →
                        </Link>
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

  // Toutes les catégories du menu
  const allCategories = [
    { name: 'Smartphones', icon: <Smartphone className="w-5 h-5" />, data: menuStructure.smartphones },
    { name: 'Montres', icon: <Watch className="w-5 h-5" />, data: menuStructure.montres },
    { name: 'Audio', icon: <Headphones className="w-5 h-5" />, data: menuStructure.casquesAudio },
    { name: 'Luminaire', icon: <Lightbulb className="w-5 h-5" />, data: menuStructure.luminaire },
    { name: 'Accessoires', icon: <Package className="w-5 h-5" />, data: menuStructure.accessoiresMonster },
    { name: 'MUVIT', icon: <Star className="w-5 h-5" />, data: menuStructure.muvit },
  ];

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
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Fil d'ariane */}
        {(activeCategory || activeBrand) && (
          <div className="px-4 pb-3 flex items-center gap-2 text-sm overflow-x-auto">
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
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Catégories principales */}
            <div className="space-y-2">
              {allCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className="w-full flex items-center justify-between p-4 text-left bg-gray-50 active:bg-gray-200 rounded-lg transition-colors min-h-[56px]"
              >
                <div className="flex items-center gap-3">
                  {category.icon}
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
                className="block p-4 bg-red-50 active:bg-red-200 rounded-lg transition-colors min-h-[56px]"
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
              const category = allCategories.find(c => c.name === activeCategory);
              const categoryData = category?.data[0];
              
              if (!categoryData?.brands) return null;

              return (
                <>
                  {/* Lien vers toute la catégorie */}
                  <Link
                    href={`/nos-produits?category=${encodeURIComponent(categoryData.name)}`}
                    onClick={onClose}
                    className="block p-4 bg-blue-50 active:bg-blue-200 rounded-lg transition-colors mb-4 min-h-[56px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-blue-900">Voir tous les {categoryData.name}</span>
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </div>
                  </Link>

                  {/* Liste des marques */}
                  {categoryData.brands.map((brand) => (
                    <button
                      key={brand.name}
                      onClick={() => setActiveBrand(brand.name)}
                      className="w-full flex items-center justify-between p-4 text-left bg-gray-50 active:bg-gray-200 rounded-lg transition-colors min-h-[56px]"
                    >
                      <div>
                        <span className="font-medium text-gray-900">{brand.name}</span>
                        <span className="block text-sm text-gray-600 mt-1">
                          {brand.products.length} produit{brand.products.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </>
              );
            })()}
          </div>
        )}

        {/* Vue des produits */}
        {activeCategory && activeBrand && (
          <div className="p-4 space-y-3">
            {(() => {
              const category = allCategories.find(c => c.name === activeCategory);
              const categoryData = category?.data[0];
              const brand = categoryData?.brands?.find(b => b.name === activeBrand);
              const products = brand?.products || [];

              return (
                <>
                  {/* Lien vers tous les produits de la marque */}
                  <Link
                    href={`/nos-produits?brand=${encodeURIComponent(activeBrand)}`}
                    onClick={onClose}
                    className="block p-4 bg-green-50 active:bg-green-200 rounded-lg transition-colors mb-4 min-h-[56px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-900">
                        Voir tous les produits {activeBrand}
                      </span>
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </div>
                  </Link>

                  {/* Liste des produits */}
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/produit/${product.urlSlug || product.id}`}
                      onClick={onClose}
                      className="block p-4 bg-white border border-gray-200 active:border-blue-500 active:bg-gray-50 rounded-lg transition-all min-h-[72px]"
                    >
                      <div className="flex items-start gap-4">
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
                          <h4 className="font-medium text-gray-900 line-clamp-2">
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
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all">
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { items, removeFromCart, updateQuantity, getCartTotal, getItemCount } = useCart();
  // const { isAuthenticated } = useAuth();
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement>(null);

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

  const handleMouseEnter = (menu: string) => {
    setDropdownOpen(menu);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(null);
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header principal */}
          <div className="flex items-center gap-4 h-16 overflow-visible">
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
            <nav className="hidden xl:flex items-center gap-0.5 flex-1 overflow-visible">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-1 text-gray-900 hover:text-blue-600 px-2 py-1.5 text-xs font-medium transition-colors rounded-lg hover:bg-blue-50"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Menu déroulant Smartphones */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('smartphones')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 px-2 py-1.5 text-xs font-bold transition-colors rounded-lg ${
                    dropdownOpen === 'smartphones' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Smartphones</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${
                    dropdownOpen === 'smartphones' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <DropdownMenu
                  categories={menuStructure.smartphones}
                  isOpen={dropdownOpen === 'smartphones'}
                  onClose={closeDropdown}
                />
              </div>

              {/* Menu déroulant Montres */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('montres')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-1 text-gray-900 hover:text-blue-600 px-2 py-1.5 text-xs font-bold transition-colors rounded-lg hover:bg-blue-50"
                >
                  <Watch className="w-3 h-3" />
                  <span>Montres</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <DropdownMenu
                  categories={menuStructure.montres}
                  isOpen={dropdownOpen === 'montres'}
                  onClose={closeDropdown}
                />
              </div>
              
              {/* Menu déroulant Audio */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('audio')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-1 text-gray-900 hover:text-blue-600 px-2 py-1.5 text-xs font-bold transition-colors rounded-lg hover:bg-blue-50"
                >
                  <Headphones className="w-3 h-3" />
                  <span>Audio</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <DropdownMenu
                  categories={menuStructure.casquesAudio}
                  isOpen={dropdownOpen === 'audio'}
                  onClose={closeDropdown}
                />
              </div>
              
              {/* Menu déroulant Luminaire */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('luminaire')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-1 text-gray-900 hover:text-blue-600 px-2 py-1.5 text-xs font-bold transition-colors rounded-lg hover:bg-blue-50"
                >
                  <Lightbulb className="w-3 h-3" />
                  <span>Luminaire</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <DropdownMenu
                  categories={menuStructure.luminaire}
                  isOpen={dropdownOpen === 'luminaire'}
                  onClose={closeDropdown}
                  alignRight={true}
                />
              </div>
              
              {/* Menu déroulant Accessoires */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('accessoires')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-1 text-gray-900 hover:text-blue-600 px-2 py-1.5 text-xs font-bold transition-colors rounded-lg hover:bg-blue-50"
                >
                  <Package className="w-3 h-3" />
                  <span>Accessoires</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <DropdownMenu
                  categories={menuStructure.accessoiresMonster}
                  isOpen={dropdownOpen === 'accessoires'}
                  onClose={closeDropdown}
                  alignRight={true}
                />
              </div>
              
              {/* Menu déroulant MUVIT */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('muvit')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-1 text-gray-900 hover:text-blue-600 px-2 py-1.5 text-xs font-bold transition-colors rounded-lg hover:bg-blue-50"
                >
                  <Star className="w-3 h-3" />
                  <span>MUVIT</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <DropdownMenu
                  categories={menuStructure.muvit}
                  isOpen={dropdownOpen === 'muvit'}
                  onClose={closeDropdown}
                  alignRight={true}
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
                <Package className="w-5 h-5" />
                <span>Accessoires</span>
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
                        <div className="max-h-80 overflow-y-auto">
                          {items.map((item) => {
                            const price = parseFloat(item.product.price?.replace('€', '') || '0');
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
                                    <h4 className="text-sm font-medium line-clamp-1">{item.product.name}</h4>
                                    <p className="text-xs text-gray-600 mt-1">
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
                              className="block w-full text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                              Voir le panier
                            </Link>
                            <button
                              onClick={() => {
                                setIsCartOpen(false);
                                router.push('/checkout');
                              }}
                              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
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