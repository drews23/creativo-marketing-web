'use client';

export default function AdminMessages() {

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">💬 Mensajes de Contacto</h1>
      <p className="text-gray-400 mb-8">Recibe y gestiona mensajes de clientes</p>

      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        <div className="text-center py-12">
          <p className="text-2xl mb-4">📨</p>
          <p className="text-gray-300 font-semibold">Centro de mensajes próximamente</p>
          <p className="text-gray-500 text-sm mt-2">Los mensajes de contacto aparecerán aquí</p>
        </div>
      </div>
    </div>
  );
}
