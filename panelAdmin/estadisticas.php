<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../assets/css/panelAdmin.css" />
    <link rel="icon" href="../src/img/icon-pages.jfif" />
    <link href="../src/output.css" rel="stylesheet" />
    <title>Panel del administrador</title>
  </head>
  <body>
    <?php include_once "../includes/sidebarAdmin.php"; ?>
    

    <main class="dashboard">
      <div class="page" id="page-stats">
        <div>
          <h1 class="page-title">Estadísticas</h1>
          <div class="page-sub">Resumen general de los reportes registrados.</div>
        </div>

        <div class="stat-row">
          <div class="stat-circle-card">
            <div class="circle circle-yellow" id="st-pend">0</div>
            <div class="stat-circle-label">Pendiente</div>
          </div>
          <div class="stat-circle-card">
            <div class="circle circle-blue" id="st-proc">0</div>
            <div class="stat-circle-label">En Proceso</div>
          </div>
          <div class="stat-circle-card">
            <div class="circle circle-green" id="st-res">0</div>
            <div class="stat-circle-label">Resuelto</div>
          </div>
          <div class="stat-circle-card">
            <div class="circle circle-red" id="st-rechazado">0</div>
            <div class="stat-circle-label">Rechazado</div>
          </div>
        </div>

        <div class="two-col">
          <div class="card">
            <h3>Por Categoría</h3>
            <div id="st-cats"><p class="empty-msg">Sin datos</p></div>
          </div>
          <div class="card">
            <h3>Por Prioridad</h3>
            <div class="priority-row">
              <span><span class="priority-dot" style="background:#64748b"></span>Baja</span>
              <span id="st-baja">0</span>
            </div>
            <div class="priority-row">
              <span><span class="priority-dot" style="background:#f97316"></span>Media</span>
              <span id="st-media">0</span>
            </div>
            <div class="priority-row">
              <span><span class="priority-dot" style="background:#ef4444"></span>Alta</span>
              <span id="st-alta">0</span>
            </div>
            <div style="margin-top:12px;font-size:.8rem;color:#64748b">
              Total: <strong id="st-total">0</strong> reportes
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="toast" id="toast"></div>

   
    <script src="../assets/js/panelAdmin.js"></script>
  </body>
</html>
