import { Metadata } from 'next';
import CollectionPage from '@/components/CollectionPage';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';
import { MENU_TO_SUPABASE_MAPPING } from '@/lib/supabase/menu-structure';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Câbles | Accessoires | Monster Phone Boutique',
  description: 'Câbles USB-C, Lightning, HDMI et plus. Des câbles de qualité pour tous vos appareils.',
};

export default async function CablesPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la sous-catégorie Câbles via le mapping ou directement par slug
  const supabaseSlug = MENU_TO_SUPABASE_MAPPING['cables'] || 'cables';
  const cablesCategory = categories.find((cat: any) =>
    cat.slug === supabaseSlug ||
    cat.name.toLowerCase() === 'câbles' ||
    cat.name.toLowerCase() === 'cables'
  );

  const cablesProducts = cablesCategory
    ? allProducts.filter((product: any) => product.category_id === cablesCategory.id)
    : [];

  return (
    <CollectionPage
      title="Câbles"
      description="Câbles USB-C, Lightning, micro-USB et HDMI de qualité pour charger et connecter vos appareils"
      gradientFrom="from-gray-600"
      gradientTo="to-gray-800"
      products={cablesProducts}
      categories={categories}
      brands={brands}
      parentCategory="Accessoires"
      parentCategorySlug="accessoires"
    />
  );
}
