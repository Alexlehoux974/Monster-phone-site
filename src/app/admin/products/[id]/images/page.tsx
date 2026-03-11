'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import ImageManager from '@/components/admin/ImageManager';

interface Variant {
  id: string;
  color: string;
  color_code: string | null;
  images: string[];
  stock: number;
  ean: string | null;
}

interface Product {
  id: string;
  name: string;
  url_slug: string;
  brand: string;
}

export default function ProductImagesManagement() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadData = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

      const headers = {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      };

      try {
        // Load product
        const productRes = await fetch(
          `${supabaseUrl}/rest/v1/products?select=id,name,url_slug,brands(name)&id=eq.${productId}`,
          { headers }
        );

        if (!productRes.ok || !(await productRes.clone().json()).length) {
          toast.error('Produit non trouvé');
          router.push('/admin/stock');
          return;
        }

        const productData = (await productRes.json())[0];
        setProduct({
          id: productData.id,
          name: productData.name,
          url_slug: productData.url_slug,
          brand: productData.brands?.name || '',
        });

        // Load variants
        const variantsRes = await fetch(
          `${supabaseUrl}/rest/v1/product_variants?product_id=eq.${productId}&order=is_default.desc,color.asc`,
          { headers }
        );

        if (variantsRes.ok) {
          const variantsData = await variantsRes.json();
          setVariants(
            variantsData.map((v: Record<string, unknown>) => ({
              id: v.id,
              color: v.color || 'Standard',
              color_code: v.color_code,
              images: (v.images as string[]) || [],
              stock: v.stock || 0,
              ean: v.ean,
            }))
          );
        }
      } catch (error) {
        console.error('Error loading product images:', error);
        toast.error('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [productId, router]);

  const handleImagesChange = (variantId: string, newImages: string[]) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === variantId ? { ...v, images: newImages } : v))
    );
    setHasChanges((prev) => ({ ...prev, [variantId]: true }));
  };

  const handleSaveVariant = async (variantId: string) => {
    const variant = variants.find((v) => v.id === variantId);
    if (!variant) return;

    setSaving(variantId);

    try {
      const res = await fetch('/api/admin/update-variant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          variantId,
          data: { images: variant.images },
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(`Images du variant "${variant.color}" sauvegardées`);
        setHasChanges((prev) => ({ ...prev, [variantId]: false }));
      } else {
        toast.error(`Erreur: ${result.error}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(null);
    }
  };

  const handleSaveAll = async () => {
    const changedVariants = variants.filter((v) => hasChanges[v.id]);
    if (changedVariants.length === 0) {
      toast.info('Aucune modification à sauvegarder');
      return;
    }

    for (const variant of changedVariants) {
      await handleSaveVariant(variant.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) return null;

  const totalChanges = Object.values(hasChanges).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" asChild>
              <Link href="/admin/stock">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au stock
              </Link>
            </Button>
            <span className="text-gray-300">|</span>
            <Button variant="ghost" asChild>
              <Link href={`/admin/products/${productId}/content`}>
                Contenu CMS
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                <ImageIcon className="inline h-7 w-7 mr-2 text-red-600" />
                Images - {product.brand} {product.name}
              </h1>
              <p className="text-gray-500 mt-1">
                {variants.length} variant{variants.length > 1 ? 's' : ''} - Gérez les images du carrousel produit
              </p>
            </div>
            {totalChanges > 0 && (
              <Button onClick={handleSaveAll} className="bg-red-600 hover:bg-red-700">
                <Save className="h-4 w-4 mr-2" />
                Tout sauvegarder ({totalChanges})
              </Button>
            )}
          </div>
        </div>

        {/* Variants */}
        <div className="space-y-6">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Variant header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {variant.color_code && (
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: variant.color_code }}
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{variant.color}</h3>
                    <p className="text-sm text-gray-500">
                      {variant.ean ? `EAN: ${variant.ean}` : 'Pas d\'EAN'} - Stock: {variant.stock}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hasChanges[variant.id] && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      Modifié
                    </span>
                  )}
                  <Button
                    size="sm"
                    onClick={() => handleSaveVariant(variant.id)}
                    disabled={!hasChanges[variant.id] || saving === variant.id}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
                  >
                    {saving === variant.id ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    ) : (
                      <Save className="h-4 w-4 mr-1" />
                    )}
                    Sauvegarder
                  </Button>
                </div>
              </div>

              {/* Image manager */}
              <div className="p-6">
                <ImageManager
                  images={variant.images}
                  onChange={(imgs) => handleImagesChange(variant.id, imgs)}
                  folder={`products/${product.url_slug}/variants`}
                  multiple
                />
                {variant.images.length === 0 && (
                  <p className="text-sm text-gray-400 mt-2 italic">
                    Aucune image. Le placeholder par défaut sera affiché.
                  </p>
                )}
              </div>
            </div>
          ))}

          {variants.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center">
              <p className="text-gray-500">Aucun variant trouvé pour ce produit.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
