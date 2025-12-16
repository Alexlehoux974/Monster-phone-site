import { Metadata } from 'next';
import CollectionPage from '@/components/CollectionPage';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';
import { MENU_TO_SUPABASE_MAPPING } from '@/lib/supabase/menu-structure';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Casques Audio | Audio | Monster Phone Boutique',
  description: 'Casques audio filaires et sans fil avec réduction de bruit pour une immersion sonore totale.',
};

export default async function CasquesPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la sous-catégorie Casques via le mapping ou directement par slug
  const supabaseSlug = MENU_TO_SUPABASE_MAPPING['casques'] || 'casques';
  const casquesCategory = categories.find((cat: any) =>
    cat.slug === supabaseSlug ||
    cat.slug === 'casques-audio' ||
    cat.name.toLowerCase() === 'casques' ||
    cat.name.toLowerCase() === 'casques audio'
  );

  const casquesProducts = casquesCategory
    ? allProducts.filter((product: any) => product.category_id === casquesCategory.id)
    : [];

  return (
    <CollectionPage
      title="Casques Audio"
      description="Casques over-ear et on-ear pour une qualité sonore exceptionnelle et un confort optimal"
      gradientFrom="from-purple-600"
      gradientTo="to-pink-600"
      products={casquesProducts}
      categories={categories}
      brands={brands}
      parentCategory="Audio"
      parentCategorySlug="audio"
    />
  );
}
