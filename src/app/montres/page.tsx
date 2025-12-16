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
  title: 'Montres Connectées | Monster Phone Boutique',
  description: 'Montres connectées et smartwatches pour rester connecté avec style. Suivi fitness, notifications et plus.',
};

export default async function MontresPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la catégorie Montres et toutes ses sous-catégories
  const montresCategory = categories.find((cat: any) =>
    cat.name.toLowerCase() === 'montres' ||
    cat.name.toLowerCase().includes('montres') ||
    cat.slug === 'montres'
  );

  // Récupérer les IDs de la catégorie Montres + toutes ses sous-catégories
  const montresCategoryIds: string[] = [];
  if (montresCategory) {
    montresCategoryIds.push(montresCategory.id);
    const subcategories = categories.filter((cat: any) => cat.parent_id === montresCategory.id);
    subcategories.forEach((sub: any) => montresCategoryIds.push(sub.id));
  }

  // Filtrer les produits qui appartiennent à Montres ou ses sous-catégories
  const montresProducts = montresCategoryIds.length > 0
    ? allProducts.filter((product: any) => montresCategoryIds.includes(product.category_id))
    : [];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[180px]">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Montres Connectées</h1>
            <p className="text-xl opacity-90">
              La technologie au poignet avec nos smartwatches dernière génération
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
            initialProducts={montresProducts}
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
