'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/paquetes-de-marketing-digital', label: 'Paquetes' },
  { href: '/estudio-creativo-marketing-digital', label: 'Acerca de MD' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Floating contact bar */}
      <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3">
        <a
          href="https://web.facebook.com/studiocreativomd"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#1b1c1d] border border-[#3c3e40] flex items-center justify-center text-[#fcfcfc] hover:text-[#00b9d5] hover:border-[#00b9d5] transition"
          aria-label="Facebook"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
        </a>
        <a
          href="https://www.instagram.com/studiocreativomd"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#1b1c1d] border border-[#3c3e40] flex items-center justify-center text-[#fcfcfc] hover:text-[#00b9d5] hover:border-[#00b9d5] transition"
          aria-label="Instagram"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
      </div>

      <header className="sticky top-0 z-50 bg-[#171819]/95 border-b border-[#3c3e40] backdrop-blur-sm">
        <nav className="container-md flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="https://creativomarketingdigital.com/wp-content/uploads/2024/02/marketing-digital-md-estudio.svg"
              alt="Estudio Creativo de Marketing Digital"
              className="h-10 w-auto"
              width={150}
              height={40}
              priority
            />
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#fcfcfc] hover:text-[#00b9d5] transition text-sm tracking-[0.1em] uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a href="tel:+573166918444" className="btn-primary hidden md:inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            +57 316 691 8444
          </a>

          <button
            className="md:hidden text-[#fcfcfc] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#171819] border-t border-[#3c3e40] animate-fade-in">
            <div className="container-md py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#fcfcfc] hover:text-[#00b9d5] transition text-sm tracking-[0.1em] uppercase py-2 border-b border-[#3c3e40]/50"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a href="tel:+573166918444" className="btn-primary text-center mt-2">
                +57 316 691 8444
              </a>
              <div className="flex gap-4 justify-center mt-2">
                <a href="https://web.facebook.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="text-[#fcfcfc] hover:text-[#00b9d5]">Facebook</a>
                <a href="https://www.instagram.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="text-[#fcfcfc] hover:text-[#00b9d5]">Instagram</a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
