import { Metadata } from 'next';
import CollectionPage from '@/components/CollectionPage';
import { getActiveProducts, getAllCategories, getAllBrands } from '@/lib/supabase/api-rest';
import { MENU_TO_SUPABASE_MAPPING } from '@/lib/supabase/menu-structure';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Enceintes | Audio | Monster Phone Boutique',
  description: 'Enceintes Bluetooth portables et puissantes pour un son de qualité partout où vous allez.',
};

export default async function EnceintesPage() {
  const [allProducts, categories, brands] = await Promise.all([
    getActiveProducts(),
    getAllCategories(),
    getAllBrands()
  ]);

  // Trouver la sous-catégorie Enceintes via le mapping ou directement par slug
  const supabaseSlug = MENU_TO_SUPABASE_MAPPING['enceintes'] || 'enceintes';
  const enceintesCategory = categories.find((cat: any) =>
    cat.slug === supabaseSlug ||
    cat.name.toLowerCase() === 'enceintes'
  );

  const enceintesProducts = enceintesCategory
    ? allProducts.filter((product: any) => product.category_id === enceintesCategory.id)
    : [];

  return (
    <CollectionPage
      title="Enceintes"
      description="Des enceintes Bluetooth portables aux systèmes home cinema, le son premium à portée de main"
      gradientFrom="from-orange-500"
      gradientTo="to-red-600"
      products={enceintesProducts}
      categories={categories}
      brands={brands}
      parentCategory="Audio"
      parentCategorySlug="audio"
    />
  );
}
