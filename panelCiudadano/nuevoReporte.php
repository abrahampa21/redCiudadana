
<?php include_once "../includes/sidebarCiudadano.php"; ?>

    <!-- Nuevo Reporte -->
    <main class="main-container">
      <div class="container">
        <div class="text">
          <h1>Crear Reporte</h1>
          <p>
            Complete la información del problema para que pueda ser atendido por
            las autoridades correspondientes.
          </p>
        </div>
        <form action="">
          <div class="div-input titulo">
            <label for="">Título</label>
            <input
              type="text"
              name="titulo"
              placeholder="Ej. Bache en Avenida Gobernadores"
            />
          </div>
          <div class="div-input descripcion">
            <label for="">Descripción</label>
            <textarea
              name="descripcion"
              placeholder="Describe el problema con detalle"
            ></textarea>
          </div>
          <div class="report-details">
            <div class="div-input categoria">
                <label for="">Categoría</label>
                <select value="" title="Categoría">Selecciona...</select>
            </div>
            <div class="div-input prioridad">
                <label for="">Prioridad</label>
                <select value="" title="Prioridad"></select>
            </div>
          </div>
          <div class="div-input ubicacion">
            <label for="">Ubicación</label>
            <input type="text" name="ubicacion" placeholder="Ej: Calle 5, Colonia Santa Lucía " id="">
          </div>
          <div class="div-input evidencia">
            <label for="">Evidencia</label>
            <p>Sube una imagen como evidencia del reporte</p>
            <input title="evidencia" type="file" name="evidencia">
          </div>
        </form>
      </div>
    </main>

