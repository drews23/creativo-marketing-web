import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogPreview from '@/components/BlogPreview'
import CTA from '@/components/CTA'

const focusAreas = [
  {
    title: 'Paquetes Emprendedores',
    description: 'Una base clara para salir al mercado con identidad, dirección visual y mensajes mejor estructurados.',
  },
  {
    title: 'Paquetes Sitios Web',
    description: 'Webs pensadas para presentar mejor tu negocio, reducir fricción y aumentar confianza inmediata.',
  },
  {
    title: 'Paquetes de Branding',
    description: 'Construcción de marcas más memorables a través de identidad, tono y sistema visual coherente.',
  },
  {
    title: 'Paquetes Redes Sociales',
    description: 'Planeación, diseño y contenido para sostener presencia y activar relación con tu audiencia.',
  },
]

const stats = [
  { label: 'Clientes', value: '50+' },
  { label: 'Proyectos', value: '200+' },
  { label: 'Años experiencia', value: '11+' },
  { label: 'Países', value: '5' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
        <section className="border-b border-[#3c3e40]">
          <div className="container-md py-16 md:py-24">
            <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
              Somos MD
            </p>
            <h1 className="heading-1 text-[#fcfcfc] mb-6">Insights, creatividad y resultados</h1>
            <div className="max-w-3xl space-y-5 text-base md:text-lg leading-relaxed">
              <p>
                Ubicados en el barrio San Felipe, Bogotá, somos un estudio creativo de marketing digital. Nuestro enfoque se centra en crear marcas sólidas y competitivas en el mundo digital mediante la combinación de insights, creatividad y estrategias personalizadas.
              </p>
              <p>
                Adaptamos cada proceso a las necesidades reales y al presupuesto de cada comercio para construir presencia digital con criterio, no por inercia.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/paquetes-de-marketing-digital" className="btn-primary">Ofrecemos paquetes de Marketing Digital</Link>
              <Link href="/contacto" className="btn-secondary">¡Hablemos!</Link>
            </div>
          </div>
        </section>

        <section className="container-md py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {focusAreas.map((item) => (
              <div key={item.title} className="bg-[#1b1c1d] border border-[#3c3e40] p-6 hover:border-[#00b9d5] transition-colors">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#00b9d5] mb-3">Enfoque</p>
                <h2 className="heading-3 text-[#fcfcfc] mb-3">{item.title}</h2>
                <p className="text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#3c3e40] bg-[#1b1c1d]">
          <div className="container-md py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#00b9d5] mb-2 font-heading">{stat.value}</div>
                  <div className="text-sm text-[#8e8e8e] uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BlogPreview />
        <CTA />
      </main>
      <Footer />
    </>
  )
}