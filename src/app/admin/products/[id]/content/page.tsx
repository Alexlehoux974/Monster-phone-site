'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Save, Trash2, Eye, EyeOff, GripVertical, Copy, X } from 'lucide-react';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import { cn } from '@/lib/utils';

// Interface EXACTE correspondant à ProductContentCards.tsx
interface ProductContentSection {
  id: string;
  product_id: string;
  section_type: 'image_gallery' | 'description_card' | 'specs_grid' | 'features_list' | 'engagement_card' | 'custom';
  title: string | null;
  content: string | null;
  images: string[]; // Google Drive URLs
  is_enabled: boolean;
  display_order: number;
  layout_variant: string; // 'image-left-text-right' or other string
  metadata: {
    specs?: Array<{
      icon: string;      // Emoji like "🔋"
      label: string;     // "Batterie"
      value: string;     // "5000 mAh"
      details?: string;  // "Charge rapide 67W"
    }>;
    features?: Array<{
      icon: string;      // Emoji (not displayed, replaced by CheckCircle2)
      text: string;      // "Écran AMOLED 120Hz ultra-fluide"
    }>;
  };
  created_at: string;
  updated_at: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
}

// Composant RadioOption avec zone cliquable étendue
const RadioOption = ({ value, label, currentValue, onSelect }: {
  value: string;
  label: string;
  currentValue: string;
  onSelect: (value: string) => void;
}) => {
  const emoji = label.split(' ')[0];
  const text = label.slice(emoji.length + 1);
  const isSelected = currentValue === value;

  return (
    <div
      onClick={() => onSelect(value)}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all",
        "hover:border-red-400 hover:bg-red-50",
        isSelected
          ? "border-red-600 bg-red-50 shadow-sm"
          : "border-gray-200 bg-white"
      )}
    >
      <div className={cn(
        "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
        isSelected ? "border-red-600" : "border-gray-300"
      )}>
        {isSelected && <div className="w-2 h-2 rounded-full bg-red-600" />}
      </div>
      <span className="text-xl shrink-0">{emoji}</span>
      <span className="flex-1 text-sm">{text}</span>
    </div>
  );
};

