import { Product } from '@/data/products';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type: 'organization' | 'product' | 'breadcrumb' | 'website';
  data?: {
    product?: Product;
    items?: BreadcrumbItem[];
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Monster Phone Boutique',
          url: 'https://monsterphone.re',
          logo: 'https://monsterphone.re/LOGO-MONSTER-PHONE.png',
          sameAs: [
            'https://www.facebook.com/monsterphone974',
            'https://www.instagram.com/monsterphone974',
          ],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Saint-Denis',
            addressRegion: 'La Réunion',
            postalCode: '97400',
            addressCountry: 'FR',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+262692XXXXXX',
            contactType: 'customer service',
            areaServed: 'RE',
            availableLanguage: ['French'],
          },
        };

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Monster Phone Boutique',
          url: 'https://monsterphone.re',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://monsterphone.re/nos-produits?search={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        };

      case 'product':
        if (!data || !data.product) return null;
        const product: Product = data.product;
        // Price is already a number in the Product interface
        const price = product.price;
        
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.images[0] || 'https://monsterphone.re/placeholder-product.png',
          brand: {
            '@type': 'Brand',
            name: product.brand,
          },
          offers: {
            '@type': 'Offer',
            price: price.toFixed(2),
            priceCurrency: 'EUR',
            availability: product.status === 'active' 
              ? 'https://schema.org/InStock' 
              : 'https://schema.org/OutOfStock',
            seller: {
              '@type': 'Organization',
              name: 'Monster Phone Boutique',
            },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: {
                '@type': 'MonetaryAmount',
                value: price >= 50 ? '0' : '5.90',
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
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.2',
            reviewCount: '42',
          },
        };

      case 'breadcrumb':
        if (!data || !data.items) return null;
        
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.items.map((item: BreadcrumbItem, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}