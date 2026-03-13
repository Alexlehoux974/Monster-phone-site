'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monitor, Smartphone, Settings, HelpCircle, Book, Video } from 'lucide-react';

export default function SupportTechniquePage() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="pt-[120px] sm:pt-[140px] lg:pt-[176px]">
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
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Monitor className="w-4 h-4" />
                SUPPORT TECHNIQUE RÉUNION
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Support technique
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Besoin d&apos;aide avec vos appareils ? Notre équipe technique à La Réunion 
                vous accompagne dans la configuration et l&apos;utilisation de vos produits.
              </p>
            </motion.div>

            {/* Types de support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Configuration</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Aide à la première installation et configuration de vos appareils
                </p>
                <Badge className="bg-blue-100 text-blue-800">Gratuit</Badge>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dépannage</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Résolution de problèmes techniques et optimisation
                </p>
                <Badge className="bg-green-100 text-green-800">Sous garantie</Badge>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Formation</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Conseils d&apos;utilisation et astuces pour optimiser vos appareils
                </p>
                <Badge className="bg-purple-100 text-purple-800">Sur demande</Badge>
              </div>
            </motion.div>

            {/* Services techniques détaillés */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Nos services techniques
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Smartphones HONOR</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Configuration initiale et transfert de données</li>
                    <li>• Paramétrage des comptes et synchronisation</li>
                    <li>• Installation et configuration d&apos;applications</li>
                    <li>• Optimisation des performances</li>
                    <li>• Mise à jour logicielle et sécurité</li>
                    <li>• Résolution de problèmes de connectivité</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-4">Accessoires</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Appairage écouteurs et casques Bluetooth</li>
                    <li>• Configuration des câbles de charge</li>
                    <li>• Paramétrage des batteries portables</li>
                    <li>• Installation des coques et protections</li>
                    <li>• Optimisation de la charge rapide</li>
                    <li>• Dépannage des accessoires défaillants</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Méthodes de support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Comment obtenir de l&apos;aide ?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">FAQ en ligne</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Consultez nos guides et réponses aux questions fréquentes
                  </p>
                  <Button size="sm" variant="outline">Consulter</Button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Video className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Assistance à distance</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Support par téléphone ou visioconférence
                  </p>
                  <Button size="sm" variant="outline">Planifier</Button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Monitor className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Atelier sur site</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Rendez-vous dans notre centre au Port
                  </p>
                  <Button size="sm" variant="outline">Réserver</Button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Settings className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Intervention domicile</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Service premium à domicile sur l&apos;île
                  </p>
                  <Button size="sm" variant="outline">Demander</Button>
                </div>
              </div>
            </motion.div>

            {/* Horaires et tarifs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Horaires support</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-medium">8h - 17h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="font-medium">8h - 12h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="font-medium text-red-600">Fermé</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg mt-4">
                    <p className="text-sm text-blue-800">
                      ⚡ Support d&apos;urgence disponible sur demande
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tarification</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Support téléphonique</span>
                    <span className="font-medium text-green-600">Gratuit</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Configuration basique</span>
                    <span className="font-medium text-green-600">Gratuit</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Atelier sur site (1h)</span>
                    <span className="font-medium">25€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Intervention domicile</span>
                    <span className="font-medium">45€ + déplacement</span>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg mt-4">
                    <p className="text-sm text-green-800">
                      💡 Gratuit pendant la période de garantie
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-purple-50 rounded-lg border p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Besoin d&apos;assistance technique ?
              </h2>
              <p className="text-gray-600 mb-6">
                Notre équipe d&apos;experts à La Réunion est prête à vous aider
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  📞 Appeler le support : 02 62 02 51 02
                </Button>
                <Button variant="outline">
                  📧 support@monster-phone.re
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