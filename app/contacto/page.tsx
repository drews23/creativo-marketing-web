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
      <main className="min-h-screen bg-gray-50">
        <div className="container-md py-16">
          <div className="max-w-2xl">
            <h1 className="heading-1 mb-2">Contacto</h1>
            <p className="text-xl text-gray-600 mb-12">
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

              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="heading-3 mb-6">Información de Contacto</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Teléfono</h4>
                    <a href="tel:+573166918444" className="text-blue-600 hover:underline">
                      +57 316 691 8444
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Email</h4>
                    <a href="mailto:estudio@creativomarketingdigital.com" className="text-blue-600 hover:underline">
                      estudio@creativomarketingdigital.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Redes Sociales</h4>
                    <div className="flex gap-4">
                      <a href="https://facebook.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Facebook
                      </a>
                      <a href="https://instagram.com/studiocreativomd" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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
