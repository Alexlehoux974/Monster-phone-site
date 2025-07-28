'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Building, Globe, Shield, Phone, Mail, MapPin, Calendar } from 'lucide-react';

export default function MentionsLegalesPage() {
  useEffect(() => {
    document.title = 'Mentions Légales | Monster Phone Boutique SARL La Réunion 974';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mentions légales de Monster Phone Boutique SARL. Informations entreprise, SIRET, hébergement Vercel. Zone Industrielle Sainte-Marie 97438 La Réunion.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Mentions légales de Monster Phone Boutique SARL. Informations entreprise, SIRET, hébergement Vercel. Zone Industrielle Sainte-Marie 97438 La Réunion.';
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
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Building className="w-4 h-4" />
                MENTIONS LÉGALES
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Mentions Légales
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Informations légales relatives au site Monster Phone Boutique
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
                  <Building className="w-6 h-6 text-blue-600" />
                  1. Informations sur l'entreprise
                </h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Dénomination sociale</h3>
                      <p className="text-blue-800">Monster Phone Boutique</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Forme juridique</h3>
                      <p className="text-blue-800">SARL (Société à Responsabilité Limitée)</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Capital social</h3>
                      <p className="text-blue-800">10 000 €</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">SIRET</h3>
                      <p className="text-blue-800">XXX XXX XXX 00012</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">APE/NAF</h3>
                      <p className="text-blue-800">4741Z - Commerce de détail d'ordinateurs</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">N° TVA</h3>
                      <p className="text-blue-800">FR XX XXX XXX XXX</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-green-600" />
                  2. Siège social et coordonnées
                </h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Adresse
                      </h3>
                      <p className="text-green-800">
                        Zone Industrielle<br />
                        97438 Sainte-Marie<br />
                        La Réunion, France
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Contact
                      </h3>
                      <p className="text-green-800">
                        Téléphone : 0262 XX XX XX<br />
                        Email : contact@monster-phone-reunion.com
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Dirigeant</h2>
                <p>
                  <strong>Gérant :</strong> [Nom du gérant]<br />
                  <strong>Qualité :</strong> Gérant de la SARL Monster Phone Boutique
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-purple-600" />
                  4. Hébergement du site
                </h2>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-purple-900 mb-2">Hébergeur</h3>
                  <p className="text-purple-800 mb-4">
                    <strong>Vercel Inc.</strong><br />
                    340 S Lemon Ave #4133<br />
                    Walnut, CA 91789, États-Unis<br />
                    Site web : <a href="https://vercel.com" className="underline" target="_blank" rel="noopener noreferrer">vercel.com</a>
                  </p>
                  
                  <h3 className="font-semibold text-purple-900 mb-2">Informations techniques</h3>
                  <p className="text-purple-800">
                    <strong>Nom de domaine :</strong> monster-phone-boutique.fr<br />
                    <strong>Protocole :</strong> HTTPS (SSL/TLS)<br />
                    <strong>Localisation serveurs :</strong> Europe (RGPD compliant)
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-red-600" />
                  5. Propriété intellectuelle
                </h2>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">5.1 Droits d'auteur</h3>
                <p>
                  Le site monster-phone-boutique.fr, sa structure, son contenu, ses textes, images, 
                  sons, vidéos, et tous les éléments qui le composent sont protégés par le droit 
                  d'auteur et appartiennent à Monster Phone Boutique ou à ses partenaires.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">5.2 Marques</h3>
                <p>
                  Les marques "Monster Phone", "Monster Phone Boutique" et tous les logos associés 
                  sont des marques déposées de Monster Phone Boutique. Toute reproduction non 
                  autorisée constitue une contrefaçon.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">5.3 Marques partenaires</h3>
                <p>
                  Les marques HONOR, MUVIT, MY WAY et MONSTER sont des marques déposées de leurs 
                  propriétaires respectifs. Leur utilisation sur ce site est autorisée dans le 
                  cadre de notre partenariat commercial.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">6. Responsabilité</h2>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">6.1 Contenu du site</h3>
                <p>
                  Monster Phone Boutique s'efforce d'assurer l'exactitude des informations diffusées 
                  sur le site, mais ne peut garantir l'exactitude, la précision ou l'exhaustivité 
                  des informations mises à disposition.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">6.2 Disponibilité</h3>
                <p>
                  Monster Phone Boutique ne peut être tenue responsable des interruptions du site 
                  dues à des opérations de maintenance, des mises à jour, ou des défaillances 
                  techniques indépendantes de sa volonté.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">6.3 Liens externes</h3>
                <p>
                  Le site peut contenir des liens vers des sites tiers. Monster Phone Boutique 
                  n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant 
                  à leur contenu.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. Données personnelles</h2>
                <p>
                  La collecte et le traitement des données personnelles sont régis par notre 
                  <a href="/legal/confidentialite" className="text-blue-600 underline ml-1">
                    Politique de Confidentialité
                  </a>
                  , disponible sur le site.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">8. Cookies</h2>
                <p>
                  Le site utilise des cookies pour améliorer l'expérience utilisateur. 
                  Vous pouvez gérer vos préférences via le bandeau cookies ou les paramètres 
                  de votre navigateur.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">9. Droit applicable</h2>
                <p>
                  Les présentes mentions légales sont soumises au droit français. 
                  Tout litige relatif à l'utilisation du site relève de la compétence 
                  exclusive des tribunaux de Saint-Denis de La Réunion.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">10. Contact</h2>
                <p>
                  Pour toute question relative aux présentes mentions légales, vous pouvez 
                  nous contacter :
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Email : contact@monster-phone-reunion.com</li>
                  <li>Téléphone : 0262 XX XX XX</li>
                  <li>Courrier : Monster Phone Boutique - Zone Industrielle - 97438 Sainte-Marie</li>
                </ul>

                <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
                  <p className="text-gray-800 text-sm">
                    <strong className="text-gray-900">Monster Phone Boutique</strong> - Votre spécialiste en téléphonie gaming à La Réunion depuis 2018
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