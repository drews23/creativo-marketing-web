'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // En producción, esto sería validado en el servidor
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
      
      if (password === adminPassword) {
        // Guardar token en localStorage (en producción uses sesiones)
        localStorage.setItem('adminToken', 'true');
        toast.success('¡Bienvenido!');
        router.push('/admin/dashboard');
      } else {
        toast.error('Contraseña incorrecta');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-400 mb-2">🔐 Admin</h1>
            <p className="text-gray-400">Estudio Creativo MD</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 Para demo, usa: admin123
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition"
            >
              {loading ? '...' : 'Acceder'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <a
              href="/"
              className="text-gray-400 hover:text-gray-300 transition text-sm"
            >
              ← Volver al sitio
            </a>
          </div>
        </div>

        <div className="mt-6 bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400">
            <strong>Nota:</strong> Esta es una demostración. En producción, usar OAuth o autenticación más robusta.
          </p>
        </div>
      </div>
    </div>
  );
}
