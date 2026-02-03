'use client';

import { useEffect } from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('❌ [ADMIN ERROR BOUNDARY]', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 max-w-md w-full text-center">
        <div className="text-red-500 text-4xl mb-4">⚠</div>
        <h2 className="text-xl font-bold text-white mb-2">
          Une erreur est survenue
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          {error.message || 'Erreur inattendue dans le panneau admin.'}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Réessayer
          </button>
          <a
            href="/admin"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
          >
            Tableau de bord
          </a>
        </div>
      </div>
    </div>
  );
}
