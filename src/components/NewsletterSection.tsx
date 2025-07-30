'use client';

import { useState, useEffect, useRef } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(86400); // 24h en secondes
  const [subscriberCount, setSubscriberCount] = useState(15200);
  const sectionRef = useRef<HTMLElement>(null);

  // Animation d'apparition au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCounterAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation du compteur d'abonnés
  const startCounterAnimation = () => {
    let current = 15200;
    const target = 15247;
    const duration = 2000;
    const increment = (target - current) / (duration / 50);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setSubscriberCount(target);
        clearInterval(timer);
      } else {
        setSubscriberCount(Math.floor(current));
      }
    }, 50);
  };

  // Compte à rebours de l&apos;offre
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hrs, mins, secs };
  };

  const { hrs, mins, secs } = formatTime(countdown);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'inscription newsletter
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        {/* Particules animées de succès */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '3s'
              }}
            >
              <div className="w-2 h-2 bg-yellow-300 rounded-full opacity-70"></div>
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl animate-bounce">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-5xl font-bold text-white mb-4 animate-fade-in">
              🎉 Félicitations ! Inscription réussie !
            </h3>
            <p className="text-3xl text-white/90 mb-6">
              Votre code promo <strong className="text-yellow-300">WELCOME10</strong> vous attend dans votre boîte mail !
            </p>
            <div className="bg-yellow-400/20 border border-yellow-300/50 rounded-lg p-4">
              <p className="text-xl text-white font-medium">
                ✨ Première surprise : Livraison gratuite sur votre première commande
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden"
    >
      {/* Effets de fond animés */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Grille de points décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 gap-4 h-full">
          {[...Array(144)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: `${(i * 0.1)}s`}}></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-white">
          {/* Badge d&apos;urgence flottant */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-red-500/90 backdrop-blur-lg text-white px-6 py-2 rounded-full font-bold animate-bounce border border-red-400/50">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
              🔥 OFFRE LIMITÉE - Plus que {hrs.toString().padStart(2, '0')}h {mins.toString().padStart(2, '0')}m {secs.toString().padStart(2, '0')}s
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Contenu amélioré */}
            <div className={`text-left lg:text-left transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                <h2 className="text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent leading-tight">
                  💥 Club VIP Monster Phone
                </h2>
              </div>
              
              <p className="text-3xl lg:text-4xl text-white/95 mb-8 font-medium leading-relaxed">
                Rejoignez l&apos;élite tech ! <span className="text-yellow-300 font-bold">{subscriberCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span> membres profitent déjà d&apos;avantages exclusifs.
              </p>
              
              {/* Avantages avec animations */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: '🎁', text: 'Offres flash exclusives jusqu\'à -70%', delay: '0.2s' },
                  { icon: '⚡', text: 'Accès prioritaire aux nouveautés tech', delay: '0.4s' },
                  { icon: '🏆', text: 'Conseils VIP de nos experts gaming', delay: '0.6s' },
                  { icon: '🚀', text: 'Livraison express gratuite à vie', delay: '0.8s' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center group hover:scale-105 transition-all duration-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                    style={{ transitionDelay: item.delay }}
                  >
                    <div className="text-2xl mr-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-white/95 font-medium text-2xl group-hover:text-yellow-300 transition-colors">{item.text}</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Offres spéciales empilées */}
              <div className="space-y-3">
                {/* Bonus principal */}
                <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-lg rounded-xl p-5 border border-yellow-300/30 hover:scale-105 transition-transform animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-black mr-3 animate-bounce">
                        🎯 BONUS VIP
                      </div>
                      <span className="text-white font-bold text-2xl">
                        -15% sur votre première commande
                      </span>
                    </div>
                    <div className="text-yellow-300 font-bold text-2xl">💰</div>
                  </div>
                </div>
                
                {/* Bonus secondaire */}
                <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 backdrop-blur-lg rounded-xl p-4 border border-green-300/30">
                  <div className="flex items-center">
                    <div className="bg-green-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold mr-3">
                      CADEAU
                    </div>
                    <span className="text-white/95 font-medium text-xl">
                      + Coque protection offerte (valeur 25€)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire premium */}
            <div className={`bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl transform transition-all duration-1000 hover:scale-105 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              {/* En-tête du formulaire */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3 animate-spin" style={{animationDuration: '3s'}}>
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">Rejoindre le Club VIP</h3>
                <p className="text-2xl text-white/80">Accès immédiat aux avantages exclusifs</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <label htmlFor="newsletter-email" className="block text-lg font-semibold text-white/90 mb-3">
                    🎯 Votre email VIP
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="newsletter-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                      className="w-full px-6 py-4 rounded-xl bg-white/25 border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 text-xl font-medium"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/10 rounded-lg p-3">
                  <input
                    type="checkbox"
                    id="newsletter-consent"
                    required
                    className="mt-1 rounded border-white/30 bg-white/20 text-yellow-500 focus:ring-yellow-400/50 w-5 h-5"
                  />
                  <label htmlFor="newsletter-consent" className="text-lg text-white/90 leading-relaxed">
                    ✅ J&apos;accepte de recevoir les offres VIP Monster Phone et j&apos;ai lu la{' '}
                    <a href="#" className="underline hover:text-yellow-300 transition-colors">politique de confidentialité</a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-5 rounded-xl font-black text-2xl hover:from-yellow-300 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl border-2 border-yellow-300/50"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Activation du compte VIP...
                    </>
                  ) : (
                    <>
                      🚀 DEVENIR MEMBRE VIP
                      <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Social proof amélioré */}
              <div className="mt-8 pt-6 border-t border-white/20">
                {/* Compteur animé */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center bg-green-500/20 backdrop-blur-lg rounded-full px-4 py-2 border border-green-400/30">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-green-300 font-bold text-xl">
                      {subscriberCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} membres VIP actifs
                    </span>
                  </div>
                </div>
                
                {/* Avatars avec mouvement */}
                <div className="flex items-center justify-center space-x-6 text-white/80">
                  <div className="flex -space-x-3">
                    {[
                      'bg-gradient-to-r from-blue-400 to-blue-600',
                      'bg-gradient-to-r from-green-400 to-green-600', 
                      'bg-gradient-to-r from-purple-400 to-purple-600',
                      'bg-gradient-to-r from-pink-400 to-pink-600',
                      'bg-gradient-to-r from-yellow-400 to-yellow-600'
                    ].map((bg, i) => (
                      <div 
                        key={i} 
                        className={`w-10 h-10 ${bg} rounded-full border-3 border-white shadow-lg hover:scale-110 transition-transform animate-pulse`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                    <div className="w-10 h-10 bg-white/20 rounded-full border-3 border-white flex items-center justify-center text-xs font-bold">+{Math.floor(subscriberCount/100)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold text-xl">⭐ 4.9/5</div>
                    <div className="text-white/70 text-base">Satisfaction client</div>
                  </div>
                </div>
                
                {/* Testimonial rapide */}
                <div className="mt-4 bg-white/10 rounded-lg p-3 border border-white/20">
                  <p className="text-white/90 text-base italic text-center">
                    &quot;Meilleur site tech de la Réunion ! Livraison ultra rapide 🚀&quot;
                  </p>
                  <p className="text-white/70 text-sm text-center mt-1">- Sarah M., membre VIP depuis 2023</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Garanties de confiance en bas */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🔒', title: 'Données Sécurisées', desc: 'SSL 256-bit' },
              { icon: '🎁', title: 'Sans Engagement', desc: 'Désinscription 1-clic' },
              { icon: '⚡', title: 'Livraison Express', desc: '24h partout' },
              { icon: '🏆', title: 'Garantie Qualité', desc: '2 ans minimum' }
            ].map((item, index) => (
              <div 
                key={index}
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:scale-105 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${1 + (index * 0.1)}s` }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-white text-base">{item.title}</div>
                <div className="text-white/70 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}