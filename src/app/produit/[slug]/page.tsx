import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import ProductTabs from '@/components/ProductTabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedProducts from '@/components/FeaturedProducts';
import { createClient } from '@/lib/supabase/client';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';
import type { ProductFullView } from '@/lib/supabase/client';

// ⚡ DÉSACTIVER COMPLÈTEMENT LE CACHE Next.js 15
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Récupérer un produit par son slug depuis Supabase avec ses variants
async function getProductBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(*),
      category:categories!products_category_id_fkey(*),
      product_variants(*)
    `)
    .eq('url_slug', slug)
    .single()
    .then((result: any) => {
      // Tag this fetch for revalidation
      return result;
    });

  if (error || !data) return null;

  // 🔍 DEBUG: Log variants data
  console.log('🔍 DEBUG VARIANTS:', JSON.stringify(data.product_variants, null, 2));

  // Construire un ProductFullView à partir des données Supabase
  const basePrice = typeof data.price === 'string' ? parseFloat(data.price) : data.price;

  // IMPORTANT: Si le produit a des variants, la promo est gérée au niveau de chaque variant
  // Si le produit n'a PAS de variants, la promo du produit parent s'applique
  const hasVariants = data.product_variants && data.product_variants.length > 0;
  const adminDiscount = hasVariants ? 0 : (data.admin_discount_percent || 0);

  // Calculer le prix final et le prix original si promotion admin active
  const finalPrice = adminDiscount > 0
    ? basePrice * (1 - adminDiscount / 100)
    : basePrice;
  const originalPrice = adminDiscount > 0 ? basePrice : (data.original_price || undefined);
  const discountPercentage = adminDiscount > 0 ? adminDiscount : (data.discount_percentage || undefined);

  const product: ProductFullView = {
    id: data.id,
    sku: data.sku,
    name: data.name,
    url_slug: data.url_slug,
    brand_name: data.brand?.name || '',
    category_name: data.category?.name || '',
    subcategory_name: data.subcategory || undefined,
    description: data.description || undefined,
    short_description: data.short_description || undefined,
    price: finalPrice,
    original_price: originalPrice,
    discount_percentage: discountPercentage,
    status: data.status,
    // @ts-ignore - stock_quantity type issue
    stock_quantity: data.stock_quantity || 0,
    warranty: data.warranty || undefined,
    delivery_time: data.delivery_time || undefined,
    repairability_index: data.repairability_index || undefined,
    das_head: data.das_head || undefined,
    das_body: data.das_body || undefined,
    average_rating: data.average_rating || undefined,
    total_reviews: data.total_reviews || undefined,
    variants: data.product_variants || undefined,
    images: data.images || undefined,
    specifications: data.specifications || undefined,
    highlights: data.highlights || undefined,
    badges: data.badges || undefined,
    videos: data.videos || undefined,
    reviews: []
  };

  // Utiliser l'adaptateur pour convertir au format legacy
  return supabaseProductToLegacy(product);
}

// Récupérer des produits similaires de la même marque
async function getRelatedProducts(brandName: string, currentProductId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands!inner(*),
      category:categories!products_category_id_fkey(*),
      product_variants(*)
    `)
    .eq('brand.name', brandName)
    .neq('id', currentProductId)
    .limit(4);

  if (!data) return [];

  // Convertir tous les produits
  return data.map((item: any) => {
    const basePrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;

    // IMPORTANT: Si le produit a des variants, la promo est gérée au niveau de chaque variant
    // Si le produit n'a PAS de variants, la promo du produit parent s'applique
    const hasVariants = item.product_variants && item.product_variants.length > 0;
    const adminDiscount = hasVariants ? 0 : (item.admin_discount_percent || 0);

    // Calculer le prix final et le prix original si promotion admin active
    const finalPrice = adminDiscount > 0
      ? basePrice * (1 - adminDiscount / 100)
      : basePrice;
    const originalPrice = adminDiscount > 0 ? basePrice : (item.original_price || undefined);
    const discountPercentage = adminDiscount > 0 ? adminDiscount : (item.discount_percentage || undefined);

    const product: ProductFullView = {
      id: item.id,
      sku: item.sku,
      name: item.name,
      url_slug: item.url_slug,
      brand_name: item.brand?.name || '',
      category_name: item.category?.name || '',
      subcategory_name: item.subcategory || undefined,
      description: item.description || undefined,
      short_description: item.short_description || undefined,
      price: finalPrice,
      original_price: originalPrice,
      discount_percentage: discountPercentage,
      status: item.status,
      // @ts-ignore - stock_quantity type issue
      stock_quantity: item.stock_quantity || 0,
      warranty: item.warranty || undefined,
      delivery_time: item.delivery_time || undefined,
      repairability_index: item.repairability_index || undefined,
      das_head: item.das_head || undefined,
      das_body: item.das_body || undefined,
      average_rating: item.average_rating || undefined,
      total_reviews: item.total_reviews || undefined,
      variants: item.product_variants || undefined,
      images: item.images || undefined,
      specifications: item.specifications || undefined,
      highlights: item.highlights || undefined,
      badges: item.badges || undefined,
      videos: item.videos || undefined,
      reviews: []
    };
    return supabaseProductToLegacy(product);
  });
}

