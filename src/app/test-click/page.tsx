'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestClickPage() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Test d'interactivité</h1>
      
      <div className="space-y-4">
        {/* Test bouton simple */}
        <div>
          <button 
            onClick={() => {
              setClickCount(clickCount + 1);
              console.log('Button clicked!', clickCount + 1);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cliquez-moi ({clickCount} clics)
          </button>
        </div>

        {/* Test lien Next.js */}
        <div>
          <Link href="/" className="text-blue-600 underline hover:text-blue-800">
            Retour à l'accueil (Link Next.js)
          </Link>
        </div>

        {/* Test lien HTML normal */}
        <div>
          <a href="/" className="text-green-600 underline hover:text-green-800">
            Retour à l'accueil (lien HTML)
          </a>
        </div>

        {/* Test input */}
        <div>
          <input 
            type="text" 
            placeholder="Tapez quelque chose..." 
            className="border border-gray-300 px-3 py-2 rounded"
            onChange={(e) => console.log('Input:', e.target.value)}
          />
        </div>

        {/* Test avec un div cliquable */}
        <div 
          onClick={() => alert('Div cliqué!')}
          className="bg-yellow-200 p-4 rounded cursor-pointer hover:bg-yellow-300"
        >
          Cliquez sur ce div
        </div>
      </div>

      <div className="mt-8 p-4 bg-white rounded shadow">
        <h2 className="font-bold mb-2">Diagnostics:</h2>
        <p>Si aucun élément n'est cliquable, le problème vient probablement d'un overlay ou d'un z-index.</p>
        <p>Nombre de clics sur le bouton: {clickCount}</p>
      </div>
    </div>
  );
}