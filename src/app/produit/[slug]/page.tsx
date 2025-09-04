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
    .single();

  if (error || !data) return null;

  // Créer l'objet product avec les variants
  const product: ProductFullView = {
    id: data.id,
    name: data.name,
    slug: data.url_slug,
    url_slug: data.url_slug,
    description: data.description || '',
    short_description: data.short_description || '',
    price: parseFloat(data.price || '0'),
    unit_price_ttc: parseFloat(data.price || '0'),
    unit_price_ht: parseFloat(data.unit_price_ht || '0'),
    pvc: data.pvc,
    discount_percentage: data.discount_percentage || 0,
    images: data.images || [],
    brand_id: data.brand_id,
    brand_name: data.brand?.name || '',
    brand_slug: data.brand?.slug || '',
    category_id: data.category_id,
    category_name: data.category?.name || '',
    category_slug: data.category?.slug || '',
    subcategory: data.subcategory || '',
    specifications: data.specifications || {},
    stock: data.stock_quantity || 0,
    sku: data.sku,
    ean: data.ean,
    has_variants: data.has_variants || false,
    variant_type: data.variant_type,
    base_name: data.base_name,
    base_sku: data.base_sku,
    product_variants: data.product_variants?.map((v: any) => ({
      id: v.id,
      product_id: v.product_id,
      color: v.color,
      size: v.size,
      capacity: v.capacity,
      stock: v.stock,
      ean: v.ean,
      supplier_reference: v.supplier_reference,
      images: v.images || [],
      is_default: v.is_default
    })) || [],
    rating: {
      average: 4.5,
      count: 89
    },
    das: data.das,
    tete: data.tete,
    corps: data.corps,
    membre: data.membre,
    tax_d3e: data.tax_d3e || 0,
    tva: data.tva || 8.5,
    status: data.status,
    created_at: data.created_at,
    updated_at: data.updated_at
  };

  // Utiliser l'adaptateur pour convertir au format legacy avec reviews générées
  return supabaseProductToLegacy(product as ProductFullView);
}

// Récupérer des produits similaires de la même marque
async function getRelatedProducts(brandId: string, currentProductId: string) {
  const { data } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(*),
      category:categories!products_category_id_fkey(*),
      product_variants(*)
    `)
    .eq('brand_id', brandId)
    .neq('id', currentProductId)
    .limit(4);

  if (!data) return [];

  // Convertir tous les produits
  return data.map(item => {
    const product: ProductFullView = {
      id: item.id,
      name: item.name,
      slug: item.url_slug,
      url_slug: item.url_slug,
      description: item.description || '',
      short_description: item.short_description || '',
      price: parseFloat(item.price || '0'),
      unit_price_ttc: parseFloat(item.price || '0'),
      unit_price_ht: parseFloat(item.unit_price_ht || '0'),
      pvc: item.pvc,
      discount_percentage: item.discount_percentage || 0,
      images: item.images || [],
      brand_id: item.brand_id,
      brand_name: item.brand?.name || '',
      brand_slug: item.brand?.slug || '',
      category_id: item.category_id,
      category_name: item.category?.name || '',
      category_slug: item.category?.slug || '',
      subcategory: item.subcategory || '',
      specifications: item.specifications || {},
      stock: item.stock_quantity || 0,
      sku: item.sku,
      ean: item.ean,
      has_variants: item.has_variants || false,
      variant_type: item.variant_type,
      base_name: item.base_name,
      base_sku: item.base_sku,
      product_variants: item.product_variants?.map((v: any) => ({
        id: v.id,
        product_id: v.product_id,
        color: v.color,
        size: v.size,
        capacity: v.capacity,
        stock: v.stock,
        ean: v.ean,
        supplier_reference: v.supplier_reference,
        images: v.images || [],
        is_default: v.is_default
      })) || [],
      rating: {
        average: 4.5,
        count: 89
      },
      das: item.das,
      tete: item.tete,
      corps: item.corps,
      membre: item.membre,
      tax_d3e: item.tax_d3e || 0,
      tva: item.tva || 8.5,
      status: item.status,
      created_at: item.created_at,
      updated_at: item.updated_at
    };
    return supabaseProductToLegacy(product as ProductFullView);
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

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Produits similaires de la même marque
  const relatedProducts = await getRelatedProducts(product.brand_id || product.brand, product.id);

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