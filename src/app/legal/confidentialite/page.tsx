'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Eye, Database, Lock, UserCheck, AlertTriangle, Calendar } from 'lucide-react';

export default function ConfidentialitePage() {
  useEffect(() => {
    document.title = 'Politique de Confidentialité RGPD | Monster Phone Boutique Réunion';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Politique de confidentialité et protection des données personnelles RGPD de Monster Phone Boutique. Transparence et respect de votre vie privée à La Réunion.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Politique de confidentialité et protection des données personnelles RGPD de Monster Phone Boutique. Transparence et respect de votre vie privée à La Réunion.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
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
                CONFIDENTIALITÉ & RGPD
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Politique de Confidentialité
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Protection de vos données personnelles sur Monster Phone Boutique
              </p>
              <div className="mt-4 text-sm text-gray-500">
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
              <div className="prose prose-gray max-w-none">
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-blue-600" />
                  1. Responsable du traitement
                </h2>
                <p>
                  <strong>Monster Phone Boutique</strong> est responsable du traitement de vos données personnelles.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="text-blue-800 mb-0">
                    <strong>Coordonnées :</strong><br />
                    Zone Industrielle, 97438 Sainte-Marie, La Réunion<br />
                    Email : contact@monster-phone-reunion.com<br />
                    Téléphone : 0262 XX XX XX
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <Database className="w-6 h-6 text-purple-600" />
                  2. Données collectées
                </h2>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 Données obligatoires</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Identité</strong> : Nom, prénom</li>
                  <li><strong>Contact</strong> : Adresse email, téléphone</li>
                  <li><strong>Adresse</strong> : Adresse de livraison et facturation</li>
                  <li><strong>Commande</strong> : Historique des achats, préférences</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">2.2 Données optionnelles</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Date de naissance (pour les offres spéciales)</li>
                  <li>Préférences de communication</li>
                  <li>Avis et commentaires produits</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">2.3 Données techniques</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Adresse IP, type de navigateur</li>
                  <li>Pages visitées, durée de navigation</li>
                  <li>Cookies et traceurs (avec votre consentement)</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-green-600" />
                  3. Finalités du traitement
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Gestion des commandes</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Traitement des commandes</li>
                      <li>• Livraison des produits</li>
                      <li>• Facturation et comptabilité</li>
                      <li>• Service après-vente</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Communication client</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Informations sur les commandes</li>
                      <li>• Newsletter (avec consentement)</li>
                      <li>• Offres personnalisées</li>
                      <li>• Support technique</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Amélioration du service</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Analyse de navigation</li>
                      <li>• Personnalisation du site</li>
                      <li>• Statistiques anonymes</li>
                      <li>• Développement produits</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Obligations légales</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Conservation factures (10 ans)</li>
                      <li>• Lutte anti-fraude</li>
                      <li>• Réquisitions judiciaires</li>
                      <li>• Conformité fiscale</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">4. Base légale</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Exécution du contrat</strong> : Traitement de votre commande</li>
                  <li><strong>Consentement</strong> : Newsletter, cookies, marketing</li>
                  <li><strong>Intérêt légitime</strong> : Amélioration du service, lutte anti-fraude</li>
                  <li><strong>Obligation légale</strong> : Conservation comptable, fiscalité</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">5. Durée de conservation</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-amber-200">
                        <th className="text-left py-2 font-semibold text-amber-900">Type de données</th>
                        <th className="text-left py-2 font-semibold text-amber-900">Durée</th>
                      </tr>
                    </thead>
                    <tbody className="text-amber-800">
                      <tr className="border-b border-amber-200">
                        <td className="py-2">Données de commande</td>
                        <td className="py-2">10 ans (obligation comptable)</td>
                      </tr>
                      <tr className="border-b border-amber-200">
                        <td className="py-2">Compte client inactif</td>
                        <td className="py-2">3 ans après dernière connexion</td>
                      </tr>
                      <tr className="border-b border-amber-200">
                        <td className="py-2">Newsletter</td>
                        <td className="py-2">Jusqu'à désinscription</td>
                      </tr>
                      <tr>
                        <td className="py-2">Cookies</td>
                        <td className="py-2">13 mois maximum</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                  6. Vos droits
                </h2>
                <p>
                  Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Droit d'accès</h4>
                    <p className="text-sm text-blue-800">
                      Obtenir la confirmation que vos données sont traitées et y accéder
                    </p>
                  </div>
                  <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Droit de rectification</h4>
                    <p className="text-sm text-green-800">
                      Corriger vos données inexactes ou incomplètes
                    </p>
                  </div>
                  <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Droit à l'effacement</h4>
                    <p className="text-sm text-red-800">
                      Supprimer vos données dans certaines conditions
                    </p>
                  </div>
                  <div className="border border-purple-200 bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Droit à la portabilité</h4>
                    <p className="text-sm text-purple-800">
                      Récupérer vos données dans un format structuré
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">Exercer vos droits</h3>
                <p>
                  Pour exercer vos droits, contactez-nous :
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Email : contact@monster-phone-reunion.com</li>
                  <li>Courrier : Monster Phone Boutique - Zone Industrielle - 97438 Sainte-Marie</li>
                  <li>Téléphone : 0262 XX XX XX</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  Nous vous répondrons dans un délai d'un mois. Une pièce d'identité pourra être demandée.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. Sécurité des données</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Chiffrement SSL</strong> : Toutes les données sensibles sont chiffrées</li>
                  <li><strong>Accès restreint</strong> : Seuls les employés autorisés accèdent aux données</li>
                  <li><strong>Sauvegardes</strong> : Sauvegardes régulières et sécurisées</li>
                  <li><strong>Mise à jour</strong> : Systèmes régulièrement mis à jour</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">8. Cookies</h2>
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience. 
                  Vous pouvez gérer vos préférences via le bandeau cookies ou les paramètres de votre navigateur.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Types de cookies</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Techniques</strong> : Nécessaires au fonctionnement (panier, connexion)</li>
                  <li><strong>Statistiques</strong> : Mesure d'audience anonyme (Google Analytics)</li>
                  <li><strong>Marketing</strong> : Personnalisation des offres (avec consentement)</li>
                </ul>

                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">Réclamation</span>
                  </div>
                  <p className="text-red-700 text-sm">
                    Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation 
                    auprès de la CNIL : <strong>www.cnil.fr</strong>
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
                  <p className="text-gray-700">
                    <strong>Délégué à la Protection des Données</strong><br />
                    Monster Phone Boutique<br />
                    Email : dpo@monster-phone-reunion.com<br />
                    Téléphone : 0262 XX XX XX
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