export default function ProductContentManagement() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [sections, setSections] = useState<ProductContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSection, setEditingSection] = useState<ProductContentSection | null>(null);
  const [isNewSection, setIsNewSection] = useState(false);

  // Load product and sections using REST API (avoids Supabase client blocking issues)
  useEffect(() => {
    const loadData = async () => {
      console.log('📦 [CONTENT] Loading data for product:', productId);

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

      const headers = {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      };

      try {
        // Load product with brand (LEFT JOIN to avoid failure if no brand)
        const productResponse = await fetch(
          `${supabaseUrl}/rest/v1/products?select=id,name,brands(name)&id=eq.${productId}`,
          { headers, signal: AbortSignal.timeout(10000) }
        );

        if (!productResponse.ok) {
          console.error('❌ [CONTENT] Product fetch error:', productResponse.status);
          toast.error('Erreur lors du chargement du produit');
          router.push('/admin/stock');
          return;
        }

        const productData = await productResponse.json();
        console.log('✅ [CONTENT] Product loaded:', productData);

        if (!productData || productData.length === 0) {
          toast.error('Produit non trouvé');
          router.push('/admin/stock');
          return;
        }

        const prod = productData[0];
        setProduct({
          id: prod.id,
          name: prod.name,
          brand: prod.brands?.name || '',
        });

        // Load sections
        const sectionsResponse = await fetch(
          `${supabaseUrl}/rest/v1/product_content_sections?product_id=eq.${productId}&order=display_order.asc`,
          { headers, signal: AbortSignal.timeout(10000) }
        );

        if (sectionsResponse.ok) {
          const sectionsData = await sectionsResponse.json();
          console.log('✅ [CONTENT] Sections loaded:', sectionsData?.length || 0);
          setSections(sectionsData || []);
        } else {
          console.error('❌ [CONTENT] Sections fetch error:', sectionsResponse.status);
          toast.error('Erreur lors du chargement des sections');
          setSections([]);
        }
      } catch (error) {
        console.error('❌ [CONTENT] Error loading data:', error);
        toast.error('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [productId, router]);

  const handleNewSection = () => {
    setEditingSection({
      id: crypto.randomUUID(),
      product_id: productId,
      section_type: 'description_card',
      title: '',
      content: '',
      images: [],
      is_enabled: true,
      display_order: sections.length,
      layout_variant: 'image-left-text-right',
      metadata: {
        specs: [],
        features: []
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setIsNewSection(true);
  };

  // Revalidate cache after content changes
  const revalidateCache = async () => {
    try {
      // Récupérer le token d'auth stocké dans localStorage (même clé que le système d'auth)
      let token: string | null = null;
      try {
        const sessionData = localStorage.getItem('sb-nswlznqoadjffpxkagoz-auth-token');
        if (sessionData) {
          token = JSON.parse(sessionData).access_token || null;
        }
      } catch {
        // Ignore parsing errors
      }

      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        credentials: 'include',
        body: JSON.stringify({ tag: 'products' }),
      });

      if (!response.ok) {
        console.error('⚠️ [CONTENT] Revalidation failed:', response.status);
      } else {
        console.log('✅ [CONTENT] Cache revalidated');
      }
    } catch (error) {
      console.error('⚠️ [CONTENT] Revalidation error (non-blocking):', error);
    }
  };

  const handleSaveSection = async () => {
    if (!editingSection) return;

    setSaving(true);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const headers = {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    };

    try {
      const sectionData = {
        product_id: productId,
        section_type: editingSection.section_type,
        title: editingSection.title,
        content: editingSection.content,
        images: editingSection.images,
        is_enabled: editingSection.is_enabled,
        display_order: editingSection.display_order,
        layout_variant: editingSection.layout_variant,
        metadata: editingSection.metadata,
      };

      if (isNewSection) {
        // Insert new section via REST API
        const response = await fetch(
          `${supabaseUrl}/rest/v1/product_content_sections`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify(sectionData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de l\'ajout');
        }

        const newSection = await response.json();
        setSections([...sections, Array.isArray(newSection) ? newSection[0] : newSection]);
        toast.success('Section ajoutée avec succès');
      } else {
        // Update existing section via REST API
        const response = await fetch(
          `${supabaseUrl}/rest/v1/product_content_sections?id=eq.${editingSection.id}`,
          {
            method: 'PATCH',
            headers,
            body: JSON.stringify(sectionData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la mise à jour');
        }

        setSections(sections.map((s: any) => (s.id === editingSection.id ? { ...editingSection, ...sectionData } : s)));
        toast.success('Section mise à jour avec succès');
      }

      // Revalidate cache to update the site
      await revalidateCache();

      setEditingSection(null);
      setIsNewSection(false);
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette section ?')) return;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/product_content_sections?id=eq.${sectionId}`,
        {
          method: 'DELETE',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setSections(sections.filter((s) => s.id !== sectionId));
      toast.success('Section supprimée');

      // Revalidate cache
      await revalidateCache();
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleToggleEnabled = async (sectionId: string, enabled: boolean) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/product_content_sections?id=eq.${sectionId}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_enabled: enabled }),
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la modification');
      }

      setSections(sections.map((s: any) => (s.id === sectionId ? { ...s, is_enabled: enabled } : s)));
      toast.success(enabled ? 'Section activée' : 'Section désactivée');

      // Revalidate cache
      await revalidateCache();
    } catch (error) {
      console.error('Error toggling section:', error);
      toast.error('Erreur lors de la modification');
    }
  };

  const handleDuplicateToProducts = async () => {
    if (sections.length === 0) {
      toast.error('Aucune section à dupliquer');
      return;
    }

    const targetProductsInput = prompt(
      'Entrez les IDs des produits cibles (séparés par des virgules):'
    );

    if (!targetProductsInput) return;

    const targetProductIds = targetProductsInput.split(',').map((id: string) => id.trim());

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const headers = {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    };

    let successCount = 0;

    for (const targetId of targetProductIds) {
      try {
        // Duplicate each section to the target product
        for (const section of sections) {
          const newSectionData = {
            product_id: targetId,
            section_type: section.section_type,
            title: section.title,
            content: section.content,
            images: section.images,
            is_enabled: section.is_enabled,
            display_order: section.display_order,
            layout_variant: section.layout_variant,
            metadata: section.metadata,
          };

          const response = await fetch(
            `${supabaseUrl}/rest/v1/product_content_sections`,
            {
              method: 'POST',
              headers,
              body: JSON.stringify(newSectionData),
            }
          );

          if (!response.ok) {
            console.error(`Error duplicating section to ${targetId}`);
          }
        }
        successCount++;
      } catch (error) {
        console.error(`Error duplicating to ${targetId}:`, error);
      }
    }

    toast.success(`Sections dupliquées vers ${successCount}/${targetProductIds.length} produits`);

    // Revalidate cache
    await revalidateCache();
  };

  const handleAddImage = () => {
    if (!editingSection) return;

    const imageUrl = prompt('Entrez l\'URL de l\'image (Google Drive):');

    if (imageUrl) {
      setEditingSection({
        ...editingSection,
        images: [...editingSection.images, imageUrl],
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!editingSection) return;

    setEditingSection({
      ...editingSection,
      images: editingSection.images.filter((_, i) => i !== index),
    });
  };

  // Metadata management functions
  const handleAddSpec = () => {
    if (!editingSection) return;

    setEditingSection({
      ...editingSection,
      metadata: {
        ...editingSection.metadata,
        specs: [
          ...(editingSection.metadata.specs || []),
          { icon: '📱', label: '', value: '', details: '' }
        ]
      }
    });
  };

  const handleUpdateSpec = (index: number, field: string, value: string) => {
    if (!editingSection) return;

    const updatedSpecs = [...(editingSection.metadata.specs || [])];
    updatedSpecs[index] = { ...updatedSpecs[index], [field]: value };

    setEditingSection({
      ...editingSection,
      metadata: {
        ...editingSection.metadata,
        specs: updatedSpecs
      }
    });
  };

  const handleRemoveSpec = (index: number) => {
    if (!editingSection) return;

    setEditingSection({
      ...editingSection,
      metadata: {
        ...editingSection.metadata,
        specs: (editingSection.metadata.specs || []).filter((_, i) => i !== index)
      }
    });
  };

  const handleAddFeature = () => {
    if (!editingSection) return;

    setEditingSection({
      ...editingSection,
      metadata: {
        ...editingSection.metadata,
        features: [
          ...(editingSection.metadata.features || []),
          { icon: '✓', text: '' }
        ]
      }
    });
  };

  const handleUpdateFeature = (index: number, field: string, value: string) => {
    if (!editingSection) return;

    const updatedFeatures = [...(editingSection.metadata.features || [])];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };

    setEditingSection({
      ...editingSection,
      metadata: {
        ...editingSection.metadata,
        features: updatedFeatures
      }
    });
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingSection) return;

    setEditingSection({
      ...editingSection,
      metadata: {
        ...editingSection.metadata,
        features: (editingSection.metadata.features || []).filter((_, i) => i !== index)
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const sectionTypeLabels = {
    'image_gallery': '📸 Galerie d\'images (4 colonnes, desktop only)',
    'description_card': '📄 Description avec image',
    'specs_grid': '📊 Grille de specs (4 colonnes)',
    'features_list': '⭐ Liste de points forts',
    'engagement_card': '💚 Encart engagement (fond vert)',
    'custom': '🎨 Personnalisé'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.push('/admin/stock')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au stock
            </Button>
            <h1 className="text-3xl font-bold">
              Gestion du contenu - {product.brand} {product.name}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDuplicateToProducts} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Dupliquer vers d'autres produits
            </Button>
            <Button onClick={handleNewSection}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle section
            </Button>
          </div>
        </div>

        {/* Sections List */}
        {!editingSection && (
          <div className="space-y-4">
            {sections.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 mb-4">Aucune section pour ce produit</p>
                <Button onClick={handleNewSection}>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer la première section
                </Button>
              </div>
            ) : (
              sections.map((section: any) => (
                <div
                  key={section.id}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-red-200"
                  onClick={() => {
                    setEditingSection(section);
                    setIsNewSection(false);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <GripVertical className="h-6 w-6 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{section.title || 'Sans titre'}</h3>
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {sectionTypeLabels[section.section_type]}
                          </span>
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                            {section.layout_variant}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {section.content?.replace(/<[^>]*>/g, '') || 'Pas de contenu'}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {section.images.length} image(s) • Ordre: {section.display_order}
                          {section.metadata?.specs && ` • ${section.metadata.specs.length} specs`}
                          {section.metadata?.features && ` • ${section.metadata.features.length} features`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleEnabled(section.id, !section.is_enabled)}
                      >
                        {section.is_enabled ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingSection(section);
                          setIsNewSection(false);
                        }}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSection(section.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Edit Form */}
        {editingSection && (
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <Button
              variant="ghost"
              onClick={() => {
                setEditingSection(null);
                setIsNewSection(false);
              }}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h2 className="text-2xl font-bold mb-6">
              {isNewSection ? 'Nouvelle section' : 'Modifier la section'}
            </h2>

            <div className="space-y-6">
              {/* Section Type */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Type de section</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RadioOption
                    value="image_gallery"
                    label={sectionTypeLabels['image_gallery']}
                    currentValue={editingSection.section_type}
                    onSelect={(value) => setEditingSection({...editingSection, section_type: value as ProductContentSection['section_type']})}
                  />
                  <RadioOption
                    value="description_card"
                    label={sectionTypeLabels['description_card']}
                    currentValue={editingSection.section_type}
                    onSelect={(value) => setEditingSection({...editingSection, section_type: value as ProductContentSection['section_type']})}
                  />
                  <RadioOption
                    value="specs_grid"
                    label={sectionTypeLabels['specs_grid']}
                    currentValue={editingSection.section_type}
                    onSelect={(value) => setEditingSection({...editingSection, section_type: value as ProductContentSection['section_type']})}
                  />
                  <RadioOption
                    value="features_list"
                    label={sectionTypeLabels['features_list']}
                    currentValue={editingSection.section_type}
                    onSelect={(value) => setEditingSection({...editingSection, section_type: value as ProductContentSection['section_type']})}
                  />
                  <RadioOption
                    value="engagement_card"
                    label={sectionTypeLabels['engagement_card']}
                    currentValue={editingSection.section_type}
                    onSelect={(value) => setEditingSection({...editingSection, section_type: value as ProductContentSection['section_type']})}
                  />
                  <RadioOption
                    value="custom"
                    label={sectionTypeLabels['custom']}
                    currentValue={editingSection.section_type}
                    onSelect={(value) => setEditingSection({...editingSection, section_type: value as ProductContentSection['section_type']})}
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={editingSection.title || ''}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, title: e.target.value })
                  }
                  placeholder="Titre de la section"
                />
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content">Contenu (HTML supporté)</Label>
                <Textarea
                  id="content"
                  value={editingSection.content || ''}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, content: e.target.value })
                  }
                  placeholder="<p>Votre contenu ici...</p>"
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>

              {/* Layout Variant */}
              <div>
                <Label htmlFor="layout_variant">Disposition (image-left-text-right ou autre)</Label>
                <Input
                  id="layout_variant"
                  value={editingSection.layout_variant}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      layout_variant: e.target.value,
                    })
                  }
                  placeholder="image-left-text-right"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Utilisé par description_card, features_list, engagement_card. Exemple: "image-left-text-right"
                </p>
              </div>

              {/* Images */}
              <div>
                <Label>Images (Google Drive URLs)</Label>
                <div className="space-y-2 mt-2">
                  {editingSection.images.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={url} readOnly className="flex-1" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={handleAddImage} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une image
                  </Button>
                </div>
              </div>

              {/* Metadata - Specs (for specs_grid) */}
              {editingSection.section_type === 'specs_grid' && (
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Label>Specs (pour grille 4 colonnes)</Label>
                    <Button type="button" onClick={handleAddSpec} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une spec
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {(editingSection.metadata.specs || []).map((spec, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">Spec #{index + 1}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSpec(index)}
                            className="text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Icon (emoji: 🔋)"
                            value={spec.icon}
                            onChange={(e) => handleUpdateSpec(index, 'icon', e.target.value)}
                          />
                          <Input
                            placeholder="Label (ex: Batterie)"
                            value={spec.label}
                            onChange={(e) => handleUpdateSpec(index, 'label', e.target.value)}
                          />
                          <Input
                            placeholder="Value (ex: 5000 mAh)"
                            value={spec.value}
                            onChange={(e) => handleUpdateSpec(index, 'value', e.target.value)}
                          />
                          <Input
                            placeholder="Details (optionnel)"
                            value={spec.details || ''}
                            onChange={(e) => handleUpdateSpec(index, 'details', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata - Features (for features_list) */}
              {editingSection.section_type === 'features_list' && (
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Label>Points forts (pour liste avec CheckCircle2)</Label>
                    <Button type="button" onClick={handleAddFeature} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un point fort
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(editingSection.metadata.features || []).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          placeholder="Icon (non affiché, CheckCircle2 utilisé)"
                          value={feature.icon}
                          onChange={(e) => handleUpdateFeature(index, 'icon', e.target.value)}
                          className="w-24"
                        />
                        <Input
                          placeholder="Texte du point fort"
                          value={feature.text}
                          onChange={(e) => handleUpdateFeature(index, 'text', e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Display Order */}
              <div>
                <Label htmlFor="display_order">Ordre d'affichage</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={editingSection.display_order}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      display_order: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              {/* Enabled Toggle */}
              <div className="flex items-center gap-2">
                <Switch
                  id="is_enabled"
                  checked={editingSection.is_enabled}
                  onCheckedChange={(checked) =>
                    setEditingSection({ ...editingSection, is_enabled: checked })
                  }
                />
                <Label htmlFor="is_enabled">Section activée</Label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingSection(null);
                    setIsNewSection(false);
                  }}
                >
                  Annuler
                </Button>
                <Button onClick={handleSaveSection} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
