import { db } from './firebase'
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  limit,
} from 'firebase/firestore'

// ========== POSTS ==========

export async function getPosts(
  pageSize: number = 10,
  _pageNumber: number = 1
) {
  try {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true),
      orderBy('date', 'desc'),
      limit(pageSize)
    )
    const docs = await getDocs(q)
    return docs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const q = query(
      collection(db, 'posts'),
      where('slug', '==', slug),
      where('published', '==', true)
    )
    const docs = await getDocs(q)
    return docs.docs[0]?.data() || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getPostsByCategory(category: string) {
  try {
    const q = query(
      collection(db, 'posts'),
      where('category', '==', category),
      where('published', '==', true),
      orderBy('date', 'desc')
    )
    const docs = await getDocs(q)
    return docs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }
}

export async function searchPosts(searchTerm: string) {
  try {
    // Firestore no tiene búsqueda full-text nativa
    // Alternativa: buscar en título y contenido en cliente
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true),
      orderBy('date', 'desc')
    )
    const docs = await getDocs(q)
    return docs.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as any))
      .filter((post: any) => 
        post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post?.content?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}

// ========== PÁGINAS ==========

export async function getPages() {
  try {
    const q = query(
      collection(db, 'pages'),
      where('published', '==', true),
      orderBy('date', 'asc')
    )
    const docs = await getDocs(q)
    return docs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const q = query(
      collection(db, 'pages'),
      where('slug', '==', slug),
      where('published', '==', true)
    )
    const docs = await getDocs(q)
    return docs.docs[0]?.data() || null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

// ========== TESTIMONIOS ==========

export async function getTestimonials() {
  try {
    const q = query(
      collection(db, 'testimonials'),
      where('published', '==', true),
      orderBy('rating', 'desc')
    )
    const docs = await getDocs(q)
    return docs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function getTestimonialsByRating(minRating: number = 4) {
  try {
    const q = query(
      collection(db, 'testimonials'),
      where('published', '==', true),
      where('rating', '>=', minRating),
      orderBy('rating', 'desc'),
      orderBy('date', 'desc')
    )
    const docs = await getDocs(q)
    return docs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching testimonials by rating:', error)
    return []
  }
}

// ========== CONFIGURACIÓN DEL SITIO ==========

export async function getSiteConfig() {
  try {
    const docRef = doc(db, 'config', 'site')
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? docSnap.data() : null
  } catch (error) {
    console.error('Error fetching site config:', error)
    return null
  }
}

// ========== UTILITARIOS ==========

export async function countDocuments(collectionName: string) {
  try {
    const q = query(
      collection(db, collectionName),
      where('published', '==', true)
    )
    const docs = await getDocs(q)
    return docs.size
  } catch (error) {
    console.error('Error counting documents:', error)
    return 0
  }
}

export async function getRecentPosts(count: number = 3) {
  try {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true),
      orderBy('date', 'desc'),
      limit(count)
    )
    const docs = await getDocs(q)
    return docs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching recent posts:', error)
    return []
  }
}
