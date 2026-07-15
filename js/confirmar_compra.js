/* ============================================================
   CONFIRMAR_COMPRA.JS
   Lógica para la Pantalla 4: Confirmación de compra.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtener negocio seleccionado desde storage.js
  let negocio = null;
  if (typeof TrustPayStorage !== 'undefined') {
    negocio = TrustPayStorage.get('selected_business');
  }

  // Si no hay negocio seleccionado, redirigir a selección para evitar errores
  if (!negocio) {
    window.location.href = 'seleccion.html';
    return;
  }

  const itemsListContainer = document.getElementById('pedido-items-list');
  const txtComision = document.getElementById('txt-comision');
  const txtTotal = document.getElementById('txt-total');
  const btnYape = document.getElementById('btn-yape');
  const btnPlin = document.getElementById('btn-plin');
  const btnConfirmar = document.getElementById('btn-confirmar-compra');
  const btnCancelar = document.getElementById('btn-cancelar-compra');
  const btnBack = document.getElementById('btn-back-compra');

  let metodoSeleccionado = null;

  // Mapeo simple de emojis para productos del mockup
  const emojiMap = {
    'Pizza Familiar': '🍕',
    'Gaseosa 1.5L': '🥤',
    'Canasta Básica Abarrotes': '📦',
    'Detergente Premium 2kg': '🧼',
    'Botiquín de Emergencia': '🩹',
    'Mascarillas KN95 x10': '😷',
    'Hamburguesa Especial': '🍔',
    'Papas Nativas Chicas': '🍟'
  };

  // 2. Renderizar resumen de productos
  itemsListContainer.innerHTML = '';
  let subtotal = 0;

  negocio.items.forEach(item => {
    subtotal += item.precio;
    const emoji = emojiMap[item.nombre] || '🏷️';
    
    const row = document.createElement('div');
    row.className = 'pedido-item-fila';
    row.innerHTML = `
      <div class="pedido-item-info">
        <div class="pedido-item-icono">${emoji}</div>
        <span class="pedido-item-nombre">${item.nombre}</span>
      </div>
      <span class="pedido-item-precio">S/. ${item.precio.toFixed(2)}</span>
    `;
    itemsListContainer.appendChild(row);
  });

  // Calcular Comisión y Total
  const comision = 0.50; // Comisión fija del mockup
  const total = subtotal + comision;

  txtComision.textContent = `S/. ${comision.toFixed(2)}`;
  txtTotal.textContent = `S/. ${total.toFixed(2)}`;

  // 3. Manejo de selección de método de pago
  function seleccionarMetodo(metodo, btnActivo, btnInactivo) {
    metodoSeleccionado = metodo;
    btnActivo.classList.add('seleccionado');
    btnInactivo.classList.remove('seleccionado');
  }

  btnYape.addEventListener('click', () => seleccionarMetodo('yape', btnYape, btnPlin));
  btnPlin.addEventListener('click', () => seleccionarMetodo('plin', btnPlin, btnYape));

  // 4. Confirmar Compra y crear Pedido Activo
  btnConfirmar.addEventListener('click', () => {
    if (!metodoSeleccionado) {
      alert('Por favor, selecciona un método de pago protegido (Yape o Plin) antes de continuar.');
      return;
    }

    // Crear pedido en estado "Recibido" (1)
    const nuevoPedido = {
      id: 'TP-2847', // ID de pedido del mockup
      negocioId: negocio.id,
      negocioNombre: negocio.nombre,
      montoNegocio: subtotal, // Lo que va al negocio (S/. 35.00 en caso de La Trattoria)
      comision: comision,     // Comisión TrustPay (S/. 0.50)
      total: total,           // Total pagado (S/. 35.50)
      metodoPago: metodoSeleccionado.charAt(0).toUpperCase() + metodoSeleccionado.slice(1), // Capitalizado
      estado: 1,              // 1 = Recibido, 2 = Preparación, 3 = En camino, 4 = Entregado
      repartidorNombre: 'Carlos Mendoza',
      repartidorTelefono: '+51 987 654 321', // Ficticio
      calificacion: 0,
      comentario: '',
      timestamp: Date.now()
    };

    // Guardar en almacenamiento persistente
    if (typeof TrustPayStorage !== 'undefined') {
      TrustPayStorage.set('active_order', nuevoPedido);
    }

    // Redirigir a la pantalla de tracking
    window.location.href = 'tracking.html';
  });

  // 5. Botones cancelar / volver
  const regresar = () => {
    window.location.href = 'seleccion.html';
  };

  btnCancelar.addEventListener('click', regresar);
  if (btnBack) {
    btnBack.addEventListener('click', regresar);
  }
});
