# 🧩 Prodigioso Volcán – Guía Resumida Fullstack

Implementación del ejercicio técnico de **Prodigioso Volcán** con:

- Autenticación **Google SSO**
- Manejo de sesión
- **Backend:** Node.js + Express + Passport
- **Frontend:** independiente, ejecutable con `npm start`
- **Despliegue:** Docker Compose
- **Reverse proxy y HTTPS:** Nginx

---

# 🚀 Tecnologías

- Node.js + Express  
- Passport.js (OAuth 2.0 Google)  
- Frontend JS clásico  
- Docker & Docker Compose  
- Nginx con certificados TLS/SSL  

---

# 📦 Requisitos

- Node.js ≥ 18  
- Docker y Docker Compose  
- Cuenta de Google Cloud para OAuth  

---

# 🔐 Configuración de Google OAuth

1. Ir a: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)  
2. Crear **OAuth Client ID → Web Application**  
3. Añadir URI de redirección:  

4. Guardar credenciales: `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`

---

# ⚙️ Variables de entorno

Archivo `.env` en la raíz del backend:
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
SESSION_SECRET=valor_seguro
PORT=9778


---

# 🐳 Levantar la aplicación

Se usan **dos terminales**:

### 1️⃣ Backend + Nginx (Docker Compose)

Levanta:

- Backend (`prodigiosovolcan`) en **9778**  
- Nginx:
  - **80 → HTTPS**  
  - **443 → HTTPS** con certificado  

Acceso: [https://localhost](https://localhost)  
> El backend solo se accede vía Nginx.

### 2️⃣ Frontend

cd front
npm install
npm start

Abre el frontend en [http://localhost:3000], comunicándose con el backend por HTTPS.

---

# 🔐 Flujo SSO

1. Usuario abre frontend  
2. Hace clic en **Iniciar sesión con Google**  
3. Redirige al backend (`/auth/google`)  
4. Google autentica  
5. Backend guarda la sesión  
6. Usuario vuelve al frontend con su **nombre** visible
