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


//Mostrar usuarios que sean ciudadanos en formato tabla en el panel de administracion
async function getUsuariosCiudadanos(){
  const tbody = document.getElementById("users-tbody");
  if (!tbody) {
    return;
  }
  try{
    const endpoint = `../src/api/usuarios_api.php?id_rol=1`;
    const response = await fetch(endpoint);
    const data = await response.json();
    tbody.innerHTML = "";

    data.forEach(usuario => {
      const tr = document.createElement("tr");
      // El campo activo usa valores booleanos (1 para activo, 0 para inactivo) y se usó operador ternario para mostrar el estado en texto.
      const estado = usuario.activo == 1 ? "Activo" : "Inactivo"; 

      tr.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.telefono}</td>
        <td>${estado}</td>
        <td>${usuario.fecha_registro}</td>
        <td>
          <button class="btn btn-primary btn-sm" data-id="${usuario.id_usuario}" onclick="deshabilitarUsuario(${usuario.id_usuario})">Deshabilitar</button>

        </td>
      `;
      tbody.appendChild(tr);
    });
  }catch(error){
    console.error("Error al obtener los usuarios:", error.status);
    return []
  }
}


//=========EVENTOS=========


document.addEventListener("DOMContentLoaded", () => {
getUsuariosCiudadanos();

});