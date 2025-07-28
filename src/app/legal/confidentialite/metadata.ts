import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité RGPD | Monster Phone Boutique Réunion',
  description: 'Politique de confidentialité et protection des données personnelles RGPD de Monster Phone Boutique. Transparence et respect de votre vie privée à La Réunion.',
  keywords: [
    'politique confidentialité monster phone',
    'rgpd réunion',
    'protection données personnelles',
    'cookies monster phone',
    'vie privée boutique réunion',
    'cnil réunion'
  ],
  authors: [{ name: 'Monster Phone Boutique' }],
  creator: 'Monster Phone Boutique',
  publisher: 'Monster Phone Boutique',
  openGraph: {
    title: 'Politique de Confidentialité | Monster Phone Boutique',
    description: 'Notre engagement pour la protection de vos données personnelles selon le RGPD.',
    url: 'https://monster-phone-boutique.fr/legal/confidentialite',
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
    canonical: 'https://monster-phone-boutique.fr/legal/confidentialite'
  }
};