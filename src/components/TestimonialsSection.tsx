'use client';

import { useState, useEffect } from 'react';

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah M.",
      location: "Saint-Denis",
      rating: 5,
      comment: "Très satisfaite de mon HONOR 200 PRO ! Livraison ultra rapide et le produit correspond parfaitement à la description. L'équipe support est au top !",
      product: "HONOR 200 PRO",
      verified: true
    },
    {
      name: "Marc L.",
      location: "Saint-Pierre",
      rating: 5,
      comment: "Les câbles lumineux MY-WAY sont géniaux ! Innovation au top, qualité excellente. Mes enfants adorent voir les cables s'illuminer quand ils chargent leurs appareils.",
      product: "Câbles MY-WAY",
      verified: true
    },
    {
      name: "Julie K.",
      location: "Le Tampon",
      rating: 5,
      comment: "Le casque Pika MUVIT fait fureur à la maison ! Mon fils de 6 ans ne le quitte plus. La limitation de volume rassure, la qualité audio est excellente.",
      product: "Casque MUVIT Pika",
      verified: true
    },
    {
      name: "Thomas R.",
      location: "Saint-Paul",
      rating: 5,
      comment: "Batterie MONSTER N-Lite 206 au top ! Charge super rapide, design premium. Parfaite pour mes sessions gaming intensives. Je recommande vivement !",
      product: "Batterie MONSTER",
      verified: true
    },
    {
      name: "Emma D.",
      location: "Saint-Louis",
      rating: 5,
      comment: "L'appareil photo KidPic de ma fille fait des merveilles ! Impression instantanée, qualité surprenante. Elle développe sa créativité en s'amusant.",
      product: "MUVIT KidPic",
      verified: true
    },
    {
      name: "Kevin P.",
      location: "Le Port",
      rating: 5,
      comment: "Service client exemplaire ! J'ai eu un souci avec ma commande, résolu en moins de 2h. Produits de qualité, prix corrects. Boutique de confiance !",
      product: "Service client",
      verified: true
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-2xl text-gray-800 max-w-2xl mx-auto">
            Découvrez l&apos;avis de nos clients qui ont choisi Monster Phone 
            pour leurs achats technologiques. Leur satisfaction est notre priorité.
          </p>
        </div>

        {/* Carousel principal */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="text-center">
              {/* Étoiles */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Commentaire */}
              <blockquote className="text-xl md:text-2xl text-gray-800 italic mb-6 leading-relaxed">
                &ldquo;{testimonials[currentTestimonial].comment}&rdquo;
              </blockquote>

              {/* Informations client */}
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="font-semibold text-lg text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-base text-gray-800 flex items-center justify-center space-x-2">
                    <span>{testimonials[currentTestimonial].location}</span>
                    {testimonials[currentTestimonial].verified && (
                      <>
                        <span>•</span>
                        <div className="flex items-center space-x-1 text-green-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Achat vérifié</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-base text-blue-600 font-medium">
                    {testimonials[currentTestimonial].product}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Résumé avis clients */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
            <div className="text-lg text-gray-800">Note moyenne</div>
            <div className="text-base text-gray-800 mt-1">Sur 2,847 avis</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-lg text-gray-800">Recommandent</div>
            <div className="text-base text-gray-800 mt-1">Monster Phone</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">24h</div>
            <div className="text-lg text-gray-800">Réponse SAV</div>
            <div className="text-base text-gray-800 mt-1">Temps moyen</div>
          </div>
        </div>

        {/* CTA avis */}
        <div className="text-center mt-8">
          <a 
            href="#" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir tous les avis clients
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}