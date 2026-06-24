/* ============================================================
   INICIO.JS
   Lógica exclusiva de la Pantalla 1: Inicio.
   Solo se carga en index.html.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const btnRealizarPedido = document.getElementById('btn-realizar-pedido');
  const btnIniciarSesion = document.getElementById('btn-iniciar-sesion');

  btnRealizarPedido.addEventListener('click', () => {
    // Próximo paso: esto navegará a pages/seleccion.html
    window.location.href = 'pages/seleccion.html';
  });

  btnIniciarSesion.addEventListener('click', () => {
    alert('Pantalla de inicio de sesión: la definimos cuando lleguemos a ese flujo.');
  });
});