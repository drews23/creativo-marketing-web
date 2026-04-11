import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-[#171819] border-t border-[#3c3e40]">
      <div className="container-md text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
          ¿Listo para empezar?
        </p>
        <h2 className="heading-2 text-3xl md:text-4xl lg:text-5xl text-[#fcfcfc] mb-6">
          ¿Listo para impulsar tu negocio?
        </h2>
        <p className="text-base md:text-lg mb-10 text-[#8e8e8e] max-w-2xl mx-auto leading-relaxed">
          Agenda una consultoría gratis y descubre cómo podemos transformar tu presencia digital.
          Estrategia de agencia, agilidad freelance.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/contacto" className="btn-primary">
            Trabajemos juntos
          </Link>
          <a
            href="tel:+573166918444"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            +57 316 691 8444
          </a>
        </div>
      </div>
    </section>
  )
}
