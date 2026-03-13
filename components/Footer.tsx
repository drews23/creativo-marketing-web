import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-md py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Creativo MD</h3>
            <p className="text-sm">
              Estrategia de agencia, agilidad freelance. Más de 11 años transformando empresas digitalmente.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Diseño Web</Link></li>
              <li><Link href="#" className="hover:text-white transition">Redes Sociales</Link></li>
              <li><Link href="#" className="hover:text-white transition">Branding</Link></li>
              <li><Link href="#" className="hover:text-white transition">E-Commerce</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Acerca de</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition">Portfolio</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+573166918444" className="hover:text-white transition">
                  +57 316 691 8444
                </a>
              </li>
              <li>
                <a href="mailto:estudio@creativomarketingdigital.com" className="hover:text-white transition">
                  estudio@creativomarketingdigital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {currentYear} Estudio Creativo de Marketing Digital. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://facebook.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                Facebook
              </a>
              <a href="https://instagram.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
