import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mon Panier | Monster Phone Boutique La Réunion',
  description: 'Votre panier Monster Phone - Finalisez votre commande de smartphones et accessoires gaming. Livraison gratuite dès 50€ à La Réunion 974.',
  keywords: 'panier, commande, Monster Phone, smartphones gaming, accessoires, livraison La Réunion, 974',
  openGraph: {
    title: 'Mon Panier - Monster Phone Boutique',
    description: 'Finalisez votre commande de produits gaming sur Monster Phone Boutique',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Monster Phone Boutique',
  },
  alternates: {
    canonical: 'https://monsterphone.re/panier',
  },
  robots: {
    index: false, // Page dynamique, pas d'indexation
    follow: true,
  },
};