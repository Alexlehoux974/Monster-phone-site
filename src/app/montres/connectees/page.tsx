import { Metadata } from 'next';
import CollectionPage from '@/components/CollectionPage';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';
import { MENU_TO_SUPABASE_MAPPING } from '@/lib/supabase/menu-structure';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Montres Connectées | Montres | Monster Phone Boutique',
  description: 'Montres connectées intelligentes avec notifications, suivi santé et applications pour rester connecté.',
};

export default async function MontresConnecteesPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la sous-catégorie Montres connectées via le mapping ou directement par slug
  const supabaseSlug = MENU_TO_SUPABASE_MAPPING['connectees'] || 'montres-connectees';
  const connecteesCategory = categories.find((cat: any) =>
    cat.slug === supabaseSlug ||
    cat.slug === 'montres-connectees' ||
    cat.name.toLowerCase() === 'montres connectées' ||
    cat.name.toLowerCase() === 'connectees'
  );

  const connecteesProducts = connecteesCategory
    ? allProducts.filter((product: any) => product.category_id === connecteesCategory.id)
    : [];

  return (
    <CollectionPage
      title="Montres Connectées"
      description="Smartwatches intelligentes pour gérer vos notifications, votre santé et bien plus depuis votre poignet"
      gradientFrom="from-green-600"
      gradientTo="to-teal-600"
      products={connecteesProducts}
      categories={categories}
      brands={brands}
      parentCategory="Montres"
      parentCategorySlug="montres"
    />
  );
}
