/* ============================================================
   DATA.JS
   Base de datos simulada global para TrustPay.
   Contiene negocios y productos.
   ============================================================ */

const TrustPayData = (() => {
  const negocios = [
    {
      id: 1,
      nombre: 'La Trattoria',
      categoria: 'restaurante',
      direccion: 'Av. Fátima 123, Centro',
      estado: 'Abierto', // Abierto, Cerrado temporalmente, Próximo a abrir
      horario: '12:00 PM - 11:00 PM',
      tiempo_entrega: '30-45 min',
      calificacion: 4.8,
      ventas: '2k+',
      inicial: 'T',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      portada: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      descripcion: 'Auténtica comida italiana, pizzas artesanales y pastas frescas hechas al momento.',
      items: [
        { id: 101, nombre: 'Pizza Margarita Familiar', precio: 35.00, descripcion: 'Auténtica pizza italiana con salsa de tomate artesanal, mozzarella fresca y albahaca.', categoria: 'Pizzas', estado_producto: 'Nuevo', disponibilidad: true, stock: 15, emoji: '🍕', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80' },
        { id: 102, nombre: 'Pizza Pepperoni Familiar', precio: 40.00, descripcion: 'Doble porción de pepperoni premium sobre base de queso mozzarella.', categoria: 'Pizzas', estado_producto: 'Nuevo', disponibilidad: true, stock: 10, emoji: '🍕', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80' },
        { id: 103, nombre: 'Lasagna de Carne', precio: 28.00, descripcion: 'Capas de pasta fresca con salsa boloñesa, bechamel y queso parmesano gratinado.', categoria: 'Pastas', estado_producto: 'Nuevo', disponibilidad: true, stock: 8, emoji: '🍝' , img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80' },        { id: 104, nombre: 'Spaghetti a la Carbonara', precio: 26.00, descripcion: 'Pasta clásica con guanciale, yemas de huevo, queso pecorino y pimienta negra.', categoria: 'Pastas', estado_producto: 'Nuevo', disponibilidad: true, stock: 12, emoji: '🍝' , img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80' },        { id: 105, nombre: 'Raviolis de Ricotta y Espinaca', precio: 29.00, descripcion: 'Raviolis caseros bañados en salsa de mantequilla y salvia.', categoria: 'Pastas', estado_producto: 'Nuevo', disponibilidad: false, stock: 0, emoji: '🥟' , img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80' },        { id: 106, nombre: 'Ensalada César con Pollo', precio: 22.00, descripcion: 'Lechuga romana fresca, crutones, queso parmesano, pechuga a la parrilla y aderezo César.', categoria: 'Ensaladas', estado_producto: 'Nuevo', disponibilidad: true, stock: 5, emoji: '🥗' , img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80' },        { id: 107, nombre: 'Pan al Ajo Especial (4 unid.)', precio: 12.00, descripcion: 'Trozos de pan baguette con mantequilla de ajo y queso mozzarella derretido.', categoria: 'Entradas', estado_producto: 'Nuevo', disponibilidad: true, stock: 20, emoji: '🥖' , img: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80' },        { id: 108, nombre: 'Tiramisú Clásico', precio: 15.00, descripcion: 'Postre italiano con capas de bizcocho de café, mascarpone y cacao en polvo.', categoria: 'Postres', estado_producto: 'Nuevo', disponibilidad: true, stock: 6, emoji: '🍰' , img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80' },        { id: 109, nombre: 'Gaseosa Inka Kola 1.5L', precio: 9.00, descripcion: 'Bebida gasificada sabor original bien helada.', categoria: 'Bebidas', estado_producto: 'Nuevo', disponibilidad: true, stock: 30, emoji: '🥤' , img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80' },        { id: 110, nombre: 'Vino Tinto Malbec', precio: 45.00, descripcion: 'Botella de vino tinto joven ideal para acompañar carnes y pastas.', categoria: 'Bebidas', estado_producto: 'Nuevo', disponibilidad: true, stock: 4, emoji: '🍷' , img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80' },      ]
    },
    {
      id: 2,
      nombre: 'Tienda Mi Hogar',
      categoria: 'tienda',
      direccion: 'Ca. Los Álamos 240, Centro',
      estado: 'Cerrado temporalmente',
      horario: '08:00 AM - 06:00 PM',
      tiempo_entrega: '45-60 min',
      calificacion: 4.5,
      ventas: '5k+',
      inicial: 'H',
      img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80',
      portada: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80',
      descripcion: 'Todo lo que necesitas para tu hogar: abarrotes, limpieza y cuidado personal.',
      items: [
        { id: 201, nombre: 'Arroz Faraón Extra 5kg', precio: 21.50, descripcion: 'Arroz extra de grano largo, rendidor y graneadito.', categoria: 'Abarrotes', estado_producto: 'Nuevo', disponibilidad: true, stock: 50, emoji: '🍚' , img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80' },        { id: 202, nombre: 'Aceite Primor Premium 1L', precio: 11.20, descripcion: 'Aceite vegetal de soya, ideal para frituras y guisos.', categoria: 'Abarrotes', estado_producto: 'Nuevo', disponibilidad: true, stock: 40, emoji: '🍾' , img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80' },        { id: 203, nombre: 'Azúcar Rubia Cartavio 1kg', precio: 4.50, descripcion: 'Azúcar rubia doméstica.', categoria: 'Abarrotes', estado_producto: 'Nuevo', disponibilidad: true, stock: 100, emoji: '🧊' , img: 'https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?auto=format&fit=crop&w=800&q=80' },        { id: 204, nombre: 'Fideos Don Vittorio Spaghetti 500g', precio: 2.80, descripcion: 'Fideos de sémola de trigo duro.', categoria: 'Abarrotes', estado_producto: 'Nuevo', disponibilidad: true, stock: 60, emoji: '🍝' , img: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=800&q=80' },        { id: 205, nombre: 'Leche Gloria Evaporada Lata 400g', precio: 4.20, descripcion: 'Leche evaporada entera.', categoria: 'Lácteos', estado_producto: 'Nuevo', disponibilidad: true, stock: 80, emoji: '🥛' , img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80' },        { id: 206, nombre: 'Atún Florida en Aceite 170g', precio: 6.50, descripcion: 'Trozos de atún en aceite vegetal.', categoria: 'Conservas', estado_producto: 'Nuevo', disponibilidad: true, stock: 120, emoji: '🐟' , img: 'https://images.unsplash.com/photo-1610381014841-f76ea10c4d81?auto=format&fit=crop&w=800&q=80' },        { id: 207, nombre: 'Detergente Ariel Doble Poder 2kg', precio: 24.00, descripcion: 'Detergente en polvo para lavaropa, aroma floral.', categoria: 'Limpieza', estado_producto: 'Nuevo', disponibilidad: true, stock: 25, emoji: '🧼' , img: 'https://images.unsplash.com/photo-1584820927498-cafe5c152a00?auto=format&fit=crop&w=800&q=80' },        { id: 208, nombre: 'Papel Higiénico Suave (Paq 12)', precio: 18.00, descripcion: 'Papel higiénico doble hoja, suave y resistente.', categoria: 'Limpieza', estado_producto: 'Nuevo', disponibilidad: false, stock: 0, emoji: '🧻' , img: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=800&q=80' },        { id: 209, nombre: 'Pasta Dental Colgate Total 12 150g', precio: 8.50, descripcion: 'Protección completa por 12 horas.', categoria: 'Aseo Personal', estado_producto: 'Nuevo', disponibilidad: true, stock: 45, emoji: '🪥' , img: 'https://images.unsplash.com/photo-1559591937-beaae02c1186?auto=format&fit=crop&w=800&q=80' },        { id: 210, nombre: 'Shampoo H&S Limpieza Profunda 375ml', precio: 17.00, descripcion: 'Shampoo anti caspa para todo tipo de cabello.', categoria: 'Aseo Personal', estado_producto: 'Nuevo', disponibilidad: true, stock: 20, emoji: '🧴' , img: 'https://images.unsplash.com/photo-1631730486784-5456119f69ae?auto=format&fit=crop&w=800&q=80' },      ]
    },
    {
      id: 3,
      nombre: 'Farmacia Trujillo Salud',
      categoria: 'farmacia',
      direccion: 'Av. Larco 560, Trujillo',
      estado: 'Abierto',
      horario: '24 Horas',
      tiempo_entrega: '15-25 min',
      calificacion: 4.9,
      ventas: '10k+',
      inicial: 'F',
      img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80',
      portada: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1200&q=80',
      descripcion: 'Cuidamos tu salud las 24 horas del día. Medicamentos y productos de cuidado personal.',
      items: [
        { id: 301, nombre: 'Paracetamol 500mg (Caja x 100)', precio: 12.00, descripcion: 'Analgésico y antipirético. Leer indicaciones antes de usar.', categoria: 'Medicamentos', estado_producto: 'Nuevo', disponibilidad: true, stock: 200, emoji: '💊' , img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80' },        { id: 302, nombre: 'Ibuprofeno 400mg (Caja x 100)', precio: 15.00, descripcion: 'Antiinflamatorio no esteroideo.', categoria: 'Medicamentos', estado_producto: 'Nuevo', disponibilidad: true, stock: 150, emoji: '💊' , img: 'https://images.unsplash.com/photo-1550572017-edb799988225?auto=format&fit=crop&w=800&q=80' },        { id: 303, nombre: 'Alcohol en Gel 1L', precio: 14.50, descripcion: 'Gel antibacterial con 70% de alcohol.', categoria: 'Primeros Auxilios', estado_producto: 'Nuevo', disponibilidad: true, stock: 80, emoji: '🧴' , img: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80' },        { id: 304, nombre: 'Algodón Hidrófilo 250g', precio: 5.00, descripcion: 'Algodón puro, súper absorbente.', categoria: 'Primeros Auxilios', estado_producto: 'Nuevo', disponibilidad: true, stock: 100, emoji: '☁️' , img: 'https://images.unsplash.com/photo-1586942368476-0fbf6da921a9?auto=format&fit=crop&w=800&q=80' },        { id: 305, nombre: 'Mascarillas KN95 (Caja x 20)', precio: 20.00, descripcion: 'Mascarillas protectoras de 5 capas.', categoria: 'Protección', estado_producto: 'Nuevo', disponibilidad: true, stock: 50, emoji: '😷' , img: 'https://images.unsplash.com/photo-1577401239170-897940551f78?auto=format&fit=crop&w=800&q=80' },        { id: 306, nombre: 'Termómetro Digital', precio: 18.00, descripcion: 'Termómetro digital con alarma y memoria.', categoria: 'Equipos', estado_producto: 'Nuevo', disponibilidad: true, stock: 30, emoji: '🌡️' , img: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80' },        { id: 307, nombre: 'Curitas Band-Aid (Caja x 100)', precio: 10.00, descripcion: 'Apósitos adhesivos resistentes al agua.', categoria: 'Primeros Auxilios', estado_producto: 'Nuevo', disponibilidad: true, stock: 85, emoji: '🩹' , img: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80' },        { id: 308, nombre: 'Vitamina C 1000mg (Frasco x 30)', precio: 25.00, descripcion: 'Suplemento vitamínico para el sistema inmunológico.', categoria: 'Suplementos', estado_producto: 'Nuevo', disponibilidad: true, stock: 40, emoji: '🍊', img: 'https://images.unsplash.com/photo-1577401239170-897940551f78?auto=format&fit=crop&w=800&q=80' },
        { id: 309, nombre: 'Ensure Vainilla Lata 400g', precio: 55.00, descripcion: 'Suplemento nutricional en polvo.', categoria: 'Nutrición', estado_producto: 'Nuevo', disponibilidad: true, stock: 25, emoji: '🥤' , img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80' },        { id: 310, nombre: 'Pañales Huggies Talla G (Paq x 40)', precio: 45.00, descripcion: 'Pañales para bebé con máxima absorción.', categoria: 'Cuidado Infantil', estado_producto: 'Nuevo', disponibilidad: true, stock: 60, emoji: '👶' , img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80' },      ]
    },
    {
      id: 4,
      nombre: 'Bazar El Hueco (Segunda Mano)',
      categoria: 'tienda',
      direccion: 'Mercado Central, Stand 45',
      estado: 'Abierto',
      horario: '09:00 AM - 05:00 PM',
      tiempo_entrega: '60 min',
      calificacion: 4.2,
      ventas: '500+',
      inicial: 'B',
      img: 'https://images.unsplash.com/photo-1555529733-0e670560f4e1?auto=format&fit=crop&w=800&q=80',
      portada: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1200&q=80',
      descripcion: 'Encuentra las mejores ofertas en artículos de segunda mano garantizados.',
      items: [
        { id: 401, nombre: 'Laptop HP Core i5 8va Gen', precio: 850.00, descripcion: 'Laptop usada en buen estado, 8GB RAM, 256GB SSD. Cargador original incluido.', categoria: 'Electrónica', estado_producto: 'Usado', disponibilidad: true, stock: 1, emoji: '💻' , img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80' },        { id: 402, nombre: 'Mando PS4 DualShock (Rojo)', precio: 120.00, descripcion: 'Mando original de PS4, botones y joysticks funcionando perfectamente.', categoria: 'Videojuegos', estado_producto: 'Seminuevo', disponibilidad: true, stock: 2, emoji: '🎮' , img: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=800&q=80' },        { id: 403, nombre: 'Monitor Samsung 24"', precio: 250.00, descripcion: 'Monitor Full HD con entrada HDMI y VGA. Sin píxeles muertos.', categoria: 'Electrónica', estado_producto: 'Usado', disponibilidad: true, stock: 1, emoji: '🖥️' , img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80' },        { id: 404, nombre: 'Bicicleta Montañera Aro 26', precio: 300.00, descripcion: 'Bicicleta en estado regular, requiere ajuste de frenos.', categoria: 'Deportes', estado_producto: 'Usado', disponibilidad: true, stock: 1, emoji: '🚲' , img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80' },        { id: 405, nombre: 'Juego de Sala (Sofá + 2 sillones)', precio: 450.00, descripcion: 'Juego de muebles de tela, color beige. Detalles de uso.', categoria: 'Hogar', estado_producto: 'Usado', disponibilidad: true, stock: 1, emoji: '🛋️' , img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80' },        { id: 406, nombre: 'Refrigeradora LG No Frost', precio: 600.00, descripcion: 'Refrigeradora de 250L. Funciona excelente, algunos rayones externos.', categoria: 'Electrodomésticos', estado_producto: 'Usado', disponibilidad: false, stock: 0, emoji: '🧊' , img: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80' },        { id: 407, nombre: 'Colección Harry Potter (Libros)', precio: 180.00, descripcion: 'Colección completa de 7 libros en español, tapa blanda.', categoria: 'Libros', estado_producto: 'Seminuevo', disponibilidad: true, stock: 1, emoji: '📚' , img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80' },        { id: 408, nombre: 'Guitarra Acústica Yamaha', precio: 220.00, descripcion: 'Guitarra en excelente estado, cuerdas recién cambiadas.', categoria: 'Instrumentos', estado_producto: 'Seminuevo', disponibilidad: true, stock: 1, emoji: '🎸' , img: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=800&q=80' },        { id: 409, nombre: 'Cámara Canon EOS Rebel T6', precio: 750.00, descripcion: 'Incluye lente 18-55mm, batería, cargador y bolso. 15k disparos.', categoria: 'Fotografía', estado_producto: 'Seminuevo', disponibilidad: true, stock: 1, emoji: '📷' , img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },        { id: 410, nombre: 'Silla Gamer Cougar Armor', precio: 380.00, descripcion: 'Silla ergonómica, pistón funciona bien. Cuero sintético un poco desgastado.', categoria: 'Muebles', estado_producto: 'Usado', disponibilidad: true, stock: 1, emoji: '💺' , img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80' },      ]

    },
    {
      id: 5, nombre: 'El Rincón del Asado', categoria: 'restaurante', direccion: 'Av. América Sur 1200', estado: 'Abierto', horario: '12:00 PM - 10:00 PM', tiempo_entrega: '40-55 min', calificacion: 4.7, ventas: '1k+', inicial: 'R', img: 'https://images.unsplash.com/photo-1544025162-8111142154ea?auto=format&fit=crop&w=800&q=80', portada: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80', descripcion: 'Las mejores carnes a la parrilla con el auténtico sabor gaucho.',
      items: [
        { id: 501, nombre: 'Parrilla Personal', precio: 45.00, descripcion: 'Bife, chorizo, morcilla, papas y ensalada.', categoria: 'Carnes', estado_producto: 'Nuevo', disponibilidad: true, stock: 20, emoji: '🥩' , img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' },        { id: 502, nombre: 'Choripán Clásico', precio: 15.00, descripcion: 'Chorizo artesanal en pan francés con chimichurri.', categoria: 'Sandwiches', estado_producto: 'Nuevo', disponibilidad: true, stock: 30, emoji: '🌭' , img: 'https://images.unsplash.com/photo-1627308595229-7830f5c90662?auto=format&fit=crop&w=800&q=80' },      ]
    },
    {
      id: 6, nombre: 'Sushi Zen', categoria: 'restaurante', direccion: 'Real Plaza Trujillo', estado: 'Abierto', horario: '01:00 PM - 10:30 PM', tiempo_entrega: '45-60 min', calificacion: 4.9, ventas: '3k+', inicial: 'S', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80', portada: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80', descripcion: 'Auténtico sushi japonés y makis fusión.',
      items: [
        { id: 601, nombre: 'Tabla Acevichada (10 cortes)', precio: 28.00, descripcion: 'Maki relleno de langostino empanizado, palta y salsa acevichada.', categoria: 'Makis', estado_producto: 'Nuevo', disponibilidad: true, stock: 40, emoji: '🍣' , img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80' },      ]
    },
    {
      id: 7, nombre: 'Burger Master', categoria: 'restaurante', direccion: 'Av. España 450', estado: 'Cerrado temporalmente', horario: '06:00 PM - 12:00 AM', tiempo_entrega: '20-30 min', calificacion: 4.6, ventas: '8k+', inicial: 'B', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80', portada: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=1200&q=80', descripcion: 'Hamburguesas smash artesanales de pura carne angus.',
      items: [
        { id: 701, nombre: 'Smash Burger Doble', precio: 22.00, descripcion: 'Doble carne angus, doble cheddar, tocino y salsa secreta.', categoria: 'Hamburguesas', estado_producto: 'Nuevo', disponibilidad: true, stock: 50, emoji: '🍔' , img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },      ]
    },
    {
      id: 8, nombre: 'Bodega Don Pepe', categoria: 'tienda', direccion: 'Urb. El Recreo, Mz H', estado: 'Abierto', horario: '07:00 AM - 10:00 PM', tiempo_entrega: '10-15 min', calificacion: 4.3, ventas: '500+', inicial: 'D', img: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=800&q=80', portada: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=1200&q=80', descripcion: 'Tu bodega de confianza con los mejores precios del barrio.',
      items: [
        { id: 801, nombre: 'Gaseosa Coca Cola 3L', precio: 11.50, descripcion: 'Bebida gasificada.', categoria: 'Bebidas', estado_producto: 'Nuevo', disponibilidad: true, stock: 15, emoji: '🥤' , img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80' },      ]
    },
    {
      id: 9, nombre: 'Tech Store Trujillo', categoria: 'tienda', direccion: 'Mall Plaza Trujillo', estado: 'Abierto', horario: '10:00 AM - 09:00 PM', tiempo_entrega: '30 min', calificacion: 4.8, ventas: '2k+', inicial: 'T', img: 'https://images.unsplash.com/photo-1531297172864-45dcc6045866?auto=format&fit=crop&w=800&q=80', portada: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1200&q=80', descripcion: 'Gadgets, accesorios y tecnología al mejor precio.',
      items: [
        { id: 901, nombre: 'Audífonos Bluetooth JBL', precio: 150.00, descripcion: 'Audífonos inalámbricos con cancelación de ruido.', categoria: 'Electrónica', estado_producto: 'Nuevo', disponibilidad: true, stock: 10, emoji: '🎧' , img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },      ]
    },
    {
      id: 10, nombre: 'PetShop Peluditos', categoria: 'tienda', direccion: 'Av. Husares de Junin', estado: 'Próximo a abrir', horario: '09:00 AM - 07:00 PM', tiempo_entrega: '25 min', calificacion: 4.9, ventas: '1k+', inicial: 'P', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80', portada: 'https://images.unsplash.com/photo-1516734212443-3e3a0bf64396?auto=format&fit=crop&w=1200&q=80', descripcion: 'Todo para engreír a tus mascotas.',
      items: [
        { id: 1001, nombre: 'Comida Ricocan 15kg', precio: 85.00, descripcion: 'Alimento premium para perros adultos.', categoria: 'Mascotas', estado_producto: 'Nuevo', disponibilidad: true, stock: 5, emoji: '🐕' , img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80' },      ]
    },
    {
      id: 11, nombre: 'InkaFarma Plus', categoria: 'farmacia', direccion: 'Av. América Norte', estado: 'Abierto', horario: '24 Horas', tiempo_entrega: '15-20 min', calificacion: 4.7, ventas: '15k+', inicial: 'I', img: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80', portada: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80', descripcion: 'Precios bajos en medicinas y cuidado personal.',
      items: [
        { id: 1101, nombre: 'Panadol Forte (Caja x 100)', precio: 15.00, descripcion: 'Alivia dolores fuertes.', categoria: 'Medicamentos', estado_producto: 'Nuevo', disponibilidad: true, stock: 100, emoji: '💊' , img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80' },      ]
    },
    {
      id: 12, nombre: 'Botica San Juan', categoria: 'farmacia', direccion: 'Plaza de Armas', estado: 'Abierto', horario: '08:00 AM - 10:00 PM', tiempo_entrega: '10-20 min', calificacion: 4.5, ventas: '3k+', inicial: 'S', img: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80', portada: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1200&q=80', descripcion: 'Atención personalizada y medicamentos genéricos.',
      items: [
        { id: 1201, nombre: 'Vitamina E (Frasco x 50)', precio: 20.00, descripcion: 'Suplemento antioxidante.', categoria: 'Suplementos', estado_producto: 'Nuevo', disponibilidad: true, stock: 20, emoji: '💊' , img: 'https://images.unsplash.com/photo-1550572017-edb799988225?auto=format&fit=crop&w=800&q=80' },      ]
    },
    {
      id: 13, nombre: 'Farma Ahorro', categoria: 'farmacia', direccion: 'Mercado Hermelinda', estado: 'Cerrado temporalmente', horario: '07:00 AM - 06:00 PM', tiempo_entrega: '25-40 min', calificacion: 4.2, ventas: '4k+', inicial: 'F', img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80', portada: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1200&q=80', descripcion: 'Los medicamentos genéricos más económicos de la ciudad.',
      items: [
        { id: 1301, nombre: 'Amoxicilina 500mg (Blister x 10)', precio: 3.50, descripcion: 'Antibiótico genérico. Venta con receta.', categoria: 'Medicamentos', estado_producto: 'Nuevo', disponibilidad: true, stock: 50, emoji: '💊' , img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80' }
      ]
    }
  ];

  function getNegocios() {
    return negocios;
  }

  function getTodosLosProductos() {
    let todos = [];
    negocios.forEach(n => {
      n.items.forEach(item => {
        todos.push({
          ...item,
          negocioId: n.id,
          negocioNombre: n.nombre,
          negocioEstado: n.estado
        });
      });
    });
    return todos;
  }

  return { getNegocios, getTodosLosProductos };
})();
