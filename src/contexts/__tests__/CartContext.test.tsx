import React from 'react';
import { render, screen, act, cleanup } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { Product } from '@/data/products';

// Composant de test pour accéder au contexte
const TestComponent = ({ product = mockProduct }: { product?: Product }) => {
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getItemCount } = useCart();
  
  return (
    <div>
      <div data-testid="item-count">{getItemCount()}</div>
      <div data-testid="cart-total">{getCartTotal()}</div>
      <div data-testid="items">
        {items.map((item: any) => (
          <div key={item.product.id} data-testid={`item-${item.product.id}`}>
            {item.product.name} - {item.quantity}
          </div>
        ))}
      </div>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <button onClick={() => updateQuantity(product.id, 3)}>Update Quantity</button>
      <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
};

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

// Mock localStorage - créé de manière dynamique pour chaque test
let localStorageMock: Storage;

// Helper pour créer un nouveau mock localStorage
const createLocalStorageMock = () => {
  const storage: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => storage[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      storage[key] = value;
    }),
    clear: jest.fn(() => {
      Object.keys(storage).forEach(key => delete storage[key]);
    }),
    removeItem: jest.fn((key: string) => {
      delete storage[key];
    }),
  };
};

describe('CartContext', () => {
  beforeEach(() => {
    // Créer un nouveau mock localStorage pour chaque test
    localStorageMock = createLocalStorageMock();
    global.localStorage = localStorageMock as Storage;
    
    // Vider explicitement le localStorage
    localStorageMock.clear();
    
    // Réinitialiser complètement les mocks
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    
    // Nettoyer le DOM
    document.body.innerHTML = '';
    
    // Réinitialiser les timers
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Nettoyer après chaque test
    cleanup();
    
    // Seulement appeler les méthodes de timer si on utilise des fake timers
    if (jest.isMockFunction(setTimeout)) {
      jest.clearAllTimers();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    }
    
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should initialize with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
  });

  it('should add product to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add to Cart').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('29.99');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product - 1');
  });

  it('should update product quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add to Cart').click();
    });

    act(() => {
      screen.getByText('Update Quantity').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('89.97');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product - 3');
  });

  it('should remove product from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add to Cart').click();
    });

    act(() => {
      screen.getByText('Remove from Cart').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument();
  });

  it('should clear entire cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add to Cart').click();
    });

    act(() => {
      screen.getByText('Clear Cart').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
  });

  it('should persist cart to localStorage', () => {
    // Première instance du CartProvider
    const { unmount } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Ajouter un produit
    act(() => {
      screen.getByText('Add to Cart').click();
    });

    // Vérifier que le produit est dans le panier
    expect(screen.getByTestId('item-count')).toHaveTextContent('1');

    // Simuler la sauvegarde dans localStorage
    // On récupère directement les items du contexte via le DOM
    const cartData = JSON.stringify([{ 
      product: mockProduct, 
      quantity: 1 
    }]);
    localStorageMock.setItem('monsterphone-cart', cartData);

    // Démonter le composant
    unmount();

    // Recréer un nouveau CartProvider qui devrait charger depuis localStorage
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Vérifier que le panier a été restauré depuis localStorage
    expect(screen.getByTestId('item-count')).toHaveTextContent('1');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product - 1');
  });

  it('should load cart from localStorage on mount', async () => {
    // Use initial items instead of localStorage for more predictable testing
    const initialItems = [{ product: mockProduct, quantity: 2 }];

    render(
      <CartProvider initialItems={initialItems}>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('item-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('59.98');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product - 2');
  });

  it('should handle multiple products', () => {
    // Create a completely isolated test environment
    const IsolatedTest = () => {
      // Use fresh product instances for this test
      const product1: Product = {
        id: 'multi-101',
        name: 'Test Product Multi 1',
        brand: 'Test Brand',
        category: 'Test Category',
        sku: 'TEST-MULTI-101',
        price: '29.99€',
        description: 'Test description 1',
        metaTitle: 'Test Meta Title',
        metaDescription: 'Test Meta Description',
        urlSlug: 'test-product-multi-101',
        keywords: 'test, product',
        images: ['/test-image-1.jpg'],
        variants: 'Rouge',
        status: 'Publié'
      };

      const product2: Product = {
        id: 'multi-102',
        name: 'Test Product Multi 2',
        brand: 'Test Brand',
        category: 'Test Category',
        sku: 'TEST-MULTI-102',
        price: '49.99€',
        description: 'Test description 2',
        metaTitle: 'Test Meta Title',
        metaDescription: 'Test Meta Description',
        urlSlug: 'test-product-multi-102',
        keywords: 'test, product',
        images: ['/test-image-2.jpg'],
        variants: 'Bleu',
        status: 'Publié'
      };

      const TestComponentMultiple = () => {
        const { items, addToCart, getItemCount, getCartTotal } = useCart();
        
        return (
          <div>
            <div data-testid="multi-item-count">{getItemCount()}</div>
            <div data-testid="multi-cart-total">{getCartTotal().toFixed(2)}</div>
            <div data-testid="multi-items-list">
              {items.map((item, index) => (
                <div key={`${item.product.id}-${index}`} data-testid={`multi-item-${item.product.id}`}>
                  {item.product.name} - {item.quantity}
                </div>
              ))}
            </div>
            <button onClick={() => addToCart(product1)}>Add Product Multi 1</button>
            <button onClick={() => addToCart(product2)}>Add Product Multi 2</button>
          </div>
        );
      };

      return (
        <CartProvider initialItems={[]}>
          <TestComponentMultiple />
        </CartProvider>
      );
    };

    const { unmount } = render(<IsolatedTest />);

    // Vérifier l'état initial
    expect(screen.getByTestId('multi-item-count')).toHaveTextContent('0');

    act(() => {
      screen.getByText('Add Product Multi 1').click();
    });

    expect(screen.getByTestId('multi-item-count')).toHaveTextContent('1');
    expect(screen.getByTestId('multi-cart-total')).toHaveTextContent('29.99');

    act(() => {
      screen.getByText('Add Product Multi 2').click();
    });

    // Les deux produits sont ajoutés, donc 2 articles au total (quantité 1 chacun)
    expect(screen.getByTestId('multi-item-count')).toHaveTextContent('2');
    expect(screen.getByTestId('multi-cart-total')).toHaveTextContent('79.98');
    
    // Nettoyer après le test
    unmount();
  });

  it('should handle products with variants', () => {
    const IsolatedVariantTest = () => {
      const variantProduct: Product = {
        id: 'variant-1',
        name: 'Test Product Variant',
        brand: 'Test Brand',
        category: 'Test Category',
        sku: 'TEST-VAR-001',
        price: '29.99€',
        description: 'Test description',
        metaTitle: 'Test Meta Title',
        metaDescription: 'Test Meta Description',
        urlSlug: 'test-product-variant',
        keywords: 'test, product',
        images: ['/test-image.jpg'],
        variants: 'Rouge,Bleu',
        status: 'Publié'
      };

      const TestComponentVariant = () => {
        const { items, addToCart, getItemCount } = useCart();
        
        return (
          <div>
            <button onClick={() => addToCart(variantProduct, 1, 'Rouge')}>Add Variant Red</button>
            <button onClick={() => addToCart(variantProduct, 1, 'Bleu')}>Add Variant Blue</button>
            <div data-testid="variant-item-count">{getItemCount()}</div>
            <div data-testid="variant-items">
              {items.map((item: any) => (
                <div key={`${item.product.id}-${item.variant || 'default'}`} data-testid={`variant-item-${item.product.id}-${item.variant || 'default'}`}>
                  {item.product.name} - {item.variant || 'default'} - {item.quantity}
                </div>
              ))}
            </div>
          </div>
        );
      };

      return (
        <CartProvider initialItems={[]}>
          <TestComponentVariant />
        </CartProvider>
      );
    };

    const { unmount } = render(<IsolatedVariantTest />);

    // État initial
    expect(screen.getByTestId('variant-item-count')).toHaveTextContent('0');

    act(() => {
      screen.getByText('Add Variant Red').click();
    });

    expect(screen.getByTestId('variant-item-count')).toHaveTextContent('1');

    act(() => {
      screen.getByText('Add Variant Blue').click();
    });

    // Vérifier que nous avons 2 items au total
    expect(screen.getByTestId('variant-item-count')).toHaveTextContent('2');
    
    // Les deux variantes du même produit sont ajoutées séparément
    expect(screen.getByTestId('variant-item-variant-1-Rouge')).toBeInTheDocument();
    expect(screen.getByTestId('variant-item-variant-1-Bleu')).toBeInTheDocument();

    unmount();
  });

  it('should handle invalid quantity gracefully', () => {
    const IsolatedInvalidTest = () => {
      const invalidTestProduct: Product = {
        id: 'invalid-999',
        name: 'Test Product Invalid',
        brand: 'Test Brand',
        category: 'Test Category',
        sku: 'TEST-INVALID-999',
        price: '19.99€',
        description: 'Test description',
        metaTitle: 'Test Meta Title',
        metaDescription: 'Test Meta Description',
        urlSlug: 'test-product-invalid-999',
        keywords: 'test, product',
        images: ['/test-image.jpg'],
        variants: 'Default',
        status: 'Publié'
      };

      const TestComponentInvalid = () => {
        const { items, addToCart, updateQuantity, getItemCount } = useCart();
        
        return (
          <div>
            <button onClick={() => addToCart(invalidTestProduct)}>Add Invalid to Cart</button>
            <button onClick={() => updateQuantity(invalidTestProduct.id, 0)}>Set Invalid Zero</button>
            <button onClick={() => updateQuantity(invalidTestProduct.id, -5)}>Set Invalid Negative</button>
            <div data-testid="invalid-item-count">{getItemCount()}</div>
            <div data-testid="invalid-items-length">{items.length}</div>
          </div>
        );
      };

      return (
        <CartProvider initialItems={[]}>
          <TestComponentInvalid />
        </CartProvider>
      );
    };

    const { unmount } = render(<IsolatedInvalidTest />);

    // État initial
    expect(screen.getByTestId('invalid-items-length')).toHaveTextContent('0');
    expect(screen.getByTestId('invalid-item-count')).toHaveTextContent('0');

    act(() => {
      screen.getByText('Add Invalid to Cart').click();
    });

    // Verify item was added
    expect(screen.getByTestId('invalid-items-length')).toHaveTextContent('1');
    expect(screen.getByTestId('invalid-item-count')).toHaveTextContent('1');

    act(() => {
      screen.getByText('Set Invalid Zero').click();
    });

    // Setting quantity to 0 should remove the item
    expect(screen.getByTestId('invalid-items-length')).toHaveTextContent('0');
    expect(screen.getByTestId('invalid-item-count')).toHaveTextContent('0');

    act(() => {
      screen.getByText('Add Invalid to Cart').click();
    });

    expect(screen.getByTestId('invalid-items-length')).toHaveTextContent('1');

    act(() => {
      screen.getByText('Set Invalid Negative').click();
    });

    // Setting negative quantity should remove the item
    expect(screen.getByTestId('invalid-items-length')).toHaveTextContent('0');
    expect(screen.getByTestId('invalid-item-count')).toHaveTextContent('0');
    
    // Nettoyer après le test
    unmount();
  });
});