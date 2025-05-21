# 🐾 PetHub - Backend

Este es el backend de **PetHub**, una aplicación web para la gestión de mascotas y citas médicas veterinarias. Este servicio permite a los usuarios crear y administrar sus mascotas y citas, mientras que los administradores pueden ver, editar y eliminar cualquier cita registrada.

## 🚀 Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework minimalista para crear el servidor y las rutas.
- **Knex.js**: Query builder para interactuar con la base de datos MySQL.
- **MySQL**: Sistema de gestión de bases de datos relacional.
- **JWT (JSON Web Tokens)**: Para autenticación segura basada en tokens.
- **dotenv**: Para la gestión de variables de entorno.

## 🔐 Autenticación y Roles

- Sistema de login con generación y validación de **tokens JWT**.
- Dos tipos de roles:
  - `USER`: Puede registrar, editar y eliminar sus propias mascotas, y crear citas.
  - `ADMIN`: Puede ver todas las mascotas y editar o eliminar cualquier cita.

## 🧪 Pruebas con Postman

- Se testearon todas las rutas del backend desde **Postman**, incluyendo:
  - Registro e inicio de sesión.
  - Validación de tokens.
  - Pruebas de roles para restringir rutas.
  - Operaciones CRUD para mascotas y citas.

## ⚙️ Variables de entorno

Copiar el archivo `.env.example` como `.env` y completa con tus datos locales:

```bash
cp .env.example .env
```
### 📝 Las variables disponibles incluyen:

```bash
# Puerto donde se ejecuta el servidor
PORT=

# Configuración de la base de datos MySQL
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

# Clave secreta para firmar y verificar los tokens JWT
JWT_SECRET=

```
## 🛠 Instalación y ejecución

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pethub-backend.git

# Entra en la carpeta del proyecto
cd pethub-backend

# Instala las dependencias
npm install

# Ejecuta las migraciones para crear las tablas en la base de datos
npx knex migrate:latest --knexfile knexfile.js

# Crea un archivo .env y configura las variables necesarias
touch .env

# Inicia el servidor (modo desarrollo con nodemon)
npm run dev
```
## Por defecto, el servidor corre en:
📍 http://localhost:3200
