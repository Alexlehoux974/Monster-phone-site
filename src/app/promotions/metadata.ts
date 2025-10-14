import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Promotions Monster Phone | Smartphones Gaming en Promo La Réunion 974',
  description: 'Découvrez nos promotions exceptionnelles sur les smartphones gaming HONOR, accessoires MUVIT et montres connectées. Livraison gratuite dès 50€ à La Réunion.',
  keywords: [
    'promotions smartphone réunion',
    'téléphone gaming promo 974',
    'honor promotion réunion',
    'accessoires gaming pas cher',
    'montres connectées promo',
    'soldes téléphone réunion',
    'offres spéciales monster phone'
  ],
  authors: [{ name: 'Monster Phone Boutique' }],
  creator: 'Monster Phone Boutique',
  publisher: 'Monster Phone Boutique',
  openGraph: {
    title: 'Promotions Smartphones Gaming | Monster Phone Boutique Réunion',
    description: 'Profitez de nos promotions exceptionnelles sur les smartphones gaming et accessoires. Jusqu\'à -20% sur une sélection de produits.',
    url: 'https://monster-phone.re/promotions',
    siteName: 'Monster Phone Boutique',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/LOGO-MONSTER-PHONE.png',
        width: 1200,
        height: 630,
        alt: 'Promotions Monster Phone Boutique La Réunion'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Promotions Smartphones Gaming La Réunion',
    description: 'Profitez de nos promotions exceptionnelles sur les smartphones gaming et accessoires.',
    images: ['/LOGO-MONSTER-PHONE.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://monster-phone.re/promotions'
  },
  other: {
    'geo.region': 'RE',
    'geo.placename': 'La Réunion',
    'priceRange': '€€'
  }
};