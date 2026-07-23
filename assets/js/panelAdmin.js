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

//Mostrar información completa de un reporte en modal
function abrirModalReporte(reporte) {
  const modal = crearModalDetalleReporte();
  const contenido = document.getElementById("modal-detalle-contenido");

  if (!contenido) {
    return;
  }

  const estado = obtenerEtiquetaEstado(reporte.nombre_estado || reporte.id_estado);
  const prioridad = obtenerEtiquetaPrioridad(reporte.id_prioridades);
  const categoria = reporte.nombre_categoria || "Sin categoría";
  const rutaEvidencia = reporte.ruta_archivo || "";
  const esImagen = /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(rutaEvidencia);
  const evidencia = rutaEvidencia
    ? esImagen
      ? `<div style="margin-top:12px;"><strong>Imagen del reporte:</strong><br><img src="${rutaEvidencia}" alt="Imagen del reporte" style="max-width:100%;max-height:320px;border-radius:12px;margin-top:8px;object-fit:contain;" /></div>`
      : `<p><strong>Evidencia:</strong> <a href="${rutaEvidencia}" target="_blank" rel="noopener noreferrer">Ver archivo adjunto</a></p>`
    : "<p><strong>Evidencia:</strong> No se adjuntó evidencia.</p>";

  contenido.innerHTML = `
    <h2 style="margin:0 0 12px;font-size:1.3rem;">${reporte.titulo || "Reporte"}</h2>
    <p style="margin:0 0 10px;"><strong>Descripción:</strong> ${reporte.descripcion || "Sin descripción"}</p>
    <p style="margin:0 0 10px;"><strong>Categoría:</strong> ${categoria}</p>
    <p style="margin:0 0 10px;"><strong>Ubicación:</strong> ${reporte.ubicacion || "Sin ubicación"}</p>
    <p style="margin:0 0 10px;"><strong>Prioridad:</strong> ${prioridad || "Sin prioridad"}</p>
    <p style="margin:0 0 10px;"><strong>Estado:</strong> ${estado || "Sin estado"}</p>
    <p style="margin:0 0 10px;"><strong>Ciudadano:</strong> ${reporte.nombre_ciudadano || "Sin asignar"}</p>
    <p style="margin:0 0 10px;"><strong>Fecha de creación:</strong> ${reporte.fecha_creacion || "Sin fecha"}</p>
    ${evidencia}
  `;

  modal.style.display = "flex";
}

//Cerrar el modal de detalle de reporte
function cerrarModalReporte() {
  const modal = document.getElementById("modal-detalle-reporte");
  if (modal) {
    modal.style.display = "none";
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
    const reportes = reportesCache.length > 0 ? reportesCache : await obtenerTodoReportes();
    const textoBusqueda = normalizarTexto(document.getElementById("f-search")?.value);
    const estadoFiltro = normalizarTexto(document.getElementById("f-estado")?.value);
    const categoriaFiltro = normalizarTexto(document.getElementById("f-cat")?.value);
    const prioridadFiltro = normalizarTexto(document.getElementById("f-prio")?.value);

    const reportesFiltrados = reportes.filter((reporte) => {
      const titulo = normalizarTexto(reporte.titulo);
      const ubicacion = normalizarTexto(reporte.ubicacion);
      const categoria = normalizarTexto(reporte.nombre_categoria || reporte.id_categoria);
      const estado = obtenerEtiquetaEstado(reporte.nombre_estado || reporte.id_estado);
      const prioridad = obtenerEtiquetaPrioridad(reporte.id_prioridades);

      const coincideBusqueda =
        !textoBusqueda ||
        titulo.includes(textoBusqueda) ||
        ubicacion.includes(textoBusqueda) ||
        categoria.includes(textoBusqueda);
      const coincideEstado = !estadoFiltro || estado === estadoFiltro;
      const coincideCategoria = !categoriaFiltro || categoria === categoriaFiltro;
      const coincidePrioridad = !prioridadFiltro || prioridad === prioridadFiltro;

      return coincideBusqueda && coincideEstado && coincideCategoria && coincidePrioridad;
    });

    tbodyReportes.innerHTML = "";

    if (!reportesFiltrados.length) {
      const filaVacia = document.createElement("tr");
      filaVacia.innerHTML = '<td colspan="6" style="text-align:center;">No se encontraron reportes.</td>';
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
        obtenerEtiquetaEstado(reporte.nombre_estado || reporte.id_estado) || "Sin estado",
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
    const textoBusqueda = normalizarTexto(document.getElementById("f-search")?.value);
    const estadoFiltro = normalizarTexto(document.getElementById("f-cat")?.value);

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
  data.forEach((cat) => {
    const span = document.querySelector(
      `[data-id-categoria="${cat.id_categoria}"]`,
    );
    if (span) span.textContent = `${cat.total} reportes`;
  });
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

//Mostrar el total de reportes por estado en el panel de administracion
function mostrarReportesPorEstado(data) {
  data.forEach((estado) => {
    const span = document.querySelector(`[data-id-estado="${estado.id_estado}"]`);
    if (span) span.textContent = `${estado.total} reportes`;
  });
}


//=========INICIALIZACIÓN=========
//Inicializar la página de categorías
async function initCategoriasPage() {
  const data = await getReportesPorCategoria();
  mostrarReportesPorCategoria(data);
}

//Inicializar la página de dashboard
async function initDashboardPage() {
  const dataEstado = await getReportesPorEstado();
  mostrarReportesPorEstado(dataEstado);
}

//=========EVENTOS=========
document.addEventListener("DOMContentLoaded", async () => {
  if (document.getElementById("reportes-tbody")) {
    await renderReportes();
  }

  if (document.getElementById("users-tbody")) {
    await getUsuariosCiudadanos();
    renderReportes();
  }
  if (document.getElementById("recent-reports")) {
    await getReportesRecientes();
  }

  getReportesPorCategoria();
  initCategoriasPage();
  initDashboardPage();
});
