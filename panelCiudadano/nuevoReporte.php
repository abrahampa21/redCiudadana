<?php
require_once("../src/config/connection.php");

//Obtener categorías para mostrarlas en el select
$queryCategorias = $conn->prepare("SELECT id_categoria, nombre FROM categoria");
$queryCategorias->execute();
$result = $queryCategorias->get_result();
$categorias = [];

while ($row = $result->fetch_assoc()) {
  $categorias[] = $row;
}

$queryCategorias->close();
?>

<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../assets/css/panelCiudadano.css" />
  <link rel="icon" href="../src/img/icon-pages.jfif" />
  <link href="../src/output.css" rel="stylesheet" />
  
  <title>Panel del ciudadano</title>
</head>

<body>
  <?php include_once "../includes/sidebarCiudadano.php"; ?>
  <!-- Nuevo Reporte -->
  <main class="main-container nuevo-reporte">
    <div class="container">
      <div class="text">
        <h1 class="text-[1.6rem] font-bold mb-1">Crear Reporte</h1>
        <p>
          Complete la información del problema para que pueda ser atendido por
          las autoridades correspondientes.
        </p>
      </div>
      <div class="container-form w-full flex items-center justify-center mt-6">
        <!--Formulario-->
        <form action="handler/nuevoReporteCiudadano" class="bg-white rounded-xl p-7 max-w-[150] mx-auto" id="nuevo-reporte">
          <div class="div-input titulo">
            <label for="titulo">Título</label>
            <input
              type="text"
              name="titulo"
              placeholder="Ej. Bache en Avenida Gobernadores"
              required />
          </div>
          <div class="div-input descripcion">
            <label for="descripcion">Descripción</label>
            <textarea
              name="descripcion"
              placeholder="Describe el problema con detalle"
              required></textarea>
          </div>
          <div class="report-details">
            <div class="div-input categoria">
              <label for="categoria">Categoría</label>
              <select value="" title="Categoría" name="id_categoria">
                <option value="">Selecciona...</option>
                <?php
                foreach ($categorias as $categoria) {
                  echo "<option value='{$categoria['id']}'>${categoria['nombre']}</option>";
                }
                ?>
              </select>
            </div>
          </div>
          <div class="div-input ubicacion">
            <label for="ubicacion">Ubicación</label>
            <input type="text" name="ubicacion" placeholder="Ej: Calle 5, Colonia Santa Lucía" required>
          </div>
          <div class="div-input evidencia">
            <label for="evidencia">Evidencia fotográfica</label>
            <input title="evidencia" type="file" name="evidencia" required>
          </div>
          <button type="submit" name="reporte-btn" class="w-full border-none rounded-lg font-semibold cursor-pointer mt-1 ">Enviar reporte</button>
        </form>
      </div>
    </div>
  </main>

  <!--If API request fails-->
  <div
    class="toast"
    role="alert"
    id="error-fetch"
    aria-live="assertive"
    aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">⚠️ Error</strong>
      <button
        type="button"
        class="btn-close"
        id="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close">X</button>
    </div>
    <div class="text-toast">
      No se pudo procesar la información del reporte <br />
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/js/panelCiudadano.js"></script>
</body>

</html>