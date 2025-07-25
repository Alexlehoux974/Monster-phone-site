'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import PromoBanner from '@/components/PromoBanner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Gift, Percent, ShoppingCart } from 'lucide-react';

export default function PromotionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBanner />
      <div className="pt-10">
        <Header />
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Gift className="w-4 h-4" />
              SOLDES D&apos;HIVER EN COURS
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Offres Exceptionnelles
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profitez de nos promotions exclusives sur une sélection d&apos;accessoires premium. 
              Stocks limités, dépêchez-vous !
            </p>
          </motion.div>

          {/* Stats rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Percent className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Jusqu&apos;à -50%</h3>
              <p className="text-gray-600">
                Sur une sélection d&apos;accessoires
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Offre limitée</h3>
              <p className="text-gray-600">
                Jusqu&apos;au 31 janvier 2024
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Produits premium</h3>
              <p className="text-gray-600">
                Qualité garantie 6 mois
              </p>
            </div>
          </motion.div>

          {/* Offres principales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Offres Flash
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Offre 1 */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-red-500 text-white">-30%</Badge>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-bold mb-2">Casques MUVIT</h3>
                      <p className="text-sm opacity-90">Collection Enfant</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">34,99€</span>
                    <span className="text-lg text-gray-500 line-through">49,99€</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Casques pour enfants avec limitation de volume
                  </p>
                  <Button className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </div>

              {/* Offre 2 */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-red-500 text-white">-25%</Badge>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 h-48 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-bold mb-2">Câbles MY-WAY</h3>
                      <p className="text-sm opacity-90">Lumineux premium</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">22,49€</span>
                    <span className="text-lg text-gray-500 line-through">29,99€</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Câbles USB-C Lightning avec éclairage LED
                  </p>
                  <Button className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </div>

              {/* Offre 3 */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-red-500 text-white">-40%</Badge>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 h-48 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-bold mb-2">Coques MUVIT</h3>
                      <p className="text-sm opacity-90">Protection premium</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">11,99€</span>
                    <span className="text-lg text-gray-500 line-through">19,99€</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Coques transparentes ultra-résistantes
                  </p>
                  <Button className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>


          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border p-8 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ne manquez plus aucune offre !
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Inscrivez-vous à notre newsletter pour être informé en avant-première de nos promotions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="px-6 py-3">
                S&apos;abonner
              </Button>
            </div>
          </motion.div>
        </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Monster Phone Boutique - Votre expert en téléphonie mobile depuis 2018</p>
        </div>
      </footer>
    </div>
  );
}