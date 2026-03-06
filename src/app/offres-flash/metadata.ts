import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offres Flash | Monster Phone Boutique La Réunion',
  description: 'Découvrez nos offres flash sur les smartphones HONOR et accessoires. Promotions exclusives à durée limitée. Monster Phone Boutique La Réunion 974.',
  keywords: [
    'offres flash monster phone',
    'promotions smartphone réunion',
    'honor promotion réunion',
    'offres spéciales monster phone',
    'réduction téléphone 974'
  ],
  authors: [{ name: 'Monster Phone Boutique' }],
  creator: 'Monster Phone Boutique',
  publisher: 'Monster Phone Boutique',
  openGraph: {
    title: 'Offres Flash | Monster Phone Boutique Réunion',
    description: 'Promotions exclusives à durée limitée sur smartphones et accessoires.',
    url: 'https://monster-phone.re/offres-flash',
    siteName: 'Monster Phone Boutique',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/LOGO-MONSTER-PHONE.png',
        width: 1200,
        height: 630,
        alt: 'Offres Flash Monster Phone Boutique La Réunion'
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://monster-phone.re/offres-flash'
  }
};
