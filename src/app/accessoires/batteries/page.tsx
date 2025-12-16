import { Metadata } from 'next';
import CollectionPage from '@/components/CollectionPage';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';
import { MENU_TO_SUPABASE_MAPPING } from '@/lib/supabase/menu-structure';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Batteries Externes | Accessoires | Monster Phone Boutique',
  description: 'Batteries externes et power banks haute capacité pour recharger vos appareils en déplacement.',
};

export default async function BatteriesPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la sous-catégorie Batteries via le mapping ou directement par slug
  const supabaseSlug = MENU_TO_SUPABASE_MAPPING['batteries'] || 'batteries-externes';
  const batteriesCategory = categories.find((cat: any) =>
    cat.slug === supabaseSlug ||
    cat.slug === 'batteries-externes' ||
    cat.name.toLowerCase() === 'batteries externes' ||
    cat.name.toLowerCase() === 'batteries'
  );

  const batteriesProducts = batteriesCategory
    ? allProducts.filter((product: any) => product.category_id === batteriesCategory.id)
    : [];

  return (
    <CollectionPage
      title="Batteries Externes"
      description="Power banks et batteries portables haute capacité pour ne jamais tomber en panne d'énergie"
      gradientFrom="from-green-500"
      gradientTo="to-emerald-600"
      products={batteriesProducts}
      categories={categories}
      brands={brands}
      parentCategory="Accessoires"
      parentCategorySlug="accessoires"
    />
  );
}
