'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ArrowRight, Phone, Clock, Shield, Truck, Flame, Zap, Wrench, Smartphone, Watch, Headphones, Lightbulb, Package, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { menuStructure, type CategoryStructure, type Product } from '@/data/products';

// Composant pour la barre d'urgence promotionnelle
const PromoBar = () => (
  <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-3 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <div className="flex items-center justify-center gap-6 text-base font-semibold flex-wrap">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5" />
          <span>LIVRAISON EXPRESS 24H/48H À LA RÉUNION</span>
        </div>
        <span className="hidden sm:block">•</span>
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5" />
          <span>LIVRAISON GRATUITE DÈS 50€</span>
        </div>
        <span className="hidden sm:block">•</span>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <span>GARANTIE 2 ANS</span>
        </div>
      </div>
    </div>
  </div>
);

// Composant DropdownMenu simplifié et stable
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

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 mt-2 bg-white shadow-xl border border-gray-200 rounded-lg z-[70] min-w-[600px] overflow-hidden"
      style={{ boxShadow: "0 20px 40px -8px rgba(0, 0, 0, 0.15)" }}
    >
      <div className="flex min-h-[350px]">
        {/* Colonne des catégories - maintenant première colonne */}
        <div className="w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-lg">Nos articles</h3>
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
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
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
                      <ArrowRight className="w-4 h-4 text-gray-700" />
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
                    <h4 className="font-semibold text-gray-900 text-base">{category.name}</h4>
                  </div>
                  <div className="py-2">
                    {category.brands.map((brand) => (
                      <div key={brand.name}>
                        <Link
                          href={`/nos-produits?brand=${encodeURIComponent(brand.name)}`}
                          className={cn(
                            "block px-4 py-3 text-base font-medium transition-colors",
                            hoveredBrand === brand.name 
                              ? "bg-green-50 text-green-700" 
                              : "text-gray-700 hover:text-green-600 hover:bg-gray-100"
                          )}
                          onMouseEnter={() => setHoveredBrand(brand.name)}
                          onClick={onClose}
                        >
                          <div>
                            <span className="font-medium">{brand.name}</span>
                            <span className="text-xs text-gray-700 block">({brand.products.length} produits)</span>
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
                    <h4 className="font-semibold text-gray-900 text-base">Collection {hoveredBrand}</h4>
                    <p className="text-sm text-gray-800 mt-1">{products.length} produits disponibles</p>
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
                              <p className="text-base font-medium text-gray-900 line-clamp-1">
                                {product.name}
                              </p>
                              {product.price && (
                                <p className="text-base font-semibold text-blue-600 mt-1">
                                  {product.price}
                                </p>
                              )}
                              <p className="text-xs text-gray-700 mt-1 line-clamp-2">
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
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
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

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="sticky top-0 z-50">
      {/* Barre promotionnelle */}
      <PromoBar />
      
      <header 
        className={cn(
          "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300",
          isScrolled ? "shadow-lg bg-white/98" : ""
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header principal */}
          <div className="flex justify-between items-center h-24">
            {/* Logo avec lien d'accueil */}
            <div className="flex-shrink-0 mr-8">
              <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
                <Image 
                  src="/LOGO-MONSTER-PHONE.png" 
                  alt="Monster Phone - Spécialiste Gaming Mobile La Réunion" 
                  width={200} 
                  height={100}
                  className="h-16 w-auto"
                />
              </Link>
            </div>

            {/* Navigation desktop */}
            <nav className="hidden xl:flex items-center space-x-0.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-blue-50"
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
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-3 text-lg font-bold transition-colors rounded-lg hover:bg-blue-50"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Smartphones</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                
                <DropdownMenu
                  trigger="Smartphones"
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
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-3 text-lg font-bold transition-colors rounded-lg hover:bg-blue-50"
                >
                  <Watch className="w-5 h-5" />
                  <span>Montres</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                
                <DropdownMenu
                  trigger="Montres"
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
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-3 text-lg font-bold transition-colors rounded-lg hover:bg-blue-50"
                >
                  <Headphones className="w-5 h-5" />
                  <span>Audio</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                
                <DropdownMenu
                  trigger="Audio"
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
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-3 text-lg font-bold transition-colors rounded-lg hover:bg-blue-50"
                >
                  <Lightbulb className="w-5 h-5" />
                  <span>Luminaire</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                
                <DropdownMenu
                  trigger="Luminaire"
                  categories={menuStructure.luminaire}
                  isOpen={dropdownOpen === 'luminaire'}
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
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-3 text-lg font-bold transition-colors rounded-lg hover:bg-blue-50"
                >
                  <Package className="w-5 h-5" />
                  <span>Accessoires</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                
                <DropdownMenu
                  trigger="Accessoires"
                  categories={menuStructure.accessoiresMonster}
                  isOpen={dropdownOpen === 'accessoires'}
                  onClose={closeDropdown}
                />
              </div>
              
              {/* Menu déroulant MUVIT */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('muvit')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-3 text-lg font-bold transition-colors rounded-lg hover:bg-blue-50"
                >
                  <Star className="w-5 h-5" />
                  <span>MUVIT</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                
                <DropdownMenu
                  trigger="MUVIT"
                  categories={menuStructure.muvit}
                  isOpen={dropdownOpen === 'muvit'}
                  onClose={closeDropdown}
                />
              </div>
            </nav>
            
            {/* Navigation tablette (version simplifiée) */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-1">
              <Link
                href="/nos-produits?category=Smartphones"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-bold transition-colors rounded-lg hover:bg-blue-50"
              >
                <Smartphone className="w-5 h-5" />
                <span>Smartphones</span>
              </Link>
              <Link
                href="/nos-produits?category=Montres+Connectées"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-bold transition-colors rounded-lg hover:bg-blue-50"
              >
                <Watch className="w-5 h-5" />
                <span>Montres</span>
              </Link>
              <Link
                href="/nos-produits"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-bold transition-colors rounded-lg hover:bg-blue-50"
              >
                <Package className="w-5 h-5" />
                <span>Accessoires</span>
              </Link>
            </nav>

            {/* Section droite */}
            <div className="flex items-center space-x-3">
              {/* Barre de recherche desktop */}
              <div className="hidden lg:flex relative">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-72 px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-700 hover:text-blue-600 transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {/* Recherche mobile */}
                <button className="lg:hidden p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Search className="h-6 w-6" />
                </button>
                
                {/* Panier */}
                <button className="relative p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
                    0
                  </span>
                </button>

                {/* Compte */}
                <button className="p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <User className="h-6 w-6" />
                </button>

                {/* CTA */}
                <div className="hidden md:block ml-4">
                  <Link href="/nos-produits">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium text-base shadow-md hover:shadow-lg transition-shadow">
                      <span className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Découvrir
                      </span>
                    </button>
                  </Link>
                </div>

                {/* Menu mobile */}
                <button
                  className="lg:hidden p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
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
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                <Link
                  href="/nos-produits?category=Montres+Connectées"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Montres Connectées</span>
                </Link>
                
                <Link
                  href="/nos-produits?category=Luminaire+Monster"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Luminaire Monster</span>
                </Link>
                
                <Link
                  href="/nos-produits?category=Casques+et+Audio"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Casques et Audio</span>
                </Link>
                
                <Link
                  href="/nos-produits?category=Accessoires+Monster"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Accessoires Monster</span>
                </Link>
                
                <Link
                  href="/nos-produits?brand=MUVIT"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
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