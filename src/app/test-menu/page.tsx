'use client';

import { useSupabaseMenu } from '@/hooks/useSupabaseData';

export default function TestMenuPage() {
  const { menuStructure, loading } = useSupabaseMenu();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Menu Structure Test</h1>
      {menuStructure && (
        <div className="space-y-4">
          {menuStructure.map((category: any) => (
            <div key={category.slug} className="border p-4">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <p className="text-sm text-gray-600">Slug: {category.slug}</p>
              {category.subcategories && category.subcategories.length > 0 && (
                <div className="mt-2 ml-4">
                  <h3 className="font-medium">Subcategories:</h3>
                  <ul className="list-disc list-inside">
                    {category.subcategories.map((subcat: any) => (
                      <li key={subcat.slug}>
                        {subcat.name} ({subcat.slug}) - {subcat.brands?.length || 0} brands
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <pre className="mt-8 p-4 bg-gray-100 overflow-auto text-xs">
        {JSON.stringify(menuStructure, null, 2)}
      </pre>
    </div>
  );
}