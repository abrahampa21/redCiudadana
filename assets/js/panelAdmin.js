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
  const estado = usuario.activo == 1 ? "Activo" : "Inactivo";
  const textoBoton = usuario.activo == 1 ? "Deshabilitar" : "Habilitar";
  const claseBoton = usuario.activo == 1 ? "btn-primary" : "btn-habilitar";

  tr.innerHTML = `
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
  `;
  tbody.appendChild(tr);
});
  }catch(error){
    console.error("Error al obtener los usuarios:", error.status);
    return []
  }
}

async function deshabilitarUsuario(id, activoActual, btn) {
  const nuevoEstado = activoActual == 1 ? 0 : 1;

  try {
    const response = await fetch(`../src/api/usuarios_api.php?id_usuario=${id}&accion=estado`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activo: nuevoEstado })
    });

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

    btn.setAttribute("onclick", `deshabilitarUsuario(${id}, ${nuevoEstado}, this)`);

  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
}




//=========EVENTOS=========


document.addEventListener("DOMContentLoaded", () => {
getUsuariosCiudadanos();

});