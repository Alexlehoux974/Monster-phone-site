import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrandCarousel from '@/components/BrandCarousel';
import ProductsClient from '@/app/nos-produits/products-client';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import CollectionHeroAurora from '@/components/CollectionHeroAurora';
import { getCollectionBySlug, getProductsByCollection, getAllCategories, getAllBrands } from '@/lib/supabase/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    return { title: 'Collection introuvable | Monster Phone Boutique' };
  }

  const title = `${collection.name} | Monster Phone Boutique La Réunion`;
  const description = collection.description || `Découvrez notre collection ${collection.name} sur Monster Phone Boutique La Réunion.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://monster-phone.re/collections/${slug}`,
    },
    alternates: {
      canonical: `https://monster-phone.re/collections/${slug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function CollectionSlugPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const [products, categories, brands] = await Promise.all([
    getProductsByCollection(slug),
    getAllCategories(),
    getAllBrands(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[120px] sm:pt-[140px] lg:pt-[176px]">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <CollectionHeroAurora
              slug={slug}
              title={collection.name}
              description={collection.description || `Découvrez notre sélection ${collection.name}`}
              productCount={products.length}
            />

            <Suspense fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }>
              <ProductsClient
                initialProducts={products}
                categories={categories}
                brands={brands}
              />
            </Suspense>
          </div>
        </div>
      </main>
      <BrandCarousel />
      <Footer />
    </>
  );
}
