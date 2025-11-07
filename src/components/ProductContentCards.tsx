'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import ImageWithFallback from '@/components/ImageWithFallback';
import { FileText, BarChart3, Star, Lightbulb, CheckCircle2, Headphones, Battery, Shield, Smartphone } from 'lucide-react';

interface ProductContentSection {
  id: string;
  product_id: string;
  section_type: 'image_gallery' | 'description_card' | 'specs_grid' | 'features_list' | 'engagement_card' | 'custom';
  title: string | null;
  content: string | null;
  images: string[]; // Google Drive URLs
  is_enabled: boolean;
  display_order: number;
  layout_variant: string;
  metadata: {
    specs?: Array<{
      icon: string;
      label: string;
      value: string;
      details?: string;
    }>;
    features?: Array<{
      icon: string;
      text: string;
    }>;
  };
  created_at: string;
  updated_at: string;
}

interface ProductContentCardsProps {
  productId: string;
  productCategory: string;
  productBrand?: string;
}

export default function ProductContentCards({ productId, productCategory, productBrand }: ProductContentCardsProps) {
  const [sections, setSections] = useState<ProductContentSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔍 [ProductContentCards] Mounting with productId:', productId);

    // Initial fetch via API (contourne les RLS Supabase)
    const fetchSections = async () => {
      console.log('📡 [ProductContentCards] Fetching sections via API for product:', productId);
      try {
        const response = await fetch(`/api/product-sections?productId=${productId}`);
        const data = await response.json();

        if (!response.ok) {
          console.error('❌ [ProductContentCards] API error:', data.error);
          setLoading(false);
          return;
        }

        console.log('✅ [ProductContentCards] Loaded', data.sections?.length || 0, 'sections');
        setSections(data.sections || []);
        setLoading(false);
      } catch (error) {
        console.error('❌ [ProductContentCards] Fetch error:', error);
        setLoading(false);
      }
    };

    fetchSections();
    const supabase = createClient();

    // Real-time subscription
    const channel = supabase
      .channel('product-content-cards-realtime')
      .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'product_content_sections',
          filter: `product_id=eq.${productId}`,
        }, (payload) => {
          if (payload.eventType === 'INSERT') {
            const newSection = payload.new as ProductContentSection;
            if (newSection.is_enabled) {
              setSections((prev) => [...prev, newSection].sort((a, b) => a.display_order - b.display_order));
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedSection = payload.new as ProductContentSection;
            setSections((prev) => {
              if (!updatedSection.is_enabled) {
                return prev.filter((s) => s.id !== updatedSection.id);
              }
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
    console.log('⏳ [ProductContentCards] Still loading...');
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (sections.length === 0) {
    console.log('⚠️ [ProductContentCards] No sections found - returning null');
    return null;
  }

  console.log('🎨 [ProductContentCards] Rendering', sections.length, 'sections');

  // Détecter si c'est un produit HONOR
  const isHonor = productBrand?.toUpperCase() === 'HONOR';

  // Trouver l'index de la première section description_card
  const firstDescriptionIndex = sections.findIndex(s => s.section_type === 'description_card');

  return (
    <div className="space-y-12 mt-12">
      {sections.map((section: any, index: number) => {
        // Afficher la bannière HONOR juste avant la première section description_card
        const shouldShowHonorBanner = isHonor && index === firstDescriptionIndex;

        return (
          <div key={section.id}>
            {shouldShowHonorBanner && <HonorPackBanner />}
            {(() => {
              switch (section.section_type) {
                case 'image_gallery':
                  return (
                    <div className="hidden lg:block">
                      <ImageGallerySection section={section} productCategory={productCategory} />
                    </div>
                  );
                case 'description_card':
                  return <DescriptionCardSection section={section} productCategory={productCategory} />;
                case 'specs_grid':
                  return <SpecsGridSection section={section} />;
                case 'features_list':
                  return <FeaturesListSection section={section} productCategory={productCategory} />;
                case 'engagement_card':
                  return <EngagementCardSection section={section} productCategory={productCategory} />;
                default:
                  return null;
              }
            })()}
          </div>
        );
      })}
    </div>
  );
}

// Bannière Pack HONOR
function HonorPackBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white py-4 px-4 relative overflow-hidden mb-12 rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="text-2xl font-bold flex items-center gap-2">
            <span>🎁</span>
            <span className="text-sm sm:text-base lg:text-lg">Tous nos smartphones incluent :</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Écouteurs</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Battery className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Chargeur</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Protection vitre</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Coque</span>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center text-xs sm:text-sm opacity-90">
          ✨ Pack complet offert avec chaque smartphone
        </div>
      </div>
    </div>
  );
}

// Galerie d'images horizontale défilante
function ImageGallerySection({ section, productCategory }: { section: ProductContentSection; productCategory: string }) {
  const hasImages = section.images && section.images.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {section.title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {hasImages ? (
          section.images!.map((image, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-100 rounded-xl overflow-hidden"
            >
              <ImageWithFallback
                src={image}
                alt={`${section.title || 'Product'} - Image ${index + 1}`}
                productCategory={productCategory}
                width={256}
                height={256}
                className="object-contain w-full h-full"
              />
            </div>
          ))
        ) : (
          // Placeholder images
          [1, 2, 3, 4].map((i: any) => (
            <div
              key={i}
              className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative"
            >
              <Image
                src="/placeholder-monster.svg"
                alt={`Image ${i}`}
                fill
                className="object-contain p-2 lg:p-8"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Encart Description avec image (alternance gauche/droite)
function DescriptionCardSection({ section, productCategory }: { section: ProductContentSection; productCategory: string }) {
  const isImageLeft = section.layout_variant === 'image-left-text-right';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-8",
        isImageLeft ? "lg:grid-flow-col" : "lg:grid-flow-col-dense"
      )}>
        {/* Texte */}
        <div className={cn("p-8 flex flex-col justify-center", isImageLeft ? "lg:col-start-2" : "lg:col-start-1")}>
          {section.title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              {section.title}
            </h2>
          )}
          {section.content && (
            <div
              className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
        </div>

        {/* Image */}
        <div className={cn("relative h-64 lg:h-auto lg:min-h-96", isImageLeft ? "lg:col-start-1" : "lg:col-start-2")}>
          {section.images && section.images.length > 0 ? (
            <ImageWithFallback
              src={section.images[0]}
              alt={section.title || 'Product image'}
              productCategory={productCategory}
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src="/placeholder-monster.svg"
              alt="Image produit"
              fill
              className="object-contain p-2 lg:p-8"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Grid de caractéristiques techniques (cartes 4 colonnes)
function SpecsGridSection({ section }: { section: ProductContentSection }) {
  const specs = section.metadata?.specs || [];

  if (specs.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-8">
      {section.title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          {section.title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{spec.icon}</span>
              <h3 className="font-bold text-sm text-gray-600 uppercase tracking-wide">{spec.label}</h3>
            </div>
            <p className="font-semibold text-gray-900 mb-1">{spec.value}</p>
            {spec.details && (
              <p className="text-sm text-gray-600">{spec.details}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Liste de points forts avec image (alternance)
function FeaturesListSection({ section, productCategory }: { section: ProductContentSection; productCategory: string }) {
  const features = section.metadata?.features || [];
  const isImageLeft = section.layout_variant === 'image-left-text-right';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-8",
        isImageLeft ? "lg:grid-flow-col" : "lg:grid-flow-col-dense"
      )}>
        {/* Points forts */}
        <div className={cn("p-8 flex flex-col justify-center", isImageLeft ? "lg:col-start-2" : "lg:col-start-1")}>
          {section.title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="h-8 w-8 text-yellow-400 fill-current" />
              {section.title}
            </h2>
          )}
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 leading-relaxed">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className={cn("relative h-64 lg:h-auto lg:min-h-96 hidden lg:block", isImageLeft ? "lg:col-start-1" : "lg:col-start-2")}>
          {section.images && section.images.length > 0 ? (
            <ImageWithFallback
              src={section.images[0]}
              alt={section.title || 'Product features'}
              productCategory={productCategory}
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src="/placeholder-monster.svg"
              alt="Points forts"
              fill
              className="object-contain p-2 lg:p-8"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Encart engagement "Pourquoi choisir"
function EngagementCardSection({ section, productCategory }: { section: ProductContentSection; productCategory: string }) {
  const isImageLeft = section.layout_variant === 'image-left-text-right';

  return (
    <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg overflow-hidden border-2 border-green-100">
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-8",
        isImageLeft ? "lg:grid-flow-col" : "lg:grid-flow-col-dense"
      )}>
        {/* Texte */}
        <div className={cn("p-8 flex flex-col justify-center", isImageLeft ? "lg:col-start-2" : "lg:col-start-1")}>
          {section.title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="h-8 w-8 text-yellow-500" />
              {section.title}
            </h2>
          )}
          {section.content && (
            <div
              className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
        </div>

        {/* Image */}
        <div className={cn("relative h-64 lg:h-auto lg:min-h-96", isImageLeft ? "lg:col-start-1" : "lg:col-start-2")}>
          {section.images && section.images.length > 0 ? (
            <ImageWithFallback
              src={section.images[0]}
              alt={section.title || 'Product engagement'}
              productCategory={productCategory}
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src="/placeholder-monster.svg"
              alt="Engagement"
              fill
              className="object-contain p-2 lg:p-8"
            />
          )}
        </div>
      </div>
    </div>
  );
}
