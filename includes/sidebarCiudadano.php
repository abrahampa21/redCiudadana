<?php
session_start();
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

      <a href="../panelCiudadano/nuevoReporte.php" class="link-element">
        <svg viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        <span>Nuevo Reporte</span>
      </a>
    </nav>
    <div class="sidebar-user">
      <div class="user-info">
        <div class="avatar" id="sb-avatar"><?=htmlspecialchars(strtoupper(substr($nombre_usuario,0,1))); ?></div>
        <div>
          <div class="user-name" id="sb-name"><?= htmlspecialchars($nombre_usuario)?></div>
          <div class="user-role" id="sb-role">Ciudadano</div>
        </div>
      </div>
      <div class="logout-btn">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path
            d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
        </svg>
        <!--Aquí se colocará el logout.php-->
        <a href="..\src\logout.php" onclick="return confirm('¿Estás seguro que deseas salir?');">Cerrar sesión</a>
      </div>
    </div>
  </aside>

  <!--Dark background when menu gets open-->
  <div class="overlay" id="overlay"></div>
