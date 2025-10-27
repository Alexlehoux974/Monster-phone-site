'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, AlertCircle, Package } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDetail from '@/components/ProductDetail';
import SimilarProducts from '@/components/SimilarProducts';

const supabase = createClient();

interface SupabaseProduct {
  id: string;
  sku: string;
  name: string;
  url_slug: string;
  price: number;
  original_price?: number;
  discount?: number;
  stock_quantity?: number;
  status: string;
  description?: string;
  short_description?: string;
  specifications?: any;
  highlights?: string[];
  warranty?: string;
  delivery_time?: string;
  repairability_index?: number;
  das_head?: string;
  das_body?: string;
  das_limb?: string;
  d3e_tax?: number;
  tva_rate?: number;
  energy_class?: string;
  unit_price_ht?: number;
  image_url?: string;
  images?: string[];
  average_rating?: number;
  total_reviews?: number;
  brands: {
    id: string;
    name: string;
    slug: string;
    logo_url?: string;
  };
  categories: {
    id: string;
    name: string;
    slug: string;
  };
  product_variants: Array<{
    id: string;
    sku: string;
    color?: string;
    storage?: string;
    ram?: string;
    stock: number;
    ean?: string;
    price?: number;
    images?: string[];
  }>;
  product_images: Array<{
    id: string;
    url: string;
    alt?: string;
    is_primary: boolean;
  }>;
  product_reviews: Array<{
    id: string;
    author_name: string;
    rating: number;
    title?: string;
    comment?: string;
    created_at: string;
    is_verified: boolean;
  }>;
}

