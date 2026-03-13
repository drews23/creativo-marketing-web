import type { Metadata } from 'next'
import './globals.css'
import { ClientToaster } from '@/components/ClientToaster'

export const metadata: Metadata = {
  title: 'Estudio Creativo de Marketing Digital',
  description: 'Diseño Web, Branding y Redes Sociales creados para atraer clientes, posicionarte mejor y aumentar tus ventas.',
  keywords: 'marketing digital, diseño web, branding, redes sociales, agencia de marketing',
  authors: [{ name: 'Estudio Creativo MD' }],
  openGraph: {
    title: 'Estudio Creativo de Marketing Digital',
    description: 'Estrategia de agencia, agilidad freelance.',
    url: 'https://creativomarketingdigital.com',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <ClientToaster />
      </body>
    </html>
  )
}
