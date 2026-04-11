import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import PackageInquiryForm from '@/components/PackageInquiryForm'

const packageCards = [
  {
    title: 'Paquetes Emprendedores',
    description: 'Ideal para marcas que necesitan estructura, identidad y un punto de partida digital claro.',
  },
  {
    title: 'Paquetes Sitios Web',
    description: 'Soluciones web enfocadas en presentación profesional, credibilidad y mejor conversión.',
  },
  {
    title: 'Paquetes de Branding',
    description: 'Sistemas visuales y conceptuales para marcas que quieren diferenciarse con claridad.',
  },
  {
    title: 'Paquetes Redes Sociales',
    description: 'Contenido, línea gráfica y estrategia para reforzar consistencia y atracción comercial.',
  },
  {
    title: 'Publicidad Online',
    description: 'Campañas digitales enfocadas en alcance, tráfico calificado y objetivos medibles.',
  },
  {
    title: 'Email Marketing',
    description: 'Automatizaciones y campañas para mantener relación, nutrir leads y activar ventas.',
  },
]

const faqs = [
  '¿Qué tipos de paquetes ofrece Estudio Creativo MD?',
  '¿Qué tipo de negocios se benefician de los paquetes de Estudio Creativo MD?',
  '¿Cómo puedo saber qué paquete es el adecuado para mi negocio?',
  '¿Cuáles son los beneficios de trabajar con Estudio Creativo MD?',
  '¿Puedo combinar varios paquetes según las necesidades de mi negocio?',
  '¿Cuánto tiempo lleva ver resultados tangibles de sus servicios?',
]

export default function PackagesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
        <section className="border-b border-[#3c3e40]">
          <div className="container-md py-16 md:py-24">
            <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
              Paquetes de marketing digital, publicidad y diseño gráfico
            </p>
            <h1 className="heading-1 text-[#fcfcfc] mb-4">Paquetes de Marketing Digital a tu Medida</h1>
            <p className="text-lg max-w-3xl leading-relaxed mb-10">
              Estrategias digitales adaptadas a tu presupuesto y necesidades empresariales, con enfoque claro en marca, posicionamiento y crecimiento sostenido.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {packageCards.map((item) => (
                <div key={item.title} className="bg-[#1b1c1d] border border-[#3c3e40] p-6 hover:border-[#00b9d5] transition-colors">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#00b9d5] mb-3">Paquete</p>
                  <h2 className="heading-3 text-[#fcfcfc] mb-3">{item.title}</h2>
                  <p className="text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contacto" className="btn-primary">Trabajemos juntos</Link>
              <a href="tel:+573166918444" className="btn-secondary">+57 316 691 8444</a>
            </div>
          </div>
        </section>

        <Services />
        <Testimonials />

        <section className="border-t border-[#3c3e40]">
          <div className="container-md py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">FAQs</p>
              <h2 className="heading-2 text-[#fcfcfc] mb-8">Preguntas frecuentes sobre los paquetes</h2>
            </div>

            <div className="grid gap-4">
              {faqs.map((question) => (
                <details key={question} className="bg-[#1b1c1d] border border-[#3c3e40] p-5 group">
                  <summary className="list-none cursor-pointer text-[#fcfcfc] font-heading text-lg flex items-center justify-between gap-4">
                    <span>{question}</span>
                    <span className="text-[#00b9d5] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm leading-relaxed mt-4">
                    Analizamos tu punto de partida, tus objetivos y tus recursos para proponerte una combinación realista, medible y alineada con tu negocio.
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#3c3e40] bg-[#171819]">
          <div className="container-md py-16 md:py-20">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
                  Estrategia de agencia, agilidad freelance.
                </p>
                <h2 className="heading-2 text-[#fcfcfc] mb-4">Diseñamos el paquete correcto para tu etapa actual</h2>
                <p className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                  No trabajamos con fórmulas rígidas. Ajustamos la mezcla entre contenido, branding, diseño web y pauta según el momento de tu marca.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6">
                    <h3 className="text-[#fcfcfc] font-heading text-lg mb-3">Oficina</h3>
                    <p className="text-sm leading-relaxed">Colombia — Cl 47 # 7-53, Marly, Bogotá, D.C.</p>
                    <a href="mailto:estudio@creativomarketingdigital.com" className="block mt-3 hover:text-[#00b9d5] transition">estudio@creativomarketingdigital.com</a>
                    <a href="tel:+573166918444" className="block mt-2 hover:text-[#00b9d5] transition">+57 316 691 8444</a>
                  </div>

                  <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6">
                    <h3 className="text-[#fcfcfc] font-heading text-lg mb-3">Links</h3>
                    <ul className="space-y-2 text-sm">
                      <li><Link href="/" className="hover:text-[#00b9d5] transition">Inicio</Link></li>
                      <li><Link href="/estudio-creativo-marketing-digital" className="hover:text-[#00b9d5] transition">Acerca de MD</Link></li>
                      <li><Link href="/blog" className="hover:text-[#00b9d5] transition">Blog</Link></li>
                      <li><Link href="/contacto" className="hover:text-[#00b9d5] transition">Contáctanos</Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              <PackageInquiryForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}