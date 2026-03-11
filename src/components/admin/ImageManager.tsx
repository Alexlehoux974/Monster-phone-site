'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, GripVertical, Plus, Link as LinkIcon } from 'lucide-react';
import { getWorkingImageUrl } from '@/lib/image-utils';
import CloudinaryUploadButton from './CloudinaryUploadButton';

interface ImageManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
  maxImages?: number;
  multiple?: boolean;
}

function extractCloudinaryId(input: string): string {
  const trimmed = input.trim();
  // If it's a full Cloudinary URL, extract the public_id
  const match = trimmed.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w{3,4})?$/);
  if (match) return match[1];
  // Otherwise return as-is (already an ID)
  return trimmed;
}

export default function ImageManager({
  images,
  onChange,
  folder = 'products',
  maxImages,
  multiple = true,
}: ImageManagerProps) {
  const [showPasteInput, setShowPasteInput] = useState(false);
  const [pasteValue, setPasteValue] = useState('');
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  const canAddMore = !maxImages || images.length < maxImages;

  const handleUpload = (publicId: string) => {
    if (maxImages && images.length >= maxImages) return;
    onChange([...images, publicId]);
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handlePaste = () => {
    if (!pasteValue.trim()) return;
    const id = extractCloudinaryId(pasteValue);
    if (id) {
      onChange([...images, id]);
      setPasteValue('');
      setShowPasteInput(false);
    }
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOver.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOver.current === null) return;
    if (dragItem.current === dragOver.current) {
      dragItem.current = null;
      dragOver.current = null;
      return;
    }

    const reordered = [...images];
    const [moved] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOver.current, 0, moved);
    onChange(reordered);

    dragItem.current = null;
    dragOver.current = null;
  };

  return (
    <div className="space-y-3">
      {/* Image thumbnails grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img, index) => (
            <div
              key={`${img}-${index}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className="relative group border-2 border-gray-200 rounded-lg overflow-hidden aspect-square bg-gray-50 cursor-grab active:cursor-grabbing hover:border-red-400 transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getWorkingImageUrl(img)}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-monster.svg';
                }}
              />

              {/* Order badge */}
              <span className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                {index + 1}
              </span>

              {/* Controls overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  className="bg-white/90 p-1.5 rounded-full shadow hover:bg-white cursor-grab"
                  title="Réordonner"
                >
                  <GripVertical className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="bg-red-500/90 p-1.5 rounded-full shadow hover:bg-red-600 text-white"
                  title="Supprimer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      {canAddMore && (
        <div className="flex flex-wrap gap-2">
          <CloudinaryUploadButton
            onUpload={handleUpload}
            folder={folder}
            multiple={multiple && (!maxImages || maxImages > 1)}
            label="Upload image"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowPasteInput(!showPasteInput)}
            className="gap-2"
          >
            <LinkIcon className="h-4 w-4" />
            Coller un ID
          </Button>
        </div>
      )}

      {/* Paste input */}
      {showPasteInput && canAddMore && (
        <div className="flex gap-2">
          <Input
            value={pasteValue}
            onChange={(e) => setPasteValue(e.target.value)}
            placeholder="Cloudinary ID ou URL complète..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handlePaste();
              }
            }}
          />
          <Button type="button" size="sm" onClick={handlePaste}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Info */}
      {maxImages && (
        <p className="text-xs text-gray-400">
          {images.length}/{maxImages} image{maxImages > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
