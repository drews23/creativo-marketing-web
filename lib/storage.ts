import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Sube una imagen a Firebase Storage y retorna la URL descargable
 */
export async function uploadImage(
  file: File,
  folder: string = 'posts'
): Promise<string> {
  try {
    if (!file.type.startsWith('image/')) {
      throw new Error('El archivo debe ser una imagen');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('La imagen no debe superar 5MB');
    }

    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.toLowerCase().replace(/\s+/g, '-')}`;
    const storagePath = `${folder}/${filename}`;
    
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file, {
      contentType: file.type,
    });

    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Error subiendo imagen:', error);
    throw error;
  }
}

/**
 * Elimina una imagen de Firebase Storage
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    const imagePath = imageUrl.split('/o/')[1]?.split('?')[0];
    if (!imagePath) {
      throw new Error('URL de imagen inválida');
    }

    const decodedPath = decodeURIComponent(imagePath);
    const imageRef = ref(storage, decodedPath);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error eliminando imagen:', error);
    throw error;
  }
}

/**
 * Comprime una imagen antes de subar (opcional)
 */
export function compressImage(
  file: File,
  callback: (compressedFile: File) => void,
  quality: number = 0.8
): void {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target?.result as string;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            callback(compressedFile);
          }
        },
        'image/jpeg',
        quality
      );
    };
  };
}
