import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | Monster Phone Boutique La Réunion',
  description: 'Consultez les conditions générales de vente de Monster Phone Boutique. Livraison gratuite dès 50€, garantie 24 mois, retours 14 jours. Service client La Réunion.',
  keywords: [
    'conditions générales vente monster phone',
    'cgv smartphone réunion',
    'garantie téléphone réunion',
    'livraison gratuite 974',
    'retour produit réunion',
    'droit consommateur réunion'
  ],
  authors: [{ name: 'Monster Phone Boutique' }],
  creator: 'Monster Phone Boutique',
  publisher: 'Monster Phone Boutique',
  openGraph: {
    title: 'CGV Monster Phone Boutique La Réunion',
    description: 'Conditions générales de vente de votre spécialiste en téléphones gaming à La Réunion.',
    url: 'https://monster-phone-boutique.fr/legal/conditions-generales',
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
    canonical: 'https://monster-phone-boutique.fr/legal/conditions-generales'
  }
};