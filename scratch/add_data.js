const fs = require('fs');

const path = 'd:\\PROYECTO-CUSTOMER\\App-Trustpay\\js\\data.js';
let content = fs.readFileSync(path, 'utf8');

const newData = `
    },
    {
      id: 5, nombre: 'El Rincón del Asado', categoria: 'restaurante', direccion: 'Av. América Sur 1200', estado: 'Abierto', horario: '12:00 PM - 10:00 PM', tiempo_entrega: '40-55 min', calificacion: 4.7, ventas: '1k+', inicial: 'R', img: '', portada: '', descripcion: 'Las mejores carnes a la parrilla con el auténtico sabor gaucho.',
      items: [
        { id: 501, nombre: 'Parrilla Personal', precio: 45.00, descripcion: 'Bife, chorizo, morcilla, papas y ensalada.', categoria: 'Carnes', estado_producto: 'Nuevo', disponibilidad: true, stock: 20, emoji: '🥩' },
        { id: 502, nombre: 'Choripán Clásico', precio: 15.00, descripcion: 'Chorizo artesanal en pan francés con chimichurri.', categoria: 'Sandwiches', estado_producto: 'Nuevo', disponibilidad: true, stock: 30, emoji: '🌭' }
      ]
    },
    {
      id: 6, nombre: 'Sushi Zen', categoria: 'restaurante', direccion: 'Real Plaza Trujillo', estado: 'Abierto', horario: '01:00 PM - 10:30 PM', tiempo_entrega: '45-60 min', calificacion: 4.9, ventas: '3k+', inicial: 'S', img: '', portada: '', descripcion: 'Auténtico sushi japonés y makis fusión.',
      items: [
        { id: 601, nombre: 'Tabla Acevichada (10 cortes)', precio: 28.00, descripcion: 'Maki relleno de langostino empanizado, palta y salsa acevichada.', categoria: 'Makis', estado_producto: 'Nuevo', disponibilidad: true, stock: 40, emoji: '🍣' }
      ]
    },
    {
      id: 7, nombre: 'Burger Master', categoria: 'restaurante', direccion: 'Av. España 450', estado: 'Cerrado temporalmente', horario: '06:00 PM - 12:00 AM', tiempo_entrega: '20-30 min', calificacion: 4.6, ventas: '8k+', inicial: 'B', img: '', portada: '', descripcion: 'Hamburguesas smash artesanales de pura carne angus.',
      items: [
        { id: 701, nombre: 'Smash Burger Doble', precio: 22.00, descripcion: 'Doble carne angus, doble cheddar, tocino y salsa secreta.', categoria: 'Hamburguesas', estado_producto: 'Nuevo', disponibilidad: true, stock: 50, emoji: '🍔' }
      ]
    },
    {
      id: 8, nombre: 'Bodega Don Pepe', categoria: 'tienda', direccion: 'Urb. El Recreo, Mz H', estado: 'Abierto', horario: '07:00 AM - 10:00 PM', tiempo_entrega: '10-15 min', calificacion: 4.3, ventas: '500+', inicial: 'D', img: '', portada: '', descripcion: 'Tu bodega de confianza con los mejores precios del barrio.',
      items: [
        { id: 801, nombre: 'Gaseosa Coca Cola 3L', precio: 11.50, descripcion: 'Bebida gasificada.', categoria: 'Bebidas', estado_producto: 'Nuevo', disponibilidad: true, stock: 15, emoji: '🥤' }
      ]
    },
    {
      id: 9, nombre: 'Tech Store Trujillo', categoria: 'tienda', direccion: 'Mall Plaza Trujillo', estado: 'Abierto', horario: '10:00 AM - 09:00 PM', tiempo_entrega: '30 min', calificacion: 4.8, ventas: '2k+', inicial: 'T', img: '', portada: '', descripcion: 'Gadgets, accesorios y tecnología al mejor precio.',
      items: [
        { id: 901, nombre: 'Audífonos Bluetooth JBL', precio: 150.00, descripcion: 'Audífonos inalámbricos con cancelación de ruido.', categoria: 'Electrónica', estado_producto: 'Nuevo', disponibilidad: true, stock: 10, emoji: '🎧' }
      ]
    },
    {
      id: 10, nombre: 'PetShop Peluditos', categoria: 'tienda', direccion: 'Av. Husares de Junin', estado: 'Próximo a abrir', horario: '09:00 AM - 07:00 PM', tiempo_entrega: '25 min', calificacion: 4.9, ventas: '1k+', inicial: 'P', img: '', portada: '', descripcion: 'Todo para engreír a tus mascotas.',
      items: [
        { id: 1001, nombre: 'Comida Ricocan 15kg', precio: 85.00, descripcion: 'Alimento premium para perros adultos.', categoria: 'Mascotas', estado_producto: 'Nuevo', disponibilidad: true, stock: 5, emoji: '🐕' }
      ]
    },
    {
      id: 11, nombre: 'InkaFarma Plus', categoria: 'farmacia', direccion: 'Av. América Norte', estado: 'Abierto', horario: '24 Horas', tiempo_entrega: '15-20 min', calificacion: 4.7, ventas: '15k+', inicial: 'I', img: '', portada: '', descripcion: 'Precios bajos en medicinas y cuidado personal.',
      items: [
        { id: 1101, nombre: 'Panadol Forte (Caja x 100)', precio: 15.00, descripcion: 'Alivia dolores fuertes.', categoria: 'Medicamentos', estado_producto: 'Nuevo', disponibilidad: true, stock: 100, emoji: '💊' }
      ]
    },
    {
      id: 12, nombre: 'Botica San Juan', categoria: 'farmacia', direccion: 'Plaza de Armas', estado: 'Abierto', horario: '08:00 AM - 10:00 PM', tiempo_entrega: '10-20 min', calificacion: 4.5, ventas: '3k+', inicial: 'S', img: '', portada: '', descripcion: 'Atención personalizada y medicamentos genéricos.',
      items: [
        { id: 1201, nombre: 'Vitamina E (Frasco x 50)', precio: 20.00, descripcion: 'Suplemento antioxidante.', categoria: 'Suplementos', estado_producto: 'Nuevo', disponibilidad: true, stock: 20, emoji: '💊' }
      ]
    },
    {
      id: 13, nombre: 'Farma Ahorro', categoria: 'farmacia', direccion: 'Mercado Hermelinda', estado: 'Cerrado temporalmente', horario: '07:00 AM - 06:00 PM', tiempo_entrega: '25-40 min', calificacion: 4.2, ventas: '4k+', inicial: 'F', img: '', portada: '', descripcion: 'Los medicamentos genéricos más económicos de la ciudad.',
      items: [
        { id: 1301, nombre: 'Amoxicilina 500mg (Blister x 10)', precio: 3.50, descripcion: 'Antibiótico genérico. Venta con receta.', categoria: 'Medicamentos', estado_producto: 'Nuevo', disponibilidad: true, stock: 50, emoji: '💊' }
      ]
`;

content = content.replace('    }\r\n  ];', newData + '\n  ];');
content = content.replace('    }\n  ];', newData + '\n  ];');
fs.writeFileSync(path, content, 'utf8');
