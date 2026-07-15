/* ============================================================
   SELECCION.JS
   Lógica para la Pantalla 2: Selección de negocio.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Datos simulados de negocios locales de Trujillo
  const negociosData = [
    {
      id: 1,
      nombre: 'La Trattoria',
      categoria: 'restaurante',
      direccion: 'Av. Fátima 123, Centro',
      estado: 'Abierto ahora',
      inicial: 'T',
      img: '../assets/la_trattoria.png',
      items: [
        { nombre: 'Pizza Familiar', precio: 28.00 },
        { nombre: 'Gaseosa 1.5L', precio: 7.00 }
      ]
    },
    {
      id: 2,
      nombre: 'Tienda Mi Hogar',
      categoria: 'tienda',
      direccion: 'Ca. Los Álamos 240, Centro',
      estado: 'Abierto ahora',
      inicial: 'H',
      img: '../assets/tienda_mi_hogar.png',
      items: [
        { nombre: 'Canasta Básica Abarrotes', precio: 45.00 },
        { nombre: 'Detergente Premium 2kg', precio: 15.00 }
      ]
    },
    {
      id: 3,
      nombre: 'Farmacia Trujillo',
      categoria: 'farmacia',
      direccion: 'Av. Larco 560, Trujillo',
      estado: 'Abierto ahora',
      inicial: 'F',
      img: '',
      items: [
        { nombre: 'Botiquín de Emergencia', precio: 30.00 },
        { nombre: 'Mascarillas KN95 x10', precio: 10.00 }
      ]
    },
    {
      id: 4,
      nombre: 'Hamburguesas El Charrúa',
      categoria: 'restaurante',
      direccion: 'Av. Húsares de Junín 410',
      estado: 'Abierto ahora',
      inicial: 'C',
      img: '',
      items: [
        { nombre: 'Hamburguesa Especial', precio: 18.00 },
        { nombre: 'Papas Nativas Chicas', precio: 6.00 }
      ]
    }
  ];

  const negociosContainer = document.getElementById('negocios-container');
  const searchInput = document.getElementById('search-input');
  const categoriaButtons = document.querySelectorAll('.categoria-item');
  const btnBack = document.getElementById('btn-back-seleccion');

  let filtroCategoria = null;
  let filtroBusqueda = '';

  // 2. Función de renderizado
  function renderNegocios() {
    negociosContainer.innerHTML = '';

    const filtrados = negociosData.filter(negocio => {
      const cumpleCat = !filtroCategoria || negocio.categoria === filtroCategoria;
      const cumpleBusqueda = negocio.nombre.toLowerCase().includes(filtroBusqueda) || 
                             negocio.direccion.toLowerCase().includes(filtroBusqueda);
      return cumpleCat && cumpleBusqueda;
    });

    if (filtrados.length === 0) {
      negociosContainer.innerHTML = `
        <div class="no-resultados">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p>No se encontraron negocios con esos criterios.</p>
        </div>
      `;
      return;
    }

    filtrados.forEach(negocio => {
      const card = document.createElement('div');
      card.className = 'negocio-card';
      
      // Construir la imagen o usar el placeholder con la inicial
      let imgHTML = `<div class="negocio-img-placeholder">${negocio.inicial}</div>`;
      if (negocio.img) {
        imgHTML = `<img src="${negocio.img}" class="negocio-img" alt="${negocio.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                   <div class="negocio-img-placeholder" style="display:none;">${negocio.inicial}</div>`;
      }

      card.innerHTML = `
        <div class="negocio-img-wrap">
          ${imgHTML}
        </div>
        <div class="negocio-info">
          <span class="negocio-tag">${negocio.categoria}</span>
          <h3 class="negocio-nombre">${negocio.nombre}</h3>
          <p class="negocio-dir">${negocio.direccion}</p>
          <div class="negocio-meta">
            <span class="negocio-estado">${negocio.estado}</span>
            <button class="btn-ver-productos" data-id="${negocio.id}">Ver productos</button>
          </div>
        </div>
      `;

      // Escuchar clic en "Ver productos"
      const btnVer = card.querySelector('.btn-ver-productos');
      btnVer.addEventListener('click', () => {
        seleccionarNegocio(negocio);
      });

      negociosContainer.appendChild(card);
    });
  }

  // 3. Guardar selección e ir al checkout
  function seleccionarNegocio(negocio) {
    // Guardamos en storage.js
    if (typeof TrustPayStorage !== 'undefined') {
      TrustPayStorage.set('selected_business', negocio);
    }
    // Navegar a confirmar compra
    window.location.href = 'confirmar_compra.html';
  }

  // 4. Escuchar eventos de buscador
  searchInput.addEventListener('input', (e) => {
    filtroBusqueda = e.target.value.toLowerCase().trim();
    renderNegocios();
  });

  // 5. Escuchar eventos de categorías
  categoriaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      
      if (filtroCategoria === cat) {
        // Deseleccionar si ya estaba marcado
        filtroCategoria = null;
        btn.classList.remove('seleccionado');
      } else {
        // Seleccionar nuevo
        filtroCategoria = cat;
        categoriaButtons.forEach(b => b.classList.remove('seleccionado'));
        btn.classList.add('seleccionado');
      }
      renderNegocios();
    });
  });

  // 6. Botón volver
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      window.location.href = '../index.html';
    });
  }

  // Inicializar renderizado
  renderNegocios();
});
