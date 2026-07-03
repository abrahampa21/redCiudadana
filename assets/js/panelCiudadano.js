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
// Toast
const toastElement = document.getElementById("error-fetch");
const toastBtnClose = document.getElementById("btn-close");

//Para mostrar la fecha en el dashboard
if (dashDate) {
  dashDate.textContent = `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
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

//Evento para formulario de nuevoReporte.php
// const nuevoReporteForm = document.getElementById("nuevo-reporte");

// nuevoReporteForm.addEventListener("submit", (e) => {
//   e.preventDefault();
// });

//Mostrar toast
function showToast(message) {
  const textToast = document.querySelector(".text-toast");
  textToast.textContent = message;

  toastElement.classList.add("show");
}

function hideToast() {
  toastElement.classList.remove("show");
}

toastBtnClose.addEventListener("click", hideToast);

//Card para cada reporte
function createReporteCard(reporte) {
  const reportesContainer = document.getElementById("reportes-container");
  const cardReporte = document.createElement("div");
  cardReporte.classList.add("card-reporte");

  //Estados y colores
    const estados = {
    "Pendiente": "bg-yellow-100 text-yellow-800",
    "En proceso": "bg-blue-100 text-blue-800",
    "Resuelto": "bg-green-100 text-green-800",
    "Rechazado": "bg-red-100 text-red-800",
  };

  const estadoBG = estados[reporte.nombre_estado] || "bg-slate-100 text-slate-800";

  cardReporte.innerHTML = `
    <div class='card-body flex flex-col gap-4 rounded-lg'>
      <img src='#' class='w-full h-44 object-cover bg-slate-100' alt='Imagen como evidencia del reporte'>
      <h2 class='text-lg font-semibold text-slate-800 line-clamp-2'>${reporte.titulo}</h2>
      <h3 class='inline-block px-3 py-1 rounded-full font-medium ${estadoBG}'>
        ${reporte.nombre_estado}
      </h3>
      <button class='btn-details mt-auto w-full bg-[#1f2a4d] hover:bg-[#16203b] text-white font-medium py-2.5 rounded-lg transition-colors duration-200 cursor-pointer' >Más detalles</button>
    </div>
  `;

  reportesContainer.appendChild(cardReporte);

  //Abrir modal
  const btnDetails = cardReporte.querySelector(".btn-details");

  btnDetails.addEventListener("click", () => {
    abrirModal(reporte)
  })
}

//Abrir modal
function abrirModal(reporte) {
  const modalReporte = document.getElementById("modal-reporte");

  document.getElementById("detalle-titulo").textContent = reporte.titulo;
  document.getElementById("detalle-estado").textContent = reporte.nombre_estado;
  document.getElementById("detalle-categoria").textContent = reporte.nombre_categoria;
  document.getElementById("detalle-descripcion").textContent = reporte.descripcion;

  modalReporte.classList.remove("hidden");
  modalReporte.classList.add("flex");
}

//Cerrar modal
function cerrarModal() {
  const modalReporte = document.getElementById("modal-reporte");

  modalReporte.classList.remove("flex");
  modalReporte.classList.add("hidden");
}

//Botones cerrar modal
document.getElementById("cerrar-modal").addEventListener("click", cerrarModal);
document.getElementById("cerrar-modal-footer").addEventListener("click", cerrarModal);

//Cerrar modal fuera de ello
document.getElementById("modal-reporte").addEventListener("click", (e) => {
  if (e.target.id === "modal-reporte") {
    cerrarModal();
  }
});


//APIs de para ciudadanos
//Mostrar reportes en tabla  ES EJEMPLOOOO
async function obtenerReportes() {
  try {
    const endpoint = `../src/api/reportes_api.php`;
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

//Mostrar evidencia
async function obtenerEvidencias() {
  try {
    const endpoint = "../src/api/evidencias_api.php";
    const response = await fetch(endpoint);

    if (response.ok) {
      const reportes = await response.json();
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Crear reportes
async function crearReporte() {
  try {
    //const endpoint = "../src/api/reportes_api.php";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      const reportes = await response.json();
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Crear evidencia
async function crearEvidencia() {
  try {
    //const endpoint = "../src/api/evidencias_api.php";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      const reportes = await response.json();
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Filtrar reporte por categoria
async function filtrarPorCategoria() {
  try {
    //const endpoint = `../src/api/reportes_api.php?id_categoria=${id_categoria}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      const reportes = await response.json();
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Filtrar reporte por prioridad
async function filtrarPorPrioridad() {
  try {
    //const endpoint = `../src/api/reportes_api.php?id_prioridad=${id_prioridad}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      const reportes = await response.json();
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

//Filtrar reporte por estado
async function filtrarPorEstado() {
  try {
    //const endpoint = `../src/api/reportes_api.php?id_estado=${id_estado}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      const reportes = await response.json();
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    showToast(error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  obtenerReportes();
});
