const BASE_URL = "http://localhost/redCiudadana/src/api/";

const days = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

//============FUNCIONES API==============

//Todos los reportes, todos los usuarios
async function obtenerTodoReportes() {
  try {
    const endpoint = `${BASE_URL}reportes_api.php`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const reportes = await response.json();
    const filteredReportes = (Array.isArray(reportes) ? reportes : []).filter((reporte) =>
      matchesReportFilters(reporte, filters)
    );

    if (!filteredReportes.length) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center">No se encontraron reportes.</td></tr>`;
      return;
    }

    tbody.innerHTML = "";
    filteredReportes.forEach((reporte) => tbody.appendChild(buildReportRow(reporte)));
  } catch (error) {
    console.error("Error en panelAdmin, renderReportes: ", error);
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">Error al cargar los reportes.</td></tr>`;
    showToast("No se pudieron cargar los reportes.");
  }
}

// Resetea todos los filtros y vuelve a cargar la lista de reportes.
function clearFilters() {
  const search = document.getElementById("f-search");
  const estado = document.getElementById("f-estado");
  const categoria = document.getElementById("f-cat");
  const prioridad = document.getElementById("f-prio");

  if (search) search.value = "";
  if (estado) estado.value = "";
  if (categoria) categoria.value = "";
  if (prioridad) prioridad.value = "";

  renderReportes();
}

// Crea el DOM del modal de detalle de reporte la primera vez que se abre.
function createReportModalDOM() {
  if (document.getElementById("modal-reporte")) return;

  const modal = document.createElement("div");
  modal.id = "modal-reporte";
  modal.className = "overlay";
  modal.innerHTML = `
    <div class="modal">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h2 style="margin:0; font-size:1.15rem;">Detalle del reporte</h2>
        <button class="btn-close" aria-label="Cerrar">&times;</button>
      </div>
      <img id="detalle-imagen" src="https://via.placeholder.com/640x400?text=Sin+evidencia" alt="Foto del reporte" style="width:100%; height:220px; object-fit:cover; border-radius:14px; margin-bottom:16px; background:#f3f4f6;" />
      <div style="display:grid; gap:12px;">
        <div>
          <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Título</p>
          <h3 id="detalle-titulo" style="margin:0; font-size:1.1rem;">-</h3>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div>
            <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Estado</p>
            <span id="detalle-estado" style="display:inline-block; margin-top:4px; padding:6px 12px; border-radius:999px; font-size:0.85rem; background:#e2e8f0; color:#1f2937;"></span>
          </div>
          <div>
            <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Prioridad</p>
            <p id="detalle-prioridad" style="margin:4px 0 0 0; font-weight:700;"></p>
          </div>
        </div>
        <div>
          <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Categoría</p>
          <p id="detalle-categoria" style="margin:0; font-weight:600;"></p>
        </div>
        <div>
          <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Ubicación</p>
          <p id="detalle-ubicacion" style="margin:0;"></p>
        </div>
        <div>
          <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Descripción</p>
          <p id="detalle-descripcion" style="margin:0; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px; white-space:pre-wrap;"></p>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div>
            <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Reportado por</p>
            <p id="detalle-ciudadano" style="margin:0;"></p>
          </div>
          <div>
            <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Fecha</p>
            <p id="detalle-fecha" style="margin:0;"></p>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest(".btn-close")) {
      closeReportModal();
    }
  });

  document.body.appendChild(modal);
}

// Da formato legible a la fecha del reporte.
function formatDate(value) {
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

// Abre el modal y rellena todos los campos con la información del reporte.
function openReportModal(reporte) {
  createReportModalDOM();

  const modal = document.getElementById("modal-reporte");
  if (!modal) return;

  modal.querySelector("#detalle-titulo").textContent = reporte.titulo ?? "Sin título";
  modal.querySelector("#detalle-categoria").textContent = reporte.nombre_categoria ?? "Sin categoría";
  modal.querySelector("#detalle-ubicacion").textContent = reporte.ubicacion ?? "Sin ubicación";
  modal.querySelector("#detalle-estado").textContent = reporte.nombre_estado ?? "Sin estado";
  modal.querySelector("#detalle-estado").className = "inline-block mt-1 px-3 py-1 rounded-full font-medium " + getStatusClass(reporte.nombre_estado);
  modal.querySelector("#detalle-prioridad").textContent = getPriorityLabel(reporte.id_prioridades);
  modal.querySelector("#detalle-descripcion").textContent = reporte.descripcion ?? "Sin descripción";
  modal.querySelector("#detalle-ciudadano").textContent = reporte.nombre_ciudadano ?? "Desconocido";
  modal.querySelector("#detalle-fecha").textContent = formatDate(reporte.fecha_creacion) || "Sin fecha";

  const image = modal.querySelector("#detalle-imagen");
  if (reporte.ruta_archivo) {
    let src = reporte.ruta_archivo;
    if (!src.startsWith("http")) {
      src = `${BASE_URL_UPLOADS}${src.replace(/^\/+/, "")}`;
    }
    image.src = src;
    image.alt = `Evidencia de ${reporte.titulo}`;
  } else {
    image.src = "https://via.placeholder.com/640x400?text=Sin+evidencia";
    image.alt = "Sin evidencia";
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

// Cierra el modal de reporte y restaura el scroll de la página.
function closeReportModal() {
  const modal = document.getElementById("modal-reporte");
  if (!modal) return;

  modal.classList.remove("open");
  document.body.style.overflow = "";
}

function closeModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  if (!modalOverlay) return;

  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

window.closeReportModal = closeReportModal;
window.closeModal = closeModal;

// Carga usuarios ciudadanos desde la API y los filtra según la búsqueda.
async function renderUsuarios() {
  const tbody = document.getElementById("users-tbody");
  if (!tbody) {
    return;
  }
  try {
    const endpoint = `${BASE_URL}usuarios_api.php?id_rol=1`;
    const response = await fetch(endpoint);
    const data = await response.json();
    tbody.innerHTML = "";
    if (!results.length) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center">No se encontraron usuarios.</td></tr>`;
      return;
    }

    results.forEach((usuario) => {
      const activo = usuario.activo === "1" || usuario.activo === 1;
      const textoBoton = activo ? "Deshabilitar" : "Habilitar";
      const claseBoton = activo ? "btn-primary" : "btn-habilitar";

      const tr = document.createElement("tr");
      tr.innerHTML = `
      <tr>
    <td>${usuario.nombre}</td>
    <td>${usuario.correo}</td>
    <td>${usuario.telefono}</td>
    <td>${estado}</td>
    <td>${usuario.fecha_registro}</td>
    <td>
      <button class="btn ${claseBoton} btn-sm" data-id="${usuario.id_usuario}"
        onclick="deshabilitarUsuario(${usuario.id_usuario}, ${usuario.activo}, this)">
        ${textoBoton}
      </button>
    </td>
      </tr>
  `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error en panelAdmin, renderUsuarios: ", error);
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">Error al cargar los usuarios.</td></tr>`;
    showToast("No se pudieron cargar los usuarios.");
  }
}

