import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container-md flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Creativo MD
        </Link>
        <div className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Inicio</Link>
          <Link href="#portfolio" className="text-gray-700 hover:text-blue-600 transition">Portfolio</Link>
          <Link href="#servicios" className="text-gray-700 hover:text-blue-600 transition">Servicios</Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition">Blog</Link>
          <Link href="/contacto" className="text-gray-700 hover:text-blue-600 transition">Contacto</Link>
        </div>
        <button className="btn-primary hidden md:block">
          Consultoría Gratis
        </button>
        <button className="md:hidden text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
