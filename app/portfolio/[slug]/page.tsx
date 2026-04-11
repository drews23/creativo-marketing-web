'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostBySlug } from '@/lib/firestore-queries';
import { HeroSkeleton } from '@/components/Skeletons';

const fallbackImage = 'https://creativomarketingdigital.com/wp-content/uploads/2024/02/Digital-Marketing-12-768x768.webp';

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

  if (error || !project) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
          <div className="container-md py-16">
            <div className="bg-[#1b1c1d] border border-red-500/40 p-6 text-red-300 mb-6">
              {error || 'Proyecto no encontrado'}
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[#00b9d5] hover:text-[#00f8f5] font-semibold uppercase tracking-[0.12em]"
            >
              <span aria-hidden="true">←</span>
              Volver al portfolio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const image = project.image || project.featured_image || fallbackImage;
  const categories = project.categories || [project.category || 'Proyecto'];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
        <article>
          <header className="border-b border-[#3c3e40]">
            <div className="container-md py-16 md:py-20">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-[#00b9d5] hover:text-[#00f8f5] text-sm font-semibold uppercase tracking-[0.12em] mb-8"
              >
                <span aria-hidden="true">←</span>
                Volver al portfolio
              </Link>

              <div className="flex flex-wrap gap-3 mb-4">
                {categories.map((category: string) => (
                  <span
                    key={category}
                    className="text-[10px] tracking-wider uppercase text-[#00b9d5] bg-[#2c2c2c] px-3 py-1 border border-[#3c3e40]"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <h1 className="heading-1 text-[#fcfcfc] mb-4">{project.title}</h1>
            </div>
          </header>

          <div className="container-md py-12 md:py-16">
            <div className="relative h-[280px] md:h-[420px] overflow-hidden border border-[#3c3e40] bg-[#1b1c1d] mb-10">
              <Image
                src={image}
                alt={project.title}
                fill
                className="object-cover opacity-85"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>

            <div className="grid lg:grid-cols-[1.5fr_0.9fr] gap-8 items-start">
              <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6 md:p-10">
                <h2 className="heading-3 text-[#fcfcfc] mb-4">Descripción del Proyecto</h2>
                <div className="content-prose whitespace-pre-wrap">
                  <p>{project.content || project.content_preview || 'Descripción del proyecto disponible.'}</p>
                </div>

                <div className="mt-10 border-t border-[#3c3e40] pt-8">
                  <h3 className="heading-3 text-[#fcfcfc] mb-4">Resultados Alcanzados</h3>
                  <ul className="space-y-3 text-sm md:text-base">
                    <li className="flex gap-3"><span className="text-[#00b9d5]">✓</span><span>Estrategia digital implementada con enfoque en objetivos comerciales.</span></li>
                    <li className="flex gap-3"><span className="text-[#00b9d5]">✓</span><span>Mayor claridad de marca y mejor presentación visual en canales digitales.</span></li>
                    <li className="flex gap-3"><span className="text-[#00b9d5]">✓</span><span>Optimización de la presencia online para reforzar confianza inmediata.</span></li>
                    <li className="flex gap-3"><span className="text-[#00b9d5]">✓</span><span>Implementación alineada con la necesidad real del negocio.</span></li>
                  </ul>
                </div>
              </div>

              <aside className="bg-[#1b1c1d] border border-[#3c3e40] p-6 md:p-8 lg:sticky lg:top-24">
                <h3 className="heading-3 text-[#fcfcfc] mb-4">Información del Proyecto</h3>
                <ul className="space-y-5 text-sm">
                  <li>
                    <span className="block text-[#00b9d5] uppercase tracking-[0.14em] text-[10px] mb-1">Categoría</span>
                    <span>{project.category || 'Marketing Digital'}</span>
                  </li>
                  <li>
                    <span className="block text-[#00b9d5] uppercase tracking-[0.14em] text-[10px] mb-1">Estado</span>
                    <span>Completado</span>
                  </li>
                  <li>
                    <span className="block text-[#00b9d5] uppercase tracking-[0.14em] text-[10px] mb-1">Servicios</span>
                    <span>Estrategia, diseño e implementación digital</span>
                  </li>
                </ul>

                <div className="mt-8 pt-8 border-t border-[#3c3e40]">
                  <p className="text-sm mb-4">¿Te gustaría un proyecto similar?</p>
                  <Link href="/contacto" className="btn-primary inline-flex w-full justify-center">
                    Contáctanos
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
