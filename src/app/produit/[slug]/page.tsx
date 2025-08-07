import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedProducts from '@/components/FeaturedProducts';
import { allProducts, getProductBySlug, getProductsByBrand } from '@/data/products';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Générer les métadonnées dynamiques pour le SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // Dans Next.js 15, params doit être awaited
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
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
    review: product.rating?.reviews?.map(review => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.date,
      reviewBody: review.comment,
    })),
    additionalProperty: [
      ...(product.specifications?.map(spec => ({
        '@type': 'PropertyValue',
        name: spec.label,
        value: spec.value,
      })) || []),
      ...(product.das ? [{
        '@type': 'PropertyValue',
        name: 'DAS',
        value: product.das,
        unitText: 'W/kg',
      }] : []),
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
    },
    ...(jsonLd && {
      other: {
        'application/ld+json': JSON.stringify(jsonLd),
      },
    }),
  };
}

// Générer les pages statiques pour tous les produits
export async function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.urlSlug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Dans Next.js 15, params doit être awaited
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Produits similaires de la même marque
  const relatedProducts = getProductsByBrand(product.brand)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

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