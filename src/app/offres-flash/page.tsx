'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, animate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatPrice, sortProductsByPriority } from '@/lib/utils';
import {
  Zap,
  Clock,
  Star,
  ShoppingCart,
  Filter,
  TrendingDown,
  ShoppingBag,
  Tag,
  Package,
  Timer,
  Flame
} from 'lucide-react';
import { useDiscountedProducts } from '@/hooks/useSupabaseData';
import type { Product } from '@/data/products';

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
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
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
          className="absolute w-1.5 h-1.5 bg-yellow-400/40 rounded-full"
          style={{
            left: particle.left,
            top: particle.top }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.5, 1] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay }}
        />
      ))}
    </div>
  );
};

// Sparkles Canvas Component
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

    let animFrameId: number;
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

      animFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
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

// Countdown Timer Component
const CountdownTimer = ({ isUrgent }: { isUrgent: boolean }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = { ...prev };
        if (newTime.seconds > 0) {
          newTime.seconds--;
        } else if (newTime.minutes > 0) {
          newTime.minutes--;
          newTime.seconds = 59;
        } else if (newTime.hours > 0) {
          newTime.hours--;
          newTime.minutes = 59;
          newTime.seconds = 59;
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-1 font-mono text-2xl font-bold">
      <motion.span
        className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10"
        animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {formatTime(timeLeft.hours)}
      </motion.span>
      <span className="text-yellow-400 animate-pulse">:</span>
      <motion.span className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10">
        {formatTime(timeLeft.minutes)}
      </motion.span>
      <span className="text-yellow-400 animate-pulse">:</span>
      <motion.span className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10">
        {formatTime(timeLeft.seconds)}
      </motion.span>
    </div>
  );
};

