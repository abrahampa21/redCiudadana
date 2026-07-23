<?php
session_start();
require_once("../src/config/connection.php");

$nombre_usuario = $_SESSION["nombre"];
?>

<aside class="sidebar fixed" id="sidebar">
  <div class="logo-content">
    <div class="brand-icon">
      <img src="../src/img/logo.jpeg" alt="Red ciudadana, logo del proyecto" />
    </div>
    <span class="project-name">Red Ciudadana</span>
  </div>
  <nav class="sidebar-nav">
    <a href="../panelAdmin/dashboard.php" class="link-element">
      <svg viewBox="0 0 24 24">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
      </svg>
      <span>Dashboard</span>
    </a>
    <a href="../panelAdmin/reportes.php" class="link-element">
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
      <span>Reportes</span>
    </a>
    <a href="../panelAdmin/estadisticas.php" class="link-element">
      <svg viewBox="0 0 24 24">
        <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" />
      </svg>
      <span>Estadísticas</span>
    </a>
    <a href="../panelAdmin/usuarios.php" class="link-element">
      <svg viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.89 1.97 1.74 1.97 2.95V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
      <span>Usuarios</span>
    </a>
    <a href="../panelAdmin/categorias.php" class="link-element">
      <svg viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
      <span>Categorías</span>
    </a>
  </nav>
  <div class="sidebar-user">
    <a href="../panelAdmin/misDatos.php" class="link-user">
    <div class="user-info">
      <div class="avatar" id="sb-avatar"><?= htmlspecialchars(strtoupper(substr($nombre_usuario, 0, 1))); ?></div>
      <div>
        <div class="user-name" id="sb-name"><?= htmlspecialchars($nombre_usuario) ?></div>
        <div class="user-role" id="sb-role">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="user-role-icon">
    <path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z"/>
  </svg>
  Editar perfil
</div>
      </div>
    </div>
    </a>
    <a class="logout-btn" href="../src/logoutAdmin.php">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
      </svg>
      <span>Cerrar sesión</span>
    </a>
  </div>
</aside>