// Générer les métadonnées dynamiques pour le SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Produit non trouvé | Monster Phone Boutique',
      description: 'Le produit que vous recherchez n\'est pas disponible.',
    };
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.fullDescription || product.shortDescription,
    image: product.variants?.[0]?.images?.[0] || '',
    brand: {
      '@type': 'Brand',
      name: product.brandName,
    },
    offers: {
      '@type': 'Offer',
      url: `https://monsterphone.re/produit/${product.urlSlug}`,
      priceCurrency: 'EUR',
      price: product.basePrice,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.variants?.some(v => v.stock > 0) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Monster Phone Boutique',
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'EUR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'FR',
          addressRegion: 'La Réunion',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'FR',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.average,
      reviewCount: product.rating.count,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    additionalProperty: [
      ...(product.specifications?.map(spec => ({
        '@type': 'PropertyValue',
        name: spec.label,
        value: spec.value,
      })) || []),
      ...(product.repairabilityIndex ? [{
        '@type': 'PropertyValue',
        name: 'Indice de réparabilité',
        value: product.repairabilityIndex,
        maxValue: 10,
      }] : []),
    ],
  };

  return {
    title: `${product.name} | ${product.brandName} | Monster Phone Boutique`,
    description: product.shortDescription || `Découvrez ${product.name} de ${product.brandName}. Livraison gratuite à La Réunion dès 50€. Garantie 2 ans.`,
    keywords: `${product.name}, ${product.brandName}, ${product.categoryName}, La Réunion, 974, Monster Phone`,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `https://monsterphone.re/produit/${product.urlSlug}`,
      siteName: 'Monster Phone Boutique',
      images: (product.variants?.[0]?.images || []).map(image => ({
        url: image,
        width: 1200,
        height: 1200,
        alt: product.name,
      })),
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription,
      images: [product.variants?.[0]?.images?.[0] || ''],
    },
    alternates: {
      canonical: `https://monsterphone.re/produit/${product.urlSlug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'product:price:amount': product.basePrice.toString(),
      'product:price:currency': 'EUR',
      'product:availability': product.variants?.some(v => v.stock > 0) ? 'in stock' : 'out of stock',
      'product:condition': 'new',
      'product:brand': product.brandName,
      'product:category': product.categoryName,
      ...(jsonLd && {
        'application/ld+json': JSON.stringify(jsonLd),
      }),
    },
  };
}

// Générer les pages statiques pour tous les produits
export async function generateStaticParams() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from('products')
    .select('url_slug')
    .eq('status', 'active');

  return products?.map((product: any) => ({
    slug: product.url_slug,
  })) || [];
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Produits similaires de la même marque
  const relatedProducts = await getRelatedProducts(product.brandName, product.id);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[110px]">
        <ProductDetail product={product} />

        {/* Tabs section - Description, Avis, Livraison */}
        <div className="max-w-7xl mx-auto px-4">
          <ProductTabs product={product} />
        </div>

        {/* Section produits similaires */}
        {relatedProducts.length > 0 && (
          <FeaturedProducts
            products={relatedProducts}
            title={`Autres produits ${product.brandName}`}
            hideDescription={true}
            hideCTA={true}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}