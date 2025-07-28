'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollText, Calendar, Euro, Truck, Shield, AlertTriangle } from 'lucide-react';

export default function ConditionsGeneralesPage() {
  useEffect(() => {
    document.title = 'Conditions Générales de Vente | Monster Phone Boutique La Réunion';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Consultez les conditions générales de vente de Monster Phone Boutique. Livraison gratuite dès 50€, garantie 24 mois, retours 14 jours. Service client La Réunion.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Consultez les conditions générales de vente de Monster Phone Boutique. Livraison gratuite dès 50€, garantie 24 mois, retours 14 jours. Service client La Réunion.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
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
                <ScrollText className="w-4 h-4" />
                CONDITIONS GÉNÉRALES
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Conditions Générales de Vente
              </h1>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                Conditions applicables à tous les achats effectués sur le site Monster Phone Boutique
              </p>
              <div className="mt-4 text-sm text-gray-700">
                <Calendar className="w-4 h-4 inline mr-1" />
                Dernière mise à jour : 28 juillet 2025
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-8"
            >
              <div className="prose prose-slate max-w-none text-gray-900">
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ScrollText className="w-6 h-6 text-blue-600" />
                  Article 1 - Objet et champ d'application
                </h2>
                <p>
                  Les présentes conditions générales de vente s'appliquent à toutes les commandes passées sur le site 
                  monster-phone-boutique.fr exploité par Monster Phone Boutique, société située à La Réunion.
                </p>
                <p>
                  Monster Phone Boutique est spécialisée dans la vente de smartphones gaming, accessoires high-tech, 
                  montres connectées et produits électroniques exclusivement à La Réunion (974).
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <Euro className="w-6 h-6 text-green-600" />
                  Article 2 - Prix et modalités de paiement
                </h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 Prix</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Les prix sont exprimés en euros toutes taxes comprises (TTC)</li>
                  <li>Les prix incluent la TVA au taux en vigueur à La Réunion</li>
                  <li>Les prix peuvent être modifiés à tout moment mais ne s'appliquent qu'aux commandes futures</li>
                  <li>Frais de livraison : gratuits dès 50€ d'achat, sinon forfait de 5€ sur toute l'île</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">2.2 Modalités de paiement</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cartes bancaires : Visa, Mastercard, CB</li>
                  <li>PayPal</li>
                  <li>Paiement en 3 fois sans frais (sous conditions)</li>
                  <li>Paiement à la livraison (uniquement en espèces, supplément de 3€)</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-purple-600" />
                  Article 3 - Livraison
                </h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.1 Zone de livraison</h3>
                <p>
                  Les livraisons sont effectuées exclusivement à La Réunion (974) : Saint-Denis, Saint-Paul, 
                  Saint-Pierre, Le Tampon, Saint-André, Saint-Louis, Sainte-Marie, Sainte-Suzanne, 
                  Saint-Benoît, Le Port, Saint-Leu, Bras-Panon, Saint-Joseph, Cilaos, Salazie, etc.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">3.2 Délais</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Express (24h)</strong> : Nord et Ouest de l'île - 10€</li>
                  <li><strong>Standard (48h)</strong> : Toute l'île - Gratuit dès 50€</li>
                  <li><strong>Retrait en boutique</strong> : Gratuit, sur RDV à Sainte-Marie</li>
                  <li><strong>Zones difficiles d'accès</strong> : 72h maximum + 5€</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  Article 4 - Garanties et retours
                </h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Droit de rétractation</h3>
                <p>
                  Conformément au Code de la consommation, vous disposez d'un délai de 14 jours francs 
                  pour retourner votre produit sans avoir à justifier de motifs ni à payer de pénalités.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.2 Garanties</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Garantie constructeur</strong> : 24 mois sur tous les smartphones</li>
                  <li><strong>Garantie commerciale</strong> : 6 mois Monster Phone Boutique</li>
                  <li><strong>Garantie légale</strong> : 2 ans conformité + 2 ans vices cachés</li>
                  <li><strong>Réparations</strong> : Atelier agréé sur site à Sainte-Marie</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.3 Conditions de retour</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Produit dans son emballage d'origine</li>
                  <li>Accessoires et notice inclus</li>
                  <li>Aucune trace d'usure ou de choc</li>
                  <li>Film plastique de protection non retiré (smartphones)</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Article 5 - Responsabilité</h2>
                <p>
                  Monster Phone Boutique ne saurait être tenue responsable des dommages de toute nature 
                  qui pourraient résulter d'une mauvaise utilisation des produits vendus. 
                  La responsabilité de Monster Phone Boutique est limitée au montant de la commande.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Article 6 - Propriété intellectuelle</h2>
                <p>
                  Tous les éléments du site monster-phone-boutique.fr sont et restent la propriété 
                  intellectuelle exclusive de Monster Phone Boutique. Toute reproduction, même partielle, 
                  est interdite sans autorisation préalable.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Article 7 - Protection des données</h2>
                <p>
                  Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez d'un droit 
                  d'accès, de modification et de suppression des données vous concernant. 
                  Pour exercer ce droit, contactez-nous à contact@monster-phone-reunion.com.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Article 8 - Droit applicable</h2>
                <p>
                  Les présentes conditions générales sont soumises au droit français. 
                  Tout litige sera de la compétence exclusive des tribunaux de Saint-Denis de La Réunion.
                </p>

                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-800 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">Information importante</span>
                  </div>
                  <p className="text-amber-700 text-sm">
                    En passant commande sur notre site, vous acceptez expressément les présentes 
                    conditions générales de vente. Nous vous recommandons de les imprimer et de les conserver.
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
                  <p className="text-gray-800">
                    <strong className="text-gray-900">Monster Phone Boutique</strong><br />
                    Zone Industrielle, 97438 Sainte-Marie, La Réunion<br />
                    Téléphone : 0262 XX XX XX<br />
                    Email : contact@monster-phone-reunion.com
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
}