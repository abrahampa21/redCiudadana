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
    <title>Panel del Administrador</title>
  </head>
  <body>
    <?php include_once "../includes/sidebarAdmin.php"; ?>
    <button class="menu-toggle" id="menuToggle">☰</button>
    <div class="overlay" id="overlay"></div>
    <div id="sidebar-container"></div>

    <main class="dashboard">
      <div class="page" id="page-cats">
        <div>
          <h1 class="page-title">Categorías</h1>
          <div class="page-sub">Cantidad de reportes agrupados por categoría.</div>
        </div>
        
        <!-- CONTENIDO DE LA SECCIÓN DE CATEGORÍAS -->
        <div class="cat-card">
          <div class="cat-row"><span>Alumbrado</span><span class="cat-count" data-id-categoria="1">0 reportes</span></div>
          <div class="cat-row"><span>Seguridad</span><span class="cat-count" data-id-categoria="2">0 reportes</span></div>
          <div class="cat-row"><span>Agua</span><span class="cat-count" data-id-categoria="3">0 reportes</span></div>
          <div class="cat-row"><span>Áreas verdes</span><span class="cat-count" data-id-categoria="4">0 reportes</span></div>
          <div class="cat-row"><span>Tránsito</span><span class="cat-count" data-id-categoria="5">0 reportes</span></div>
          <div class="cat-row"><span>Baches y vialidad</span><span class="cat-count" data-id-categoria="6">0 reportes</span></div>
          <div class="cat-footer">Las categorías se administran desde la estructura del sistema.</div>
        </div>
      </div>
    </main>

    <div class="toast" id="toast"></div>

  
    <script src="../assets/js/panelAdmin.js"></script>
  </body>
</html>
