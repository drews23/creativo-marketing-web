import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#171819] text-[#8e8e8e] border-t border-[#3c3e40]">
      <div className="container-md py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-[#fcfcfc] font-bold text-lg mb-4">Creativo MD</h3>
            <p className="text-sm">
              Estrategia de agencia, agilidad freelance. Más de 11 años transformando empresas digitalmente.
            </p>
          </div>

          <div>
            <h4 className="text-[#fcfcfc] font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-[#00b9d5] transition">Diseño Web</Link></li>
              <li><Link href="#" className="hover:text-[#00b9d5] transition">Redes Sociales</Link></li>
              <li><Link href="#" className="hover:text-[#00b9d5] transition">Branding</Link></li>
              <li><Link href="#" className="hover:text-[#00b9d5] transition">E-Commerce</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#fcfcfc] font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-[#00b9d5] transition">Acerca de</Link></li>
              <li><Link href="/blog" className="hover:text-[#00b9d5] transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-[#00b9d5] transition">Portfolio</Link></li>
              <li><Link href="/contacto" className="hover:text-[#00b9d5] transition">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#fcfcfc] font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+573166918444" className="hover:text-[#00b9d5] transition">
                  +57 316 691 8444
                </a>
              </li>
              <li>
                <a href="mailto:estudio@creativomarketingdigital.com" className="hover:text-[#00b9d5] transition">
                  estudio@creativomarketingdigital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#3c3e40] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {currentYear} Estudio Creativo de Marketing Digital. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://facebook.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b9d5] transition">
                Facebook
              </a>
              <a href="https://instagram.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b9d5] transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
