'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Shield, Clock, Award } from 'lucide-react';

export default function ReparationPage() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Service de Réparation
            </h1>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Experts en réparation de smartphones et accessoires. 
              Diagnostic gratuit, intervention rapide, garantie 6 mois.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Diagnostic Gratuit</h3>
              <p className="text-gray-800">
                Évaluation complète de votre appareil sans frais
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Réparation Express</h3>
              <p className="text-gray-800">
                80% des réparations effectuées en moins de 2h
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Garantie 6 mois</h3>
              <p className="text-gray-800">
                Toutes nos réparations sont garanties 6 mois
              </p>
            </div>
          </motion.div>

          {/* Services List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Nos Services de Réparation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Écrans & Tactiles</h3>
                <ul className="space-y-2 text-gray-800">
                  <li>• Remplacement écran cassé</li>
                  <li>• Réparation tactile défaillant</li>
                  <li>• Changement vitre de protection</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Batteries & Charge</h3>
                <ul className="space-y-2 text-gray-800">
                  <li>• Remplacement batterie</li>
                  <li>• Réparation connecteur charge</li>
                  <li>• Problèmes de charge sans fil</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Audio & Connectiques</h3>
                <ul className="space-y-2 text-gray-800">
                  <li>• Réparation haut-parleurs</li>
                  <li>• Remplacement prise jack</li>
                  <li>• Problèmes de microphone</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Caméras & Capteurs</h3>
                <ul className="space-y-2 text-gray-800">
                  <li>• Réparation appareil photo</li>
                  <li>• Remplacement capteurs</li>
                  <li>• Problèmes de stabilisation</li>
                </ul>
              </div>
            </div>
          </motion.div>

        </div>
        </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Monster Phone Boutique - Votre expert en téléphonie mobile depuis 2018</p>
        </div>
      </footer>
    </div>
  );
}