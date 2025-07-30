import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finaliser ma commande | Monster Phone Boutique La Réunion',
  description: 'Finalisez votre commande en toute sécurité sur Monster Phone Boutique. Paiement sécurisé, livraison rapide à La Réunion 974.',
  keywords: 'checkout, paiement sécurisé, commande, Monster Phone, La Réunion, 974, livraison',
  openGraph: {
    title: 'Finaliser ma commande - Monster Phone Boutique',
    description: 'Paiement sécurisé et livraison rapide à La Réunion',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Monster Phone Boutique',
  },
  alternates: {
    canonical: 'https://monsterphone.re/checkout',
  },
  robots: {
    index: false, // Page de checkout, pas d'indexation
    follow: false,
    noarchive: true,
  },
};