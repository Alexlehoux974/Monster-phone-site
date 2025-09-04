'use client';

import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useSupabaseMenu } from '@/hooks/useSupabaseData';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';
import { MENU_STRUCTURE, type MenuCategory } from '@/lib/supabase/menu-structure';
import type { Product } from '@/data/products';

// Hook pour obtenir les produits d'une catégorie/sous-catégorie
export const useMenuProducts = (
  category?: string,
  subcategory?: string,
  brand?: string
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { getProductsForCategory, getProductsForBrand } = useSupabaseMenu();

  useEffect(() => {
    async function fetchProducts() {
      if (!category) {
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        let fetchedProducts = [];
        
        if (brand) {
          // Récupérer les produits par marque
          const brandProducts = await getProductsForBrand(brand.toLowerCase().replace(/\s+/g, '-'));
          fetchedProducts = brandProducts;
        } else {
          // Récupérer les produits par catégorie
          const categoryProducts = await getProductsForCategory(category);
          fetchedProducts = categoryProducts;
        }

        // Convertir vers format legacy et filtrer si nécessaire
        const legacyProducts = fetchedProducts.map(supabaseProductToLegacy);
        
        if (subcategory) {
          setProducts(legacyProducts.filter(p => p.subcategory === subcategory));
        } else {
          setProducts(legacyProducts);
        }
      } catch (error) {
        console.error('Erreur récupération produits menu:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, subcategory, brand, getProductsForCategory, getProductsForBrand]);

  return { products, loading };
};

// Composant DropdownMenu amélioré avec Supabase
export const SupabaseDropdownMenu = ({ 
  categorySlug,
  isOpen, 
  onClose,
  alignRight = false
}: { 
  categorySlug: string;
  isOpen: boolean;
  onClose: () => void;
  alignRight?: boolean;
}) => {
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  
  // Récupérer la structure du menu depuis la configuration fixe
  const category = useMemo(() => {
    return MENU_STRUCTURE.find(cat => cat.slug === categorySlug);
  }, [categorySlug]);

  // Récupérer les produits en fonction de la sélection
  const { products, loading } = useMenuProducts(
    category?.slug,
    hoveredSubcategory || undefined,
    hoveredBrand || undefined
  );

  // Réinitialiser les états quand le menu se ferme
  useEffect(() => {
    if (!isOpen) {
      setHoveredSubcategory(null);
      setHoveredBrand(null);
    }
  }, [isOpen]);

  if (!isOpen || !category) return null;
  
  return (
    <div 
      className={cn(
        "absolute top-full mt-1 bg-white shadow-2xl border border-gray-200 rounded-xl z-[150]",
        alignRight ? "right-0" : "left-0"
      )}
      style={{ 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        overflow: 'hidden'
      }}
    >
      <div className="flex min-h-[450px] w-fit max-w-[calc(100vw-4rem)]">
        {/* Colonne 1: Sous-catégories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="min-w-[200px] bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 max-h-[600px] flex flex-col">
            <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
              <h3 className="font-bold text-gray-900 text-lg">{category.name}</h3>
            </div>
            <div className="flex-1 overflow-y-auto" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#9ca3af #f3f4f6'
            }}>
              <div className="py-2 px-2">
                {category.subcategories.map((subcat) => (
                  <button
                    key={subcat.slug}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200",
                      hoveredSubcategory === subcat.slug 
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-600" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    )}
                    onMouseEnter={() => {
                      setHoveredSubcategory(subcat.slug);
                      setHoveredBrand(null);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-base">{subcat.name}</span>
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-transform",
                        hoveredSubcategory === subcat.slug ? "translate-x-1" : ""
                      )} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Colonne 2: Marques */}
        {hoveredSubcategory && (
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
                  const selectedSubcat = category.subcategories?.find(sub => sub.slug === hoveredSubcategory);
                  const brands = selectedSubcat?.brands || [];
                  
                  return brands.map((brand) => (
                    <button
                      key={brand}
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
                  ));
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Colonne 3: Produits populaires */}
        {(hoveredSubcategory || hoveredBrand) && (
          <div className="min-w-[300px] bg-white max-h-[600px] flex flex-col">
            <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 flex-shrink-0">
              <h4 className="font-bold text-gray-900 text-base">
                {loading ? 'Chargement...' : `Produits populaires (${products.length})`}
              </h4>
            </div>
            <div className="flex-1 overflow-y-auto p-4" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#9ca3af #f3f4f6'
            }}>
              {loading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid gap-3">
                  {products.slice(0, 5).map((product) => (
                    <a
                      key={product.id}
                      href={`/produit/${product.urlSlug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={onClose}
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {product.price}€
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Aucun produit disponible
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Export de la structure de menu pour utilisation dans le Header principal
export { MENU_STRUCTURE };