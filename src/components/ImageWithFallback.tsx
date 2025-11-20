'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getWorkingImageUrl, getCategoryPlaceholder } from '@/lib/image-utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  productCategory?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  showSkeleton?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  productCategory,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  placeholder,
  blurDataURL,
  showSkeleton = true,
}: ImageWithFallbackProps) {
  // Use the working image URL or fallback based on category
  // useMemo ensures workingUrl is recalculated when src or productCategory changes
  const workingUrl = useMemo(() => {
    const transformed = getWorkingImageUrl(src, productCategory);
    console.log(`🖼️  [ImageWithFallback] Transforming: "${src}" → "${transformed}"`);
    return transformed;
  }, [src, productCategory]);
  const defaultFallback = useMemo(() => fallbackSrc || getCategoryPlaceholder(productCategory || 'default'), [fallbackSrc, productCategory]);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(showSkeleton);

  // Derive imgSrc directly from workingUrl and error state - no useState needed!
  const imgSrc = hasError ? defaultFallback : workingUrl;

  console.log(`🎨 [ImageWithFallback] Final imgSrc: "${imgSrc}" (hasError: ${hasError})`);

  useEffect(() => {
    // Reset error state when src changes
    setHasError(false);
    setIsLoading(showSkeleton);
  }, [src, workingUrl, showSkeleton]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  const imageProps = fill
    ? { fill: true, sizes: sizes || '100vw' }
    : { width: width || 400, height: height || 300 };

  return (
    <>
      {isLoading && showSkeleton && (
        <Skeleton 
          className={cn(
            'absolute inset-0',
            fill ? 'w-full h-full' : '',
            className
          )}
          style={!fill ? { width, height } : undefined}
        />
      )}
      <Image
        {...imageProps}
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        unoptimized={true}
      />
    </>
  );
}