# TrustPay — Prototipo Web

Prototipo navegable de **TrustPay**, una plataforma de intermediación de confianza (Trust-Tech) para el comercio social (WhatsApp/Instagram) en Trujillo. Resuelve los 3 dolores críticos identificados en la validación del proyecto:

- **Pagos en custodia (Escrow):** el dinero se retiene hasta confirmar la entrega.
- **Trazabilidad GPS en tiempo real** para repartidores independientes.
- **Garantía de reembolso / resolución de disputas** ante incumplimiento.

> Proyecto del curso **Customer Development** — UPAO, Ingeniería de Sistemas e Inteligencia Artificial, VII ciclo.

---

## 🚀 Control de Versiones: Guía de Subida y Actualización a GitHub

### 1. Historial de Configuración Inicial (Ya realizado)
Para vincular de forma segura la carpeta local con el repositorio remoto, se ejecutó la siguiente secuencia en la terminal:
1. Configuración de credenciales de usuario:
   ```bash
   git config --global user.email "tu_correo@ejemplo.com"
   git config --global user.name "Upao2026"
   ```
2. Inicialización, confirmación y enlace remoto:
   ```bash
   git init
   git add .
   git commit -m "Construimos la pantalla de inicio"
   ```
3. Creación de la rama estándar y subida con autenticación (*Git Credential Manager*):
   ```bash
   git branch -M main
   git remote add origin https://github.com/Wilmer2003/App-Trustpay
   git push -u origin main
   ```

### 2. ⚡ Comandos Rápidos para Guardar Nuevos Avances (Uso Diario)
Cada vez que avances con nuevas pantallas (como la Pantalla 2), solo necesitas ejecutar estos **3 comandos** en tu terminal para actualizar GitHub:

1. **Seleccionar cambios:** Agrega todos los archivos nuevos o modificados al área de preparación.
   ```bash
   git add .
   ```
2. **Registrar avance:** Crea un punto de control con un mensaje descriptivo de lo que hiciste.
   ```bash
   git commit -m "Terminamos la pantalla de seleccion de negocio"
   ```
3. **Subir a la nube:** Envía los cambios directamente a tu repositorio público de manera inmediata.
   ```bash
   git push origin main
   ```

---

## Stack

HTML + CSS + JavaScript puro (sin frameworks, sin build step). Cada pantalla es un archivo `.html` independiente que comparte CSS y JS comunes.

---

## Estructura del proyecto


```
trustpay/
├── index.html              → Pantalla 1: Inicio
├── pages/
│   ├── seleccion.html       → Pantalla 2: Selección de negocio
│   ├── tracking.html        → Pantalla 3: Seguimiento de pedido
│   ├── confirmar_compra.html→ Pantalla 4: Confirmación de compra
│   └── confirmar_entrega.html→ Pantalla 5: Confirmación de entrega
├── css/
│   ├── variables.css        → Design tokens: colores, tipografía, radios, sombras
│   ├── base.css             → Reset + topbar + bottom-nav
│   ├── inicio.css           → Estilos de index.html
│   ├── seleccion.css        → Estilos de seleccion.html
│   ├── tracking.css         → Estilos de tracking.html
│   ├── confirmar_compra.css → Estilos de confirmar_compra.html
│   └── confirmar_entrega.css→ Estilos de confirmar_entrega.html
├── js/
│   ├── storage.js           → Capa de persistencia (localStorage)
│   ├── router.js            → Controla el ítem activo del bottom-nav
│   ├── inicio.js            → Lógica de index.html
│   ├── seleccion.js         → Lógica de seleccion.html
│   ├── tracking.js          → Lógica de tracking.html
│   ├── confirmar_compra.js  → Lógica de confirmar_compra.html
│   └── confirmar_entrega.js → Lógica de confirmar_entrega.html
├── assets/
│   └── icons/               → (reservado para íconos sueltos)
└── README.md
```

**Regla del proyecto:** cada pantalla nueva agrega su propio `css/<pantalla>.css` y `js/<pantalla>.js`, pero **siempre reutiliza** `variables.css`, `base.css`, `storage.js` y `router.js`. Nunca se duplica un estilo o función que ya exista en los archivos compartidos.

---

## Cómo se construyó (bitácora paso a paso)

### Paso 0 — Diseño base
Se definió un sistema de diseño propio antes de escribir código, en lugar de copiar el estilo genérico del mockup:
- **Color:** azul confianza `#0B3D91` (marca), celeste acción `#1E88E5` (botones/interacción), verde custodia `#1B8A5A` (estados de seguridad), ámbar `#F5A623` (alertas suaves), rojo `#D64545` (errores).
- **Tipografía:** Sora (display, títulos) + Inter (texto, datos).
- **Elemento de marca (signature):** el "candado de custodia" — todo estado de dinero retenido se comunica con el mismo lenguaje visual (badge + texto "en custodia") en todas las pantallas.

