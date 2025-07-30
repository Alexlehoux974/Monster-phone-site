'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Monitor, 
  Smartphone, 
  Wifi, 
  Settings, 
  HelpCircle, 
  MessageCircle,
  Video,
  Calendar,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  BookOpen,
  Users,
  Zap
} from 'lucide-react';

export default function SupportTechniquePage() {
  useEffect(() => {
    document.title = 'Support Technique | Assistance Monster Phone Boutique Réunion 974';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Support technique Monster Phone Boutique. Assistance personnalisée, formation, dépannage, configuration. Experts en téléphonie gaming à La Réunion.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Support technique Monster Phone Boutique. Assistance personnalisée, formation, dépannage, configuration. Experts en téléphonie gaming à La Réunion.';
      document.head.appendChild(meta);
    }
  }, []);

  const supportServices = [
    {
      title: "Configuration initiale",
      description: "Paramétrage complet de votre nouvel appareil",
      icon: Settings,
      color: "blue",
      services: ["Transfert de données", "Installation d'applications", "Configuration comptes", "Personnalisation interface"]
    },
    {
      title: "Formation utilisateur",
      description: "Accompagnement personnalisé pour maîtriser votre appareil",
      icon: BookOpen,
      color: "green",
      services: ["Fonctions de base", "Applications spécialisées", "Optimisation gaming", "Trucs et astuces"]
    },
    {
      title: "Dépannage à distance",
      description: "Résolution de problèmes par téléphone ou visio",
      icon: Video,
      color: "purple",
      services: ["Diagnostic en ligne", "Réparation logicielle", "Mise à jour système", "Récupération données"]
    },
    {
      title: "Support gaming",
      description: "Expertise dédiée aux performances gaming",
      icon: Monitor,
      color: "orange",
      services: ["Optimisation FPS", "Configuration contrôleurs", "Streaming setup", "Performance analysis"]
    }
  ];

  const faq = [
    {
      question: "Mon téléphone se décharge trop rapidement",
      answer: "Vérifiez les applications en arrière-plan, réduisez la luminosité, désactivez les services non utilisés. Notre équipe peut effectuer un diagnostic approfondi."
    },
    {
      question: "Comment optimiser mon smartphone pour le gaming ?",
      answer: "Activez le mode performance, fermez les applications inutiles, utilisez un refroidisseur si nécessaire. Nous proposons une configuration gaming personnalisée."
    },
    {
      question: "Problème de connexion WiFi",
      answer: "Redémarrez le routeur et le téléphone, oubliez et reconnectez le réseau, vérifiez les paramètres proxy. Support technique disponible."
    },
    {
      question: "Comment transférer mes données vers mon nouveau téléphone ?",
      answer: "Utilisez les outils de migration intégrés, le cloud ou notre service de transfert en magasin. Accompagnement gratuit pour nos clients."
    }
  ];

  const supportChannels = [
    {
      title: "Hotline technique",
      description: "Assistance téléphonique immédiate",
      icon: Phone,
      availability: "Lun-Sam 8h-20h",
      response: "< 30 secondes",
      color: "blue"
    },
    {
      title: "Chat en ligne",
      description: "Support instantané par messagerie",
      icon: MessageCircle,
      availability: "24h/7j",
      response: "< 2 minutes",
      color: "green"
    },
    {
      title: "Prise en main à distance",
      description: "Connexion directe à votre appareil",
      icon: Video,
      availability: "Sur RDV",
      response: "Temps réel",
      color: "purple"
    },
    {
      title: "Intervention sur site",
      description: "Déplacement chez vous ou en entreprise",
      icon: Users,
      availability: "Lun-Ven",
      response: "24-48h",
      color: "orange"
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
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Monitor className="w-4 h-4" />
                SUPPORT TECHNIQUE
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Support Technique
              </h1>
              <p className="text-2xl text-gray-900 max-w-3xl mx-auto">
                Assistance technique experte pour tous vos appareils gaming et téléphonie
              </p>
              <div className="mt-4 text-sm text-gray-900">
                <Calendar className="w-4 h-4 inline mr-1" />
                Dernière mise à jour : 28 juillet 2025
              </div>
            </motion.div>

            {/* Expertise technique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 mb-8 text-center"
            >
              <Zap className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-2">Expertise Technique Gaming</h2>
              <p className="text-2xl mb-4">
                Nos techniciens certifiés vous accompagnent pour optimiser vos performances
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-3">
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Équipe dédiée</div>
                  <div className="text-sm">5 techniciens experts</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <Clock className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Disponibilité</div>
                  <div className="text-sm">6 jours / 7</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Satisfaction</div>
                  <div className="text-sm">99% de réussite</div>
                </div>
              </div>
            </motion.div>

            {/* Services de support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-600" />
                Nos services de support
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportServices.map((service, index) => {
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
                            {service.services.map((item, i) => (
                              <li key={i} className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 flex-shrink-0" />
                                {item}
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

            {/* Canaux de support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-green-600" />
                Canaux de support disponibles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportChannels.map((channel, index) => {
                  const IconComponent = channel.icon;
                  return (
                    <motion.div
                      key={channel.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className={`border rounded-lg p-4 ${getColorClasses(channel.color)}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{channel.title}</h3>
                          <p className="text-xs">{channel.description}</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div><strong>Disponibilité :</strong> {channel.availability}</div>
                        <div><strong>Temps de réponse :</strong> {channel.response}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* FAQ Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-purple-600" />
                Support FAQ - Questions fréquentes
              </h2>
              
              <div className="space-y-4">
                {faq.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      {item.question}
                    </h3>
                    <p className="text-gray-800 text-sm pl-7">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-800 text-sm">
                  Vous ne trouvez pas la réponse à votre question ? 
                  <br />
                  <strong>Contactez directement notre support technique !</strong>
                </p>
              </div>
            </motion.div>

            {/* Services spécialisés */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-orange-600" />
                Services spécialisés
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Download className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mise à jour firmware</h3>
                  <p className="text-sm text-gray-800">
                    Installation des dernières versions système et correction de bugs
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Wifi className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Configuration réseau</h3>
                  <p className="text-sm text-gray-800">
                    Paramétrage WiFi, 4G/5G, VPN et optimisation connexion
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Monitor className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Setup gaming</h3>
                  <p className="text-sm text-gray-800">
                    Configuration optimale pour les jeux mobiles et streaming
                  </p>
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
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Informations support technique</h3>
                  <ul className="space-y-2 text-amber-800 text-sm">
                    <li>• <strong>Support gratuit :</strong> Pendant la période de garantie constructeur</li>
                    <li>• <strong>Intervention payante :</strong> Après garantie ou problème utilisateur</li>
                    <li>• <strong>Devis préalable :</strong> Toujours fourni avant intervention</li>
                    <li>• <strong>Pièces de rechange :</strong> Originales ou compatibles certifiées</li>
                    <li>• <strong>Données personnelles :</strong> Sauvegarde recommandée avant intervention</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Contact support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center"
            >
              <Monitor className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Besoin d'assistance technique ?</h2>
              <p className="text-xl mb-6">
                Nos experts sont à votre disposition pour résoudre tous vos problèmes
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-4">
                  <Phone className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Hotline technique</div>
                  <div>0262 XX XX XX<br />Lun-Sam 8h-20h</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <Mail className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Email support</div>
                  <div>support@<br />monster-phone-reunion.com</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <MessageCircle className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Chat en ligne</div>
                  <div>Disponible 24h/7j<br />Réponse immédiate</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-sm">
                  <strong>Service d'urgence :</strong> Intervention express sous 2H pour les professionnels<br />
                  <strong>Formation sur site :</strong> Déplacement pour formation d'équipes en entreprise
                </p>
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