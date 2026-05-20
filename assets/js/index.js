const register = document.getElementById("register");
const login = document.getElementById("login");
const passwordEye = document.getElementById("password-eye");
const passwordLogin = document.getElementById("password-login");

function showLogin(){
    register.style.display = "none";
    login.style.display = "block";
}

function showRegister(){
    login.style.display = "none";
    register.style.display = "block";
}
//No dejar copiar los contenidos de las contraseñas
function bloquearCopiadoContraseñas(passwordLogin) {
  passwordLogin.addEventListener("copy", (e) => e.preventDefault());
  passwordLogin.addEventListener("contextmenu", (e) => e.preventDefault());
  passwordLogin.addEventListener("keydown", (e) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      ["c", "x", "a"].includes(e.key.toLowerCase())
    ) {
      e.preventDefault();
    }
  });
}
//Revelar contraseñas
function revealPassword(icono) {
  const contenedor = icono.parentElement;
  const input = contenedor.querySelector("input");

  const esOculta = input.type === "password";
  input.type = esOculta ? "text" : "password";

  icono.classList.toggle("fa-eye");
  icono.classList.toggle("fa-eye-slash");

  if (esOculta) {
    bloquearCopiadoContraseñas(input);
  }
}

