import { isCompletelyOutOfStock, hasStock, isFeaturedProduct, sortProductsByPriority } from './src/lib/utils';

// Test produit sans variants, en stock
const productInStock = {
  stockQuantity: 10,
  badges: [],
  price: 299
};

// Test produit sans variants, rupture de stock
const productOutOfStock = {
  stockQuantity: 0,
  badges: [],
  price: 299
};

// Test produit avec variants, tous en stock
const productWithVariantsInStock = {
  variants: [
    { stock: 5, color: 'Noir' },
    { stock: 3, color: 'Blanc' }
  ],
  badges: [],
  price: 399
};

// Test produit avec variants, tous en rupture
const productWithVariantsOutOfStock = {
  variants: [
    { stock: 0, color: 'Noir' },
    { stock: 0, color: 'Blanc' }
  ],
  badges: [],
  price: 399
};

// Test produit avec variants mixtes
const productWithVariantsMixed = {
  variants: [
    { stock: 0, color: 'Noir' },
    { stock: 5, color: 'Blanc' }
  ],
  badges: [],
  price: 399
};

console.log('=== Tests de rupture de stock ===');
console.log('Produit sans variants en stock:', isCompletelyOutOfStock(productInStock)); // false
console.log('Produit sans variants rupture:', isCompletelyOutOfStock(productOutOfStock)); // true
console.log('Produit avec variants en stock:', isCompletelyOutOfStock(productWithVariantsInStock)); // false
console.log('Produit avec variants rupture:', isCompletelyOutOfStock(productWithVariantsOutOfStock)); // true
console.log('Produit avec variants mixtes:', isCompletelyOutOfStock(productWithVariantsMixed)); // false

console.log('\n=== Tests de produits phares ===');
const productWithBadge = { badges: ['Bestseller'], price: 200 };
const productExpensive = { badges: [], price: 600 };
const productNormal = { badges: [], price: 200 };

console.log('Produit avec badge Bestseller:', isFeaturedProduct(productWithBadge)); // true
console.log('Produit cher (600€):', isFeaturedProduct(productExpensive)); // true
console.log('Produit normal (200€):', isFeaturedProduct(productNormal)); // false
