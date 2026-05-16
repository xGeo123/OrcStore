const API_URL = "http://localhost:3000/api/componentes";

async function cargarPagina(pagina) {
  try {
    const response = await fetch(pagina);
    const data = await response.text();
    document.getElementById("contenido").innerHTML = data;
    if (pagina === "lista.html") {
      cargarComponentes();
    }
  } catch (error) {
    document.getElementById("contenido").innerHTML =
      '<div class="container mt-5"><div class="alert alert-danger">Error al cargar la página.</div></div>';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  cargarPagina("inicio.html");
});

async function getAllComponentes() {
  const response = await fetch(API_URL);
  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`Error ${response.status}`);
  const data = await response.json();
  return data.componentes;
}

async function getComponenteById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error(`Error ${response.status}`);
  const data = await response.json();
  return data.componente;
}

async function createComponente(body) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.msg || `Error ${response.status}`);
  }
  const data = await response.json();
  return data.componente;
}

async function updateComponente(id, body) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.msg || `Error ${response.status}`);
  }
  const data = await response.json();
  return data.componente;
}

async function deleteComponente(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.msg || `Error ${response.status}`);
  }
  return true;
}

function renderComponentes(componentes) {
  const grid = document.getElementById("productos-grid");
  if (!grid) return;

  if (componentes.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-secondary fs-5">No hay componentes en el catálogo todavía.</p>
        <button class="btn btn-danger mt-2" onclick="abrirModalCrear()">+ Agregar el primero</button>
      </div>`;
    return;
  }

  grid.innerHTML = componentes
    .map(
      (c) => `
    <div class="col" id="card-${c._id}">
      <div class="card card-product h-100 shadow-sm">
        <img src="${c.imagen || "https://placehold.co/400x220/1a1a1a/555?text=Sin+imagen"}"
             class="card-img-top product-img" alt="${c.nombre}"
             onerror="this.src='https://placehold.co/400x220/1a1a1a/555?text=Sin+imagen'">
        <div class="card-body d-flex flex-column">
          <span class="badge bg-secondary mb-2 align-self-start">${c.categoria}</span>
          <h5 class="card-title fw-bold">${c.nombre}</h5>
          <h6 class="text-danger mb-2">$${c.precio.toLocaleString("en-US")}</h6>
          <p class="card-text text-secondary small flex-grow-1">${c.descripcion}</p>
          <p class="text-secondary small mb-3">Stock: <span class="${c.stock > 0 ? "text-success" : "text-danger"}">${c.stock > 0 ? c.stock + " unidades" : "Sin stock"}</span></p>
          <div class="d-flex gap-2 mt-auto">
            <button class="btn btn-outline-light btn-sm w-50" onclick="abrirModalEditar('${c._id}')">Editar</button>
            <button class="btn btn-danger btn-sm w-50" onclick="confirmarEliminar('${c._id}', '${c.nombre.replace(/'/g, "\\'")}')">Eliminar</button>
          </div>
        </div>
      </div>
    </div>`
    )
    .join("");
}

async function cargarComponentes() {
  const grid = document.getElementById("productos-grid");
  if (!grid) return;

  grid.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
      <p class="text-secondary mt-3">Cargando componentes...</p>
    </div>`;

  try {
    const componentes = await getAllComponentes();
    renderComponentes(componentes);
  } catch (error) {
    grid.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger">Error al conectar con la API: ${error.message}</div>
      </div>`;
  }
}

async function confirmarEliminar(id, nombre) {
  if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;
  try {
    await deleteComponente(id);
    cargarComponentes();
  } catch (error) {
    alert("Error al eliminar: " + error.message);
  }
}

function abrirModalCrear() {
  document.getElementById("modal-titulo").textContent = "Agregar Componente";
  document.getElementById("form-componente").reset();
  document.getElementById("componente-id").value = "";
  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modalComponente")
  );
  modal.show();
}

async function abrirModalEditar(id) {
  try {
    const c = await getComponenteById(id);
    document.getElementById("modal-titulo").textContent = "Editar Componente";
    document.getElementById("componente-id").value = c._id;
    document.getElementById("campo-nombre").value = c.nombre;
    document.getElementById("campo-categoria").value = c.categoria;
    document.getElementById("campo-precio").value = c.precio;
    document.getElementById("campo-descripcion").value = c.descripcion;
    document.getElementById("campo-imagen").value = c.imagen || "";
    document.getElementById("campo-stock").value = c.stock;
    const modal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("modalComponente")
    );
    modal.show();
  } catch (error) {
    alert("Error al cargar el componente: " + error.message);
  }
}

async function guardarComponente() {
  const id = document.getElementById("componente-id").value;
  const body = {
    nombre: document.getElementById("campo-nombre").value.trim(),
    categoria: document.getElementById("campo-categoria").value,
    precio: parseFloat(document.getElementById("campo-precio").value),
    descripcion: document.getElementById("campo-descripcion").value.trim(),
    imagen: document.getElementById("campo-imagen").value.trim(),
    stock: parseInt(document.getElementById("campo-stock").value),
  };

  const btnGuardar = document.getElementById("btn-guardar");
  btnGuardar.disabled = true;
  btnGuardar.textContent = "Guardando...";

  try {
    if (id) {
      await updateComponente(id, body);
    } else {
      await createComponente(body);
    }
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalComponente")
    );
    modal.hide();
    cargarComponentes();
  } catch (error) {
    alert("Error al guardar: " + error.message);
  } finally {
    btnGuardar.disabled = false;
    btnGuardar.textContent = "Guardar";
  }
}
