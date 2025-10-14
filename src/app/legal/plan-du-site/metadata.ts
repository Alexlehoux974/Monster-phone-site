import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan du Site | Monster Phone Boutique Navigation La Réunion',
  description: 'Plan du site Monster Phone Boutique. Retrouvez facilement toutes les sections : smartphones gaming, accessoires, promotions, contact, pages légales.',
  keywords: [
    'plan site monster phone',
    'navigation boutique réunion',
    'sitemap téléphone gaming',
    'pages monster phone',
    'structure site 974',
    'index navigation'
  ],
  authors: [{ name: 'Monster Phone Boutique' }],
  creator: 'Monster Phone Boutique',
  publisher: 'Monster Phone Boutique',
  openGraph: {
    title: 'Plan du Site | Monster Phone Boutique',
    description: 'Navigation complète du site Monster Phone Boutique pour retrouver facilement tous nos produits et services.',
    url: 'https://monster-phone.re/legal/plan-du-site',
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
    canonical: 'https://monster-phone.re/legal/plan-du-site'
  }
};