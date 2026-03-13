# 📋 FASE 7: GUÍA COMPLETA DE DEPLOYMENT A VERCEL

**Estado:** 🟢 Listo para Producción  
**Última actualización:** Marzo 13, 2025

---

## ✅ Requisitos Previos

- ✅ Proyecto Next.js completamente configurado
- ✅ Git inicializado y primer commit hecho
- ✅ Variables de entorno locales en `.env.local`
- ✅ Firestore con 59 documentos migrados
- ✅ Admin panel funcional y probado
- ✅ Todo compilado sin errores TypeScript

**Status actual:** Todo completado ✅

---

## 📌 PASO 1: Crear Repositorio en GitHub

### 1.1 Crear nuevo repositorio
1. Ve a [github.com/new](https://github.com/new)
2. **Repository name:** `creativo-marketing-web`
3. **Description:** Sitio web moderno for Estudio Creativo Marketing Digital
4. **Visibility:** Public (para Vercel)
5. **Initialize with:** NO (ya tenemos git localmente)
6. Click **Create repository**

### 1.2 Configurar remote y push
```bash
# En tu terminal (Windows PowerShell):
cd "d:\Sitio Web Creativo Marketing Digital\creativo-marketing-web"

# Agregar remote (reemplaza USERNAME con tu usuario GitHub)
git remote add origin https://github.com/USERNAME/creativo-marketing-web.git

# Rename branch si es necesario
git branch -M main

# Push al servidor
git push -u origin main
```

✅ Repositorio publicado en GitHub

---

## 🚀 PASO 2: Conectar Vercel

### 2.1 Crear cuenta Vercel (si no tienes)
- Ve a [vercel.com](https://vercel.com)
- Click **Sign Up**
- Selecciona **Continue with GitHub**
- Autoriza Vercel en GitHub

### 2.2 Importar proyecto
1. En Vercel dashboard: Click **Add New...** → **Project**
2. **Import Git Repository**
3. Busca y selecciona `creativo-marketing-web`
4. Click **Import**

### 2.3 Configurar ambiente de build
- **Framework:** Next.js (detectado automáticamente)
- **Root directory:** `.` (default)
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)

✅ Vercel autodetecta todo desde `vercel.json`

---

## 🔑 PASO 3: Variables de Entorno en Vercel

### 3.1 Acceder a settings
1. En proyecto Vercel → **Settings** → **Environment Variables**

### 3.2 Agregar todas las variables
Copia desde `.env.local` y pega en Vercel. Necesitas **12 variables**:

```bash
# Firebase Public Keys (copy exactamente como están)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA-rMBv2OdzcFMXVwASKWfhLP_ZVj-lbGE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sitio-web-creativo-md.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sitio-web-creativo-md
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sitio-web-creativo-md.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=725487478967
NEXT_PUBLIC_FIREBASE_APP_ID=1:725487478967:web:2aa65581bc273e4025c532
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-K4Q84TP9FS

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://creativomarketingdigital.com
NEXT_PUBLIC_SITE_NAME=Estudio Creativo de Marketing Digital
NEXT_PUBLIC_ADMIN_PASSWORD=tu_contraseña_segura

# APIs
RESEND_API_KEY=tu_resend_api_key
CONTACT_EMAIL=admin@creativomarketingdigital.com
```

### 3.3 Aplicar cambios
- Selecciona environments: **Production**, **Preview**, **Development**
- Click **Save**
- Trigger re-deploy desde dashboard

✅ Variables sincronizadas en Vercel

---

## 🔐 PASO 4: Firebase Rules (Seguridad)

### 4.1 Acceder a Firestore Rules
1. Firebase Console → tu proyecto
2. **Firestore Database** → **Rules**

### 4.2 Configurar reglas de acceso
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lectura pública - todos pueden leer posts, páginas, testimonios
    match /{document=**} {
      allow read: if true;
    }
    
    // Escritura protegida - solo admin panel con contraseña
    match /posts/{document=**} {
      allow write: if request.auth.uid != null;
    }
    match /pages/{document=**} {
      allow write: if request.auth.uid != null;
    }
    match /testimonials/{document=**} {
      allow write: if request.auth.uid != null;
    }
  }
}
```

✅ Firestore seguro - lectura pública, escritura protegida

---

## 🌐 PASO 5: Custom Domain

### 5.1 Configurar en Vercel
1. Proyecto Vercel → **Settings** → **Domains**
2. Click **Add Domain**
3. Ingresa: `creativomarketingdigital.com`
4. Selecciona opción recomendada (usualmente CNAME)

### 5.2 Configurar DNS en registrador
**Ejemplo (GoDaddy, Namecheap, Google Domains, etc):**
- Ve a tu panel de control del dominio
- Encontrar **DNS Settings** o **Manage DNS**
- Agregar CNAME record:
  - **Name:** `www` (o alias suggestion de Vercel)
  - **Value:** `cname.vercel-dns.com` (o valor mostrado por Vercel)

### 5.3 Verificación
- Espera 5-30 minutos para propagación DNS
- En Vercel dashboard verás: ✅ **Domain Connected**
- SSL certificate automático

✅ Dominio activo con HTTPS

---

## 📧 PASO 6: Configurar Resend (Email)

### 6.1 Cuenta Resend
1. Ve a [resend.com](https://resend.com)
2. Sign up → verificar email
3. Dashboard → **API Keys**
4. Copy tu API key

### 6.2 Actualizar en Vercel
- En Vercel dashboard: agregar o actualizar `RESEND_API_KEY`
- Trigger re-deploy

### 6.3 Teste emails
1. Ve al formulario de contacto: `/contacto`
2. Envía un mensaje de prueba
3. Debe llegar a `CONTACT_EMAIL`

✅ Email funcional en producción

---

## ✔️ PASO 7: Verificación Final

### 7.1 Tests de Producción
```
URL pública: https://creativomarketingdigital.com

