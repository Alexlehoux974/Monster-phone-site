import { Suspense } from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrandCarousel from '@/components/BrandCarousel';
import ProductsClient from './products-client';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';

export const metadata: Metadata = {
  title: 'Tous nos produits | Monster Phone - Boutique Tech à La Réunion',
  description: 'Découvrez tous nos produits : smartphones HONOR, audio Monster & HiFuture, montres connectées, éclairage LED, accessoires Muvit & Tiger Power. Livraison express 24-48h à La Réunion, garantie 2 ans.',
  openGraph: {
    title: 'Tous nos produits | Monster Phone La Réunion',
    description: 'Smartphones, audio, montres, LED et accessoires. Livraison express 24-48h à La Réunion.',
  },
};

// Force dynamic rendering and disable cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Make this a server component
export default async function ProductsPage() {
  // Fetch data on the server using REST API (no cache)
  const [products, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[120px] sm:pt-[140px] lg:pt-[176px]">
        <Suspense fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        }>
          <ProductsClient 
            initialProducts={products}
            categories={categories}
            brands={brands}
          />
        </Suspense>
      </main>
      <BrandCarousel />
      <Footer />
    </>
  );
}