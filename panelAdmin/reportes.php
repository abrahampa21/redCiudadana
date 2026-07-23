<?php include_once "../includes/sidebarAdmin.php"; ?>

<!doctype html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/panelAdmin.css" />
  <link rel="icon" href="../src/img/icon-pages.jfif" />
  <link href="../src/output.css" rel="stylesheet" />
  <title>Panel del administrador</title>
</head>

<body>
  <button class="menu-toggle" id="menuToggle">☰</button>
  <div class="overlay" id="overlay"></div>
  <div id="sidebar-container"></div>

  <!-- REPORTES -->
  <main class="dashboard">
    <div class="page" id="page-reportes">
      <div class="topbar">
        <span class="topbar-title">Reportes</span>
        <a href="../panelAdmin/archivados.php" class="reportes-archived-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M64 128C64 110.3 78.3 96 96 96L544 96C561.7 96 576 110.3 576 128L576 160C576 177.7 561.7 192 544 192L96 192C78.3 192 64 177.7 64 160L64 128zM96 240L544 240L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 240zM248 304C234.7 304 224 314.7 224 328C224 341.3 234.7 352 248 352L392 352C405.3 352 416 341.3 416 328C416 314.7 405.3 304 392 304L248 304z"/></svg>
          <span class="reportes-archived-text">Ver archivados</span>
        </a>
      </div>
      <div style="padding:0 28px">
        <div class="filters" style="margin-top: 20px;">
          <input class="filter-input" placeholder="Buscar..." id="f-search" oninput="renderReportes()">
          <select class="filter-select" id="f-estado" onchange="renderReportes()">
            <option value="">Estado: Todos</option>
            <option>Pendiente</option>
            <option>En Proceso</option>
            <option>Resuelto</option>
          </select>
          <select class="filter-select" id="f-cat" onchange="renderReportes()">
            <option value="">Categoría: Todas</option>
            <option>Baches</option>
            <option>Alumbrado</option>
            <option>Basura</option>
            <option>Seguridad</option>
            <option>Agua</option>
            <option>Áreas verdes</option>
            <option>Tránsito</option>
            <option>Otro</option>
          </select>
          <select class="filter-select" id="f-prio" onchange="renderReportes()">
            <option value="">Prioridad: Todas</option>
            <option>Baja</option>
            <option>Media</option>
            <option>Alta</option>
          </select>
          <button class="filter-clear" onclick="clearFilters()">Limpiar</button>
        </div>
        <div id="reportes-list" style="margin-top: 20px;">
          <!-- <div class="card"> -->
            <!-- <p class="empty-msg">No se encontraron reportes.</p> -->
            <div class="card table-shell">
              <table id="tabla-reportes">
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Categoría</th>
                    <th>Ubicación</th>
                    <th>Prioridad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="reportes-tbody"></tbody>
              </table>
            </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    </div>
  </main>

  <div id="modal-reporte" class="overlay" aria-hidden="true">
    <div class="modal">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h2 style="margin:0; font-size:1.15rem;">Detalle del reporte</h2>
        <button class="btn-close" aria-label="Cerrar">&times;</button>
      </div>
      <img id="detalle-imagen" src="https://via.placeholder.com/640x400?text=Sin+evidencia" alt="Foto del reporte" style="width:100%; height:220px; object-fit:cover; border-radius:14px; margin-bottom:16px; background:#f3f4f6;" />
      <div style="display:grid; gap:12px;">
        <div>
          <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Título</p>
          <h3 id="detalle-titulo" style="margin:0; font-size:1.1rem;">-</h3>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div>
            <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Estado</p>
            <span id="detalle-estado" style="display:inline-block; margin-top:4px; padding:6px 12px; border-radius:999px; font-size:0.85rem; background:#e2e8f0; color:#1f2937;"></span>
          </div>
          <div>
            <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Prioridad</p>
            <p id="detalle-prioridad" style="margin:4px 0 0 0; font-weight:700;"></p>
          </div>
        </div>
        <div>
          <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Categoría</p>
          <p id="detalle-categoria" style="margin:0; font-weight:600;"></p>
        </div>
        <div>
          <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Ubicación</p>
          <p id="detalle-ubicacion" style="margin:0;"></p>
        </div>
        <div>
          <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Descripción</p>
          <p id="detalle-descripcion" style="margin:0; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px; white-space:pre-wrap;"></p>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div>
            <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Reportado por</p>
            <p id="detalle-ciudadano" style="margin:0;"></p>
          </div>
          <div>
            <p class="text-sm" style="margin:0 0 4px 0; color:#64748b;">Fecha</p>
            <p id="detalle-fecha" style="margin:0;"></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="toast" id="toast"></div>


  <script src="../assets/js/panelAdmin.js"></script>
</body>

</html>