# OrcStore

Tienda online de componentes de computadora. Permite gestionar un catálogo de productos (CPU, GPU, RAM, etc.) con operaciones completas de creación, lectura, actualización y eliminación.

---

## Tecnologías

- **Backend:** Node.js, Express, Mongoose
- **Base de datos:** MongoDB Atlas
- **Frontend:** HTML, CSS, JavaScript, Bootstrap 5

---

## Instalación y ejecución del backend

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Crea el archivo `backend/.env` basándote en `backend/.env.example`:

```
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/orcstore
PORT=3000
```

### 3. Iniciar el servidor

```bash
npm run dev
```

El servidor quedará corriendo en `http://localhost:3000`.

---

## Rutas de la API

Base URL: `http://localhost:3000/api`

| Método   | Ruta                      | Descripción                        |
|----------|---------------------------|------------------------------------|
| `GET`    | `/componentes`            | Obtener todos los componentes      |
| `GET`    | `/componentes/:id`        | Obtener un componente por ID       |
| `POST`   | `/componentes`            | Crear un nuevo componente          |
| `PUT`    | `/componentes/:id`        | Actualizar un componente existente |
| `DELETE` | `/componentes/:id`        | Eliminar un componente             |

### Campos del modelo

| Campo         | Tipo     | Requerido | Descripción                                      |
|---------------|----------|-----------|--------------------------------------------------|
| `nombre`      | String   | Sí        | Nombre del componente                            |
| `categoria`   | String   | Sí        | CPU, GPU, RAM, Almacenamiento, Placa Madre, etc. |
| `precio`      | Number   | Sí        | Precio en USD                                    |
| `descripcion` | String   | Sí        | Descripción del producto                         |
| `imagen`      | String   | No        | URL de la imagen                                 |
| `stock`       | Number   | Sí        | Unidades disponibles (default: 0)                |

### Códigos de respuesta

| Código | Significado                        |
|--------|------------------------------------|
| `200`  | OK — operación exitosa             |
| `201`  | Created — recurso creado           |
| `400`  | Bad Request — datos inválidos      |
| `404`  | Not Found — recurso no encontrado  |
| `500`  | Internal Server Error              |

---

## Estructura del proyecto

```
OrcStore/
├── backend/
│   ├── controllers/
│   │   └── componente.controller.js
│   ├── models/
│   │   └── componente.model.js
│   ├── routes/
│   │   ├── componente.routes.js
│   │   └── index.routes.js
│   ├── server/
│   │   └── server.js
│   ├── db/
│   │   └── cnn_mongodb.js
│   ├── .env.example
│   └── index.js
└── frontend/
    ├── index.html
    ├── inicio.html
    ├── lista.html
    ├── login.html
    ├── about.html
    ├── assets/
    ├── estilos/
    │   └── miestilo.css
    └── js/
        └── miscript.js
```
