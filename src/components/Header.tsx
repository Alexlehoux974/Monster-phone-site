'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ArrowRight, Shield, Truck, Flame, Smartphone, Watch, Headphones, Lightbulb, Package, Star, Trash2, CreditCard, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { menuStructure, type CategoryStructure } from '@/data/products';
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
  // const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

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
                    setHoveredBrand(null);
                  }}
                  onClick={onClose}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    {category.brands && category.brands.length > 0 && (
                      <ArrowRight className="w-4 h-4 text-gray-900" />
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne des marques */}
        {hoveredCategory && (
          <div className="w-64 border-r border-gray-200">
            {(() => {
              const category = categories.find(c => c.name === hoveredCategory);
              if (!category || !category.brands) return null;

              return (
                <>
                  <div className="p-4 border-b border-gray-200 bg-green-50">
                    <h4 className="font-semibold text-gray-900 text-lg">{category.name}</h4>
                  </div>
                  <div className="py-2">
                    {category.brands.map((brand) => (
                      <div key={brand.name}>
                        <Link
                          href={`/nos-produits?brand=${encodeURIComponent(brand.name)}`}
                          className={cn(
                            "block px-4 py-3 text-lg font-medium transition-colors",
                            hoveredBrand === brand.name 
                              ? "bg-green-50 text-green-700" 
                              : "text-gray-900 hover:text-green-600 hover:bg-gray-100"
                          )}
                          onMouseEnter={() => setHoveredBrand(brand.name)}
                          onClick={onClose}
                        >
                          <div>
                            <span className="font-medium">{brand.name}</span>
                            <span className="text-sm text-gray-900 block">({brand.products.length} produits)</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Colonne des produits */}
        {hoveredBrand && (
          <div className="flex-1 bg-gray-50">
            {(() => {
              const category = categories.find(c => c.name === hoveredCategory);
              const brand = category?.brands?.find(b => b.name === hoveredBrand);
              const products = brand?.products || [];

              return (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900 text-lg">Collection {hoveredBrand}</h4>
                    <p className="text-base text-gray-900 mt-1">{products.length} produits disponibles</p>
                  </div>
                  <div className="py-2 max-h-80 overflow-y-auto">
                    {products.slice(0, 5).map((product) => (
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
                                  {product.price}
                                </p>
                              )}
                              <p className="text-sm text-gray-900 mt-1 line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                    {products.length > 5 && (
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { items, removeFromCart, updateQuantity, getCartTotal, getItemCount } = useCart();
  // const { isAuthenticated } = useAuth();
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement>(null);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="lg:hidden border-t border-gray-100 bg-white">
              <div className="py-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                <Link
                  href="/nos-produits?category=Montres+Connectées"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Montres Connectées</span>
                </Link>
                
                <Link
                  href="/nos-produits?category=Luminaire+Monster"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Luminaire Monster</span>
                </Link>
                
                <Link
                  href="/nos-produits?category=Casques+et+Audio"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Casques et Audio</span>
                </Link>
                
                <Link
                  href="/nos-produits?category=Accessoires+Monster"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Accessoires Monster</span>
                </Link>
                
                <Link
                  href="/nos-produits?brand=MUVIT"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Produits MUVIT</span>
                </Link>
              </div>
              
              {/* Recherche mobile */}
              <div className="px-4 pb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-900" />
                </div>
              </div>

              {/* CTA mobile */}
              <div className="px-4 pb-3">
                <Link href="/nos-produits">
                  <button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium text-base shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🎮 Découvrir nos produits gaming
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}