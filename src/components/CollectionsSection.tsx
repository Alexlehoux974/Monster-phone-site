'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CollectionsSection() {
  const collections = [
    {
      title: "Smartphones Gaming",
      description: "Découvrez nos smartphones HONOR conçus pour les performances maximales en gaming",
      image: "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Images/200-Pro/HONOR-200-PRO-1280x800-1.jpg",
      link: "/nos-produits?category=Smartphones",
      badge: "Nouveau",
      color: "from-blue-600 to-purple-600",
      features: ["Processeur haute performance", "Écran 120Hz", "Batterie longue durée"]
    },
    {
      title: "Univers Enfants",
      description: "Casques audio, appareils photo... Des produits ludiques et sécurisés pour les petits",
      image: "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Pika/CASQUE_PIKA.jpg",
      link: "/accessoires?category=enfants",
      badge: "Populaire",
      color: "from-pink-500 to-orange-500",
      features: ["Protection auditive", "Design amusant", "Qualité premium"]
    },
    {
      title: "Innovation & Tech",
      description: "Câbles lumineux, batteries premium... L'innovation technologique à portée de main",
      image: "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MY-WAY/Images/Cables-Lumineux/USB-C-Lightning/CABLE_USB-C_LIGHTNING.jpg",
      link: "/accessoires?category=innovation",
      badge: "Exclusif",
      color: "from-green-500 to-teal-600",
      features: ["Éclairage LED", "Charge rapide", "Design premium"]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Nos Collections
          </h2>
          <p className="text-2xl text-gray-700 max-w-2xl mx-auto">
            Explorez nos univers dédiés à chaque passion. Du gaming aux enfants, 
            en passant par l&apos;innovation, trouvez la collection qui vous correspond.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              {/* Image de fond */}
              <div className="relative h-96 bg-gray-200">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                
                {/* Overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {collection.badge}
                  </span>
                </div>

                {/* Contenu */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-4xl font-bold mb-2 group-hover:transform group-hover:translate-y-[-4px] transition-transform duration-300">
                    {collection.title}
                  </h3>
                  
                  <p className="text-xl text-white mb-4 leading-relaxed">
                    {collection.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1 mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {collection.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-lg text-white">
                        <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link 
                    href={collection.link}
                    className="inline-flex items-center bg-white text-gray-900 px-7 py-4 text-lg rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                  >
                    Découvrir
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section marques partenaires */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8">
            Nos marques partenaires
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="text-4xl font-bold text-gray-800">HONOR</div>
            <div className="text-4xl font-bold text-gray-800">MUVIT</div>
            <div className="text-4xl font-bold text-gray-800">MY WAY</div>
            <div className="text-4xl font-bold text-gray-800">MONSTER</div>
          </div>
          <p className="text-lg text-gray-700 mt-4">
            Partenaires officiels pour vous garantir l&apos;authenticité de tous nos produits
          </p>
        </div>
      </div>
    </section>
  );
}