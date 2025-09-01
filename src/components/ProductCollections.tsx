'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame, Gamepad2, Headphones, Watch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { allProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { cn } from '@/lib/utils';

interface Collection {
  id: string;
  title: string;
  icon: any;
  emoji: string;
  products: typeof allProducts;
  description?: string;
}

const ProductCollections = () => {
  const [activeCollection, setActiveCollection] = useState<string>('gaming');
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Filtrer les produits par collection
  const collections: Collection[] = [
    {
      id: 'gaming',
      title: 'Smartphones Gaming Pack Complet',
      icon: Flame,
      emoji: '🔥',
      description: 'Pack complet inclus : écouteurs, chargeur, protection, coque',
      products: allProducts.filter(p => p.category === 'Smartphones').slice(0, 10),
    },
    {
      id: 'accessories',
      title: 'Accessoires Gaming Essentiels',
      icon: Gamepad2,
      emoji: '🎮',
      products: allProducts.filter(p => 
        p.category === 'LED' || 
        p.category === 'Accessoires' || 
        p.category === 'Supports gaming'
      ).slice(0, 10),
    },
    {
      id: 'audio',
      title: 'Audio Premium',
      icon: Headphones,
      emoji: '🎧',
      products: allProducts.filter(p => 
        p.category === 'Audio' || 
        p.category === 'Écouteurs' || 
        p.category === 'Casques' || 
        p.category === 'Enceintes'
      ).slice(0, 10),
    },
    {
      id: 'watches',
      title: 'Montres Connectées',
      icon: Watch,
      emoji: '⌚',
      products: allProducts.filter(p => 
        p.category === 'Montres' || 
        p.category === 'Montres connectées'
      ).slice(0, 10),
    },
  ];

  const scrollCollection = (collectionId: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[collectionId];
    if (container) {
      const scrollAmount = container.offsetWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getProductLabel = (product: typeof allProducts[0]) => {
    if (product.badges?.includes('Nouveau')) return { text: 'Nouveau', color: 'bg-green-500' };
    if (product.discount && product.discount > 0) return { text: `${product.discount}%`, color: 'bg-red-500' };
    if (product.rating && product.rating.average >= 4.5) return { text: 'Bestseller', color: 'bg-orange-500' };
    return null;
  };

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
            Collections Exclusives
          </h2>
          <p className="text-gray-600">Découvrez nos sélections par catégorie</p>
        </motion.div>

        {/* Tabs de navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {collections.map((collection) => {
            const Icon = collection.icon;
            return (
              <motion.button
                key={collection.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCollection(collection.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all",
                  activeCollection === collection.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                )}
              >
                <span className="text-lg">{collection.emoji}</span>
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{collection.title}</span>
                <span className="sm:hidden">{collection.title.split(' ')[0]}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Collections Carousel */}
        <AnimatePresence mode="wait">
          {collections.map((collection) => {
            if (collection.id !== activeCollection) return null;
            
            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Description de la collection */}
                {collection.description && (
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 rounded-r-lg">
                    <p className="text-sm text-orange-900 font-medium flex items-center gap-2">
                      <span className="text-xl">{collection.emoji}</span>
                      {collection.description}
                    </p>
                  </div>
                )}

                {/* Carousel Container */}
                <div className="relative group">
                  {/* Bouton Previous */}
                  <button
                    onClick={() => scrollCollection(collection.id, 'left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Précédent"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>

                  {/* Bouton Next */}
                  <button
                    onClick={() => scrollCollection(collection.id, 'right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Suivant"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>

                  {/* Produits Carousel */}
                  <div
                    ref={(el) => { scrollRefs.current[collection.id] = el; }}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {collection.products.length > 0 ? (
                      collection.products.map((product, index) => {
                        const label = getProductLabel(product);
                        return (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex-none w-[280px]"
                          >
                            <div className="relative">
                              {/* Label dynamique */}
                              {label && (
                                <div className={`absolute top-2 left-2 z-10 ${label.color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                                  {label.text}
                                </div>
                              )}
                              <ProductCard product={product} />
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="w-full py-12 text-center text-gray-500">
                        <p>Aucun produit dans cette collection pour le moment</p>
                      </div>
                    )}
                  </div>

                  {/* Indicateurs de progression */}
                  {collection.products.length > 0 && (
                    <div className="flex justify-center gap-1 mt-4">
                      {Array.from({ length: Math.ceil(collection.products.length / 3) }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-1 rounded-full transition-all",
                            i === 0 ? "w-8 bg-orange-500" : "w-2 bg-gray-300"
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Lien voir plus */}
                <div className="text-center mt-6">
                  <Link
                    href={`/nos-produits?category=${encodeURIComponent(collection.title)}`}
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Voir tous les produits {collection.title}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProductCollections;