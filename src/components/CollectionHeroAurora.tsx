'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, animate } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

// Color themes per collection slug
const collectionThemes: Record<string, { colors: string[]; accent: string; particleColor: string; badgeIcon: string }> = {
  'nouveautes': {
    colors: ['#10B981', '#059669', '#34D399', '#047857', '#10B981'],
    accent: 'text-emerald-400',
    particleColor: 'bg-emerald-400/40',
    badgeIcon: 'NOUVEAUTÉS',
  },
  'best-sellers': {
    colors: ['#EA580C', '#F59E0B', '#EF4444', '#F97316', '#EA580C'],
    accent: 'text-orange-400',
    particleColor: 'bg-orange-400/40',
    badgeIcon: 'BEST-SELLERS',
  },
  'promotions': {
    colors: ['#DC2626', '#EA580C', '#D97706', '#EF4444', '#DC2626'],
    accent: 'text-red-400',
    particleColor: 'bg-red-400/40',
    badgeIcon: 'PROMOTIONS',
  },
};

const defaultTheme = {
  colors: ['#3B82F6', '#8B5CF6', '#6366F1', '#2563EB', '#3B82F6'],
  accent: 'text-blue-400',
  particleColor: 'bg-blue-400/40',
  badgeIcon: 'COLLECTION',
};

// Floating Particles
const ClientParticles = ({ particleColor }: { particleColor: string }) => {
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
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return <div className="absolute inset-0 pointer-events-none" />;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 ${particleColor} rounded-full`}
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
        />
      ))}
    </div>
  );
};

// Sparkles Canvas
const SparklesCore = ({ className, particleDensity = 80, speed = 1 }: {
  className?: string;
  particleDensity?: number;
  speed?: number;
}) => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }> = [];
    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    let animFrameId: number;
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
      animFrameId = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, [particleDensity, speed, mounted]);

  if (!mounted) return <div className={className} />;

  return <canvas ref={canvasRef} className={cn('absolute inset-0 pointer-events-none', className)} />;
};

// Text Shimmer
const TextShimmer = ({ children, className, duration = 2 }: { children: string; className?: string; duration?: number }) => (
  <motion.span
    className={cn(
      'relative inline-block bg-[length:250%_100%,auto] bg-clip-text',
      'text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]',
      '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
      'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]',
      className
    )}
    initial={{ backgroundPosition: '100% center' }}
    animate={{ backgroundPosition: '0% center' }}
    transition={{ repeat: Infinity, duration, ease: 'linear' }}
    style={{
      '--spread': `${children.length * 2}px`,
      backgroundImage: 'var(--bg), linear-gradient(var(--base-color), var(--base-color))',
    } as React.CSSProperties}
  >
    {children}
  </motion.span>
);

interface CollectionHeroAuroraProps {
  slug: string;
  title: string;
  description: string;
  emoji?: string;
  productCount: number;
}

export default function CollectionHeroAurora({ slug, title, description, emoji, productCount }: CollectionHeroAuroraProps) {
  const theme = collectionThemes[slug] || defaultTheme;

  const color = useMotionValue(theme.colors[0]);

  useEffect(() => {
    animate(color, theme.colors, {
      ease: 'easeInOut',
      duration: 6,
      repeat: Infinity,
      repeatType: 'reverse',
    });
  }, [color, theme.colors]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #0f172a 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative px-4 sm:px-6 lg:px-8 py-16 overflow-hidden rounded-2xl mb-12"
    >
      <SparklesCore className="absolute inset-0 rounded-2xl" particleDensity={120} speed={0.6} />
      <ClientParticles particleColor={theme.particleColor} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 opacity-80">
          <a href="/" className="text-white/80 hover:text-white hover:underline transition-colors">Accueil</a>
          <span className="mx-2 text-white/60">/</span>
          <span className="text-white">{title}</span>
        </nav>

        {/* Badge */}
        <motion.div
          style={{ border, boxShadow }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
        >
          <Sparkles className={`w-4 h-4 ${theme.accent}`} />
          {theme.badgeIcon}
          <Sparkles className={`w-4 h-4 ${theme.accent}`} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          {emoji && <span className="mr-3">{emoji}</span>}
          <TextShimmer className="text-4xl md:text-6xl font-bold" duration={1.5}>
            {title}
          </TextShimmer>
          <span className="block text-3xl md:text-5xl mt-2">
            <TextShimmer className="text-3xl md:text-5xl font-bold" duration={2.5}>
              Monster Phone
            </TextShimmer>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl text-gray-100 max-w-3xl mx-auto mb-8"
        >
          {description}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 sm:px-6 sm:py-4 border border-white/20"
          >
            <div className="text-2xl font-bold text-white">{productCount}</div>
            <div className="text-sm text-gray-100">Produits</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 sm:px-6 sm:py-4 border border-white/20"
          >
            <div className={`text-2xl font-bold ${theme.accent}`}>Exclusif</div>
            <div className="text-sm text-gray-100">Sélection curée</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 sm:px-6 sm:py-4 border border-white/20"
          >
            <div className="text-2xl font-bold text-blue-400">48h</div>
            <div className="text-sm text-gray-100">Livraison Réunion</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
