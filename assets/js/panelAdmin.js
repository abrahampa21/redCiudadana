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

//Modal constants
const btnLogout = document.getElementById("btn-logout");
const modalLogout = document.getElementById("modal-logout");
const cancelarLogout = document.getElementById("cancelar-logout");

//===SPINER===
//Spinner
function mostrarSpinner() {
  document.getElementById("spinner").classList.remove("hidden");
}

function ocultarSpinner() {
  document.getElementById("spinner").classList.add("hidden");
}

//===DARK MODE===
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Función para cambiar el ícono del botón según el modo
function actualizarIconoDarkMode() {
  if (!darkModeToggle) return;

  const isDarkMode = document.body.classList.contains("dark");
  const icon = darkModeToggle.querySelector("svg");

  if (isDarkMode) {
    // Ícono de sol
    icon.innerHTML = '<circle cx="320" cy="320" r="120"/><path d="M320 40v80M320 520v80M600 320h-80M120 320H40M512.5 127.5l-56.6 56.6M184.1 455.9l-56.6 56.6M512.5 512.5l-56.6-56.6M184.1 184.1l-56.6-56.6" stroke="currentColor" stroke-width="40" stroke-linecap="round" fill="none"/>';
    darkModeToggle.classList.add("active");
  } else {
    // Ícono de luna
    icon.innerHTML = '<path d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C388.8 576 451.3 548.8 497.3 504.6C504.6 497.6 506.7 486.7 502.6 477.5C498.5 468.3 488.9 462.6 478.8 463.4C473.9 463.8 469 464 464 464C362.4 464 280 381.6 280 280C280 207.9 321.5 145.4 382.1 115.2C391.2 110.7 396.4 100.9 395.2 90.8C394 80.7 386.6 72.5 376.7 70.3C358.4 66.2 339.4 64 320 64z"/>';
    darkModeToggle.classList.remove("active");
  }
}

// Alterna el modo al hacer clic
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
    actualizarIconoDarkMode();
  });
}

//===TOAST===
// Toast constants
const toastElement = document.getElementById("error-fetch");
const toastBtnClose = document.getElementById("btn-close");

//==FUNCIONES DEL TOAST==
//=========== FUNCIONES DE TOAST ============
//Mostrar toast
function showToast(message, type = "error") {
  if (!toastElement) return;

  const textToast = document.querySelector(".toast-body");
  const iconToast = document.querySelector(".toast-icon");
  const titleToast = document.querySelector(".toast-title-text");

  textToast.textContent = message;

  // Quitar clases de tipo anteriores
  toastElement.classList.remove("toast-success", "toast-error");

  if (type === "success") {
    toastElement.classList.add("toast-success");
    iconToast.textContent = "✅";
    titleToast.textContent = "Éxito";
  } else {
    toastElement.classList.add("toast-error");
    iconToast.textContent = "⚠️";
    titleToast.textContent = "Error";
  }

  toastElement.classList.add("show");

  // Ocultar automáticamente después de unos segundos
  clearTimeout(showToast._timeoutId);
  showToast._timeoutId = setTimeout(hideToast, 4000);
}
function hideToast() {
  toastElement.classList.remove("show");
}

if (toastBtnClose) {
  toastBtnClose.addEventListener("click", hideToast);
}

//Para el menu toggle responsivo
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (!menuToggle || !sidebar || !overlay) return;

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});

//============FUNCIONES API==============

let reportesCache = [];

//Todos los reportes, todos los usuarios
async function obtenerTodoReportes() {
  try {
    const endpoint = `${BASE_URL}reportes_api.php`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    reportesCache = Array.isArray(data) ? data : [];
    return reportesCache;
  } catch (error) {
    console.error("Error al obtener los reportes:", error);
    reportesCache = [];
    return [];
  }
}

//Normalizar texto para búsquedas
function normalizarTexto(valor) {
  return (valor ?? "").toString().trim().toLowerCase();
}

