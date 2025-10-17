'use client';

import { useRef, useState, useEffect } from 'react';
import { TrendingUp, Star, Award, Crown } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { cn } from '@/lib/utils';
import { useBestSellers } from '@/hooks/useSupabaseData';

const BestSellers = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Récupérer les meilleures ventes depuis Supabase (déjà converties par le hook)
  const { products: bestSellers, loading } = useBestSellers(8);

  // Fonction pour obtenir le badge de position
  const getPositionBadge = (index: number) => {
    switch(index) {
      case 0:
        return { icon: Crown, color: 'bg-yellow-500', text: '#1 Best-seller' };
      case 1:
        return { icon: Award, color: 'bg-gray-400', text: '#2 Top vente' };
      case 2:
        return { icon: Award, color: 'bg-orange-600', text: '#3 Populaire' };
      default:
        return null;
    }
  };

  // Afficher un skeleton pendant le chargement
  if (loading) {
    return (
      <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Effet de fond animé */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête animé */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Meilleures Ventes
            </h2>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8 text-yellow-500" />
            </motion.div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Les produits préférés de nos clients, sélectionnés selon les avis et les ventes
          </p>
          
          {/* Indicateurs animés */}
          <div className="flex justify-center gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600">En stock</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Livraison 24h</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-gray-600">Garantie 2 ans</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Grille de produits avec animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => {
            const positionBadge = getPositionBadge(index);
            const Icon = positionBadge?.icon;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative"
              >
                {/* Badge de position pour le top 3 */}
                {positionBadge && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    className={`absolute -top-3 -left-3 z-20 ${positionBadge.color} text-white rounded-full p-3 shadow-lg`}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </motion.div>
                )}

                {/* Label de position textuel */}
                {positionBadge && (
                  <div className="absolute top-2 right-2 z-10 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {positionBadge.text}
                  </div>
                )}

                {/* Effet de brillance au survol */}
                <motion.div
                  className="relative overflow-hidden rounded-lg"
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                    boxShadow: hoveredIndex === index 
                      ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      animate={{ x: [-300, 300] }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  
                  <ProductCard product={product} />
                  
                  {/* Indicateur de popularité */}
                  {product.rating && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium">{product.rating.average.toFixed(1)}</span>
                      <span className="text-xs text-gray-500">({product.rating.count})</span>
                    </motion.div>
                  )}
                </motion.div>

                {/* Barre de popularité animée */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
                  className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden origin-left"
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: (8 - index) / 8 } : {}}
                    transition={{ delay: index * 0.1 + 0.8, duration: 0.6 }}
                    className={cn(
                      "h-full rounded-full origin-left",
                      index < 3 ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-gray-400"
                    )}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <Link
            href="/nos-produits?sort=bestsellers"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            <TrendingUp className="w-5 h-5" />
            Voir tous les best-sellers
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;