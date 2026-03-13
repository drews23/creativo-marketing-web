'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate, truncate } from '@/lib/utils';
import { getPosts } from '@/lib/firestore-queries';
import { PostSkeleton } from '@/components/Skeletons';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts(12, 1);
        setPosts(data);
      } catch (err) {
        console.error('Error cargando posts:', err);
        setError('No se pudieron cargar los artículos');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container-md py-16">
        <h1 className="heading-1 mb-4">Blog de Marketing Digital</h1>
        <p className="text-xl text-gray-600 mb-12">
          Artículos, consejos y estrategias para impulsar tu negocio
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

        {!loading && !error && posts.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
            <p>No hay artículos disponibles aún.</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {post.category || 'Blog'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(post.date || new Date().toISOString())}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-blue-600">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {truncate(post.content || post.content_preview || 'Sin contenido', 150)}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    Leer más →
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
