'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  RotateCcw, 
  Clock, 
  Shield, 
  Package, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  MapPin,
  Calendar,
  Smartphone,
  CreditCard,
  Truck
} from 'lucide-react';

export default function RetoursPolitiquePage() {
  useEffect(() => {
    document.title = 'Politique de Retour sous 30 Jours | Monster Phone Boutique Réunion';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Politique de retour sous 30 jours de Monster Phone Boutique. Échange gratuit, remboursement intégral, garantie satisfaction à La Réunion 974.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Politique de retour sous 30 jours de Monster Phone Boutique. Échange gratuit, remboursement intégral, garantie satisfaction à La Réunion 974.';
      document.head.appendChild(meta);
    }
  }, []);

  const returnSteps = [
    {
      step: 1,
      title: "Contactez-nous",
      description: "Appelez ou écrivez-nous pour signaler votre demande de retour",
      icon: CheckCircle,
      color: "blue"
    },
    {
      step: 2,
      title: "Préparez le produit",
      description: "Emballage d'origine, accessoires complets, état neuf",
      icon: Package,
      color: "green"
    },
    {
      step: 3,
      title: "Retour en magasin",
      description: "Apportez directement à notre boutique de Sainte-Marie",
      icon: MapPin,
      color: "purple"
    },
    {
      step: 4,
      title: "Remboursement",
      description: "Vérification et remboursement sous 48h",
      icon: CreditCard,
      color: "orange"
    }
  ];

  const excludedProducts = [
    "Produits personnalisés ou gravés",
    "Écouteurs et accessoires audio (hygiène)",
    "Produits endommagés par l'utilisateur",
    "Téléphones avec activation SIM"
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
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <RotateCcw className="w-4 h-4" />
                POLITIQUE DE RETOUR
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Retours sous 30 Jours
              </h1>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                Votre satisfaction est garantie. Retournez vos achats sous 30 jours pour un remboursement intégral.
              </p>
              <div className="mt-4 text-sm text-gray-700">
                <Calendar className="w-4 h-4 inline mr-1" />
                Dernière mise à jour : 28 juillet 2025
              </div>
            </motion.div>

            {/* Garantie satisfaction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 mb-8 text-center"
            >
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">100% Satisfait ou Remboursé</h2>
              <p className="text-lg opacity-90">
                Vous disposez de <strong>30 jours calendaires</strong> pour retourner vos achats
              </p>
            </motion.div>

            {/* Conditions générales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-600" />
                Conditions de retour
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Délai de 30 jours</h3>
                      <p className="text-gray-800 text-sm">
                        À partir de la date de réception de votre commande
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">État neuf</h3>
                      <p className="text-gray-800 text-sm">
                        Produit non utilisé, dans son emballage d'origine
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Accessoires complets</h3>
                      <p className="text-gray-800 text-sm">
                        Tous les accessoires, manuels et emballages inclus
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Facture d'achat</h3>
                      <p className="text-gray-800 text-sm">
                        Présentation de la facture ou justificatif d'achat
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Retour gratuit</h3>
                      <p className="text-gray-800 text-sm">
                        Aucun frais de retour à La Réunion
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Remboursement rapide</h3>
                      <p className="text-gray-800 text-sm">
                        Remboursement sous 48h après vérification
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Processus de retour */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-purple-600" />
                Comment effectuer un retour
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {returnSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className={`border rounded-lg p-6 ${getColorClasses(step.color)}`}
                    >
                      <div className="text-center">
                        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="text-lg font-bold mb-2">Étape {step.step}</div>
                        <h3 className="font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm opacity-80">{step.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Produits exclus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-600" />
                Produits exclus du retour
              </h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <p className="text-red-800">
                    Pour des raisons d'hygiène et de sécurité, certains produits ne peuvent pas être retournés :
                  </p>
                </div>
                
                <ul className="space-y-2">
                  {excludedProducts.map((product, index) => (
                    <li key={index} className="flex items-center gap-2 text-red-700">
                      <XCircle className="w-4 h-4 flex-shrink-0" />
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Modalités de remboursement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-green-600" />
                Modalités de remboursement
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Mode de remboursement</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Même moyen de paiement utilisé</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Virement bancaire si nécessaire</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Avoir magasin (optionnel)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Délais de remboursement</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">Carte bancaire : 2-5 jours ouvrés</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">Virement : 1-3 jours ouvrés</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">Avoir : Immédiat</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Échange */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <RotateCcw className="w-6 h-6 text-purple-600" />
                Échange de produit
              </h2>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-3">Échange possible</h3>
                <ul className="space-y-2 text-purple-800">
                  <li>• Changement de modèle ou de couleur</li>
                  <li>• Produit défectueux (garantie constructeur)</li>
                  <li>• Erreur de commande de notre part</li>
                </ul>
                
                <div className="mt-4 p-3 bg-white rounded border border-purple-300">
                  <p className="text-sm text-purple-700">
                    <strong>Note :</strong> En cas de différence de prix, un complément sera demandé ou un remboursement partiel effectué.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact pour retour */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center"
            >
              <Smartphone className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Besoin d'un retour ?</h2>
              <p className="text-lg opacity-90 mb-6">
                Contactez notre service client pour initier votre demande de retour
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-4">
                  <MapPin className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">En magasin</div>
                  <div className="opacity-80">Zone Industrielle<br />Sainte-Marie</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">📞</div>
                  <div className="font-semibold">Par téléphone</div>
                  <div className="opacity-80">0262 XX XX XX<br />Lun-Sam 9h-18h</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">✉️</div>
                  <div className="font-semibold">Par email</div>
                  <div className="opacity-80">retours@<br />monster-phone-reunion.com</div>
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