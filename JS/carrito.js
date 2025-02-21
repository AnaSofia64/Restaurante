document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".add-to-cart");
    const botonVerCarrito = document.querySelector(".view-cart");

    if (cartItems.children.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    let factura = 'Factura de Compra:\n\n';
    for (let item of cartItems.children) {
        const producto = item.children[0].innerText;
        const precio = item.children[1].innerText;
        const cantidad = item.children[2].innerText;
        const total = item.children[3].innerText;
        factura += `Producto: ${producto}\nPrecio: ${precio}\nCantidad: ${cantidad}\nTotal: ${total}\n\n`;
    }
    factura += `Total a pagar: $${totalPrice}`;

    alert(factura);

    // Vaciar el carrito
    cartItems.innerHTML = '';
    document.getElementById('total-price').innerText = '0.00';

    // Cargar carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para agregar un producto al carrito
    function agregarAlCarrito(nombre, precio) {
        // Verificar si el producto ya está en el carrito
        let productoExistente = carrito.find(producto => producto.nombre === nombre);
        
        if (productoExistente) {
            productoExistente.cantidad += 1; // Si existe, aumenta la cantidad
        } else {
            carrito.push({ nombre, precio, cantidad: 1 }); // Si no existe, lo agrega
        }

        // Guardar en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`${nombre} ha sido agregado al carrito 🛒`);
    }

    // Agregar evento a todos los botones de "Agregar al Carrito"
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            const nombre = boton.getAttribute("data-name");
            const precio = parseFloat(boton.getAttribute("data-price"));
            agregarAlCarrito(nombre, precio);
        });
    });

    // Redirigir a la página del carrito al hacer clic en "Ver Carrito"
    if (botonVerCarrito) {
        botonVerCarrito.addEventListener("click", () => {
            window.location.href = "carrito.html";
        });
    }
});
