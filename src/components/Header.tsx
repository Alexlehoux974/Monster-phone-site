'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ArrowRight, Phone, Clock, Shield, Truck, Flame, Zap, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { menuStructure, type CategoryStructure, type Product } from '@/data/products';

// Composant pour la barre d'urgence promotionnelle
const PromoBar = () => (
  <div 
    className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-2 px-4 relative overflow-hidden animate-slide-down"
  >
    <div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
    />
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <div 
        className="flex items-center justify-center gap-4 text-sm font-semibold flex-wrap animate-pulse-subtle"
      >
        <div className="flex items-center gap-1">
          <Truck className="w-4 h-4 animate-pulse" />
          <span>LIVRAISON EXPRESS 24H/48H À LA RÉUNION</span>
        </div>
        <span className="hidden sm:block">•</span>
        <div className="flex items-center gap-1">
          <Flame className="w-4 h-4 animate-pulse" />
          <span>LIVRAISON GRATUITE DÈS 50€</span>
        </div>
        <span className="hidden sm:block">•</span>
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4 animate-pulse" />
          <span>GARANTIE 2 ANS</span>
        </div>
      </div>
    </div>
  </div>
);

// Composant DropdownMenu amélioré avec animations
const DropdownMenu = ({ 
  trigger, 
  categories, 
  isOpen, 
  onClose 
}: { 
  trigger: string;
  categories: CategoryStructure[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (item: string, level: 'category' | 'subcategory' | 'brand') => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (level === 'category') {
      setHoveredCategory(item);
      setHoveredSubcategory(null);
      setHoveredBrand(null);
    } else if (level === 'subcategory') {
      setHoveredSubcategory(item);
      setHoveredBrand(null);
    } else {
      setHoveredBrand(item);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
      setHoveredSubcategory(null);
      setHoveredBrand(null);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div 
          className={`absolute top-full left-0 mt-1 bg-white shadow-2xl border border-gray-100 rounded-2xl z-50 min-w-[900px] max-w-[1100px] overflow-hidden ${isOpen ? 'animate-fade-in-scale' : ''}`}
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5)"
          }}
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex min-h-[400px]">
            {/* Colonne des catégories */}
            <div className="w-72 bg-gradient-to-br from-slate-50 to-blue-50/30 border-r border-gray-100 animate-slide-in-left">
              <div className="p-6 border-b border-gray-100/80">
                <h3 className="font-bold text-gray-900 text-lg tracking-tight flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  {trigger}
                </h3>
              </div>
              <div className="py-3">
                {categories.map((category, index) => (
                  <div 
                    key={category.name}
                    className="animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Link
                      href={`/nos-produits?category=${encodeURIComponent(category.name)}`}
                      className={cn(
                        "w-full text-left px-6 py-4 text-base font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 flex items-center justify-between group",
                        hoveredCategory === category.name ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm" : "text-gray-700 hover:text-blue-600"
                      )}
                      onMouseEnter={() => handleMouseEnter(category.name, 'category')}
                      onClick={onClose}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{category.name}</span>
                      {(category.subcategories || category.brands) && (
                        <div className={`transition-transform duration-200 ${hoveredCategory === category.name ? 'translate-x-1' : ''}`}>
                          <ArrowRight className="w-5 h-5 text-blue-500" />
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Colonnes suivantes avec animations */}
            {hoveredCategory && (
              <div 
                key={hoveredCategory}
                className="w-72 border-r border-gray-100 animate-slide-in-right"
              >
                  {(() => {
                    const category = categories.find(c => c.name === hoveredCategory);
                    if (!category) return null;

                    if (category.subcategories) {
                      return (
                        <>
                          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-purple-50/30">
                            <h4 className="font-bold text-gray-900 text-base flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse" />
                              {category.name}
                            </h4>
                          </div>
                          <div className="py-3">
                            {category.subcategories.map((subcategory, index) => (
                              <div
                                key={subcategory.name}
                                className="animate-slide-in-right"
                                style={{ animationDelay: `${index * 0.05}s` }}
                              >
                                <Link
                                  href={`/nos-produits?category=${encodeURIComponent(subcategory.name)}`}
                                  className={cn(
                                    "w-full text-left px-6 py-4 text-base font-medium hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300 flex items-center justify-between group",
                                    hoveredSubcategory === subcategory.name ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 shadow-sm" : "text-gray-700 hover:text-purple-600"
                                  )}
                                  onMouseEnter={() => handleMouseEnter(subcategory.name, 'subcategory')}
                                  onClick={onClose}
                                >
                                  <span className="group-hover:translate-x-1 transition-transform duration-200">{subcategory.name}</span>
                                  <div className={`transition-transform duration-200 ${hoveredSubcategory === subcategory.name ? 'translate-x-1' : ''}`}>
                                    <ArrowRight className="w-5 h-5 text-purple-500" />
                                  </div>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    } else if (category.brands) {
                      return (
                        <>
                          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50/50 to-blue-50/30">
                            <h4 className="font-bold text-gray-900 text-base flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
                              Marques Premium
                            </h4>
                          </div>
                          <div className="py-3">
                            {category.brands.map((brand, index) => (
                              <div
                                key={brand.name}
                                className="animate-slide-in-right"
                                style={{ animationDelay: `${index * 0.05}s` }}
                              >
                                <Link
                                  href={`/nos-produits?brand=${encodeURIComponent(brand.name)}`}
                                  className={cn(
                                    "w-full text-left px-6 py-4 text-base font-medium hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300 flex items-center justify-between group",
                                    hoveredBrand === brand.name ? "bg-gradient-to-r from-green-50 to-blue-50 text-green-700 shadow-sm" : "text-gray-700 hover:text-green-600"
                                  )}
                                  onMouseEnter={() => handleMouseEnter(brand.name, 'brand')}
                                  onClick={onClose}
                                >
                                  <div className="group-hover:translate-x-1 transition-transform duration-200">
                                    <span className="font-semibold">{brand.name}</span>
                                    <span className="text-sm text-gray-500 block">({brand.products.length} produits)</span>
                                  </div>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}

            {/* Colonne des marques pour sous-catégories */}
            {hoveredCategory && hoveredSubcategory && (
              <div 
                key={`${hoveredCategory}-${hoveredSubcategory}`}
                className="w-72 border-r border-gray-100 animate-slide-in-right"
              >
                  {(() => {
                    const category = categories.find(c => c.name === hoveredCategory);
                    const subcategory = category?.subcategories?.find(s => s.name === hoveredSubcategory);
                    if (!subcategory) return null;

                    return (
                      <>
                        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50/50 to-red-50/30">
                          <h4 className="font-bold text-gray-900 text-base flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse" />
                            Marques
                          </h4>
                        </div>
                        <div className="py-3">
                          {subcategory.brands.map((brand, index) => (
                            <div
                              key={brand.name}
                              className="animate-slide-in-right"
                              style={{ animationDelay: `${index * 0.05}s` }}
                            >
                              <Link
                                href={`/nos-produits?brand=${encodeURIComponent(brand.name)}`}
                                className={cn(
                                  "w-full text-left px-6 py-4 text-base font-medium hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 flex items-center justify-between group",
                                  hoveredBrand === brand.name ? "bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 shadow-sm" : "text-gray-700 hover:text-orange-600"
                                )}
                                onMouseEnter={() => handleMouseEnter(brand.name, 'brand')}
                                onClick={onClose}
                              >
                                <div className="group-hover:translate-x-1 transition-transform duration-200">
                                  <span className="font-semibold">{brand.name}</span>
                                  <span className="text-sm text-gray-500 block">({brand.products.length} produits)</span>
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

            {/* Colonne des produits avec preview amélioré */}
            {hoveredBrand && (
              <div 
                key={hoveredBrand}
                className="flex-1 bg-gradient-to-br from-gray-50/50 to-blue-50/20 animate-slide-in-right"
              >
                  {(() => {
                    const category = categories.find(c => c.name === hoveredCategory);
                    let products: Product[] = [];

                    if (category?.subcategories && hoveredSubcategory) {
                      const subcategory = category.subcategories.find(s => s.name === hoveredSubcategory);
                      const brand = subcategory?.brands.find(b => b.name === hoveredBrand);
                      products = brand?.products || [];
                    } else if (category?.brands) {
                      const brand = category.brands.find(b => b.name === hoveredBrand);
                      products = brand?.products || [];
                    }

                    return (
                      <>
                        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                          <h4 className="font-bold text-gray-900 text-base flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse" />
                            Collection {hoveredBrand}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{products.length} produits disponibles</p>
                        </div>
                        <div className="py-3 max-h-96 overflow-y-auto">
                          {products.slice(0, 6).map((product, index) => (
                            <div
                              key={product.id}
                              className="animate-slide-in-right"
                              style={{ animationDelay: `${index * 0.05}s` }}
                            >
                              <Link
                                href={`/produit/${product.urlSlug || product.id}`}
                                className="block px-6 py-4 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group"
                                onClick={onClose}
                              >
                                <div className="flex items-start space-x-4">
                                  {product.images && product.images.length > 0 && (
                                    <div 
                                      className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-transparent group-hover:ring-indigo-200 transition-all duration-300"
                                    >
                                      <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                      {product.name}
                                    </p>
                                    {product.price && (
                                      <p className="text-lg font-bold text-indigo-600 mt-1">
                                        {product.price}
                                      </p>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                      {product.description}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                          {products.length > 6 && (
                            <div
                              className="px-6 py-4 animate-fade-in"
                              style={{ animationDelay: '0.3s' }}
                            >
                              <Link
                                href={`/nos-produits?brand=${encodeURIComponent(hoveredBrand)}`}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
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
      )}
    </>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Gestion du scroll pour effet sticky avancé
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDropdownOpen(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(null);
    }, 400);
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Navigation optimisée pour conversion
  const navigation = [
    { name: 'Accueil', href: '/', icon: null },
    { name: 'Smartphones', href: '/nos-produits?category=Smartphones', icon: null },
    { name: 'Services', href: '/services/reparation', icon: <Wrench className="w-4 h-4" /> },
  ];

  return (
    <div className="sticky top-0 z-50 animate-slide-down">
      {/* Barre promotionnelle urgente */}
      <PromoBar />
      
      <header 
        className={cn(
          "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300",
          isScrolled ? "shadow-lg bg-white/98" : ""
        )}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header principal */}
          <div className="flex justify-between items-center h-24 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {/* Logo avec animation */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <Image 
                    src="/LOGO-MONSTER-PHONE.png" 
                    alt="Monster Phone - Spécialiste Gaming Mobile La Réunion" 
                    width={180} 
                    height={90}
                    className="h-14 w-auto transition-all duration-300 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </div>

            {/* Navigation desktop avec typographie améliorée */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <div
                  key={item.name}
                  className="animate-slide-in-top"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-3 text-base font-semibold transition-all duration-300 hover:bg-blue-50/50 rounded-xl group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item.icon}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </div>
              ))}
              
              {/* Menu déroulant Smartphones */}
              <div 
                className="relative animate-slide-in-top"
                style={{ animationDelay: '0.8s' }}
                onMouseEnter={() => handleMouseEnter('smartphones')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-3 text-base font-semibold transition-all duration-300 hover:bg-blue-50/50 rounded-xl group relative overflow-hidden transform hover:scale-102 active:scale-98"
                  onClick={() => handleDropdownToggle('smartphones')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Téléphones</span>
                  <div className={dropdownOpen === 'smartphones' ? 'chevron-rotate' : 'chevron-normal'}>
                    <ChevronDown className="w-5 h-5 relative z-10" />
                  </div>
                </button>
                
                <DropdownMenu
                  trigger="Téléphones Premium"
                  categories={menuStructure.smartphones}
                  isOpen={dropdownOpen === 'smartphones'}
                  onClose={closeDropdown}
                />
              </div>
              
              {/* Menu déroulant Accessoires */}
              <div 
                className="relative animate-slide-in-top"
                style={{ animationDelay: '0.9s' }}
                onMouseEnter={() => handleMouseEnter('accessoires')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-3 text-base font-semibold transition-all duration-300 hover:bg-blue-50/50 rounded-xl group relative overflow-hidden transform hover:scale-102 active:scale-98"
                  onClick={() => handleDropdownToggle('accessoires')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Accessoires</span>
                  <div className={dropdownOpen === 'accessoires' ? 'chevron-rotate' : 'chevron-normal'}>
                    <ChevronDown className="w-5 h-5 relative z-10" />
                  </div>
                </button>
                
                <DropdownMenu
                  trigger="Accessoires Gaming"
                  categories={menuStructure.accessoires}
                  isOpen={dropdownOpen === 'accessoires'}
                  onClose={closeDropdown}
                />
              </div>
            </nav>
            
            {/* Overlay pour fermer les menus */}
            {dropdownOpen && (
              <div 
                className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm animate-fade-in" 
                onClick={closeDropdown}
              />
            )}

            {/* Section droite - Recherche et actions */}
            <div 
              className="flex items-center space-x-3 animate-slide-in-right"
              style={{ animationDelay: '0.6s' }}
            >
              {/* Barre de recherche desktop améliorée */}
              <div className="hidden lg:flex relative group">
                <input
                  type="text"
                  placeholder="Rechercher un produit gaming..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-72 px-5 py-3 pr-12 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm bg-gray-50/50 hover:bg-white focus:bg-white group-hover:border-gray-300 transform focus:scale-102"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50 transform hover:scale-110 active:scale-90"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>

              {/* Actions avec badges et animations */}
              <div className="flex items-center space-x-2">
                {/* Recherche mobile */}
                <button 
                  className="lg:hidden p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-90"
                >
                  <Search className="h-5 w-5" />
                </button>
                
                {/* Panier avec animation */}
                <button 
                  className="relative p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group transform hover:scale-110 active:scale-90"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse-subtle">
                    0
                  </span>
                  <div className="absolute inset-0 bg-blue-100 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                </button>

                {/* Compte avec indicateur */}
                <button 
                  className="relative p-3 text-gray-700 hover:text-blue-600 hover:bg-green-50 rounded-xl transition-all duration-200 group transform hover:scale-110 active:scale-90"
                >
                  <User className="h-5 w-5" />
                  <div className="absolute inset-0 bg-green-100 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                </button>

                {/* CTA urgent pour mobile visible */}
                <div
                  className="hidden md:block animate-scale-in"
                  style={{ animationDelay: '1s' }}
                >
                  <Link href="/nos-produits">
                    <button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group transform hover:scale-105 active:scale-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Découvrir
                      </span>
                    </button>
                  </Link>
                </div>

                {/* Menu mobile */}
                <button
                  className="lg:hidden p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-90"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <div className="animate-fade-in">
                      <X className="h-5 w-5" />
                    </div>
                  ) : (
                    <div className="animate-fade-in">
                      <Menu className="h-5 w-5" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Menu mobile amélioré */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm animate-slide-down">
                <div className="py-4 space-y-2">
                  {navigation.map((item, index) => (
                    <div
                      key={item.name}
                      className="animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon}
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                      </Link>
                    </div>
                  ))}
                  
                  {/* Liens directs pour mobile */}
                  <div
                    className="animate-slide-in-left"
                    style={{ animationDelay: '0.3s' }}
                  >
                    <Link
                      href="/nos-produits"
                      className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Smartphones</span>
                    </Link>
                  </div>
                  <div
                    className="animate-slide-in-left"
                    style={{ animationDelay: '0.4s' }}
                  >
                    <Link
                      href="/accessoires"
                      className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Accessoires Gaming</span>
                    </Link>
                  </div>
                </div>
                
                {/* Recherche mobile */}
                <div 
                  className="px-4 pb-4 animate-slide-in-top"
                  style={{ animationDelay: '0.5s' }}
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher un produit gaming..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-5 py-3 pr-12 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* CTA mobile */}
                <div
                  className="px-4 pb-4 animate-slide-in-top"
                  style={{ animationDelay: '0.6s' }}
                >
                  <Link href="/nos-produits">
                    <button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-base shadow-lg"
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