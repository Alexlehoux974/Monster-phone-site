import type { Metadata } from 'next';
import { allProducts } from '@/data/products';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Dans Next.js 15, params doit être awaited
  const { slug } = await params;
  const product = allProducts.find(p => p.urlSlug === slug || p.id === slug);
  
  if (!product) {
    return {
      title: 'Produit non trouvé',
      description: 'Le produit recherché n\'est pas disponible.',
    };
  }

  // Le prix est maintenant un nombre dans l'interface Product
  const price = product.price;
  
  return {
    title: `${product.name} - ${product.brand}`,
    description: product.metaDescription || product.description,
    keywords: product.keywords,
    openGraph: {
      title: `${product.name} | Monster Phone Boutique`,
      description: product.description,
      url: `https://monsterphone.re/produit/${product.urlSlug || product.id}`,
      siteName: 'Monster Phone Boutique',
      images: product.images[0] ? [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ] : [],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.images[0] ? [product.images[0]] : [],
    },
    alternates: {
      canonical: `https://monsterphone.re/produit/${product.urlSlug || product.id}`,
    },
    other: {
      'product:price:amount': price.toFixed(2),
      'product:price:currency': 'EUR',
      'product:availability': product.status === 'active' ? 'in stock' : 'out of stock',
      'product:brand': product.brand,
      'product:category': product.category,
    },
  };
}

export default function ProduitLayout({ children }: Props) {
  return <>{children}</>;
}