Checklist:
☑ Home page carga correctamente
☑ Blog posts y páginas desde Firestore visible
☑ Portfolio projects cargan
☑ Testimonios muestran
☑ Contacto form visible y funcional
☑ Email de contacto llega
☑ Admin panel accesible en /admin
☑ Admin login funciona (contraseña: admin123)
☑ CRUD en admin panel funciona
☑ Imágenes suben a Firebase Storage
☑ Analytics activo (Google Analytics)
☑ Certificado SSL activo (https://)
```

### 7.2 Monitoreo
- Vercel Dashboard → **Deployments** (ver logs)
- Firebase Console → **Monitoring** (metrics)
- Resend Dashboard → **Emails** (ver entregas)

### 7.3 Optimizaciones futuras
- Cloudflare DNS (mejora performance)
- Database replication (backup)
- CDN edge caching (images)
- Error tracking (Sentry)

---

## 🔄 Flujo de Actualización (Post-Deployment)

Cuando necesites actualizar contenido:

1. **Vía Admin Panel** (recomendado)
   - Ve a `/admin`
   - Login con contraseña
   - CRUD posts/testimonios/imágenes
   - Cambios en tiempo real en producción

2. **Vía GitHub** (desarrolladores)
   ```bash
   # Hacer cambio local
   # Commit y push
   git add .
   git commit -m "description"
   git push origin main
   
   # Vercel auto-deploy (5-60 segundos)
   # Ver en: vercel.com dashboard → Deployments
   ```

---

## 📞 Troubleshooting

| Problema | Solución |
|----------|----------|
| **Domain no conecta** | Espera 30min, verifica DNS settings en registrador |
| **Email no llega** | Verifica RESEND_API_KEY, dominio verificado en Resend |
| **Build falla en Vercel** | Ver Build Logs, probablemente env var faltante |
| **Firestore 403 error** | Revisa Firestore Rules, debe permitir lectura pública |
| **Imágenes lentas** | Vercel Image Optimization automático, check next.config.mjs |
| **Admin login no funciona** | Verifica NEXT_PUBLIC_ADMIN_PASSWORD en Vercel |

---

## 🎯 Estado Actual

```
✅ Fase 7: Deployment
├─ ✅ Git repository inicializado
├─ ✅ vercel.json configurado
├─ ✅ .github/workflows/deploy.yml listo
├─ ✅ .gitignore protege secretos
├─ ✅ README.md actualizado
├─ ⏳ SIGUIENTE: Crear repo en GitHub
├─ ⏳ SIGUIENTE: Conectar a Vercel
├─ ⏳ SIGUIENTE: Variables de entorno
├─ ⏳ SIGUIENTE: Custom domain
└─ ⏳ SIGUIENTE: Verificación en producción
```

---

## 📎 Referencias Rápidas

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Guide:** https://nextjs.org/docs
- **Firebase:** https://console.firebase.google.com
- **Resend:** https://resend.com/docs
- **GitHub:** https://github.com

---

**Tiempo estimado:** 30-45 minutos  
**Dificultad:** 🟢 Fácil (pasos muy claros)  
**Resultado:** 🚀 Website en producción con HTTPS + custom domain
