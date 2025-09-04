'use client';

import { useState, useEffect } from 'react';
import { Clock, Zap, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { cn } from '@/lib/utils';
import { useDiscountedProducts } from '@/hooks/useSupabaseData';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const FlashDeals = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 23, minutes: 59, seconds: 59 });
  const [isUrgent, setIsUrgent] = useState(false);

  // Récupérer les produits en promotion depuis Supabase (minimum 15% de réduction)
  const { products: supabaseProducts, loading } = useDiscountedProducts(15);
  
  // Convertir et limiter à 6 produits
  const flashProducts = supabaseProducts
    .slice(0, 6)
    .map(supabaseProductToLegacy);

  // Compte à rebours
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = { ...prev };
        
        if (newTime.seconds > 0) {
          newTime.seconds--;
        } else if (newTime.minutes > 0) {
          newTime.minutes--;
          newTime.seconds = 59;
        } else if (newTime.hours > 0) {
          newTime.hours--;
          newTime.minutes = 59;
          newTime.seconds = 59;
        } else {
          // Reset à 24h
          return { hours: 23, minutes: 59, seconds: 59 };
        }

        // Activer l'urgence dans les 2 dernières heures
        if (newTime.hours < 2) {
          setIsUrgent(true);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  // Afficher un skeleton pendant le chargement
  if (loading) {
    return (
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="h-10 bg-gray-700 rounded-lg w-48 animate-pulse" />
            <div className="h-16 bg-gray-700 rounded-lg w-64 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-700 rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Effets de fond animés */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête avec compte à rebours */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Zap className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Offres Flash
              </h2>
              <p className="text-gray-300 text-sm">Jusqu&apos;à -70% de réduction !</p>
            </div>
          </motion.div>

          {/* Compte à rebours */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border-2 rounded-lg px-4 py-3",
              isUrgent ? "border-red-500 animate-pulse" : "border-orange-500"
            )}
          >
            <Clock className={cn("w-5 h-5", isUrgent ? "text-red-400" : "text-orange-400")} />
            <span className="text-sm font-medium">Se termine dans :</span>
            <div className="flex items-center gap-1 font-mono text-xl font-bold">
              <motion.span
                key={`hours-${timeLeft.hours}`}
                initial={{ scale: 1.2, color: '#ff6b6b' }}
                animate={{ scale: 1, color: '#ffffff' }}
                className="bg-black/50 px-2 py-1 rounded"
              >
                {formatTime(timeLeft.hours)}
              </motion.span>
              <span className="text-orange-400">:</span>
              <motion.span
                key={`minutes-${timeLeft.minutes}`}
                initial={{ scale: 1.2, color: '#ff6b6b' }}
                animate={{ scale: 1, color: '#ffffff' }}
                className="bg-black/50 px-2 py-1 rounded"
              >
                {formatTime(timeLeft.minutes)}
              </motion.span>
              <span className="text-orange-400">:</span>
              <motion.span
                key={`seconds-${timeLeft.seconds}`}
                initial={{ scale: 1.2, color: '#ff6b6b' }}
                animate={{ scale: 1, color: '#ffffff' }}
                className="bg-black/50 px-2 py-1 rounded"
              >
                {formatTime(timeLeft.seconds)}
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Message d'urgence */}
        {isUrgent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-600/20 border border-red-500 rounded-lg p-3 mb-6 text-center"
          >
            <p className="text-red-300 font-medium flex items-center justify-center gap-2">
              <TrendingDown className="w-4 h-4" />
              ⚡ Dernières heures ! Les stocks s&apos;épuisent rapidement
            </p>
          </motion.div>
        )}

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Badge de réduction animé */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-3 -right-3 z-20 bg-red-600 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center font-bold shadow-lg"
              >
                <span className="text-xs">-</span>
                <span className="text-xl">{product.discount}%</span>
              </motion.div>

              {/* Indicateur de stock */}
              <div className="absolute top-2 left-2 z-10 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                <span className="text-orange-400">🔥</span> Plus que {Math.floor(Math.random() * 5) + 1} en stock
              </div>

              {/* Carte produit avec effet de survol */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-lg overflow-hidden"
              >
                <ProductCard product={product} />
              </motion.div>

              {/* Barre de progression des stocks */}
              <div className="mt-2 bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.random() * 30 + 10}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={cn(
                    "h-full rounded-full",
                    isUrgent ? "bg-red-500" : "bg-orange-500"
                  )}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Stock limité</p>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/nos-produits?promo=true"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            <Zap className="w-5 h-5" />
            Voir toutes les offres flash
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

export default FlashDeals;