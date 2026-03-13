'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts } from '@/lib/firestore-queries';
import { PostSkeleton } from '@/components/Skeletons';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        // Filtrar posts que sean del portfolio (categoría = "portfolio")
        const allPosts = await getPosts(50, 1);
        const portfolioItems = allPosts.filter(
          (post: any) => post.category === 'portfolio' || post.type === 'portfolio'
        );
        setProjects(portfolioItems.length > 0 ? portfolioItems : allPosts.slice(0, 6));
      } catch (err) {
        console.error('Error cargando proyectos:', err);
        setError('No se pudieron cargar los proyectos');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container-md py-16">
        <h1 className="heading-1 mb-4">Nuestro Portfolio</h1>
        <p className="text-xl text-gray-600 mb-12">
          Proyectos exitosos de marketing digital y diseño web
        </p>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <PostSkeleton key={i} />)}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
            <p>No hay proyectos disponibles aún.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <article
                key={project.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 h-48 flex items-center justify-center text-blue-300 text-4xl group-hover:from-blue-200 transition-colors">
                  📊
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      {project.category || 'Proyecto'}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600">
                    <Link href={`/portfolio/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.content_preview || project.content || 'Proyecto de marketing digital'}
                  </p>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-block text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    Ver proyecto →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
