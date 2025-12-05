'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Smartphone, Watch, Headphones, Lightbulb, Cable } from 'lucide-react';

const categories = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    icon: Smartphone,
    href: '/nos-produits?category=Smartphones',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    description: 'Gaming & 5G',
  },
  {
    id: 'montres',
    name: 'Montres',
    icon: Watch,
    href: '/montres',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    description: 'Connectées',
  },
  {
    id: 'audio',
    name: 'Audio',
    icon: Headphones,
    href: '/audio',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    description: 'Écouteurs & Casques',
  },
  {
    id: 'led',
    name: 'LED',
    icon: Lightbulb,
    href: '/nos-produits?category=LED',
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    description: 'Éclairage Gaming',
  },
  {
    id: 'accessoires',
    name: 'Accessoires',
    icon: Cable,
    href: '/accessoires',
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-50',
    description: 'Câbles & Chargeurs',
  },
];

const CategoriesGrid = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Nos Catégories
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Explorez notre sélection gaming
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={category.href}>
                  <div
                    className={`${category.bgColor} rounded-xl p-4 md:p-6 text-center group cursor-pointer
                    hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-200`}
                  >
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${category.color}
                      flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 hidden sm:block">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
