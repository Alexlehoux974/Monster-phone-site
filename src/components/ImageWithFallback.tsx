'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getWorkingImageUrl, getCategoryPlaceholder, isProblematicGitHubUrl } from '@/lib/image-utils';
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
  const workingUrl = getWorkingImageUrl(src, productCategory);
  const defaultFallback = fallbackSrc || getCategoryPlaceholder(productCategory || 'default');
  
  const [imgSrc, setImgSrc] = useState(workingUrl);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(showSkeleton);

  useEffect(() => {
    // If the source is a problematic GitHub URL, skip trying to load it
    if (isProblematicGitHubUrl(src)) {
      setImgSrc(defaultFallback);
      setHasError(true);
    }
  }, [src, defaultFallback]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(defaultFallback);
    }
  };

  // Si l'image source change, réinitialiser l'état
  useEffect(() => {
    if (src !== workingUrl && !hasError && !isProblematicGitHubUrl(src)) {
      setImgSrc(workingUrl);
      setHasError(false);
    }
  }, [src, workingUrl, hasError]);

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
      />
    </>
  );
}