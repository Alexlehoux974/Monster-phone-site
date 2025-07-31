import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CheckoutPage from '../page';
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

// Mock window.scrollTo
global.scrollTo = jest.fn();

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

// Produit mock pour les tests
const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  brand: 'Test Brand',
  category: 'Test Category',
  sku: 'TEST-001',
  price: '29.99€',
  description: 'Test description',
  metaTitle: 'Test Meta Title',
  metaDescription: 'Test Meta Description',
  urlSlug: 'test-product',
  keywords: 'test, product',
  images: ['/test-image.jpg'],
  variants: 'Rouge',
  status: 'Publié'
};

// Composant wrapper pour les tests
const TestWrapper: React.FC<{ children: React.ReactNode; cartItems?: { product: Product; quantity: number }[] }> = ({ 
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

describe('CheckoutPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to cart if no items', () => {
    render(
      <TestWrapper cartItems={[]}>
        <CheckoutPage />
      </TestWrapper>
    );

    expect(mockPush).toHaveBeenCalledWith('/panier');
  });

  it('should display checkout form with items in cart', async () => {
    const cartItems = [{ product: mockProduct, quantity: 2 }];
    
    render(
      <TestWrapper cartItems={cartItems}>
        <CheckoutPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Finaliser ma commande')).toBeInTheDocument();
    });
  });

  it('should navigate through checkout steps', async () => {
    const cartItems = [{ product: mockProduct, quantity: 1 }];
    
    render(
      <TestWrapper cartItems={cartItems}>
        <CheckoutPage />
      </TestWrapper>
    );

    // Étape 1: Livraison
    await waitFor(() => {
      expect(screen.getByText('Informations de livraison')).toBeInTheDocument();
    });

    // Remplir le formulaire de livraison
    fireEvent.change(screen.getByLabelText(/Prénom/), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByLabelText(/Nom/), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'jean@example.com' } });
    fireEvent.change(screen.getByLabelText(/Téléphone/), { target: { value: '+262692123456' } });
    fireEvent.change(screen.getByLabelText(/Adresse/), { target: { value: '123 Rue Test' } });
    fireEvent.change(screen.getByLabelText(/Ville/), { target: { value: 'Saint-Denis' } });
    fireEvent.change(screen.getByLabelText(/Code postal/), { target: { value: '97400' } });

    // Passer à l'étape suivante
    const continueButton = screen.getByText('Continuer');
    fireEvent.click(continueButton);

    // Étape 2: Paiement
    await waitFor(() => {
      expect(screen.getByText('Informations de paiement')).toBeInTheDocument();
    });
  });

  it('should validate required fields', async () => {
    const cartItems = [{ product: mockProduct, quantity: 1 }];
    
    render(
      <TestWrapper cartItems={cartItems}>
        <CheckoutPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Informations de livraison')).toBeInTheDocument();
    });

    // Essayer de continuer sans remplir les champs
    const continueButton = screen.getByText('Continuer');
    fireEvent.click(continueButton);

    // Vérifier les messages d'erreur
    await waitFor(() => {
      expect(screen.getByText('Prénom requis')).toBeInTheDocument();
      expect(screen.getByText('Nom requis')).toBeInTheDocument();
      expect(screen.getByText('Email requis')).toBeInTheDocument();
    });
  });

  it('should calculate shipping costs correctly', async () => {
    const cartItems = [{ product: mockProduct, quantity: 1 }];
    
    render(
      <TestWrapper cartItems={cartItems}>
        <CheckoutPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Résumé')).toBeInTheDocument();
    });

    // Vérifier le résumé de la commande dans la sidebar
    const summarySection = screen.getByText('Résumé').closest('div');
    
    // Prix sous-total (dans la section totaux)
    const totalsSection = summarySection?.querySelector('.border-t.pt-4');
    expect(totalsSection?.textContent).toContain('29.99 €');

    // Livraison standard (sous 50€)
    expect(totalsSection?.textContent).toContain('4.99 €');
  });

  it('should show free shipping for orders over 50€', async () => {
    const expensiveProduct = { ...mockProduct, price: '60.00€' };
    const cartItems = [{ product: expensiveProduct, quantity: 1 }];
    
    render(
      <TestWrapper cartItems={cartItems}>
        <CheckoutPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Résumé')).toBeInTheDocument();
    });

    // Vérifier le résumé de la commande dans la sidebar
    const summarySection = screen.getByText('Résumé').closest('div');
    
    // Livraison gratuite
    const totalsSection = summarySection?.querySelector('.border-t.pt-4');
    expect(totalsSection?.textContent).toContain('Gratuit');
  });

  it('should handle payment method selection', async () => {
    const cartItems = [{ product: mockProduct, quantity: 1 }];
    
    render(
      <TestWrapper cartItems={cartItems}>
        <CheckoutPage />
      </TestWrapper>
    );

    // Remplir le formulaire de livraison rapidement
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Prénom/), { target: { value: 'Jean' } });
      fireEvent.change(screen.getByLabelText(/Nom/), { target: { value: 'Dupont' } });
      fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'jean@example.com' } });
      fireEvent.change(screen.getByLabelText(/Téléphone/), { target: { value: '+262692123456' } });
      fireEvent.change(screen.getByLabelText(/Adresse/), { target: { value: '123 Rue Test' } });
      fireEvent.change(screen.getByLabelText(/Ville/), { target: { value: 'Saint-Denis' } });
      fireEvent.change(screen.getByLabelText(/Code postal/), { target: { value: '97400' } });
    });

    fireEvent.click(screen.getByText('Continuer'));

    // Vérifier les options de paiement
    await waitFor(() => {
      expect(screen.getByText('Carte bancaire')).toBeInTheDocument();
      expect(screen.getByText('PayPal')).toBeInTheDocument();
    });

    // Sélectionner PayPal
    const paypalOption = screen.getByLabelText(/PayPal/);
    fireEvent.click(paypalOption);

    // Vérifier que le message PayPal s'affiche
    expect(screen.getByText(/redirigé vers PayPal/)).toBeInTheDocument();
  });

  it('should complete order successfully', async () => {
    const cartItems = [{ product: mockProduct, quantity: 1 }];
    
    render(
      <TestWrapper cartItems={cartItems}>
        <CheckoutPage />
      </TestWrapper>
    );

    // Étape 1: Remplir les informations de livraison
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Prénom/), { target: { value: 'Jean' } });
      fireEvent.change(screen.getByLabelText(/Nom/), { target: { value: 'Dupont' } });
      fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'jean@example.com' } });
      fireEvent.change(screen.getByLabelText(/Téléphone/), { target: { value: '+262692123456' } });
      fireEvent.change(screen.getByLabelText(/Adresse/), { target: { value: '123 Rue Test' } });
      fireEvent.change(screen.getByLabelText(/Ville/), { target: { value: 'Saint-Denis' } });
      fireEvent.change(screen.getByLabelText(/Code postal/), { target: { value: '97400' } });
    });

    fireEvent.click(screen.getByText('Continuer'));

    // Étape 2: Informations de paiement
    await waitFor(() => {
      expect(screen.getByText('Informations de paiement')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Numéro de carte/), { target: { value: '1234 5678 9012 3456' } });
      fireEvent.change(screen.getByLabelText(/Nom sur la carte/), { target: { value: 'JEAN DUPONT' } });
      fireEvent.change(screen.getByLabelText(/Date d'expiration/), { target: { value: '12/25' } });
      fireEvent.change(screen.getByLabelText(/CVV/), { target: { value: '123' } });
    });

    fireEvent.click(screen.getByText('Continuer'));

    // Étape 3: Confirmation
    await waitFor(() => {
      expect(screen.getByText('Vérification et confirmation')).toBeInTheDocument();
    });

    // Accepter les conditions
    const termsCheckbox = screen.getByLabelText(/J'accepte les conditions/);
    fireEvent.click(termsCheckbox);

    // Finaliser la commande
    const confirmButton = screen.getByText(/Confirmer et payer/);
    fireEvent.click(confirmButton);

    // Vérifier la page de confirmation
    await waitFor(() => {
      expect(screen.getByText('Commande confirmée !')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should handle express shipping selection', async () => {
    const cartItems = [{ product: mockProduct, quantity: 1 }];
    
    render(
      <TestWrapper cartItems={cartItems}>
        <CheckoutPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Mode de livraison')).toBeInTheDocument();
    });

    // Sélectionner livraison express
    const expressOption = screen.getByLabelText(/Livraison express/);
    fireEvent.click(expressOption);

    // Vérifier que le prix s'affiche
    expect(screen.getByText('9,99 €')).toBeInTheDocument();
  });

  it('should display order details in final step', async () => {
    const cartItems = [{ product: mockProduct, quantity: 2 }];
    
    render(
      <TestWrapper cartItems={cartItems}>
        <CheckoutPage />
      </TestWrapper>
    );

    // Remplir rapidement toutes les étapes
    await act(async () => {
      // Étape 1
      fireEvent.change(screen.getByLabelText(/Prénom/), { target: { value: 'Jean' } });
      fireEvent.change(screen.getByLabelText(/Nom/), { target: { value: 'Dupont' } });
      fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'jean@example.com' } });
      fireEvent.change(screen.getByLabelText(/Téléphone/), { target: { value: '+262692123456' } });
      fireEvent.change(screen.getByLabelText(/Adresse/), { target: { value: '123 Rue Test' } });
      fireEvent.change(screen.getByLabelText(/Ville/), { target: { value: 'Saint-Denis' } });
      fireEvent.change(screen.getByLabelText(/Code postal/), { target: { value: '97400' } });
    });

    fireEvent.click(screen.getByText('Continuer'));

    // Étape 2
    await waitFor(() => {
      expect(screen.getByText('Informations de paiement')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Numéro de carte/), { target: { value: '1234 5678 9012 3456' } });
      fireEvent.change(screen.getByLabelText(/Nom sur la carte/), { target: { value: 'JEAN DUPONT' } });
      fireEvent.change(screen.getByLabelText(/Date d'expiration/), { target: { value: '12/25' } });
      fireEvent.change(screen.getByLabelText(/CVV/), { target: { value: '123' } });
    });

    fireEvent.click(screen.getByText('Continuer'));

    // Vérifier le récapitulatif
    await waitFor(() => {
      expect(screen.getByText('Jean Dupont')).toBeInTheDocument();
      expect(screen.getByText('123 Rue Test')).toBeInTheDocument();
      expect(screen.getByText('97400 Saint-Denis')).toBeInTheDocument();
    });
  });
});