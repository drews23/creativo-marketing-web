'use client';

import { useState, useEffect } from 'react';
import { countDocuments } from '@/lib/firestore-queries';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    posts: 0,
    pages: 0,
    testimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [postCount, pageCount, testimonialCount] = await Promise.all([
          countDocuments('posts'),
          countDocuments('pages'),
          countDocuments('testimonials'),
        ]);

        setStats({
          posts: postCount,
          pages: pageCount,
          testimonials: testimonialCount,
        });
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Bienvenido al panel de administración</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Posts Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-2">📝 Artículos</p>
              <p className="text-3xl font-bold">
                {loading ? '-' : stats.posts}
              </p>
            </div>
            <span className="text-5xl opacity-20">📝</span>
          </div>
        </div>

        {/* Pages Card */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-2">📄 Páginas</p>
              <p className="text-3xl font-bold">
                {loading ? '-' : stats.pages}
              </p>
            </div>
            <span className="text-5xl opacity-20">📄</span>
          </div>
        </div>

        {/* Testimonials Card */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-2">⭐ Testimonios</p>
              <p className="text-3xl font-bold">
                {loading ? '-' : stats.testimonials}
              </p>
            </div>
            <span className="text-5xl opacity-20">⭐</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/posts"
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-center"
          >
            ✏️ Crear Nuevo Post
          </a>
          <a
            href="/admin/images"
            className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition text-center"
          >
            🖼️ Subir Imagen
          </a>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-4">ℹ️ Información del Sitio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Nombre del Sitio</p>
            <p className="font-semibold">Estudio Creativo de Marketing Digital</p>
          </div>
          <div>
            <p className="text-gray-400">Proyecto Firebase</p>
            <p className="font-semibold">sitio-web-creativo-md</p>
          </div>
          <div>
            <p className="text-gray-400">Última Actualización</p>
            <p className="font-semibold">
              {new Date().toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Versión</p>
            <p className="font-semibold">6.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
