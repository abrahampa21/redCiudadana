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

    <div class="flex flex-col gap-6">
      <div class="stat-grid grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="stat-card bg-white rounded-xl border border-slate-200">
          <div
            class="stat-label flex items-center gap-2 text-xs font-semibold mb-2.5">
            <svg
              viewBox="0 0 24 24"
              fill="#6366f1"
              class="w-5 h-5 flex-shrink-0">
              <path
                d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zM5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span class="text-indigo-500">Total</span>
          </div>
          <div
            class="stat-num text-[2rem] font-bold text-slate-800"
            id="d-total">
            0
          </div>
        </div>
        <div class="stat-card bg-white rounded-xl border border-slate-200">
          <div
            class="stat-label flex items-center gap-2 text-xs font-semibold mb-2.5">
            <svg
              viewBox="0 0 24 24"
              fill="#f59e0b"
              class="w-5 h-5 flex-shrink-0">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span class="text-amber-500">Pendientes</span>
          </div>
          <div
            class="stat-num text-[2rem] font-bold text-slate-800"
            id="d-pend">
            0
          </div>
        </div>
        <div class="stat-card bg-white rounded-xl border border-slate-200">
          <div
            class="stat-label flex items-center gap-2 text-xs font-semibold mb-2.5">
            <svg
              viewBox="0 0 24 24"
              fill="#3b82f6"
              class="w-5 h-5 flex-shrink-0">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            <span class="text-blue-500">En Proceso</span>
          </div>
          <div
            class="stat-num text-[2rem] font-bold text-slate-800"
            id="d-proc">
            0
          </div>
        </div>
        <div class="stat-card bg-white rounded-xl border border-slate-200">
          <div
            class="stat-label flex items-center gap-2 text-xs font-semibold mb-2.5">
            <svg
              viewBox="0 0 24 24"
              fill="#22c55e"
              class="w-5 h-5 flex-shrink-0">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            <span class="text-green-500">Resueltos</span>
          </div>
          <div
            class="stat-num text-[2rem] font-bold text-slate-800"
            id="d-res">
            0
          </div>
        </div>
      </div>

      <!-- Reportes recientes -->
      <div class="card bg-white rounded-xl border border-slate-200">
        <h3 class="text-base font-bold mb-4 text-slate-800">
          Mis reportes recientes
        </h3>
        <div id="recent-list">
          <p class="empty-msg text-slate-500 text-[0.85rem]">
            No hay reportes aún.
          </p>
        </div>
      </div>
    </div>
  </div>
</main>