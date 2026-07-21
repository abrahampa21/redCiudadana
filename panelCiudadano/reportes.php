<?php
require_once("../src/config/connection.php");

//Obtener categorias
$query = $conn->prepare("SELECT id_categoria, nombre FROM categoria");
$query->execute();
$result = $query->get_result();
$categorias = [];

while ($row = $result->fetch_assoc()) {
  $categorias[] = $row;
}
$query->close();

//Obtener estados
$query = $conn->prepare("SELECT id_estado, nombre FROM estado");
$query->execute();
$result = $query->get_result();
$estados = [];

while ($row = $result->fetch_assoc()) {
  $estados[] = $row;
}

$query->close();

?>
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
  <?php include_once "../includes/spinner.php"; ?>

  <!-- Reportes-->
  <main class="main-container reportes">
    <div class="container">
      <div class="topbar flex justify-between items-center py-3.5 px-7 flex-wrap">
        <h1 class="font-bold">Reportes</h1>
        <a href="nuevoReporte.php" id="btn-new" class="btn-new flex items-center py-2 px-4 rounded-lg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
          </svg>
          Nuevo
        </a>
      </div>
      <div class="search-container py-5 px-7">
        <div class="filters flex items-center gap-2.5 p-3 justify-between bg-white rounded-[10px] mb-4 flex-wrap">
          <input type="text" id="buscar-reporte" class="flex-1 min-w-35 px-3 py-1.5 rounded-[7px] text-[0.82rem] outline-none" placeholder="Buscar..." />
          <select name="id_estado" id="estado-select" aria-label="filter-estado">
            <option value="default">Estado: Todos</option>
            <?php
            foreach ($estados as $estado) {
              echo "<option value='{$estado['id_estado']}'>{$estado['nombre']}</option>";
            }
            ?>
          </select>
          <select name="id_categoria" id="categoria-select" aria-label="filter-categoria">
            <option value="default">Categoría: Todas</option>
            <?php
            foreach ($categorias as $categoria) {
              echo "<option value='{$categoria['id_categoria']}'>{$categoria['nombre']}</option>";
            }
            ?>
          </select>
          <button class="clear-btn text-sm font-semibold cursor-pointer whitespace-nowrap bg-none border-0" id="clean-filter">Limpiar</button>
        </div>
      </div>

      <div class="reportes-list">
        <div class="text-center bg-white rounded-xl p-6 reportes-container overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"" id="reportes-container">
        </div>
      </div>
    </div>
  </main>

  <!-- Modal detalles del Reporte -->
  <div id="modal-reporte" class="fixed inset-0  z-50 hidden items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
      <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 class="text-2xl font-bold text-slate-800">
          Detalles del reporte
        </h2>
        <button id="cerrar-modal"
          class="text-slate-500 hover:text-red-500 transition text-2xl cursor-pointer">
          &times;
        </button>
      </div>
      <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img id="detalle-imagen"
            src="#"
            class="w-full h-56 object-cover rounded-xl bg-slate-100"
            alt="Imagen del reporte">
          <div class="grid grid-cols-1 gap-5">
            <div>
              <p class="text-sm text-slate-500">Título</p>
              <h3 id="detalle-titulo" class="text-xl font-semibold text-slate-800"></h3>
            </div>
            <div>
              <p class="text-sm text-slate-500">Estado</p>
              <span id="detalle-estado" class="inline-block mt-1 px-3 py-1 rounded-full font-medium"></span>
            </div>
            <div>
              <p class="text-sm text-slate-500">Categoría</p>
              <p id="detalle-categoria" class="text-slate-700 font-medium"></p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-sm text-slate-500 mb-2">Descripción</p>
          <p id="detalle-descripcion" class="text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg p-4"></p>
        </div>
      </div>
      <div class="flex justify-end gap-3 px-6 py-4 border-t border-slate-200">
        <button id="cerrar-modal-footer"
          class="px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition cursor-pointer">
          Cerrar
        </button>
      </div>
    </div>
  </div>

  <?php include_once "../includes/toast.php"; ?>

  <script src="../assets/js/panelCiudadano.js"></script>
</body>

</html>
<?php
$conn->close();
?>