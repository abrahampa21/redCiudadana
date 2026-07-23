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
  <main class="main-container">
    <div class="page" id="page-dashboard">
      <!-- Encabezado -->
      <div class="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 class="page-title text-[1.6rem] font-bold text-slate-800">
            Bienvenido al sistema de reportes
          </h1>
          <div
            class="page-date text-[0.85rem] text-slate-500"
            id="dash-date"></div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="stat-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          <!-- Total -->
          <div class="stat-card bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="#6366f1" class="w-5 h-5">
                  <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zM5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total</span>
            </div>
            <div class="stat-num text-[2rem] font-bold text-slate-800" id="total">0</div>
          </div>

          <!-- Pendientes -->
          <div class="stat-card bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="#f59e0b" class="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Pendientes</span>
            </div>
            <div class="stat-num text-[2rem] font-bold text-slate-800" id="pendientes">0</div>
          </div>

          <!-- En Proceso -->
          <div class="stat-card bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="#3b82f6" class="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wide">En Proceso</span>
            </div>
            <div class="stat-num text-[2rem] font-bold text-slate-800" id="en-proceso">0</div>
          </div>

          <!-- Resueltos -->
          <div class="stat-card bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="#22c55e" class="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Resueltos</span>
            </div>
            <div class="stat-num text-[2rem] font-bold text-slate-800" id="resueltos">0</div>
          </div>

          <!-- Rechazados -->
          <div class="stat-card bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="#ef4444" class="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Rechazados</span>
            </div>
            <div class="stat-num text-[2rem] font-bold text-slate-800" id="rechazados">0</div>
          </div>
        </div>

        <!-- Reportes recientes -->
        <div class="card bg-white rounded-xl border border-slate-200 p-6">
          <h3 class="text-base font-bold mb-4 text-slate-800">
            Mis reportes recientes
          </h3>
          <div id="recent-list">

          </div>
        </div>
      </div>
    </div>
  </main>

  <script src="../assets/js/panelCiudadano.js"></script>
</body>

</html>