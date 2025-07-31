'use client';

import { Skeleton } from '@/components/ui/skeleton';

interface ProductCardSkeletonProps {
  viewMode?: 'grid' | 'list';
}

export default function ProductCardSkeleton({ viewMode = 'grid' }: ProductCardSkeletonProps) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex p-6">
          <Skeleton className="w-32 h-32 rounded-lg flex-shrink-0" />
          <div className="flex-1 ml-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6 mb-3" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-32 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vue grille (par défaut)
  return (
    <div className="bg-white rounded-lg shadow-md">
      <Skeleton className="aspect-square rounded-t-lg" />
      <div className="p-4">
        <Skeleton className="h-5 w-full mb-1" />
        <Skeleton className="h-5 w-3/4 mb-3" />
        
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-1" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="flex items-center gap-1 mb-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-8 ml-1" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-16 mt-1" />
          </div>
          
          <div className="flex items-center gap-1">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}