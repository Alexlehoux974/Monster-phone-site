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
  title: 'Accessoires Téléphone | Monster Phone Boutique La Réunion',
  description: 'Coques, chargeurs, câbles et protections pour smartphone à La Réunion. Marques MY WAY, MUVIT, Tiger Power. Livraison express 24/48h.',
};

export default async function AccessoiresPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la catégorie Accessoires et toutes ses sous-catégories
  const accessoiresCategory = categories.find((cat: any) =>
    cat.name.toLowerCase() === 'accessoires' || cat.slug === 'accessoires'
  );

  // Récupérer les IDs de la catégorie Accessoires + toutes ses sous-catégories
  const accessoiresCategoryIds: string[] = [];
  if (accessoiresCategory) {
    accessoiresCategoryIds.push(accessoiresCategory.id);
    const subcategories = categories.filter((cat: any) => cat.parent_id === accessoiresCategory.id);
    subcategories.forEach((sub: any) => accessoiresCategoryIds.push(sub.id));
  }

  // Filtrer les produits qui appartiennent à Accessoires ou ses sous-catégories
  const accessoiresProducts = accessoiresCategoryIds.length > 0
    ? allProducts.filter((product: any) => accessoiresCategoryIds.includes(product.category_id))
    : [];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[180px]">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Accessoires</h1>
            <p className="text-xl opacity-90">
              Protégez et personnalisez vos appareils avec nos accessoires de qualité
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
            initialProducts={accessoiresProducts}
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
