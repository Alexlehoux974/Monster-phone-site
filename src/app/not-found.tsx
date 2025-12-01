'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animated gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 Big Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-8"
        >
          <h1 className="text-[150px] sm:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 leading-none select-none">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Page non trouvée
          </h2>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Oups ! La page que vous recherchez semble avoir disparu dans le cyberespace.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/25"
          >
            <Home className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>

          <Link
            href="/produits"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
          >
            <ShoppingBag className="w-5 h-5" />
            Voir nos produits
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <p className="text-gray-400 text-sm mb-4">Liens utiles :</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link
              href="/categories"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <Search className="w-4 h-4" />
              Catégories
            </Link>
            <Link
              href="/marques"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Marques
            </Link>
            <Link
              href="/contact"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contact
            </Link>
            <button
              onClick={() => window.history.back()}
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Page précédente
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
