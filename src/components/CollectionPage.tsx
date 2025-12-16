import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrandCarousel from '@/components/BrandCarousel';
import ProductsClient from '@/app/nos-produits/products-client';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import type { ProductFullView } from '@/lib/supabase/client';

interface CollectionPageProps {
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  products: ProductFullView[];
  categories: any[];
  brands: any[];
  parentCategory?: string;
  parentCategorySlug?: string;
}

export default function CollectionPage({
  title,
  description,
  gradientFrom,
  gradientTo,
  products,
  categories,
  brands,
  parentCategory,
  parentCategorySlug
}: CollectionPageProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[180px]">
        <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white py-12`}>
          <div className="container mx-auto px-4">
            {parentCategory && parentCategorySlug && (
              <nav className="text-sm mb-4 opacity-80">
                <a href="/" className="hover:underline">Accueil</a>
                <span className="mx-2">/</span>
                <a href={`/${parentCategorySlug}`} className="hover:underline">{parentCategory}</a>
                <span className="mx-2">/</span>
                <span>{title}</span>
              </nav>
            )}
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl opacity-90">{description}</p>
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
