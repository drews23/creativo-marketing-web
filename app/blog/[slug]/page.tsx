'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { getPostBySlug } from '@/lib/firestore-queries';
import { HeroSkeleton } from '@/components/Skeletons';

export default function PostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await getPostBySlug(params.slug);
        if (!data) {
          setError('Artículo no encontrado');
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error('Error cargando post:', err);
        setError('Error al cargar el artículo');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      loadPost();
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
            href="/blog"
            className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Volver al blog
          </Link>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container-md py-16">
          <div className="text-gray-600 mb-6">
            Artículo no encontrado
          </div>
          <Link
            href="/blog"
            className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Volver al blog
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
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-semibold mb-6 inline-block"
          >
            ← Volver al blog
          </Link>
        </div>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {post.category || 'Blog'}
            </span>
            <time className="text-sm text-gray-500">
              {formatDate(post.date || new Date().toISOString())}
            </time>
          </div>
          <h1 className="heading-1 mb-4">{post.title}</h1>
          <div className="text-gray-600 text-lg">
            Por Estudio Creativo de Marketing Digital
          </div>
        </header>

        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            {post.content ? (
              <div
                className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="text-gray-600">{post.content_preview}</p>
            )}
          </div>
        </div>

        <footer className="border-t border-gray-200 pt-8 mt-12">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Sobre Estudio Creativo</h3>
            <p className="text-gray-700 text-sm">
              Somos una agencia de marketing digital especializada en estrategias que transforman negocios.
              Combinamos creatividad, tecnología y datos para resultados excepcionales.
            </p>
          </div>
        </footer>
      </article>
    </main>
  );
}
