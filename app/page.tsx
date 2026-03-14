import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
      <Header />
      <Hero />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
