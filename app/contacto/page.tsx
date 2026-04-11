'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Implementar envío de formulario a través de API
      console.log('Formulario:', formData)
      alert('¡Mensaje enviado! Nos pondremos en contacto pronto.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      alert('Error al enviar. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
        <section className="border-b border-[#3c3e40]">
          <div className="container-md py-16 md:py-24">
            <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
              Contáctanos
            </p>
            <h1 className="heading-1 mb-4 text-[#fcfcfc]">¿Tiene alguna pregunta? Póngase en contacto con nosotros.</h1>
            <p className="text-lg text-[#8e8e8e] max-w-3xl leading-relaxed">
              Contáctanos ahora mismo y descubre cómo nuestros paquetes pueden ayudarte a alcanzar tus objetivos comerciales.
            </p>
          </div>
        </section>

        <section className="container-md py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#1b1c1d] border border-[#3c3e40] p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#00b9d5] mb-2">Oficina</p>
              <p className="text-sm leading-relaxed">Cl 47 # 7-53, Marly, Bogotá, D.C.</p>
            </div>
            <div className="bg-[#1b1c1d] border border-[#3c3e40] p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#00b9d5] mb-2">Teléfono</p>
              <a href="tel:+573166918444" className="text-sm hover:text-[#00b9d5] transition">+57 316 691 8444</a>
            </div>
            <div className="bg-[#1b1c1d] border border-[#3c3e40] p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#00b9d5] mb-2">Email</p>
              <a href="mailto:estudio@creativomarketingdigital.com" className="text-sm hover:text-[#00b9d5] transition break-all">estudio@creativomarketingdigital.com</a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
            <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#00b9d5] mb-2">¡Hablemos!</p>
                  <h2 className="heading-3 text-[#fcfcfc]">Paso 1 de 4</h2>
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#808080]">Formulario</div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Asunto"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Mensaje"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center inline-flex"
                >
                  {loading ? 'Enviando...' : 'Siguiente'}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-[#3c3e40]">
                <h3 className="text-[#fcfcfc] font-heading text-lg mb-3">Redes Sociales</h3>
                <div className="flex gap-4 text-sm">
                  <a href="https://web.facebook.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b9d5] transition">Facebook</a>
                  <a href="https://www.instagram.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b9d5] transition">Instagram</a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1b1c1d] border border-[#3c3e40] p-4 md:p-5">
                <iframe
                  title="Mapa de Estudio Creativo de Marketing Digital"
                  src="https://maps.google.com/maps?q=Cl%2047%20%237-53%2C%20Marly%2C%20Bogot%C3%A1&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-[420px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6 md:p-8">
                <h3 className="heading-3 text-[#fcfcfc] mb-4">Información de contacto</h3>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p>Estamos ubicados en Marly, Bogotá, y trabajamos con marcas que necesitan claridad estratégica, identidad visual más sólida y una ejecución digital consistente.</p>
                  <p><span className="text-[#00b9d5] uppercase tracking-[0.14em] text-[10px] mr-2">Oficina</span>Cl 47 # 7-53, Marly, Bogotá, D.C.</p>
                  <p><span className="text-[#00b9d5] uppercase tracking-[0.14em] text-[10px] mr-2">Tel</span><a href="tel:+573166918444" className="hover:text-[#00b9d5] transition">+57 316 691 8444</a></p>
                  <p><span className="text-[#00b9d5] uppercase tracking-[0.14em] text-[10px] mr-2">Mail</span><a href="mailto:estudio@creativomarketingdigital.com" className="hover:text-[#00b9d5] transition">estudio@creativomarketingdigital.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
