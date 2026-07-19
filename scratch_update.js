const fs = require('fs');
let file = 'pages/seleccion.html';
let content = fs.readFileSync(file, 'utf8');

// Replace libro
content = content.replace(
  '<div class="libro-reclamaciones">',
  '<div class="libro-reclamaciones" onclick="TrustPayToast.show(\'Abriendo Libro de Reclamaciones...\', \'info\')">'
);

// Replace lists
content = content.replace(
  '<li><a href="#"><span class="icon">🚚</span> Seguimiento de pedido</a></li>\r\n',
  ''
);
content = content.replace(
  '<li><a href="#"><span class="icon">🏪</span> Nuestras tiendas</a></li>\r\n',
  ''
);
content = content.replace(
  '<li><a href="#"><span class="icon">📦</span> Políticas de envío</a></li>',
  '<li><a href="#" onclick="TrustPayToast.show(\'Abriendo Políticas de envío...\', \'info\'); return false;"><span class="icon">📦</span> Políticas de envío</a></li>'
);
content = content.replace(
  '<li><a href="#"><span class="icon">📄</span> Términos y condiciones</a></li>',
  '<li><a href="#" onclick="TrustPayToast.show(\'Abriendo Términos y condiciones...\', \'info\'); return false;"><span class="icon">📄</span> Términos y condiciones</a></li>'
);
content = content.replace(
  '<li><a href="#"><span class="icon">❓</span> Preguntas frecuentes</a></li>',
  '<li><a href="#" onclick="TrustPayToast.show(\'Abriendo Preguntas frecuentes...\', \'info\'); return false;"><span class="icon">❓</span> Preguntas frecuentes</a></li>'
);
content = content.replace(
  '<li><a href="#"><span class="icon">💬</span> Contáctanos</a></li>',
  '<li><a href="#" onclick="TrustPayToast.show(\'Abriendo Formulario de Contacto...\', \'info\'); return false;"><span class="icon">💬</span> Contáctanos</a></li>'
);
content = content.replace(
  '<li><a href="#"><span class="icon">🚀</span> Sobre nosotros</a></li>',
  '<li><a href="#" onclick="TrustPayToast.show(\'Abriendo Sobre nosotros...\', \'info\'); return false;"><span class="icon">🚀</span> Sobre nosotros</a></li>'
);
content = content.replace(
  '<li><a href="#"><span class="icon">🛡️</span> Política y protección de datos</a></li>',
  '<li><a href="#" onclick="TrustPayToast.show(\'Abriendo Política de datos...\', \'info\'); return false;"><span class="icon">🛡️</span> Política y protección de datos</a></li>'
);
content = content.replace(
  '<li><a href="#"><span class="icon">⚖️</span> Bases legales</a></li>',
  '<li><a href="#" onclick="TrustPayToast.show(\'Abriendo Bases legales...\', \'info\'); return false;"><span class="icon">⚖️</span> Bases legales</a></li>'
);

fs.writeFileSync(file, content);
console.log('Done');
