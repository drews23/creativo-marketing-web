'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTestimonials } from '@/lib/firestore-queries';

const defaultTestimonials = [
  {
    id: 1,
    name: 'Walter Calvar',
    position: 'Gerente Comercial LATAM',
    company: 'Ovobrand S.A.',
    text: 'He tenido la oportunidad de colaborar con el equipo de Estudio Creativo MD en varios proyectos y lo que más me ha impresionado es su capacidad para cumplir con los plazos establecidos y superar las expectativas del cliente. Su principal característica es el compromiso: siempre se esfuerzan por entregar resultados de alta calidad y en el tiempo acordado. Además, se toman el tiempo para comprender las necesidades del cliente y ponerse en su lugar, lo que les permite ofrecer soluciones creativas y efectivas.',
    image: 'https://creativomarketingdigital.com/wp-content/uploads/2024/04/walter-700x700.webp',
    headline: 'Cumplimiento, empatía y creatividad',
    rating: 5,
  },
];

const stats = [
  { label: 'Clientes', value: '50+' },
  { label: 'Proyectos', value: '200+' },
  { label: 'Años experiencia', value: '11+' },
  { label: 'Países', value: '5' },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data as any);
        }
      } catch (err) {
        console.error('Error cargando testimonios:', err);
      }
    };

    loadTestimonials();
  }, []);

  const activeTestimonial = testimonials[activeIndex] || testimonials[0];

  return (
    <section className="py-20 md:py-28 bg-[#1b1c1d] border-t border-[#3c3e40]">
      <div className="container-md">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
            Lo que dicen
          </p>
          <h2 className="heading-2 text-3xl md:text-4xl text-[#fcfcfc]">
            Nuestros Clientes
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            {/* Quote headline */}
            <h3 className="text-2xl md:text-3xl text-[#fcfcfc] italic mb-8 font-heading">
              &ldquo;{(activeTestimonial as any).headline || 'Cumplimiento, empatía y creatividad'}&rdquo;
            </h3>

            {/* Quote text */}
            <p className="text-[#8e8e8e] text-base md:text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
              {activeTestimonial.text}
            </p>

            {/* Author */}
            <div className="flex flex-col items-center gap-4">
              <Image
                src={activeTestimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeTestimonial.name)}&background=00b9d5&color=fff&size=100`}
                alt={activeTestimonial.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#00b9d5]"
                width={80}
                height={80}
              />
              <div className="text-center">
                <h4 className="text-[#fcfcfc] font-semibold text-lg">{activeTestimonial.name}</h4>
                <p className="text-sm text-[#8e8e8e]">{activeTestimonial.position}</p>
                <p className="text-xs text-[#808080]">{activeTestimonial.company}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                  <span key={i} className="text-[#00b9d5] text-lg">★</span>
                ))}
              </div>
            </div>

            {/* Dots navigation */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-[#00b9d5]' : 'bg-[#3c3e40] hover:bg-[#00b9d5]/50'
                    }`}
                    aria-label={`Testimonio ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-[#3c3e40]">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#00b9d5] mb-2 font-heading">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#8e8e8e] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
