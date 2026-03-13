# 🚀 Guía: Deployment a Vercel

**Tiempo:** 10-15 minutos  
**Requisitos:** Repo en GitHub, cuenta Vercel

---

## Paso 1: Crear Cuenta Vercel

### 1.1 Si no tienes cuenta
1. Ve a [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Selecciona **Continue with GitHub**
4. Autoriza Vercel en tus repositorios
5. Confirma email si es necesario

✅ Cuenta Vercel lista

---

## Paso 2: Importar Proyecto

### 2.1 En Vercel Dashboard
1. Click **Add New...** → **Project**
2. En "Import Git Repository"
3. Busca `creativo-marketing-web` en tus repositorios
4. Click **Select** en el repo

### 2.2 Configuración del Proyecto
- **Project Name:** `creativo-marketing-web` (default está bien)
- **Framework Preset:** Next.js (auto-detectado) ✅
- **Root Directory:** `./` (default) ✅
- **Build Command:** `npm run build` (default) ✅

✅ Proyecto importado

---

## Paso 3: Configurar Variables de Entorno

### 3.1 Antes de hacer deploy
**NO HAGAS DEPLOY AÚN** - agreguemos variables primero

Click **Environment Variables** antes de deploying

### 3.2 Copiar variables de `.env.local`

Desde tu archivo local `d:\Sitio Web Creativo Marketing Digital\creativo-marketing-web\.env.local`:

**Ir copiando cada una:**
1. Name: `NEXT_PUBLIC_FIREBASE_API_KEY`
2. Value: `AIzaSyA-rMBv2OdzcFMXVwASKWfhLP_ZVj-lbGE`
3. Environments: ✅ Production, ✅ Preview, ✅ Development
4. Click **Add**

Repetir para cada variable:

```
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sitio-web-creativo-md.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sitio-web-creativo-md
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sitio-web-creativo-md.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=725487478967
NEXT_PUBLIC_FIREBASE_APP_ID=1:725487478967:web:2aa65581bc273e4025c532
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-K4Q84TP9FS
NEXT_PUBLIC_SITE_URL=https://creativomarketingdigital.com
NEXT_PUBLIC_SITE_NAME=Estudio Creativo de Marketing Digital
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
RESEND_API_KEY=re_XXXXX (tu API key desde resend.com)
CONTACT_EMAIL=admin@creativomarketingdigital.com
```

✅ Todas las variables configuradas

---

## Paso 4: Deploy Inicial

### 4.1 En Vercel
Scroll abajo → Click **Deploy**

El build toma ~2-3 minutos:
```
Building...
✓ Bundle complete
✓ Build succeeded
✓ Deployed to https://creativo-marketing-web-xxxxxxxx.vercel.app
```

✅ Primera versión en staging URL

---

## Paso 5: Verificar Deployment

### 5.1 Test de funcionalidad
Ve a URL staging: `https://creativo-marketing-web-xxxxxxxx.vercel.app`

Checklist:
- ☑ Home page carga
- ☑ Blog posts visibles
- ☑ Portfolio projects cargan
- ☑ Testimonios muestran
- ☑ Formulario contacto funciona
- ☑ Admin panel accessible en `/admin`

Si algo falla, ver **Deployments** → **View Build Logs**

---

## Paso 6: Conectar Custom Domain

### 6.1 En Vercel Project Settings
1. **Domains** → **Add Domain**
2. Ingresa tu dominio: `creativomarketingdigital.com`
3. Vercel sugiere opción: típicamente CNAME
4. Copia el valor sugerido (ej: `cname.vercel-dns.com`)

### 6.2 Configurar DNS

**En tu registrador de dominio** (GoDaddy, Namecheap, Google Domains, etc):

Ejemplo (varía por proveedor):
1. Login en tu panel de control
2. Ir a **DNS Settings** o **Manage DNS**
3. Buscar **CNAME Record** o **Alias Record**
4. Agregar:
   - **Name/Host:** `www`
   - **Value/Points to:** `cname.vercel-dns.com`

Si tienes registrador sin www:
- **Name:** `@` o vacío
- **Type:** A Record
- **Value:** última dirección IP sugerida por Vercel

### 6.3 Certificado SSL
Vercel automáticamente:
- Genera certificado SSL
- Redirige HTTP → HTTPS
- Auto-renews cada 90 días

⏳ Espera 5-30 minutos para propagación DNS

---

## Paso 7: Verificar Domain

### 7.1 En Vercel Dashboard
Tu dominio mostrará:
- 🔄 **Pending** - esperando DNS propagación
- 🟢 **Active** - conectado y funcionando

### 7.2 Via Browser
1. Ve a `https://creativomarketingdigital.com`
2. Debe ver tu sitio
3. URL debería ser HTTPS (🔒 candado)
4. Certificado válido

✅ Domain activo

---

## Paso 8: Configurar Auto-Deploy

### 8.1 GitHub Integration
En Vercel ya está configurado automáticamente:
- Cada `git push origin main` triggeriza build
- Auto-deploy si build exitoso
- Rollback rápido si falla

### 8.2 Ver deployments
Vercel Dashboard → **Deployments**
```
Latest:
✓ [main] deploy 2025-03-13 14:32:41
  Commit: Phase 7: Deployment configuration...
  Status: Ready
  URL: https://creativomarketingdigital.com
```

✅ Auto-deploy configurado

---

## 🔐 Paso 9: Configurar Firestore Rules

### 9.1 Firebase Console
1. [console.firebase.google.com](https://console.firebase.google.com)
2. Tu proyecto
3. **Firestore Database** → **Rules**

### 9.2 Actualizar rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Todo el mundo puede LEER
    match /{document=**} {
      allow read: if true;
    }
    
    // Solo admin puede ESCRIBIR (en producción usar Auth)
    match /{document=**} {
      allow write: if false;
    }
    
    // Para admin panel (opcional - agregar Auth después)
    match /posts/{document=**} {
      allow write: if request.auth.uid != null;
    }
  }
}
```

Click **Publish**

✅ Rules de seguridad activadas

---

## 📧 Paso 10: Testing Email

### 10.1 Verificar dominio en Resend
1. [resend.com/emails](https://resend.com/emails)
2. Click **Add Domain** (si no está)
3. Agregar: `creativomarketingdigital.com`
4. Seguir instrucciones de DNS para verificación
5. Status debe ser 🟢 **Verified**

### 10.2 Test de email
1. Ve a `/contacto` en tu sitio (producción)
2. Llena formulario con test
3. Click enviar
4. Email debe llegar a `CONTACT_EMAIL`
5. Revisar **Resend Dashboard** → **Emails** (verá el envío)

✅ Email funcional en producción

---

## 🎯 Resultado Final

Tu website ahora:
```
✅ En producción: https://creativomarketingdigital.com
✅ Dominio custom con HTTPS
✅ Variables de entorno protegidas
✅ Auto-deploy con cada git push
✅ Firestore conectado y seguro
✅ Email funcional
✅ Admin panel con CRUD
✅ Imágenes en Firebase Storage
```

**Performance esperado:**
- ⚡ Páginas cargan <1 segundo
- 📊 CDN edge global
- 🔄 Uptime 99.9%
- 🌍 Disponible 24/7

---

## 🔄 Futuros Cambios

**Para desarrolladores/admin:**

**Cambio de contenido (recomendado):**
```
Ir a /admin → login → editar posts/testimonios/imágenes
Cambios en tiempo real en producción
```

**Cambio de código:**
```powershell
# Local:
git add .
git commit -m "feature: description"
git push origin main

# Automático:
GitHub Actions testa → Vercel deploy
Sitio live en 5-60 segundos
```

---

## ⚠️ Troubleshooting

| Problema | Solución |
|----------|--------|
| **Build falla** | Ver logs: Deployments → últmo → Build Logs |
| **"Cannot find module firebase"** | Falta npm install, vercel ejecuta auto pero a veces falla |
| **Env var undefined** | Revisar que esté en Vercel dashboard, no solo .env.local |
| **Email no llega** | Verificar dominio en Resend, revisar spam |
| **Domain no conecta** | Espera 30min DNS, verifica settings en registrador |
| **Admin login no funciona** | Contraseña debe ser exacto, revisar NEXT_PUBLIC_ADMIN_PASSWORD |
| **Imágenes lentas** | Normal, Vercel optimiza bajo demanda primer acceso |

---

## 📞 Soporte Rápido

- **Vercel Status:** [status.vercel.com](https://status.vercel.com)
- **Firebase Status:** [status.firebase.google.com](https://status.firebase.google.com)
- **Resend Status:** [status.resend.com](https://status.resend.com)

---

**Status:** ✅ Website en producción  
**Próximo:** Monitoreo y optimizaciones opcionales
