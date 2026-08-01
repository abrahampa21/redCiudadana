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
  <?php include_once "../includes/sidebarAdmin.php"; ?>
 


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
            <option>Rechazado</option>
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
                <tbody id="reportes-tbody"></tbody>
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