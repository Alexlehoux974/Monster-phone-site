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
  title: 'Tablettes | Monster Phone Boutique',
  description: 'Découvrez notre sélection de tablettes tactiles. Performances et mobilité pour le travail et les loisirs.',
};

export default async function TablettesPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Filtrer uniquement les produits de la catégorie Tablettes
  const tablettesCategory = categories.find((cat: any) =>
    cat.name.toLowerCase() === 'tablettes' || cat.slug === 'tablettes'
  );

  const tablettesProducts = tablettesCategory
    ? allProducts.filter((product: any) => product.category_id === tablettesCategory.id)
    : [];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[180px]">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Tablettes</h1>
            <p className="text-xl opacity-90">
              Tablettes tactiles performantes pour le travail et les loisirs
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
            initialProducts={tablettesProducts}
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
