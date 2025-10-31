'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

export interface ProductContentSection {
  id: string;
  product_id: string;
  section_type: 'description' | 'features' | 'specifications' | 'engagement' | 'custom';
  title: string | null;
  content: string | null;
  images: string[]; // Google Drive URLs
  is_enabled: boolean;
  display_order: number;
  layout_variant: 'text-left-image-right' | 'text-right-image-left' | 'full-width';
  created_at: string;
  updated_at: string;
}

interface EnrichedProductSectionsProps {
  productId: string;
}

export default function EnrichedProductSections({ productId }: EnrichedProductSectionsProps) {
  const [sections, setSections] = useState<ProductContentSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Initial fetch
    const fetchSections = async () => {
      const { data, error } = await supabase
        .from('product_content_sections')
        .select('*')
        .eq('product_id', productId)
        .eq('is_enabled', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching product sections:', error);
        setLoading(false);
        return;
      }

      setSections(data || []);
      setLoading(false);
    };

    fetchSections();

    // Real-time subscription (same pattern as stock management)
    const channel = supabase
      .channel('product-content-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'product_content_sections',
          filter: `product_id=eq.${productId}`,
        },
        (payload) => {
          console.log('Product content section changed:', payload);

          if (payload.eventType === 'INSERT') {
            const newSection = payload.new as ProductContentSection;
            if (newSection.is_enabled) {
              setSections((prev) => [...prev, newSection].sort((a, b) => a.display_order - b.display_order));
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedSection = payload.new as ProductContentSection;
            setSections((prev) => {
              // Remove if disabled, otherwise update
              if (!updatedSection.is_enabled) {
                return prev.filter((s) => s.id !== updatedSection.id);
              }
              // Update existing or add if newly enabled
              const exists = prev.some((s) => s.id === updatedSection.id);
              if (exists) {
                return prev
                  .map((s: any) => (s.id === updatedSection.id ? updatedSection : s))
                  .sort((a, b) => a.display_order - b.display_order);
              }
              return [...prev, updatedSection].sort((a, b) => a.display_order - b.display_order);
            });
          } else if (payload.eventType === 'DELETE') {
            setSections((prev) => prev.filter((s) => s.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i: any) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="py-12 space-y-12">
      {sections.map((section: any) => (
        <ProductSection key={section.id} section={section} />
      ))}
    </div>
  );
}

function ProductSection({ section }: { section: ProductContentSection }) {
  const hasImages = section.images && section.images.length > 0;

  // Full-width layout
  if (section.layout_variant === 'full-width') {
    return (
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          {section.title && (
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{section.title}</h2>
          )}
          {section.content && (
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
          {hasImages && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.images.map((imageUrl, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={section.title || `Image ${idx + 1}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Text-left-image-right layout
  if (section.layout_variant === 'text-left-image-right') {
    return (
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Text content */}
            <div className="p-8 flex flex-col justify-center">
              {section.title && (
                <h2 className="text-3xl font-bold mb-4 text-gray-900">{section.title}</h2>
              )}
              {section.content && (
                <div
                  className="prose prose-lg"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
            </div>

            {/* Images */}
            {hasImages && (
              <div className="relative min-h-[400px] lg:min-h-full">
                {section.images.length === 1 ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={section.images[0]}
                      alt={section.title || 'Product image'}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {section.images.map((imageUrl, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={`${section.title || 'Product'} ${idx + 1}`}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Text-right-image-left layout
  if (section.layout_variant === 'text-right-image-left') {
    return (
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            {hasImages && (
              <div className="relative min-h-[400px] lg:min-h-full order-2 lg:order-1">
                {section.images.length === 1 ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={section.images[0]}
                      alt={section.title || 'Product image'}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {section.images.map((imageUrl, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={`${section.title || 'Product'} ${idx + 1}`}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Text content */}
            <div className="p-8 flex flex-col justify-center order-1 lg:order-2">
              {section.title && (
                <h2 className="text-3xl font-bold mb-4 text-gray-900">{section.title}</h2>
              )}
              {section.content && (
                <div
                  className="prose prose-lg"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