//Obtener la etiqueta de estado normalizada
function obtenerEtiquetaEstado(valor) {
  const texto = normalizarTexto(valor);
  if (!texto) {
    return "";
  }

  if (texto.includes("pendiente")) return "pendiente";
  if (texto.includes("proceso")) return "en proceso";
  if (texto.includes("resuelto")) return "resuelto";
  if (texto.includes("rechazado")) return "rechazado";
  return texto;
}

//Obtener la etiqueta de prioridad normalizada
function obtenerEtiquetaPrioridad(valor) {
  if (typeof valor === "string") {
    return normalizarTexto(valor);
  }

  switch (Number(valor)) {
    case 1:
      return "baja";
    case 2:
      return "media";
    case 3:
      return "alta";
    default:
      return "";
  }
}

//Crear el modal de detalle de reporte
function crearModalDetalleReporte() {
  let modal = document.getElementById("modal-detalle-reporte");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-detalle-reporte";
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.inset = "0";
    modal.style.background = "rgba(15, 23, 42, 0.65)";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";
    modal.style.padding = "20px";

    modal.innerHTML = `
      <div style="background:#fff;border-radius:16px;max-width:620px;width:100%;padding:24px;box-shadow:0 16px 48px rgba(0,0,0,0.2);position:relative;">
        <button type="button" onclick="cerrarModalReporte()" style="position:absolute;top:14px;right:14px;border:none;background:#f1f5f9;border-radius:999px;padding:6px 10px;cursor:pointer;">✕</button>
        <div id="modal-detalle-contenido"></div>
      </div>
    `;

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        cerrarModalReporte();
      }
    });

    document.body.appendChild(modal);
  }

  return modal;
}

//Cerrar el modal de detalle de reporte
function cerrarModalReporte() {
  const modal = document.getElementById("modal-detalle-reporte");
  if (modal) {
    modal.style.display = "none";
  }
}

//===== SELECTS DE PRIORIDAD Y ESTADO EN EL MODAL =====

let reporteModalActual = null;

// Prioridades fijas (coinciden con obtenerEtiquetaPrioridad: 1=baja, 2=media, 3=alta)
const PRIORIDADES_OPCIONES = [
  { id: 1, nombre: "Baja" },
  { id: 2, nombre: "Media" },
  { id: 3, nombre: "Alta" },
];

function construirOpcionesPrioridad(idActual) {
  return PRIORIDADES_OPCIONES.map(
    (p) =>
      `<option value="${p.id}" ${Number(idActual) === p.id ? "selected" : ""}>${p.nombre}</option>`,
  ).join("");
}

// Reutiliza el endpoint existente (groupby=estado) para sacar la lista de estados reales
async function construirOpcionesEstado(idActual) {
  const estados = await getReportesPorEstado(); // [{id_estado, nombre_categoria, total}]
  return estados
    .map(
      (e) =>
        `<option value="${e.id_estado}" ${Number(idActual) === Number(e.id_estado) ? "selected" : ""}>${e.nombre_categoria}</option>`,
    )
    .join("");
}

