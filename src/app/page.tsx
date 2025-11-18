import Header from '@/components/Header';
import MonsterPhoneHero from '@/components/MonsterPhoneHero';
import SmartphonePackBanner from '@/components/SmartphonePackBanner';
import TrustSection from '@/components/TrustSection';
import FeaturedProductsSupabase from '@/components/FeaturedProductsSupabase';
import BrandCarousel from '@/components/BrandCarousel';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { getActiveProducts } from '@/lib/supabase/api-rest';
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

export default async function Home() {
  // Récupérer seulement 20 produits actifs (marge pour le tri)
  const supabaseProducts = await getActiveProducts({ limit: 20, sortBy: 'created_at', sortOrder: 'desc' });

  // Convertir les produits Supabase vers le format legacy pour ProductCard
  const convertedProducts = supabaseProducts.map(supabaseProductToLegacy);

  // Trier les produits par priorité (en stock > phares > prix décroissant)
  // puis prendre les 12 premiers pour affichage (2 rangées de 6)
  const featuredProducts = sortProductsByPriority(convertedProducts).slice(0, 12);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-[110px]">
        <MonsterPhoneHero />
        <div className="hidden md:block">
          <SmartphonePackBanner />
        </div>
        <FeaturedProductsSupabase products={featuredProducts} />
        <BrandCarousel />
        <TrustSection />
        <FeaturesSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  );
}