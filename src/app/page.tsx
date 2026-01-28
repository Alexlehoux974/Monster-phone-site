import Header from '@/components/Header';
import MonsterPhoneHero from '@/components/MonsterPhoneHero';
import SmartphonePackBanner from '@/components/SmartphonePackBanner';
import TrustSection from '@/components/TrustSection';
import FeaturedProductsSupabase from '@/components/FeaturedProductsSupabase';
import BrandCarousel from '@/components/BrandCarousel';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FlashDeals from '@/components/FlashDeals';
import ProductCollectionsSupabase from '@/components/ProductCollectionsSupabase';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

// Forcer le rendu dynamique pour que les modifications admin soient visibles immédiatement
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import { getProductsByCategoryId } from '@/lib/supabase/api-rest';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';
import { sortProductsByPriority } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Monster Phone Boutique | Accessoires Gaming à La Réunion',
  description: 'Découvrez les meilleurs accessoires gaming pour smartphones à La Réunion. Livraison gratuite dès 50€, garantie 2 ans.',
  keywords: 'Monster Phone, accessoires gaming, smartphones, La Réunion, 974, gaming mobile, HONOR, MY WAY, MUVIT',
  openGraph: {
    title: 'Monster Phone Boutique - Accessoires Gaming à La Réunion',
    description: 'La référence des accessoires gaming pour smartphones à La Réunion. Livraison express 24h/48h.',
    url: 'https://monsterphone.re',
    siteName: 'Monster Phone Boutique',
    images: [
      {
        url: 'https://monsterphone.re/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Monster Phone Boutique',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monster Phone Boutique | Accessoires Gaming',
    description: 'Les meilleurs accessoires gaming pour smartphones à La Réunion',
    images: ['https://monsterphone.re/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://monsterphone.re',
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
};

// IDs des catégories prioritaires
const SMARTPHONES_CATEGORY_ID = '80194285-ea90-40ff-8e2a-8edbe3609330';
const ECOUTEURS_CATEGORY_ID = '3fa6e04b-2cab-46db-8a85-f6865909d51c';

export default async function Home() {
  // Récupérer tous les smartphones de la catégorie
  const smartphonesData = await getProductsByCategoryId(SMARTPHONES_CATEGORY_ID, {
    limit: 100,
    sortBy: 'created_at',
    sortOrder: 'desc'
  });
  const smartphones = smartphonesData.map(supabaseProductToLegacy);
  const featuredSmartphones = sortProductsByPriority(smartphones);

  // Récupérer tous les écouteurs de la catégorie
  const ecouteursData = await getProductsByCategoryId(ECOUTEURS_CATEGORY_ID, {
    limit: 100,
    sortBy: 'created_at',
    sortOrder: 'desc'
  });
  const ecouteurs = ecouteursData.map(supabaseProductToLegacy);
  const featuredEcouteurs = sortProductsByPriority(ecouteurs);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-[110px]">
        <MonsterPhoneHero />
        <div className="hidden md:block">
          <SmartphonePackBanner />
        </div>

        {/* Section Smartphones */}
        <FeaturedProductsSupabase
          products={featuredSmartphones}
          title="Nos Smartphones Gaming"
        />

        {/* Section Écouteurs */}
        <FeaturedProductsSupabase
          products={featuredEcouteurs}
          title="Nos Écouteurs Gaming"
        />

        {/* Flash Deals - S'affiche si des promos existent */}
        <FlashDeals />

        {/* Collections par catégorie avec tabs (Smartphones, Montres, Audio, LED, Accessoires) */}
        <ProductCollectionsSupabase />

        <BrandCarousel />
        <TrustSection />
        <FeaturesSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  );
}
