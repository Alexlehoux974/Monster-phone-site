'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Merci de votre inscription !</h3>
            <p className="text-white/90">
              Vous recevrez bientôt nos meilleures offres et nouveautés directement dans votre boîte mail.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenu */}
            <div className="text-left lg:text-left">
              <h2 className="text-3xl font-bold mb-4">
                Restez connecté à l&apos;innovation
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Soyez les premiers informés de nos nouveautés, promotions exclusives 
                et conseils tech. Rejoignez plus de 15 000 passionnés !
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">Offres exclusives réservées aux abonnés</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">Nouveautés en avant-première</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">Conseils et guides d&apos;experts</span>
                </div>
              </div>

              {/* Bonus inscription */}
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                <div className="flex items-center">
                  <div className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold mr-3">
                    BONUS
                  </div>
                  <span className="text-white/90 font-medium">
                    -10% sur votre première commande
                  </span>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="newsletter-email" className="block text-sm font-medium text-white/90 mb-2">
                    Votre adresse email
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="newsletter-consent"
                    required
                    className="mt-1 rounded border-white/30 bg-white/20 text-blue-600 focus:ring-white/50"
                  />
                  <label htmlFor="newsletter-consent" className="text-sm text-white/80">
                    J&apos;accepte de recevoir les communications marketing de Monster Phone 
                    et je confirme avoir lu la{' '}
                    <a href="#" className="underline hover:text-white">politique de confidentialité</a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Inscription...
                    </>
                  ) : (
                    <>
                      S&apos;inscrire maintenant
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Social proof */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center space-x-4 text-white/70">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-blue-300 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-green-300 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-purple-300 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-pink-300 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-sm">
                    <strong className="text-white">15 247</strong> passionnés déjà inscrits
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}