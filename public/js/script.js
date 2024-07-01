var i = 0;
var txtRegister = 'R E G I S T R A R S E'; /* The text */
var txtLogin = 'I N I C I A R - S E S I O N'; /* The text */
var txtRecovery = 'R E C U P E R A R - C O N T R A S E Ñ A'; /* The text */
var speed = 120;

function typeWriterRegister() {
  if (i < txtRegister.length) {
    document.getElementById("demo").innerHTML += txtRegister.charAt(i);
    i++;
    setTimeout(typeWriterRegister, speed);
  }
}

function typeWriterLogin() {
  if (i < txtLogin.length) {
    document.getElementById("demo").innerHTML += txtLogin.charAt(i);
    i++;
    setTimeout(typeWriterLogin, speed);
  }
}

function typeRecoveryPassword() {
  if (i < txtRecovery.length) {
    document.getElementById("demo").innerHTML += txtRecovery.charAt(i);
    i++;
    setTimeout(typeRecoveryPassword, speed);
  }
}


  // Obtener referencias a los botones
  const btnIngresar = document.getElementById('btnIngresar');
  const btnRegistrarse = document.getElementById('btnRegistrarse');

  // Agregar event listener para el botón Ingresar
  btnIngresar.addEventListener('click', () => {
    window.location.href = '/login'; // Redirigir a la ruta '/login' al hacer clic en Login
  });

  // Agregar event listener para el botón Registrarse
  btnRegistrarse.addEventListener('click', () => {
    window.location.href = '/register'; // Redirigir a la ruta '/register' al hacer clic en Registrarse
  });

