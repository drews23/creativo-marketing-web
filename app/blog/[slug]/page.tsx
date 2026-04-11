'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatDate } from '@/lib/utils';
import { getPostBySlug } from '@/lib/firestore-queries';
import { HeroSkeleton } from '@/components/Skeletons';

const fallbackImageBySlug: Record<string, string> = {
  'estrategias-de-marketing-en-redes-sociales': 'https://creativomarketingdigital.com/wp-content/uploads/2023/11/estrategias-marketing-digital-fin-de-ano.webp',
  'actualizar-wordpress': 'https://creativomarketingdigital.com/wp-content/uploads/2024/11/actualizar-wordpress-.webp',
  'plantilla-gratis-after-effects-suscripcion-youtube': 'https://creativomarketingdigital.com/wp-content/uploads/2023/11/recordatorios-de-suscripcion-youtube.png.webp',
};

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
      <>
        <Header />
        <main className="min-h-screen bg-[#171819]">
          <div className="container-md py-16">
            <HeroSkeleton />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
          <div className="container-md py-16">
            <div className="bg-[#1b1c1d] border border-red-500/40 p-6 text-red-300 mb-6">
              {error || 'Artículo no encontrado'}
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#00b9d5] hover:text-[#00f8f5] font-semibold uppercase tracking-[0.12em]"
            >
              <span aria-hidden="true">←</span>
              Volver al blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const image = post.image || post.featured_image || fallbackImageBySlug[params.slug] || fallbackImageBySlug['estrategias-de-marketing-en-redes-sociales'];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
        <article>
          <header className="border-b border-[#3c3e40]">
            <div className="container-md py-16 md:py-20">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#00b9d5] hover:text-[#00f8f5] text-sm font-semibold uppercase tracking-[0.12em] mb-8"
              >
                <span aria-hidden="true">←</span>
                Volver al blog
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] tracking-wider uppercase text-[#00b9d5] bg-[#2c2c2c] px-3 py-1 border border-[#3c3e40]">
                  {post.category || 'Blog'}
                </span>
                <time className="text-xs text-[#808080]">
                  {formatDate(post.date || new Date().toISOString())}
                </time>
              </div>

              <h1 className="heading-1 text-[#fcfcfc] mb-4">{post.title}</h1>
              <p className="text-lg max-w-3xl">
                Por Estudio Creativo de Marketing Digital
              </p>
            </div>
          </header>

          <div className="container-md py-12 md:py-16">
            <div className="relative h-[280px] md:h-[420px] overflow-hidden border border-[#3c3e40] bg-[#1b1c1d] mb-10">
              <Image
                src={image}
                alt={post.title}
                fill
                className="object-cover opacity-85"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>

            <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6 md:p-10">
              {post.content ? (
                <div
                  className="content-prose whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="content-prose">
                  <p>{post.content_preview || 'Contenido no disponible.'}</p>
                </div>
              )}
            </div>

            <div className="mt-10 bg-[#1b1c1d] border border-[#3c3e40] p-6 md:p-8">
              <h2 className="heading-3 text-[#fcfcfc] mb-3">Sobre Estudio Creativo MD</h2>
              <p className="text-sm md:text-base leading-relaxed">
                Somos un estudio creativo de marketing digital enfocado en construir marcas más sólidas, sitios web más claros y contenidos que generen confianza inmediata.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
