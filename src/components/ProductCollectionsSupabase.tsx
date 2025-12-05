'use client';

import { useState } from 'react';
import { ChevronRight, Smartphone, Watch, Headphones, Lightbulb, Cable, ShoppingCart, Eye } from 'lucide-react';
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
    title: 'Smartphones Gaming',
    shortTitle: 'Smartphones',
    icon: Smartphone,
    categorySlug: 'smartphones',
    href: '/nos-produits?category=Smartphones',
    description: 'Pack complet inclus : écouteurs, chargeur, protection, coque',
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
    title: 'Accessoires Gaming',
    shortTitle: 'Accessoires',
    icon: Cable,
    categorySlug: 'divers',
    href: '/accessoires',
  },
];

// Carte produit personnalisée pour l'affichage en éventail
const FeaturedProductCard = ({
  product,
  position,
  isCenter
}: {
  product: Product;
  position: 'left' | 'center' | 'right';
  isCenter: boolean;
}) => {
  const rotation = position === 'left' ? -6 : position === 'right' ? 6 : 0;
  const scale = isCenter ? 1.05 : 0.95;
  const zIndex = isCenter ? 20 : 10;
  const translateY = isCenter ? -10 : 0;

  const getImageUrl = (product: Product) => {
    // Chercher une image dans les variants ou utiliser un placeholder
    const defaultVariant = product.variants?.find(v => v.is_default) || product.variants?.[0];
    const img = defaultVariant?.images?.[0];

    if (img) {
      if (img.startsWith('http')) return img;
      // Cloudinary
      return `https://res.cloudinary.com/monster-phone/image/upload/w_300,h_300,c_pad,b_white/${img}`;
    }
    return '/placeholder-product.svg';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotation }}
      animate={{ opacity: 1, y: translateY, rotate: rotation, scale }}
      transition={{ duration: 0.5, delay: position === 'center' ? 0.1 : 0.2 }}
      className="relative"
      style={{ zIndex }}
    >
      <div className={cn(
        "bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl",
        isCenter ? "w-[280px]" : "w-[240px]"
      )}>
        {/* Badge note */}
        <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          ⭐ {product.rating?.average?.toFixed(1) || '4.5'}
        </div>

        {/* Badge garantie */}
        <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded-full border border-gray-200">
          2 ans Garantie
        </div>

        {/* Image */}
        <div className="relative h-[180px] bg-gradient-to-b from-gray-50 to-white p-4 flex items-center justify-center">
          <Image
            src={getImageUrl(product)}
            alt={product.name}
            width={150}
            height={150}
            className="object-contain max-h-[150px] w-auto"
          />
        </div>

        {/* Contenu */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 h-10">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500">{product.brandName}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{product.categoryName}</span>
          </div>

          {/* Note avec étoiles */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={cn(
                "text-sm",
                i < Math.floor(product.rating?.average || 0) ? "text-yellow-400" : "text-gray-300"
              )}>★</span>
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating?.count || 0} avis)</span>
          </div>

          {/* Prix */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-orange-600">{(product.basePrice || 0).toFixed(2)} €</span>
            {product.originalPrice && product.originalPrice > (product.basePrice || 0) && (
              <span className="text-sm text-gray-400 line-through">{product.originalPrice.toFixed(2)} €</span>
            )}
          </div>

          {/* Variants disponibles */}
          {product.variants && product.variants.length > 0 && (
            <p className="text-xs text-gray-500 mb-3">{product.variants.length} variantes disponibles</p>
          )}

          {/* Boutons */}
          <div className="flex flex-col gap-2">
            <Link
              href={`/produit/${product.urlSlug}`}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Voir le produit
            </Link>
            <Link
              href={`/produit/${product.urlSlug}`}
              className="w-full py-2 px-4 bg-blue-600 rounded-lg text-center text-sm font-medium text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Acheter maintenant
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Composant pour une collection - Affiche 3 produits en éventail
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

  // Trier par note moyenne et prendre les 3 meilleurs
  const sortedProducts = [...products]
    .sort((a, b) => {
      const ratingA = a.rating?.average || 0;
      const ratingB = b.rating?.average || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      const reviewsA = a.rating?.count || 0;
      const reviewsB = b.rating?.count || 0;
      return reviewsB - reviewsA;
    })
    .slice(0, 3);

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
        <div className="flex justify-center items-end gap-4 py-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "bg-gray-200 rounded-2xl animate-pulse",
                i === 1 ? "w-[280px] h-[420px]" : "w-[240px] h-[380px]"
              )}
              style={{ transform: i === 0 ? 'rotate(-6deg)' : i === 2 ? 'rotate(6deg)' : 'none' }}
            />
          ))}
        </div>
      ) : (
        <>
          {/* 3 Produits en éventail */}
          <div className="flex justify-center items-end gap-[-20px] py-8 px-4 overflow-hidden">
            {sortedProducts.length >= 3 ? (
              <div className="flex items-end justify-center" style={{ gap: '-10px' }}>
                {/* Produit gauche */}
                <div className="-mr-6">
                  <FeaturedProductCard
                    product={sortedProducts[0]}
                    position="left"
                    isCenter={false}
                  />
                </div>
                {/* Produit central */}
                <div className="z-20">
                  <FeaturedProductCard
                    product={sortedProducts[1]}
                    position="center"
                    isCenter={true}
                  />
                </div>
                {/* Produit droit */}
                <div className="-ml-6">
                  <FeaturedProductCard
                    product={sortedProducts[2]}
                    position="right"
                    isCenter={false}
                  />
                </div>
              </div>
            ) : sortedProducts.length > 0 ? (
              // Si moins de 3 produits, afficher ce qu'on a centré
              <div className="flex justify-center gap-4">
                {sortedProducts.map((product) => (
                  <FeaturedProductCard
                    key={product.id}
                    product={product}
                    position="center"
                    isCenter={true}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full py-12 text-center text-gray-500">
                <p>Aucun produit dans cette collection pour le moment</p>
              </div>
            )}
          </div>

          {/* Lien voir plus */}
          <div className="text-center mt-4">
            <Link
              href={config.href}
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Voir tous les {config.shortTitle.toLowerCase()}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </>
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

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProductCollectionsSupabase;
