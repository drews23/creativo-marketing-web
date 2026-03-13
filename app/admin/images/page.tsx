'use client';

import { useState } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import toast from 'react-hot-toast';
import { deleteImage } from '@/lib/storage';

interface ImageItem {
  url: string;
  name: string;
  uploadedAt: string;
}

export default function AdminImages() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleImageUpload = (url: string) => {
    const imageItem: ImageItem = {
      url,
      name: url.split('/').pop()?.split('?')[0] || 'imagen',
      uploadedAt: new Date().toLocaleString('es-MX'),
    };

    setImages(prev => [imageItem, ...prev]);
    toast.success('Imagen subida exitosamente');
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success('URL copiada');
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDeleteImage = async (url: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) return;

    try {
      await deleteImage(url);
      setImages(prev => prev.filter(img => img.url !== url));
      toast.success('Imagen eliminada');
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar la imagen');
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🖼️ Gestión de Imágenes</h1>
        <p className="text-gray-400">Sube y gestiona las imágenes del sitio</p>
      </header>

      {/* Upload Section */}
      <div className="bg-gray-800 rounded-lg p-8 mb-8 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Subir Nueva Imagen</h2>
        <ImageUploader
          onUploadComplete={handleImageUpload}
          folder="general"
        />
      </div>

      {/* Info */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-300">
          💡 <strong>Tip:</strong> Las imágenes se suben a Firebase Storage. Puedes copiar la URL para usarla en posts o páginas.
        </p>
      </div>

      {/* Images List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Imágenes Subidas ({images.length})
        </h2>

        {images.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No hay imágenes aún</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map(image => (
              <div
                key={image.url}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition"
              >
                <div className="relative w-full h-48 bg-gray-900 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>

                <div className="p-4">
                  <p className="text-sm font-semibold truncate mb-2">{image.name}</p>
                  <p className="text-xs text-gray-500 mb-4">
                    {image.uploadedAt}
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleCopyUrl(image.url)}
                      className={`w-full py-2 px-3 rounded text-sm transition ${
                        copiedUrl === image.url
                          ? 'bg-green-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {copiedUrl === image.url ? '✓ Copiada' : '📋 Copiar URL'}
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.url)}
                      className="w-full py-2 px-3 bg-red-600 hover:bg-red-700 rounded text-sm transition"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
