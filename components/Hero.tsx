'use client'

import Link from 'next/link'
import Image from 'next/image'

const heroImage = 'https://creativomarketingdigital.com/wp-content/uploads/2024/02/Digital-Marketing-12-768x768.webp'

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
            <div className="flex gap-6 flex-wrap items-center">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 text-[#fcfcfc] hover:text-[#00b9d5] transition text-sm uppercase tracking-[0.14em] font-semibold"
              >
                Trabajemos juntos.
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/paquetes-de-marketing-digital" className="btn-primary">
                Ver servicios
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-full max-w-[520px] pl-6">
              <div className="absolute -top-6 right-8 w-72 h-72 bg-[#00b9d5]/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 left-8 w-64 h-64 bg-[#5271ff]/5 rounded-full blur-3xl" />
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-5xl text-[#fcfcfc]/35 font-heading">«</div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:flex">
                <span className="-rotate-90 origin-center whitespace-nowrap text-[10px] uppercase tracking-[0.55em] text-[#3c3e40] font-heading">
                  Estudio creativo de
                </span>
              </div>

              <div className="relative ml-6 overflow-visible">
                <div className="relative aspect-square overflow-hidden border border-[#3c3e40] bg-[#1b1c1d]">
                  <Image
                    src={heroImage}
                    alt="Estudio Creativo de Marketing Digital"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover opacity-90"
                  />
                </div>

                <div className="absolute -left-8 top-8 bg-[#fcfcfc] text-[#171819] px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                  <p className="text-3xl font-heading leading-none mb-1">25</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] leading-relaxed">Out of Box Idea</p>
                </div>

                <div className="absolute -right-6 bottom-12 bg-[#1b1c1d] border border-[#3c3e40] px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                  <p className="text-3xl font-heading text-[#00b9d5] leading-none mb-1">03</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#fcfcfc] leading-relaxed">Promotion</p>
                </div>

                <div className="absolute -bottom-10 left-10 bg-[#171819] border border-[#3c3e40] px-6 py-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#00b9d5] mb-2">Engagement</p>
                  <p className="text-sm text-[#8e8e8e] max-w-[180px]">Estrategias visuales y contenido para negocios que necesitan destacar.</p>
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
          <Link href="/paquetes-de-marketing-digital" className="btn-primary">
            Ver servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
