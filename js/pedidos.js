/* ============================================================
   PEDIDOS.JS
   Lógica para la Pantalla: Historial de Pedidos.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('pedidos-container');
  const tabs = document.querySelectorAll('.tab-btn');
  let tabActual = 'activos'; // 'activos' o 'historial'

  // Función para obtener y clasificar pedidos desde storage.js
  function obtenerPedidos() {
    let activos = [];
    let historial = [];

    if (typeof TrustPayStorage !== 'undefined') {
      const activeOrder = TrustPayStorage.get('active_order');
      if (activeOrder) {
        // Lógica: Si el estado es 5 (Finalizado), pasa a historial
        if (activeOrder.estado >= 5) {
          historial.push(activeOrder);
        } else {
          activos.push(activeOrder);
        }
      }

      const orderHistory = TrustPayStorage.get('order_history', []);
      historial = historial.concat(orderHistory);
    }

    return { activos, historial };
  }

  // Renderizar la lista de pedidos según la pestaña
  function renderPedidos() {
    container.innerHTML = '';
    const { activos, historial } = obtenerPedidos();
    const listado = tabActual === 'activos' ? activos : historial;

    if (listado.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <p>No tienes pedidos ${tabActual === 'activos' ? 'en proceso' : 'finalizados'} en este momento.</p>
        </div>
      `;
      return;
    }

    // Ordenar de más reciente a más antiguo
    listado.sort((a, b) => {
      const tA = a.timestamp || 0;
      const tB = b.timestamp || 0;
      return tB - tA;
    });

    listado.forEach(pedido => {
      const esCompletado = pedido.estado >= 5 || tabActual === 'historial';
      
      const estadoClass = esCompletado ? 'estado-liberado' : 'estado-custodia';
      const estadoPuntoClass = esCompletado ? 'punto-verde' : 'punto-azul';
      const estadoTexto = esCompletado ? 'Pago Liberado' : (pedido.estadoFase || 'En custodia');

      const dateObj = new Date(pedido.timestamp || Date.now());
      const fecha = dateObj.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
      const hora = dateObj.toLocaleTimeString('es-PE', { hour: '2-digit', minute:'2-digit' });

      const card = document.createElement('div');
      card.className = 'pedido-card';
      
      // Productos comprados string
      let productosHTML = '';
      if (pedido.productos && pedido.productos.length > 0) {
        const prodList = pedido.productos.map(p => `${p.emoji || '📦'} ${p.cantidad ? p.cantidad + 'x ' : ''}${p.nombre}`).join('<br>');
        productosHTML = `
          <div class="pedido-productos">
            <strong>Productos comprados:</strong>
            ${prodList}
          </div>
        `;
      }

      // Imagen del negocio
      let imgWrapHTML = `<div class="pedido-img-placeholder">${pedido.negocioNombre ? pedido.negocioNombre.charAt(0) : 'N'}</div>`;
      if (pedido.negocioImg) {
        imgWrapHTML = `<img src="${pedido.negocioImg}" alt="${pedido.negocioNombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                       <div class="pedido-img-placeholder" style="display:none;">${pedido.negocioNombre.charAt(0)}</div>`;
      }

      // Sección del historial: Calificación y comentario (mock si no existe)
      let reviewHTML = '';
      if (esCompletado) {
        const calificacion = pedido.calificacion || 5;
        const comentario = pedido.comentario || 'Excelente servicio, muy recomendado.';
        reviewHTML = `
          <div class="pedido-review">
            <strong>Tu calificación: ${'⭐'.repeat(calificacion)}</strong>
            "${comentario}"
          </div>
        `;
      }

      card.innerHTML = `
        <div class="pedido-header">
          <span class="pedido-id">${pedido.id}</span>
          <span class="pedido-fecha">${fecha} • ${hora}</span>
        </div>
        <div class="pedido-body">
          <div class="pedido-img-wrap">
            ${imgWrapHTML}
          </div>
          <div class="pedido-info">
            <h3>
              ${pedido.negocioNombre}
              <span class="sello-verificado" title="Negocio Verificado">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
            </h3>
            <p>Vía ${pedido.metodoPago || 'TrustPay'}</p>
            ${productosHTML}
            ${reviewHTML}
          </div>
          <div class="pedido-monto">
            S/. ${pedido.total.toFixed(2)}
          </div>
        </div>
        <div class="pedido-footer-top">
          <div class="pedido-estado ${estadoClass}">
            <span class="estado-punto ${estadoPuntoClass}"></span>
            ${estadoTexto}
          </div>
        </div>
        <div class="pedido-acciones">
          ${!esCompletado ? `
            <button class="btn-accion-pri btn-seguir" data-id="${pedido.id}">Seguir pedido</button>
          ` : `
            <button class="btn-accion-sec btn-detalle" data-id="${pedido.id}">Ver detalle</button>
            <button class="btn-accion-pri btn-volver-comprar" data-id="${pedido.id}">Volver a comprar</button>
          `}
        </div>
      `;

      // Eventos
      if (!esCompletado) {
        const btnSeguir = card.querySelector('.btn-seguir');
        btnSeguir.addEventListener('click', () => {
          window.location.href = 'tracking.html';
        });
      } else {
        const btnDetalle = card.querySelector('.btn-detalle');
        btnDetalle.addEventListener('click', () => {
          alert('Detalle completo del pedido en desarrollo.');
        });
        const btnVolver = card.querySelector('.btn-volver-comprar');
        btnVolver.addEventListener('click', () => {
          if (pedido.productos) {
            const reconstructedCart = pedido.productos.map(p => ({
              ...p,
              negocioId: pedido.negocioId,
              negocioNombre: pedido.negocioNombre,
              cantidad: p.cantidad || 1
            }));
            if (typeof TrustPayStorage !== 'undefined') {
              TrustPayStorage.set('trustpay_cart', reconstructedCart);
            }
          }
          window.location.href = 'seleccion.html';
        });
      }

      container.appendChild(card);
    });
  }

  // Manejo de pestañas
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('activo'));
      tab.classList.add('activo');
      tabActual = tab.getAttribute('data-tab');
      renderPedidos();
    });
  });

  // Botón Volver
  const btnBack = document.getElementById('btn-back-pedidos');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      window.location.href = '../index.html';
    });
  }

  // Inicializar
  renderPedidos();
});
