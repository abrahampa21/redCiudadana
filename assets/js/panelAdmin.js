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

const ADMIN_STORAGE_KEY = "redCiudadana.adminState";

const DEFAULT_ADMIN_STATE = {
  users: [
    {
      id: 1,
      name: "Administrador",
      username: "admin",
      email: "admin@sistema.com",
      role: "admin",
      active: true,
    },
    {
      id: 2,
      name: "María López",
      username: "maria.lopez",
      email: "maria@correo.com",
      role: "citizen",
      active: true,
    },
    {
      id: 3,
      name: "Juan Pérez",
      username: "juan.perez",
      email: "juan@correo.com",
      role: "citizen",
      active: true,
    },
    {
      id: 4,
      name: "Ana Torres",
      username: "ana.torres",
      email: "ana@correo.com",
      role: "citizen",
      active: false,
    },
  ],
  reports: [
    {
      id: 1,
      title: "Bache en avenida principal",
      description: "Bache profundo frente al parque central.",
      category: "Baches",
      priority: "Alta",
      location: "Av. Principal 120",
      status: "Pendiente",
      date: "03/07/2026",
      citizen: "María López",
    },
    {
      id: 2,
      title: "Falla en alumbrado público",
      description: "Dos luminarias apagadas desde hace una semana.",
      category: "Alumbrado",
      priority: "Media",
      location: "Calle 5, Col. Centro",
      status: "En Proceso",
      date: "01/07/2026",
      citizen: "Juan Pérez",
    },
    {
      id: 3,
      title: "Acumulación de basura",
      description: "No pasó el camión de recolección en la ruta del mercado.",
      category: "Basura",
      priority: "Media",
      location: "Mercado Municipal",
      status: "Resuelto",
      date: "28/06/2026",
      citizen: "María López",
    },
    {
      id: 4,
      title: "Fuga de agua en banqueta",
      description: "La fuga continúa desde la esquina de la escuela.",
      category: "Agua",
      priority: "Alta",
      location: "Av. Insurgentes 45",
      status: "Pendiente",
      date: "05/07/2026",
      citizen: "Ana Torres",
    },
  ],
};

let adminState = loadAdminState();
let mobileSidebarBound = false;
let reportFiltersBound = false;
let modalBound = false;

function loadAdminState() {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) {
      return structuredCloneOrFallback(DEFAULT_ADMIN_STATE);
    }

    const parsed = JSON.parse(raw);
    return {
      users: Array.isArray(parsed.users)
        ? parsed.users
        : structuredCloneOrFallback(DEFAULT_ADMIN_STATE.users),
      reports: Array.isArray(parsed.reports)
        ? parsed.reports
        : structuredCloneOrFallback(DEFAULT_ADMIN_STATE.reports),
    };
  } catch {
    return structuredCloneOrFallback(DEFAULT_ADMIN_STATE);
  }
}

function structuredCloneOrFallback(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
}

function saveAdminState() {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminState));
  } catch {
    return;
  }
}

function getDashboardDateLabel() {
  const date = new Date();
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

function setActiveSidebarLink() {
  const currentFile = window.location.pathname.split("/").pop() || "";
  document.querySelectorAll(".sidebar .link-element").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const targetFile = href.split("/").pop();
    const isActive = targetFile === currentFile;
    link.classList.toggle("active", isActive);
  });
}

function initMobileSidebar() {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (!menuToggle || !sidebar || !overlay) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.hideTimer);
  showToast.hideTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function openModal(title, body, onConfirm) {
  const overlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const confirmButton = document.getElementById("modal-confirm");

  if (!overlay || !modalTitle || !modalBody || !confirmButton) {
    if (typeof onConfirm === "function") {
      onConfirm();
    }
    return;
  }

  modalTitle.textContent = title;
  modalBody.textContent = body;
  overlay.classList.add("open");

  confirmButton.onclick = () => {
    closeModal();
    if (typeof onConfirm === "function") {
      onConfirm();
    }
  };
}

function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) {
    overlay.classList.remove("open");
  }
}

