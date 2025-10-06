"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, animate, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShoppingCart, Users, ThumbsUp, Truck, Sparkles, TrendingDown, Clock } from "lucide-react";
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
    const newParticles = [...Array(20)].map(() => ({
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
const SparklesCore = ({ className, particleDensity = 100, speed = 1 }: {
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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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

// Container Scroll Component
// // const ContainerScroll = ({ titleComponent, children }: { titleComponent: React.ReactNode; children: React.ReactNode }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef });
//   const [isMobile, setIsMobile] = useState(false);
// 
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => {
//       window.removeEventListener("resize", checkMobile);
//     };
//   }, []);
// 
//   const scaleDimensions = () => {
//     return isMobile ? [0.7, 0.9] : [1.05, 1];
//   };
// 
//   const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
//   const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
//   const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);
// 
//   return (
//     <div
//       className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
//       ref={containerRef}
//     >
//       <div
//         className="py-10 md:py-40 w-full relative"
//         style={{
//           perspective: "1000px" }}
//       >
//         <motion.div
//           style={{
//             translateY: translate }}
//           className="max-w-5xl mx-auto text-center"
//         >
//           {titleComponent}
//         </motion.div>
//         <motion.div
//           style={{
//             rotateX: rotate,
//             scale,
//             boxShadow:
//               "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003" }}
//           className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
//         >
//           <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
//             {children}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// // const ProductCard = ({ product, index }: { product: Product; index: number }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1, duration: 0.6 }}
//       whileHover={{ scale: 1.05, rotateY: 5 }}
//       className="group"
//     >
//       <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
//         <div className="relative mb-4">
//           <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
//             <product.icon className="w-16 h-16 text-white" />
//           </div>
//           <Badge className="absolute top-2 right-2 bg-green-500/80 text-white">
//             {product.discount}
//           </Badge>
//         </div>
//         <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
//         <p className="text-gray-100 mb-4">{product.description}</p>
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-4 h-4 ${
//                   i < product.rating ? "text-yellow-400 fill-current" : "text-gray-400"
//                 }`}
//               />
//             ))}
//             <span className="text-sm text-gray-200 ml-2">({product.reviews})</span>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <div>
//             <span className="text-xl font-bold text-white">{product.price}</span>
//             <span className="text-sm text-gray-200 line-through ml-2">{product.originalPrice}</span>
//           </div>
//           <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
//             <ShoppingCart className="w-4 h-4 mr-2" />
//             Acheter
//           </Button>
//         </div>
//       </Card>
//     </motion.div>
//   );
// };

// Main Hero Component
const MonsterPhoneHero = () => {
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

//   // const products = [
//     {
//       name: "Coque Monster Pro",
//       description: "Protection ultime avec design gaming",
//       price: "29.99€",
//       originalPrice: "39.99€",
//       discount: "-25%",
//       rating: 5,
//       reviews: 234,
//       icon: Shield },
//     {
//       name: "Écouteurs Monster Bass",
//       description: "Son immersif pour gaming mobile",
//       price: "79.99€",
//       originalPrice: "99.99€",
//       discount: "-20%",
//       rating: 4,
//       reviews: 156,
//       icon: Headphones },
//     {
//       name: "Chargeur Monster Speed",
//       description: "Charge rapide 65W sans fil",
//       price: "49.99€",
//       originalPrice: "69.99€",
//       discount: "-30%",
//       rating: 5,
//       reviews: 89,
//       icon: Zap },
//   ];


  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Hero Section with Aurora Background */}
      <motion.section
        style={{ backgroundImage }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Sparkles Background */}
        {/* <SparklesCore
          className="absolute inset-0"
          particleDensity={150}
          speed={0.5}
        /> */}

        {/* Floating Elements - avec pointer-events-none pour éviter de bloquer les clics */}
        <div className="absolute inset-0 pointer-events-none">
          <ClientParticles />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Badge supprimé selon la demande */}

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Libérez le{" "}
            <TextShimmer className="text-4xl md:text-6xl font-bold">
              Monster
            </TextShimmer>
            <br />
            qui sommeille en vous
          </motion.h2>

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
            {" "}et d&apos;accessoires gaming.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/nos-produits">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Découvrir la Collection
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
              
              <Link href="/promotions">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg shadow-xl border-0 font-semibold">
                  <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                  Offres Spéciales
                  <TrendingDown className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Message d'urgence */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-sm text-orange-300 mb-8"
          >
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="font-medium">
              Offre limitée • Livraison gratuite aujourd'hui seulement
            </span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-2 h-2 bg-orange-400 rounded-full"
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "16K", label: "CLIENTS", icon: Users },
              { number: "98%", label: "SATISFACTION", icon: ThumbsUp },
              { number: "48H", label: "LIVRAISON", icon: Truck },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-100 text-base font-medium tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.section>


    </div>
  );
};

export default MonsterPhoneHero;