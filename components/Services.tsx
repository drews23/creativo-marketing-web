'use client'

import { useEffect, useRef, useState } from 'react'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Experiencia y conocimiento',
    description: 'Contamos con un equipo de profesionales altamente cualificados con amplia experiencia en el sector.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Precios competitivos',
    description: 'Te ofrecemos la mejor relación calidad-precio del mercado.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Capacitación para que tomes el control',
    description: 'Te brindamos una completa capacitación para que puedas administrar tu sitio web con total autonomía.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Garantizamos tu satisfacción',
    description: 'Te garantizamos que estarás satisfecho con tu sitio web o te devolvemos tu dinero.',
  },
]

const stats = [
  { value: 50, suffix: '+', label: 'Clientes' },
  { value: 200, suffix: '+', label: 'Proyectos' },
  { value: 11, suffix: '+', label: 'Años experiencia' },
  { value: 5, suffix: '', label: 'Países' },
]

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return { count, ref }
}

function StatItem({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useCountUp(stat.value)
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#00b9d5] mb-2 font-heading">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-[#8e8e8e] uppercase tracking-wider">{stat.label}</div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="servicios" className="bg-[#171819]">
      {/* ¿Por qué elegirnos? */}
      <div className="container-md py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-3xl md:text-4xl text-[#fcfcfc] mb-4">¿Por qué elegirnos?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#1b1c1d] border border-[#3c3e40] p-8 text-center hover:border-[#00b9d5] transition-colors group"
            >
              <div className="text-[#00b9d5] mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-[#fcfcfc] font-semibold mb-3 text-base font-heading">
                {service.title}
              </h3>
              <p className="text-sm text-[#8e8e8e] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats counters */}
      <div className="border-y border-[#3c3e40] bg-[#1b1c1d]">
        <div className="container-md py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem key={index} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
