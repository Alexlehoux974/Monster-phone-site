import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  const baseUrl = 'https://monsterphone.re';
  
  // Pages statiques principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/nos-produits`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/accessoires`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/promotions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reparation`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/compte`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/panier`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Pages de services
  const servicePages = [
    'garantie',
    'livraison',
    'livraison-gratuite',
    'retours',
    'retours-30-jours',
    'sav',
    'service-apres-vente',
    'support',
    'support-technique',
  ].map((service: any) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Pages légales
  const legalPages = [
    'conditions-generales',
    'confidentialite',
    'mentions-legales',
    'plan-du-site',
  ].map((page: any) => ({
    url: `${baseUrl}/legal/${page}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  // Pages produits dynamiques depuis Supabase
  const { data: products } = await supabase
    .from('products')
    .select('url_slug, updated_at')
    .eq('status', 'active');

  const productPages = (products || []).map((product: any) => ({
    url: `${baseUrl}/produit/${product.url_slug}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...legalPages, ...productPages];
}