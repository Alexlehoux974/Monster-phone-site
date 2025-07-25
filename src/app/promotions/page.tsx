'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Star, ShoppingCart } from 'lucide-react';

export default function PromotionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" />
              MONSTER PHONE BOUTIQUE RÉUNION
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Votre boutique spécialisée
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète d'accessoires et smartphones gaming à La Réunion. 
              Service personnalisé et expertise locale depuis 2018.
            </p>
          </motion.div>

          {/* Services Réunion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Livraison Île</h3>
              <p className="text-gray-600">
                Livraison partout à La Réunion sous 48h
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Service Local</h3>
              <p className="text-gray-600">
                Équipe technique basée à La Réunion
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Garantie 24 mois</h3>
              <p className="text-gray-600">
                Service après-vente garanti
              </p>
            </div>
          </motion.div>

          {/* Nos marques */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Nos marques partenaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* HONOR */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-bold mb-2">HONOR</h3>
                    <p className="text-sm opacity-90">Smartphones premium</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Smartphones gaming haute performance, garantie constructeur 24 mois
                  </p>
                  <Button className="w-full" variant="outline">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Voir les produits
                  </Button>
                </div>
              </div>

              {/* MUVIT */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 h-48 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-bold mb-2">MUVIT</h3>
                    <p className="text-sm opacity-90">Accessoires innovants</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Coques, housses et accessoires de protection de qualité européenne
                  </p>
                  <Button className="w-full" variant="outline">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Voir les produits
                  </Button>
                </div>
              </div>

              {/* MY WAY */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 h-48 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-bold mb-2">MY WAY</h3>
                    <p className="text-sm opacity-90">Câbles & chargeurs</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Câbles lumineux, batteries portables et solutions de charge
                  </p>
                  <Button className="w-full" variant="outline">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Voir les produits
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>


          {/* Contact Réunion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border p-8 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Besoin de conseils ?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Notre équipe d'experts à La Réunion est là pour vous conseiller
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 text-blue-600 mb-2" />
                <p className="font-semibold">0262 XX XX XX</p>
                <p className="text-sm text-gray-600">Lun-Sam 9h-18h</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 text-green-600 mb-2" />
                <p className="font-semibold">contact@monster-phone-reunion.com</p>
                <p className="text-sm text-gray-600">Réponse sous 24h</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-purple-600 mb-2" />
                <p className="font-semibold">Sainte-Marie</p>
                <p className="text-sm text-gray-600">Showroom sur RDV</p>
              </div>
            </div>
            <Button className="px-6 py-3">
              Nous contacter
            </Button>
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