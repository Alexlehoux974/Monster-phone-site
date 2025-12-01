'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, RefreshCw, ShoppingBag, AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/50 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animated gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-600/20 via-transparent to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400/30 rounded-full"
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
        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-150" />
            <AlertTriangle className="w-32 h-32 sm:w-40 sm:h-40 text-red-500 relative z-10" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Oups ! Une erreur est survenue
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto mb-4">
            Nous sommes désolés, quelque chose s&apos;est mal passé. Notre équipe a été informée du problème.
          </p>
          <p className="text-gray-400 text-sm">
            Vous pouvez réessayer ou retourner à la page d&apos;accueil.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/25"
          >
            <RefreshCw className="w-5 h-5" />
            Réessayer
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
          >
            <Home className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>
        </motion.div>

        {/* Alternative Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <p className="text-gray-400 text-sm mb-4">Ou explorez nos produits :</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/produits"
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Tous les produits
            </Link>
            <Link
              href="/categories"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              Catégories
            </Link>
            <Link
              href="/marques"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              Marques
            </Link>
            <Link
              href="/contact"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              Contact
            </Link>
          </div>
        </motion.div>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <p className="text-gray-500 text-xs font-mono">
              Error ID: {error.digest}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
