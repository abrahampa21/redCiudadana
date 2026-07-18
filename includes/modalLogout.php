<!-- Modal confirmación de cierre de sesión -->
<div id="modal-logout" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 backdrop-blur-sm">
  <div class="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden">
    <div class="p-6 text-center">
      <div class="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#ef4444">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
        </svg>
      </div>
      <h2 class="text-lg font-bold text-slate-800 mb-1">¿Cerrar sesión?</h2>
      <p class="text-sm text-slate-500">Podrás volver a entrar cuando quieras</p>
    </div>
    <div class="flex gap-3 px-6 pb-6">
      <button id="cancelar-logout"
        class="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 transition cursor-pointer font-medium">
        Cancelar
      </button>
      <a href="../src/logout.php" id="confirmar-logout"
        class="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition cursor-pointer font-medium text-center">
        Confirmar
      </a>
    </div>
  </div>
</div>