function statusBadge(status) {
  const className =
    status === "Pendiente"
      ? "badge-status badge-pendiente"
      : status === "En Proceso"
        ? "badge-status badge-proceso"
        : "badge-status badge-resuelto";

  return `<span class="${className}">${status}</span>`;
}

function prioBadge(priority) {
  const className =
    priority === "Alta"
      ? "prio-badge prio-alta"
      : priority === "Media"
        ? "prio-badge prio-media"
        : "prio-badge prio-baja";

  return `<span class="${className}">${priority}</span>`;
}

function filterReports() {
  const searchElement = document.getElementById("f-search");
  const statusElement = document.getElementById("f-estado");
  const categoryElement = document.getElementById("f-cat");
  const priorityElement = document.getElementById("f-prio");

  let reports = [...adminState.reports];

  const search = searchElement ? searchElement.value.trim().toLowerCase() : "";
  const status = statusElement ? statusElement.value : "";
  const category = categoryElement ? categoryElement.value : "";
  const priority = priorityElement ? priorityElement.value : "";

  if (search) {
    reports = reports.filter((report) => {
      const searchable = [
        report.title,
        report.description,
        report.location,
        report.citizen,
        report.category,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(search);
    });
  }

  if (status) {
    reports = reports.filter((report) => report.status === status);
  }

  if (category) {
    reports = reports.filter((report) => report.category === category);
  }

  if (priority) {
    reports = reports.filter((report) => report.priority === priority);
  }

  return reports;
}

function renderDashboard() {
  const reportCount = adminState.reports.length;
  const pendingCount = adminState.reports.filter(
    (report) => report.status === "Pendiente",
  ).length;
  const processCount = adminState.reports.filter(
    (report) => report.status === "En Proceso",
  ).length;
  const resolvedCount = adminState.reports.filter(
    (report) => report.status === "Resuelto",
  ).length;
  const highCount = adminState.reports.filter(
    (report) => report.priority === "Alta",
  ).length;

  const dashDate = document.getElementById("dash-date");
  if (dashDate) {
    dashDate.textContent = getDashboardDateLabel();
  }

  const totalElement = document.getElementById("d-total");
  const pendingElement = document.getElementById("d-pend");
  const processElement = document.getElementById("d-proc");
  const resolvedElement = document.getElementById("d-res");
  const highElement = document.getElementById("d-alta");

  if (totalElement) totalElement.textContent = reportCount;
  if (pendingElement) pendingElement.textContent = pendingCount;
  if (processElement) processElement.textContent = processCount;
  if (resolvedElement) resolvedElement.textContent = resolvedCount;
  if (highElement) highElement.textContent = highCount;

  const recentList = document.getElementById("recent-list");
  if (!recentList) {
    return;
  }

  const recentReports = [...adminState.reports].slice(-5).reverse();

  if (!recentReports.length) {
    recentList.innerHTML =
      '<p class="empty-msg">No hay reportes aún.</p>';
    return;
  }

  recentList.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Categoría</th>
          <th>Estado</th>
          <th>Prioridad</th>
        </tr>
      </thead>
      <tbody>
        ${recentReports
          .map(
            (report) => `
              <tr>
                <td><strong>${report.title}</strong></td>
                <td>${report.category}</td>
                <td>${statusBadge(report.status)}</td>
                <td>${prioBadge(report.priority)}</td>
              </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderReportes() {
  const listElement = document.getElementById("reportes-list");
  if (!listElement) {
    return;
  }

  const reports = filterReports();

  if (!reports.length) {
    listElement.innerHTML = `
      <div class="card reportes-empty" style="text-align:center; padding: 28px;">
        No se encontraron reportes.
      </div>
    `;
    return;
  }

  listElement.innerHTML = `
    <div class="card reportes-shell">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoría</th>
            <th>Ubicación</th>
            <th>Ciudadano</th>
            <th>Fecha</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${reports
            .map(
              (report) => `
                <tr>
                  <td><strong>${report.title}</strong></td>
                  <td>${report.category}</td>
                  <td>${report.location}</td>
                  <td>${report.citizen}</td>
                  <td>${report.date}</td>
                  <td>${prioBadge(report.priority)}</td>
                  <td>${statusBadge(report.status)}</td>
                  <td>
                    <select class="status-select" onchange="changeStatus(${report.id}, this.value)">
                      <option value="Pendiente"${report.status === "Pendiente" ? " selected" : ""}>Pendiente</option>
                      <option value="En Proceso"${report.status === "En Proceso" ? " selected" : ""}>En Proceso</option>
                      <option value="Resuelto"${report.status === "Resuelto" ? " selected" : ""}>Resuelto</option>
                    </select>
                  </td>
                </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function clearFilters() {
  const searchElement = document.getElementById("f-search");
  const statusElement = document.getElementById("f-estado");
  const categoryElement = document.getElementById("f-cat");
  const priorityElement = document.getElementById("f-prio");

  if (searchElement) searchElement.value = "";
  if (statusElement) statusElement.value = "";
  if (categoryElement) categoryElement.value = "";
  if (priorityElement) priorityElement.value = "";

  renderReportes();
}

function changeStatus(id, value) {
  const report = adminState.reports.find((item) => item.id === Number(id));
  if (!report) {
    showToast("No se encontró el reporte");
    return;
  }

  report.status = value;
  saveAdminState();
  renderDashboard();
  renderReportes();
  renderStats();
  showToast("Estado actualizado");
}

function renderStats() {
  const container = document.getElementById("page-stats");
  if (!container) {
    return;
  }

  const reports = [...adminState.reports];
  const pending = reports.filter((report) => report.status === "Pendiente").length;
  const process = reports.filter((report) => report.status === "En Proceso").length;
  const resolved = reports.filter((report) => report.status === "Resuelto").length;
  const baja = reports.filter((report) => report.priority === "Baja").length;
  const media = reports.filter((report) => report.priority === "Media").length;
  const alta = reports.filter((report) => report.priority === "Alta").length;

  const pendElement = document.getElementById("st-pend");
  const procElement = document.getElementById("st-proc");
  const resElement = document.getElementById("st-res");
  const bajaElement = document.getElementById("st-baja");
  const mediaElement = document.getElementById("st-media");
  const altaElement = document.getElementById("st-alta");
  const totalElement = document.getElementById("st-total");

  if (pendElement) pendElement.textContent = pending;
  if (procElement) procElement.textContent = process;
  if (resElement) resElement.textContent = resolved;
  if (bajaElement) bajaElement.textContent = baja;
  if (mediaElement) mediaElement.textContent = media;
  if (altaElement) altaElement.textContent = alta;
  if (totalElement) totalElement.textContent = reports.length;

  const categories = [
    "Baches",
    "Alumbrado",
    "Basura",
    "Seguridad",
    "Agua",
    "Áreas verdes",
    "Tránsito",
    "Otro",
  ];

  const statsList = document.getElementById("st-cats");
  if (!statsList) {
    return;
  }

  const categoryRows = categories
    .map((category) => {
      const total = reports.filter((report) => report.category === category).length;
      return `<div class="priority-row"><span>${category}</span><strong>${total}</strong></div>`;
    })
    .join("");

  statsList.innerHTML = categoryRows || '<p class="empty-msg">Sin datos</p>';
}

function renderUsuarios() {
  const tbody = document.getElementById("users-tbody");
  if (!tbody) {
    return;
  }

  tbody.innerHTML = adminState.users
    .map((user) => {
      const roleLabel = user.role === "admin" ? "Admin" : "Ciudadano";
      const roleClass = user.role === "admin" ? "badge-admin" : "badge-citizen";
      const activeLabel = user.active ? "Activo" : "Inactivo";
      const activeClass = user.active ? "badge-active" : "badge-inactive";
      const actionLabel = user.active ? "Desactivar" : "Activar";
      const actionClass = user.active ? "btn-deact" : "btn-makeadm";

      return `
        <tr>
          <td>${user.name}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td><span class="badge ${roleClass}">${roleLabel}</span></td>
          <td><span class="badge ${activeClass}">${activeLabel}</span></td>
          <td>
            <div class="btn-actions">
              <button class="btn-sm ${actionClass}" onclick="toggleUser(${user.id})">${actionLabel}</button>
              ${user.role === "citizen" ? `<button class="btn-sm btn-makeadm" onclick="makeAdmin(${user.id})">→ Admin</button>` : ""}
            </div>
          </td>
        </tr>`;
    })
    .join("");

  if (!adminState.users.length) {
    tbody.innerHTML =
      '<tr><td colspan="6" style="text-align:center;color:#64748b;padding:20px">No hay usuarios registrados aún.</td></tr>';
  }
}

function toggleUser(id) {
  const user = adminState.users.find((item) => item.id === Number(id));
  if (!user) {
    showToast("No se encontró el usuario");
    return;
  }

  openModal(
    "Confirmar acción",
    `¿${user.active ? "Desactivar" : "Activar"} al usuario ${user.name}?`,
    () => {
      user.active = !user.active;
      saveAdminState();
      renderUsuarios();
      showToast("Usuario actualizado");
    },
  );
}

function makeAdmin(id) {
  const user = adminState.users.find((item) => item.id === Number(id));
  if (!user) {
    showToast("No se encontró el usuario");
    return;
  }

  openModal("Hacer admin", `¿Promover a ${user.name} como administrador?`, () => {
    user.role = "admin";
    saveAdminState();
    renderUsuarios();
    showToast("Rol actualizado");
  });
}

function renderCats() {
  const catsMap = {
    "c-baches": "Baches",
    "c-alumbrado": "Alumbrado",
    "c-basura": "Basura",
    "c-seguridad": "Seguridad",
    "c-agua": "Agua",
    "c-areas": "Áreas verdes",
    "c-transito": "Tránsito",
    "c-otro": "Otro",
  };

  Object.entries(catsMap).forEach(([elementId, category]) => {
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }

    const total = adminState.reports.filter(
      (report) => report.category === category,
    ).length;
    element.textContent = `${total} reportes`;
  });
}

function bindReportFilters() {
  const searchElement = document.getElementById("f-search");
  const statusElement = document.getElementById("f-estado");
  const categoryElement = document.getElementById("f-cat");
  const priorityElement = document.getElementById("f-prio");
  const clearButton = document.querySelector(".filter-clear");

  if (searchElement) {
    searchElement.addEventListener("input", renderReportes);
  }

  if (statusElement) {
    statusElement.addEventListener("change", renderReportes);
  }

  if (categoryElement) {
    categoryElement.addEventListener("change", renderReportes);
  }

  if (priorityElement) {
    priorityElement.addEventListener("change", renderReportes);
  }

  if (clearButton) {
    clearButton.addEventListener("click", clearFilters);
  }
}

function initAdminPage() {
  setActiveSidebarLink();
  renderDashboard();
  renderReportes();
  renderStats();
  renderUsuarios();
  renderCats();

  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  if (!mobileSidebarBound && menuToggle && sidebar && overlay) {
    initMobileSidebar();
    mobileSidebarBound = true;
  }

  const searchElement = document.getElementById("f-search");
  const statusElement = document.getElementById("f-estado");
  const categoryElement = document.getElementById("f-cat");
  const priorityElement = document.getElementById("f-prio");
  const clearButton = document.querySelector(".filter-clear");
  if (!reportFiltersBound && (searchElement || statusElement || categoryElement || priorityElement || clearButton)) {
    bindReportFilters();
    reportFiltersBound = true;
  }

  const modalOverlay = document.getElementById("modal-overlay");
  if (!modalBound && modalOverlay) {
    modalOverlay.addEventListener("click", (event) => {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });

    modalBound = true;
  }

  const dateElement = document.getElementById("dash-date");
  if (dateElement) {
    dateElement.textContent = getDashboardDateLabel();
  }
}

document.addEventListener("DOMContentLoaded", initAdminPage);