import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Produits | Monster Phone Boutique',
  description: 'Découvrez notre gamme complète de smartphones HONOR, audio Monster, chargeurs, luminaires et accessoires à La Réunion.',
  keywords: 'smartphones, accessoires téléphone, HONOR, Monster, MY WAY, MUVIT, La Réunion, 974',
  openGraph: {
    title: 'Nos Produits - Monster Phone Boutique',
    description: 'La gamme complète de smartphones et accessoires à La Réunion.',
    url: 'https://monster-phone.re/nos-produits',
    siteName: 'Monster Phone Boutique',
    images: [
      {
        url: 'https://monster-phone.re/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'Produits Monster Phone',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://monster-phone.re/nos-produits',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProduitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}