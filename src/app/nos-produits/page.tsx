import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductsClient from './products-client';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { getProducts, getCategories, getBrands } from '@/lib/supabase/client';

// Make this a server component
export default async function ProductsPage() {
  // Fetch data on the server
  const [products, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands()
  ]);

  console.log('Products fetched:', products?.length || 0, 'products');
  console.log('Categories fetched:', categories?.length || 0, 'categories');
  console.log('Brands fetched:', brands?.length || 0, 'brands');

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
      <Footer />
    </>
  );
}