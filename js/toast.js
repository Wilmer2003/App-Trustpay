/* ============================================================
   TOAST.JS
   Sistema de notificaciones globales no intrusivas.
   ============================================================ */

const TrustPayToast = (() => {
  let container = null;

  function initContainer() {
    if (!document.getElementById('trustpay-toast-container')) {
      container = document.createElement('div');
      container.id = 'trustpay-toast-container';
      document.body.appendChild(container);
    } else {
      container = document.getElementById('trustpay-toast-container');
    }
  }

  const icons = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
  };

  /**
   * Muestra un Toast
   * @param {string} message - El mensaje a mostrar
   * @param {string} type - 'success', 'error', o 'info'
   * @param {number} duration - Duración en milisegundos
   */
  function show(message, type = 'info', duration = 3000) {
    initContainer();

    const toast = document.createElement('div');
    toast.className = `trustpay-toast toast-${type}`;
    
    // Soportar saltos de línea reemplazando \n por <br>
    const formattedMessage = message.replace(/\n/g, '<br>');

    toast.innerHTML = `
      <div class="toast-icon-wrap">
        ${icons[type] || icons.info}
      </div>
      <div class="toast-message">
        ${formattedMessage}
      </div>
    `;

    container.appendChild(toast);

    // Animar entrada
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Animar salida y remover
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300); // esperar a que termine la transición
    }, duration);
  }

  return { show };
})();
