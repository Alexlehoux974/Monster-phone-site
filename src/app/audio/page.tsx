import { Metadata } from 'next';
import ProductsClient from '@/app/nos-produits/products-client';
import { getProducts, getBrands, getCategories } from '@/lib/supabase/client';

export const metadata: Metadata = {
  title: 'Audio | Monster Phone Boutique',
  description: 'Casques, écouteurs, enceintes Bluetooth et accessoires audio de qualité supérieure pour votre expérience sonore.',
};

export default async function AudioPage() {
  // Récupérer les catégories pour trouver l'ID de "Audio"
  const categories = await getCategories();
  const audioCategory = categories.find(cat => cat.name === 'Audio');

  // Récupérer tous les produits
  const allProducts = await getProducts();

  // Filtrer uniquement les produits de la catégorie Audio
  const audioProducts = audioCategory
    ? allProducts.filter(product => product.category_id === audioCategory.id)
    : [];

  // Récupérer les marques
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Audio</h1>
          <p className="text-xl opacity-90">
            Découvrez une nouvelle dimension sonore avec nos produits audio premium
          </p>
        </div>
      </div>

      <ProductsClient
        initialProducts={audioProducts}
        categories={categories}
        brands={brands}
      />
    </div>
  );
}