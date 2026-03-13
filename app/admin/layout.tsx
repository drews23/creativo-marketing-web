import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-gray-950 border-r border-gray-800 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-400">🔐 Admin</h1>
          <p className="text-xs text-gray-500 mt-1">Estudio Creativo</p>
        </div>

        <nav className="space-y-4">
          <Link
            href="/admin/dashboard"
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
          >
            📊 Dashboard
          </Link>
          <Link
            href="/admin/posts"
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
          >
            📝 Posts
          </Link>
          <Link
            href="/admin/pages"
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
          >
            📄 Páginas
          </Link>
          <Link
            href="/admin/testimonials"
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
          >
            ⭐ Testimonios
          </Link>
          <Link
            href="/admin/images"
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
          >
            🖼️ Imágenes
          </Link>
          <Link
            href="/admin/messages"
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
          >
            💬 Mensajes
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link
            href="/"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-center text-sm"
          >
            ← Volver al sitio
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
