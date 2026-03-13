export default function Hero() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white">
      <div className="container-md">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Marketing digital que impulsa negocios reales
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Creamos marcas, webs y contenido que elevan tu presencia digital y generan confianza inmediata. 
            Estrategia de agencia, agilidad freelance.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Ver Servicios
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Agendar Consulta
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
