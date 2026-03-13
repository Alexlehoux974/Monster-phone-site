# Plan d'implémentation — Audit E-commerce Monster Phone

## Contexte
Suite à un audit complet du site monster-phone.re, ce plan corrige tous les points identifiés sauf : méga-menu images, Google Reviews/Trustpilot, photo boutique/Maps, optimisations Framer Motion, blur placeholders, PWA, et analytics/tracking.

**Découvertes clés pendant l'exploration :**
- La barre de recherche desktop existe MAIS est masquée sur mobile (`hidden xl:flex`)
- Le badge panier (compteur articles) existe déjà
- La barre progression livraison gratuite existe déjà dans le panier
- Le champ code promo existe déjà dans le panier
- Le sticky sidebar checkout existe déjà
- Le ProductStickyBar mobile existe déjà
- Le filtre stock "En stock" existe mais est **cassé** (ligne 105 : `!filters.inStock || true` → toujours vrai)
- `isNewArrival` est hardcodé `false` dans l'adaptateur (ligne 169 adapters.ts)
- Le zoom image produit existe mais est basique (scale-150 toggle)

---

## PHASE 1 — Quick Wins textuels & config (Risque: Faible)

### 1.1 Renommer "LED" → "Éclairage LED"
- **Fichier**: `src/lib/supabase/menu-structure.ts:72` → `name: 'Éclairage LED'`
- **Fichier**: `src/components/Header.tsx:427` → `name: '💡 Éclairage LED'`
- **Fichier**: `src/components/CategoriesGrid.tsx:37` → `name: 'Éclairage LED'`

### 1.2 Renommer section smartphones homepage
- **Fichier**: `src/app/page.tsx:100` → `title="Nos Smartphones Vedettes"`
- Note: Le `SMARTPHONES_CATEGORY_ID` est la catégorie "smartphones" qui inclut toutes les marques — le titre seul suffit.

### 1.3 Limiter écouteurs à 6 + "Voir tout"
- **Fichier**: `src/app/page.tsx:86` → ajouter `.slice(0, 6)` : `const featuredEcouteurs = sortProductsByPriority(ecouteurs).slice(0, 6);`
- **Fichier**: `src/components/FeaturedProductsSupabase.tsx` → ajouter prop `viewAllHref?: string` et `viewAllLabel?: string`. Si fourni, remplacer le CTA "Voir tous nos produits" par un lien spécifique vers la catégorie.
- Passer `viewAllHref="/audio/ecouteurs"` et `viewAllLabel="Voir tous nos écouteurs"` depuis page.tsx.

### 1.4 Corriger filtre stock + activer par défaut
- **Fichier**: `src/app/nos-produits/products-client.tsx:61` → `inStock: true`
- **Fichier**: `src/app/nos-produits/products-client.tsx:105` → remplacer `const matchesStock = !filters.inStock || true;` par :
  ```ts
  const matchesStock = !filters.inStock ||
    (product.variants && product.variants.length > 0
      ? product.variants.some((v: any) => v.stock > 0)
      : product.status !== 'out-of-stock');
  ```

### 1.5 Tri par défaut "Meilleures ventes"
- **Fichier**: `src/app/nos-produits/products-client.tsx:67` → `useState<SortOption>('bestseller')`
- Note: `bestseller` tombe dans le case `relevance/default` qui trie par priorité (en stock > phare > prix desc). C'est un bon comportement par défaut.

### 1.6 "Acheter maintenant" → direct checkout
- **Fichier**: `src/components/ProductDetail.tsx` → trouver `router.push('/panier')` dans le handler "Procéder au paiement" et remplacer par `router.push('/checkout')`

**Vérification Phase 1**: `npm run build` + naviguer homepage, catalogue, fiche produit.

---

## PHASE 2 — Catalogue : rupture de stock & prix barrés (Risque: Faible)

### 2.1 Griser les produits en rupture + fin de liste
- **Fichier**: `src/components/ProductCard.tsx` → sur le div wrapper principal de la carte, ajouter conditionnellement `opacity-50 grayscale` quand `outOfStock` est true (la variable existe déjà dans le composant).
- **Fichier**: `src/app/nos-produits/products-client.tsx` → après le tri (ligne ~165), ajouter un tri stable :
  ```ts
  sorted.sort((a, b) => {
    const aInStock = a.variants?.some((v: any) => v.stock > 0) ? 0 : 1;
    const bInStock = b.variants?.some((v: any) => v.stock > 0) ? 0 : 1;
    return aInStock - bInStock;
  });
  ```

