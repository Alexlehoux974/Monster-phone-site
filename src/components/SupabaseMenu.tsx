import Link from 'next/link';
import { Database, Package } from 'lucide-react';

export default function SupabaseMenu() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Link
        href="/produits-supabase"
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
      >
        <Database className="w-5 h-5" />
        <span className="text-sm font-medium">Produits Supabase</span>
      </Link>
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-1 shadow-lg">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Package className="w-4 h-4" />
          <span>Stock temps réel</span>
        </div>
      </div>
    </div>
  );
}