export default function OffresFlashPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'discount' | 'price' | 'name'>('priority');
  const [productsWithPromotions, setProductsWithPromotions] = useState<Product[]>([]);

  // Récupérer TOUS les produits avec une promotion
  const { products: supabaseProducts, loading } = useDiscountedProducts(1);

  // Aurora background animation - thème flash/éclair jaune-orange
  const color = useMotionValue("#EA580C");

  useEffect(() => {
    animate(color, ["#EA580C", "#F59E0B", "#EF4444", "#F97316", "#EA580C"], {
      ease: "easeInOut",
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #0f172a 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  // Ajouter les infos de promotion aux produits
  useEffect(() => {
    if (supabaseProducts && supabaseProducts.length > 0) {
      const productsWithPromos = supabaseProducts.map(product => ({
        ...product,
        promotion: {
          discount: product.discountPercent || 0,
          originalPrice: product.originalPrice ? `${product.originalPrice}€` : '',
          promoPrice: `${product.basePrice}€`
        }
      }));
      setProductsWithPromotions(productsWithPromos);
    }
  }, [supabaseProducts]);

  // Calculer la remise maximale
  const maxDiscount = useMemo(() => {
    if (productsWithPromotions.length === 0) return 0;
    return Math.max(...productsWithPromotions.map(p => p.discountPercent || 0));
  }, [productsWithPromotions]);

  // Filtrer et trier les produits
  const filteredProducts = useMemo(() => {
    let filtered = productsWithPromotions;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.categoryName === selectedCategory);
    }

    if (sortBy === 'priority') {
      filtered = sortProductsByPriority(filtered);
    } else {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'discount':
            return (b.discountPercent || 0) - (a.discountPercent || 0);
          case 'price':
            return a.basePrice - b.basePrice;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [productsWithPromotions, selectedCategory, sortBy]);

  // Catégories disponibles
  const categories = Array.from(new Set(productsWithPromotions.map(p => p.categoryName)));

  useEffect(() => {
    document.title = 'Offres Flash Monster Phone | Promos Exclusives Smartphones & Accessoires La Réunion 974';
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
                particleDensity={120}
                speed={0.6}
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
                  <Zap className="w-4 h-4 text-yellow-400" />
                  OFFRES FLASH EXCLUSIVES
                  <Zap className="w-4 h-4 text-yellow-400" />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-6"
                >
                  Offres{" "}
                  <TextShimmer className="text-4xl md:text-6xl font-bold" duration={1.5}>
                    Flash
                  </TextShimmer>
                  <span className="block text-3xl md:text-5xl mt-2">
                    <TextShimmer className="text-3xl md:text-5xl font-bold" duration={2.5}>
                      Monster Phone
                    </TextShimmer>
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl text-gray-100 max-w-3xl mx-auto mb-8"
                >
                  Des prix cassés sur une sélection de smartphones, accessoires et gadgets high-tech.
                  Offres limitées dans le temps, ne ratez pas votre chance !
                </motion.p>

                {/* Compteur à rebours + Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-col items-center gap-6"
                >
                  {/* Countdown */}
                  {productsWithPromotions.length > 0 && (
                    <motion.div
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20"
                    >
                      <Timer className="w-5 h-5 text-yellow-400 animate-pulse" />
                      <span className="text-sm font-medium text-white">Se termine dans :</span>
                      <CountdownTimer isUrgent={false} />
                    </motion.div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 sm:px-6 sm:py-4 border border-white/20"
                    >
                      <div className="text-2xl font-bold text-white">{filteredProducts.length}</div>
                      <div className="text-sm text-gray-100">Offres flash</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 sm:px-6 sm:py-4 border border-white/20"
                    >
                      <div className="text-2xl font-bold text-green-400">Jusqu&apos;à -{maxDiscount}%</div>
                      <div className="text-sm text-gray-100">Réductions max</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 sm:px-6 sm:py-4 border border-white/20"
                    >
                      <div className="text-2xl font-bold text-blue-400">48h</div>
                      <div className="text-sm text-gray-100">Livraison Réunion</div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Bannière d'urgence */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white rounded-lg p-6 mb-12 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMEwyNSAxMEwzNSAxMEwyNyAxN0wzMCAyN0wyMCAyMkwxMCAyN0wxMyAxN0w1IDEwTDE1IDEwWiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-30" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Flame className="w-6 h-6 animate-pulse" />
                  <span className="text-xl font-bold tracking-wide">OFFRES À DURÉE LIMITÉE</span>
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <p className="text-white/90">Profitez de nos prix exceptionnels avant la fin de la vente flash ! Livraison gratuite dès 100€ à La Réunion.</p>
              </div>
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
                    onChange={(e) => setSortBy(e.target.value as 'priority' | 'discount' | 'price' | 'name')}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  >
                    <option value="priority">Priorité (en stock puis phares)</option>
                    <option value="discount">Remise max</option>
                    <option value="price">Prix croissant</option>
                    <option value="name">Nom A-Z</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Grille des produits */}
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
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group bg-white rounded-lg border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                >
                  {/* Badge de promotion */}
                  <div className="absolute top-3 left-3 z-10">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Badge className="bg-red-600 text-white px-2 py-1 text-xs font-bold shadow-lg">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        -{product.discountPercent}%
                      </Badge>
                    </motion.div>
                  </div>

                  {/* Badge flash */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-yellow-500 text-black px-2 py-1 text-xs font-bold">
                      <Zap className="w-3 h-3 mr-1" />
                      FLASH
                    </Badge>
                  </div>

                  {/* Image produit */}
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {product.variants?.[0]?.images && product.variants[0].images.length > 0 ? (
                      <Image
                        src={product.variants[0].images[0]}
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
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-600 hover:bg-orange-700"
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
                      {product.brandName}
                    </Badge>

                    {/* Nom du produit */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>

                    {/* Prix */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-red-600">
                        {formatPrice(product.basePrice)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-700 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Description courte */}
                    <p className="text-sm text-gray-700 line-clamp-2 mb-4">
                      {product.shortDescription}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button asChild className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" size="sm">
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
            {!loading && filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedCategory !== 'all'
                    ? 'Aucune offre flash dans cette catégorie'
                    : 'Aucune offre flash en ce moment'}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  {selectedCategory !== 'all'
                    ? 'Essayez une autre catégorie ou consultez tous nos produits.'
                    : 'Nos offres flash sont disponibles pour une durée limitée. Revenez bientôt !'}
                </p>
                <Button asChild>
                  <Link href="/nos-produits">Voir tous les produits</Link>
                </Button>
              </motion.div>
            )}

            {/* CTA final */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl p-8 sm:p-12 text-center mt-16 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-8 text-6xl">⚡</div>
                <div className="absolute bottom-4 right-8 text-6xl">⚡</div>
                <div className="absolute top-1/2 left-1/4 text-4xl">🔥</div>
                <div className="absolute top-1/3 right-1/4 text-4xl">🔥</div>
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">
                  Pas encore trouvé votre bonheur ?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Découvrez notre gamme complète de smartphones et accessoires à La Réunion
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold" asChild>
                    <Link href="/nos-produits">
                      <Tag className="w-5 h-5 mr-2" />
                      Voir tous nos produits
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" asChild>
                    <Link href="/smartphones">
                      Nos Smartphones
                    </Link>
                  </Button>
                </div>
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
