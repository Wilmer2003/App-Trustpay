/* ============================================================
   ROUTER.JS
   Como cada pantalla ahora es un archivo .html independiente
   (index.html, pages/seleccion.html, etc.), la "navegación"
   entre pantallas se hace con enlaces reales <a href="...">.

   Este archivo solo controla el estado VISUAL del bottom-nav
   (qué ícono se marca como activo) según la página actual.
   Se incluye en TODAS las pantallas.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.nav-item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('activo'));
      item.classList.add('activo');
    });
  });
});