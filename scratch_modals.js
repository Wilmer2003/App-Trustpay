const fs = require('fs');

function updateLinksAndIncludeScript(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace onclicks
  content = content.replace(/TrustPayToast\.show\('Abriendo Políticas de envío\.\.\.', 'info'\)/g, "TrustPayModals.show('modal-politicas-envio')");
  content = content.replace(/TrustPayToast\.show\('Abriendo Términos y condiciones\.\.\.', 'info'\)/g, "TrustPayModals.show('modal-terminos')");
  content = content.replace(/TrustPayToast\.show\('Abriendo Preguntas frecuentes\.\.\.', 'info'\)/g, "TrustPayModals.show('modal-preguntas')");
  content = content.replace(/TrustPayToast\.show\('Abriendo Formulario de Contacto\.\.\.', 'info'\)/g, "TrustPayModals.show('modal-contacto')");
  content = content.replace(/TrustPayToast\.show\('Abriendo Sobre nosotros\.\.\.', 'info'\)/g, "TrustPayModals.show('modal-sobre-nosotros')");
  content = content.replace(/TrustPayToast\.show\('Abriendo Política de datos\.\.\.', 'info'\)/g, "TrustPayModals.show('modal-datos')");
  content = content.replace(/TrustPayToast\.show\('Abriendo Bases legales\.\.\.', 'info'\)/g, "TrustPayModals.show('modal-bases')");
  content = content.replace(/TrustPayToast\.show\('Abriendo Libro de Reclamaciones\.\.\.', 'info'\)/g, "TrustPayModals.show('modal-libro')");
  
  // Include script if not present
  if (!content.includes('modals.js')) {
    if (file.includes('index.html')) {
      content = content.replace('<script src="js/toast.js?v=12"></script>', '<script src="js/toast.js?v=12"></script>\n<script src="js/modals.js?v=1"></script>');
    } else {
      content = content.replace('<script src="../js/toast.js', '<script src="../js/modals.js?v=1"></script>\n<script src="../js/toast.js');
    }
  }

  fs.writeFileSync(file, content);
}

updateLinksAndIncludeScript('index.html');
updateLinksAndIncludeScript('pages/seleccion.html');
updateLinksAndIncludeScript('pages/perfil.html');

console.log('Done modifying HTML files');
