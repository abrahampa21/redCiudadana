const BASE_URL = "http://localhost/redCiudadana/src/api/";
const BASE_URL_UPLOADS = "http://localhost/redciudadana/src/"; //Para las imágenes
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
const dashDate = document.getElementById("dash-date");
const date = new Date();
// Toast constants
const toastElement = document.getElementById("error-fetch");
const toastBtnClose = document.getElementById("btn-close");
//Dashboard constants
const reportesContainer = document.getElementById("reportes-container");
const estadoSelect = document.getElementById("estado-select");
const categoriaSelect = document.getElementById("categoria-select");
const buscarReporte = document.getElementById("buscar-reporte");
const cleanFilters = document.getElementById("clean-filter");
//Modal constants
const btnLogout = document.getElementById("btn-logout");
const modalLogout = document.getElementById("modal-logout");
const cancelarLogout = document.getElementById("cancelar-logout");

const nuevoReporteForm = document.getElementById("nuevo-reporte");

//Spinner
function mostrarSpinner() {
  document.getElementById("spinner").classList.remove("hidden");
}

function ocultarSpinner() {
  document.getElementById("spinner").classList.add("hidden");
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

//Card para cada reporte
function createReporteCard(reporte) {
  const reportesContainer = document.getElementById("reportes-container");
  const cardReporte = document.createElement("div");
  cardReporte.classList.add("card-reporte");

  const estados = {
    Pendiente: "bg-yellow-100 text-yellow-800",
    "En proceso": "bg-blue-100 text-blue-800",
    Resuelto: "bg-green-100 text-green-800",
    Rechazado: "bg-red-100 text-red-800",
  };

  const estadoBG =
    estados[reporte.nombre_estado] || "bg-slate-100 text-slate-800";

  const imagenSrc = reporte.ruta_archivo
    ? `${BASE_URL_UPLOADS}${reporte.ruta_archivo}`
    : "ruta/a/imagen-default.png";

  cardReporte.innerHTML = `
    <div class='card-body h-full shadow-sm overflow-hidden flex flex-col gap-4 rounded-lg'>
      <img src='${imagenSrc}' class='w-full h-56 object-center object-cover bg-slate-100' alt='Imagen como evidencia del reporte'>
      <h2 class='text-lg font-semibold text-slate-800 line-clamp-2'>${reporte.titulo}</h2>
      <h3 class='inline-block px-3 py-1 rounded-full font-medium ${estadoBG}'>
        ${reporte.nombre_estado}
      </h3>
      <button class='btn-details mt-auto w-full bg-[#1f2a4d] hover:bg-[#16203b] text-white font-medium py-2.5 rounded-lg transition-colors duration-200 cursor-pointer'>Más detalles</button>
    </div>
  `;

  reportesContainer.appendChild(cardReporte);

  const btnDetails = cardReporte.querySelector(".btn-details");
  btnDetails.addEventListener("click", () => {
    abrirModal(reporte);
  });
}
//======== FUNCIONES Y VALIDACIÓN PARA MODAL ============
//Abrir modal
function abrirModal(reporte) {
  const modalReporte = document.getElementById("modal-reporte");

  document.getElementById("detalle-titulo").textContent = reporte.titulo;
  document.getElementById("detalle-estado").textContent = reporte.nombre_estado;
  document.getElementById("detalle-categoria").textContent =
    reporte.nombre_categoria;
  document.getElementById("detalle-descripcion").textContent =
    reporte.descripcion;

  const detalleImagen = document.getElementById("detalle-imagen");
  detalleImagen.src = reporte.ruta_archivo
    ? `${BASE_URL_UPLOADS}${reporte.ruta_archivo}`
    : "ruta/a/imagen-default.png";

  modalReporte.classList.remove("hidden");
  modalReporte.classList.add("flex");
}

//Cerrar modal
function cerrarModal() {
  const modalReporte = document.getElementById("modal-reporte");

  modalReporte.classList.remove("flex");
  modalReporte.classList.add("hidden");
}

//Validación para que al ser nulos el toast y modal, no interfieran en las otras secciones
//Botones cerrar modal
const cerrarModalBtn = document.getElementById("cerrar-modal");
const cerrarModalFooterBtn = document.getElementById("cerrar-modal-footer");
const modalReporteEl = document.getElementById("modal-reporte");

if (cerrarModalBtn && cerrarModalFooterBtn && modalReporteEl) {
  cerrarModalBtn.addEventListener("click", cerrarModal);
  cerrarModalFooterBtn.addEventListener("click", cerrarModal);

  //Cerrar modal fuera de ello
  modalReporteEl.addEventListener("click", (e) => {
    if (e.target.id === "modal-reporte") {
      cerrarModal();
    }
  });
}

//========== DASHBOARD ==========
//Para mostrar los últimos 5 en el dashboard
function mostrarReportesRecientes(reportes) {
  const reportesContainer = document.getElementById("recent-list");
  reportesContainer.innerHTML = "";

  if (reportes.length === 0) {
    reportesContainer.innerHTML = `<p class="empty-msg text-slate-500 text-[0.85rem]">
    No hay reportes aún. </p>`;
    return;
  }

  const estados = {
    Pendiente: "bg-yellow-100 text-yellow-800",
    "En proceso": "bg-blue-100 text-blue-800",
    Resuelto: "bg-green-100 text-green-800",
    Rechazado: "bg-red-100 text-red-800",
  };

  reportes.forEach((reporte) => {
    const estadoBG =
      estados[reporte.nombre_estado] || "bg-slate-100 text-slate-800";
    const item = document.createElement("div");
    item.classList.add("flex", "items-center", "justify-between", "py-3");

    item.innerHTML = `
      <div>
        <p class='font-medium text-slate-800 text-sm'>${reporte.titulo}</p>
        <p class='text-xs text-slate-500'>${reporte.nombre_categoria}</p>
      </div>
      <span class='inline-block px-3 py-1 rounded-full text-xs font-medium ${estadoBG}'>
        ${reporte.nombre_estado}
      </span>
    `;

    reportesContainer.appendChild(item);
  });
}

//======== APIS PARA CIUDADANOS =============
//Mostrar reportes
async function obtenerReportes() {
  try {
    const endpoint = `${BASE_URL}reportes_api.php?id_usuario=`;
    const response = await fetch(endpoint);

    mostrarSpinner();

    if (response.ok) {
      const reportes = await response.json();

      if (reportes.length === 0) {
        reportesContainer.innerHTML = `
          <p class='col-span-full text-slate-500 text-center py-8'>Aún no tienes reportes registrados.</p>
        `;
        return;
      }

      reportes.forEach((reporte) => {
        createReporteCard(reporte);
      });
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  } finally {
    ocultarSpinner();
  }
}

async function reportesDashboard() {
  try {
    const endpoint = `${BASE_URL}reportes_api.php?id_usuario=`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const reportes = await response.json();

      //Counters
      const total = reportes.length;
      const pendientes = reportes.filter(
        (reporte) => reporte.nombre_estado === "Pendiente",
      ).length;
      const enProceso = reportes.filter(
        (reporte) => reporte.nombre_estado === "En proceso",
      ).length;
      const resueltos = reportes.filter(
        (reporte) => reporte.nombre_estado === "Resuelto",
      ).length;
      const rechazados = reportes.filter(
        (reporte) => reporte.nombre_estado === "Rechazado",
      ).length;

      document.getElementById("total").textContent = total;
      document.getElementById("pendientes").textContent = pendientes;
      document.getElementById("en-proceso").textContent = enProceso;
      document.getElementById("resueltos").textContent = resueltos;
      document.getElementById("rechazados").textContent = rechazados;

      const recientes = [...reportes]
        .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))
        .slice(0, 5);

      mostrarReportesRecientes(recientes);
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Filtrar reporte por estado
async function filtrarPorEstado(estado) {
  try {
    const endpoint = `${BASE_URL}reportes_api.php?id_estado=${estado}`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const reportes = await response.json();
      reportesContainer.innerHTML = "";

      //En caso de no tener ningún reporte de ese estado
      if (reportes.length === 0) {
        return;
      }

      reportes.forEach((reporte) => {
        createReporteCard(reporte);
      });
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Filtrar reporte por categoria
async function filtrarPorCategoria(categoria) {
  try {
    const endpoint = `${BASE_URL}reportes_api.php?id_categoria=${categoria}`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const reportes = await response.json();
      reportesContainer.innerHTML = "";

      //En caso de no tener ningún reporte de esa categoria
      if (reportes.length === 0) {
        return;
      }

      reportes.forEach((reporte) => {
        createReporteCard(reporte);
      });
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Buscar por título
async function buscarPorTitulo(reporte) {
  try {
    const endpoint = `${BASE_URL}reportes_api.php?buscar=${encodeURIComponent(reporte)}`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const reportes = await response.json();
      reportesContainer.innerHTML = "";
      reportes.forEach((reporte) => {
        createReporteCard(reporte);
      });
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Mostrar evidencia
async function obtenerEvidencias() {
  try {
    const endpoint = `${BASE_URL}evidencias_api.php`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const reportes = await response.json();

      reportes.forEach((reporte) => {
        createReporteCard(reporte);
      });
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Crear reportes
async function crearReporte(datos) {
  mostrarSpinner();
  const btn = document.getElementById("submit-reporte");
  btn.disabled = true;
  try {
    const endpoint = `${BASE_URL}reportes_api.php`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(datos),
    });

    if (response.ok) {
      const reporteCreado = await response.json();
      return await reporteCreado;
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  } finally {
    btn.disabled = false;
    ocultarSpinner();
  }
}

//Subir la imagen de la evidencia
async function subirEvidenciaImagen(imagen) {
  try {
    const formData = new FormData();
    formData.append("evidencia", imagen);

    const endpoint = `${BASE_URL}subir_evidencia_api.php`;
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const imagenSubida = await response.json();
      return await imagenSubida;
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Crear evidencia (para el registro en base de datos)
async function crearEvidencia(id_reporte, nombre_archivo, ruta_archivo) {
  const datosEvidencia = {
    titulo: nombre_archivo,
    descripcion: ruta_archivo,
  };
  try {
    const endpoint = `${BASE_URL}evidencias_api.php?id_reporte=${id_reporte}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(datosEvidencia),
    });

    if (response.ok) {
      const evidenciaCreada = await response.json();
      return await evidenciaCreada;
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Obtener información del ciudadano logueado
async function obtenerCiudadanoPorId() {
  try {
    const endpoint = `${BASE_URL}usuarios_api.php?id_usuario=`;
    const response = await fetch(endpoint);
    if (response.ok) {
      const ciudadano = await response.json();
      return ciudadano;
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Actualizar información del usuario (solo email y número de teléfono)
async function actualizarDatosCiudadano(correo, numeroTelefono) {
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

// ======= FUNCIONES AUXILIARES/REUTILIZABLES ============
async function poblarFormularioEdicion() {
  const ciudadano = await obtenerCiudadanoPorId();
  if (ciudadano) {
    document.getElementById("nombre").value = ciudadano.nombre;
    document.getElementById("correo").value = ciudadano.correo;
    document.getElementById("telefono").value = ciudadano.telefono;
    document.getElementById("fecha-registro").value = ciudadano.fecha_registro;
    document.getElementById("rol").value = ciudadano.nombre_rol;
  } else {
    console.log(
      "Ocurrió un error al llenar el formulario: ciudadano no encontrado",
    );
  }
}

async function handlerCrearReporte() {
  const reporteForm = document.getElementById("nuevo-reporte");
  const titulo = reporteForm.titulo.value.trim();
  const descripcion = reporteForm.descripcion.value.trim();
  const ubicacion = reporteForm.ubicacion.value.trim();
  const id_categoria = reporteForm.id_categoria.value;
  const evidencia = reporteForm.evidencia.files[0];

  if (!titulo || !descripcion || !ubicacion || !id_categoria || !evidencia) {
    showToast("Todos los campos son obligatorios");
    return;
  }

  try {
    // Subiendo la evidencia
    const { nombre_archivo, ruta_archivo } =
      await subirEvidenciaImagen(evidencia);

    //Subiendo el reporte
    const { id_reporte } = await crearReporte({
      titulo,
      descripcion,
      ubicacion,
      id_categoria,
      id_prioridades: null,
      id_estado: 1,
    });

    //Creando la evidencia asociada al reporte
    await crearEvidencia(id_reporte, nombre_archivo, ruta_archivo);

    showToast("Reporte creado exitosamente", "success");
    reporteForm.reset();
  } catch (error) {
    console.error(error.message);
  }
}

//Evento que carga la función obtenerReportes si encuentra el contenedor
document.addEventListener("DOMContentLoaded", () => {
  if (reportesContainer) {
    obtenerReportes();
  }

  //Para mostrar la fecha en el dashboard
  if (dashDate) {
    dashDate.textContent = `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  }

  const dashboardTotal = document.getElementById("total");
  if (dashboardTotal) {
    reportesDashboard();
  }

  const misDatosForm = document.getElementById("mis-datos-form");
  if (misDatosForm) {
    obtenerCiudadanoPorId().then((id) => {
      if (id) {
        poblarFormularioEdicion(id);
      }
    });
    misDatosForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const correo = document.getElementById("correo").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      actualizarDatosCiudadano(correo, telefono);
    });
  }

  if (estadoSelect) {
    //Evento para filtrar por estado
    estadoSelect.addEventListener("change", () => {
      const estado = estadoSelect.value;
      if (estado === "default") {
        reportesContainer.innerHTML = "";
        obtenerReportes();
      } else {
        filtrarPorEstado(estado);
      }
    });
  }

  if (categoriaSelect) {
    //Evento para filtrar por categoría
    categoriaSelect.addEventListener("change", () => {
      const categoria = categoriaSelect.value;
      if (categoria === "default") {
        reportesContainer.innerHTML = "";
        obtenerReportes();
      } else {
        filtrarPorCategoria(categoria);
      }
    });
  }

  if (cleanFilters) {
    //Limpiar los filtros/busqueda
    cleanFilters.addEventListener("click", () => {
      reportesContainer.innerHTML = "";
      obtenerReportes();
    });
  }

  if (buscarReporte) {
    //Evento para buscar reporte conforme vaya escribiendo el usuario
    buscarReporte.addEventListener("input", () => {
      const reporte = buscarReporte.value.trim();

      if (reporte == "") {
        reportesContainer.innerHTML = "";
        obtenerReportes();
        return;
      }

      buscarPorTitulo(reporte);
    });
  }

  //Evento para crear nuevo reporte
  if (nuevoReporteForm) {
    nuevoReporteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handlerCrearReporte();
    });
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
});
