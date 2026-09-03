<?php
require_once __DIR__ .'../src/config/connection.php';
require_once __DIR__ .'.../includes/login.php';
?>

<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link
    rel="icon"
    type="image/png"
    href="src/favicon/favicon-96x96.png"
    sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="src/favicon/favicon.svg" />
  <link rel="shortcut icon" href="src/favicon/favicon.ico" />
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="src/favicon/apple-touch-icon.png" />
  <link rel="stylesheet" href="assets/css/index.css" />
  <script
    src="https://kit.fontawesome.com/e522357059.js"
    crossorigin="anonymous"></script>
  <title>Inicio de Sesiónes</title>
</head>

<body>
  <!--Login-->
  <main id="login" class="login">
    <div class="container">
      <div class="icon-login">
        <svg viewBox="0 0 24 24">
          <path
            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 14l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z" />
        </svg>
      </div>
      <h1>Portal Ciudadano</h1>
      <p class="login-message">Reporta quejas e incidencias de tu comunidad</p>
      <form action="" method="post">
        <div class="usuario-div login-div">
          <label for="email">Correo electrónico</label>
          <div class="input-div">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Tu correo electrónico"
              required
              autofocus
              maxlength="255" />
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
        <div class="password-div login-div">
          <label for="password">Contraseña</label>
          <div class="input-div">
            <input
              type="password"
              name="password"
              id="password-login"
              placeholder="Tu contraseña"
              required
              maxlength="255" />
            <i
              class="fa-solid fa-eye"
              id="password-eye"
              onclick="revealPassword(this)"></i>
          </div>
          <span class="forgot-pass" onclick="showRecoverPassword()">Olvidé mi contraseña</span>
        </div>
        <button type="submit" id="login-button" name="login-button">Iniciar Sesión</button>
      </form>
      <p class="go-register">
        ¿No tienes cuenta?
        <strong onclick="showRegister()">Regístrate</strong>
      </p>
    </div>
  </main>

  <!--Recover password component-->
  <main id="recover-password" class="recover-password">
    <div class="container">
      <i
        id="back-icon"
        class="arrow fa-solid fa-arrow-left"
        title="Regresar"
        onclick="showLogin()"></i>
      <h1>Recuperar contraseña</h1>
      <form action="" method="post">
        <div class="email-div recover-div">
          <label>Correo electrónico</label>
          <div class="input-div">
            <input
              type="email"
              placeholder="Ej. alejandro@gmail.com"
              required
              name="email"
              maxlength="255" />
            <i class="fa-solid fa-envelope"></i>
          </div>
          <div class="new-password-div recover-div">
            <label>Contraseña</label>
            <div class="input-div">
              <input
                type="password"
                title="password"
                required
                name="password"
                maxlength="255"
                placeholder="Mínimo 8 caracteres" />
              <i class="fa-solid fa-eye" onclick="revealPassword(this)"></i>
            </div>
          </div>
          <button type="submit" id="recover-btn" name="recover-btn">Confirmar nueva contraseña</button>
      </form>
    </div>
  </main>

  <!--Registro de ciudadanos-->
  <main id="register" class="register">
    <div class="container">
      <i
        id="back-icon"
        class="arrow fa-solid fa-arrow-left"
        title="Regresar"
        onclick="showLogin()"></i>
      <div class="icon-register">
        <svg viewBox="0 0 24 24">
          <path
            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 14l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z" />
        </svg>
      </div>
      <h1>Registro de ciudadanos</h1>
      <p class="create-account">Únete y contribuye a mejorar tu comunidad</p>
      <form action="" id="register-form" method="post">
        <div class="nombre-div register-div">
          <label>Nombre completo</label>
          <div class="input-div">
            <input
              type="text"
              placeholder="Ej. Juán Pérez"
              required
              name="name"
              id="name"
              maxlength="255"
              pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,255}$" />
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
        <div class="email-div register-div">
          <label>Correo electrónico</label>
          <div class="input-div">
            <input
              type="email"
              placeholder="Ej. alejandro@gmail.com"
              required
              name="email"
              maxlength="255" />
            <i class="fa-solid fa-envelope"></i>
          </div>
        </div>
        <div class="usuario-div register-div">
          <label>Número de teléfono</label>
          <div class="input-div">
            <input
              type="text"
              placeholder="Ej. 9811243219"
              required
              name="cellphone"
              id="cellphone"
              maxlength="12"
              pattern="^\d{1,12}$" />
            <i class="fa-solid fa-mobile"></i>
          </div>
        </div>
        <div class="password-div register-div">
          <label>Contraseña</label>
          <div class="input-div">
            <input
              type="password"
              title="password"
              required
              name="password"
              maxlength="255"
              placeholder="Mínimo 8 caracteres" />
            <i class="fa-solid fa-eye" onclick="revealPassword(this)"></i>
          </div>
        </div>
        <button type="submit" id="btn-registro" name="btn-registro">Registrarse</button>
      </form>
      <p class="go-login">
        ¿Ya tienes cuenta? <span onclick="showLogin()">Inicia sesión</span>
      </p>
    </div>
  </main>


  <!--Toast mensaje para registro-->
  <div id="registroToast" class="toast my-toast">

    <div class="my-toast-header">
      <div class="icon-title">
        <img src="src/img/<?php echo ($toast_type === "error") ? "close.png" : "check.png"; ?> " alt="Icono de comprobado para registrado">
        <strong>Red Ciudadana dice:</strong>
      </div>

      <button type="button"
        class="close-toast"
        data-bs-dismiss="toast">
        X
      </button>
    </div>

    <div class="my-toast-body">
      <?php echo $toast_message ?>
    </div>

  </div>

  <script src="assets/js/index.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <?php if ($toast): ?>

    <script>
      document.addEventListener("DOMContentLoaded", () => {

        const toastElement = document.getElementById("registroToast");

        const toast = new bootstrap.Toast(toastElement, {
          delay: 2000
        });

        toast.show();

      });
    </script>

  <?php endif; ?>
</body>

</html>