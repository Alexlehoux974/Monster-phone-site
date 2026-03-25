import { Suspense } from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrandCarousel from '@/components/BrandCarousel';
import ProductsClient from '@/app/nos-produits/products-client';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Éclairage LED Monster Illuminescence | Monster Phone Boutique La Réunion',
  description: 'Éclairage LED Monster Illuminescence à La Réunion : ampoules connectées, barres LED, rubans lumineux. Livraison express 24/48h.',
};

export default async function LEDPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la catégorie LED et toutes ses sous-catégories
  const ledCategory = categories.find((cat: any) =>
    (cat.name.toLowerCase() === 'led' || cat.slug === 'led') && !cat.parent_id
  );

  const ledCategoryIds: string[] = [];
  if (ledCategory) {
    ledCategoryIds.push(ledCategory.id);
    const subcategories = categories.filter((cat: any) => cat.parent_id === ledCategory.id);
    subcategories.forEach((sub: any) => ledCategoryIds.push(sub.id));
  }

  const ledProducts = ledCategoryIds.length > 0
    ? allProducts.filter((product: any) => ledCategoryIds.includes(product.category_id))
    : [];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[180px]">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">LED & Éclairage</h1>
            <p className="text-xl opacity-90">
              Illuminez votre quotidien avec notre gamme d'éclairage LED moderne
            </p>
          </div>
        </div>

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
            initialProducts={ledProducts}
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
