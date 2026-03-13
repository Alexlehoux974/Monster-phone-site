'use client';

import { useState } from 'react';
import { ChevronRight, Smartphone, Watch, Headphones, Lightbulb, Cable, ShoppingCart, Eye, Star, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSupabaseProducts } from '@/hooks/useSupabaseData';
import type { Product } from '@/data/products';

interface CollectionConfig {
  id: string;
  title: string;
  shortTitle: string;
  icon: any;
  categorySlug: string;
  href: string;
  description?: string;
}

// Configuration des collections dans l'ordre demandé (slugs en minuscules pour le mapping Supabase)
const collectionsConfig: CollectionConfig[] = [
  {
    id: 'smartphones',
    title: 'Smartphones',
    shortTitle: 'Smartphones',
    icon: Smartphone,
    categorySlug: 'smartphones',
    href: '/nos-produits?category=Smartphones',
    description: 'Pack complet inclus : chargeur et protection vitre',
  },
  {
    id: 'montres',
    title: 'Montres Connectées',
    shortTitle: 'Montres',
    icon: Watch,
    categorySlug: 'connectees',
    href: '/montres',
  },
  {
    id: 'audio',
    title: 'Audio Premium',
    shortTitle: 'Audio',
    icon: Headphones,
    categorySlug: 'audio',
    href: '/audio',
  },
  {
    id: 'led',
    title: 'Éclairage LED',
    shortTitle: 'LED',
    icon: Lightbulb,
    categorySlug: 'led',
    href: '/nos-produits?category=LED',
  },
  {
    id: 'accessoires',
    title: 'Accessoires',
    shortTitle: 'Accessoires',
    icon: Cable,
    categorySlug: 'divers',
    href: '/accessoires',
  },
];

const getImageUrl = (product: Product) => {
  const defaultVariant = product.variants?.find(v => v.is_default) || product.variants?.[0];
  const img = defaultVariant?.images?.[0];
  if (img) {
    if (img.startsWith('http')) return img;
    return `https://res.cloudinary.com/monster-phone/image/upload/w_300,h_300,c_pad,b_white/${img}`;
  }
  return '/placeholder-product.svg';
};

