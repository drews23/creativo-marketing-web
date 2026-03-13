'use client';

import { useState } from 'react';
import { uploadImage, compressImage } from '@/lib/storage';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  folder?: string;
  className?: string;
}

export function ImageUploader({
  onUploadComplete,
  folder = 'posts',
  className = '',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      // Simular progreso mientras se comprime
      setProgress(25);

      // Comprimir imagen
      compressImage(file, async (compressedFile) => {
        setProgress(50);

        // Subir imagen
        const url = await uploadImage(compressedFile, folder);
        setProgress(100);

        toast.success('Imagen subida exitosamente');
        onUploadComplete(url);

        // Reset
        if (e.target) e.target.value = '';
        setProgress(0);
      });
    } catch (error: any) {
      toast.error(error.message || 'Error al subir la imagen');
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
        id="image-input"
      />
      
      <label
        htmlFor="image-input"
        className={`cursor-pointer ${uploading ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <div className="text-4xl mb-3">📷</div>
        <p className="font-semibold text-gray-900 mb-1">
          {uploading ? 'Subiendo...' : 'Arrastra tu imagen aquí'}
        </p>
        <p className="text-sm text-gray-600">o haz clic para seleccionar</p>
        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF (máx. 5MB)</p>
      </label>

      {progress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">{progress}% completo</p>
        </div>
      )}
    </div>
  );
}
