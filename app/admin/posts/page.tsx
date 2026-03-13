'use client';

import { useState, useEffect } from 'react';
import { getPosts } from '@/lib/firestore-queries';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { ImageUploader } from '@/components/ImageUploader';
import toast from 'react-hot-toast';

interface Post {
  id?: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  published: boolean;
  image?: string;
  date?: string;
  createdAt?: any;
  updatedAt?: any;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const initialFormState: Post = {
    title: '',
    slug: '',
    content: '',
    category: 'blog',
    published: false,
    image: '',
  };

  const [formData, setFormData] = useState<Post>(initialFormState);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts(50, 1);
      setPosts(data);
    } catch (error) {
      console.error('Error cargando posts:', error);
      toast.error('Error al cargar posts');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      image: url,
    }));
    toast.success('Imagen cargada');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.content) {
      toast.error('Completa todos los campos requeridos');
      return;
    }

    try {
      setSubmitting(true);
      const now = Timestamp.now();

      if (editingId) {
        // Actualizar
        await updateDoc(doc(db, 'posts', editingId), {
          ...formData,
          updatedAt: now,
        });
        toast.success('Post actualizado');
      } else {
        // Crear nuevo
        await addDoc(collection(db, 'posts'), {
          ...formData,
          createdAt: now,
          updatedAt: now,
          published: formData.published,
          date: new Date().toISOString(),
        });
        toast.success('Post creado');
      }

      setFormData(initialFormState);
      setEditingId(null);
      setShowForm(false);
      loadPosts();
    } catch (error) {
      console.error('Error guardando post:', error);
      toast.error('Error al guardar el post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post: any) => {
    setFormData(post);
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return;

    try {
      await deleteDoc(doc(db, 'posts', id));
      toast.success('Post eliminado');
      loadPosts();
    } catch (error) {
      console.error('Error eliminando post:', error);
      toast.error('Error al eliminar el post');
    }
  };

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">📝 Gestión de Posts</h1>
          <p className="text-gray-400">Total: {posts.length} artículos</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData(initialFormState);
          }}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold"
        >
          {showForm ? '✕ Cerrar' : '+ Nuevo Post'}
        </button>
      </header>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-800 rounded-lg p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? 'Editar Post' : 'Crear Nuevo Post'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div>
              <label className="block text-sm font-semibold mb-2">Título *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Título del post"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold mb-2">Slug (URL) *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="url-amigable"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Se genera automáticamente desde el título</p>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-semibold mb-2">Categoría</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 outline-none"
              >
                <option value="blog">Blog</option>
                <option value="portfolio">Portfolio</option>
                <option value="tutorial">Tutorial</option>
                <option value="noticia">Noticia</option>
              </select>
            </div>

            {/* Imagen */}
            <div>
              <label className="block text-sm font-semibold mb-2">Imagen</label>
              <ImageUploader
                onUploadComplete={handleImageUpload}
                folder="posts"
                className="mb-4"
              />
              {formData.image && (
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full max-w-xs h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="mt-2 text-sm text-red-400 hover:text-red-300"
                  >
                    Eliminar imagen
                  </button>
                </div>
              )}
            </div>

            {/* Contenido */}
            <div>
              <label className="block text-sm font-semibold mb-2">Contenido *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Escribe el contenido del post aquí..."
                rows={10}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>

            {/* Publicado */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
                id="published"
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor="published" className="text-sm font-semibold cursor-pointer">
                Publicar inmediatamente
              </label>
            </div>

            {/* Botones */}
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

      {/* Posts List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Cargando posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <p className="text-gray-400">No hay posts aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        post.published
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {post.published ? '✓ Publicado' : '∘ Borrador'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{post.slug}</p>
                  <p className="text-gray-300 text-sm line-clamp-2">{post.content_preview}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-sm rounded transition"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-sm rounded transition"
                  >
                    🗑️ Eliminar
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
