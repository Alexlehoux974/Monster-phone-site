import { Metadata } from 'next';
import ProductsClient from '@/app/nos-produits/products-client';
import { getProducts, getBrands, getCategories } from '@/lib/supabase/client';

export const metadata: Metadata = {
  title: 'Accessoires | Monster Phone Boutique',
  description: 'Découvrez notre gamme complète d\'accessoires pour smartphones et gaming : coques, protections, câbles, chargeurs et plus encore.',
};

export default async function AccessoiresPage() {
  // Récupérer les catégories pour trouver l'ID de "Accessoires"
  const categories = await getCategories();
  const accessoiresCategory = categories.find(cat => cat.name === 'Accessoires');

  // Récupérer tous les produits
  const allProducts = await getProducts();

  // Filtrer uniquement les produits de la catégorie Accessoires
  const accessoiresProducts = accessoiresCategory
    ? allProducts.filter(product => product.category_id === accessoiresCategory.id)
    : [];

  // Récupérer les marques
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Accessoires</h1>
          <p className="text-xl opacity-90">
            Protégez et personnalisez vos appareils avec nos accessoires de qualité
          </p>
        </div>
      </div>

      <ProductsClient
        initialProducts={accessoiresProducts}
        categories={categories}
        brands={brands}
      />
    </div>
  );
}