/* ============================================================
   CONFIRMAR_ENTREGA.JS
   Lógica para la Pantalla 5: Confirmación de entrega.
   Maneja la valoración por estrellas y la liberación de fondos.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtener pedido activo desde storage.js o usar fallback de demo
  let order = null;
  if (typeof TrustPayStorage !== 'undefined') {
    order = TrustPayStorage.get('active_order');
  }

  if (!order) {
    // Fallback de demostración si se abre directamente
    order = {
      id: 'TP-2847',
      negocioNombre: 'La Trattoria',
      montoNegocio: 35.00,
      comision: 0.50,
      total: 35.50,
      metodoPago: 'Yape',
      estado: 4,
      repartidorNombre: 'Carlos Mendoza',
      calificacion: 0,
      comentario: ''
    };
  }

  // Cargar datos en la UI
  document.getElementById('txt-negocio-nombre').textContent = order.negocioNombre;
  document.getElementById('txt-pedido-id').textContent = `#${order.id}`;
  document.getElementById('txt-monto-liberar').textContent = `S/. ${order.montoNegocio.toFixed(2)}`;

  const ratingContainer = document.getElementById('rating-container');
  const stars = ratingContainer.querySelectorAll('.star-btn');
  const inputComentario = document.getElementById('input-comentario');
  const btnConfirmar = document.getElementById('btn-confirmar-liberar');
  const btnReportar = document.getElementById('btn-reportar-problema');

  let calificacionSeleccionada = 0;

  // 2. Lógica interactiva de calificación de estrellas
  function iluminarEstrellas(hastaValor) {
    stars.forEach(star => {
      const val = parseInt(star.getAttribute('data-value'));
      if (val <= hastaValor) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  stars.forEach(star => {
    // Al pasar el mouse
    star.addEventListener('mouseover', () => {
      const hoverValue = parseInt(star.getAttribute('data-value'));
      iluminarEstrellas(hoverValue);
    });

    // Al quitar el mouse, restaurar a la calificación guardada
    star.addEventListener('mouseout', () => {
      iluminarEstrellas(calificacionSeleccionada);
    });

    // Al hacer clic, fijar la calificación
    star.addEventListener('click', () => {
      calificacionSeleccionada = parseInt(star.getAttribute('data-value'));
      iluminarEstrellas(calificacionSeleccionada);
    });
  });

  // 3. Confirmar entrega y liberar fondos al comercio
  btnConfirmar.addEventListener('click', () => {
    if (calificacionSeleccionada === 0) {
      alert('Por favor, califica el servicio antes de confirmar la entrega.');
      return;
    }

    // Actualizar el pedido en storage con la calificación y comentarios
    order.calificacion = calificacionSeleccionada;
    order.comentario = inputComentario.value.trim();
    order.estado = 5; // 5 = Finalizado / Liberado

    if (typeof TrustPayStorage !== 'undefined') {
      TrustPayStorage.set('active_order', order);
      
      // Registrar en el historial de pedidos finalizados
      const historial = TrustPayStorage.get('order_history', []);
      historial.push(order);
      TrustPayStorage.set('order_history', historial);
      
      // Limpiar pedido activo actual para poder hacer uno nuevo
      TrustPayStorage.remove('active_order');
      TrustPayStorage.remove('selected_business');
    }

    // Mostrar modal / mensaje de éxito visual antes de redirigir
    alert(`¡Custodia Liberada! \nSe han transferido S/. ${order.montoNegocio.toFixed(2)} a ${order.negocioNombre}. \n¡Gracias por comprar con seguridad mediante TrustPay!`);
    
    // Redirigir a inicio
    window.location.href = '../index.html';
  });

  // 4. Reportar un problema (Inicia disputa)
  btnReportar.addEventListener('click', () => {
    alert('Soporte de TrustPay:\n\nTu disputa ha sido registrada. Retendremos los fondos en custodia y un asesor de Trujillo se comunicará contigo al celular registrado en menos de 2 horas para mediar la solución con el comercio.');
  });
});
