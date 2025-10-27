'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Save, Trash2, Eye, EyeOff, GripVertical, Copy, X } from 'lucide-react';

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

  // Load product and sections
  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();

      // Load product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('id, name, brand:brands!inner(name)')
        .eq('id', productId)
        .single();

      if (productError || !productData) {
        toast.error('Produit non trouvé');
        router.push('/admin/stock');
        return;
      }

      setProduct({
        id: productData.id,
        name: productData.name,
        brand: Array.isArray(productData.brand) ? productData.brand[0]?.name || '' : (productData.brand as any)?.name || '',
      });

      // Load sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('product_content_sections')
        .select('*')
        .eq('product_id', productId)
        .order('display_order');

      if (sectionsError) {
        toast.error('Erreur lors du chargement des sections');
      } else {
        setSections(sectionsData || []);
      }

      setLoading(false);
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

  const handleSaveSection = async () => {
    if (!editingSection) return;

    setSaving(true);
    const supabase = createClient();

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
        // Insert new section
        const { data, error } = await supabase
          .from('product_content_sections')
          .insert(sectionData)
          .select()
          .single();

        if (error) throw error;

        setSections([...sections, data]);
        toast.success('Section ajoutée avec succès');
      } else {
        // Update existing section
        const { error } = await supabase
          .from('product_content_sections')
          .update(sectionData)
          .eq('id', editingSection.id);

        if (error) throw error;

        setSections(sections.map((s) => (s.id === editingSection.id ? editingSection : s)));
        toast.success('Section mise à jour avec succès');
      }

      setEditingSection(null);
      setIsNewSection(false);
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette section ?')) return;

    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('product_content_sections')
        .delete()
        .eq('id', sectionId);

      if (error) throw error;

      setSections(sections.filter((s) => s.id !== sectionId));
      toast.success('Section supprimée');
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleToggleEnabled = async (sectionId: string, enabled: boolean) => {
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('product_content_sections')
        .update({ is_enabled: enabled })
        .eq('id', sectionId);

      if (error) throw error;

      setSections(sections.map((s) => (s.id === sectionId ? { ...s, is_enabled: enabled } : s)));
      toast.success(enabled ? 'Section activée' : 'Section désactivée');
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

    const targetProductIds = targetProductsInput.split(',').map((id) => id.trim());

    const supabase = createClient();
    let successCount = 0;

    for (const targetId of targetProductIds) {
      try {
        const { data, error } = await supabase.rpc('duplicate_product_sections', {
          p_source_product_id: productId,
          p_target_product_id: targetId,
        });

        if (error) throw error;

        successCount++;
      } catch (error) {
        console.error(`Error duplicating to ${targetId}:`, error);
      }
    }

    toast.success(`Sections dupliquées vers ${successCount}/${targetProductIds.length} produits`);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
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
            <p className="text-sm text-gray-600 mt-2">
              ⚠️ Les types et structure doivent correspondre exactement à ProductContentCards.tsx
            </p>
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
              sections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
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
                    <div className="flex items-center gap-2">
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
            <h2 className="text-2xl font-bold mb-6">
              {isNewSection ? 'Nouvelle section' : 'Modifier la section'}
            </h2>

            <div className="space-y-6">
              {/* Section Type */}
              <div>
                <Label htmlFor="section_type">Type de section (EXACT selon ProductContentCards.tsx)</Label>
                <RadioGroup
                  value={editingSection.section_type}
                  onValueChange={(value) =>
                    setEditingSection({
                      ...editingSection,
                      section_type: value as ProductContentSection['section_type'],
                    })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image_gallery" id="type_image_gallery" />
                    <Label htmlFor="type_image_gallery">{sectionTypeLabels['image_gallery']}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="description_card" id="type_description_card" />
                    <Label htmlFor="type_description_card">{sectionTypeLabels['description_card']}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="specs_grid" id="type_specs_grid" />
                    <Label htmlFor="type_specs_grid">{sectionTypeLabels['specs_grid']}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="features_list" id="type_features_list" />
                    <Label htmlFor="type_features_list">{sectionTypeLabels['features_list']}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="engagement_card" id="type_engagement_card" />
                    <Label htmlFor="type_engagement_card">{sectionTypeLabels['engagement_card']}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="type_custom" />
                    <Label htmlFor="type_custom">{sectionTypeLabels['custom']}</Label>
                  </div>
                </RadioGroup>
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
                    <Button onClick={handleAddSpec} variant="outline" size="sm">
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
                    <Button onClick={handleAddFeature} variant="outline" size="sm">
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
