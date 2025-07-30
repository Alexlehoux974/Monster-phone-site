import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Produits | Monster Phone Boutique',
  description: 'Découvrez notre gamme complète d\'accessoires gaming : smartphones HONOR, audio Monster, chargeurs, luminaires et plus.',
  keywords: 'smartphones, accessoires gaming, HONOR, Monster, MY WAY, MUVIT, La Réunion, 974',
  openGraph: {
    title: 'Nos Produits - Monster Phone Boutique',
    description: 'La gamme complète d\'accessoires gaming et smartphones à La Réunion.',
    url: 'https://monsterphone.re/nos-produits',
    siteName: 'Monster Phone Boutique',
    images: [
      {
        url: 'https://monsterphone.re/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'Produits Monster Phone',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://monsterphone.re/nos-produits',
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