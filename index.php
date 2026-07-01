<?php
require_once("src/config/connection.php");
session_start();

$toast = false;
$toast_type = "";
$toast_message = "";

function validar_contraseña($contraseña)
{
  // Mínimo 8 caracteres
  if (strlen($contraseña) < 8) {
    return false;
  }

  // Al menos una letra
  if (!preg_match('/[A-Za-z]/', $contraseña)) {
    return false;
  }

  // Al menos un carácter especial
  if (!preg_match('/[!@#$%^&*()_\-=\[\]{};\'":\\|,.<>\/?]/', $contraseña)) {
    return false;
  }

  return true;
}


//Formulario Registro
if (isset($_POST["btn-registro"])) {
  $nombre = trim(htmlspecialchars($_POST['name']));
  $correo = strtolower(trim(htmlspecialchars($_POST['email'])));
  $telefono = trim(htmlspecialchars($_POST['cellphone']));
  $pass = trim(htmlspecialchars($_POST['password']));

  if (!validar_contraseña($pass)) {
    $toast = true;
    $toast_type = "error";
    $toast_message = "Contraseña no válida, debe contener mínimo 8 caracteres, 1 caracter especial y 1 letra";
  } else {
    $securePass = sha1($pass);

    // validación de datos repetidos
    $validar = $conn->prepare("SELECT correo, telefono FROM usuario WHERE correo = ? OR telefono = ?");
    $validar->bind_param("ss", $correo, $telefono);
    $validar->execute();
    $resultado_verificar = $validar->get_result();

    if ($resultado_verificar && $resultado_verificar->num_rows > 0) {
      $toast = true;
      $toast_message = "Correo o teléfono ya registrado";
    } else { //consulta de inserción
      $registro = $conn->prepare("INSERT INTO usuario(nombre,correo,password,telefono,id_rol) VALUES (?,?,?,?,1)");
      $registro->bind_param("ssss", $nombre, $correo, $securePass, $telefono);

      if ($registro->execute()) {
        $toast = true;
        $toast_type = "success";
        $toast_message = "Usuario registrado correctamente";
      } else {
        $toast = true;
        $toast_type = "error";
        $toast_message = "Error al registrar datos";
      }
      $registro->close();
    }
    $validar->close();
  }
}

//Recuperar contraseña
if (isset($_POST["recover-btn"])) {
  $correo = trim(htmlspecialchars($_POST['email']));
  $nueva_contraseña = trim(htmlspecialchars($_POST['password']));

  if (!validar_contraseña($nueva_contraseña)) {
    $toast = true;
    $toast_type = "error";
    $toast_message = "Contraseña no válida, debe contener mínimo 8 caracteres, 1 caracter especial y 1 letra";
  } else {
    // Verificar si el correo existe primero
    $verificarCorreo = $conn->prepare("SELECT id_usuario FROM usuario WHERE correo = ? AND id_rol = 1 LIMIT 1");
    $verificarCorreo->bind_param("s", $correo);
    $verificarCorreo->execute();
    $resCorreo = $verificarCorreo->get_result();

    if ($resCorreo->num_rows === 0) {
      $toast = true;
      $toast_type = "error";
      $toast_message = "No existe una cuenta con ese correo";
    } else {
      $securePass = sha1($nueva_contraseña);
      $update = $conn->prepare("UPDATE usuario SET password = ? WHERE correo = ? AND id_rol = 1");
      $update->bind_param("ss", $securePass, $correo);

      if ($update->execute()) {
        $toast = true;
        $toast_type = "success";
        $toast_message = "Contraseña actualizada correctamente";
      } else {
        $toast = true;
        $toast_type = "error";
        $toast_message = "Error al actualizar la contraseña";
      }
      $update->close();
    }
    $verificarCorreo->close();
  }
}

//Formulario Login
if (isset($_POST["login-button"])) {
  $correo = trim(htmlspecialchars($_POST['email']));
  $pass = trim(htmlspecialchars($_POST['password']));
  $passSec = sha1($pass);

  // 1. Verificar si el correo existe
  $loginCorreo = $conn->prepare("SELECT id_usuario, nombre, password FROM usuario WHERE correo = ? AND id_rol = 1 LIMIT 1");
  $loginCorreo->bind_param("s", $correo);
  $loginCorreo->execute();
  $resCorreo = $loginCorreo->get_result();

  if ($resCorreo->num_rows === 0) {
    $toast = true;
    $toast_type = "error";
    $toast_message = "No existe una cuenta para este correo";
  } else {
    $usuario = $resCorreo->fetch_assoc();

    // 2. Verificar si la contraseña es correcta
    if ($usuario['password'] !== $passSec) {
      $toast = true;
      $toast_type = "error";
      $toast_message = "Contraseña incorrecta";
    } else {
      $_SESSION['id_usuario'] = $usuario['id_usuario'];
      $_SESSION['nombre'] = $usuario['nombre'];
      header("Location: panelCiudadano/dashboard.php");
      exit();
    }
  }
  $loginCorreo->close();
}
$conn->close();
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
  <title>Inicio de Sesión</title>
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
          <label>Número telefónico</label>
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