//Mostrar información completa de un reporte en modal
async function abrirModalReporte(reporte) {
  reporteModalActual = reporte;

  const modal = crearModalDetalleReporte();
  const contenido = document.getElementById("modal-detalle-contenido");

  if (!contenido) return;

  const categoria = reporte.nombre_categoria || "Sin categoría";
  const rutaEvidencia = reporte.ruta_archivo || "";
  const esImagen = /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(rutaEvidencia);
  const evidencia = rutaEvidencia
    ? esImagen
      ? `<div style="margin-top:12px;"><strong>Imagen del reporte:</strong><br><img src="${rutaEvidencia}" alt="Imagen del reporte" style="max-width:100%;max-height:320px;border-radius:12px;margin-top:8px;object-fit:contain;" /></div>`
      : `<p><strong>Evidencia:</strong> <a href="${rutaEvidencia}" target="_blank" rel="noopener noreferrer">Ver archivo adjunto</a></p>`
    : "<p><strong>Evidencia:</strong> No se adjuntó evidencia.</p>";

  const opcionesPrioridad = construirOpcionesPrioridad(reporte.id_prioridades);
  const opcionesEstado = await construirOpcionesEstado(reporte.id_estado);

  contenido.innerHTML = `
    <h2 style="margin:0 0 12px;font-size:1.3rem;">${reporte.titulo || "Reporte"}</h2>
    <p style="margin:0 0 10px;"><strong>Descripción:</strong> ${reporte.descripcion || "Sin descripción"}</p>
    <p style="margin:0 0 10px;"><strong>Categoría:</strong> ${categoria}</p>
    <p style="margin:0 0 10px;"><strong>Ubicación:</strong> ${reporte.ubicacion || "Sin ubicación"}</p>

    <div style="margin:0 0 10px;">
      <label style="display:block;font-weight:bold;margin-bottom:4px;">Prioridad:</label>
      <select id="select-prioridad-modal" class="filter-select" style="width:100%;">
        ${opcionesPrioridad}
      </select>
    </div>

    <div style="margin:0 0 10px;">
      <label style="display:block;font-weight:bold;margin-bottom:4px;">Estado:</label>
      <select id="select-estado-modal" class="filter-select" style="width:100%;">
        ${opcionesEstado}
      </select>
    </div>

    <p style="margin:0 0 10px;"><strong>Ciudadano:</strong> ${reporte.nombre_ciudadano || "Sin asignar"}</p>
    <p style="margin:0 0 10px;"><strong>Fecha de creación:</strong> ${reporte.fecha_creacion || "Sin fecha"}</p>
    ${evidencia}

    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">
      <button type="button" id="btn-cancelar-reporte" style="background:#dc2626;color:#fff;border:none;padding:8px 18px;border-radius:8px;font-weight:600;cursor:pointer;">Cancelar</button>
      <button type="button" id="btn-confirmar-reporte" style="background:#16a34a;color:#fff;border:none;padding:8px 18px;border-radius:8px;font-weight:600;cursor:pointer;">Guardar</button>
    </div>
  `;

  modal.style.display = "flex";

  document.getElementById("btn-cancelar-reporte").addEventListener("click", cerrarModalReporte);
  document.getElementById("btn-confirmar-reporte").addEventListener("click", solicitarConfirmacionCambios);
}

//===== MODAL DE CONFIRMACIÓN DE CAMBIOS =====

function crearModalConfirmacionCambios() {
  let modal = document.getElementById("modal-confirmar-cambios");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-confirmar-cambios";
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.inset = "0";
    modal.style.background = "rgba(15, 23, 42, 0.65)";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "10000";
    modal.style.padding = "20px";

    modal.innerHTML = `
      <div style="background:#fff;border-radius:14px;max-width:380px;width:100%;padding:24px;box-shadow:0 16px 48px rgba(0,0,0,0.2);">
        <h3 style="margin:0 0 8px;font-size:1.05rem;">¿Confirmar estos cambios?</h3>
        <p style="margin:0 0 20px;color:#64748b;font-size:0.88rem;">Se actualizará el estado y/o la prioridad del reporte.</p>
        <div style="display:flex;gap:10px;justify-content:flex-end;">
          <button type="button" id="btn-confirmacion-no" style="border:1.5px solid #e2e8f0;background:#fff;padding:8px 18px;border-radius:8px;cursor:pointer;font-weight:600;">Cancelar</button>
          <button type="button" id="btn-confirmacion-si" style="background:#16a34a;color:#fff;border:none;padding:8px 18px;border-radius:8px;cursor:pointer;font-weight:600;">Sí, confirmar</button>
        </div>
      </div>
    `;

    modal.addEventListener("click", (event) => {
      if (event.target === modal) cerrarModalConfirmacionCambios();
    });

    document.body.appendChild(modal);
  }

  return modal;
}

function cerrarModalConfirmacionCambios() {
  const modal = document.getElementById("modal-confirmar-cambios");
  if (modal) modal.style.display = "none";
}

