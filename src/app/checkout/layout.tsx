import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paiement Sécurisé | Monster Phone Boutique',
  description: 'Finalisez votre commande en toute sécurité. Paiement rapide et livraison express à La Réunion.',
  keywords: 'paiement, checkout, commande, paiement sécurisé, Monster Phone, La Réunion',
  openGraph: {
    title: 'Paiement Sécurisé - Monster Phone Boutique',
    description: 'Finalisez votre commande Monster Phone en toute sécurité.',
    url: 'https://monsterphone.re/checkout',
    siteName: 'Monster Phone Boutique',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}