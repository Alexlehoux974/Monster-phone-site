import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PanierPage from '../page';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Product } from '@/data/products';

// Mock du routeur Next.js
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock window.alert
global.alert = jest.fn();

// Mock des composants externes
jest.mock('@/components/Header', () => {
  return function Header() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock('@/components/Footer', () => {
  return function Footer() {
    return <div data-testid="footer">Footer</div>;
  };
});

jest.mock('@/components/ProductSuggestions', () => {
  return function ProductSuggestions() {
    return <div data-testid="product-suggestions">Product Suggestions</div>;
  };
});

// Produits mock pour les tests
const mockProduct1: Product = {
  id: '1',
  name: 'Test Product 1',
  brand: 'Test Brand',
  category: 'Test Category',
  sku: 'TEST-001',
  price: '29.99€',
  description: 'Test description 1',
  metaTitle: 'Test Meta Title',
  metaDescription: 'Test Meta Description',
  urlSlug: 'test-product-1',
  keywords: 'test, product',
  images: ['/test-image-1.jpg'],
  variants: 'Rouge',
  status: 'Publié'
};

const mockProduct2: Product = {
  ...mockProduct1,
  id: '2',
  name: 'Test Product 2',
  sku: 'TEST-002',
  price: '49.99€',
  urlSlug: 'test-product-2',
  images: ['/test-image-2.jpg'],
};

// Composant wrapper pour les tests
const TestWrapper: React.FC<{ children: React.ReactNode; cartItems?: { product: Product; quantity: number; variant?: string }[] }> = ({ 
  children, 
  cartItems = [] 
}) => {
  return (
    <AuthProvider>
      <CartProvider initialItems={cartItems}>
        {children}
      </CartProvider>
    </AuthProvider>
  );
};

describe('PanierPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display empty cart message when no items', () => {
    render(
      <TestWrapper>
        <PanierPage />
      </TestWrapper>
    );

    expect(screen.getByText('Votre panier est vide')).toBeInTheDocument();
    expect(screen.getByText('Découvrir nos produits')).toBeInTheDocument();
  });

  it('should display cart items', () => {
    const cartItems = [
      { product: mockProduct1, quantity: 2 },
      { product: mockProduct2, quantity: 1 }
    ];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    // Le panier affiche le nombre de produits uniques, pas la quantité totale
    expect(screen.getByText('Mon Panier (2 articles)')).toBeInTheDocument();
  });

  it('should update quantity', async () => {
    const cartItems = [{ product: mockProduct1, quantity: 1 }];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    // Augmenter la quantité
    const increaseButton = screen.getByLabelText('Augmenter la quantité');
    fireEvent.click(increaseButton);

    await waitFor(() => {
      // La quantité est affichée comme du texte simple, pas un input
      // On cherche le texte "2" qui représente la quantité
      const quantityText = screen.getByText('2');
      expect(quantityText).toBeInTheDocument();
      
      // Vérifier le prix total mis à jour (29.99 * 2 = 59.98)
      // Il y a plusieurs endroits où ce prix apparaît, on utilise getAllByText
      const priceTotals = screen.getAllByText('59.98 €');
      expect(priceTotals.length).toBeGreaterThan(0);
    });
  });

  it('should remove item from cart', async () => {
    const cartItems = [{ product: mockProduct1, quantity: 1 }];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    const removeButton = screen.getByLabelText('Supprimer du panier');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.getByText('Votre panier est vide')).toBeInTheDocument();
    });
  });

  it('should calculate totals correctly', () => {
    const cartItems = [
      { product: mockProduct1, quantity: 2 }, // 29.99 * 2 = 59.98
      { product: mockProduct2, quantity: 1 }  // 49.99
    ];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    // Sous-total - peut apparaître à plusieurs endroits
    const subtotalElements = screen.getAllByText('109.97 €');
    expect(subtotalElements.length).toBeGreaterThan(0);
    
    // Livraison gratuite car > 50€
    expect(screen.getByText('Gratuit')).toBeInTheDocument();
  });

  it('should show shipping cost for orders under 50€', () => {
    const cartItems = [{ product: mockProduct1, quantity: 1 }]; // 29.99€

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    // Frais de livraison - dans le composant, c'est affiché comme "4.99 €"
    expect(screen.getByText('4.99 €')).toBeInTheDocument();
    
    // Dans le composant actuel, il n'y a pas de message "Plus que X pour livraison gratuite"
    // mais il y a un message dans les informations supplémentaires
    expect(screen.getByText('✓ Livraison gratuite dès 50€ d\'achat')).toBeInTheDocument();
  });

  it('should apply promo code', async () => {
    const cartItems = [{ product: mockProduct1, quantity: 1 }];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    const promoInput = screen.getByPlaceholderText('Entrez votre code');
    const applyButton = screen.getByText('Appliquer');

    fireEvent.change(promoInput, { target: { value: 'MONSTER10' } });
    fireEvent.click(applyButton);

    // Le code promo applique une réduction de 10%
    await waitFor(() => {
      // 29.99 * 0.1 = 2.999, affiché comme -3.00 € dans la section Remise
      expect(screen.getByText('Remise')).toBeInTheDocument();
      expect(screen.getByText('-3.00 €')).toBeInTheDocument();
    });
  });

  it('should handle invalid promo code', async () => {
    const cartItems = [{ product: mockProduct1, quantity: 1 }];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    const promoInput = screen.getByPlaceholderText('Entrez votre code');
    const applyButton = screen.getByText('Appliquer');

    fireEvent.change(promoInput, { target: { value: 'INVALID' } });
    fireEvent.click(applyButton);

    // Le code invalide déclenche une alerte
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Code promo invalide');
    });
  });

  it('should navigate to checkout', () => {
    const cartItems = [{ product: mockProduct1, quantity: 1 }];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    const checkoutButton = screen.getByText('Procéder au paiement');
    fireEvent.click(checkoutButton);

    // Le composant vérifie si l'utilisateur est authentifié
    // Si non, il redirige vers /compte?redirect=/checkout
    // Sinon vers /checkout
    // Ici on teste le cas où l'utilisateur n'est pas authentifié
    expect(mockPush).toHaveBeenCalledWith('/compte?redirect=/checkout');
  });

  it('should clear entire cart', async () => {
    const cartItems = [
      { product: mockProduct1, quantity: 2 },
      { product: mockProduct2, quantity: 1 }
    ];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    const clearButton = screen.getByText('Vider le panier');
    fireEvent.click(clearButton);

    // Dans le composant actuel, il n'y a pas de modal de confirmation
    // Le panier est vidé directement
    await waitFor(() => {
      expect(screen.getByText('Votre panier est vide')).toBeInTheDocument();
    });
  });

  // Ce test n'est plus pertinent car il n'y a pas de modal de confirmation
  // it('should cancel cart clearing', async () => { ... });

  // Ce test n'est plus pertinent car il n'y a pas d'input field pour la quantité
  // La quantité ne peut être modifiée qu'avec les boutons +/-
  // it('should update quantity via input field', async () => { ... });

  it('should show product variants', () => {
    const cartItems = [{ product: mockProduct1, quantity: 1, variant: 'Rouge' }];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    expect(screen.getByText('Variante: Rouge')).toBeInTheDocument();
  });

  it('should display security badges', () => {
    const cartItems = [{ product: mockProduct1, quantity: 1 }];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    // Les badges dans le composant
    expect(screen.getByText('Paiement sécurisé')).toBeInTheDocument();
    expect(screen.getByText('100% sécurisé')).toBeInTheDocument();
    expect(screen.getByText('Livraison gratuite')).toBeInTheDocument();
    expect(screen.getByText('Retours faciles')).toBeInTheDocument();
  });

  it('should show login prompt for guests', () => {
    const cartItems = [{ product: mockProduct1, quantity: 1 }];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    // Dans le composant, pour les invités, il y a un message différent
    expect(screen.getByText('Vous devrez vous connecter pour finaliser votre commande')).toBeInTheDocument();
  });

  it('should handle multiple promo codes correctly', async () => {
    const cartItems = [{ product: mockProduct1, quantity: 1 }];

    render(
      <TestWrapper cartItems={cartItems}>
        <PanierPage />
      </TestWrapper>
    );

    // Appliquer BIENVENUE
    const promoInput = screen.getByPlaceholderText('Entrez votre code');
    const applyButton = screen.getByText('Appliquer');

    fireEvent.change(promoInput, { target: { value: 'BIENVENUE' } });
    fireEvent.click(applyButton);

    await waitFor(() => {
      // BIENVENUE donne une réduction fixe de 5€
      expect(screen.getByText('-5.00 €')).toBeInTheDocument();
    });

    // Essayer d'appliquer un autre code
    fireEvent.change(promoInput, { target: { value: 'MONSTER10' } });
    fireEvent.click(applyButton);

    await waitFor(() => {
      // MONSTER10 donne 10% de réduction, donc 29.99 * 0.1 = 3.00
      expect(screen.getByText('-3.00 €')).toBeInTheDocument();
      // Le premier code n'est plus appliqué
      expect(screen.queryByText('-5.00 €')).not.toBeInTheDocument();
    });
  });
});