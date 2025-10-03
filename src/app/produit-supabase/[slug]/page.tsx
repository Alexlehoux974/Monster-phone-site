'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDetail from '@/components/ProductDetail';
import { supabase } from '@/lib/supabase/client';
import { Loader2, AlertCircle, Package } from 'lucide-react';

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
        setLoading(true);
        
        // Récupérer le produit de base
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('url_slug', slug)
          .single();

        if (productError) {
          console.error('Erreur Supabase produit:', productError);
          setError('Produit non trouvé');
          return;
        }

        // Récupérer les données associées
        const [
          { data: brandData },
          { data: categoryData },
          { data: variantsData },
          { data: imagesData },
          { data: reviewsData }
        ] = await Promise.all([
          supabase.from('brands').select('*').eq('id', productData.brand_id).single(),
          supabase.from('categories').select('*').eq('id', productData.category_id).single(),
          supabase.from('product_variants').select('*').eq('product_id', productData.id),
          supabase.from('product_images').select('*').eq('product_id', productData.id),
          supabase.from('product_reviews').select('*').eq('product_id', productData.id)
        ]);

        // Combiner les données
        const data = {
          ...productData,
          brands: brandData || { id: '', name: 'Unknown', slug: '' },
          categories: categoryData || { id: '', name: 'Unknown', slug: '' },
          product_variants: variantsData || [],
          product_images: imagesData || [],
          product_reviews: reviewsData || []
        };

        const error = null;

        if (error) {
          console.error('Erreur Supabase:', error);
          setError('Produit non trouvé');
        } else if (data) {
          // Transformer les données au format attendu par ProductDetail
          const transformedProduct = transformProduct(data);
          setProduct(transformedProduct);
          setStockUpdateTime(new Date());
        }
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
      allImages.push('/images/placeholder.jpg');
    }

    // Préparer les variantes
    const variants = data.product_variants?.map(v => ({
      id: v.id,
      sku: v.sku,
      color: v.color || 'Standard',
      colorCode: '',
      storage: v.storage,
      ram: v.ram,
      price: v.price || data.price,
      stock: v.stock,
      ean: v.ean,
      images: v.images || []
    })) || [];

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
      price: data.price,
      originalPrice: data.original_price,
      discount: data.discount,
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
        <div className="flex items-center justify-center min-h-[60vh]">
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
        <div className="flex items-center justify-center min-h-[60vh]">
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
      
      {/* Bannière info Supabase */}
      <div className="bg-green-50 border-b border-green-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-green-700">
              <Package className="w-4 h-4" />
              <span className="font-medium">Données en temps réel depuis Supabase</span>
            </div>
            <div className="text-green-600">
              Stock mis à jour : {stockUpdateTime.toLocaleTimeString('fr-FR')}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Badge stock en temps réel */}
        <div className="mb-4">
          {product.stockQuantity > 0 ? (
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {product.stockQuantity} unités en stock
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Rupture de stock
            </div>
          )}
        </div>

        {/* Composant ProductDetail existant */}
        <ProductDetail product={product} />

        {/* Informations supplémentaires de Supabase */}
        {(product.unitPriceHT || product.tvaRate || product.ecoTax) && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Informations fiscales</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {product.unitPriceHT && (
                <div>
                  <span className="text-gray-600 text-sm">Prix HT</span>
                  <p className="font-semibold">{product.unitPriceHT.toFixed(2)} €</p>
                </div>
              )}
              {product.tvaRate && (
                <div>
                  <span className="text-gray-600 text-sm">TVA</span>
                  <p className="font-semibold">{product.tvaRate}%</p>
                </div>
              )}
              {product.ecoTax > 0 && (
                <div>
                  <span className="text-gray-600 text-sm">Éco-participation</span>
                  <p className="font-semibold">{product.ecoTax.toFixed(2)} €</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}