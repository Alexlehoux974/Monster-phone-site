'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { } from '@/components/ui/button';
import { } from '@/components/ui/badge';
import { Headphones, MapPin, Clock, Phone, Mail, Wrench } from 'lucide-react';

export default function ServiceApresVentePage() {
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
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Headphones className="w-4 h-4" />
                SERVICE CLIENT RÉUNION
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Service après-vente
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Notre équipe dédiée à La Réunion vous accompagne avant, pendant et après votre achat. 
                Un service personnalisé pour votre satisfaction complète.
              </p>
            </motion.div>

            {/* Services disponibles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Support téléphonique</h3>
                </div>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Conseils avant achat</li>
                  <li>• Assistance à la configuration</li>
                  <li>• Résolution de problèmes</li>
                  <li>• Suivi de commande</li>
                </ul>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    📞 02 62 02 51 02<br/>
                    Lun-Ven: 8h-17h, Sam: 8h-12h
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Support par email</h3>
                </div>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Demandes détaillées</li>
                  <li>• Envoi de documents</li>
                  <li>• Suivi de dossier</li>
                  <li>• Réclamations</li>
                </ul>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    ✉️ support@monster-phone.re<br/>
                    Réponse garantie sous 24h
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Centre technique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Centre technique La Réunion
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Nos services techniques</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Wrench className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Diagnostic gratuit sous 48h</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Wrench className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Réparation smartphones et accessoires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Wrench className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Remplacement sous garantie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Wrench className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Configuration et paramétrage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Wrench className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Transfert de données</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations pratiques</h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Adresse</p>
                        <p className="text-sm">16 Rue Claude Chappe, ZAE 2000, Le Port<br/>97290 Le Port Cedex</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Horaires</p>
                        <p className="text-sm">Lun-Ven: 8h-17h<br/>Sam: 8h-12h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Procédure SAV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Comment contacter le SAV ?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Contactez-nous</h3>
                  <p className="text-sm text-gray-700">
                    Appelez-nous ou envoyez un email avec votre problème et votre numéro de commande
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Diagnostic</h3>
                  <p className="text-sm text-gray-700">
                    Notre équipe effectue un premier diagnostic et vous propose une solution
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Résolution</h3>
                  <p className="text-sm text-gray-700">
                    Réparation, échange ou remboursement selon le cas et la garantie
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Engagement qualité */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-blue-50 rounded-lg border p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Notre engagement qualité
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Réactivité</h3>
                  <p className="text-sm text-gray-700">Réponse sous 24h maximum à vos demandes</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Proximité</h3>
                  <p className="text-sm text-gray-700">Équipe locale basée à La Réunion</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Headphones className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Expertise</h3>
                  <p className="text-sm text-gray-700">Techniciens formés sur toutes nos marques</p>
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