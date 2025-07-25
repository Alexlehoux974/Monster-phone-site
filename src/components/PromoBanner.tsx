"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Truck, Clock } from 'lucide-react';

const PromoBanner = () => {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 text-sm">
          <motion.div 
            className="flex items-center space-x-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Gift className="w-4 h-4" />
            <span className="font-medium">🎉 PROMO SPÉCIALE -30% sur tout le site</span>
          </motion.div>
          <div className="hidden md:block w-px h-4 bg-white/30" />
          <div className="hidden md:flex items-center space-x-2">
            <Truck className="w-4 h-4" />
            <span>Livraison gratuite dès 50€</span>
          </div>
          <div className="hidden lg:block w-px h-4 bg-white/30" />
          <div className="hidden lg:flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Code: MONSTER30</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PromoBanner;