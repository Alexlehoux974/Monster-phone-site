import { Metadata } from 'next';
import CollectionPage from '@/components/CollectionPage';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';
import { MENU_TO_SUPABASE_MAPPING } from '@/lib/supabase/menu-structure';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Microphones | Audio | Monster Phone Boutique',
  description: 'Microphones professionnels pour streaming, podcasting et enregistrement vocal de qualité.',
};

export default async function MicroPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la sous-catégorie Micro via le mapping ou directement par slug
  const supabaseSlug = MENU_TO_SUPABASE_MAPPING['micro'] || 'micro';
  const microCategory = categories.find((cat: any) =>
    cat.slug === supabaseSlug ||
    cat.name.toLowerCase() === 'micro' ||
    cat.name.toLowerCase() === 'microphones'
  );

  const microProducts = microCategory
    ? allProducts.filter((product: any) => product.category_id === microCategory.id)
    : [];

  return (
    <CollectionPage
      title="Microphones"
      description="Microphones de qualité professionnelle pour vos enregistrements, streams et podcasts"
      gradientFrom="from-gray-700"
      gradientTo="to-gray-900"
      products={microProducts}
      categories={categories}
      brands={brands}
      parentCategory="Audio"
      parentCategorySlug="audio"
    />
  );
}
