# 🔥 MIGRACIÓN A FIRESTORE - GUÍA PASO A PASO

## ✅ Estado Actual:
- Firebase está **CONFIGURADO** ✅
- Credenciales en `.env.local` ✅
- Código preparado para Firestore ✅

## 🚀 PRÓXIMOS PASOS (5 MINUTOS)

### 1️⃣ Obtener Clave de Servicio (Service Account)

Esto es necesario para el script de migración. **IMPORTANTE: Mantén seguro este archivo**

**Pasos:**
1. Ve a Firebase Console: https://console.firebase.google.com
2. Selecciona proyecto: `sitio-web-creativo-md`
3. Haz clic en ⚙️ (Configuración) > **Configuración del proyecto**
4. Tab "Cuentas de servicio"
5. Haz clic en **"Generar nueva clave privada"**
6. Se descargará un JSON - **Guárdalo en carpeta `creativo-marketing-web/scripts/`**
7. Renómbra+lo a: `firebase-service-account.json`

### 2️⃣ Instalar Dependencias (si no lo hiciste)

```bash
cd "d:\Sitio Web Creativo Marketing Digital\creativo-marketing-web"
npm install
npm install firebase-admin
```

### 3️⃣ Ejecutar Migración

**IMPORTANTE**: El archivo `wordpress_data_final.json` debe estar en la carpeta del proyecto

```bash
# Copiar el archivo JSON a la carpeta scripts
copy "d:\Sitio Web Creativo Marketing Digital\wordpress_data_final.json" scripts\

# Ejecutar migración
npm run migrate
```

**Output esperado:**
```
======================================================================
🚀 INICIANDO MIGRACIÓN: WORDPRESS → FIRESTORE
======================================================================

📂 Cargando datos de WordPress desde: ../wordpress_data_final.json
✅ Datos cargados: 21 posts, 36 páginas

📝 Migrando Posts...
   ✅ Posts: 21 exitosos, 0 fallidos

📄 Migrando Páginas...
   ✅ Páginas: 36 exitosos, 0 fallidos

⭐ Migrando Testimonios...
   ✅ Testimonios: 1 exitoso, 0 fallidos

⚙️  Creando configuración del sitio...
   ✅ Configuración creada

======================================================================
✅ MIGRACIÓN COMPLETADA
======================================================================

Resultados:
  📝 Posts:        21 ✅, 0 ❌
  📄 Páginas:      36 ✅, 0 ❌
  ⭐ Testimonios:  1 ✅, 0 ❌
  
  ⏱️  Tiempo total: 2.45s
  🔗 Proyecto:     sitio-web-creativo-md
```

### 4️⃣ Verificar en Firebase Console

Abre https://console.firebase.google.com y ve a:
- **Firestore Database** 
- Verifica que las colecciones aparezcan:
  - ✅ `posts` (21 documentos)
  - ✅ `pages` (36 documentos)
  - ✅ `testimonials` (1 documento)
  - ✅ `config` (1 documento)

---

## 🔌 CONECTAR LA UI AL CONTENIDO DINÁMICO

Después de migrar, actualiza las páginas para usar Firestore:

### `/app/blog/page.tsx`:

```typescript
import { getPosts } from '@/lib/firestore-queries'
import Link from 'next/link'

export const revalidate = 3600 // ISR: 1 hora

export default async function BlogPage() {
  const posts = await getPosts(10)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container-md py-16">
        <h1 className="heading-1 mb-4">Blog de Marketing Digital</h1>
        <p className="text-xl text-gray-600 mb-12">
          Artículos, consejos y estrategias para impulsar tu negocio
        </p>

        {posts.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600">No hay artículos publicados aún</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="heading-3 mb-3 hover:text-blue-600 transition">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm mb-4">
                  {post.content?.substring(0, 150)}...
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    {new Date(post.date).toLocaleDateString('es-ES')}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Leer más →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
```

### `/app/blog/[slug]/page.tsx`:

```typescript
import { getPostBySlug, getPosts } from '@/lib/firestore-queries'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts(100)
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export const revalidate = 3600

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <article className="container-md py-16 max-w-3xl">
        <h1 className="heading-1 mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-8">
          {new Date(post.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="bg-white rounded-lg shadow p-8 prose prose-lg max-w-none">
          {post.content}
        </div>
      </article>
    </main>
  )
}
```

---

## 📊 ESTRUCTURA FIRESTORE CREADA

```
Firestore Database
├── posts/
│   ├── 117/ { title, slug, content, date, published, ... }
│   ├── 118/ { ... }
│   └── ...
│
├── pages/
│   ├── 2/ { title, slug, content, ... }
│   ├── 3/ { ... }
│   └── ...
│
├── testimonials/
│   ├── walter-calvar/ { name, rating, text, company, ... }
│   └── ...
│
└── config/
    └── site/ { name, email, phone, social, ... }
```

---

## 🔐 FIRESTORE RULES (Seguridad)

Configura estas reglas de seguridad en Firebase Console:

**Firestore → Reglas:**

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lectura pública para posts y páginas
    match /posts/{document=**} {
      allow read: if request.auth != null || true;
      allow write: if request.auth != null && 
                      request.auth.token.email == 'admin@creativomarketingdigital.com';
    }
    
    match /pages/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.auth.token.email == 'admin@creativomarketingdigital.com';
    }
    
    match /testimonials/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
      allow write: if request.auth != null && 
                      request.auth.token.email == 'admin@creativomarketingdigital.com';
    }
    
    match /config/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.auth.token.email == 'admin@creativomarketingdigital.com';
    }
  }
}
```

---

## 🐛 TROUBLESHOOTING

### Error: "Permission denied"
- Verifica que tu email esté en Firestore Rules
- Consulta la sección "FIRESTORE RULES" arriba

### Error: "Document not found"
- Asegúrate que corriste `npm run migrate` exitosamente
- Verifica que `wordpress_data_final.json` existe

### Error: "Service account invalid"
- Verifica que el archivo JSON esté en `scripts/firebase-service-account.json`
- Descarga una nueva clave desde Firebase Console

---

## ✅ CHECKLIST MIGRACIÓN

- [ ] Firebase proyecto creado
- [ ] `.env.local` configurado con credenciales
- [ ] Descargada clave de servicio
- [ ] `firebase-service-account.json` en `scripts/`
- [ ] `npm install firebase-admin` completado
- [ ] `npm run migrate` ejecutado exitosamente
- [ ] Datos visibles en Firebase Console
- [ ] Firestore Rules configuradas
- [ ] `/blog/page.tsx` actualizado para leer Firestore
- [ ] `npm run dev` ejecutado

---

## 🚀 SIGUIENTES PASOS

1. **Migración de Imágenes** (1 hora)
   - Extraer del backup: `u451544134.creativomarketingdigital-com.20260312232709.tar.gz`
   - Subir a Firebase Storage
   - Actualizar referencias en posts/pages

2. **Formulario de Contacto** (1 hora)
   - Conectar a Firestore o Email (Resend)
   - Validación
   - Feedback al usuario

3. **Admin Panel** (2 horas)
   - Crear/editar posts
   - Gestionar testimonios
   - Upload de imágenes

4. **Deploy a Vercel** (30 min)
   - Conectar GitHub
   - Variables en Vercel
   - Domain setup

---

**¡Siguiente comando para ejecutar:**

```bash
npm run migrate
```

**Hora estimada**: 5 minutos para completar todo este paso 🚀
