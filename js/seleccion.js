/* ============================================================
   SELECCION.JS
   Lógica para la Pantalla 2: Selección de negocio, Catálogo y Carrito.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtener datos globales
  const negociosData = (typeof TrustPayData !== 'undefined') ? TrustPayData.getNegocios() : [];

  // Elementos DOM de Negocios
  const seccionNegocios = document.getElementById('seccion-negocios');
  const negociosContainer = document.getElementById('negocios-container');
  const searchInput = document.getElementById('search-input');
  const categoriaButtons = document.querySelectorAll('.categoria-item');
  
  // Elementos DOM de Catálogo
  const seccionCatalogo = document.getElementById('seccion-catalogo');
  const btnBackCatalogo = document.getElementById('btn-back-catalogo');
  const catNegocioNombre = document.getElementById('catalogo-negocio-nombre');
  const catNegocioMeta = document.getElementById('catalogo-negocio-meta');
  const bannerEstado = document.getElementById('banner-estado-negocio');
  const searchProducto = document.getElementById('search-producto');
  const productosContainer = document.getElementById('productos-container');

  // Elementos DOM Modal Producto
  const modalProducto = document.getElementById('producto-modal');
  const btnCloseModal = document.getElementById('btn-close-producto');
  const btnComprarAhora = document.getElementById('btn-comprar-ahora');
  const btnAddCart = document.getElementById('btn-add-cart');

  // Elementos DOM Carrito
  const btnFloatingCart = document.getElementById('btn-floating-cart');
  const cartBadge = document.getElementById('cart-badge');
  const cartModal = document.getElementById('cart-modal');
  const btnCloseCart = document.getElementById('btn-close-cart');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const btnCheckoutCart = document.getElementById('btn-checkout-cart');

  // Estado Local
  let filtroCategoria = null;
  let filtroBusqueda = '';
  let negocioActual = null;
  let productoActual = null;
  let filtroBusquedaProd = '';
  
  // Estado del Carrito
  let cart = [];
  if (typeof TrustPayStorage !== 'undefined') {
    cart = TrustPayStorage.get('trustpay_cart', []);
  }

  /* ================= CARRITO DE COMPRAS ================= */
  function guardarCarrito() {
    if (typeof TrustPayStorage !== 'undefined') {
      TrustPayStorage.set('trustpay_cart', cart);
    }
    actualizarBadgeCarrito();
  }

  function actualizarBadgeCarrito() {
    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
    const cartBadgeText = document.getElementById('cart-badge-text');
    const btnHeaderCart = document.getElementById('btn-header-cart');
    
    if (cartBadgeText) {
      cartBadgeText.textContent = totalItems;
      if (totalItems > 0) {
        cartBadgeText.style.display = 'flex';
        btnHeaderCart.classList.add('has-items');
      } else {
        cartBadgeText.style.display = 'none';
        btnHeaderCart.classList.remove('has-items');
        cartModal.classList.remove('show');
      }
    }
  }

  function renderCarrito() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <p>Tu carrito está vacío</p>
        </div>
      `;
      btnCheckoutCart.disabled = true;
      cartSubtotal.textContent = 'S/. 0.00';
      return;
    }

    cart.forEach((item, index) => {
      const itemSubtotal = item.precio * item.cantidad;
      subtotal += itemSubtotal;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="cart-item-img">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-nombre">${item.nombre}</div>
          <div class="cart-item-precio">S/. ${item.precio.toFixed(2)} c/u</div>
          <div style="font-size: 11px; color: var(--texto-terciario); margin-top:2px;">De: ${item.negocioNombre}</div>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn btn-minus">-</button>
          <span class="qty-val">${item.cantidad}</span>
          <button class="qty-btn btn-plus">+</button>
          <button class="btn-remove-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `;

      div.querySelector('.btn-minus').addEventListener('click', () => {
        if (item.cantidad > 1) {
          item.cantidad--;
          guardarCarrito();
          renderCarrito();
        }
      });
      div.querySelector('.btn-plus').addEventListener('click', () => {
        if (item.cantidad < item.stock) {
          item.cantidad++;
          guardarCarrito();
          renderCarrito();
        } else {
          TrustPayToast.show('No hay más stock disponible.', 'error');
        }
      });
      div.querySelector('.btn-remove-item').addEventListener('click', () => {
        cart.splice(index, 1);
        guardarCarrito();
        renderCarrito();
      });

      cartItemsContainer.appendChild(div);
    });

    cartSubtotal.textContent = `S/. ${subtotal.toFixed(2)}`;
    btnCheckoutCart.disabled = false;
  }

  const btnHeaderCart = document.getElementById('btn-header-cart');
  if (btnHeaderCart) {
    btnHeaderCart.addEventListener('click', () => {
      renderCarrito();
      cartModal.classList.add('show');
    });
  }

  if (btnCloseCart) {
    btnCloseCart.addEventListener('click', () => {
      cartModal.classList.remove('show');
    });
  }

  if (btnCheckoutCart) {
    btnCheckoutCart.addEventListener('click', () => {
      if (cart.length === 0) return;
      
      const firstNegocioId = cart[0].negocioId;
      const sameBusiness = cart.every(i => i.negocioId === firstNegocioId);
      
      if (!sameBusiness) {
        TrustPayToast.show('Por ahora solo puedes pedir de un negocio a la vez. Por favor, limpia tu carrito.', 'error');
        return;
      }

      const negocioDelCarrito = negociosData.find(n => n.id === firstNegocioId);

      if (typeof TrustPayStorage !== 'undefined') {
        TrustPayStorage.set('selected_business', negocioDelCarrito);
        TrustPayStorage.set('cart_checkout', cart);
      }
      window.location.href = 'confirmar_compra.html';
    });
  }

  /* ================= VISTA NEGOCIOS ================= */
  // ... rest of the views omitted for replacing until renderProductos ...
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
      
      let imgHTML = `<div class="negocio-img-placeholder">${negocio.inicial}</div>`;
      if (negocio.img) {
        imgHTML = `<img src="${negocio.img}" class="negocio-img" alt="${negocio.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                   <div class="negocio-img-placeholder" style="display:none;">${negocio.inicial}</div>`;
      }

      let colorEstado = 'var(--verde-custodia)';
      if (negocio.estado.includes('Cerrado')) colorEstado = 'var(--rojo-alerta)';
      if (negocio.estado.includes('Próximo')) colorEstado = '#FF7A00';

      card.innerHTML = `
        <div class="negocio-img-wrap">
          ${imgHTML}
        </div>
        <div class="negocio-info">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="negocio-tag">${negocio.categoria}</span>
            <span style="font-size: 10px; color: var(--texto-secundario);">⭐ ${negocio.calificacion}</span>
          </div>
          <h3 class="negocio-nombre">
            ${negocio.nombre}
            <span class="sello-verificado" title="Negocio Verificado">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
          </h3>
          <p class="negocio-dir">${negocio.direccion}</p>
          <div class="negocio-meta">
            <span class="negocio-estado" style="color: ${colorEstado};">
              <span class="estado-punto" style="background-color: ${colorEstado};"></span>
              ${negocio.estado}
            </span>
            <button class="btn-ver-productos" data-id="${negocio.id}">Ver Catálogo</button>
          </div>
        </div>
      `;

      const btnVer = card.querySelector('.btn-ver-productos');
      btnVer.addEventListener('click', () => {
        abrirCatalogo(negocio);
      });

      negociosContainer.appendChild(card);
    });
  }

  searchInput.addEventListener('input', (e) => {
    filtroBusqueda = e.target.value.toLowerCase().trim();
    renderNegocios();
  });

  categoriaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      if (filtroCategoria === cat) {
        filtroCategoria = null;
        btn.classList.remove('seleccionado');
      } else {
        filtroCategoria = cat;
        categoriaButtons.forEach(b => b.classList.remove('seleccionado'));
        btn.classList.add('seleccionado');
      }
      renderNegocios();
    });
  });

  const btnBackPrincipal = document.getElementById('btn-back-seleccion');
  if (btnBackPrincipal) {
    btnBackPrincipal.addEventListener('click', () => {
      window.location.href = '../index.html';
    });
  }


  /* ================= VISTA CATÁLOGO ================= */
  function abrirCatalogo(negocio) {
    negocioActual = negocio;
    filtroBusquedaProd = '';
    searchProducto.value = '';

    catNegocioNombre.textContent = negocio.nombre;
    catNegocioMeta.textContent = `${negocio.estado} • ${negocio.tiempo_entrega} • ⭐ ${negocio.calificacion} (${negocio.ventas})`;
    document.getElementById('catalogo-negocio-desc').textContent = negocio.descripcion;
    
    if (negocio.portada) {
      document.getElementById('catalogo-portada').style.backgroundImage = `url('${negocio.portada}')`;
    } else {
      document.getElementById('catalogo-portada').style.backgroundImage = `url('../assets/placeholder_portada.jpg')`; // fallback
    }

    if (negocio.img) {
      document.getElementById('catalogo-logo').innerHTML = `<img src="${negocio.img}" style="width:100%; height:100%; object-fit:cover;">`;
    } else {
      document.getElementById('catalogo-logo').innerHTML = negocio.inicial;
    }
    
    const btnFav = document.getElementById('btn-fav-negocio');
    const favs = (typeof TrustPayStorage !== 'undefined') ? TrustPayStorage.get('fav_negocios', []) : [];
    
    if (favs.includes(negocio.id)) {
      btnFav.classList.add('active');
    } else {
      btnFav.classList.remove('active');
    }
    
    // Solo un listener para el botón, remover anteriores
    const newBtnFav = btnFav.cloneNode(true);
    btnFav.parentNode.replaceChild(newBtnFav, btnFav);
    
    newBtnFav.addEventListener('click', () => {
      let currentFavs = TrustPayStorage.get('fav_negocios', []);
      if (currentFavs.includes(negocio.id)) {
        currentFavs = currentFavs.filter(id => id !== negocio.id);
        newBtnFav.classList.remove('active');
        TrustPayToast.show('Eliminado de tus favoritos', 'info');
      } else {
        currentFavs.push(negocio.id);
        newBtnFav.classList.add('active');
        TrustPayToast.show('Guardado en favoritos', 'success');
      }
      TrustPayStorage.set('fav_negocios', currentFavs);
    });

    if (negocio.estado === 'Cerrado temporalmente') {
      bannerEstado.className = 'banner-estado cerrado';
      bannerEstado.textContent = 'Este negocio está cerrado temporalmente. Puedes ver el catálogo pero no podrás comprar ahora mismo.';
      bannerEstado.style.display = 'block';
    } else if (negocio.estado === 'Próximo a abrir') {
      bannerEstado.className = 'banner-estado proximo';
      bannerEstado.textContent = `Abre a las ${negocio.horario.split('-')[0].trim()}. Puedes explorar su menú.`;
      bannerEstado.style.display = 'block';
    } else {
      bannerEstado.style.display = 'none';
    }

    renderProductos();

    seccionNegocios.style.display = 'none';
    document.querySelector('.search-box').style.display = 'none';
    document.querySelectorAll('.seccion-wrap')[0].style.display = 'none';
    
    document.querySelector('.cuerpo-seleccion').classList.add('modo-catalogo');
    seccionCatalogo.style.display = 'block';
  }

  function renderProductos() {
    productosContainer.innerHTML = '';
    
    const filtrados = negocioActual.items.filter(p => p.nombre.toLowerCase().includes(filtroBusquedaProd));

    if(filtrados.length === 0) {
      productosContainer.innerHTML = `<p style="color: var(--texto-secundario); font-size: 14px; grid-column: 1/-1;">No se encontraron productos.</p>`;
      return;
    }

    filtrados.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'producto-card';
      
      const badgeDestacado = prod.destacado ? `<div class="badge-destacado">Destacado</div>` : '';
      const tagEstado = prod.estado_producto ? `<span class="tag-estado-prod">${prod.estado_producto}</span>` : '';
      
      card.innerHTML = `
        <div class="producto-img-wrap" style="position:relative;">
          ${badgeDestacado}
          ${prod.img ? `<img src="${prod.img}" alt="${prod.nombre}">` : prod.emoji}
        </div>
        <div class="producto-info">
          ${tagEstado}
          <div class="producto-nombre">${prod.nombre}</div>
          <div class="producto-desc-corta">${prod.descripcion}</div>
          <div class="producto-precio-row">
            <span class="producto-precio">S/. ${prod.precio.toFixed(2)}</span>
          </div>
          <div class="producto-meta-row">
            <span class="stock-text">Stock: ${prod.stock}</span>
            <span class="disp-text" style="color: ${prod.disponibilidad ? 'var(--verde-custodia)' : 'var(--rojo-alerta)'}">
              ${prod.disponibilidad ? 'Disponible' : 'Agotado'}
            </span>
          </div>
          <button class="btn-add-cart-card ${(!prod.disponibilidad || negocioActual.estado === 'Cerrado temporalmente') ? 'disabled' : ''}">
            Agregar al carrito
          </button>
        </div>
      `;

      // Clic en la tarjeta va al detalle
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-add-cart-card')) return; // No navegar si hizo clic en botón de agregar
        
        if (typeof TrustPayStorage !== 'undefined') {
          TrustPayStorage.set('selected_product', prod);
          TrustPayStorage.set('selected_business', negocioActual);
        }
        window.location.href = 'producto.html';
      });

      // Clic en el botón "Agregar al carrito"
      const btnAddCard = card.querySelector('.btn-add-cart-card');
      btnAddCard.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (!prod.disponibilidad || negocioActual.estado === 'Cerrado temporalmente') return;

        if (cart.length > 0 && cart[0].negocioId !== negocioActual.id) {
          TrustPayToast.show('Tu carrito tiene productos de otro negocio. Solo puedes comprar de un negocio a la vez.', 'error');
          return;
        }

        const exist = cart.find(i => i.id === prod.id);
        if (exist) {
          if (exist.cantidad < prod.stock) {
            exist.cantidad++;
          } else {
            TrustPayToast.show('Stock máximo alcanzado para este producto.', 'info');
            return;
          }
        } else {
          cart.push({
            ...prod,
            negocioId: negocioActual.id,
            negocioNombre: negocioActual.nombre,
            cantidad: 1
          });
        }
        guardarCarrito();
        TrustPayToast.show('Agregado al carrito', 'success');
      });

      productosContainer.appendChild(card);
    });
  }

  searchProducto.addEventListener('input', (e) => {
    filtroBusquedaProd = e.target.value.toLowerCase().trim();
    renderProductos();
  });

  btnBackCatalogo.addEventListener('click', () => {
    seccionCatalogo.style.display = 'none';
    seccionNegocios.style.display = 'flex';
    document.querySelector('.search-box').style.display = 'block';
    document.querySelectorAll('.seccion-wrap')[0].style.display = 'flex';
    document.querySelector('.cuerpo-seleccion').classList.remove('modo-catalogo');
  });


  // --- Modal Producto eliminado ---
  // Toda la lógica de "abrirModalProducto" ha sido delegada a producto.html

  // --- Interceptar Búsqueda Global y Retorno de Producto ---
  if (typeof TrustPayStorage !== 'undefined') {
    const returnTarget = TrustPayStorage.get('return_to_catalog');
    if (returnTarget) {
      TrustPayStorage.remove('return_to_catalog');
      const neg = negociosData.find(n => n.id === returnTarget);
      if (neg) {
        abrirCatalogo(neg);
      } else {
        renderNegocios();
      }
    } else {
      const searchTarget = TrustPayStorage.get('global_search_target');
      if (searchTarget) {
        TrustPayStorage.remove('global_search_target'); // Limpiar
        const neg = negociosData.find(n => n.id === searchTarget.negocioId);
        if (neg) {
          abrirCatalogo(neg);
          const prod = neg.items.find(p => p.id === searchTarget.productoId);
          if (prod) {
            TrustPayStorage.set('selected_product', prod);
            TrustPayStorage.set('selected_business', neg);
            window.location.href = 'producto.html';
          }
        }
      } else {
        // Inicializar normal
        renderNegocios();
      }
    }
  } else {
    renderNegocios();
  }

  // Inicializar Carrito y UI
  actualizarBadgeCarrito();
});