function solicitarConfirmacionCambios() {
  const modal = crearModalConfirmacionCambios();
  modal.style.display = "flex";

  document.getElementById("btn-confirmacion-no").onclick = cerrarModalConfirmacionCambios;
  document.getElementById("btn-confirmacion-si").onclick = async () => {
    await guardarCambiosReporte();
    cerrarModalConfirmacionCambios();
  };
}

async function guardarCambiosReporte() {
  if (!reporteModalActual) return;

  const idEstadoSeleccionado = document.getElementById("select-estado-modal").value;
  const idPrioridadSeleccionada = document.getElementById("select-prioridad-modal").value;

  await cambiarEstadoPrioridadReporte(
    reporteModalActual.id_reporte,
    idEstadoSeleccionado,
    idPrioridadSeleccionada,
  );

  cerrarModalReporte();
  reportesCache = [];
  await renderReportes();
}

//PATCH para cambiar el estado y prioridad de un reporte
async function cambiarEstadoPrioridadReporte(id_reporte, id_estado, id_prioridades) {
  try {
    const endpoint = `${BASE_URL}reportes_api.php?id_reporte=${id_reporte}`;
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_estado,
        id_prioridades,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Respuesta del servidor:", data);
  } catch (error) {
    console.error("Error al cambiar el estado y prioridad del reporte:", error);
  }
}

//Limpiar filtros de reportes
function clearFilters() {
  const searchInput = document.getElementById("f-search");
  const estadoSelect = document.getElementById("f-estado");
  const categoriaSelect = document.getElementById("f-cat");
  const prioridadSelect = document.getElementById("f-prio");

  if (searchInput) searchInput.value = "";
  if (estadoSelect) estadoSelect.value = "";
  if (categoriaSelect) categoriaSelect.value = "";
  if (prioridadSelect) prioridadSelect.value = "";

  renderReportes();
}

