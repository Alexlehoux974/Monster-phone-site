'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Headphones, 
  Shield, 
  Clock, 
  CheckCircle, 
  Settings, 
  RefreshCw,
  AlertTriangle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Star,
  Award,
  FileText
} from 'lucide-react';

export default function ServiceApresVentePage() {
  useEffect(() => {
    document.title = 'Service Après-Vente | Monster Phone Boutique SAV Réunion 974';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Service après-vente Monster Phone Boutique. Garantie, échange, réparation, assistance technique. SAV professionnel à La Réunion 974.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Service après-vente Monster Phone Boutique. Garantie, échange, réparation, assistance technique. SAV professionnel à La Réunion 974.';
      document.head.appendChild(meta);
    }
  }, []);

  const services = [
    {
      title: "Garantie constructeur",
      description: "Application et suivi des garanties fabricant",
      icon: Shield,
      color: "blue",
      details: ["Garantie de 1 à 3 ans selon produit", "Remplacement ou réparation", "Prise en charge complète"]
    },
    {
      title: "Échange défectueux",
      description: "Échange immédiat en cas de défaut",
      icon: RefreshCw,
      color: "green",
      details: ["Échange sous 15 jours", "Test immédiat", "Produit de remplacement"]
    },
    {
      title: "Réparations",
      description: "Atelier agréé et techniciens certifiés",
      icon: Settings,
      color: "purple",
      details: ["Diagnostic gratuit", "Devis transparent", "Pièces d'origine"]
    },
    {
      title: "Suivi personnalisé",
      description: "Accompagnement dédié après votre achat",
      icon: Star,
      color: "orange",
      details: ["Conseiller attitré", "Suivi proactif", "Historique complet"]
    }
  ];

  const garantieTypes = [
    {
      category: "Smartphones",
      duree: "2 ans",
      fabricants: ["HONOR", "MONSTER"],
      couverture: "Défauts de fabrication, écran, batterie, composants"
    },
    {
      category: "Accessoires",
      duree: "1 an",
      fabricants: ["MUVIT", "MY WAY"],
      couverture: "Défauts matériaux, fonctionnement normal"
    },
    {
      category: "Audio",
      duree: "2 ans",
      fabricants: ["MONSTER", "MY WAY"],
      couverture: "Qualité sonore, connectivité, durabilité"
    }
  ];

  const procedureSteps = [
    {
      step: 1,
      title: "Contactez-nous",
      description: "Par téléphone, email ou en magasin",
      icon: Phone
    },
    {
      step: 2,
      title: "Diagnostic",
      description: "Évaluation du problème par nos experts",
      icon: Settings
    },
    {
      step: 3,
      title: "Solution",
      description: "Réparation, échange ou remboursement",
      icon: CheckCircle
    },
    {
      step: 4,
      title: "Suivi",
      description: "Vérification de votre satisfaction",
      icon: Star
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
                SERVICE APRÈS-VENTE
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Service Après-Vente
              </h1>
              <p className="text-2xl text-gray-900 max-w-3xl mx-auto">
                Un service client d'excellence pour vous accompagner après votre achat
              </p>
              <div className="mt-4 text-sm text-gray-900">
                <Calendar className="w-4 h-4 inline mr-1" />
                Dernière mise à jour : 28 juillet 2025
              </div>
            </motion.div>

            {/* Engagement qualité */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8 text-center"
            >
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-2">Votre Satisfaction, Notre Priorité</h2>
              <p className="text-2xl mb-4">
                Service après-vente professionnel et réactif à La Réunion
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-3">
                  <Clock className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Réactivité</div>
                  <div className="text-sm">Réponse &lt; 2h</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <Shield className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Expertise</div>
                  <div className="text-sm">Techniciens certifiés</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <Star className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Qualité</div>
                  <div className="text-sm">Satisfaction 98%</div>
                </div>
              </div>
            </motion.div>

            {/* Nos services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-600" />
                Nos services après-vente
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className={`border rounded-lg p-6 ${getColorClasses(service.color)}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                            <IconComponent className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                          <p className="text-sm mb-3">{service.description}</p>
                          <ul className="space-y-1 text-xs">
                            {service.details.map((detail, i) => (
                              <li key={i} className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Garanties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                Garanties constructeur
              </h2>
              
              <div className="space-y-4">
                {garantieTypes.map((garantie, index) => (
                  <motion.div
                    key={garantie.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div className="flex items-center gap-3 mb-2 md:mb-0">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Shield className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{garantie.category}</h3>
                          <div className="text-sm text-gray-900">Marques: {garantie.fabricants.join(', ')}</div>
                        </div>
                      </div>
                      <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Garantie {garantie.duree}
                      </div>
                    </div>
                    <p className="text-gray-900 text-sm">
                      <strong>Couverture :</strong> {garantie.couverture}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">Important</h4>
                    <p className="text-amber-900 text-sm">
                      La garantie ne couvre pas les dommages dus à une mauvaise utilisation, chute, contact avec l'eau ou usure normale. Conservez votre facture d'achat.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Procédure SAV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-600" />
                Procédure de prise en charge
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {procedureSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-purple-600" />
                      </div>
                      <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                        {step.step}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-900">{step.description}</p>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Délais de traitement</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-900"><strong>Diagnostic :</strong> 24-48h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-gray-900"><strong>Réparation :</strong> 3-7 jours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-900"><strong>Échange :</strong> Immédiat si stock</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Types de problèmes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Problèmes fréquents et solutions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    Problèmes techniques
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="text-gray-900">• Écran cassé ou qui ne s'allume plus</li>
                    <li className="text-gray-900">• Batterie qui se décharge rapidement</li>
                    <li className="text-gray-900">• Problème de charge ou connecteur défaillant</li>
                    <li className="text-gray-900">• Dysfonctionnement du son ou micro</li>
                    <li className="text-gray-900">• Appareil photo ou caméra défectueuse</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-green-600" />
                    Solutions proposées
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="text-gray-900">• Réparation avec pièces d'origine</li>
                    <li className="text-gray-900">• Échange standard si sous garantie</li>
                    <li className="text-gray-900">• Diagnostic approfondi gratuit</li>
                    <li className="text-gray-900">• Devis transparent avant intervention</li>
                    <li className="text-gray-900">• Suivi personnalisé de la réparation</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Contact SAV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 text-center"
            >
              <Headphones className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Contactez notre SAV</h2>
              <p className="text-xl mb-6">
                Une question ? Un problème ? Notre équipe vous accompagne
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-4">
                  <Phone className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Hotline SAV</div>
                  <div>0262 XX XX XX<br />Lun-Sam 9h-18h</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <Mail className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Email SAV</div>
                  <div>sav@<br />monster-phone-reunion.com</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <MapPin className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Atelier</div>
                  <div>Zone Industrielle<br />Sainte-Marie</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-sm">
                  <strong>Horaires SAV :</strong> Lundi au Samedi de 9h à 18h<br />
                  <strong>Urgences :</strong> Service de garde weekends et jours fériés
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
}