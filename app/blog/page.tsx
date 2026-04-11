'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatDate, truncate } from '@/lib/utils';
import { getPosts } from '@/lib/firestore-queries';
import { PostSkeleton } from '@/components/Skeletons';

const defaultPosts = [
  {
    id: 1,
    title: 'Estrategias de marketing en redes sociales | fin de año',
    slug: 'estrategias-de-marketing-en-redes-sociales',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2023/11/estrategias-marketing-digital-fin-de-ano.webp',
    category: 'Marketing Digital',
    content_preview: 'Acciones concretas para cerrar el año con campañas mejor enfocadas, audiencias más activas y una presencia digital más consistente.',
    date: '2024-11-01',
  },
  {
    id: 2,
    title: 'Actualizar WordPress ¿Por qué es vital mantener tu sitio web actualizado?',
    slug: 'actualizar-wordpress',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2024/11/actualizar-wordpress-.webp',
    category: 'Marketing Digital',
    content_preview: 'Qué riesgos evita una actualización oportuna y cómo mejora la seguridad, el rendimiento y la experiencia de tus usuarios.',
    date: '2024-11-01',
  },
  {
    id: 3,
    title: 'Eleva tu presencia en YouTube con una plantilla de suscripción Dinámica – ¡Descarga Gratis!',
    slug: 'plantilla-gratis-after-effects-suscripcion-youtube',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2023/11/recordatorios-de-suscripcion-youtube.png.webp',
    category: 'Recursos Visuales',
    content_preview: 'Una plantilla lista para usar que mejora la presentación visual de tu canal y fortalece tu identidad digital.',
    date: '2024-10-28',
  },
];

function getPreviewText(post: any) {
  const raw = String(post.content_preview || post.excerpt || post.content || 'Sin contenido');
  const plain = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return truncate(plain, 170);
}

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>(defaultPosts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts(24, 1);
        const blogPosts = data
          .filter((post: any) => post.category !== 'portfolio' && post.type !== 'portfolio')
          .map((post: any) => ({
            ...post,
            image: post.image || post.featured_image || defaultPosts[0].image,
          }));

        if (blogPosts.length > 0) {
          setPosts(blogPosts);
        }
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
    <>
      <Header />
      <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
        <section className="border-b border-[#3c3e40]">
          <div className="container-md py-16 md:py-24">
            <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
              Nuestro Blog
            </p>
            <h1 className="heading-1 text-[#fcfcfc] mb-4">Novedades y actualizaciones</h1>
            <p className="text-lg max-w-2xl leading-relaxed">
              Insights, creatividad y resultados en artículos sobre marketing digital, recursos visuales y estrategias para marcas que quieren crecer.
            </p>
          </div>
        </section>

        <section className="container-md py-16 md:py-20">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => <PostSkeleton key={item} />)}
            </div>
          )}

          {error && (
            <div className="bg-[#1b1c1d] border border-red-500/40 p-6 text-red-300">
              {error}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="bg-[#1b1c1d] border border-[#3c3e40] p-8 text-center">
              <p>No hay artículos disponibles aún.</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id || post.slug}
                  className="group bg-[#1b1c1d] border border-[#3c3e40] overflow-hidden hover:border-[#00b9d5] transition-colors"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-56 overflow-hidden bg-[#202122]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        width={500}
                        height={320}
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-[10px] tracking-wider uppercase text-[#00b9d5] bg-[#2c2c2c] px-3 py-1 border border-[#3c3e40]">
                        {post.category || 'Blog'}
                      </span>
                      <span className="text-xs text-[#808080]">
                        {formatDate(post.date || new Date().toISOString())}
                      </span>
                    </div>
                    <h2 className="text-xl text-[#fcfcfc] font-heading mb-3 group-hover:text-[#00b9d5] transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-sm leading-relaxed mb-5">
                      {getPreviewText(post)}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[#00b9d5] hover:text-[#00f8f5] text-sm font-semibold uppercase tracking-[0.12em]"
                    >
                      Leer más
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
