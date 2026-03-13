# 🐙 Guía: Crear Repositorio en GitHub

**Tiempo:** 5 minutos  
**Requisitos:** Cuenta GitHub, proyecto local con git iniciado

---

## Paso 1: Crear Token de Acceso Personal (PAT)

### 1.1 Acceder a GitHub Settings
1. Ve a [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**

### 1.2 Configurar token
- **Token name:** `creativo-marketing-vercel`
- **Expiration:** 90 days (recomendado para CI/CD)
- **Select scopes:**
  - ✅ `repo` (full control)
  - ✅ `admin:repo_hook` (para webhooks Vercel)
  - ✅ `workflow` (para GitHub Actions)

### 1.3 Guardar token
- Click **Generate token**
- **COPIA Y GUARDA EN LUGAR SEGURO** (solo aparece una vez)
- Ejemplo: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## Paso 2: Crear Nuevo Repositorio

### 2.1 En GitHub
1. Ve a [github.com/new](https://github.com/new)
2. **Owner:** Tu usuario
3. **Repository name:** `creativo-marketing-web`
4. **Description:** 
   ```
   Modern website for Estudio Creativo - Built with Next.js 14, Firebase & Tailwind
   ```
5. **Visibility:** 
   - Selecciona **Public** (necesario para Vercel)
6. **Initialize this repository with:**
   - ❌ README (ya tenemos)
   - ❌ .gitignore (ya tenemos)
   - ❌ License
7. Click **Create repository**

✅ Repositorio creado

---

## Paso 3: Conectar Local a GitHub

### 3.1 En PowerShell (desde carpeta del proyecto)
```powershell
cd "d:\Sitio Web Creativo Marketing Digital\creativo-marketing-web"

# Verificar que tienes git remoto ya configurado
git remote -v

# Si NO hay nada, agregar:
git remote add origin https://github.com/USERNAME/creativo-marketing-web.git

# Reemplaza USERNAME con tu usuario de GitHub
```

### 3.2 Push al servidor
```powershell
# Asegurar que estamos en rama main
git branch -M main

# Push con token de acceso
git push -u origin main

# Te pedirá username y password:
# Username: YOUR_GITHUB_USERNAME
# Password: PEGA_TU_TOKEN_AQUI (el que copiaste en Paso 1)
```

✅ Código publicado en GitHub

---

## Paso 4: Configurar Secrets para GitHub Actions

### 4.1 Acceder a Secrets
1. Ve a tu repo en GitHub
2. **Settings** → **Secrets and variables** → **Actions**

### 4.2 Crear Secrets para Vercel
Necesitas obtener estos valores antes desde Vercel:

1. Ve a [vercel.com/account/settings/tokens](https://vercel.com/account/settings/tokens)
2. Click **Create** nuevo token
3. **Token name:** `github-actions`
4. **Expiration:** 90 days
5. Copia el token

### 4.3 En GitHub Secrets - Agregar 3 secrets:

**Secret 1: VERCEL_TOKEN**
- Name: `VERCEL_TOKEN`
- Value: `[Token que copiaste de Vercel]`

**Secret 2: VERCEL_ORG_ID**
1. Ve a Vercel → Settings → General
2. Copia el "Team ID"
- Name: `VERCEL_ORG_ID`
- Value: `tu_team_id`

**Secret 3: VERCEL_PROJECT_ID**
1. En tu proyecto Vercel
2. Settings → General, copia "Project ID"
- Name: `VERCEL_PROJECT_ID`
- Value: `tu_project_id`

✅ Secrets configurados

---

## Paso 5: Verificar CI/CD

### 5.1 Hacer un test commit
```powershell
# Cambiar algo pequeño (ej: actualizar README)
# Luego:
git add .
git commit -m "test: verify GitHub Actions"
git push origin main
```

### 5.2 Ver ejecución
1. Ve a tu repo GitHub → **Actions**
2. Verás el workflow "Build and Deploy"
3. Estados:
   - 🟡 **In progress** - compilando
   - 🟢 **Success** - pasó tests
   - 🔴 **Failed** - revisar logs

### 5.3 Ver logs si falla
- Click en el workflow
- Click en el job `build`
- Ver "Build output"
- Errores comunes:
  - `VERCEL_TOKEN invalid` → regenerar token
  - `node_modules missing` → `npm install` falta
  - `env var not found` → agregar en Vercel dashboard

✅ CI/CD funcionando

---

## 🎯 Resultado Final

Ahora tienes:
- ✅ Código en GitHub (público, respaldado)
- ✅ GitHub Actions automático (testa en cada push)
- ✅ Vercel conectado (auto-deploy)
- ✅ Secrets protegidos (no en .env)

Flujo: `git push` → GitHub Actions → Tests → Vercel Deploy → 🚀 Live

---

## 📎 Comandos Git Útiles

```powershell
# Ver status
git status

# Ver commits
git log --oneline -5

# Ver remoto
git remote -v

# Pull cambios
git pull origin main

# Crear rama para features
git checkout -b feature/nueva-feature
git push origin feature/nueva-feature

# Volver a main
git checkout main
git pull origin main
```

---

**Status:** ✅ Listo para próximo paso (Vercel deployment)