//Renderizar reportes y filtrar usuarios desde el panel
async function renderReportes() {
  const tbodyReportes = document.getElementById("reportes-tbody");

  if (tbodyReportes) {
    const reportes =
      reportesCache.length > 0 ? reportesCache : await obtenerTodoReportes();
    const textoBusqueda = normalizarTexto(
      document.getElementById("f-search")?.value,
    );
    const estadoFiltro = normalizarTexto(
      document.getElementById("f-estado")?.value,
    );
    const categoriaFiltro = normalizarTexto(
      document.getElementById("f-cat")?.value,
    );
    const prioridadFiltro = normalizarTexto(
      document.getElementById("f-prio")?.value,
    );

    const reportesFiltrados = reportes.filter((reporte) => {
      const titulo = normalizarTexto(reporte.titulo);
      const ubicacion = normalizarTexto(reporte.ubicacion);
      const categoria = normalizarTexto(
        reporte.nombre_categoria || reporte.id_categoria,
      );
      const estado = obtenerEtiquetaEstado(
        reporte.nombre_estado || reporte.id_estado,
      );
      const prioridad = obtenerEtiquetaPrioridad(reporte.id_prioridades);

      const coincideBusqueda =
        !textoBusqueda ||
        titulo.includes(textoBusqueda) ||
        ubicacion.includes(textoBusqueda) ||
        categoria.includes(textoBusqueda);
      const coincideEstado = !estadoFiltro || estado === estadoFiltro;
      const coincideCategoria =
        !categoriaFiltro || categoria === categoriaFiltro;
      const coincidePrioridad =
        !prioridadFiltro || prioridad === prioridadFiltro;

      return (
        coincideBusqueda &&
        coincideEstado &&
        coincideCategoria &&
        coincidePrioridad
      );
    });

    tbodyReportes.innerHTML = "";

    if (!reportesFiltrados.length) {
      const filaVacia = document.createElement("tr");
      filaVacia.innerHTML =
        '<td colspan="6" style="text-align:center;">No se encontraron reportes.</td>';
      tbodyReportes.appendChild(filaVacia);
      return;
    }

    reportesFiltrados.forEach((reporte) => {
      const fila = document.createElement("tr");

      const celdas = [
        reporte.titulo || "Sin título",
        reporte.nombre_categoria || "Sin categoría",
        reporte.ubicacion || "Sin ubicación",
        obtenerEtiquetaPrioridad(reporte.id_prioridades) || "Sin prioridad",
        obtenerEtiquetaEstado(reporte.nombre_estado || reporte.id_estado) ||
          "Sin estado",
      ];

      celdas.forEach((valor) => {
        const celda = document.createElement("td");
        celda.textContent = valor;
        fila.appendChild(celda);
      });

      const celdaAcciones = document.createElement("td");
      const botonDetalle = document.createElement("button");
      botonDetalle.className = "btn btn-primary btn-sm";
      botonDetalle.textContent = "Ver detalle";
      botonDetalle.addEventListener("click", () => abrirModalReporte(reporte));
      celdaAcciones.appendChild(botonDetalle);
      fila.appendChild(celdaAcciones);

      tbodyReportes.appendChild(fila);
    });

    return;
  }

  const tbodyUsuarios = document.getElementById("users-tbody");

  if (tbodyUsuarios) {
    const filas = Array.from(tbodyUsuarios.querySelectorAll("tr"));
    const textoBusqueda = normalizarTexto(
      document.getElementById("f-search")?.value,
    );
    const estadoFiltro = normalizarTexto(
      document.getElementById("f-cat")?.value,
    );

    filas.forEach((fila) => {
      const nombre = normalizarTexto(fila.children[0]?.textContent || "");
      const correo = normalizarTexto(fila.children[1]?.textContent || "");
      const telefono = normalizarTexto(fila.children[2]?.textContent || "");
      const estado = normalizarTexto(fila.children[3]?.textContent || "");

      const coincideBusqueda =
        !textoBusqueda ||
        nombre.includes(textoBusqueda) ||
        correo.includes(textoBusqueda) ||
        telefono.includes(textoBusqueda);
      const coincideEstado = !estadoFiltro || estado === estadoFiltro;

      fila.style.display = coincideBusqueda && coincideEstado ? "" : "none";
    });
  }
}

//Filtrar reporte por estado

//Filtrar reporte por prioridad

//Buscar usuario

