const fs = require('fs');

let content = fs.readFileSync('pages/perfil.html', 'utf8');

// 1. Inject CSS for .perfil-stats
const cssToInsert = `
  .perfil-stats {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    margin-top: 20px;
    padding: 12px 0;
    width: 100%;
    backdrop-filter: blur(4px);
  }
  .stat-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .stat-valor {
    font-size: 16px;
    font-weight: 800;
  }
  .stat-label {
    font-size: 11px;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .stat-divider {
    width: 1px;
    height: 30px;
    background: rgba(255, 255, 255, 0.3);
  }
</style>
`;
content = content.replace('</style>', cssToInsert);

// 2. Inject HTML for stats inside .perfil-card
const statsHTML = `
        <p class="perfil-email" id="txt-perfil-email">No has iniciado sesión</p>
        
        <div class="perfil-stats" id="bloque-stats" style="display: none;">
          <div class="stat-item">
            <span class="stat-valor">350</span>
            <span class="stat-label">Puntos</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-valor">2</span>
            <span class="stat-label">Cupones</span>
          </div>
        </div>
`;
content = content.replace('<p class="perfil-email" id="txt-perfil-email">No has iniciado sesión</p>', statsHTML);

// 3. Remove "Legal y Confianza" section
const legalStart = content.indexOf('<div class="perfil-seccion">\r\n        <h3 class="seccion-titulo">Legal y Confianza</h3>');
const legalEnd = content.indexOf('<!-- Modal Seguridad -->');

if (legalStart !== -1 && legalEnd !== -1) {
  const newSection = `
      <div class="perfil-seccion">
        <h3 class="seccion-titulo">Soporte y Ajustes</h3>
        <div class="seccion-links">
          <button class="btn-opcion btn-proximamente">
            <span class="icon">🎧</span>
            <div class="opcion-textos">
              <span class="opcion-titulo">Centro de Ayuda</span>
              <span class="opcion-sub">Preguntas frecuentes y soporte</span>
            </div>
            <span class="arrow">›</span>
          </button>
          <button class="btn-opcion btn-proximamente">
            <span class="icon">⚙️</span>
            <div class="opcion-textos">
              <span class="opcion-titulo">Configuración</span>
              <span class="opcion-sub">Notificaciones y preferencias</span>
            </div>
            <span class="arrow">›</span>
          </button>
        </div>
      </div>

      `;
  
  // Actually wait, let's just substring replace.
  // We want to replace from <div class="perfil-seccion"> to the end of that div (before Modal Seguridad)
  // But wait, there is also the "Cerrar Sesion" div.
  // The structure is:
  // <div class="perfil-seccion"> [Legal] </div>
  // <div class="perfil-seccion"> [Cerrar Sesion] </div>
  // </div>
  // <!-- Modal Seguridad -->
}
