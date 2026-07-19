document.addEventListener('DOMContentLoaded', () => {
  const btnBack = document.getElementById('btn-back');
  
  if (typeof TrustPayStorage === 'undefined' || typeof TrustPayData === 'undefined') {
    window.location.href = 'seleccion.html';
    return;
  }

  const prod = TrustPayStorage.get('selected_product');
  const neg = TrustPayStorage.get('selected_business');

  if (!prod || !neg) {
    window.location.href = 'seleccion.html';
    return;
  }

  // --- Llenar Datos del Producto ---
  if (prod.img) {
    document.getElementById('producto-img-placeholder').style.display = 'none';
    const imgEl = document.getElementById('producto-img');
    imgEl.src = prod.img;
    imgEl.style.display = 'block';
  } else {
    document.getElementById('producto-img-placeholder').textContent = prod.emoji;
    document.getElementById('producto-img-placeholder').style.display = 'flex';
    document.getElementById('producto-img').style.display = 'none';
  }
  document.getElementById('prod-nombre').textContent = prod.nombre;
  document.getElementById('prod-precio').textContent = `S/. ${prod.precio.toFixed(2)}`;
  document.getElementById('prod-estado').textContent = prod.estado_producto;
  document.getElementById('prod-desc').textContent = prod.descripcion;
  
  const stockEl = document.getElementById('prod-stock');
  stockEl.textContent = `${prod.stock} unidades`;
  if (prod.stock === 0) stockEl.style.color = 'var(--rojo-alerta)';
  
  document.getElementById('prod-categoria').textContent = prod.categoria;
  
  const dispEl = document.getElementById('prod-disponibilidad');
  dispEl.textContent = prod.disponibilidad ? 'Disponible' : 'Agotado';
  dispEl.className = prod.disponibilidad ? 'attr-value verde' : 'attr-value';
  if(!prod.disponibilidad) dispEl.style.color = 'var(--rojo-alerta)';
  
  document.getElementById('prod-entrega').textContent = neg.tiempo_entrega;
  
  // Vendedor
  if (neg.img) {
    document.getElementById('vendedor-logo').innerHTML = `<img src="${neg.img}" style="width:100%; height:100%; object-fit:cover;">`;
  } else {
    document.getElementById('vendedor-logo').textContent = neg.inicial;
  }
  document.getElementById('vendedor-nombre').textContent = neg.nombre;
  document.getElementById('vendedor-calif').textContent = `⭐ ${neg.calificacion}`;
  
  const vEstado = document.getElementById('vendedor-estado');
  vEstado.textContent = neg.estado;
  vEstado.className = neg.estado.includes('Cerrado') ? '' : 'verde';
  if(neg.estado.includes('Cerrado')) vEstado.style.color = 'var(--rojo-alerta)';

  // --- Lógica del Carrito ---
  let cart = TrustPayStorage.get('trustpay_cart', []);
  const btnHeaderCart = document.getElementById('btn-header-cart');
  const cartBadgeText = document.getElementById('cart-badge-text');
  const cartModal = document.getElementById('cart-modal');
  const btnCloseCart = document.getElementById('btn-close-cart');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const btnCheckoutCart = document.getElementById('btn-checkout-cart');

  const btnAddCart = document.getElementById('btn-add-cart');
  const btnComprarAhora = document.getElementById('btn-comprar-ahora');

  if (!prod.disponibilidad || neg.estado === 'Cerrado temporalmente') {
    btnAddCart.style.opacity = '0.5';
    btnAddCart.disabled = true;
    btnComprarAhora.style.opacity = '0.5';
    btnComprarAhora.disabled = true;
    btnAddCart.textContent = 'No disponible';
  }

  function guardarCarrito() {
    TrustPayStorage.set('trustpay_cart', cart);
    actualizarBadgeCarrito();
  }

  function actualizarBadgeCarrito() {
    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
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

  function renderCarrito() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div style="text-align: center; color: var(--texto-secundario); margin: auto;">
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
        <div style="flex:1;">
          <div style="font-weight:600;font-size:14px;">${item.nombre}</div>
          <div style="font-size:13px;color:var(--texto-secundario);margin-top:4px;">S/. ${item.precio.toFixed(2)} c/u</div>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn btn-minus">-</button>
          <span class="qty-val">${item.cantidad}</span>
          <button class="qty-btn btn-plus">+</button>
          <button class="btn-remove-item" style="background:none;border:none;color:red;">X</button>
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
          TrustPayToast.show('Stock máximo.', 'error');
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

  btnHeaderCart.addEventListener('click', () => {
    renderCarrito();
    cartModal.classList.add('show');
  });
  btnCloseCart.addEventListener('click', () => {
    cartModal.classList.remove('show');
  });
  btnCheckoutCart.addEventListener('click', () => {
    if (cart.length === 0) return;
    const firstNegocioId = cart[0].negocioId;
    if (!cart.every(i => i.negocioId === firstNegocioId)) {
      TrustPayToast.show('Solo puedes pedir de un negocio a la vez.', 'error');
      return;
    }
    const negocioDelCarrito = TrustPayData.getNegocios().find(n => n.id === firstNegocioId);
    TrustPayStorage.set('selected_business', negocioDelCarrito);
    TrustPayStorage.set('cart_checkout', cart);
    window.location.href = 'confirmar_compra.html';
  });

  btnAddCart.addEventListener('click', () => {
    if (cart.length > 0 && cart[0].negocioId !== neg.id) {
      TrustPayToast.show('Tu carrito tiene productos de otro negocio.', 'error');
      return;
    }
    const exist = cart.find(i => i.id === prod.id);
    if (exist) {
      if (exist.cantidad < prod.stock) exist.cantidad++;
      else return TrustPayToast.show('Stock máximo alcanzado.', 'info');
    } else {
      cart.push({ ...prod, negocioId: neg.id, negocioNombre: neg.nombre, cantidad: 1 });
    }
    guardarCarrito();
    TrustPayToast.show('Agregado al carrito', 'success');
  });

  btnComprarAhora.addEventListener('click', () => {
    const instantCart = [{ ...prod, negocioId: neg.id, negocioNombre: neg.nombre, cantidad: 1 }];
    TrustPayStorage.set('cart_checkout', instantCart);
    window.location.href = 'confirmar_compra.html';
  });

  btnBack.addEventListener('click', () => {
    TrustPayStorage.set('return_to_catalog', neg.id);
    window.location.href = 'seleccion.html';
  });

  actualizarBadgeCarrito();
});
