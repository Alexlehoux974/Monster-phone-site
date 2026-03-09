'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Euro, 
  Package, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Shield,
  Zap,
  Star,
  Home
} from 'lucide-react';

export default function LivraisonGratuitePage() {
  useEffect(() => {
    document.title = 'Livraison Gratuite dès 100€ | Monster Phone Boutique Réunion 974';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Livraison gratuite dès 100€ d\'achat à La Réunion. Livraison 24h-48h, service express, emballage sécurisé. Monster Phone Boutique 974.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Livraison gratuite dès 100€ d\'achat à La Réunion. Livraison 24h-48h, service express, emballage sécurisé. Monster Phone Boutique 974.';
      document.head.appendChild(meta);
    }
  }, []);

  const deliveryZones = [
    {
      zone: "Saint-Denis",
      time: "24h",
      color: "blue",
      areas: ["Centre-ville", "Bellepierre", "La Source", "Sainte-Clotilde"]
    },
    {
      zone: "Saint-Paul",
      time: "24-48h",
      color: "green",
      areas: ["Centre-ville", "La Saline", "L'Hermitage", "Saint-Gilles"]
    },
    {
      zone: "Sud de l'île",
      time: "48h",
      color: "purple",
      areas: ["Saint-Pierre", "Le Tampon", "Saint-Joseph", "Saint-Philippe"]
    },
    {
      zone: "Est de l&apos;île",
      time: "48h",
      color: "orange",
      areas: ["Sainte-Marie", "Sainte-Suzanne", "Saint-André", "Bras-Panon"]
    }
  ];

  const deliveryOptions = [
    {
      title: "Standard (GRATUITE dès 100€)",
      price: "0€",
      time: "24-48h",
      description: "Livraison à domicile ou en point relais",
      icon: Package,
      color: "green"
    },
    {
      title: "Express",
      price: "9,90€",
      time: "24h",
      description: "Livraison garantie le lendemain avant 13h",
      icon: Zap,
      color: "blue"
    },
    {
      title: "Retrait magasin",
      price: "GRATUIT",
      time: "2h",
      description: "Préparation en 2h, retrait en magasin",
      icon: Home,
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200 text-blue-600",
      green: "bg-green-50 border-green-200 text-green-600",
      purple: "bg-purple-50 border-purple-200 text-purple-600",
      orange: "bg-orange-50 border-orange-200 text-orange-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
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
                <Truck className="w-4 h-4" />
                LIVRAISON GRATUITE
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Livraison Gratuite dès 100€
              </h1>
              <p className="text-xl text-gray-900 max-w-3xl mx-auto">
                Recevez vos produits partout à La Réunion, rapidement et en toute sécurité
              </p>
              <div className="mt-4 text-sm text-gray-900">
                <Calendar className="w-4 h-4 inline mr-1" />
                Dernière mise à jour : 28 juillet 2025
              </div>
            </motion.div>

            {/* Offre principale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 mb-8 text-center"
            >
              <Euro className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">100€ d&apos;achat = Livraison GRATUITE</h2>
              <p className="text-xl opacity-100 mb-4">
                Profitez de la livraison gratuite partout à La Réunion
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5" />
                <span>Aucun code promo nécessaire</span>
              </div>
            </motion.div>

            {/* Options de livraison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-blue-600" />
                Nos options de livraison
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deliveryOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <motion.div
                      key={option.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className={`border rounded-lg p-6 ${getColorClasses(option.color)}`}
                    >
                      <div className="text-center">
                        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{option.title}</h3>
                        <div className="text-2xl font-bold mb-2">{option.price}</div>
                        <div className="text-sm text-gray-900 mb-2">Délai : {option.time}</div>
                        <p className="text-sm text-gray-900">{option.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Zones de livraison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-purple-600" />
                Zones de livraison à La Réunion
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {deliveryZones.map((zone, index) => (
                  <motion.div
                    key={zone.zone}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className={`border rounded-lg p-4 ${getColorClasses(zone.color)}`}
                  >
                    <div className="text-center mb-3">
                      <h3 className="font-bold text-lg">{zone.zone}</h3>
                      <div className="text-sm text-gray-900">Délai : {zone.time}</div>
                    </div>
                    <ul className="text-xs space-y-1 text-gray-900">
                      {zone.areas.map((area, i) => (
                        <li key={i}>• {area}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-900">
                    <strong>Note :</strong> Les délais sont donnés à titre indicatif et peuvent varier selon les conditions météorologiques et la disponibilité du transporteur. Les Hauts de l&apos;île peuvent nécessiter un délai supplémentaire.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Processus de livraison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-green-600" />
                Comment ça marche ?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Commandez</h3>
                  <p className="text-sm text-gray-900">
                    Passez votre commande en ligne avant 16h
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Préparation</h3>
                  <p className="text-sm text-gray-900">
                    Votre commande est préparée avec soin
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Expédition</h3>
                  <p className="text-sm text-gray-900">
                    Envoi et suivi par SMS/email
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Réception</h3>
                  <p className="text-sm text-gray-900">
                    Livraison à l&apos;adresse indiquée
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Garanties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Nos garanties livraison
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Emballage sécurisé</h3>
                      <p className="text-gray-900 text-sm">
                        Protection optimale avec emballage bulle et carton renforcé
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Suivi en temps réel</h3>
                      <p className="text-gray-900 text-sm">
                        SMS et email de confirmation à chaque étape
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Assurance transport</h3>
                      <p className="text-gray-900 text-sm">
                        Produits assurés pendant le transport
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Livraison en main propre</h3>
                      <p className="text-gray-900 text-sm">
                        Remise contre signature ou à personne de confiance
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Reprogrammation gratuite</h3>
                      <p className="text-gray-900 text-sm">
                        Possibilité de reprogrammer la livraison si absent
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Service client dédié</h3>
                      <p className="text-gray-900 text-sm">
                        Support livraison 6j/7 de 9h à 18h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Informations importantes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Informations importantes</h3>
                  <ul className="space-y-2 text-amber-900 text-sm">
                    <li>• <strong>Seuil de gratuité :</strong> 100€ HT (hors frais de port éventuels)</li>
                    <li>• <strong>Commandes avant 16h :</strong> Expédition le jour même</li>
                    <li>• <strong>Weekend et jours fériés :</strong> Pas de livraison, préparation reportée</li>
                    <li>• <strong>Adresse incomplète :</strong> Peut retarder la livraison</li>
                    <li>• <strong>Produits volumineux :</strong> Délai supplémentaire possible</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Contact livraison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center"
            >
              <Truck className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Questions sur votre livraison ?</h2>
              <p className="text-lg opacity-100 mb-6">
                Notre équipe est là pour vous accompagner
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">📞</div>
                  <div className="font-semibold">Service livraison</div>
                  <div className="text-white">02 62 02 51 02<br />Lun-Sam 9h-18h</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">✉️</div>
                  <div className="font-semibold">Email support</div>
                  <div className="text-white">commande@monster-phone.re</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <Star className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Suivi commande</div>
                  <div className="text-white">Tracking SMS<br />+ Email automatique</div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        </div>
      </div>
      
      <Footer />
    </>
  );
}