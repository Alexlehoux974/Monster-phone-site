import { useMemo } from 'react';
import { Product } from '@/data/products';
import { CartItem } from '@/contexts/CartContext';

export function useProductSuggestions(
  cartItems: CartItem[],
  availableProducts: Product[],
  limit: number = 4
) {
  const suggestions = useMemo(() => {
    // Extraire les catégories et marques des produits dans le panier
    const cartCategories = new Set(cartItems.map(item => item.product.categoryName));
    const cartBrands = new Set(cartItems.map(item => item.product.brandName));
    const cartProductIds = new Set(cartItems.map(item => item.product.id));

    // Calculer un score pour chaque produit
    const scoredProducts = availableProducts
      .filter(product => !cartProductIds.has(product.id)) // Exclure les produits déjà dans le panier
      .map(product => {
        let score = 0;

        // Bonus si même catégorie
        if (cartCategories.has(product.categoryName)) {
          score += 3;
        }

        // Bonus si même marque
        if (cartBrands.has(product.brandName)) {
          score += 2;
        }

        // Bonus pour les accessoires si des téléphones sont dans le panier
        const hasPhones = cartItems.some(item => item.product.categoryName === 'Smartphones');
        if (hasPhones && product.categoryName !== 'Smartphones') {
          score += 1;
        }

        // Bonus aléatoire pour la diversité
        score += Math.random() * 0.5;

        return { product, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);

    // Si pas assez de suggestions, compléter avec des produits populaires
    if (scoredProducts.length < limit) {
      const remaining = limit - scoredProducts.length;
      const popular = availableProducts
        .filter(product =>
          !cartProductIds.has(product.id) &&
          !scoredProducts.some(p => p.id === product.id)
        )
        .slice(0, remaining);

      return [...scoredProducts, ...popular];
    }

    return scoredProducts;
  }, [cartItems, availableProducts, limit]);

  return suggestions;
}