// Funcion para deshabilitar o habilitar un usuario
async function deshabilitarUsuario(id, activoActual, btn) {
  const nuevoEstado = activoActual == 1 ? 0 : 1;

  try {
    const response = await fetch(
      `${BASE_URL}usuarios_api.php?id_usuario=${id}&accion=estado`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: nuevoEstado }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error al actualizar:", data.mensaje);
      return;
    }

    const tr = btn.closest("tr");
    const cells = tr.querySelectorAll("td");
    if (cells.length >= 5) {
      cells[4].textContent = nuevoEstado == 1 ? "Activo" : "Inactivo";
    }

    btn.textContent = nuevoEstado == 1 ? "Deshabilitar" : "Habilitar";

    btn.classList.remove(nuevoEstado == 1 ? "btn-habilitar" : "btn-primary");
    btn.classList.add(nuevoEstado == 1 ? "btn-primary" : "btn-habilitar");

    btn.setAttribute(
      "onclick",
      `deshabilitarUsuario(${id}, ${nuevoEstado}, this)`,
    );
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
}

//GET para obtener el total de reportes por categoría
async function getReportesPorCategoria() {
  try {
    const endpoint = `${BASE_URL}reportes_api.php?groupby=categoria`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los reportes por categoría:", error);
    return [];
  }
}
//Mostrar el total de reportes por categoría en el panel de administracion
function mostrarReportesPorCategoria(data) {
  data.forEach((cat) => {
    const span = document.querySelector(
      `[data-id-categoria="${cat.id_categoria}"]`,
    );
    if (span) span.textContent = `${cat.total} reportes`;
  });
}

//Inicializar la página de categorías
async function initCategoriasPage() {
  const data = await getReportesPorCategoria();
  mostrarReportesPorCategoria(data);
}

//=========EVENTOS=========
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("tabla-reportes")) {
    renderReportes();
  }

  if (document.getElementById("tabla-usuarios")) {
    const searchUsers = document.getElementById("search-users");
    if (searchUsers) {
      searchUsers.addEventListener("input", renderUsuarios);
    }
    renderUsuarios();
  }

  if (document.querySelector("[data-id-categoria]")) {
    initCategoriasPage();
  }
});
