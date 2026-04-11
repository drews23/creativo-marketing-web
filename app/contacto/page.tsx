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
      <main className="min-h-screen bg-[#171819]">
        <div className="container-md py-16">
          <div className="max-w-4xl">
            <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
              Contáctanos
            </p>
            <h1 className="heading-1 mb-2 text-[#fcfcfc]">Contacto</h1>
            <p className="text-lg text-[#8e8e8e] mb-12">
              Cuéntanos cómo podemos ayudarte a impulsar tu negocio digital
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="btn-primary w-full"
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>

              <div className="bg-[#1b1c1d] p-8 border border-[#3c3e40]">
                <h3 className="heading-3 mb-6 text-[#fcfcfc]">Información de Contacto</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-[#fcfcfc] text-sm uppercase tracking-wider">Oficina</h4>
                    <p className="text-sm text-[#8e8e8e]">Colombia — Cl 47 # 7-53, Marly, Bogotá, D.C.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-[#fcfcfc] text-sm uppercase tracking-wider">Teléfono</h4>
                    <a href="tel:+573166918444" className="text-[#00b9d5] hover:text-[#00f8f5] transition">
                      +57 316 691 8444
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-[#fcfcfc] text-sm uppercase tracking-wider">Email</h4>
                    <a href="mailto:estudio@creativomarketingdigital.com" className="text-[#00b9d5] hover:text-[#00f8f5] transition">
                      estudio@creativomarketingdigital.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-[#fcfcfc] text-sm uppercase tracking-wider">Redes Sociales</h4>
                    <div className="flex gap-4">
                      <a href="https://web.facebook.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="text-[#00b9d5] hover:text-[#00f8f5] transition">
                        Facebook
                      </a>
                      <a href="https://www.instagram.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="text-[#00b9d5] hover:text-[#00f8f5] transition">
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
