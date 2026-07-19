const TrustPayModals = (function() {
  const modalsHTML = `
    <!-- Modal Políticas de envío -->
    <div id="modal-politicas-envio" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" onclick="TrustPayModals.close('modal-politicas-envio')">&times;</button>
        <h3>Políticas de envío</h3>
        <p class="modal-sub">Condiciones y tiempos de entrega</p>
        <div style="text-align: left; font-size: 12.5px; color: var(--texto-secundario); margin-top: 16px; line-height: 1.6;">
          <p style="margin-bottom: 10px;">📦 <strong>Envíos Locales:</strong> Todos los envíos dentro de Trujillo se realizan en un plazo máximo de 45 minutos para comida, y 24 horas para tiendas.</p>
          <p style="margin-bottom: 10px;">🛡️ <strong>Responsabilidad:</strong> El negocio y el repartidor son responsables del estado del producto hasta que llegue a tus manos.</p>
        </div>
      </div>
    </div>

    <!-- Modal Términos y Condiciones -->
    <div id="modal-terminos" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" onclick="TrustPayModals.close('modal-terminos')">&times;</button>
        <h3>Términos y condiciones</h3>
        <p class="modal-sub">Reglas de uso de la plataforma</p>
        <div style="text-align: left; font-size: 12.5px; color: var(--texto-secundario); margin-top: 16px; line-height: 1.6;">
          <p style="margin-bottom: 10px;">📄 <strong>Acuerdo Comercial:</strong> Al usar TrustPay, aceptas que somos un intermediario tecnológico para procesar tu pago de forma segura.</p>
          <p style="margin-bottom: 10px;">⚖️ <strong>Uso Correcto:</strong> Está prohibido el uso de la plataforma para fines ilícitos o transacciones fraudulentas.</p>
        </div>
      </div>
    </div>

    <!-- Modal Preguntas frecuentes -->
    <div id="modal-preguntas" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" onclick="TrustPayModals.close('modal-preguntas')">&times;</button>
        <h3>Preguntas Frecuentes</h3>
        <div style="text-align: left; font-size: 12.5px; color: var(--texto-secundario); margin-top: 16px; line-height: 1.6;">
          <p style="margin-bottom: 10px;"><strong>¿Cómo funciona la compra segura?</strong><br>Tu dinero se retiene en TrustPay y solo se transfiere al comercio cuando confirmas la recepción exitosa.</p>
          <p style="margin-bottom: 10px;"><strong>¿Qué pasa si no llega mi pedido?</strong><br>Puedes reportarlo en la app y solicitar tu reembolso automático de forma inmediata.</p>
        </div>
      </div>
    </div>

    <!-- Modal Contáctanos -->
    <div id="modal-contacto" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" onclick="TrustPayModals.close('modal-contacto')">&times;</button>
        <h3>Contáctanos</h3>
        <p class="modal-sub">Estamos aquí para ayudarte</p>
        <div style="text-align: left; font-size: 12.5px; color: var(--texto-secundario); margin-top: 16px; line-height: 1.6;">
          <p style="margin-bottom: 10px;">📧 <strong>Correo:</strong> soporte@trustpay.pe</p>
          <p style="margin-bottom: 10px;">📞 <strong>Línea Gratuita:</strong> 0800-123-456</p>
          <p>📍 <strong>Oficina Central:</strong> Av. España 1234, Centro Histórico, Trujillo.</p>
        </div>
      </div>
    </div>

    <!-- Modal Política y protección de datos -->
    <div id="modal-datos" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" onclick="TrustPayModals.close('modal-datos')">&times;</button>
        <h3>Protección de datos</h3>
        <div style="text-align: left; font-size: 12.5px; color: var(--texto-secundario); margin-top: 16px; line-height: 1.6;">
          <p style="margin-bottom: 10px;">🛡️ <strong>Ley N° 29733:</strong> Cumplimos estrictamente con la Ley de Protección de Datos Personales.</p>
          <p style="margin-bottom: 10px;">🔒 <strong>Privacidad:</strong> Tus datos financieros nunca son compartidos con los negocios, usamos pasarelas certificadas y encriptación de extremo a extremo.</p>
        </div>
      </div>
    </div>

    <!-- Modal Bases legales -->
    <div id="modal-bases" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" onclick="TrustPayModals.close('modal-bases')">&times;</button>
        <h3>Bases legales</h3>
        <div style="text-align: left; font-size: 12.5px; color: var(--texto-secundario); margin-top: 16px; line-height: 1.6;">
          <p style="margin-bottom: 10px;">⚖️ <strong>TrustPay Tech S.A.C.</strong> está registrada en Perú y opera bajo las normativas de comercio electrónico vigentes y regulaciones de INDECOPI.</p>
        </div>
      </div>
    </div>
    
    <!-- Modal Libro Reclamaciones -->
    <div id="modal-libro" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" onclick="TrustPayModals.close('modal-libro')">&times;</button>
        <h3>Libro de Reclamaciones</h3>
        <p class="modal-sub">Conforme al Código de Protección y Defensa del Consumidor</p>
        <div style="text-align: left; font-size: 12.5px; color: var(--texto-secundario); margin-top: 16px; line-height: 1.6;">
          <p style="margin-bottom: 10px;">Para presentar un reclamo formal, por favor envíanos un correo a <strong>reclamos@trustpay.pe</strong> con los siguientes datos:</p>
          <ul style="padding-left: 16px; margin-bottom: 10px;">
             <li>Nombres completos y DNI</li>
             <li>Número de pedido (Ej. ORD-XXXX)</li>
             <li>Motivo del reclamo detallado</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Modal Sobre nosotros (Global) -->
    <div id="modal-sobre-nosotros" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" onclick="TrustPayModals.close('modal-sobre-nosotros')">&times;</button>
        <h3>Sobre TrustPay</h3>
        <p class="modal-sub">Impulsando el comercio local con confianza.</p>
        <div style="text-align: left; font-size: 12.5px; color: var(--texto-secundario); margin-top: 16px; line-height: 1.6;">
          <p style="margin-bottom: 10px;">👋 <strong>¿Quiénes somos?</strong> Somos una plataforma tecnológica trujillana, diseñada para brindar máxima seguridad y confianza a clientes y negocios locales.</p>
          <p style="margin-bottom: 10px;">🚀 <strong>Nuestra Misión:</strong> Eliminar el riesgo de estafas en el ecosistema de pagos digitales y ayudar a digitalizar mercados tradicionales.</p>
          <p>💎 <strong>Valores:</strong> Transparencia, Seguridad Absoluta y Apoyo al Emprendedor Local.</p>
        </div>
      </div>
    </div>
  `;

  let initialized = false;

  function init() {
    if (initialized) return;
    const container = document.createElement('div');
    container.id = 'trustpay-global-modals';
    container.innerHTML = modalsHTML;
    document.body.appendChild(container);
    initialized = true;

    // Agregar listeners para cerrar al hacer clic afuera
    document.querySelectorAll('#trustpay-global-modals .modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
        }
      });
    });
  }

  function show(modalId) {
    if (!initialized) init();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
    }
  }

  function close(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
    }
  }

  return {
    init,
    show,
    close
  };
})();

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
  TrustPayModals.init();
});
