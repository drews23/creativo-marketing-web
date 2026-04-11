'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert('¡Gracias por suscribirte!')
      setEmail('')
    }
  }

  return (
    <footer className="bg-[#171819] text-[#8e8e8e] border-t border-[#3c3e40]">
      {/* Top tagline */}
      <div className="container-md pt-16 pb-4">
        <h3 className="text-2xl md:text-3xl text-[#fcfcfc] font-semibold font-heading">
          Estrategia de agencia, agilidad freelance.
        </h3>
      </div>

      <div className="container-md py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Oficina */}
          <div>
            <h4 className="text-[#fcfcfc] font-semibold mb-4 text-sm tracking-wider uppercase">Oficina</h4>
            <p className="text-sm mb-3 leading-relaxed">
              Colombia — Cl 47 # 7-53, Marly, Bogotá, D.C.
            </p>
            <a href="mailto:estudio@creativomarketingdigital.com" className="text-sm hover:text-[#00b9d5] transition block mb-2">
              estudio@creativomarketingdigital.com
            </a>
            <a href="tel:+573166918444" className="text-sm hover:text-[#00b9d5] transition block">
              +57 316 691 8444
            </a>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-[#fcfcfc] font-semibold mb-4 text-sm tracking-wider uppercase">Menú</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-[#00b9d5] transition">Inicio</Link></li>
              <li><Link href="/paquetes-de-marketing-digital" className="hover:text-[#00b9d5] transition">Paquetes</Link></li>
              <li><Link href="/estudio-creativo-marketing-digital" className="hover:text-[#00b9d5] transition">Acerca de MD</Link></li>
              <li><Link href="/tienda" className="hover:text-[#00b9d5] transition">Tienda</Link></li>
              <li><Link href="/contacto" className="hover:text-[#00b9d5] transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[#fcfcfc] font-semibold mb-4 text-sm tracking-wider uppercase">Sé el primero en enterarte</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field text-sm"
                required
              />
              <button type="submit" className="btn-primary text-sm">
                Enviar
              </button>
            </form>
            <div className="mt-6">
              <h4 className="text-[#fcfcfc] font-semibold mb-3 text-sm tracking-wider uppercase">Redes sociales</h4>
              <div className="flex gap-3">
                <a
                  href="https://web.facebook.com/studiocreativomd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[#3c3e40] flex items-center justify-center text-[#8e8e8e] hover:text-[#00b9d5] hover:border-[#00b9d5] transition"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a
                  href="https://www.instagram.com/studiocreativomd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[#3c3e40] flex items-center justify-center text-[#8e8e8e] hover:text-[#00b9d5] hover:border-[#00b9d5] transition"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Escríbenos */}
          <div>
            <h4 className="text-[#fcfcfc] font-semibold mb-4 text-sm tracking-wider uppercase">Escríbenos</h4>
            <a href="mailto:estudio@creativomarketingdigital.com" className="text-sm hover:text-[#00b9d5] transition">
              estudio@creativomarketingdigital.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#3c3e40]">
        <div className="container-md py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://creativomarketingdigital.com/wp-content/uploads/2024/02/marketing-digital-md-estudio.svg"
                alt="Estudio Creativo de Marketing Digital"
                className="h-8 w-auto opacity-60"
                width={120}
                height={32}
              />
              <p className="text-sm">
                Estudio Creativo MD © {currentYear}. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://web.facebook.com/studiocreativomd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-[#00b9d5] transition"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/studiocreativomd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-[#00b9d5] transition"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
