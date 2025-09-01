'use client';

import { Headphones, Battery, Shield, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const SmartphonePackBanner = () => {
  const items = [
    { icon: Headphones, label: 'Écouteurs' },
    { icon: Battery, label: 'Chargeur' },
    { icon: Shield, label: 'Protection vitre' },
    { icon: Smartphone, label: 'Coque' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white py-4 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            className="text-2xl font-bold flex items-center gap-2"
          >
            <span>🎁</span>
            <span className="text-sm sm:text-base lg:text-lg">Tous nos smartphones incluent :</span>
          </motion.div>
          
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            {items.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5"
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-2 text-center text-xs sm:text-sm opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.8 }}
        >
          ✨ Pack complet offert avec chaque smartphone
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SmartphonePackBanner;