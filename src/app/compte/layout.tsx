import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mon Compte | Monster Phone Boutique',
  description: 'Gérez votre compte Monster Phone : informations personnelles, historique des commandes et paramètres de sécurité.',
  keywords: 'compte client, espace personnel, commandes, profil, Monster Phone, La Réunion',
  openGraph: {
    title: 'Mon Compte - Monster Phone Boutique',
    description: 'Accédez à votre espace personnel Monster Phone et gérez vos informations.',
    url: 'https://monsterphone.re/compte',
    siteName: 'Monster Phone Boutique',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CompteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}