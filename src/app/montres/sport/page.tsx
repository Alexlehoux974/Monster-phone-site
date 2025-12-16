import { Metadata } from 'next';
import CollectionPage from '@/components/CollectionPage';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';
import { MENU_TO_SUPABASE_MAPPING } from '@/lib/supabase/menu-structure';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Montres Sport | Montres | Monster Phone Boutique',
  description: 'Montres de sport avec GPS, suivi fitness et étanchéité pour accompagner vos performances.',
};

export default async function MontresSportPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la sous-catégorie Montres sport via le mapping ou directement par slug
  const supabaseSlug = MENU_TO_SUPABASE_MAPPING['sport'] || 'montres-sport';
  const sportCategory = categories.find((cat: any) =>
    cat.slug === supabaseSlug ||
    cat.slug === 'montres-sport' ||
    cat.name.toLowerCase() === 'montres sport' ||
    cat.name.toLowerCase() === 'sport'
  );

  const sportProducts = sportCategory
    ? allProducts.filter((product: any) => product.category_id === sportCategory.id)
    : [];

  return (
    <CollectionPage
      title="Montres Sport"
      description="Montres sportives robustes avec GPS, moniteur cardiaque et modes d'entraînement avancés"
      gradientFrom="from-orange-500"
      gradientTo="to-yellow-500"
      products={sportProducts}
      categories={categories}
      brands={brands}
      parentCategory="Montres"
      parentCategorySlug="montres"
    />
  );
}
