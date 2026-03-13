'use client';

import { useState, useEffect } from 'react';
import { getTestimonials } from '@/lib/firestore-queries';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface Testimonial {
  id?: string;
  name: string;
  position: string;
  company: string;
  text: string;
  rating: number;
  image?: string;
  createdAt?: any;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const initialFormState: Testimonial = {
    name: '',
    position: '',
    company: '',
    text: '',
    rating: 5,
    image: '',
  };

  const [formData, setFormData] = useState<Testimonial>(initialFormState);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error cargando testimonios:', error);
      toast.error('Error al cargar testimonios');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.text || !formData.company) {
      toast.error('Completa todos los campos requeridos');
      return;
    }

    try {
      setSubmitting(true);
      const now = Timestamp.now();

      if (editingId) {
        await updateDoc(doc(db, 'testimonials', editingId), {
          ...formData,
          updatedAt: now,
        });
        toast.success('Testimonio actualizado');
      } else {
        await addDoc(collection(db, 'testimonials'), {
          ...formData,
          createdAt: now,
        });
        toast.success('Testimonio creado');
      }

      setFormData(initialFormState);
      setEditingId(null);
      setShowForm(false);
      loadTestimonials();
    } catch (error) {
      console.error('Error guardando testimonio:', error);
      toast.error('Error al guardar el testimonio');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (testimonial: any) => {
    setFormData(testimonial);
    setEditingId(testimonial.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro?')) return;

    try {
      await deleteDoc(doc(db, 'testimonials', id));
      toast.success('Testimonio eliminado');
      loadTestimonials();
    } catch (error) {
      console.error('Error eliminando testimonio:', error);
      toast.error('Error al eliminar');
    }
  };

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">⭐ Gestión de Testimonios</h1>
          <p className="text-gray-400">Total: {testimonials.length} testimonios</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData(initialFormState);
          }}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold"
        >
          {showForm ? '✕ Cerrar' : '+ Nuevo Testimonio'}
        </button>
      </header>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-800 rounded-lg p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? 'Editar Testimonio' : 'Crear Nuevo Testimonio'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Nombre *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre del cliente"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Puesto *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Ej: Gerente de Marketing"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Empresa *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Nombre de la empresa"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Calificación</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 outline-none"
                >
                  <option value="5">★★★★★ (5 estrellas)</option>
                  <option value="4">★★★★☆ (4 estrellas)</option>
                  <option value="3">★★★☆☆ (3 estrellas)</option>
                  <option value="2">★★☆☆☆ (2 estrellas)</option>
                  <option value="1">★☆☆☆☆ (1 estrella)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Testimonio *</label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                placeholder="Escribe el testimonio aquí..."
                rows={6}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition font-semibold"
              >
                {submitting ? '...' : editingId ? 'Actualizar' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData(initialFormState);
                }}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Cargando...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <p className="text-gray-400">No hay testimonios aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">
                    {testimonial.position} @ {testimonial.company}
                  </p>
                  <div className="flex gap-1 my-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2 italic">
                    "{testimonial.text}"
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-sm rounded transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-sm rounded transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
