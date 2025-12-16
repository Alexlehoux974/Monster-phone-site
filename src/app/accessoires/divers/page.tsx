import { Metadata } from 'next';
import CollectionPage from '@/components/CollectionPage';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';
import { MENU_TO_SUPABASE_MAPPING } from '@/lib/supabase/menu-structure';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Accessoires Divers | Accessoires | Monster Phone Boutique',
  description: 'Supports, étuis, protections d\'écran et autres accessoires utiles pour vos appareils.',
};

export default async function DiversPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la sous-catégorie Divers via le mapping ou directement par slug
  const supabaseSlug = MENU_TO_SUPABASE_MAPPING['divers'] || 'accessoires-divers';
  const diversCategory = categories.find((cat: any) =>
    cat.slug === supabaseSlug ||
    cat.slug === 'accessoires-divers' ||
    cat.name.toLowerCase() === 'divers' ||
    cat.name.toLowerCase() === 'accessoires divers'
  );

  const diversProducts = diversCategory
    ? allProducts.filter((product: any) => product.category_id === diversCategory.id)
    : [];

  return (
    <CollectionPage
      title="Accessoires Divers"
      description="Supports, coques, films de protection et bien d'autres accessoires pratiques"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-500"
      products={diversProducts}
      categories={categories}
      brands={brands}
      parentCategory="Accessoires"
      parentCategorySlug="accessoires"
    />
  );
}
