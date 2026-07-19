/* ============================================================
   ROUTER.JS
   Controla el estado visual del bottom-nav y centraliza
   la navegación inteligente entre carpetas (soporta file:// y Live Server).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.nav-item');
  const path = window.location.pathname.toLowerCase();

  // 1. Determinar qué pestaña debe estar activa según el archivo actual
  let activeNav = 'inicio';
  
  if (path.includes('pedidos.html') || path.includes('seleccion.html') || path.includes('confirmar_compra.html')) {
    activeNav = 'pedidos';
  } else if (path.includes('tracking.html') || path.includes('confirmar_entrega.html')) {
    activeNav = 'tracking';
  } else if (path.includes('perfil.html')) {
    activeNav = 'perfil';
  }

  // Marcar la activa
  items.forEach(item => {
    const nav = item.getAttribute('data-nav');
    if (nav === activeNav) {
      item.classList.add('activo');
    } else {
      item.classList.remove('activo');
    }

    // 2. Manejar clics con enrutamiento dinámico relativo
    item.addEventListener('click', () => {
      const isInPagesDir = path.includes('/pages/') || path.includes('\\pages\\');
      let targetUrl = '';

      switch (nav) {
        case 'inicio':
          targetUrl = isInPagesDir ? '../index.html' : 'index.html';
          break;
        case 'pedidos':
          targetUrl = isInPagesDir ? 'pedidos.html' : 'pages/pedidos.html';
          break;
        case 'tracking':
          targetUrl = isInPagesDir ? 'tracking.html' : 'pages/tracking.html';
          break;
        case 'perfil':
          window.location.href = isInPagesDir ? 'perfil.html' : 'pages/perfil.html';
          return;
      }

      if (targetUrl) {
        window.location.href = targetUrl;
      }
    });
  });
});