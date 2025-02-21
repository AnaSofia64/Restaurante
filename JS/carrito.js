document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoItems = document.getElementById('carrito-items');
    const totalPago = document.getElementById('total-pago');

    function actualizarCarrito() {
        carritoItems.innerHTML = '';
        let total = 0;
        carrito.forEach((producto, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio * producto.cantidad}</td>
                <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>
            `;
            carritoItems.appendChild(row);
            total += producto.precio * producto.cantidad;
        });
        totalPago.textContent = total.toFixed(2);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function agregarAlCarrito(producto) {
        const index = carrito.findIndex(item => item.nombre === producto.nombre);
        if (index !== -1) {
            carrito[index].cantidad += 1;
        } else {
            carrito.push(producto);
        }
        actualizarCarrito();
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-agregar')) {
            const producto = {
                nombre: e.target.dataset.nombre,
                precio: parseFloat(e.target.dataset.precio),
                cantidad: 1
            };
            agregarAlCarrito(producto);
        }

        if (e.target.classList.contains('btn-eliminar')) {
            const index = e.target.dataset.index;
            eliminarDelCarrito(index);
        }

        if (e.target.classList.contains('btn-comprar')) {
            alert('Compra finalizada');
            carrito.length = 0;
            actualizarCarrito();
        }
    });

    actualizarCarrito();
});

// Array para almacenar los productos en el carrito
let cart = [];

// Función para agregar producto al carrito
function addToCart(name, price) {
    // Crear objeto producto
    let product = { name, price };
    
    // Agregarlo al array
    cart.push(product);
    
    // Actualizar la vista del carrito
    updateCart();
}

// Función para actualizar la vista del carrito
function updateCart() {
    let cartContainer = document.getElementById("cart-items");
    let totalContainer = document.getElementById("cart-total");

    // Limpiar la lista
    cartContainer.innerHTML = "";
    
    let total = 0;
    
    // Recorrer el carrito y mostrar cada producto
    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">❌</button>
        `;
        cartContainer.appendChild(cartItem);
        
        // Sumar al total
        total += item.price;
    });

    // Mostrar el total
    totalContainer.innerText = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Función para generar la factura
function generateInvoice() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let invoiceText = "Factura:\n\n";
    let total = 0;

    cart.forEach(item => {
        invoiceText += `${item.name}: $${item.price.toFixed(2)}\n`;
        total += item.price;
    });

    invoiceText += `\nTotal a pagar: $${total.toFixed(2)}`;

    alert(invoiceText);
}

// Agregar evento a botón de compra
document.getElementById("checkout-btn").addEventListener("click", generateInvoice);
