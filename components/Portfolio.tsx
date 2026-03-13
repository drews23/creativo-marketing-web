'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts } from '@/lib/firestore-queries';

const defaultProjects = [
  {
    id: 1,
    title: 'Paisas Twin Westheimer',
    category: 'Redes Sociales',
    description: 'Estrategia integral de redes sociales',
    image: 'https://via.placeholder.com/300x200?text=Paisas+Twin',
    slug: 'paisas-twin-westheimer',
  },
  {
    id: 2,
    title: 'Factor X Company',
    category: 'Redes Sociales',
    description: 'Estrategia de Contenido y Crecimiento Digital',
    image: 'https://via.placeholder.com/300x200?text=Factor+X',
    slug: 'factor-x-company',
  },
  {
    id: 3,
    title: 'SamSam Restaurante',
    category: 'Redes Sociales',
    description: 'Publicidad e Impresiones',
    image: 'https://via.placeholder.com/300x200?text=SamSam',
    slug: 'samsam-restaurante',
  },
  {
    id: 4,
    title: 'Vive Esports',
    category: 'Diseño Web',
    description: 'Diseño Web y Email Marketing',
    image: 'https://via.placeholder.com/300x200?text=Vive+Esports',
    slug: 'vive-esports',
  },
  {
    id: 5,
    title: 'Fe y Sabiduría',
    category: 'Diseño Web',
    description: 'Diseño Web Profesional',
    image: 'https://via.placeholder.com/300x200?text=Fe+Sabiduria',
    slug: 'fe-sabiduria',
  },
  {
    id: 6,
    title: 'Tienda Digital ABC Fitness',
    category: 'Tienda Digital',
    description: 'E-commerce y Diseño Web',
    image: 'https://via.placeholder.com/300x200?text=ABC+Fitness',
    slug: 'tienda-digital-abc-fitness',
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allPosts = await getPosts(6, 1);
        const portfolioItems = allPosts
          .filter((post: any) => post.category === 'portfolio' || post.type === 'portfolio')
          .map((post: any) => ({
            ...post,
            image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(post.title)}`,
          }));
        
        if (portfolioItems.length > 0) {
          setProjects(portfolioItems);
        }
      } catch (err) {
        console.error('Error cargando proyectos:', err);
        // Mantener proyectos por defecto si hay error
      }
    };

    loadProjects();
  }, []);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-gray-50">
      <div className="container-md">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">Nuestros Proyectos</h2>
          <p className="text-xl text-gray-600">Hacemos Marketing Digital que funciona</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project) => (
            <Link
              key={project.id || project.slug}
              href={`/portfolio/${project.slug}`}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden flex items-center justify-center text-4xl text-blue-300">
                📊
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full mb-2">
                  {project.category || 'Proyecto'}
                </span>
                <h3 className="heading-3 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {project.description || (project as any).content_preview || 'Proyecto de marketing digital'}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio" className="btn-primary">
            Ver Todos los Proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
