<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../assets/css/panelCiudadano.css" />
  <link rel="icon" href="../src/img/icon-pages.jfif" />
  <link href="../src/output.css" rel="stylesheet" />
  <title>Panel del Ciudadano</title>
</head>

<body>
  <?php include_once "../includes/sidebarCiudadano.php"; ?>
  <main class="main-container nuevo-reporte">
    <div class="container">
      <div class="text">
        <h1 class="text-[1.6rem] font-bold mb-1">Editar Perfil</h1>
        <p>
          Actualiza la información que desees cambiar.
        </p>
      </div>
      <div class="container-form w-full flex items-center justify-center mt-6">
        <form id="mis-datos-form" class="bg-white rounded-xl p-7 max-w-[150] mx-auto">
          <div class="div-input nombre-completo">
            <label for="nombre">Nombre completo</label>
            <input type="text" id="nombre" readonly>
          </div>
          <div class="div-input correo">
            <label for="correo">Correo electrónico *</label>
            <input type="email" id="correo">
          </div>
          <div class="div-input">
            <label for="telefono">Número de teléfono *</label>
            <input type="text" id="telefono">
          </div>
          <div class="div-input fecha-registro">
            <label for="fecha-registro">Fecha de registro</label>
            <input type="text" id="fecha-registro" readonly>
          </div>
          <div class="div-input">
            <label for="rol">Rol</label>
            <input type="text" id="rol" class="capitalize" readonly>
          </div>
          <div class="required-text mb-4">
            <p class="text-[1.1rem]">Los campos marcados con * pueden modificarse.</p>
          </div>
          <button type="submit" class="btn-edit w-full border-none rounded-lg font-semibold cursor-pointer mt-1" id="btn-edit">Guardar cambios</button>
        </form>
      </div>
    </div>
  </main>

  <?php include_once "../includes/toast.php"; ?>


  <script src="../assets/js/panelCiudadano.js"></script>
</body>

</html>