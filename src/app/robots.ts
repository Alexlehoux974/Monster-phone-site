import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/compte/',
          '/panier',
          '/checkout',
          '/test-*',
        ],
      },
    ],
    sitemap: 'https://monsterphone.re/sitemap.xml',
  };
}