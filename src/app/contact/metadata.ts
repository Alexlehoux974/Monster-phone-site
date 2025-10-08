import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Monster Phone Boutique La Réunion | Téléphones Gaming 974',
  description: 'Contactez Monster Phone Boutique à La Réunion. Spécialiste smartphones gaming HONOR, accessoires MUVIT. 16 Rue Claude Chappe, ZAE 2000, 97290 Le Port. Tel: 02 62 02 51 02',
  keywords: [
    'contact monster phone',
    'téléphone gaming réunion',
    'boutique smartphone 974',
    'le port réunion',
    'honor réunion',
    'réparation téléphone réunion',
    'accessoires gaming réunion'
  ],
  authors: [{ name: 'Monster Phone Boutique' }],
  creator: 'Monster Phone Boutique',
  publisher: 'Monster Phone Boutique',
  openGraph: {
    title: 'Contact Monster Phone Boutique La Réunion',
    description: 'Contactez votre spécialiste en téléphones gaming à La Réunion. Showroom au Port, livraison 48h dans toute l\'île.',
    url: 'https://monster-phone-boutique.fr/contact',
    siteName: 'Monster Phone Boutique',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/LOGO-MONSTER-PHONE.png',
        width: 1200,
        height: 630,
        alt: 'Monster Phone Boutique - Contact La Réunion'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Monster Phone Boutique La Réunion',
    description: 'Contactez votre spécialiste en téléphones gaming à La Réunion. Showroom au Port.',
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
    canonical: 'https://monster-phone-boutique.fr/contact'
  },
  other: {
    'geo.region': 'RE',
    'geo.placename': 'Le Port, La Réunion',
    'geo.position': '-20.94;55.29'
  }
};