import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const products = [
  {
    title: 'Paquete Emprendedor Avanzado',
    price: '$2,347,500.00',
    category: 'Emprendedor',
    description: 'Una propuesta más completa para marcas que necesitan identidad, piezas, estructura y acompañamiento estratégico.',
  },
  {
    title: 'Paquete Emprendedor Flex',
    price: '$1,797,500.00',
    category: 'Emprendedor',
    description: 'Un paquete intermedio para negocios que necesitan presencia digital clara, adaptable y con mejor presentación comercial.',
  },
  {
    title: 'Paquete Emprendedor Inicial',
    price: '$847,500.00',
    category: 'Emprendedor',
    description: 'La base mínima para comenzar a comunicar mejor tu marca y organizar tus primeros activos digitales.',
  },
]

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#171819] text-[#8e8e8e]">
        <section className="border-b border-[#3c3e40]">
          <div className="container-md py-16 md:py-24">
            <p className="text-xs tracking-[0.2em] uppercase text-[#00b9d5] mb-4 font-semibold">
              Tienda
            </p>
            <h1 className="heading-1 text-[#fcfcfc] mb-4">Recursos y paquetes para emprendedores</h1>
            <p className="text-lg max-w-3xl leading-relaxed">
              Una selección inicial de soluciones para marcas que necesitan avanzar con más claridad en identidad, web y presencia digital.
            </p>
          </div>
        </section>

        <section className="container-md py-16 md:py-20">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            <div>
              <div className="flex items-center justify-between gap-4 mb-8 text-sm">
                <p>Mostrando los {products.length} resultados</p>
                <p className="uppercase tracking-[0.12em] text-[#808080]">Ordenado por los últimos</p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <article key={product.title} className="bg-[#1b1c1d] border border-[#3c3e40] p-6 hover:border-[#00b9d5] transition-colors">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#00b9d5] mb-3">{product.category}</p>
                    <h2 className="heading-3 text-[#fcfcfc] mb-3">{product.title}</h2>
                    <p className="text-2xl text-[#00b9d5] font-heading mb-4">{product.price}</p>
                    <p className="text-sm leading-relaxed mb-6">{product.description}</p>
                    <Link href="/contacto" className="btn-secondary inline-flex w-full justify-center">Consultar</Link>
                  </article>
                ))}
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6">
                <h3 className="text-[#fcfcfc] font-heading text-lg mb-3">Carpeta</h3>
                <p className="text-sm">No hay productos en el carrito.</p>
              </div>

              <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6">
                <h3 className="text-[#fcfcfc] font-heading text-lg mb-3">Buscar</h3>
                <input type="text" placeholder="Buscar en" className="input-field" />
              </div>

              <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6">
                <h3 className="text-[#fcfcfc] font-heading text-lg mb-3">Categorías</h3>
                <ul className="space-y-2 text-sm">
                  <li>Emprendedor</li>
                  <li>Sin categorizar</li>
                </ul>
              </div>

              <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6">
                <h3 className="text-[#fcfcfc] font-heading text-lg mb-3">Filtrar</h3>
                <p className="text-sm">Precio: $847,500 — $2,347,500</p>
              </div>

              <div className="bg-[#1b1c1d] border border-[#3c3e40] p-6">
                <h3 className="text-[#fcfcfc] font-heading text-lg mb-3">Etiquetas</h3>
                <p className="text-sm">Emprendimiento (3 productos)</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}