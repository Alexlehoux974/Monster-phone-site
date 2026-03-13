import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import MonsterPhoneHero from '@/components/MonsterPhoneHero';
import type { HeroFeaturedProduct } from '@/components/MonsterPhoneHero';
import SmartphonePackBanner from '@/components/SmartphonePackBanner';
import FeaturedProductsSupabase from '@/components/FeaturedProductsSupabase';
import PromoBanner from '@/components/PromoBanner';
import type { Metadata } from 'next';

// Lazy load des composants sous le fold — réduit le bundle JS initial
const FlashDeals = dynamic(() => import('@/components/FlashDeals'));
const ProductCollectionsSupabase = dynamic(() => import('@/components/ProductCollectionsSupabase'));
const BrandCarousel = dynamic(() => import('@/components/BrandCarousel'));
const TrustSection = dynamic(() => import('@/components/TrustSection'));
const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'));
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'));
const Footer = dynamic(() => import('@/components/Footer'));

// ISR : revalide toutes les 60s — les modifs admin apparaissent sous 1 min
// tout en bénéficiant du cache CDN entre les requêtes
export const revalidate = 60;

import { getProductsByCategoryId, getNewProducts } from '@/lib/supabase/api-rest';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';
import { sortProductsByPriority } from '@/lib/utils';
import { getWorkingImageUrl } from '@/lib/image-utils';

export const metadata: Metadata = {
  title: 'Monster Phone Boutique | Smartphones & Multimédia à La Réunion',
  description: 'Découvrez nos smartphones HONOR, écouteurs, montres connectées et accessoires à La Réunion. Livraison gratuite dès 100€, garantie 2 ans.',
  keywords: 'Monster Phone, smartphones, accessoires téléphone, La Réunion, 974, HONOR, MY WAY, MUVIT, écouteurs, montres connectées, multimédia',
  openGraph: {
    title: 'Monster Phone Boutique - Smartphones & Multimédia à La Réunion',
    description: 'Votre spécialiste smartphones et multimédia à La Réunion. Livraison express 24h/48h.',
    url: 'https://monster-phone.re',
    siteName: 'Monster Phone Boutique',
    images: [
      {
        url: 'https://monster-phone.re/og-image.jpg',
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
    title: 'Monster Phone Boutique | Smartphones & Multimédia',
    description: 'Votre spécialiste smartphones et multimédia à La Réunion',
    images: ['https://monster-phone.re/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://monster-phone.re',
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
  const featuredEcouteurs = sortProductsByPriority(ecouteurs).slice(0, 6);

  // Récupérer les nouveautés (produits ajoutés dans les 60 derniers jours)
  const newProductsData = await getNewProducts(60, 8);
  const newArrivals = newProductsData.map(supabaseProductToLegacy);

  // Construire le produit flagship pour le hero
  const flagship = featuredSmartphones[0];
  const heroProduct: HeroFeaturedProduct | undefined = flagship ? {
    name: flagship.name,
    urlSlug: flagship.urlSlug,
    basePrice: flagship.basePrice,
    originalPrice: flagship.originalPrice,
    discountPercent: flagship.discountPercent,
    imageUrl: flagship.variants?.[0]?.images?.[0] || '',
    brandName: flagship.brandName,
  } : undefined;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-[120px] sm:pt-[140px] lg:pt-[176px]">
        <MonsterPhoneHero featuredProduct={heroProduct} />
        <SmartphonePackBanner />

        {/* Section Smartphones */}
        <FeaturedProductsSupabase
          products={featuredSmartphones}
          title="Nos Smartphones Vedettes"
        />

        {/* Section Nouveautés */}
        {newArrivals.length > 0 && (
          <FeaturedProductsSupabase
            products={newArrivals}
            title="Nouveautés"
            viewAllHref="/nos-produits?sort=newest"
            viewAllLabel="Voir toutes les nouveautés"
          />
        )}

        {/* Section Écouteurs */}
        <FeaturedProductsSupabase
          products={featuredEcouteurs}
          title="Nos écouteurs"
          viewAllHref="/audio/ecouteurs"
          viewAllLabel="Voir tous nos écouteurs"
        />

        {/* Flash Deals - S'affiche si des promos existent */}
        <FlashDeals />

        {/* Bannière promo */}
        <PromoBanner
          icon="🚚"
          title="Livraison gratuite dès 100€"
          subtitle="Recevez vos produits directement chez vous à La Réunion en 24h/48h"
          ctaText="Découvrir nos offres"
          ctaHref="/nos-produits"
          bgGradient="from-emerald-600 via-teal-600 to-cyan-700"
        />

        {/* Collections par catégorie avec tabs (Smartphones, Montres, Audio, LED, Accessoires) */}
        <ProductCollectionsSupabase />

        {/* Bannière promo garantie */}
        <PromoBanner
          icon="🛡️"
          title="Garantie 2 ans sur tous nos produits"
          subtitle="Service après-vente local à La Réunion — échange ou réparation rapide"
          ctaText="En savoir plus"
          ctaHref="/services/garantie"
          bgGradient="from-indigo-600 via-blue-600 to-purple-700"
        />

        <BrandCarousel />
        <TrustSection />
        <FeaturesSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  );
}
