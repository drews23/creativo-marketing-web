'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPostBySlug } from '@/lib/firestore-queries';
import { HeroSkeleton } from '@/components/Skeletons';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const data = await getPostBySlug(params.slug);
        if (!data) {
          setError('Proyecto no encontrado');
        } else {
          setProject(data);
        }
      } catch (err) {
        console.error('Error cargando proyecto:', err);
        setError('Error al cargar el proyecto');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      loadProject();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container-md py-16">
          <HeroSkeleton />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container-md py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 mb-6">
            {error}
          </div>
          <Link
            href="/portfolio"
            className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Volver al portfolio
          </Link>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container-md py-16">
          <div className="text-gray-600 mb-6">
            Proyecto no encontrado
          </div>
          <Link
            href="/portfolio"
            className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Volver al portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="container-md py-16">
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="text-blue-600 hover:text-blue-800 font-semibold mb-6 inline-block"
          >
            ← Volver al portfolio
          </Link>
        </div>

        <header className="mb-12">
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 h-80 rounded-lg flex items-center justify-center text-orange-300 text-8xl mb-8">
            📊
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              {project.category || 'Proyecto'}
            </span>
          </div>
          <h1 className="heading-1 mb-4">{project.title}</h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Descripción del Proyecto</h2>
              <div className="prose prose-lg max-w-none">
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {project.content || project.content_preview || 'Descripción del proyecto disponible'}
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Resultados Alcanzados</h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">Estrategia de marketing digital implementada</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">Visibilidad en redes sociales aumentada</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">ROI positivo en primer mes de campaña</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">Cliente satisfecho con resultados</span>
                </li>
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-lg sticky top-24">
              <h3 className="text-xl font-bold mb-4">Información del Proyecto</h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <span className="font-semibold block text-blue-100">Categoría</span>
                  <span>{project.category || 'Marketing Digital'}</span>
                </li>
                <li>
                  <span className="font-semibold block text-blue-100">Estado</span>
                  <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs mt-1">
                    Completado
                  </span>
                </li>
                <li>
                  <span className="font-semibold block text-blue-100">Servicios</span>
                  <span>Estrategia, Diseño, Implementación</span>
                </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-blue-500">
                <p className="text-blue-100 text-sm mb-4">
                  ¿Te gustaría un proyecto similar?
                </p>
                <Link
                  href="/contacto"
                  className="inline-block w-full text-center bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Contáctanos
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
