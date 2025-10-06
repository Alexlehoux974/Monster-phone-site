'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, animate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatPrice } from '@/lib/utils';
import { 
  Flame, 
  Clock, 
  Star, 
  ShoppingCart,
  Filter,
  TrendingDown,
  Gift,
  Zap,
  Package
} from 'lucide-react';
import { useDiscountedProducts } from '@/hooks/useSupabaseData';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';
import type { Product } from '@/data/products';

// Ces IDs seront utilisés pour filtrer les produits de Supabase
// Maintenant les promotions viennent directement de la base de données

// Client-only Floating Particles
const ClientParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2 }));
    setParticles(newParticles);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: particle.left,
            top: particle.top }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay }}
        />
      ))}
    </div>
  );
};

// Sparkles Component
const SparklesCore = ({ className, particleDensity = 80, speed = 1 }: {
  className?: string;
  particleDensity?: number;
  speed?: number;
}) => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.8 + 0.2 });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [particleDensity, speed, mounted]);

  if (!mounted) {
    return <div className={className} />;
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
    />
  );
};

// Text Shimmer Component
const TextShimmer = ({ children, className, duration = 2 }: { children: string; className?: string; duration?: number }) => {
  return (
    <motion.span
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        "dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]",
        className
      )}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear" }}
      style={{
        "--spread": `${children.length * 2}px`,
        backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))` } as React.CSSProperties}
    >
      {children}
    </motion.span>
  );
};

export default function PromotionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'discount' | 'price' | 'name'>('discount');
  const [productsWithPromotions, setProductsWithPromotions] = useState<Product[]>([]);

  // Charger les produits en promotion depuis Supabase
  const { products: supabaseProducts, loading } = useDiscountedProducts(50);

  // Aurora background animation
  const color = useMotionValue("#DC2626");

  useEffect(() => {
    animate(color, ["#DC2626", "#EA580C", "#D97706", "#CA8A04", "#DC2626"], {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse" });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  // Convertir les produits Supabase et ajouter les infos de promotion
  useEffect(() => {
    if (supabaseProducts && supabaseProducts.length > 0) {
      const legacyProducts = supabaseProducts
        .map(supabaseProductToLegacy)
        .map(product => ({
          ...product,
          promotion: {
            discount: product.discount || 0,
            originalPrice: product.originalPrice ? `${product.originalPrice}€` : '',
            promoPrice: `${product.price}€`
          }
        }));
      setProductsWithPromotions(legacyProducts);
    }
  }, [supabaseProducts]);

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
          return (b.discount || 0) - (a.discount || 0);
        case 'price':
          return a.price - b.price;
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
        <div className="pt-[110px]">
          <Header />
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Hero Section with Aurora Background */}
            <motion.section
              style={{ backgroundImage }}
              className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 overflow-hidden rounded-2xl mb-12"
            >
              {/* Sparkles Background */}
              <SparklesCore
                className="absolute inset-0 rounded-2xl"
                particleDensity={100}
                speed={0.5}
              />

              {/* Floating Elements */}
              <ClientParticles />

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center"
              >
                <motion.div 
                  style={{ border, boxShadow }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
                >
                  <Flame className="w-4 h-4" />
                  PROMOTIONS EXCLUSIVES
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-6"
                >
                  Promos{" "}
                  <TextShimmer className="text-4xl md:text-6xl font-bold">
                    Monster Phone
                  </TextShimmer>
                  <span className="block">à La Réunion</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl text-gray-100 max-w-3xl mx-auto mb-8"
                >
                  Découvrez nos offres exceptionnelles sur une sélection de smartphones gaming, 
                  accessoires et gadgets high-tech. Promotions limitées dans le temps !
                </motion.p>
                
                {/* Compteur d&apos;offres */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex items-center justify-center gap-8 text-center"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20"
                  >
                    <div className="text-2xl font-bold text-white">{filteredProducts.length}</div>
                    <div className="text-sm text-gray-100">Produits en promo</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20"
                  >
                    <div className="text-2xl font-bold text-green-400">Jusqu&apos;à -30%</div>
                    <div className="text-sm text-gray-100">Réductions max</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20"
                  >
                    <div className="text-2xl font-bold text-blue-400">48h</div>
                    <div className="text-sm text-gray-100">Livraison Réunion</div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Bannière d&apos;urgence */}
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
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    <div className="aspect-square bg-gray-200 animate-pulse" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
                      -{product.discount}%
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
                    
                    {/* Overlay avec bouton d&apos;action */}
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
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-700 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
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
            )}

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
      </div>
      
      <Footer />
    </>
  );
}