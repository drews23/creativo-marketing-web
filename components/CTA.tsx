export default function CTA() {
  return (
    <section className="py-20 md:py-32 bg-[#1b1c1d] text-[#fcfcfc] border-t border-[#3c3e40]">
      <div className="container-md text-center">
        <h2 className="heading-2 text-[#fcfcfc] mb-6">
          ¿Listo para impulsar tu negocio?
        </h2>
        <p className="text-xl mb-8 text-[#8e8e8e] max-w-2xl mx-auto">
          Agenda una consultoría gratis y descubre cómo podemos transformar tu presencia digital
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button className="btn-primary">
            Agendar Consulta
          </button>
          <a
            href="tel:+573166918444"
            className="btn-secondary"
          >
            +57 316 691 8444
          </a>
        </div>
      </div>
    </section>
  )
}
