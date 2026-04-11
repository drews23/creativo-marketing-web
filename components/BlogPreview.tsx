'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/lib/firestore-queries'

const defaultPosts = [
  {
    id: 1,
    title: 'Estrategias de marketing en redes sociales | fin de año',
    slug: 'estrategias-de-marketing-en-redes-sociales',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2023/11/estrategias-marketing-digital-fin-de-ano.webp',
    categories: ['Blog', 'Estrategias de Marketing', 'Marketing Digital', 'Publicidad Online'],
    date: '1 de noviembre de 2024',
  },
  {
    id: 2,
    title: 'Actualizar WordPress ¿Por qué es vital mantener tu sitio web actualizado?',
    slug: 'actualizar-wordpress',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2024/11/actualizar-wordpress-.webp',
    categories: ['Blog', 'Marketing Digital'],
    date: '1 de noviembre de 2024',
  },
  {
    id: 3,
    title: 'Eleva tu presencia en YouTube con una plantilla de suscripción Dinámica – ¡Descarga Gratis!',
    slug: 'plantilla-gratis-after-effects-suscripcion-youtube',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2023/11/recordatorios-de-suscripcion-youtube.png.webp',
    categories: ['Blog', 'Plantillas After Effects', 'Recursos Visuales'],
    date: '28 de octubre de 2024',
  },
]

export default function BlogPreview() {
  const [posts, setPosts] = useState(defaultPosts)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts(12, 1)
        const blogPosts = data
          .filter((post: any) => post.category !== 'portfolio' && post.type !== 'portfolio')
          .slice(0, 3)
        if (blogPosts.length > 0) {
          setPosts(blogPosts.map((post: any) => ({
            ...post,
            image: post.image || post.featured_image || defaultPosts[0].image,
            categories: post.categories || [post.category || 'Blog'],
          })))
        }
      } catch (err) {
        console.error('Error cargando posts:', err)
      }
    }
    loadPosts()
  }, [])

  return (
    <section className="py-20 md:py-28 bg-[#171819] border-t border-[#3c3e40]">
      <div className="container-md">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
            Nuestro Blog
          </p>
          <h2 className="heading-2 text-3xl md:text-4xl text-[#fcfcfc] mb-4">
            Novedades y actualizaciones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.id || post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#1b1c1d] border border-[#3c3e40] overflow-hidden hover:border-[#00b9d5] transition-colors"
            >
              <div className="relative h-52 bg-[#202122] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  width={400}
                  height={208}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {(post.categories || []).slice(0, 2).map((cat, i) => (
                    <span
                      key={i}
                      className="text-[10px] tracking-wider uppercase text-[#00b9d5] bg-[#2c2c2c] px-2 py-1 border border-[#3c3e40]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#808080] mb-2">{post.date}</p>
                <h3 className="text-[#fcfcfc] font-semibold group-hover:text-[#00b9d5] transition line-clamp-2 text-base font-heading">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="btn-secondary">
            Ver Todos los Artículos
          </Link>
        </div>
      </div>
    </section>
  )
}
