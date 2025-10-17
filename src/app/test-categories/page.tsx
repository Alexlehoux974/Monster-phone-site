'use client';

import { useSupabaseProducts, useSupabaseCategories } from '@/hooks/useSupabaseData';
import { generateMenuStructureFromProducts } from '@/lib/supabase/adapters';
import { useEffect, useState } from 'react';

export default function TestCategories() {
  const { products: supabaseProducts } = useSupabaseProducts({ limit: 1000 });
  const { categories: supabaseCategories } = useSupabaseCategories();
  const [menuStructure, setMenuStructure] = useState<any[]>([]);

  useEffect(() => {
    if (supabaseProducts?.length > 0 && supabaseCategories?.length > 0) {
      // Les produits sont déjà convertis par useSupabaseProducts
      const structure = generateMenuStructureFromProducts(supabaseProducts, supabaseCategories);
      setMenuStructure(structure);
    }
  }, [supabaseProducts, supabaseCategories]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Test Structure Menu Supabase</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuStructure.map((category) => (
          <div key={category.slug} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <h2 className="text-xl font-bold">{category.name}</h2>
            </div>

            <div className="space-y-4">
              {category.subcategories.map((subcat: any) => (
                <div key={subcat.id} className="border-l-2 border-gray-200 pl-4">
                  <h3 className="font-semibold text-gray-700 mb-2">{subcat.name}</h3>

                  <div className="space-y-1">
                    {subcat.brands.map((brand: string) => (
                      <div key={brand} className="text-sm text-gray-600">
                        • {brand}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
              Total produits: {category.subcategories.reduce((acc: number, sub: any) => acc + sub.brands.length, 0)} marques
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <p>Produits chargés: {supabaseProducts?.length || 0}</p>
        <p>Catégories chargées: {supabaseCategories?.length || 0}</p>
        <p>Catégories dans le menu: {menuStructure.length}</p>
      </div>
    </div>
  );
}