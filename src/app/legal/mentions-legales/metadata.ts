import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales | Monster Phone Boutique SARL La Réunion 974',
  description: 'Mentions légales de Monster Phone Boutique SARL. SIRET 512 455 726 RCS Saint-Denis. 16 Rue Claude Chappe, ZAE 2000, 97290 Le Port, La Réunion.',
  keywords: [
    'mentions légales monster phone',
    'sarl réunion 974',
    'siret monster phone',
    'entreprise le port réunion',
    'boutique téléphone légal',
    'informations juridiques'
  ],
  authors: [{ name: 'Monster Phone Boutique' }],
  creator: 'Monster Phone Boutique',
  publisher: 'Monster Phone Boutique',
  openGraph: {
    title: 'Mentions Légales | Monster Phone Boutique',
    description: 'Informations légales de Monster Phone Boutique, spécialiste téléphones gaming La Réunion.',
    url: 'https://monster-phone-boutique.fr/legal/mentions-legales',
    siteName: 'Monster Phone Boutique',
    locale: 'fr_FR',
    type: 'website'
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
    canonical: 'https://monster-phone-boutique.fr/legal/mentions-legales'
  },
  other: {
    'geo.region': 'RE',
    'geo.placename': 'Le Port, La Réunion'
  }
};