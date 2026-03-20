import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CollectionPage from '@/components/CollectionPage';
import { getCollectionBySlug, getProductsByCollection, getAllCategories, getAllBrands } from '@/lib/supabase/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const collectionGradients: Record<string, { from: string; to: string }> = {
  'nouveautes': { from: 'from-green-500', to: 'to-emerald-600' },
  'best-sellers': { from: 'from-orange-500', to: 'to-red-600' },
  'promotions': { from: 'from-red-500', to: 'to-pink-600' },
};
const defaultGradient = { from: 'from-blue-600', to: 'to-purple-600' };

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

  const gradient = collectionGradients[slug] || defaultGradient;
  const title = collection.name;

  return (
    <CollectionPage
      title={title}
      description={collection.description || `Découvrez notre sélection ${collection.name}`}
      gradientFrom={gradient.from}
      gradientTo={gradient.to}
      products={products}
      categories={categories}
      brands={brands}
      parentCategory="Collections"
      parentCategorySlug="collections"
    />
  );
}
