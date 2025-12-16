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
  title: 'Audio | Monster Phone Boutique',
  description: 'Casques, écouteurs, enceintes Bluetooth et accessoires audio de qualité supérieure pour votre expérience sonore.',
};

export default async function AudioPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la catégorie Audio et toutes ses sous-catégories
  const audioCategory = categories.find((cat: any) =>
    cat.name.toLowerCase() === 'audio' || cat.slug === 'audio'
  );

  // Récupérer les IDs de la catégorie Audio + toutes ses sous-catégories
  const audioCategoryIds: string[] = [];
  if (audioCategory) {
    audioCategoryIds.push(audioCategory.id);
    // Trouver toutes les sous-catégories dont le parent_id est audioCategory.id
    const subcategories = categories.filter((cat: any) => cat.parent_id === audioCategory.id);
    subcategories.forEach((sub: any) => audioCategoryIds.push(sub.id));
  }

  // Filtrer les produits qui appartiennent à Audio ou ses sous-catégories
  const audioProducts = audioCategoryIds.length > 0
    ? allProducts.filter((product: any) => audioCategoryIds.includes(product.category_id))
    : [];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[180px]">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Audio</h1>
            <p className="text-xl opacity-90">
              Découvrez une nouvelle dimension sonore avec nos produits audio premium
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
            initialProducts={audioProducts}
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
