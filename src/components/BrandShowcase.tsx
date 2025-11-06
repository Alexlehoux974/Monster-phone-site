'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

interface Brand {
  name: string;
  displayName: string;
  bgColor: string;
  textColor: string;
  description: string;
  productCount: number;
  gradient?: string;
}

const BrandShowcase = () => {
  // Compter les produits par marque
  const getBrandProductCount = (brandName: string) => {
    return PRODUCTS.filter(p => p.brandName === brandName).length;
  };

  const brands: Brand[] = [
    {
      name: 'HONOR',
      displayName: 'HONOR',
      bgColor: 'bg-gradient-to-br from-blue-600 to-blue-800',
      textColor: 'text-white',
      description: 'Smartphones innovants',
      productCount: getBrandProductCount('HONOR'),
      gradient: 'from-blue-600 to-blue-800',
    },
    {
      name: 'Monster',
      displayName: 'MONSTER',
      bgColor: 'bg-gradient-to-br from-orange-500 to-red-600',
      textColor: 'text-white',
      description: 'Gaming & Audio Premium',
      productCount: getBrandProductCount('Monster') + getBrandProductCount('MONSTER'),
      gradient: 'from-orange-500 to-red-600',
    },
    {
      name: 'HIFUTURE',
      displayName: 'HIFUTURE',
      bgColor: 'bg-gradient-to-br from-purple-600 to-pink-600',
      textColor: 'text-white',
      description: 'Audio & Écouteurs',
      productCount: getBrandProductCount('HIFUTURE'),
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      name: 'MY WAY',
      displayName: 'MY WAY',
      bgColor: 'bg-gradient-to-br from-green-600 to-teal-600',
      textColor: 'text-white',
      description: 'Accessoires essentiels',
      productCount: getBrandProductCount('MY WAY'),
      gradient: 'from-green-600 to-teal-600',
    },
    {
      name: 'MUVIT',
      displayName: 'MUVIT',
      bgColor: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      textColor: 'text-white',
      description: 'Pour les enfants',
      productCount: getBrandProductCount('MUVIT'),
      gradient: 'from-yellow-500 to-orange-600',
    },
    {
      name: 'Ascendo',
      displayName: 'ASCENDO',
      bgColor: 'bg-gradient-to-br from-gray-700 to-gray-900',
      textColor: 'text-white',
      description: 'Audio haute fidélité',
      productCount: getBrandProductCount('Ascendo'),
      gradient: 'from-gray-700 to-gray-900',
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Nos Marques Partenaires
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos marques de confiance pour des produits de qualité supérieure
          </p>
        </motion.div>

        {/* Grille de marques */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Link
                href={`/nos-produits?brand=${encodeURIComponent(brand.name)}`}
                className="block"
              >
                <div className={`${brand.bgColor} rounded-xl p-6 h-32 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:shadow-xl`}>
                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
                  
                  {/* Logo/Nom de marque */}
                  <div className={`${brand.textColor} font-bold text-lg lg:text-xl text-center relative z-10`}>
                    {brand.displayName}
                  </div>
                  
                  {/* Nombre de produits */}
                  {brand.productCount > 0 && (
                    <div className={`${brand.textColor} text-xs mt-1 opacity-80`}>
                      {brand.productCount} produits
                    </div>
                  )}
                </div>
                
                {/* Description au survol */}
                <div className="mt-2 text-center">
                  <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {brand.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Section mise en avant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  Marques exclusives à La Réunion
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  Monster Phone Boutique est le distributeur officiel de ces marques prestigieuses à La Réunion. 
                  Garantie authentique et service après-vente local inclus.
                </p>
              </div>
              
              <Link
                href="/nos-produits"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors whitespace-nowrap"
              >
                Découvrir tous les produits
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Statistiques des marques */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 text-center shadow-sm"
              >
                <div className="text-3xl font-bold text-orange-600">
                  {brands.reduce((acc, b) => acc + b.productCount, 0)}+
                </div>
                <div className="text-sm text-gray-600">Produits disponibles</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 text-center shadow-sm"
              >
                <div className="text-3xl font-bold text-blue-600">
                  {brands.length}
                </div>
                <div className="text-sm text-gray-600">Marques premium</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 text-center shadow-sm"
              >
                <div className="text-3xl font-bold text-green-600">2 ans</div>
                <div className="text-sm text-gray-600">Garantie constructeur</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 text-center shadow-sm"
              >
                <div className="text-3xl font-bold text-purple-600">24h</div>
                <div className="text-sm text-gray-600">Livraison express</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandShowcase;