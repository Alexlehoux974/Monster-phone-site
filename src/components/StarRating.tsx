'use client';

import { cn } from '@/lib/utils';

interface StarRatingProps {
  average: number;
  size?: 'sm' | 'md';
  className?: string;
}

const STAR_PATH = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

function StarSVG({ fill, uid, sizePx }: { fill: 'full' | 'empty' | number; uid: string; sizePx: number }) {
  if (fill === 'full') {
    return (
      <svg width={sizePx} height={sizePx} viewBox="0 0 24 24">
        <path d={STAR_PATH} fill="#facc15" stroke="#facc15" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (fill === 'empty') {
    return (
      <svg width={sizePx} height={sizePx} viewBox="0 0 24 24">
        <path d={STAR_PATH} fill="#d1d5db" stroke="#d1d5db" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }

  // Étoile partielle : linearGradient jaune → gris au % exact
  const gradId = `sg-${uid}`;
  const pct = `${Math.round(fill * 100)}%`;

  return (
    <svg width={sizePx} height={sizePx} viewBox="0 0 24 24">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset={pct} stopColor="#facc15" />
          <stop offset={pct} stopColor="#d1d5db" />
        </linearGradient>
      </defs>
      <path d={STAR_PATH} fill={`url(#${gradId})`} stroke="#facc15" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function StarRating({ average, size = 'sm', className }: StarRatingProps) {
  const full = Math.floor(average);
  const partial = Math.round((average - full) * 10) / 10;
  const sizePx = size === 'sm' ? 16 : 20;

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return <StarSVG key={i} fill="full" uid={`f${i}`} sizePx={sizePx} />;
        }
        if (i === full && partial > 0) {
          return <StarSVG key={i} fill={partial} uid={`p${i}-${String(average).replace('.', '_')}`} sizePx={sizePx} />;
        }
        return <StarSVG key={i} fill="empty" uid={`e${i}`} sizePx={sizePx} />;
      })}
    </div>
  );
}
