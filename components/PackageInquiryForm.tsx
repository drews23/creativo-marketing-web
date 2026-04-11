'use client'

import { useState } from 'react'

const packageOptions = [
  'Paquetes Emprendedores',
  'Paquetes Sitios Web',
  'Paquetes de Branding',
  'Paquetes Redes Sociales',
  'Publicidad Online',
  'Email Marketing',
]

export default function PackageInquiryForm() {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    packageInterest: packageOptions[0],
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    alert('Gracias. Recibimos tu interés y te contactaremos pronto.')
    setFormData({ phone: '', email: '', packageInterest: packageOptions[0] })
  }

  return (
    <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6 md:p-8">
      <h3 className="heading-3 text-[#fcfcfc] mb-3">¿Te contactamos?</h3>
      <p className="text-sm leading-relaxed mb-6">
        Déjanos tus datos y el paquete que te interesa para orientarte según el momento de tu negocio.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="tel"
          placeholder="Tu Teléfono"
          value={formData.phone}
          onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
          className="input-field"
          required
        />
        <input
          type="email"
          placeholder="Tu Mail"
          value={formData.email}
          onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
          className="input-field"
          required
        />
        <select
          name="packageInterest"
          aria-label="Paquete de interés"
          value={formData.packageInterest}
          onChange={(event) => setFormData((current) => ({ ...current, packageInterest: event.target.value }))}
          className="input-field"
        >
          {packageOptions.map((option) => (
            <option key={option} value={option} className="bg-[#171819] text-[#fcfcfc]">
              {option}
            </option>
          ))}
        </select>

        <button type="submit" className="btn-primary w-full justify-center inline-flex">
          Enviar
        </button>
      </form>
    </div>
  )
}