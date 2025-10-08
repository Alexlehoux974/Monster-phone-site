'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Clock, FileText, Wrench, AlertTriangle, CheckCircle } from 'lucide-react';

export default function GarantiePage() {
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
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                GARANTIE CONSTRUCTEUR
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Garantie constructeur
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tous nos produits bénéficient de la garantie constructeur. 
                Service après-vente assuré directement à La Réunion pour votre tranquillité d&apos;esprit.
              </p>
            </motion.div>

            {/* Types de garanties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Smartphones</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">24 mois</p>
                <p className="text-gray-600 text-sm">
                  Garantie constructeur complète sur tous les composants
                </p>
                <Badge className="mt-3 bg-blue-100 text-blue-800">HONOR, HIFUTURE</Badge>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Accessoires</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">12 mois</p>
                <p className="text-gray-600 text-sm">
                  Garantie sur défauts de fabrication et de matériaux
                </p>
                <Badge className="mt-3 bg-green-100 text-green-800">MUVIT, MY WAY, MONSTER</Badge>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Garantie étendue</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">36 mois</p>
                <p className="text-gray-600 text-sm">
                  Option disponible pour certains produits premium
                </p>
                <Badge className="mt-3 bg-purple-100 text-purple-800">Sur demande</Badge>
              </div>
            </motion.div>

            {/* Couverture garantie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Que couvre la garantie ?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Pannes couvertes
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Défauts de fabrication</li>
                    <li>• Pannes de composants électroniques</li>
                    <li>• Dysfonctionnements logiciels</li>
                    <li>• Problèmes de connectique</li>
                    <li>• Défaillances prématurées</li>
                    <li>• Vice caché du produit</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Exclusions de garantie
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Chutes et chocs</li>
                    <li>• Dégâts des eaux / humidité</li>
                    <li>• Usure normale</li>
                    <li>• Mauvaise utilisation</li>
                    <li>• Réparations non autorisées</li>
                    <li>• Dommages esthétiques</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Processus de garantie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Comment faire jouer la garantie ?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Diagnostic</h3>
                  <p className="text-sm text-gray-600">
                    Contactez-nous pour décrire le problème rencontré avec votre produit
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Expertise</h3>
                  <p className="text-sm text-gray-600">
                    Apportez le produit dans notre centre à La Réunion pour expertise gratuite
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Traitement</h3>
                  <p className="text-sm text-gray-600">
                    Réparation ou échange sous 5-10 jours selon disponibilité des pièces
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">4. Récupération</h3>
                  <p className="text-sm text-gray-600">
                    Récupération de votre produit réparé ou produit de remplacement
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Centre de service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Centre de service La Réunion</h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Adresse :</strong> 16 Rue Claude Chappe, ZAE 2000, Le Port</p>
                  <p><strong>Horaires :</strong> Lun-Ven 8h-17h, Sam 8h-12h</p>
                  <p><strong>Téléphone :</strong> 02 62 02 51 02</p>
                  <p><strong>Email :</strong> garantie@monster-phone-reunion.com</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Délais moyens</h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Diagnostic :</strong> 24-48h</p>
                  <p><strong>Réparation simple :</strong> 3-5 jours</p>
                  <p><strong>Réparation complexe :</strong> 7-15 jours</p>
                  <p><strong>Commande pièces :</strong> +5-10 jours</p>
                </div>
              </div>
            </motion.div>

            {/* Contact garantie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-green-50 rounded-lg border p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Service garantie à La Réunion
              </h2>
              <p className="text-gray-600 mb-6">
                Notre équipe technique locale assure un suivi personnalisé de votre garantie
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-green-600 hover:bg-green-700">
                  Demande de garantie
                </Button>
                <Button variant="outline">
                  Vérifier ma garantie
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