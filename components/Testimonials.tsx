'use client';

import { useState, useEffect } from 'react';
import { getTestimonials } from '@/lib/firestore-queries';

const defaultTestimonials = [
  {
    id: 1,
    name: 'Walter Calvar',
    position: 'Gerente Comercial LATAM',
    company: 'Ovobrand S.A.',
    text: 'Cumplimiento, empatía y creatividad. He tenido la oportunidad de colaborar con el equipo de Estudio Creativo MD en varios proyectos y lo que más me ha impresionado es su capacidad para cumplir con los plazos establecidos y superar las expectativas del cliente. Su principal característica es el compromiso: siempre se esfuerzan por entregar resultados de alta calidad y en el tiempo acordado.',
    image: 'https://via.placeholder.com/80x80?text=Walter',
    rating: 5,
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data as any);
        }
      } catch (err) {
        console.error('Error cargando testimonios:', err);
        // Mantener testimonios por defecto si hay error
      }
    };

    loadTestimonials();
  }, []);

  return (
    <section className="py-20 md:py-32 bg-[#171819] border-t border-[#3c3e40]">
      <div className="container-md">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4 text-[#fcfcfc]">Lo que dicen nuestros clientes</h2>
          <p className="text-xl text-[#8e8e8e]">Más de 11 años transformando empresas digitalmente</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#1b1c1d] p-8 border border-[#3c3e40] hover:border-[#00b9d5] transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-[#fcfcfc]">{testimonial.name}</h3>
                  <p className="text-sm text-[#8e8e8e]">{testimonial.position}</p>
                  <p className="text-xs text-[#808080]">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-[#8e8e8e] italic mb-6 line-clamp-4">{testimonial.text}</p>
              <div className="flex gap-1">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <span key={i} className="text-[#00b9d5]">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
