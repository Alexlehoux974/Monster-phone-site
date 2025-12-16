'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useSupabaseMenu } from '@/hooks/useSupabaseData';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';
import { MENU_STRUCTURE, type MenuCategory } from '@/lib/supabase/menu-structure';
import type { Product } from '@/data/products';
import ImageWithFallback from '@/components/ImageWithFallback';

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
          // Si une sous-catégorie est sélectionnée, récupérer ses produits directement
          // Sinon, récupérer les produits de la catégorie principale
          const targetSlug = subcategory || category;
          const categoryProducts = await getProductsForCategory(targetSlug);
          fetchedProducts = categoryProducts;
        }

        // Convertir vers format legacy
        const legacyProducts = fetchedProducts.map(supabaseProductToLegacy);
        setProducts(legacyProducts);
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

  // Récupérer la structure du menu depuis la configuration fixe
  const category = useMemo(() => {
    return MENU_STRUCTURE.find(cat => cat.slug === categorySlug);
  }, [categorySlug]);

  // Pour les catégories sans sous-catégories, récupérer directement les produits
  const hasSubcategories = category?.subcategories && category.subcategories.length > 0;

  // Récupérer les produits en fonction de la sélection
  const { products, loading } = useMenuProducts(
    category?.slug,
    hoveredSubcategory || undefined,
    undefined // Plus de gestion des marques
  );

  // Réinitialiser les états quand le menu se ferme
  useEffect(() => {
    if (!isOpen) {
      setHoveredSubcategory(null);
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
        {/* Colonne 1: Sous-catégories OU Titre seul pour catégories sans sous-catégories */}
        {hasSubcategories ? (
          <div className="min-w-[200px] bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 max-h-[600px] flex flex-col">
            <Link
              href={`/${category.slug}`}
              onClick={onClose}
              className="p-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0 hover:from-blue-100 hover:to-indigo-100 transition-colors cursor-pointer block"
            >
              <h3 className="font-bold text-gray-900 text-lg">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">Voir toute la collection</p>
            </Link>
            <div className="flex-1 overflow-y-auto" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#9ca3af #f3f4f6'
            }}>
              <div className="py-2 px-2">
                {category.subcategories!.map((subcat: any) => (
                  <Link
                    key={subcat.slug}
                    href={`/${category.slug}/${subcat.slug}`}
                    onClick={onClose}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 block",
                      hoveredSubcategory === subcat.slug
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    )}
                    onMouseEnter={() => setHoveredSubcategory(subcat.slug)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-base">{subcat.name}</span>
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-transform",
                        hoveredSubcategory === subcat.slug ? "translate-x-1" : ""
                      )} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Colonne 2: Produits (pour catégories sans sous-catégories ou avec sous-catégorie sélectionnée) */}
        {(!hasSubcategories || hoveredSubcategory) && (
          <div className="min-w-[300px] bg-white max-h-[600px] flex flex-col">
            <Link
              href={hoveredSubcategory ? `/${category.slug}/${hoveredSubcategory}` : `/${category.slug}`}
              onClick={onClose}
              className="p-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 flex-shrink-0 hover:from-purple-100 hover:to-pink-100 transition-colors cursor-pointer block"
            >
              <h4 className="font-bold text-gray-900 text-base">
                {!hasSubcategories && category.name}
                {hasSubcategories && hoveredSubcategory && (
                  category.subcategories?.find(sub => sub.slug === hoveredSubcategory)?.name
                )}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {loading ? 'Chargement...' : `${products.length} produit${products.length > 1 ? 's' : ''} - Voir tout`}
              </p>
            </Link>
            <div className="flex-1 overflow-y-auto p-4" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#9ca3af #f3f4f6'
            }}>
              {loading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid gap-2">
                  {products.map((product: any) => {
                    // Récupérer l'image du produit depuis variants ou directement
                    const productImage = product.variants?.[0]?.images?.[0] || '';

                    return (
                    <Link
                      key={product.id}
                      href={`/produit/${product.urlSlug || product.id}`}
                      className="block px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent transition-all duration-200"
                      onClick={onClose}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded overflow-hidden flex-shrink-0 shadow-sm relative">
                          <ImageWithFallback
                            src={productImage}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain"
                            productCategory={product.categoryName}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900 whitespace-normal">
                            {product.name}
                          </p>
                          {product.basePrice && (
                            <p className="text-base font-bold text-red-600 mt-1 whitespace-nowrap">
                              {typeof product.basePrice === 'number'
                                ? `${product.basePrice.toFixed(2)} €`
                                : product.basePrice}
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
                    );
                  })}
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