### 2.2 Prix barré visible sur cartes catalogue
- **Fichier**: `src/components/ProductCard.tsx` → vérifier que `originalPrice` et `discountPercent` sont bien affichés. Le composant le fait déjà via `adminDiscountPercent` sur les variants, mais il faut aussi gérer le cas `product.originalPrice > product.basePrice` (discount au niveau produit, pas variant). Ajouter une condition : si `originalPrice` existe et > `basePrice`, afficher le prix original barré.

**Vérification Phase 2**: Page catalogue → les produits en rupture sont grisés en fin de liste, les prix barrés sont visibles.

---

## PHASE 3 — Homepage améliorations (Risque: Moyen)

### 3.1 Hero avec image produit flagship
- **Fichier**: `src/components/MonsterPhoneHero.tsx` → ajouter prop `featuredProduct?: Product`. Dans le JSX, après les boutons CTA, ajouter un bloc conditionnel affichant :
  - Image du produit (next/image, 300x300)
  - Nom du produit
  - Prix original barré + prix actuel en gros
  - Lien vers la fiche produit
- **Fichier**: `src/app/page.tsx` → passer `featuredProduct={featuredSmartphones[0]}` à `<MonsterPhoneHero />`

### 3.2 Section "Nouveautés"
- **Fichier**: `src/lib/supabase/adapters.ts:169` → remplacer `isNewArrival: false` par `isNewArrival: !!(product as any).is_new_arrival || false`
- **Fichier**: `src/lib/supabase/api-rest.ts` → ajouter fonction `getNewArrivals(limit: number)` qui query les produits triés par `created_at DESC` avec `limit`.
- **Fichier**: `src/app/page.tsx` → ajouter section `<FeaturedProductsSupabase products={newArrivals} title="Nouveautés" viewAllHref="/nos-produits?sort=newest" />` après les smartphones.

### 3.3 Bannières promotionnelles entre sections
- **Fichier**: créer `src/components/PromoBanner.tsx` — composant réutilisable :
  ```tsx
  interface PromoBannerProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
    bgGradient?: string;
  }
  ```
  Suivre le pattern de `SmartphonePackBanner.tsx`.
- **Fichier**: `src/app/page.tsx` → insérer 1-2 bannières entre les sections (ex: entre FlashDeals et Collections, entre Collections et BrandCarousel).

**Vérification Phase 3**: Homepage affiche hero avec produit, section nouveautés, bannières entre sections.

---

## PHASE 4 — Recherche mobile & UX mobile (Risque: Moyen)

### 4.1 Overlay recherche mobile
- **Fichier**: `src/components/Header.tsx`
  1. Ajouter state : `const [mobileSearchOpen, setMobileSearchOpen] = useState(false);`
  2. Trouver le bouton search mobile (vers ligne 1015) → ajouter `onClick={() => setMobileSearchOpen(true)}`
  3. Ajouter un overlay conditionnel `{mobileSearchOpen && (...)}` avec :
     - `fixed inset-0 z-[200] bg-white p-4`
     - Input avec autoFocus, même logique de recherche que desktop
     - Suggestions dropdown
     - Bouton fermer (X)
  4. Réutiliser la logique de recherche existante (searchProducts, suggestions state)

### 4.2 Bouton WhatsApp flottant
- **Fichier**: créer `src/components/WhatsAppButton.tsx`
  ```tsx
  'use client';
  import { MessageCircle } from 'lucide-react';
  // fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg
  // href="https://wa.me/262262025102"
  // Masquer sur /checkout avec usePathname()
  ```
- **Fichier**: `src/app/layout.tsx` → rendre `<WhatsAppButton />` dans le body, après le CartProvider.

### 4.3 Tap-to-call
- **Fichier**: `src/components/Footer.tsx` → trouver les numéros de téléphone et les wrapper dans `<a href="tel:+262262025102">`
- **Fichier**: `src/app/contact/page.tsx` → idem pour le numéro affiché

### 4.4 Touch targets min 48px
- **Fichiers**: audit rapide de `Header.tsx` (boutons mobile), `Pagination.tsx`, `FilterPanel.tsx`
- Ajouter `min-h-[48px] min-w-[48px]` aux boutons interactifs mobiles
- S'assurer que les boutons +/- quantité dans le panier font au moins 48px

### 4.5 Filtres en bottom sheet mobile
- **Fichier**: `src/app/nos-produits/products-client.tsx` → modifier le rendu mobile du panneau filtres :
  - Remplacer `fixed inset-y-0 left-0` par `fixed bottom-0 left-0 right-0 rounded-t-2xl max-h-[80vh]`
  - Ajouter une barre de drag en haut (`w-12 h-1.5 bg-gray-300 rounded-full mx-auto`)
  - Animation slide-up au lieu de slide-left

### 4.6 Scroll snap sur carousels
- **Fichier**: `src/components/FeaturedProductsSupabase.tsx` → ajouter `scroll-snap-type: x mandatory` sur le container et `scroll-snap-align: start` sur chaque carte.

