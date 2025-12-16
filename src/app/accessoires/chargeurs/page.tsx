import { Metadata } from 'next';
import CollectionPage from '@/components/CollectionPage';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';
import { MENU_TO_SUPABASE_MAPPING } from '@/lib/supabase/menu-structure';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Chargeurs | Accessoires | Monster Phone Boutique',
  description: 'Chargeurs rapides, chargeurs sans fil et adaptateurs secteur pour tous vos appareils.',
};

export default async function ChargeursPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la sous-catégorie Chargeurs via le mapping ou directement par slug
  const supabaseSlug = MENU_TO_SUPABASE_MAPPING['chargeurs'] || 'chargeurs';
  const chargeursCategory = categories.find((cat: any) =>
    cat.slug === supabaseSlug ||
    cat.name.toLowerCase() === 'chargeurs'
  );

  const chargeursProducts = chargeursCategory
    ? allProducts.filter((product: any) => product.category_id === chargeursCategory.id)
    : [];

  return (
    <CollectionPage
      title="Chargeurs"
      description="Chargeurs rapides, chargeurs sans fil Qi et adaptateurs multi-ports pour une recharge optimale"
      gradientFrom="from-yellow-500"
      gradientTo="to-orange-500"
      products={chargeursProducts}
      categories={categories}
      brands={brands}
      parentCategory="Accessoires"
      parentCategorySlug="accessoires"
    />
  );
}
