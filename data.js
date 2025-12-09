// data.js

const PRODUCTOS = [
    { id: 1, nombre: "Auriculares Pro", precio: 50, desc: "Sonido de alta fidelidad.", imagen: "https://m.media-amazon.com/images/I/41KJmvuQu4L._AC_UF894,1000_QL80_.jpg" },
    { id: 2, nombre: "Reloj Inteligente", precio: 120, desc: "Monitorea tu salud.", imagen: "https://m.media-amazon.com/images/I/61SF3V3OMiL.jpg" },
    { id: 3, nombre: "Teclado Mecánico", precio: 85, desc: "Switches azules.", imagen: "https://m.media-amazon.com/images/I/61C16URsWnL._AC_UF894,1000_QL80_.jpg" }
];

function formatMoney(amount) {
    return `$${amount.toFixed(2)} USD`;
}

function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// === NUEVA LÓGICA DEL CARRITO ===
// data.js (Actualización del objeto Carrito)

const Carrito = {
    obtener: () => JSON.parse(localStorage.getItem('mi_carrito_v1')) || [],

    agregar: (id) => {
        let carrito = Carrito.obtener();
        let item = carrito.find(i => i.id === id);
        
        if (item) {
            item.cantidad++;
        } else {
            carrito.push({ id: id, cantidad: 1 });
        }
        
        localStorage.setItem('mi_carrito_v1', JSON.stringify(carrito));
        
        // ¡ACTUALIZAMOS EL CONTADOR VISUAL INMEDIATAMENTE!
        Carrito.actualizarContador(); 
        alert("Producto agregado al carrito");
    },

    calcularTotal: () => {
        let carrito = Carrito.obtener();
        return carrito.reduce((total, item) => {
            const producto = PRODUCTOS.find(p => p.id === item.id);
            return total + (producto.precio * item.cantidad);
        }, 0);
    },

    vaciar: () => {
        localStorage.removeItem('mi_carrito_v1');
        Carrito.actualizarContador();
    },

    // === NUEVA FUNCIÓN: Cuenta items y actualiza el HTML ===
    actualizarContador: () => {
        const carrito = Carrito.obtener();
        // Sumamos las cantidades (ej: 2 audifonos + 1 reloj = 3 items)
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        
        // Buscamos el elemento en el HTML y lo actualizamos si existe
        const badge = document.getElementById('cart-count');
        if (badge) {
            badge.innerText = totalItems;
            // Ocultar si es 0, mostrar si hay algo
            badge.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }
};

// Ejecutar esto al cargar cualquier página para que el número aparezca
document.addEventListener('DOMContentLoaded', () => {
    Carrito.actualizarContador();
});
