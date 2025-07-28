import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Monster Phone Boutique La Réunion | Téléphones Gaming 974',
  description: 'Contactez Monster Phone Boutique à La Réunion. Spécialiste smartphones gaming HONOR, accessoires MUVIT. Zone Industrielle Sainte-Marie 97438. Tel: 0262 XX XX XX',
  keywords: [
    'contact monster phone',
    'téléphone gaming réunion',
    'boutique smartphone 974',
    'sainte marie réunion',
    'honor réunion',
    'réparation téléphone réunion',
    'accessoires gaming réunion'
  ],
  authors: [{ name: 'Monster Phone Boutique' }],
  creator: 'Monster Phone Boutique',
  publisher: 'Monster Phone Boutique',
  openGraph: {
    title: 'Contact Monster Phone Boutique La Réunion',
    description: 'Contactez votre spécialiste en téléphones gaming à La Réunion. Showroom à Sainte-Marie, livraison 48h dans toute l\'île.',
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
    description: 'Contactez votre spécialiste en téléphones gaming à La Réunion. Showroom à Sainte-Marie.',
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
    'geo.placename': 'Sainte-Marie, La Réunion',
    'geo.position': '-20.9;55.5'
  }
};