// Carte produit standard (pour les 5 produits secondaires)
const ProductCard = ({
  product,
  index
}: {
  product: Product;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
      className="group"
    >
      <Link href={`/produit/${product.urlSlug}`}>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
          {/* Badge note */}
          <div className="relative">
            <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
              ⭐ {product.rating?.average?.toFixed(1) || '4.5'}
            </div>
            {product.originalPrice && product.originalPrice > (product.basePrice || 0) && (
              <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                -{Math.round(((product.originalPrice - (product.basePrice || 0)) / product.originalPrice) * 100)}%
              </div>
            )}

            {/* Image */}
            <div className="relative h-[140px] sm:h-[160px] bg-gradient-to-b from-gray-50 to-white p-3 flex items-center justify-center">
              <Image
                src={getImageUrl(product)}
                alt={product.name}
                width={120}
                height={120}
                sizes="(max-width: 640px) 120px, 140px"
                className="object-contain max-h-[120px] sm:max-h-[140px] w-auto group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Contenu */}
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1 line-clamp-2 h-8 sm:h-10">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={cn(
                  "text-xs",
                  i < Math.floor(product.rating?.average || 0) ? "text-yellow-400" : "text-gray-300"
                )}>★</span>
              ))}
              <span className="text-[10px] text-gray-400 ml-0.5">({product.rating?.count || 0})</span>
            </div>

            {/* Prix */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-orange-600">{(product.basePrice || 0).toFixed(2)} €</span>
              {product.originalPrice && product.originalPrice > (product.basePrice || 0) && (
                <span className="text-xs text-gray-400 line-through">{product.originalPrice.toFixed(2)} €</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Carte produit mise en avant (#1 meilleur noté)
const FeaturedProductCard = ({
  product
}: {
  product: Product;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-orange-200 relative">
        {/* Badge "Meilleur choix" */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-1.5 px-3 z-10 flex items-center justify-center gap-1.5">
          <Trophy className="w-3.5 h-3.5" />
          <span className="text-xs font-bold tracking-wide">MEILLEUR CHOIX</span>
          <Trophy className="w-3.5 h-3.5" />
        </div>

        <div className="flex flex-col sm:flex-row">
          {/* Image - plus grande */}
          <div className="relative sm:w-1/2 h-[200px] sm:h-auto bg-gradient-to-br from-orange-50 via-white to-gray-50 p-6 flex items-center justify-center mt-8 sm:mt-0 sm:pt-10">
            {/* Badge note */}
            <div className="absolute top-10 sm:top-12 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              ⭐ {product.rating?.average?.toFixed(1) || '4.5'}
            </div>
            {product.originalPrice && product.originalPrice > (product.basePrice || 0) && (
              <div className="absolute top-10 sm:top-12 right-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{Math.round(((product.originalPrice - (product.basePrice || 0)) / product.originalPrice) * 100)}%
              </div>
            )}
            <Image
              src={getImageUrl(product)}
              alt={product.name}
              width={220}
              height={220}
              sizes="(max-width: 640px) 180px, 220px"
              className="object-contain max-h-[180px] sm:max-h-[220px] w-auto group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Contenu */}
          <div className="sm:w-1/2 p-5 sm:p-6 sm:pt-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500 font-medium">{product.brandName}</span>
              {product.categoryName && (
                <>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{product.categoryName}</span>
                </>
              )}
            </div>

            <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 line-clamp-2">
              {product.name}
            </h3>

            {/* Note avec étoiles */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn(
                  "w-4 h-4",
                  i < Math.floor(product.rating?.average || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                )} />
              ))}
              <span className="text-sm text-gray-500 ml-1">({product.rating?.count || 0} avis*)</span>
            </div>

            {/* Prix */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl sm:text-3xl font-bold text-orange-600">{(product.basePrice || 0).toFixed(2)} €</span>
              {product.originalPrice && product.originalPrice > (product.basePrice || 0) && (
                <span className="text-base text-gray-400 line-through">{product.originalPrice.toFixed(2)} €</span>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <p className="text-xs text-gray-500 mb-3">{product.variants.length} variantes disponibles</p>
            )}

            {/* Garantie */}
            <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
              🛡️ Garantie 2 ans incluse
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href={`/produit/${product.urlSlug}`}
                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Détails
              </Link>
              <Link
                href={`/produit/${product.urlSlug}`}
                className="flex-1 py-2.5 px-4 bg-orange-500 rounded-lg text-center text-sm font-medium text-white hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Acheter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Composant pour une collection - Affiche 6 produits (1 mis en avant + 5 en grille)
const CollectionCarousel = ({
  config,
  isActive
}: {
  config: CollectionConfig;
  isActive: boolean;
}) => {
  const { products, loading, error } = useSupabaseProducts({
    category: config.categorySlug,
    limit: 50
  });

  // Trier par note moyenne et prendre les 6 meilleurs
  const sortedProducts = [...products]
    .sort((a, b) => {
      const ratingA = a.rating?.average || 0;
      const ratingB = b.rating?.average || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      const reviewsA = a.rating?.count || 0;
      const reviewsB = b.rating?.count || 0;
      return reviewsB - reviewsA;
    })
    .slice(0, 6);

  const bestProduct = sortedProducts[0];
  const otherProducts = sortedProducts.slice(1);

  // Debug uniquement pour LED en dev
  if (process.env.NODE_ENV === 'development' && config.id === 'led') {
    console.log(`[LED] products: ${products.length}, sorted: ${sortedProducts.length}`, sortedProducts.map(p => p.name?.substring(0, 30)));
  }

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Loading state */}
      {loading ? (
        <div className="space-y-6">
          <div className="bg-gray-200 rounded-2xl animate-pulse h-[200px] sm:h-[250px]" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl animate-pulse h-[240px] sm:h-[280px]" />
            ))}
          </div>
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="space-y-6">
          {/* Produit #1 mis en avant */}
          {bestProduct && (
            <FeaturedProductCard product={bestProduct} />
          )}

          {/* Grille des 5 autres produits */}
          {otherProducts.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {otherProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Description de la collection si disponible */}
          {config.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm text-gray-500 italic"
            >
              {config.description}
            </motion.p>
          )}
        </div>
      ) : (
        <div className="w-full py-12 text-center text-gray-500">
          <p>Aucun produit dans cette collection pour le moment</p>
        </div>
      )}

      {/* Lien voir plus */}
      {sortedProducts.length > 0 && (
        <div className="text-center mt-6">
          <Link
            href={config.href}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2.5 rounded-full transition-colors"
          >
            Voir tous les {config.shortTitle.toLowerCase()}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </motion.div>
  );
};

const ProductCollectionsSupabase = () => {
  const [activeCollection, setActiveCollection] = useState<string>('smartphones');

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Nos Collections
          </h2>
          <p className="text-gray-600">Découvrez nos sélections par catégorie</p>
        </motion.div>

        {/* Tabs de navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {collectionsConfig.map((config) => {
            const Icon = config.icon;
            return (
              <motion.button
                key={config.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCollection(config.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all",
                  activeCollection === config.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{config.title}</span>
                <span className="sm:hidden">{config.shortTitle}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Collections Carousel */}
        <AnimatePresence mode="wait">
          {collectionsConfig
            .filter((config) => activeCollection === config.id)
            .map((config) => (
              <CollectionCarousel
                key={config.id}
                config={config}
                isActive={true}
              />
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductCollectionsSupabase;
