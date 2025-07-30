'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function TrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    clients: 0,
    rating: 0,
    delivery: 0,
    satisfaction: 0
  });
  const statsRef = useRef<HTMLDivElement>(null);

  const finalStats = {
    clients: 16472,
    rating: 4.8,
    delivery: 24,
    satisfaction: 98
  };

  const animateNumbers = useCallback(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        clients: Math.floor(finalStats.clients * easeOut),
        rating: parseFloat((finalStats.rating * easeOut).toFixed(1)),
        delivery: Math.floor(finalStats.delivery * easeOut),
        satisfaction: Math.floor(finalStats.satisfaction * easeOut)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(finalStats);
      }
    }, stepDuration);
  }, [finalStats]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, animateNumbers]);

  const trustFeatures = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Livraison Express",
      description: "partout à la Réunion",
      detail: "24h/48H - Gratuite dès 50€ d&apos;achat"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Garantie Constructeur",
      description: "2 ans minimum sur tous nos produits",
      detail: "Extension possible jusqu&apos;à 3 ans"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h2a8 8 0 108 8v2a8 8 0 11-8-8V10zm8 8V10h2a8 8 0 108 8v2a8 8 0 11-8-8V10z" />
        </svg>
      ),
      title: "Support Technique",
      description: "Assistance 7j/7 par téléphone",
      detail: "Équipe d&apos;experts à votre service"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Retour Facile",
      description: "30 jours pour changer d&apos;avis",
      detail: "Remboursement intégral garanti"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Paiement Sécurisé",
      description: "SSL 256 bits - Données protégées",
      detail: "CB, Visa, Mastercard, PayPal"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Produits Authentiques",
      description: "100% originaux et certifiés",
      detail: "Partenaire officiel des marques"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-1">
                {feature.description}
              </p>
              <p className="text-sm text-blue-600 font-medium">
                {feature.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Statistiques avec animations */}
        <div 
          ref={statsRef}
          className="mt-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative"
        >
          {/* Effet de fond animé */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">
              Nos Chiffres Clés
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl lg:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                  {animatedStats.clients.toLocaleString('fr-FR')}
                </div>
                <div className="text-white text-sm lg:text-base font-medium">
                  Clients satisfaits
                </div>
              </div>
              
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl lg:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-100">
                  {animatedStats.rating}/5
                </div>
                <div className="text-white text-sm lg:text-base font-medium">
                  Note moyenne
                </div>
              </div>
              
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl lg:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-100">
                  24/48
                </div>
                <div className="text-white text-sm lg:text-base font-medium">
                  Livraison 24h à 48h
                </div>
              </div>
              
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl lg:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-100">
                  {animatedStats.satisfaction}%
                </div>
                <div className="text-white text-sm lg:text-base font-medium">
                  Taux de satisfaction
                </div>
              </div>
            </div>
            
            {/* Indicateurs visuels supplémentaires */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Service actif 24h/7j</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>Livraison express</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Support technique dédié</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}