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
        <span class="topbar-title">Reportes Archivados</span>
      </div>
      <div style="padding:0 28px">
        <div class="filters" style="margin-top: 20px;">
          <input class="filter-input" placeholder="Buscar..." id="f-search" oninput="renderReportes()">
          <select class="filter-select" id="f-estado" onchange="renderReportes()">
            <option value="">Estado: Todos</option>
            <option>Resuelto</option>
            <option>Rechazado</option>
          </select>
          <select class="filter-select" id="f-cat" onchange="renderReportes()">
            <option value="">Categoría: Todas</option>
            <div class="toast" id="toast"></div>
            <option>Baches</option>
            <option>Alumbrado</option>
            <option>Basura</option>
            <option>Seguridad</option>
            <option>Agua</option>
            <option>Áreas verdes</option>
            <option>Tránsito</option>
            <option>Otro</option>
          </select>

          <button class="filter-clear" onclick="clearFilters()">Limpiar</button>
        </div>
        <div id="reportes-list" style="margin-top: 20px;">
          <!-- <div class="card"> -->
          <!-- <p class="empty-msg">No se encontraron reportes.</p> -->
          <div class="card table-shell">
            <table>
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
              <tbody id="users-tbody"></tbody>
            </table>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    </div>
  </main>

  <div class="toast" id="toast"></div>


  <script src="../assets/js/panelAdmin.js"></script>
</body>

</html>