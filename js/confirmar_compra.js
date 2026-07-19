/* ============================================================
   CONFIRMAR_COMPRA.JS
   Lógica para la Pantalla 4: Confirmación de compra.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  let negocio = null;
  let cart = [];
  
  if (typeof TrustPayStorage !== 'undefined') {
    negocio = TrustPayStorage.get('selected_business');
    cart = TrustPayStorage.get('cart_checkout', []);
  }

  // Si no hay negocio o carrito, redirigir
  if (!negocio || cart.length === 0) {
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
  const loadingOverlay = document.getElementById('loading-overlay');
  const loadingText = document.getElementById('loading-text');

  let metodoSeleccionado = null;

  // 2. Renderizar resumen de los productos del carrito
  itemsListContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const rowSubtotal = item.precio * item.cantidad;
    subtotal += rowSubtotal;

    const row = document.createElement('div');
    row.className = 'pedido-item-fila';
    row.innerHTML = `
      <div class="pedido-item-info">
        <div class="pedido-item-icono">${item.emoji || '📦'}</div>
        <span class="pedido-item-nombre">${item.cantidad}x ${item.nombre}</span>
      </div>
      <span class="pedido-item-precio">S/. ${rowSubtotal.toFixed(2)}</span>
    `;
    itemsListContainer.appendChild(row);
  });

  // Calcular Comisión y Total
  const comision = 1.00;
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
      TrustPayToast.show('Por favor, selecciona un método de pago protegido (Yape o Plin) antes de continuar.', 'error');
      return;
    }

    const numId = Math.floor(Math.random() * 9000) + 1000;
    
    // Mapear productos para el historial
    const orderProducts = cart.map(item => ({
      nombre: item.nombre,
      emoji: item.emoji || '📦',
      precio: item.precio,
      cantidad: item.cantidad
    }));

    // Crear pedido
    const nuevoPedido = {
      id: `TP-${numId}`,
      negocioId: negocio.id,
      negocioNombre: negocio.nombre,
      negocioImg: negocio.img,
      productos: orderProducts,
      montoNegocio: subtotal,
      comision: comision,
      total: total,
      metodoPago: metodoSeleccionado.charAt(0).toUpperCase() + metodoSeleccionado.slice(1),
      estado: 1, 
      estadoFase: 'Pago en custodia',
      repartidorNombre: 'Carlos Mendoza',
      repartidorTelefono: '+51 987 654 321',
      calificacion: 0,
      comentario: '',
      timestamp: Date.now()
    };

    if (typeof TrustPayStorage !== 'undefined') {
      TrustPayStorage.set('active_order', nuevoPedido);
      TrustPayStorage.remove('trustpay_cart'); // Vaciar carrito real al comprar
    }

    const metodoCapitalizado = metodoSeleccionado.charAt(0).toUpperCase() + metodoSeleccionado.slice(1);
    loadingText.textContent = `Conectando con ${metodoCapitalizado}...`;
    loadingOverlay.classList.add('show');

    setTimeout(() => {
      loadingText.textContent = '¡Pago procesado y protegido!';
      setTimeout(() => {
        window.location.href = 'tracking.html';
      }, 700);
    }, 2500);
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