### Paso 1 — Estructura de carpetas
```bash
mkdir -p trustpay/css trustpay/js trustpay/pages trustpay/assets/icons
```

### Paso 2 — Variables y base compartida
1. `css/variables.css` — todos los colores, radios y sombras como variables CSS (`:root`), para que cambiar un color en un solo lugar lo actualice en toda la app.
2. `css/base.css` — reset (`* { margin:0; padding:0; box-sizing:border-box }`), el contenedor `#app` (simula un teléfono en desktop), `.topbar`, `.bottom-nav` y botones genéricos (`.btn-primario`, `.btn-secundario`) reutilizables en cualquier pantalla.

### Paso 3 — Capa de persistencia y navegación
3. `js/storage.js` — funciones `set/get/remove` que envuelven `localStorage`, todas bajo el namespace `trustpay:` para no chocar con otros datos del navegador.
4. `js/router.js` — solo controla qué ícono del bottom-nav se marca como "activo"; como cada pantalla es un archivo `.html` real, la navegación entre pantallas se hace con enlaces `<a href="...">` normales, no con JavaScript.

### Paso 4 — Pantalla 1: Inicio
5. `index.html` — estructura: marca + escudo + título + botones CTA + 3 garantías (Pago protegido / GPS en vivo / Garantía reclamo) + franja de confianza + bottom-nav.
6. `css/inicio.css` — estilos exclusivos de esta pantalla (hero con degradado, tarjetas de garantías).
7. `js/inicio.js` — el botón "Realizar pedido" navega a `pages/seleccion.html`.

### Paso 5 — Desarrollo de pantallas de flujo (Completado)
Se construyeron todas las pantallas del flujo principal bajo la misma arquitectura (HTML + CSS + JS propios por vista):
- **Pantalla 2 (Selección):** Elección de tienda/repartidor y detalles del pedido.
- **Pantalla 3 (Seguimiento):** Tracking en tiempo real y chat con el repartidor.
- **Pantalla 4 (Confirmación de compra):** Pago en custodia (Escrow) seguro.
- **Pantalla 5 (Confirmación de entrega):** Ingreso de código PIN de seguridad, liberación de fondos y calificación.

---

## Cómo correrlo localmente (VS Code)

1. Abre la carpeta `trustpay/` en VS Code (`File → Open Folder`).
2. Instala la extensión **Live Server** (autor: Ritwick Dey).
3. Clic derecho sobre `index.html` → **"Open with Live Server"**.
4. Navega entre pantallas con los botones; los datos de pedidos se guardan en el `localStorage` de tu navegador (persisten aunque cierres la pestaña).

> No necesitas Node, npm, ni ningún build step. Es HTML/CSS/JS plano.

---

## Convenciones de código

- **Nombres en español**, consistentes con las variables del informe (`negocio`, `pedido`, `custodia`, `repartidor`).
- **Una responsabilidad por archivo:** si vas a estilar algo de la pantalla de tracking, va en `css/tracking.css`, nunca en `base.css`.
- **`storage.js` es la única puerta de entrada a los datos guardados.** Ninguna pantalla debe llamar `localStorage` directamente; siempre a través de `TrustPayStorage.get/set`.
- **Íconos:** SVG inline (sin librerías externas), para que el prototipo funcione sin conexión a internet salvo por las fuentes de Google Fonts.

---

## Pantallas (estado actual)

| # | Pantalla | Archivo | Estado |
|---|----------|---------|--------|
| 1 | Inicio | `index.html` | ✅ Listo |
| 2 | Selección de negocio | `pages/seleccion.html` | ✅ Listo |
| 3 | Seguimiento de pedido | `pages/tracking.html` | ✅ Listo |
| 4 | Confirmación de compra | `pages/confirmar_compra.html` | ✅ Listo |
| 5 | Confirmación de entrega | `pages/confirmar_entrega.html` | ✅ Listo |

---

## Referencia: el problema que resuelve TrustPay

Basado en la validación real (FASE 3 del informe), con encuestados de Trujillo:
- **57.1%** abandona una compra antes que arriesgar un pago adelantado sin garantías.
- **85.7%** usa Yape/Plin como método principal, dependiendo de capturas de pantalla como única "prueba".
- **50%** teme que el pedido demore más de lo prometido; **33.3%** sufre por no tener GPS en tiempo real.
- **47.6%** ha sufrido fallos críticos: entregas que nunca llegaron, retrasos sin devolución, confusiones en pagos.

TrustPay no compite con las "Super Apps" (Rappi/PedidosYa, comisión 20-30%); es una capa de confianza ligera para el comercio que ya ocurre por WhatsApp/Instagram, con una comisión simbólica (S/ 0.50 validada con usuarios).