**Vérification Phase 4**: Tester sur viewport mobile — recherche, WhatsApp, tap-to-call, filtres, taille boutons.

---

## PHASE 5 — Fiche produit CRO (Risque: Moyen)

### 5.1 "X personnes regardent ce produit"
- **Fichier**: `src/components/ProductDetail.tsx` → ajouter près de l'indicateur stock :
  ```tsx
  const [viewerCount] = useState(() => Math.floor(Math.random() * 8) + 3);
  // ...
  <div className="flex items-center gap-2 text-orange-600 text-sm">
    <Eye className="w-4 h-4" /> {viewerCount} personnes regardent ce produit
  </div>
  ```
  Ajouter un useEffect avec interval qui varie légèrement le nombre toutes les 15-30s.

### 5.2 Galerie lightbox améliorée
- **Fichier**: `src/components/ProductDetail.tsx` → remplacer le zoom basique par un overlay fullscreen :
  - Créer un composant inline `ImageLightbox` : `fixed inset-0 z-50 bg-black/90 flex items-center justify-center`
  - Navigation gauche/droite entre images
  - Bouton fermer
  - Swipe support sur mobile via touch events
  - Pinch-to-zoom basique via CSS `touch-action: pinch-zoom`

### 5.3 Logos paiement sur fiche produit
- **Fichier**: `src/components/ProductDetail.tsx` → importer et rendre `<PaymentLogos />` sous la section add-to-cart. Vérifier que PaymentLogos s'adapte au fond clair (ajuster classes si nécessaire).

### 5.4 Badge "Meilleur prix garanti à La Réunion"
- **Fichier**: `src/components/ProductDetail.tsx` → ajouter près du prix :
  ```tsx
  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
    <Shield className="w-4 h-4" /> Meilleur prix garanti à La Réunion
  </div>
  ```

### 5.5 Quick View modal catalogue
- **Fichier**: créer `src/components/QuickViewModal.tsx`
  - Portal-based modal (createPortal ou div fixé)
  - Props: `product: Product`, `isOpen: boolean`, `onClose: () => void`
  - Contenu: image, nom, prix, description courte, sélecteur variant, bouton ajouter au panier, lien "Voir le produit"
- **Fichier**: `src/components/ProductCard.tsx` → ajouter icône Eye en overlay sur l'image au hover. onClick ouvre QuickViewModal.

### 5.6 Filtres spécifiques smartphones (stockage, RAM)
- **Fichier**: `src/components/FilterPanel.tsx` → ajouter sections conditionnelles pour Stockage et RAM
  - Extraire les valeurs uniques depuis `product.specifications` (clés "Stockage", "RAM", "Taille écran")
  - Ajouter dans FilterState : `storage: string[]`, `ram: string[]`
  - N'afficher ces filtres que si des produits dans la liste ont ces specs

**Vérification Phase 5**: Fiches produits avec viewer count, lightbox, badges. Quick view depuis catalogue. Filtres smartphones.

---

## PHASE 6 — Panier & Checkout (Risque: Élevé — tester minutieusement)

### 6.1 Panier vide : suggestions
- **Fichier**: `src/app/panier/page.tsx` → dans le bloc empty cart, ajouter une section "Nos best-sellers" avec import de produits via un fetch client-side (hook existant ou appel API `/api/list-products?limit=4&sort=bestseller`).

### 6.2 Cross-sell dans le panier plein
- **Fichier**: `src/app/panier/page.tsx` → après la liste des items, rendre `<ProductSuggestions />` (composant existant) avec les items du panier comme contexte.

### 6.3 Barre de progression checkout
- **Fichier**: `src/app/checkout/page.tsx` → ajouter en haut un composant inline `CheckoutProgressBar` :
  ```tsx
  // 4 étapes : Panier ✓ → Livraison ✓ → Paiement (actif) → Confirmation
  // Flex horizontal avec cercles numérotés et barres de connexion
  ```

### 6.4 "Commander sans compte" prominent
- **Fichier**: `src/app/checkout/page.tsx` → ajouter un bandeau vert en haut du formulaire :
  ```tsx
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
    <p className="text-green-800 text-sm font-medium">Commandez sans créer de compte — simple et rapide !</p>
  </div>
  ```

### 6.5 Logos paiement + badges sécurité sur checkout
- **Fichier**: `src/app/checkout/page.tsx` → importer `PaymentLogos` et le rendre à côté du bouton de paiement. Ajouter un badge avec cadenas : "Paiement 100% sécurisé — SSL 256-bit".

