'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  bgGradient?: string;
  icon?: string;
}

export default function PromoBanner({
  title,
  subtitle,
  ctaText,
  ctaHref,
  bgGradient = 'from-blue-600 via-purple-600 to-indigo-700',
  icon,
}: PromoBannerProps) {
  return (
    <section className={`bg-gradient-to-r ${bgGradient} py-10 px-4`}>
      <div className="max-w-5xl mx-auto text-center">
        {icon && <span className="text-4xl mb-3 block">{icon}</span>}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">{subtitle}</p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {ctaText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
