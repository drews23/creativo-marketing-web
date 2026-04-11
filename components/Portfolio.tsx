'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/firestore-queries';

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

export default function Portfolio() {
  const [projects, setProjects] = useState(defaultProjects);
  const [activeFilter, setActiveFilter] = useState('Todos');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allPosts = await getPosts(12, 1);
        const portfolioItems = allPosts
          .filter((post: any) => post.category === 'portfolio' || post.type === 'portfolio')
          .map((post: any) => ({
            ...post,
            image: post.image || post.featured_image || `https://creativomarketingdigital.com/wp-content/uploads/2024/02/Digital-Marketing-12-768x768.webp`,
          }));
        
        if (portfolioItems.length > 0) {
          setProjects(portfolioItems as any);
        }
      } catch (err) {
        console.error('Error cargando proyectos:', err);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeFilter || (p as any).categories?.includes(activeFilter));

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-[#171819] border-t border-[#3c3e40]">
      <div className="container-md">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
            Portfolio
          </p>
          <h2 className="heading-2 mb-4 text-[#fcfcfc]">Nuestros Proyectos</h2>
          <p className="text-base text-[#8e8e8e] max-w-2xl mx-auto">
            Hacemos Marketing Digital que funciona
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-sm tracking-wider uppercase border transition-colors ${
                activeFilter === cat
                  ? 'bg-[#00b9d5] border-[#00b9d5] text-[#0f1011] font-bold'
                  : 'bg-transparent border-[#3c3e40] text-[#8e8e8e] hover:border-[#00b9d5] hover:text-[#00b9d5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, 9).map((project) => (
            <Link
              key={project.id || project.slug}
              href={`/portfolio/${project.slug}`}
              className="group relative bg-[#1b1c1d] border border-[#3c3e40] overflow-hidden hover:border-[#00b9d5] transition-colors"
            >
              <div className="relative h-56 bg-[#202122] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  width={400}
                  height={224}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171819] via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-[#2c2c2c] text-[#00b9d5] text-xs mb-3 border border-[#3c3e40] tracking-wider uppercase">
                  {project.category || 'Proyecto'}
                </span>
                <h3 className="text-[#fcfcfc] font-semibold mb-2 group-hover:text-[#00b9d5] transition line-clamp-2 font-heading">
                  {project.title}
                </h3>
                <p className="text-[#8e8e8e] text-sm line-clamp-2">
                  {project.description || 'Proyecto de marketing digital'}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio" className="btn-secondary">
            Ver Todos los Proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
