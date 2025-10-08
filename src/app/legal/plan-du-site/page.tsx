'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  Map, 
  Home, 
  Package, 
  ShoppingBag, 
  Calendar,
  Phone,
  FileText,
  Shield,
  Clock,
  Smartphone,
  Headphones,
  Gift,
  Wrench,
  ArrowRight
} from 'lucide-react';

export default function PlanDuSitePage() {
  useEffect(() => {
    document.title = 'Plan du Site | Monster Phone Boutique Navigation La Réunion';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Plan du site Monster Phone Boutique. Retrouvez facilement toutes les sections : smartphones gaming, accessoires, promotions, contact, pages légales.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Plan du site Monster Phone Boutique. Retrouvez facilement toutes les sections : smartphones gaming, accessoires, promotions, contact, pages légales.';
      document.head.appendChild(meta);
    }
  }, []);

  const siteStructure = [
    {
      title: "Accueil",
      icon: Home,
      url: "/",
      description: "Page d'accueil avec nos dernières nouveautés",
      color: "blue"
    },
    {
      title: "Nos Produits",
      icon: Package,
      url: "/nos-produits",
      description: "Catalogue complet de nos produits",
      color: "green",
      subcategories: [
        { name: "Smartphones Gaming", url: "/nos-produits?category=smartphones" },
        { name: "Accessoires", url: "/nos-produits?category=accessoires" },
        { name: "Montres Connectées", url: "/nos-produits?category=montres" },
        { name: "Audio Gaming", url: "/nos-produits?category=audio" }
      ]
    },
    {
      title: "Accessoires",
      icon: Headphones,
      url: "/accessoires",
      description: "Découvrez notre gamme d'accessoires gaming",
      color: "purple"
    },
    {
      title: "Promotions",
      icon: Gift,
      url: "/promotions",
      description: "Toutes nos offres spéciales et réductions",
      color: "red"
    },
    {
      title: "Réparation",
      icon: Wrench,
      url: "/reparation",
      description: "Services de réparation express",
      color: "orange"
    },
    {
      title: "Contact",
      icon: Phone,
      url: "/contact",
      description: "Nous contacter à La Réunion",
      color: "teal"
    }
  ];

  const legalPages = [
    {
      title: "Conditions Générales",
      url: "/legal/conditions-generales",
      description: "Conditions générales de vente"
    },
    {
      title: "Politique de Confidentialité",
      url: "/legal/confidentialite",
      description: "Protection de vos données personnelles"
    },
    {
      title: "Mentions Légales",
      url: "/legal/mentions-legales",
      description: "Informations légales de l&apos;entreprise"
    },
    {
      title: "Plan du Site",
      url: "/legal/plan-du-site",
      description: "Architecture complète du site"
    }
  ];

  const brands = ["HONOR", "MY WAY", "MUVIT", "MONSTER"];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      green: "bg-green-50 border-green-200 text-green-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      red: "bg-red-50 border-red-200 text-red-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      teal: "bg-teal-50 border-teal-200 text-teal-800"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <div className="pt-[110px]">
          <Header />
        </div>
        
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
                <Map className="w-4 h-4" />
                NAVIGATION SITE
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Plan du Site
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Retrouvez facilement toutes les sections de Monster Phone Boutique
              </p>
              <div className="mt-4 text-sm text-gray-700">
                <Calendar className="w-4 h-4 inline mr-1" />
                Dernière mise à jour : 28 juillet 2025
              </div>
            </motion.div>

            {/* Navigation principale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Map className="w-6 h-6 text-blue-600" />
                Navigation principale
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {siteStructure.map((section, index) => {
                  const IconComponent = section.icon;
                  return (
                    <motion.div
                      key={section.url}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      className={`border rounded-lg p-6 ${getColorClasses(section.color)}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <Link 
                            href={section.url}
                            className="text-lg font-semibold hover:underline inline-flex items-center gap-2"
                          >
                            {section.title}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <p className="text-sm mt-1 opacity-80">
                            {section.description}
                          </p>
                          
                          {section.subcategories && (
                            <div className="mt-4 space-y-2">
                              <p className="text-sm font-medium">Sous-catégories :</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {section.subcategories.map((sub) => (
                                  <Link
                                    key={sub.url}
                                    href={sub.url}
                                    className="text-sm hover:underline flex items-center gap-1"
                                  >
                                    <ArrowRight className="w-3 h-3" />
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Marques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-green-600" />
                Nos marques
              </h2>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <p className="text-gray-700 mb-4">
                  Découvrez tous nos produits par marque :
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {brands.map((brand) => (
                    <Link
                      key={brand}
                      href={`/nos-produits?brand=${brand}`}
                      className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 text-center transition-colors group"
                    >
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {brand}
                      </div>
                      <ArrowRight className="w-4 h-4 mx-auto mt-2 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Pages légales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-600" />
                Pages légales
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {legalPages.map((page) => (
                  <Link
                    key={page.url}
                    href={page.url}
                    className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {page.title}
                        </div>
                        <div className="text-sm text-gray-700 mt-1">
                          {page.description}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-orange-600" />
                Nos services
              </h2>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Livraison 48h</h3>
                    <p className="text-sm text-gray-700">Partout à La Réunion, gratuit dès 50€</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Wrench className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Réparations</h3>
                    <p className="text-sm text-gray-700">Atelier agréé, réparations express</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Phone className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
                    <p className="text-sm text-gray-700">Équipe technique dédiée</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Footer info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center"
            >
              <h2 className="text-2xl font-bold mb-4">
                Monster Phone Boutique
              </h2>
              <p className="text-lg opacity-90 mb-4">
                Votre spécialiste en téléphonie gaming à La Réunion
              </p>
              <div className="flex items-center justify-center gap-4 text-sm opacity-80">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Ouvert 6j/7
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  02 62 02 51 02
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