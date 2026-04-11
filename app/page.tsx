import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import BlogPreview from '@/components/BlogPreview'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
      <Header />
      <Hero />
      <Portfolio />
      <Services />
      <Testimonials />
      <BlogPreview />
      <CTA />
      <Footer />
    </main>
  )
}
