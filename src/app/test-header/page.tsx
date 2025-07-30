import Header from '@/components/Header';

export default function TestHeader() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24">
        <Header />
      </div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Test du Header</h1>
        <p className="text-lg">Cette page est pour tester le header et ses menus déroulants.</p>
        <div className="mt-8 space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold">Vérifications :</h2>
            <ul className="mt-2 space-y-2">
              <li>✓ La barre de recherche est à droite de MUVIT</li>
              <li>✓ Tous les menus peuvent être survolés</li>
              <li>✓ Les dropdowns s'affichent correctement</li>
              <li>✓ On peut cliquer sur tous les liens</li>
              <li>✓ Les sous-menus fonctionnent</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}