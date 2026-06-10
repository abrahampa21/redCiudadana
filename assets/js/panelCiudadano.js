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

if (dashDate) {
  dashDate.textContent =
    `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

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

// INFORMACIÓN DE PRUEBA GENERADO POR IA - DESCOMENTAR A PARTIR DE LA LÍNEA DE ABAJO PARA PRUEBA
// //── Mock data (reemplazar por fetch a la API cuando esté lista) ──
// // GET /api/reportes?ciudadano_id={id}  →  array de reportes del ciudadano
// const mockReportes = [
//   { titulo: "Bache en Av. Central",    categoria: "Baches",     prioridad: "alta",  estado: "pendiente",  fecha: "2026-06-01" },
//   { titulo: "Alumbrado roto",          categoria: "Alumbrado",  prioridad: "media", estado: "en proceso", fecha: "2026-06-03" },
//   { titulo: "Basura acumulada",        categoria: "Basura",     prioridad: "baja",  estado: "resuelto",   fecha: "2026-06-05" },
//   { titulo: "Semáforo descompuesto",   categoria: "Seguridad",  prioridad: "alta",  estado: "pendiente",  fecha: "2026-06-07" },
// ];

// // ── Contadores ──────────────────────────────────────────
// function cargarDashboard(reportes) {
//   document.getElementById("d-total").textContent = reportes.length;
//   document.getElementById("d-pend").textContent  = reportes.filter(r => r.estado === "pendiente").length;
//   document.getElementById("d-proc").textContent  = reportes.filter(r => r.estado === "en proceso").length;
//   document.getElementById("d-res").textContent   = reportes.filter(r => r.estado === "resuelto").length;

//   renderTabla(reportes.slice(0, 5)); // muestra máximo 5 recientes
// }

// // ── Tabla de reportes recientes ─────────────────────────
// const estadoBadge = {
//   "pendiente":  { color: "bg-amber-100 text-amber-700",  label: "Pendiente"  },
//   "en proceso": { color: "bg-blue-100 text-blue-700",    label: "En proceso" },
//   "resuelto":   { color: "bg-green-100 text-green-700",  label: "Resuelto"   },
// };

// const prioridadBadge = {
//   "alta":  { color: "bg-red-100 text-red-600",      label: "Alta"  },
//   "media": { color: "bg-yellow-100 text-yellow-700", label: "Media" },
//   "baja":  { color: "bg-slate-100 text-slate-600",  label: "Baja"  },
// };

// function renderTabla(reportes) {
//   const container = document.getElementById("recent-list");

//   if (reportes.length === 0) {
//     container.innerHTML = `<p class="empty-msg text-slate-500 text-[0.85rem]">No hay reportes aún.</p>`;
//     return;
//   }

//   container.innerHTML = `
//     <div class="overflow-x-auto">
//       <table class="w-full text-sm">
//         <thead>
//           <tr class="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wide">
//             <th class="text-left py-2 pr-4 font-semibold">Título</th>
//             <th class="text-left py-2 pr-4 font-semibold">Categoría</th>
//             <th class="text-left py-2 pr-4 font-semibold">Prioridad</th>
//             <th class="text-left py-2 pr-4 font-semibold">Estado</th>
//             <th class="text-left py-2 font-semibold">Fecha</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${reportes.map(r => {
//             const est  = estadoBadge[r.estado]     ?? { color: "bg-slate-100 text-slate-500", label: r.estado };
//             const prio = prioridadBadge[r.prioridad] ?? { color: "bg-slate-100 text-slate-500", label: r.prioridad };
//             return `
//               <tr class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
//                 <td class="py-3 pr-4 font-medium text-slate-700">${r.titulo}</td>
//                 <td class="py-3 pr-4 text-slate-500">${r.categoria}</td>
//                 <td class="py-3 pr-4">
//                   <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${prio.color}">${prio.label}</span>
//                 </td>
//                 <td class="py-3 pr-4">
//                   <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${est.color}">${est.label}</span>
//                 </td>
//                 <td class="py-3 text-slate-400 text-xs">${r.fecha}</td>
//               </tr>`;
//           }).join("")}
//         </tbody>
//       </table>
//     </div>`;
// }

// // ── Inicializar (swap por fetch cuando la API esté lista) ──
// cargarDashboard(mockReportes);

// /*
//   Cuando tengas el endpoint, reemplaza la última línea por:

//   fetch(`/api/reportes?ciudadano_id=${usuarioActual.id}`)
//     .then(r => r.json())
//     .then(data => cargarDashboard(data))
//     .catch(() => cargarDashboard([]));
// */
