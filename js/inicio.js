/* ============================================================
   INICIO.JS
   Lógica exclusiva de la Pantalla 1: Inicio.
   Controla el flujo de navegación principal y el inicio de sesión simulado.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const btnRealizarPedido = document.getElementById('btn-realizar-pedido');
  const btnIniciarSesion = document.getElementById('btn-iniciar-sesion');
  const loginModal = document.getElementById('login-modal');
  const btnCloseLogin = document.getElementById('btn-close-login');
  const formLogin = document.getElementById('form-login');
  const inputEmail = document.getElementById('login-email');

  // 1. Verificar si ya hay una sesión activa al cargar
  function chequearSesion() {
    if (typeof TrustPayStorage !== 'undefined') {
      const user = TrustPayStorage.get('user');
      if (user && user.loggedIn) {
        btnIniciarSesion.textContent = `Cerrar sesión (${user.email.split('@')[0]})`;
        btnIniciarSesion.classList.add('logged-in');
      } else {
        btnIniciarSesion.textContent = 'Iniciar sesión';
        btnIniciarSesion.classList.remove('logged-in');
      }
    }
  }

  // 2. Evento del botón de Iniciar Sesión (o Cerrar Sesión)
  btnIniciarSesion.addEventListener('click', () => {
    if (btnIniciarSesion.classList.contains('logged-in')) {
      // Cerrar sesión
      if (typeof TrustPayStorage !== 'undefined') {
        TrustPayStorage.remove('user');
      }
      chequearSesion();
      alert('Has cerrado sesión exitosamente.');
    } else {
      // Abrir modal de inicio de sesión
      loginModal.classList.add('show');
    }
  });

  // 3. Cerrar modal al hacer clic en la "X"
  btnCloseLogin.addEventListener('click', () => {
    loginModal.classList.remove('show');
  });

  // Cerrar modal al hacer clic fuera del contenido
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove('show');
    }
  });

  // 4. Enviar formulario (Simular autenticación)
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = inputEmail.value.trim();
    
    if (typeof TrustPayStorage !== 'undefined') {
      TrustPayStorage.set('user', {
        email: email,
        loggedIn: true,
        timestamp: Date.now()
      });
    }

    loginModal.classList.remove('show');
    chequearSesion();
    alert(`¡Bienvenido a TrustPay, ${email.split('@')[0]}!`);
  });

  // 5. Botón Realizar Pedido
  btnRealizarPedido.addEventListener('click', () => {
    window.location.href = 'pages/seleccion.html';
  });

  // Inicializar estado del botón
  chequearSesion();
});