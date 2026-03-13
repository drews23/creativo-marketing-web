export default function CTA() {
  return (
    <section className="py-20 md:py-32 bg-blue-600 text-white">
      <div className="container-md text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          ¿Listo para impulsar tu negocio?
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Agenda una consultoría gratis y descubre cómo podemos transformar tu presencia digital
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Agendar Consulta
          </button>
          <a
            href="tel:+573166918444"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            +57 316 691 8444
          </a>
        </div>
      </div>
    </section>
  )
}
