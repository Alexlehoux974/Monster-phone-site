import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrandCarousel from '@/components/BrandCarousel';
import ProductsClient from './products-client';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';

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
      <main className="min-h-screen pt-[110px]">
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