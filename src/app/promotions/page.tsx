'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Flame, 
  Tag, 
  Clock, 
  Star, 
  ShoppingCart,
  Filter,
  TrendingDown,
  Gift,
  Zap,
  Package
} from 'lucide-react';
import { allProducts, type Product } from '@/data/products';

// Simuler des promotions sur certains produits populaires
const promotionProducts = [
  { productId: "recFsFez7xoI10570", discount: 15, originalPrice: "899€", promoPrice: "764€" }, // HONOR 200 PRO
  { productId: "recI46bEz5s7kH98x", discount: 20, originalPrice: "299€", promoPrice: "239€" }, // Honor X5b
  { productId: "recfJ2tXa7B5kN73h", discount: 25, originalPrice: "39€", promoPrice: "29€" },   // Câble MYWAY
  { productId: "recG4qW8mR9sL52k", discount: 30, originalPrice: "89€", promoPrice: "62€" },    // Accessoire MUVIT
  { productId: "recAB3cD4f5gH67i", discount: 10, originalPrice: "159€", promoPrice: "143€" }   // Écouteurs
];

export default function PromotionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'discount' | 'price' | 'name'>('discount');

  // Créer la liste des produits en promotion avec leurs infos de promotion
  const productsWithPromotions = useMemo(() => {
    return allProducts
      .filter(product => promotionProducts.some(promo => promo.productId === product.id))
      .map(product => {
        const promoInfo = promotionProducts.find(promo => promo.productId === product.id);
        return {
          ...product,
          promotion: promoInfo
        };
      });
  }, []);

  // Filtrer et trier les produits
  const filteredProducts = useMemo(() => {
    let filtered = productsWithPromotions;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Trier par critère sélectionné
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return (b.promotion?.discount || 0) - (a.promotion?.discount || 0);
        case 'price':
          return parseFloat(a.promotion?.promoPrice?.replace('€', '') || '0') - 
                 parseFloat(b.promotion?.promoPrice?.replace('€', '') || '0');
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [productsWithPromotions, selectedCategory, sortBy]);

  // Catégories disponibles
  const categories = Array.from(new Set(productsWithPromotions.map(p => p.category)));

  useEffect(() => {
    document.title = 'Promotions Monster Phone | Smartphones Gaming en Promo La Réunion 974';
    
    // Ajouter les métadonnées SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez nos promotions exceptionnelles sur les smartphones gaming HONOR, accessoires MUVIT et montres connectées. Livraison gratuite dès 50€ à La Réunion.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Découvrez nos promotions exceptionnelles sur les smartphones gaming HONOR, accessoires MUVIT et montres connectées. Livraison gratuite dès 50€ à La Réunion.';
      document.head.appendChild(meta);
    }

    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      keywords.setAttribute('content', 'promotions smartphone réunion, téléphone gaming promo 974, honor promotion réunion, accessoires gaming pas cher, montres connectées promo, soldes téléphone réunion');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'promotions smartphone réunion, téléphone gaming promo 974, honor promotion réunion, accessoires gaming pas cher, montres connectées promo, soldes téléphone réunion';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Header />
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Flame className="w-4 h-4" />
                PROMOTIONS EXCLUSIVES
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Promos Monster Phone
                <span className="block text-red-600">à La Réunion</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                Découvrez nos offres exceptionnelles sur une sélection de smartphones gaming, 
                accessoires et gadgets high-tech. Promotions limitées dans le temps !
              </p>
              
              {/* Compteur d'offres */}
              <div className="flex items-center justify-center gap-8 text-center">
                <div className="bg-white rounded-lg px-6 py-4 shadow-sm border">
                  <div className="text-2xl font-bold text-red-600">{filteredProducts.length}</div>
                  <div className="text-sm text-gray-700">Produits en promo</div>
                </div>
                <div className="bg-white rounded-lg px-6 py-4 shadow-sm border">
                  <div className="text-2xl font-bold text-green-600">Jusqu'à -30%</div>
                  <div className="text-sm text-gray-700">Réductions max</div>
                </div>
                <div className="bg-white rounded-lg px-6 py-4 shadow-sm border">
                  <div className="text-2xl font-bold text-blue-600">48h</div>
                  <div className="text-sm text-gray-700">Livraison Réunion</div>
                </div>
              </div>
            </motion.div>

            {/* Bannière d'urgence */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white rounded-lg p-6 mb-12 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <Clock className="w-6 h-6 animate-pulse" />
                <span className="text-xl font-bold">OFFRES À DURÉE LIMITÉE</span>
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <p>Profitez de nos prix exceptionnels avant la fin du mois ! Livraison gratuite dès 50€ à La Réunion.</p>
            </motion.div>

            {/* Filtres et tri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg border shadow-sm p-6 mb-8"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex items-center gap-4">
                  <Filter className="w-5 h-5 text-gray-700" />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('all')}
                    >
                      Toutes catégories
                    </Button>
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Trier par:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'discount' | 'price' | 'name')}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  >
                    <option value="discount">Remise max</option>
                    <option value="price">Prix croissant</option>
                    <option value="name">Nom A-Z</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Grille des produits en promotion */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-lg border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative"
                >
                  {/* Badge de promotion */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-red-600 text-white px-2 py-1 text-xs font-bold">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      -{product.promotion?.discount}%
                    </Badge>
                  </div>

                  {/* Image produit */}
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Overlay avec bouton d'action */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <Button
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        asChild
                      >
                        <Link href={`/produit/${product.urlSlug || product.id}`}>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Voir détails
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    {/* Marque */}
                    <Badge variant="outline" className="text-xs mb-2">
                      {product.brand}
                    </Badge>

                    {/* Nom du produit */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>

                    {/* Prix */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-red-600">
                        {product.promotion?.promoPrice}
                      </span>
                      <span className="text-sm text-gray-700 line-through">
                        {product.promotion?.originalPrice}
                      </span>
                    </div>

                    {/* Description courte */}
                    <p className="text-sm text-gray-700 line-clamp-2 mb-4">
                      {product.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button asChild className="flex-1" size="sm">
                        <Link href={`/produit/${product.urlSlug || product.id}`}>
                          <Zap className="w-4 h-4 mr-1" />
                          Profiter
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message si aucun produit */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucune promotion dans cette catégorie
                </h3>
                <p className="text-gray-700">
                  Essayez une autre catégorie ou consultez tous nos produits.
                </p>
                <Button asChild className="mt-4">
                  <Link href="/nos-produits">Voir tous les produits</Link>
                </Button>
              </motion.div>
            )}

            {/* CTA final */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center mt-16"
            >
              <h2 className="text-3xl font-bold mb-4">
                Pas encore trouvé votre bonheur ?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Découvrez notre gamme complète de produits gaming et high-tech
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/nos-produits">
                    Voir tous nos produits
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <Link href="/contact">
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
}