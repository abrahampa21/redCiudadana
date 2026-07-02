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

//APIs de para ciudadanos 
//Mostrar reportes en tabla  ES EJEMPLOOOO
async function obtenerReportes() {
  const tbodyReportes = document.getElementById("body-table-reporte");
  tbodyReportes.innerHTML = "";
  try {
    const endpoint = `../src/api/reportes_api.php`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const reportes = await response.json();
      reportes.forEach(reporte => {
        tbodyReportes.innerHTML += `
          <tr>
              <td>${reporte.titulo}</td>
              <td>${reporte.nombre_categoria}</td>
              <td>${reporte.nombre_estado}</td>
              <td>${reporte.fecha_creacion}</td>
              <td>
                <a href="#" class="btn-ver" value="${reporte.id_reporte}">
                  Ver
                </a>
              </td>
          </tr>
          `;
        })
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
