'use client';

import { useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';

interface CloudinaryUploadButtonProps {
  onUpload: (publicId: string) => void;
  folder?: string;
  multiple?: boolean;
  label?: string;
}

export default function CloudinaryUploadButton({
  onUpload,
  folder = 'products',
  multiple = false,
  label = 'Upload image',
}: CloudinaryUploadButtonProps) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setLoading(true);

    try {
      const filesToUpload = multiple ? Array.from(files) : [files[0]];

      // Get token from localStorage and refresh if expired
      const storageKey = 'sb-nswlznqoadjffpxkagoz-auth-token';
      let storedSession = localStorage.getItem(storageKey);
      let sessionData = storedSession ? JSON.parse(storedSession) : null;

      if (sessionData) {
        const now = Math.floor(Date.now() / 1000);
        const expiresAt = sessionData.expires_at || 0;
        // Refresh if expired or expiring within 60 seconds
        if (expiresAt - now < 60 && sessionData.refresh_token) {
          try {
            const refreshRes = await fetch('/api/admin/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh_token: sessionData.refresh_token }),
            });
            if (refreshRes.ok) {
              const refreshData = await refreshRes.json();
              localStorage.setItem(storageKey, JSON.stringify(refreshData.session));
              sessionData = refreshData.session;
            }
          } catch {
            // Continue with existing token
          }
        }
      }

      const accessToken = sessionData?.access_token || null;

      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const headers: HeadersInit = {};
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const res = await fetch('/api/admin/cloudinary-upload', {
          method: 'POST',
          headers,
          body: formData,
          credentials: 'include',
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `Erreur upload: ${res.status}`);
        }

        const data = await res.json();
        onUpload(data.public_id);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert(`Erreur: ${err instanceof Error ? err.message : 'Upload impossible'}`);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [folder, multiple, onUpload]);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="gap-2"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {loading ? 'Upload en cours...' : label}
      </Button>
    </>
  );
}
