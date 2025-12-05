'use client';

import { Truck, Shield, CreditCard, RotateCcw } from 'lucide-react';

const trustItems = [
  {
    icon: Truck,
    title: 'Livraison Express',
    subtitle: '24/48h La Réunion',
  },
  {
    icon: Shield,
    title: 'Garantie 2 ans',
    subtitle: 'Constructeur',
  },
  {
    icon: CreditCard,
    title: 'Paiement Sécurisé',
    subtitle: 'SSL 256 bits',
  },
  {
    icon: RotateCcw,
    title: 'Retours Gratuits',
    subtitle: '30 jours',
  },
];

const TrustBarCompact = () => {
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-3 md:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBarCompact;
