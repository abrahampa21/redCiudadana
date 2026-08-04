<?php
//Not duplicate session_start with new reporte
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once("../src/config/connection.php");

$nombre_usuario = $_SESSION["nombre"];
?>

<!--Movil menu-->
<button class="menu-toggle" id="menuToggle">☰</button>

<aside class="sidebar fixed" id="sidebar">
  <div class="logo-content">
    <div class="brand-icon">
      <img
        src="../src/img/logo.jpeg"
        alt="Red ciudadana, logo del proyecto" />
    </div>
    <span class="project-name">Red Ciudadana</span>
  </div>
  <nav>
    <a href="../panelCiudadano/dashboard.php" class="link-element">
      <svg viewBox="0 0 24 24">
        <path
          d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
      </svg>
      <span>Dashboard</span>
    </a>

    <a href="../panelCiudadano/reportes.php" class="link-element">
      <svg viewBox="0 0 24 24">
        <path
          d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
      <span>Reportes</span>
    </a>

    <?php
    $activo = $_SESSION['activo'] ?? 1;
    if ($activo == 0) : ?>
        <a class="link-element disabled" href="#" onclick="return false;" aria-disabled="true" title="Cuenta deshabilitada">
          <svg viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <span>Nuevo Reporte</span>
        </a>
    <?php else: ?>
        <a href="../panelCiudadano/nuevoReporte.php" class="link-element">
          <svg viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <span>Nuevo Reporte</span>
        </a>
    <?php endif; ?>

  </nav>
  <div class="sidebar-user">
    <a href="../panelCiudadano/misDatos.php" class="link-user">
      <div class="user-info">
        <div class="avatar" id="sb-avatar"><?= htmlspecialchars(strtoupper(substr($nombre_usuario, 0, 1))); ?></div>
        <div>
          <div class="user-name" id="sb-name"><?= htmlspecialchars($nombre_usuario) ?></div>
          <div class="user-role" id="sb-role">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="user-role-icon">
              <path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z" />
            </svg>
            Editar perfil
          </div>
        </div>
      </div>
    </a>
    <a class="logout-btn" id="btn-logout" href="../src/logout.php">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
      </svg>
      <span>Cerrar sesión</span>
    </a>
  </div>
</aside>

<?php include_once "modalLogout.php"; ?>


<!--Dark background when menu gets open-->
<div class="overlay" id="overlay"></div>