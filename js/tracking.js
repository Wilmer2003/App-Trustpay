/* ============================================================
   TRACKING.JS
   Lógica para la Pantalla 3: Seguimiento de pedido.
   Maneja la simulación del recorrido del motorizado y el escrow.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtener pedido activo desde storage.js o crear uno por defecto
  let order = null;
  if (typeof TrustPayStorage !== 'undefined') {
    order = TrustPayStorage.get('active_order');
  }

  // Fallback de demostración si se abre directo
  if (!order) {
    order = {
      id: 'TP-2847',
      negocioNombre: 'La Trattoria',
      montoNegocio: 35.00,
      comision: 0.50,
      total: 35.50,
      metodoPago: 'Yape',
      estado: 1, // Empezar en recibido
      repartidorNombre: 'Carlos Mendoza',
      repartidorTelefono: '+51 987 654 321',
      calificacion: 0,
      comentario: '',
      timestamp: Date.now()
    };
    if (typeof TrustPayStorage !== 'undefined') {
      TrustPayStorage.set('active_order', order);
    }
  }

  // Elementos del DOM
  const txtTiempoTitulo = document.getElementById('txt-tiempo-titulo');
  const txtTiempoSub = document.getElementById('txt-tiempo-sub');
  const txtCustodiaStatus = document.getElementById('txt-custodia-status');
  const riderMarker = document.getElementById('rider-marker');
  const btnConfirmarContainer = document.getElementById('confirmar-entrega-btn-container');
  const btnIrConfirmar = document.getElementById('btn-ir-confirmar-entrega');
  const btnBack = document.getElementById('btn-back-tracking');

  const stepCols = document.querySelectorAll('.step-col');
  const simBtns = document.querySelectorAll('.btn-sim-step');

  // Coordenadas del mapa SVG para simular movimiento del repartidor
  // M 60 140 -> L 150 110 -> L 200 80 -> L 340 40
  const coordRuta = {
    1: { x: 60, y: 140 },  // Recibido (en tienda)
    2: { x: 60, y: 140 },  // Preparación (en tienda)
    3: { x: 190, y: 85 },  // En camino (mitad de ruta)
    4: { x: 340, y: 40 }   // Entregado (en destino)
  };

  // Textos correspondientes a cada estado del pedido
  const textosEstado = {
    1: { titulo: 'PEDIDO RECIBIDO', sub: 'Pizzería La Trattoria está confirmando tu orden' },
    2: { titulo: 'PREPARANDO PEDIDO', sub: 'El comercio está preparando tus platos con cuidado' },
    3: { titulo: 'MOTORIZADO EN CAMINO', sub: 'Carlos Mendoza - Tiempo est. 12 minutos' },
    4: { titulo: '¡PEDIDO ENTREGADO!', sub: 'Revisa tu pedido antes de liberar el dinero en custodia' }
  };

  let autoAvanzarInterval = null;

  // 2. Función para actualizar la interfaz según el estado
  function actualizarPantalla() {
    const estado = order.estado;

    // Actualizar textos superiores
    if (textosEstado[estado]) {
      txtTiempoTitulo.textContent = textosEstado[estado].titulo;
      txtTiempoSub.textContent = textosEstado[estado].sub;
    }

    // Actualizar barra de custodia verde
    if (estado === 4) {
      txtCustodiaStatus.innerHTML = `<strong>S/. ${order.total.toFixed(2)} listos para liberar</strong> - Confirma la entrega para pagar al comercio.`;
      // Habilitar botón de confirmación
      btnConfirmarContainer.style.display = 'flex';
      // Efecto suave de alerta en la barra de custodia
      document.querySelector('.custodia-bar').style.boxShadow = '0 0 16px rgba(27,138,90,0.3)';
    } else {
      txtCustodiaStatus.innerHTML = `S/. ${order.total.toFixed(2)} soles en custodia segura - Se liberará al confirmar su entrega.`;
      btnConfirmarContainer.style.display = 'none';
      document.querySelector('.custodia-bar').style.boxShadow = 'none';
    }

    // Actualizar marcador de motorizado en el mapa SVG
    if (riderMarker && coordRuta[estado]) {
      const pos = coordRuta[estado];
      // Animación suave de transición en SVG
      riderMarker.style.transition = 'transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      riderMarker.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
    }

    // Actualizar visual del Stepper
    stepCols.forEach(col => {
      const stepVal = parseInt(col.getAttribute('data-step'));
      col.classList.remove('activo', 'completado');

      if (stepVal < estado) {
        col.classList.add('completado');
      } else if (stepVal === estado) {
        col.classList.add('activo');
      }
    });

    // Actualizar líneas del Stepper
    for (let i = 1; i <= 3; i++) {
      const line = document.getElementById(`line-${i}`);
      if (line) {
        line.classList.remove('activo', 'completado');
        if (i < estado) {
          line.classList.add('completado');
        } else if (i === estado) {
          line.classList.add('activo');
        }
      }
    }

    // Actualizar botones del simulador
    simBtns.forEach(btn => {
      const targetStep = parseInt(btn.getAttribute('data-target-step'));
      if (targetStep === estado) {
        btn.classList.add('activo');
      } else {
        btn.classList.remove('activo');
      }
    });

    // Guardar estado actual
    if (typeof TrustPayStorage !== 'undefined') {
      TrustPayStorage.set('active_order', order);
    }
  }

  // 3. Cambiar de estado manualmente
  function setEstado(nuevoEstado) {
    order.estado = nuevoEstado;
    actualizarPantalla();
  }

  // 4. Temporizador de avance automático (simulación)
  function iniciarAutoAvanzar() {
    autoAvanzarInterval = setInterval(() => {
      if (order.estado < 4) {
        setEstado(order.estado + 1);
      } else {
        detenerAutoAvanzar();
      }
    }, 8000); // Avanzar cada 8 segundos
  }

  function detenerAutoAvanzar() {
    if (autoAvanzarInterval) {
      clearInterval(autoAvanzarInterval);
      autoAvanzarInterval = null;
    }
  }

  // 5. Escuchar botones del simulador
  simBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      detenerAutoAvanzar(); // Pausar simulación automática
      const target = parseInt(btn.getAttribute('data-target-step'));
      setEstado(target);
    });
  });

  // 6. Botón de confirmar entrega
  btnIrConfirmar.addEventListener('click', () => {
    window.location.href = 'confirmar_entrega.html';
  });

  // 7. Botón volver
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      window.location.href = '../index.html';
    });
  }

  // Inicialización
  actualizarPantalla();
  if (order.estado < 4) {
    iniciarAutoAvanzar();
  }
});
