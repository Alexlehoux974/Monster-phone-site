'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { menuStructure, type CategoryStructure, type Product } from '@/data/products';

// Composant DropdownMenu hiérarchique
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
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 mt-1 bg-white shadow-xl border border-gray-200 rounded-lg z-50 min-w-[800px] max-w-[1000px]"
      onMouseEnter={() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex">
        {/* Colonne des catégories */}
        <div className="w-64 bg-gray-50 rounded-l-lg">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              {trigger}
            </h3>
          </div>
          <div className="py-2">
            {categories.map((category) => (
              <div key={category.name}>
                <Link
                  href={`/nos-produits?category=${encodeURIComponent(category.name)}`}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors flex items-center justify-between",
                    hoveredCategory === category.name ? "bg-blue-50 text-blue-600" : "text-gray-700"
                  )}
                  onMouseEnter={() => handleMouseEnter(category.name, 'category')}
                  onClick={onClose}
                >
                  <span>{category.name}</span>
                  {(category.subcategories || category.brands) && (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne des sous-catégories ou marques */}
        {hoveredCategory && (
          <div className="w-64 border-l border-gray-200">
            {(() => {
              const category = categories.find(c => c.name === hoveredCategory);
              if (!category) return null;

              if (category.subcategories) {
                return (
                  <>
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {category.name}
                      </h4>
                    </div>
                    <div className="py-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.name}
                          href={`/nos-produits?category=${encodeURIComponent(subcategory.name)}`}
                          className={cn(
                            "w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors flex items-center justify-between",
                            hoveredSubcategory === subcategory.name ? "bg-blue-50 text-blue-600" : "text-gray-700"
                          )}
                          onMouseEnter={() => handleMouseEnter(subcategory.name, 'subcategory')}
                          onClick={onClose}
                        >
                          <span>{subcategory.name}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ))}
                    </div>
                  </>
                );
              } else if (category.brands) {
                return (
                  <>
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Marques
                      </h4>
                    </div>
                    <div className="py-2">
                      {category.brands.map((brand) => (
                        <Link
                          key={brand.name}
                          href={`/nos-produits?brand=${encodeURIComponent(brand.name)}`}
                          className={cn(
                            "w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors flex items-center justify-between",
                            hoveredBrand === brand.name ? "bg-blue-50 text-blue-600" : "text-gray-700"
                          )}
                          onMouseEnter={() => handleMouseEnter(brand.name, 'brand')}
                          onClick={onClose}
                        >
                          <span>{brand.name}</span>
                          <span className="text-xs text-gray-500">({brand.products.length})</span>
                        </Link>
                      ))}
                    </div>
                  </>
                );
              }
              return null;
            })()}
          </div>
        )}

        {/* Colonne des marques (pour les sous-catégories) */}
        {hoveredCategory && hoveredSubcategory && (
          <div className="w-64 border-l border-gray-200">
            {(() => {
              const category = categories.find(c => c.name === hoveredCategory);
              const subcategory = category?.subcategories?.find(s => s.name === hoveredSubcategory);
              if (!subcategory) return null;

              return (
                <>
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Marques
                    </h4>
                  </div>
                  <div className="py-2">
                    {subcategory.brands.map((brand) => (
                      <Link
                        key={brand.name}
                        href={`/nos-produits?brand=${encodeURIComponent(brand.name)}`}
                        className={cn(
                          "w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors flex items-center justify-between",
                          hoveredBrand === brand.name ? "bg-blue-50 text-blue-600" : "text-gray-700"
                        )}
                        onMouseEnter={() => handleMouseEnter(brand.name, 'brand')}
                        onClick={onClose}
                      >
                        <span>{brand.name}</span>
                        <span className="text-xs text-gray-500">({brand.products.length})</span>
                      </Link>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Colonne des produits */}
        {hoveredBrand && (
          <div className="w-80 border-l border-gray-200 rounded-r-lg">
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
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Produits {hoveredBrand}
                    </h4>
                  </div>
                  <div className="py-2 max-h-96 overflow-y-auto">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/produit/${product.urlSlug || product.id}`}
                        className="block px-4 py-3 hover:bg-blue-50 transition-colors group"
                        onClick={onClose}
                      >
                        <div className="flex items-start space-x-3">
                          {product.images && product.images.length > 0 && (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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
                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                              {product.name}
                            </p>
                            {product.price && (
                              <p className="text-sm font-semibold text-blue-600 mt-1">
                                {product.price}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    }, 300);
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

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Réparation', href: '/reparation' },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header principal */}
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/LOGO-MONSTER-PHONE.png" 
              alt="Monster Phone Logo" 
              width={150} 
              height={75}
              className="h-12 w-auto"
            />
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Menu déroulant Nos produits */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('smartphones')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                onClick={() => handleDropdownToggle('smartphones')}
              >
                Nos produits
                <ChevronDown className={cn(
                  "ml-1 w-4 h-4 transition-transform",
                  dropdownOpen === 'smartphones' ? 'rotate-180' : ''
                )} />
              </button>
              
              <DropdownMenu
                trigger="Nos produits"
                categories={menuStructure.smartphones}
                isOpen={dropdownOpen === 'smartphones'}
                onClose={closeDropdown}
              />
            </div>
            
            {/* Menu déroulant Accessoires */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('accessoires')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                onClick={() => handleDropdownToggle('accessoires')}
              >
                Accessoires
                <ChevronDown className={cn(
                  "ml-1 w-4 h-4 transition-transform",
                  dropdownOpen === 'accessoires' ? 'rotate-180' : ''
                )} />
              </button>
              
              <DropdownMenu
                trigger="Accessoires"
                categories={menuStructure.accessoires}
                isOpen={dropdownOpen === 'accessoires'}
                onClose={closeDropdown}
              />
            </div>
          </nav>
          
          {/* Overlay pour fermer les menus */}
          {dropdownOpen && (
            <div 
              className="fixed inset-0 z-40" 
              onClick={closeDropdown}
            />
          )}

          {/* Recherche et actions */}
          <div className="flex items-center space-x-4">
            {/* Barre de recherche desktop */}
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Recherche mobile */}
              <button className="md:hidden p-2 text-gray-700 hover:text-blue-600">
                <Search className="h-5 w-5" />
              </button>
              
              {/* Panier */}
              <button className="relative p-2 text-gray-700 hover:text-blue-600">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Compte */}
              <button className="p-2 text-gray-700 hover:text-blue-600">
                <User className="h-5 w-5" />
              </button>

              {/* Menu mobile */}
              <button
                className="md:hidden p-2 text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Liens directs pour mobile */}
              <Link
                href="/nos-produits"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos produits
              </Link>
              <Link
                href="/accessoires"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Accessoires
              </Link>
            </div>
            
            {/* Recherche mobile */}
            <div className="px-3 pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>

    </header>
  );
}