//Mostrar usuarios que sean ciudadanos en formato tabla en el panel de administracion
async function getUsuariosCiudadanos() {
  const tbody = document.getElementById("users-tbody");
  if (!tbody) {
    return;
  }
  try {
    const endpoint = `${BASE_URL}usuarios_api.php?id_rol=1`;
    const response = await fetch(endpoint);
    const data = await response.json();
    tbody.innerHTML = "";

    data.forEach((usuario) => {
      const tr = document.createElement("tr");
      const estado = usuario.activo == 1 ? "Activo" : "Inactivo";
      const textoBoton = usuario.activo == 1 ? "Deshabilitar" : "Habilitar";
      const claseBoton = usuario.activo == 1 ? "btn-primary" : "btn-habilitar";

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
    console.error("Error al obtener los usuarios:", error.status);
    return [];
  }
}

//Funcion para deshabilitar o habilitar un usuario
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
    tr.children[3].textContent = nuevoEstado == 1 ? "Activo" : "Inactivo";

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

//GET para obtener el total de reportes por estado
async function getReportesPorEstado() {
  try {
    const endpoint = `${BASE_URL}reportes_api.php?groupby=estado`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los reportes por estado:", error);
    return [];
  }
}

//Mostrar el total de reportes por categoría en el panel de administracion
function mostrarReportesPorCategoria(data) {
  const container = document.getElementById("st-cats");

  if (container) {
    if (!Array.isArray(data) || !data.length) {
      container.innerHTML = '<p class="empty-msg">Sin datos</p>';
      return;
    }

    container.innerHTML = "";
    data.forEach((cat) => {
      const row = document.createElement("div");
      row.className = "priority-row";
      row.innerHTML = `
        <span>${cat.nombre_categoria || "Sin categoría"}</span>
        <span>${cat.total ?? 0}</span>
      `;
      container.appendChild(row);
    });
    return;
  }

  data.forEach((cat) => {
    const span = document.querySelector(
      `[data-id-categoria="${cat.id_categoria}"]`,
    );
    if (span) span.textContent = `${cat.total} reportes`;
  });
}

//Mostrar el total de reportes por estado en el panel de administracion
function mostrarReportesPorEstado(data) {
  const estadoPendiente = document.getElementById("st-pend");
  const estadoProceso = document.getElementById("st-proc");
  const estadoResuelto = document.getElementById("st-res");
  const estadoRechazado = document.getElementById("st-rechazado");

  if (Array.isArray(data)) {
    data.forEach((estado) => {
      const nombreEstado = normalizarTexto(estado.nombre_categoria || estado.nombre || "");

      if (nombreEstado.includes("pendiente") && estadoPendiente) {
        estadoPendiente.textContent = estado.total ?? 0;
      }

      if (nombreEstado.includes("proceso") && estadoProceso) {
        estadoProceso.textContent = estado.total ?? 0;
      }

      if (nombreEstado.includes("resuelto") && estadoResuelto) {
        estadoResuelto.textContent = estado.total ?? 0;
      }

      if (nombreEstado.includes("rechazado") && estadoRechazado) {
        estadoRechazado.textContent = estado.total ?? 0;
      }
    });
  }

  data.forEach((estado) => {
    const span = document.querySelector(
      `[data-id-estado="${estado.id_estado}"]`,
    );
    if (span) span.textContent = `${estado.total} reportes`;
  });
}

//Mostrar el total de reportes por prioridad en el panel de administracion
function mostrarReportesPorPrioridad(reportes) {
  const baja = document.getElementById("st-baja");
  const media = document.getElementById("st-media");
  const alta = document.getElementById("st-alta");
  const total = document.getElementById("st-total");

  let totalBaja = 0;
  let totalMedia = 0;
  let totalAlta = 0;

  reportes.forEach((reporte) => {
    const prioridad = obtenerEtiquetaPrioridad(reporte.id_prioridades);

    if (prioridad === "baja") totalBaja += 1;
    if (prioridad === "media") totalMedia += 1;
    if (prioridad === "alta") totalAlta += 1;
  });

  if (baja) baja.textContent = totalBaja;
  if (media) media.textContent = totalMedia;
  if (alta) alta.textContent = totalAlta;
  if (total) total.textContent = reportes.length;
}

//Mostrar las estadísticas generales del dashboard del panel de administracion
function mostrarEstadisticasDashboard(reportes, categorias, estados) {
  mostrarReportesPorCategoria(categorias);
  mostrarReportesPorEstado(estados);
  mostrarReportesPorPrioridad(reportes);
}

//Mostrar los reportes recientes en el dashboard del panel de administracion
async function getReportesRecientes() {
  try {
    const endpoint = `${BASE_URL}reportes_api.php?recent=true`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const recentReportsContainer = document.getElementById("recent-reports");

    if (recentReportsContainer) {
      recentReportsContainer.innerHTML = "";
      data.forEach((reporte) => {
        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded-lg shadow";
        div.innerHTML = `
        <div class="card-content">
          <h4 class="font-bold">${reporte.titulo}</h4>
          <p>${reporte.descripcion}</p>
          <p><strong>Ubicación:</strong> ${reporte.ubicacion}</p>
          <p><strong>Fecha de creación:</strong> ${reporte.fecha_creacion}</p>
          </div>
        `;
        recentReportsContainer.appendChild(div);
      });
    }
  } catch (error) {
    console.error("Error al obtener los reportes recientes:", error);
  }
}

//=========MIS DATOS (EDITAR DATOS ADMIN)=========
//Actualizar los datos del admin (correo y número de teléfono)
async function actualizarDatosAdmin(correo, numeroTelefono) {
  const datosActualizados = {
    correo: correo,
    telefono: numeroTelefono,
  };
  const btn = document.getElementById("btn-edit");
  btn.disabled = true;
  btn.style.backgroundColor = "#444";
  mostrarSpinner();

  try {
    const endpoint = `${BASE_URL}usuarios_api.php?id_usuario=&accion=datos`;
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    });

    if (response.ok) {
      showToast("Datos actualizados correctamente", "success");
      return;
    } else {
      const errorData = await response.json().catch(() => null);
      const mensaje =
        errorData?.mensaje ||
        response.statusText ||
        "Error al actualizar los datos";
      showToast(mensaje);
    }
  } catch (error) {
    showToast(error.message);
  } finally {
    btn.disabled = false;
    btn.style.backgroundColor = "";
    ocultarSpinner();
  }
}

