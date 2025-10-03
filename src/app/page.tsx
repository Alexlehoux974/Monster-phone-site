import Header from '@/components/Header';
import MonsterPhoneHero from '@/components/MonsterPhoneHero';
import SmartphonePackBanner from '@/components/SmartphonePackBanner';
import TrustSection from '@/components/TrustSection';
import FeaturedProductsSupabase from '@/components/FeaturedProductsSupabase';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import SupabaseMenu from '@/components/SupabaseMenu';
import type { Metadata } from 'next';
import { getBestSellers } from '@/lib/supabase/api';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';

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

export default async function Home() {
  // Récupérer les meilleures ventes depuis Supabase (6 produits)
  const supabaseProducts = await getBestSellers(6);

  // Convertir les produits Supabase vers le format legacy pour ProductCard
  const featuredProducts = supabaseProducts.map(supabaseProductToLegacy);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-[110px]">
        <MonsterPhoneHero />
        <SmartphonePackBanner />
        <FeaturedProductsSupabase products={featuredProducts} />
        <TrustSection />
        <FeaturesSection />
        <TestimonialsSection />
        <Footer />
      </div>
      <SupabaseMenu />
    </div>
  );
}