'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Clock, Euro, Package, Plane } from 'lucide-react';

export default function LivraisonPage() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="pt-24">
        <Header />
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Truck className="w-4 h-4" />
                LIVRAISON À LA RÉUNION
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Livraison gratuite dès 50€
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Profitez de la livraison gratuite partout à la Réunion pour toute commande de 50€ et plus. 
                Des tarifs préférentiels pour les commandes inférieures.
              </p>
            </motion.div>

            {/* Zones de livraison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Toute l'île de la Réunion</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Saint-Denis et agglomération</li>
                  <li>• Saint-Paul et la côte ouest</li>
                  <li>• Saint-Pierre et le sud</li>
                  <li>• Saint-André et l'est</li>
                  <li>• Cirques et hauts de l'île</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Délais de livraison</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Zone urbaine : 24-48h</li>
                  <li>• Zone péri-urbaine : 48-72h</li>
                  <li>• Hauts et cirques : 3-5 jours</li>
                  <li>• Points relais : 24-48h</li>
                </ul>
              </div>
            </motion.div>

            {/* Tarifs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Nos tarifs de livraison
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <Euro className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Gratuit</h3>
                  <p className="text-green-600 font-bold text-2xl mb-2">0€</p>
                  <p className="text-sm text-gray-600">
                    Pour les commandes de 50€ et plus
                  </p>
                  <Badge className="mt-3 bg-green-100 text-green-800">Recommandé</Badge>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg border">
                  <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Standard</h3>
                  <p className="text-blue-600 font-bold text-2xl mb-2">5,90€</p>
                  <p className="text-sm text-gray-600">
                    Pour les commandes de 20€ à 49,99€
                  </p>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg border">
                  <Plane className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Express</h3>
                  <p className="text-purple-600 font-bold text-2xl mb-2">9,90€</p>
                  <p className="text-sm text-gray-600">
                    Livraison en 24h garantie
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Modalités */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Modalités de livraison
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Livraison à domicile</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Livraison du lundi au vendredi</li>
                    <li>• Créneaux horaires : 8h-12h / 14h-18h</li>
                    <li>• SMS de notification la veille</li>
                    <li>• Paiement à la livraison possible</li>
                    <li>• Émargement requis</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Points relais</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Plus de 50 points relais sur l'île</li>
                    <li>• Horaires étendus (souvent jusqu'à 19h)</li>
                    <li>• Conservation 10 jours ouvrés</li>
                    <li>• SMS d'alerte dès réception</li>
                    <li>• Tarif préférentiel : -1€ sur livraison</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Garanties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-blue-50 rounded-lg border p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Nos garanties livraison
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Colis protégé</h3>
                  <p className="text-sm text-gray-600">Emballage sécurisé pour tous vos produits</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Délais respectés</h3>
                  <p className="text-sm text-gray-600">98% de nos livraisons dans les temps</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Suivi en temps réel</h3>
                  <p className="text-sm text-gray-600">Suivez votre colis depuis votre commande</p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}