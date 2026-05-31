# Password Manager

Proyecto de gestión segura de contraseñas desarrollado con React, FastAPI, SQLite, Argon2id y AES-GCM.

## Tecnologías

### Frontend

* React
* Vite
* Axios

### Backend

* FastAPI
* SQLAlchemy

### Base de Datos

* SQLite

### Criptografía

* Argon2id (Derivación de claves)
* AES-256-GCM (Cifrado autenticado)

---

# Requisitos

Instalar:

* Node.js
* Python 3.11 o superior
* Git

---

# Clonar repositorio

```bash
git clone <https://github.com/diegorivadeneyra/password-manager.git>
cd password-manager
```

---

# Configurar Frontend

Entrar a la carpeta frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

El frontend estará disponible en:

```text
http://localhost:5173
```

---

# Configurar Backend

Abrir otra terminal y entrar a la carpeta backend:

```bash
cd backend
```

Crear entorno virtual:

### Windows

```bash
python -m venv venv
```

Activar:

#### Git Bash

```bash
source venv/Scripts/activate
```

#### PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

---

Instalar dependencias:

```bash
pip install -r requirements.txt
```

---

Ejecutar FastAPI:

```bash
uvicorn main:app --reload
```

Backend disponible en:

```text
http://127.0.0.1:8000
```

---

# Documentación API

FastAPI genera documentación automática:

```text
http://127.0.0.1:8000/docs
```

---

# Estructura del Proyecto

```text
password-manager/
│
├── frontend/
│
├── backend/
│
├── .gitignore
├── README.md
└── requirements.txt
```

---

# Estado Actual

* [x] Configuración inicial
* [x] React + Vite
* [x] FastAPI
* [ ] Registro de usuarios
* [ ] Login
* [ ] Gestión de contraseñas
* [ ] Argon2id
* [ ] AES-GCM

```
```
