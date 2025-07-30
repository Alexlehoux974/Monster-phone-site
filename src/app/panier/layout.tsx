import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mon Panier | Monster Phone Boutique',
  description: 'Consultez et gérez votre panier Monster Phone. Livraison gratuite dès 50€ à La Réunion.',
  keywords: 'panier, cart, commande, Monster Phone, La Réunion, livraison gratuite',
  openGraph: {
    title: 'Mon Panier - Monster Phone Boutique',
    description: 'Votre panier Monster Phone - Livraison gratuite dès 50€ à La Réunion.',
    url: 'https://monsterphone.re/panier',
    siteName: 'Monster Phone Boutique',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PanierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}