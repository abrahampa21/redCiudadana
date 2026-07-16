<?php include_once "../includes/sidebarAdmin.php"; ?>

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
    <button class="menu-toggle" id="menuToggle">☰</button>
    <div class="overlay" id="overlay"></div>
    <div id="sidebar-container"></div>

    <main class="dashboard">
      <div class="page" id="page-usuarios">
        <div>
          <h1 class="page-title">Gestión de Usuarios</h1>
          <div class="page-sub">Activa, desactiva o promueve usuarios desde aquí.</div>
        </div>

        <div class="card table-shell">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="users-tbody"></tbody>
          </table>
        </div>
      </div>
    </main>

    <div class="overlay" id="modal-overlay">
      <div class="modal">
        <h2 id="modal-title">Confirmar acción</h2>
        <p id="modal-body">¿Estás seguro?</p>
        <div class="modal-actions">
          <button class="btn-cancel" onclick="closeModal()">Cancelar</button>
          <button class="btn-confirm" id="modal-confirm">Confirmar</button>
        </div>
      </div>
    </div>

    <div class="toast" id="toast"></div>

  
    <script src="../assets/js/panelAdmin.js"></script>
  </body>
</html>
