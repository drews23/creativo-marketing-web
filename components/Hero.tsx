'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-[#171819] text-[#fcfcfc] overflow-hidden">
      {/* Main hero */}
      <div className="container-md py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-6 font-semibold">
              Estrategias claras. Resultados medibles. Procesos sin rodeos.
            </p>
            <h1 className="heading-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.05] text-[#fcfcfc]">
              Marketing digital que impulsa<br className="hidden sm:block" /> negocios reales
            </h1>
            <p className="text-base md:text-lg mb-8 text-[#8e8e8e] max-w-xl leading-relaxed">
              Diseño Web, Branding y Redes Sociales creados para atraer clientes, posicionarte mejor y aumentar tus ventas.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/contacto" className="btn-primary">
                Trabajemos juntos
              </Link>
              <Link href="/paquetes" className="btn-secondary">
                Ver Servicios
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#00b9d5]/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#5271ff]/5 rounded-full blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6 rounded-sm">
                    <div className="text-3xl font-bold text-[#00b9d5]">+50</div>
                    <div className="text-sm text-[#8e8e8e] mt-1">Clientes</div>
                  </div>
                  <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6 rounded-sm">
                    <div className="text-3xl font-bold text-[#00b9d5]">+200</div>
                    <div className="text-sm text-[#8e8e8e] mt-1">Proyectos</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6 rounded-sm">
                    <div className="text-3xl font-bold text-[#00b9d5]">+11</div>
                    <div className="text-sm text-[#8e8e8e] mt-1">Años experiencia</div>
                  </div>
                  <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6 rounded-sm">
                    <div className="text-3xl font-bold text-[#00b9d5]">5</div>
                    <div className="text-sm text-[#8e8e8e] mt-1">Países</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee engagement text */}
      <div className="border-y border-[#3c3e40] py-4 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="text-[#3c3e40] text-6xl md:text-8xl font-bold tracking-[0.3em] uppercase whitespace-nowrap mx-8 font-heading">
                E n g a g e m e n t
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Hero: "Hacemos Marketing Digital que funciona" */}
      <div className="container-md py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
            +11 Años de experiencia en Marketing Digital y Branding
          </p>
          <h2 className="heading-2 text-3xl md:text-4xl lg:text-5xl text-[#fcfcfc] mb-6">
            Hacemos Marketing Digital que funciona
          </h2>
          <p className="text-base md:text-lg text-[#8e8e8e] mb-8 leading-relaxed">
            Creamos marcas, webs y contenido que elevan tu presencia digital y generan confianza inmediata.
          </p>
          <Link href="/paquetes" className="btn-primary">
            Ver servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
