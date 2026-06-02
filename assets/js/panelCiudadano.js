const dashDate = document.getElementById("dash-date");
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

//Show date in dashboard
const date = new Date();
dashDate.textContent = `${days[date.getDay()]}, ${date.getDate()}, de ${months[date.getMonth()]} de ${date.getFullYear()}`;
