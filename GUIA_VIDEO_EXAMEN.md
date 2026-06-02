# Guion para el video del examen

## Texto sugerido

Hola, mi nombre es [tu nombre] y voy a explicar mi proyecto final en menos de 3 minutos.

El proyecto usa **Node.js, Express y MongoDB** en el backend, y **HTML, CSS, JavaScript y Bootstrap** en el frontend.

En el backend, la estructura está organizada con **modelos, controladores y rutas**. La conexión con MongoDB se inicia en [backend/server/server.js](backend/server/server.js#L12) y se ejecuta con `await` en [backend/server/server.js](backend/server/server.js#L20). La ruta base de la API se define en [backend/server/server.js](backend/server/server.js#L10) y se usa en [backend/server/server.js](backend/server/server.js#L32).

Las operaciones CRUD están en [backend/controllers/componente.controller.js](backend/controllers/componente.controller.js). Los métodos que usan `await` son:

- `getAllComponentes()` en la línea 5.
- `getComponenteById()` en la línea 39.
- `createComponente()` en la línea 46.
- `updateComponente()` en la línea 60.
- `deleteComponente()` en la línea 74.
- `cargarDestacados()` en la línea 94.
- `cargarComponentes()` en la línea 199.
- `confirmarEliminar()` en la línea 212.
- `abrirModalEditar()` en la línea 231.
- `guardarComponente()` en las líneas 266 y 268.

En el frontend, la unión entre backend y frontend se hace cuando se define la API en [frontend/js/miscript.js](frontend/js/miscript.js#L1) y cuando se consume con `fetch` en esas funciones. Además, el HTML carga el script del frontend en [frontend/index.html](frontend/index.html#L61).

Las partes síncronas del frontend son las funciones que manipulan el DOM sin usar `await`, como `renderComponentes()` en [frontend/js/miscript.js](frontend/js/miscript.js#L138), `toggleDescripcion()` en la línea 123 y `abrirModalCrear()` en la línea 219.

En resumen, el backend expone la API y el frontend la consume para listar, crear, editar y eliminar componentes. El proyecto cumple con el CRUD y con la integración entre ambas partes.

## Cierre corto

Gracias por su atención. Ese es el funcionamiento principal de mi proyecto.
