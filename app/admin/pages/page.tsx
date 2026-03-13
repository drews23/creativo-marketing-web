'use client';

import { useState, useEffect } from 'react';
import { getPages } from '@/lib/firestore-queries';

export default function AdminPages() {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    const loadPages = async () => {
      try {
        const data = await getPages();
        setPages(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    loadPages();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">📄 Gestión de Páginas</h1>
      <p className="text-gray-400 mb-8">Total: {pages.length} páginas</p>

      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        <div className="text-center py-12">
          <p className="text-2xl mb-4">🏗️</p>
          <p className="text-gray-300 font-semibold">Gestión de páginas próximamente</p>
          <p className="text-gray-500 text-sm mt-2">Esta sección estará disponible en la próxima actualización</p>
        </div>
      </div>
    </div>
  );
}
