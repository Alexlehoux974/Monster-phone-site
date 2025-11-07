'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const brands = [
  { name: 'HONOR', logo: '/brands/honor-logo.png' },
  { name: 'HIFUTURE', logo: '/brands/hifuture-logo.webp' },
  { name: 'MONSTER', logo: '/brands/monster-logo.png' },
  { name: 'MUVIT', logo: '/brands/muvit-logo.webp' },
  { name: 'MY WAY', logo: '/brands/myway-logo.jpg' },
];

export default function BrandCarousel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Nos Marques Partenaires
          </h2>
        </div>
      </section>
    );
  }

  // Dupliquer les logos pour créer un défilement infini fluide
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Nos Marques Partenaires
        </motion.h2>

        {/* Conteneur du carrousel avec overflow hidden */}
        <div className="relative">
          {/* Gradient fade sur les bords */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Animation de défilement infini */}
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: [0, -1200], // Déplacement basé sur 5 logos * 240px (width + gap)
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <motion.div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 w-48 h-32 relative grayscale hover:grayscale-0 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 150px, 200px"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Texte informatif */}
        <motion.p
          className="text-center text-gray-600 mt-8 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Découvrez nos produits des plus grandes marques gaming et tech
        </motion.p>
      </div>
    </section>
  );
}
