import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#171819]/95 border-b border-[#3c3e40] backdrop-blur-sm">
      <nav className="container-md flex items-center justify-between py-4">
        <Link href="/" className="flex items-center">
          <img
            src="https://creativomarketingdigital.com/wp-content/uploads/2024/02/marketing-digital-md-estudio.svg"
            alt="Estudio Creativo de Marketing Digital"
            className="h-10 w-auto"
          />
        </Link>
        <div className="hidden md:flex gap-8">
          <Link href="/" className="text-[#fcfcfc] hover:text-[#00b9d5] transition text-sm tracking-[0.1em] uppercase">Inicio</Link>
          <Link href="#portfolio" className="text-[#fcfcfc] hover:text-[#00b9d5] transition text-sm tracking-[0.1em] uppercase">Portfolio</Link>
          <Link href="#servicios" className="text-[#fcfcfc] hover:text-[#00b9d5] transition text-sm tracking-[0.1em] uppercase">Servicios</Link>
          <Link href="/blog" className="text-[#fcfcfc] hover:text-[#00b9d5] transition text-sm tracking-[0.1em] uppercase">Blog</Link>
          <Link href="/contacto" className="text-[#fcfcfc] hover:text-[#00b9d5] transition text-sm tracking-[0.1em] uppercase">Contacto</Link>
        </div>
        <button className="btn-primary hidden md:block">
          Consultoría Gratis
        </button>
        <button className="md:hidden text-[#fcfcfc]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
