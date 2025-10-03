import { Metadata } from 'next';
import ProductsClient from '@/app/nos-produits/products-client';
import { getProducts, getBrands, getCategories } from '@/lib/supabase/client';

export const metadata: Metadata = {
  title: 'Montres Connectées | Monster Phone Boutique',
  description: 'Montres connectées et smartwatches pour rester connecté avec style. Suivi fitness, notifications et plus.',
};

export default async function MontresPage() {
  // Récupérer les catégories pour trouver l'ID de "Montres connectées"
  const categories = await getCategories();
  const montresCategory = categories.find(cat => cat.name === 'Montres connectées');

  // Récupérer tous les produits
  const allProducts = await getProducts();

  // Filtrer uniquement les produits de la catégorie Montres
  const montresProducts = montresCategory
    ? allProducts.filter(product => product.category_id === montresCategory.id)
    : [];

  // Récupérer les marques
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Montres Connectées</h1>
          <p className="text-xl opacity-90">
            La technologie au poignet avec nos smartwatches dernière génération
          </p>
        </div>
      </div>

      <ProductsClient
        initialProducts={montresProducts}
        categories={categories}
        brands={brands}
      />
    </div>
  );
}