export default function ProduitSupabasePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stockUpdateTime, setStockUpdateTime] = useState<Date>(new Date());

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('🔍 [CLIENT] Fetching product with slug:', slug);
        setLoading(true);

        // Appeler l'API route qui utilise le service role key
        // cache: 'no-store' + timestamp pour forcer Chrome à bypasser son cache
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/products/${slug}?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });

        console.log('📡 [CLIENT] API response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('❌ [CLIENT] API error:', errorData);
          setError(errorData.error || 'Produit non trouvé');
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log('✅ [CLIENT] Product data received:', data.name);

        // Transformer les données au format attendu par ProductDetail
        const transformedProduct = transformProduct(data);

        // Log des données transformées pour debugging
        console.log('📦 [TRANSFORM] Product:', {
          name: transformedProduct.name,
          price: transformedProduct.price,
          originalPrice: transformedProduct.originalPrice,
          discount: transformedProduct.discount,
          variants: transformedProduct.variants?.map(v => ({
            color: v.color,
            price: v.price,
            originalPrice: v.originalPrice,
            discount: v.discount
          }))
        });

        console.log('✨ [BEFORE SET] About to set product state');
        setProduct(transformedProduct);
        console.log('✨ [AFTER SET] Product state updated');
        setStockUpdateTime(new Date());
        console.log('✨ [STOCK UPDATE] Stock update time set');
      } catch (err) {
        console.error('Erreur:', err);
        setError('Erreur lors du chargement du produit');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  // Transformer les données Supabase au format attendu
  const transformProduct = (data: SupabaseProduct) => {
    // Calculer le stock total
    const totalStock = data.product_variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || data.stock_quantity || 0;
    
    // Préparer les images
    const allImages = [];
    if (data.product_images?.length) {
      allImages.push(...data.product_images.map(img => img.url));
    } else if (data.images && data.images.length > 0) {
      allImages.push(...data.images);
    } else if (data.image_url) {
      allImages.push(data.image_url);
    }
    
    if (allImages.length === 0) {
      allImages.push('/placeholder-monster.svg');
    }

    // Préparer les variantes avec gestion des promotions admin
    const variants = data.product_variants?.map(v => {
      const basePrice = v.price || data.price;
      const discount = v.admin_discount_percent || 0;
      const finalPrice = discount > 0
        ? basePrice * (1 - discount / 100)
        : basePrice;

      const variant = {
        id: v.id,
        sku: v.sku,
        color: v.color || 'Standard',
        colorCode: '',
        storage: v.storage,
        ram: v.ram,
        price: finalPrice,
        originalPrice: discount > 0 ? basePrice : null,
        discount: discount > 0 ? discount : undefined,
        adminDiscountPercent: discount > 0 ? discount : undefined,
        stock: v.stock,
        ean: v.ean,
        images: v.images || []
      };

      console.log('🔧 [VARIANT]', v.color, '- Discount:', discount, '% | Base:', basePrice, '€ | Final:', finalPrice, '€');

      return variant;
    }) || [];

    // Préparer les avis
    const reviews = data.product_reviews?.map(r => ({
      id: r.id,
      author: r.author_name,
      rating: r.rating,
      title: r.title || '',
      comment: r.comment || '',
      date: new Date(r.created_at).toLocaleDateString('fr-FR'),
      verified: r.is_verified,
      helpful: 0
    })) || [];

    // Calculer la distribution des notes
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      if (r.rating >= 1 && r.rating <= 5) {
        ratingDistribution[r.rating as keyof typeof ratingDistribution]++;
      }
    });

    // Préparer les spécifications
    const specs = data.specifications || {};
    
    // Ajouter les données techniques de la base
    if (data.repairability_index) {
      specs.repairabilityIndex = data.repairability_index;
    }
    if (data.das_head) {
      specs.dasHead = data.das_head;
    }
    if (data.das_body) {
      specs.dasBody = data.das_body;
    }
    if (data.das_limb) {
      specs.dasLimb = data.das_limb;
    }
    if (data.energy_class) {
      specs.energyClass = data.energy_class;
    }
    if (data.d3e_tax) {
      specs.d3eTax = data.d3e_tax;
    }

    return {
      id: data.id,
      sku: data.sku,
      name: data.name,
      slug: data.url_slug,
      urlSlug: data.url_slug,
      brand: data.brands?.name || 'Unknown',
      brandSlug: data.brands?.slug || '',
      brandLogo: data.brands?.logo_url,
      category: data.categories?.name || 'Unknown',
      categorySlug: data.categories?.slug || '',
      subcategory: '',
      price: data.admin_discount_percent && data.admin_discount_percent > 0
        ? data.price * (1 - data.admin_discount_percent / 100)
        : data.price,
      originalPrice: data.admin_discount_percent && data.admin_discount_percent > 0
        ? data.price
        : (data.original_price || null),
      discount: data.admin_discount_percent || data.discount || undefined,
      images: allImages,
      inStock: totalStock > 0,
      stockQuantity: totalStock,
      status: data.status,
      description: data.description || data.short_description || '',
      shortDescription: data.short_description || '',
      highlights: data.highlights || [],
      specifications: specs,
      warranty: data.warranty || '2 ans',
      deliveryTime: data.delivery_time || '2-3 jours',
      rating: {
        average: data.average_rating || 0,
        count: data.total_reviews || reviews.length,
        distribution: ratingDistribution
      },
      reviews: reviews,
      variants: variants,
      badges: [],
      features: [],
      videos: [],
      unitPriceHT: data.unit_price_ht,
      tvaRate: data.tva_rate || 20,
      ecoTax: data.d3e_tax || 0
    };
  };

  // Rafraîchir le stock toutes les 30 secondes
  useEffect(() => {
    if (!product) return;
    
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from('products')
        .select('stock_quantity, product_variants(stock)')
        .eq('url_slug', slug)
        .single();
      
      if (data) {
        const totalStock = data.product_variants?.reduce((sum: number, v: any) => sum + (v.stock || 0), 0) || data.stock_quantity || 0;
        setProduct((prev: any) => ({
          ...prev,
          stockQuantity: totalStock,
          inStock: totalStock > 0
        }));
        setStockUpdateTime(new Date());
      }
    }, 30000); // 30 secondes

    return () => clearInterval(interval);
  }, [product, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] pt-[110px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
            <p className="text-gray-600">Chargement du produit...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] pt-[110px]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Produit non trouvé</h1>
            <p className="text-gray-600">{error || 'Le produit demandé n\'existe pas.'}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-[110px]">
        {/* Composant ProductDetail existant */}
        <ProductDetail product={product} />

        {/* Produits similaires */}
        <SimilarProducts
          categorySlug={product.categorySlug}
          brandSlug={product.brandSlug}
          currentProductId={product.id}
        />
      </main>

      <Footer />
    </div>
  );
}