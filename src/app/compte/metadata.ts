import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mon Compte | Monster Phone Boutique La Réunion',
  description: 'Gérez votre compte Monster Phone : informations personnelles, historique de commandes, adresses de livraison. Service client disponible à La Réunion 974.',
  keywords: 'compte client, espace personnel, Monster Phone, La Réunion, 974, historique commandes, profil utilisateur',
  openGraph: {
    title: 'Mon Compte - Monster Phone Boutique',
    description: 'Accédez à votre espace client Monster Phone pour gérer vos commandes et informations personnelles',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Monster Phone Boutique',
  },
  alternates: {
    canonical: 'https://monsterphone.re/compte',
  },
  robots: {
    index: false, // Page privée, pas d'indexation
    follow: true,
  },
};