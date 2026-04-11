'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPosts } from '@/lib/firestore-queries';
import { PostSkeleton } from '@/components/Skeletons';

const categories = ['Todos', 'Redes Sociales', 'Diseño Web', 'Branding', 'Email Marketing', 'Tienda Digital'];

const defaultProjects = [
  {
    id: 1,
    title: 'Paisas Twin Westheimer',
    category: 'Redes Sociales',
    description: 'Estrategia integral de redes sociales para restaurante colombiano en Houston, TX.',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2024/02/Digital-Marketing-12-768x768.webp',
    slug: 'paisas-twin-westheimer',
  },
  {
    id: 2,
    title: 'Factor X Company: Estrategia de Contenido y Crecimiento Digital',
    category: 'Redes Sociales',
    description: 'Estrategia de Contenido y Crecimiento Digital para empresa de consultoría.',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2024/02/Digital-Marketing-12-768x768.webp',
    slug: 'factor-x-company',
  },
  {
    id: 3,
    title: 'SamSam Restaurante',
    categories: ['Publicidad e Impresiones', 'Redes Sociales'],
    category: 'Redes Sociales',
    description: 'Gestión de redes sociales y publicidad para restaurante.',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2024/02/Digital-Marketing-12-768x768.webp',
    slug: 'samsam-redes-sociales',
  },
  {
    id: 4,
    title: 'Vive Esports',
    categories: ['Diseño Web', 'Email Marketing'],
    category: 'Diseño Web',
    description: 'Diseño Web y estrategia de Email Marketing para plataforma de esports.',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2024/02/Digital-Marketing-12-768x768.webp',
    slug: 'vive-esports',
  },
  {
    id: 5,
    title: 'Fe y Sabiduría',
    category: 'Diseño Web',
    description: 'Diseño web profesional para organización religiosa.',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2024/02/Digital-Marketing-12-768x768.webp',
    slug: 'fe-y-sabiduria',
  },
  {
    id: 6,
    title: 'Tienda Digital ABC Fitness',
    categories: ['Diseño Web', 'Tienda Digital'],
    category: 'Tienda Digital',
    description: 'E-commerce y Diseño Web para marca de fitness.',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2024/02/Digital-Marketing-12-768x768.webp',
    slug: 'tienda-digital-abcfitness',
  },
  {
    id: 7,
    title: 'Enterprise Esports',
    category: 'Diseño Web',
    description: 'Diseño web para organización de esports.',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2024/02/Digital-Marketing-12-768x768.webp',
    slug: 'enterprise-esports',
  },
  {
    id: 8,
    title: 'Rediseño web municipal | Concejo Municipal de Tuluá',
    categories: ['Branding', 'Diseño Web'],
    category: 'Branding',
    description: 'Rediseño web y branding institucional para entidad gubernamental.',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2024/02/Digital-Marketing-12-768x768.webp',
    slug: 'concejo-municipal-tulua-rediseno-web',
  },
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>(defaultProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('Todos');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const allPosts = await getPosts(50, 1);
        const portfolioItems = allPosts
          .filter((post: any) => post.category === 'portfolio' || post.type === 'portfolio')
          .map((post: any) => ({
            ...post,
            image: post.image || post.featured_image || defaultProjects[0].image,
          }));

        if (portfolioItems.length > 0) {
          setProjects(portfolioItems);
        }
      } catch (err) {
        console.error('Error cargando proyectos:', err);
        setError('No se pudieron cargar los proyectos');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter((project) => project.category === activeFilter || project.categories?.includes(activeFilter));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
        <section className="border-b border-[#3c3e40]">
          <div className="container-md py-16 md:py-24">
            <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
              Portfolio
            </p>
            <h1 className="heading-1 text-[#fcfcfc] mb-4">Hacemos Marketing Digital que funciona</h1>
            <p className="text-lg max-w-3xl leading-relaxed">
              Casos y proyectos donde combinamos branding, diseño web, contenido y estrategia para construir presencia digital más sólida.
            </p>
          </div>
        </section>

        <section className="container-md py-16 md:py-20">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-sm tracking-wider uppercase border transition-colors ${
                  activeFilter === category
                    ? 'bg-[#00b9d5] border-[#00b9d5] text-[#0f1011] font-bold'
                    : 'bg-transparent border-[#3c3e40] text-[#8e8e8e] hover:border-[#00b9d5] hover:text-[#00b9d5]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

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

          {!loading && !error && filteredProjects.length === 0 && (
            <div className="bg-[#1b1c1d] border border-[#3c3e40] p-8 text-center">
              <p>No hay proyectos disponibles aún.</p>
            </div>
          )}

          {!loading && !error && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <article
                  key={project.id || project.slug}
                  className="group bg-[#1b1c1d] border border-[#3c3e40] overflow-hidden hover:border-[#00b9d5] transition-colors"
                >
                  <Link href={`/portfolio/${project.slug}`} className="block">
                    <div className="relative h-56 overflow-hidden bg-[#202122]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        width={500}
                        height={320}
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-[#2c2c2c] text-[#00b9d5] text-[10px] mb-3 border border-[#3c3e40] tracking-wider uppercase">
                      {project.category || 'Proyecto'}
                    </span>
                    <h2 className="text-xl text-[#fcfcfc] font-heading mb-3 group-hover:text-[#00b9d5] transition-colors">
                      <Link href={`/portfolio/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    <p className="text-sm leading-relaxed mb-5 line-clamp-3">
                      {project.description || project.content_preview || 'Proyecto de marketing digital'}
                    </p>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-2 text-[#00b9d5] hover:text-[#00f8f5] text-sm font-semibold uppercase tracking-[0.12em]"
                    >
                      Ver proyecto
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
