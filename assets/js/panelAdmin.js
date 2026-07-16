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
async function obtenerTodoReportes(){
  try{
    const endpoint = "../src/api/reportes_api.php";
    const response = await fetch(endpoint);
  }catch{

  }
}

//Informacion completa en modal

//Filtrar reporte por estado

//Filtrar reporte por prioridad

//Buscar usuario 
async function buscarUsuarioPorNombre(nombre) {
  try {
    const endpoint = `../src/api/usuarios_api.php?nombre=${encodeURIComponent(nombre)}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    throw error;
  }
}

//=========EVENTOS=========


document.addEventListener("DOMContentLoaded", initAdminPage);