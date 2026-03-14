export default function Hero() {
  return (
    <section className="py-20 md:py-32 bg-[#171819] text-[#fcfcfc] border-b border-[#3c3e40]">
      <div className="container-md">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.12em] uppercase text-[#00b9d5] mb-4">
            Estrategias claras. Resultados medibles. Procesos sin rodeos.
          </p>
          <h1 className="heading-1 text-5xl md:text-6xl mb-6 leading-tight text-[#fcfcfc]">
            Marketing digital que impulsa negocios reales
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[#8e8e8e] max-w-3xl">
            Creamos marcas, webs y contenido que elevan tu presencia digital y generan confianza inmediata. 
            Estrategia de agencia, agilidad freelance.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="btn-primary">
              Ver Servicios
            </button>
            <button className="btn-secondary">
              Agendar Consulta
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
