"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, animate, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Sparkles, TrendingDown } from "lucide-react";
import { getWorkingImageUrl } from "@/lib/image-utils";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

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
    const newParticles = [...Array(10)].map(() => ({
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


// Featured product info passed from server
export interface HeroFeaturedProduct {
  name: string;
  urlSlug: string;
  basePrice: number;
  originalPrice?: number;
  discountPercent?: number;
  imageUrl: string;
  brandName: string;
}

// Main Hero Component
const MonsterPhoneHero = ({ featuredProduct }: { featuredProduct?: HeroFeaturedProduct }) => {
  const color = useMotionValue("#8B5CF6");

  useEffect(() => {
    animate(color, ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"], {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse" });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;


  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Hero Section with Aurora Background */}
      <motion.section
        style={{ backgroundImage }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pb-8 md:pb-0"
      >
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <ClientParticles />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-4 sm:pt-6">
          {/* Badge supprimé selon la demande */}

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Libérez le{" "}
            <TextShimmer className="text-4xl md:text-6xl font-bold">
              MONSTRE
            </TextShimmer>
            <br />
            qui sommeille en vous
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Découvrez notre collection exclusive de{" "}
            <motion.span
              className="inline-block font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              Smartphones
            </motion.span>
            {" "}et d&apos;accessoires fait pour vous
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
          >
            <Link href="/nos-produits">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Découvrir nos produits
                </Button>
              </motion.div>
            </Link>
            
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Badge animé */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.3 }}
                className="absolute -top-2 -right-2 z-10"
              >
                <motion.span
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-lg"
                >
                  -50%
                </motion.span>
              </motion.div>
              
              <Link href="/offres-flash">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg shadow-xl border-0 font-semibold">
                  <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                  Offres Spéciales
                  <TrendingDown className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Featured Product Spotlight */}
          {featuredProduct && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10"
            >
              <Link href={`/produit/${featuredProduct.urlSlug}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-lg mx-auto"
                >
                  <div className="relative w-40 h-40 flex-shrink-0">
                    <Image
                      src={getWorkingImageUrl(featuredProduct.imageUrl)}
                      alt={featuredProduct.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="160px"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-300 uppercase tracking-wider mb-1">Produit vedette</p>
                    <h3 className="text-lg font-bold text-white mb-2">{featuredProduct.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-white">{formatPrice(featuredProduct.basePrice)}</span>
                      {featuredProduct.originalPrice && featuredProduct.originalPrice > featuredProduct.basePrice && (
                        <span className="text-base text-gray-400 line-through">{formatPrice(featuredProduct.originalPrice)}</span>
                      )}
                    </div>
                    {featuredProduct.discountPercent && featuredProduct.discountPercent > 0 && (
                      <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                        -{featuredProduct.discountPercent}%
                      </span>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}

        </div>
      </motion.section>


    </div>
  );
};

export default MonsterPhoneHero;