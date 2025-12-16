import { Metadata } from 'next';
import CollectionPage from '@/components/CollectionPage';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';
import { MENU_TO_SUPABASE_MAPPING } from '@/lib/supabase/menu-structure';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Écouteurs | Audio | Monster Phone Boutique',
  description: 'Découvrez notre sélection d\'écouteurs filaires et sans fil pour une expérience audio exceptionnelle.',
};

export default async function EcouteursPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la sous-catégorie Écouteurs via le mapping ou directement par slug
  const supabaseSlug = MENU_TO_SUPABASE_MAPPING['ecouteurs'] || 'ecouteurs';
  const ecouteursCategory = categories.find((cat: any) =>
    cat.slug === supabaseSlug ||
    cat.name.toLowerCase() === 'écouteurs' ||
    cat.name.toLowerCase() === 'ecouteurs'
  );

  const ecouteursProducts = ecouteursCategory
    ? allProducts.filter((product: any) => product.category_id === ecouteursCategory.id)
    : [];

  return (
    <CollectionPage
      title="Écouteurs"
      description="Des écouteurs filaires aux true wireless, trouvez le son parfait pour vos oreilles"
      gradientFrom="from-blue-600"
      gradientTo="to-indigo-600"
      products={ecouteursProducts}
      categories={categories}
      brands={brands}
      parentCategory="Audio"
      parentCategorySlug="audio"
    />
  );
}
