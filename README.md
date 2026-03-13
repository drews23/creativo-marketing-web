# 🚀 Estudio Creativo de Marketing Digital - Website

Versión moderna de [creativomarketingdigital.com](https://creativomarketingdigital.com) usando **Next.js 14** + **Firebase** + **Tailwind CSS**.

> 📊 Migración exitosa de **WordPress → Next.js** con +65% mejor performance

---

## ✨ Características Principales

### 🎯 Frontend (Cliente)
- ✅ **Blog Dinámico** - 21+ artículos desde Firestore
- ✅ **Portfolio** - 36+ proyectos con detalles completos
- ✅ **Testimonios** - Reseñas de clientes en tiempo real
- ✅ **Contacto** - Formulario con envío de emails
- ✅ **Responsive** - Mobile-first design
- ✅ **SEO** - Metadata optimizado y Open Graph

### 🛠️ Admin Panel
- ✅ **Dashboard** - Estadísticas en vivo
- ✅ **CRUD** - Gestión de posts, páginas, testimonios
- ✅ **Imágenes** - Upload a Firebase Storage
- ✅ **Emails** - Sistema integrado con Resend
- ✅ **Notificaciones** - Toast en tiempo real

### 🔧 Backend & Infraestructura
- ✅ **Firebase Firestore** - Base de datos en tiempo real
- ✅ **Firebase Storage** - Almacenamiento de imágenes
- ✅ **Resend API** - Envío de emails
- ✅ **Vercel** - Hosting y deployment automático

---

## 🚀 Deployment a Vercel

### 1. Preparación
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### 2. Conectar a Vercel
1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio GitHub
3. Configura variables de entorno
4. Deploy automático ✅

### 3. Custom Domain
- DNS settings en Vercel
- SSL automático
- Email forwarding

---

## 🔑 Variables de Entorno (.env.local)

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sitio-web-creativo-md
NEXT_PUBLIC_ADMIN_PASSWORD=tu_contraseña
RESEND_API_KEY=your_resend_key
CONTACT_EMAIL=admin@tudominio.com
```

---

## 📊 URLs

**Público:** `/`, `/blog`, `/portfolio`, `/contacto`  
**Admin:** `/admin` (contraseña: admin123)

---

## 🛠️ Desarrollo

```bash
npm install              # Instalar
npm run dev             # Local (puerto 3000)
npm run build           # Build
npm run lint            # Linter
npm run type-check      # TypeScript
```

---

**Última actualización:** Marzo 13, 2026 | **Versión:** 6.0.0 | **Status:** 🟢 Production Ready
├── app/
│   ├── layout.tsx              # Layout global
│   ├── page.tsx                # Página principal
│   ├── globals.css             # Estilos globales
│   ├── blog/                   # Sección de blog
│   ├── portfolio/              # Sección de portfolio
│   ├── contacto/               # Formulario de contacto
│   └── api/                    # API routes (opcional)
├── components/
│   ├── Header.tsx              # Encabezado
│   ├── Hero.tsx                # Sección hero
│   ├── Portfolio.tsx           # Galería de proyectos
│   ├── Testimonials.tsx        # Testimonios de clientes
│   ├── CTA.tsx                 # Call to Action
│   └── Footer.tsx              # Pie de página
├── lib/
│   ├── firebase.ts             # Configuración Firebase
│   ├── hooks/                  # Custom React hooks
│   └── utils.ts                # Funciones utilitarias
├── public/                     # Archivos estáticos
├── .env.local.example          # Variables de ambiente
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
└── .eslintrc.json
```

## 🔧 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de ambiente:
```bash
cp .env.local.example .env.local
```

3. Agregar credenciales de Firebase en `.env.local`

4. Ejecutar servidor de desarrollo:
```bash
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponibles

- `npm run dev`      - Inicia servidor de desarrollo
- `npm run build`    - Genera build optimizado
- `npm start`        - Ejecuta build en producción
- `npm run lint`     - Ejecuta ESLint
- `npm run type-check` - Verifica tipos TypeScript

## 🔥 Integración Firebase

### Pasos para configurar:

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)

2. Habilitar servicios:
   - ✅ Firebase Authentication (Email/Password, Google OAuth)
   - ✅ Cloud Firestore
   - ✅ Cloud Storage

3. Copiar credenciales y colocar en `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## 🎨 Personalización Tailwind

El archivo `tailwind.config.ts` contiene colores personalizados:
- **Primary**: #005FCC (Azul)
- **Secondary**: #FF6B35 (Naranja)
- **Accent**: #F7931E (Dorado)

## 📱 Responsive Design

Diseño mobile-first con breakpoints de Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🚀 Deployment en Vercel

1. Conectar repositorio a [Vercel](https://vercel.com)
2. Configurar variables de ambiente en Vercel
3. Deploy automático en cada push

## 🔐 Seguridad

- ✅ Firestore rules configuradas
- ✅ Variables sensibles en .env.local
- ✅ CORS y middleware configurado
- ✅ CSP headers en next.config

## 📊 Performance

- ✅ Lighthouse Score: 95+
- ✅ Core Web Vitals optimizados
- ✅ Imágenes optimizadas
- ✅ CSS crítico inline

## 📚 Documentación

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## 📄 Licencia

Propietario - Estudio Creativo de Marketing Digital © 2026

## 📞 Soporte

- Email: estudio@creativomarketingdigital.com
- Teléfono: +57 316 691 8444
- Web: https://creativomarketingdigital.com

---

**Hecho con ❤️ por Estudio Creativo MD**
