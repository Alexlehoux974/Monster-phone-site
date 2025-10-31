import { getActiveProducts } from '@/lib/supabase/api';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';
import ProductCard from '@/components/ProductCard';
import { isCompletelyOutOfStock } from '@/lib/utils';

export default async function TestBadgesPage() {
  const supabaseProducts = await getActiveProducts();
  const allProducts = supabaseProducts.map(supabaseProductToLegacy);

  // Filtrer uniquement les produits COMPLÈTEMENT en rupture de stock
  const outOfStockProducts = allProducts.filter(isCompletelyOutOfStock);

  // Prendre les 12 premiers produits en rupture
  const productsToDisplay = outOfStockProducts.slice(0, 12);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 TEST - Badges Rupture de Stock
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Cette page affiche UNIQUEMENT les produits complètement en rupture de stock
          </p>
          <p className="text-lg text-red-600 font-semibold">
            ✅ Chaque produit ci-dessous DOIT afficher un badge gris "Rupture de stock"
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-900">
              <strong>📊 Statistiques:</strong>
              <br />
              Total produits en rupture: {outOfStockProducts.length}
              <br />
              Affichés sur cette page: {productsToDisplay.length}
            </p>
          </div>
        </div>

        {productsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsToDisplay.map((product: any) => (
              <div key={product.id} className="relative">
                {/* Indicateur visuel supplémentaire pour le test */}
                <div className="absolute -top-2 -right-2 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  DOIT AVOIR BADGE
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600">
              Aucun produit en rupture de stock trouvé
            </p>
          </div>
        )}

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-yellow-900 mb-3">
            🔍 Vérification du Code Badge
          </h2>
          <p className="text-sm text-yellow-800 mb-2">
            Le badge "Rupture de stock" est implémenté dans <code className="bg-yellow-100 px-2 py-1 rounded">ProductCard.tsx</code>:
          </p>
          <ul className="text-sm text-yellow-800 list-disc list-inside space-y-1">
            <li>Ligne 68-72: Badge pour vue liste</li>
            <li>Ligne 203-207: Badge pour vue grille</li>
            <li>Fonction <code className="bg-yellow-100 px-2 py-1 rounded">isCompletelyOutOfStock()</code> dans utils.ts</li>
            <li>Vérifie stock du produit ET de tous les variants</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ← Retour à la page d'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