//Obtener información del Admin logueado
async function obtenerAdminPorId() {
  try {
    const endpoint = `${BASE_URL}usuarios_api.php?id_usuario=`;
    const response = await fetch(endpoint);
    if (response.ok) {
      const admin = await response.json();
      return admin;
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}
//Poblar el formulario de edición con los datos del administrador
async function poblarFormularioEdicion() {
  const administrador = await obtenerAdminPorId();
  if (administrador) {
    document.getElementById("nombre").value = administrador.nombre;
    document.getElementById("correo").value = administrador.correo;
    document.getElementById("telefono").value = administrador.telefono;
    document.getElementById("fecha-registro").value =
      administrador.fecha_registro;
    document.getElementById("rol").value = administrador.nombre_rol;
  } else {
    console.log(
      "Ocurrió un error al llenar el formulario: administrador no encontrado",
    );
  }
}

//=========INICIALIZACIÓN=========
//Inicializar la página de categorías
async function initCategoriasPage() {
  const data = await getReportesPorCategoria();
  mostrarReportesPorCategoria(data);
}

//Inicializar la página de dashboard
async function initDashboardPage() {
  const [dataEstado, dataCategoria, reportes] = await Promise.all([
    getReportesPorEstado(),
    getReportesPorCategoria(),
    obtenerTodoReportes(),
  ]);

  mostrarEstadisticasDashboard(reportes, dataCategoria, dataEstado);
}

//=========EVENTOS=========
document.addEventListener("DOMContentLoaded", async () => {
  if (document.getElementById("reportes-tbody")) {
    await renderReportes();
  }

  const misDatosAdminForm = document.getElementById("mis-datos-form");
  if (misDatosAdminForm) {
    await obtenerAdminPorId().then((id) => {
      if (id) {
        poblarFormularioEdicion(id);
      }
    });
    misDatosAdminForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const correo = document.getElementById("correo").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      actualizarDatosAdmin(correo, telefono);
    });
  }

  if (document.getElementById("users-tbody")) {
    await getUsuariosCiudadanos();
    renderReportes();
  }
  if (document.getElementById("recent-reports")) {
    await getReportesRecientes();
  }

  if (document.getElementById("page-stats")) {
    await initDashboardPage();
  }

  //======== MODAL CIERRE DE SESIÓN ======
  if (btnLogout && modalLogout && cancelarLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      modalLogout.classList.remove("hidden");
      modalLogout.classList.add("flex");
    });

    cancelarLogout.addEventListener("click", () => {
      modalLogout.classList.remove("flex");
      modalLogout.classList.add("hidden");
    });

    modalLogout.addEventListener("click", (e) => {
      if (e.target.id === "modal-logout") {
        modalLogout.classList.remove("flex");
        modalLogout.classList.add("hidden");
      }
    });
  }
  const darkModeGuardado = localStorage.getItem("darkMode") === "true";
  if (darkModeGuardado) {
    document.body.classList.add("dark");
  }
  actualizarIconoDarkMode();

  getReportesPorCategoria();
  initCategoriasPage();
  initDashboardPage();
});