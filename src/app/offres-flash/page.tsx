'use client';

import { useState, useEffect } from 'react';
import { Zap, Clock, Tag, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useDiscountedProducts } from '@/hooks/useSupabaseData';
import { cn } from '@/lib/utils';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function OffresFlashPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 23, minutes: 59, seconds: 59 });
  const [isUrgent, setIsUrgent] = useState(false);

  // Recuperer TOUS les produits avec une promotion (meme petite)
  const { products, loading } = useDiscountedProducts(1);

  // Compte a rebours
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
          return { hours: 23, minutes: 59, seconds: 59 };
        }
        if (newTime.hours < 2) setIsUrgent(true);
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-[110px]">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Zap className="w-10 h-10 text-yellow-400" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold">Nos Offres Flash</h1>
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Zap className="w-10 h-10 text-yellow-400" />
                </motion.div>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Des promotions exclusives sur nos smartphones et accessoires, disponibles pour une durée limitée.
              </p>

              {/* Compte a rebours */}
              {products.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "inline-flex items-center gap-2 backdrop-blur-sm border-2 rounded-lg px-6 py-4",
                    isUrgent
                      ? "bg-red-600/20 border-red-500"
                      : "bg-orange-600/20 border-orange-500"
                  )}
                >
                  <Clock className={cn("w-5 h-5", isUrgent ? "text-red-400" : "text-orange-400")} />
                  <span className="text-sm font-medium">Offres se terminent dans :</span>
                  <div className="flex items-center gap-1 font-mono text-2xl font-bold">
                    <span className="bg-black/50 px-3 py-1 rounded">{formatTime(timeLeft.hours)}</span>
                    <span className="text-orange-400">:</span>
                    <span className="bg-black/50 px-3 py-1 rounded">{formatTime(timeLeft.minutes)}</span>
                    <span className="text-orange-400">:</span>
                    <span className="bg-black/50 px-3 py-1 rounded">{formatTime(timeLeft.seconds)}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Contenu */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            // Skeleton loading
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-80 animate-pulse shadow-sm" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-red-500" />
                  <span className="text-lg font-semibold text-gray-900">
                    {products.length} offre{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    {product.discountPercent && product.discountPercent > 0 && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-3 -right-3 z-20 bg-red-600 text-white rounded-full w-14 h-14 flex flex-col items-center justify-center font-bold shadow-lg"
                      >
                        <span className="text-xs">-</span>
                        <span className="text-lg">{product.discountPercent}%</span>
                      </motion.div>
                    )}
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            // Etat vide - aucune promotion en cours
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Aucune offre flash en ce moment
              </h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Nos offres flash sont disponibles pour une durée limitée. Revenez bientôt pour découvrir nos prochaines promotions exclusives !
              </p>
              <Link
                href="/nos-produits"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Découvrir nos produits
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
