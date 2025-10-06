'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { } from '@/components/ui/badge';
import { RotateCcw, Calendar, FileText, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

export default function RetoursPage() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="pt-[110px]">
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
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <RotateCcw className="w-4 h-4" />
                POLITIQUE DE RETOUR RÉUNION
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Retours sous 30 jours
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Vous n&apos;êtes pas satisfait de votre achat ? Pas de problème ! 
                Retournez vos produits sous 30 jours à La Réunion, remboursement garanti.
              </p>
            </motion.div>

            {/* Conditions de retour */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Conditions de retour
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Produits éligibles
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Accessoires en parfait état</li>
                    <li>• Emballage d&apos;origine conservé</li>
                    <li>• Smartphones non utilisés</li>
                    <li>• Produits non personnalisés</li>
                    <li>• Facture d&apos;achat fournie</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Produits non éligibles
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Coques personnalisées</li>
                    <li>• Produits endommagés par l&apos;usage</li>
                    <li>• Écouteurs pour raisons d&apos;hygiène</li>
                    <li>• Accessoires modifiés</li>
                    <li>• Produits soldés (selon mention)</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Processus de retour */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Comment effectuer un retour ?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Demande</h3>
                  <p className="text-sm text-gray-600">
                    Contactez-nous via le formulaire ou par email avec votre numéro de commande
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Validation</h3>
                  <p className="text-sm text-gray-600">
                    Nous validons votre demande sous 24h et vous envoyons l&apos;étiquette retour
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RotateCcw className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Renvoi</h3>
                  <p className="text-sm text-gray-600">
                    Renvoyez le produit avec l&apos;étiquette fournie via notre transporteur partenaire
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">4. Remboursement</h3>
                  <p className="text-sm text-gray-600">
                    Remboursement sous 5-7 jours après réception du produit contrôlé
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Délais et modalités */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Délais de retour</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span><strong>30 jours</strong> pour les accessoires standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <span><strong>14 jours</strong> pour les smartphones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <span><strong>7 jours</strong> pour les produits soldés</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Frais de retour</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <span><strong>Gratuit</strong> si produit défectueux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <span><strong>Gratuit</strong> pour commandes &gt; 100€</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span><strong>4,90€</strong> pour autres cas à La Réunion</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-blue-50 rounded-lg border p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Une question sur votre retour ?
              </h2>
              <p className="text-gray-600 mb-6">
                Notre équipe basée à La Réunion est là pour vous accompagner
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Formulaire de retour
                </Button>
                <Button variant="outline">
                  Nous contacter : 0262 XX XX XX
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}