### 6.6 Apple Pay / Google Pay via Stripe Payment Request
- **Fichier**: `src/app/api/create-checkout-session/route.ts` → changer `payment_method_types: ['card']` en `payment_method_types: ['card', 'link']` (Stripe Link pour les wallets). Alternative : utiliser `payment_method_types: undefined` pour laisser Stripe activer automatiquement tous les moyens de paiement configurés dans le dashboard.
- **Note importante**: Stripe Checkout (hosted) supporte Apple Pay/Google Pay automatiquement si activés dans le dashboard Stripe. Il suffit de retirer la restriction `payment_method_types: ['card']` pour que Stripe affiche tous les moyens de paiement activés. C'est l'approche la plus simple et sûre.
- Vérifier dans le dashboard Stripe que Apple Pay et Google Pay sont activés.

**Vérification Phase 6**: Tester le parcours complet : panier vide → suggestions → ajouter produit → cross-sell → checkout → vérifier progression, badges, guest message. Tester le paiement en mode test Stripe.

---

## PHASE 7 — Performance (Risque: Faible)

### 7.1 ISR sur la homepage
- **Fichier**: `src/app/page.tsx:15-17` → remplacer :
  ```ts
  export const dynamic = 'force-dynamic';
  export const revalidate = 0;
  export const fetchCache = 'force-no-store';
  ```
  par :
  ```ts
  export const revalidate = 120; // ISR: revalidate toutes les 2 minutes
  ```
- **Fichier**: `next.config.ts` → retirer les headers no-cache sur `/produit/:slug` (les garder sur `/api/` pour les données dynamiques).
- Note: Les composants client avec subscriptions Supabase temps réel continuent de fonctionner pour les mises à jour live.

### 7.2 Prefetch
- Vérifier que les `<Link>` dans ProductCard.tsx n'ont pas `prefetch={false}`. Next.js prefetch par défaut — aucun changement nécessaire si pas explicitement désactivé.

**Vérification Phase 7**: `npm run build` → vérifier que les pages sont générées en mode ISR. Mesurer le temps de chargement avant/après.

---

## PHASE 8 — Pages contenu (Risque: Faible)

### 8.1 Page "À propos"
- **Fichier**: créer `src/app/a-propos/page.tsx`
  - Server component avec Header + Footer
  - Sections : histoire de Monster Phone, mission, valeurs, engagement La Réunion
  - Suivre le pattern des pages `/legal/*`
- **Fichier**: `src/components/Footer.tsx` → ajouter lien "À propos" dans la navigation footer

### 8.2 Comparaison produits (OPTIONNEL — complexité élevée)
- Créer `src/contexts/CompareContext.tsx` — max 3 produits
- Ajouter bouton "Comparer" sur ProductCard
- Barre flottante de comparaison en bas
- Page `/comparer` avec tableau comparatif
- **Reporter si le scope est trop large** — peut être fait en phase ultérieure

**Vérification Phase 8**: Naviguer vers /a-propos, vérifier le rendu. Vérifier le lien dans le footer.

---

## Fichiers critiques à modifier

| Fichier | Phases |
|---------|--------|
| `src/lib/supabase/menu-structure.ts` | 1 |
| `src/app/page.tsx` | 1, 3 |
| `src/app/nos-produits/products-client.tsx` | 1, 2, 4 |
| `src/components/ProductCard.tsx` | 2, 5 |
| `src/components/FeaturedProductsSupabase.tsx` | 1, 4 |
| `src/components/Header.tsx` | 1, 4 |
| `src/components/ProductDetail.tsx` | 1, 5 |
| `src/components/MonsterPhoneHero.tsx` | 3 |
| `src/lib/supabase/adapters.ts` | 3 |
| `src/lib/supabase/api-rest.ts` | 3 |
| `src/app/panier/page.tsx` | 6 |
| `src/app/checkout/page.tsx` | 6 |
| `src/app/api/create-checkout-session/route.ts` | 6 |
| `src/app/layout.tsx` | 4 |
| `src/components/Footer.tsx` | 4, 8 |
| `next.config.ts` | 7 |

## Composants à créer

| Fichier | Phase | Description |
|---------|-------|-------------|
| `src/components/PromoBanner.tsx` | 3 | Bannière promo réutilisable |
| `src/components/WhatsAppButton.tsx` | 4 | Bouton flottant WhatsApp |
| `src/components/QuickViewModal.tsx` | 5 | Modal aperçu rapide produit |
| `src/app/a-propos/page.tsx` | 8 | Page À propos |

## Stratégie de test

Après chaque phase :
1. `npm run build` — vérifier 0 erreurs
2. `npm run dev` — navigation manuelle des pages impactées
3. Tester sur viewport mobile (375px) et desktop (1440px)
4. Phase 6 spécifiquement : tester le parcours d'achat complet en mode test Stripe
