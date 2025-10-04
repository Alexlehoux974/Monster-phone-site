import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedProducts from '@/components/FeaturedProducts';
import { supabase } from '@/lib/supabase/client';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';
import type { ProductFullView } from '@/lib/supabase/client';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Récupérer un produit par son slug depuis Supabase avec ses variants
async function getProductBySlug(slug: string) {
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
    .then(result => {
      // Tag this fetch for revalidation
      return result;
    });

  if (error || !data) return null;

  // Construire un ProductFullView à partir des données Supabase
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
    price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
    original_price: data.original_price || undefined,
    discount_percentage: data.discount_percentage || undefined,
    status: data.status,
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
  return data.map(item => {
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
      price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
      original_price: item.original_price || undefined,
      discount_percentage: item.discount_percentage || undefined,
      status: item.status,
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
    description: product.description || product.shortDescription,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `https://monsterphone.re/produit/${product.urlSlug}`,
      priceCurrency: 'EUR',
      price: product.price,
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
    title: product.metaTitle || `${product.name} | ${product.brand} | Monster Phone Boutique`,
    description: product.metaDescription || product.shortDescription || `Découvrez ${product.name} de ${product.brand}. Livraison gratuite à La Réunion dès 50€. Garantie 2 ans.`,
    keywords: product.keywords?.join(', ') || `${product.name}, ${product.brand}, ${product.category}, La Réunion, 974, Monster Phone`,
    openGraph: {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.shortDescription,
      url: `https://monsterphone.re/produit/${product.urlSlug}`,
      siteName: 'Monster Phone Boutique',
      images: product.images.map(image => ({
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
      images: [product.images[0]],
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
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'EUR',
      'product:availability': product.variants?.some(v => v.stock > 0) ? 'in stock' : 'out of stock',
      'product:condition': 'new',
      'product:brand': product.brand,
      'product:category': product.category,
      ...(jsonLd && {
        'application/ld+json': JSON.stringify(jsonLd),
      }),
    },
  };
}

// Générer les pages statiques pour tous les produits
export async function generateStaticParams() {
  const { data: products } = await supabase
    .from('products')
    .select('url_slug')
    .eq('status', 'active');

  return products?.map((product) => ({
    slug: product.url_slug,
  })) || [];
}

// Revalidate every 60 seconds to pick up stock changes
export const revalidate = 60;

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Produits similaires de la même marque
  const relatedProducts = await getRelatedProducts(product.brand, product.id);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[110px]">
        <ProductDetail product={product} />
        
        {/* Section produits similaires */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Autres produits {product.brand}</h2>
              <FeaturedProducts products={relatedProducts} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}